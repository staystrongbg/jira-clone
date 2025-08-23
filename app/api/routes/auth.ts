import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signupSchema } from "@/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { ID } from "node-appwrite";
import { AUTH_COOKIE } from "@/app/(auth)/constants";
import { sessionMiddleware } from "@/lib/session-middleware";

// Simple logger for structured logging
const logger = {
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  },
  info: (message: string) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  },
};

// Simple in-memory rate limiter
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 attempts per window

const rateLimiter = (key: string) => {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false; // Not rate limited
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true; // Rate limited
  }

  record.count++;
  return false; // Not rate limited
};

// Helper function for setting auth cookies
const setAuthCookie = (c: any, secret: string) => {
  setCookie(c, AUTH_COOKIE, secret, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
};

//same chaining here for type safety
//const app = ...
//app.get(...) is not valid because we loose type safety
//using middleware zValidator for validation

const app = new Hono()
  .get("/health", (c) => {
    return c.json({ status: "ok" });
  })
  .get("/current", sessionMiddleware, async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    return c.json({ data: user }, 200);
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const clientIP = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";
    const rateLimitKey = `login:${clientIP}`;

    if (rateLimiter(rateLimitKey)) {
      logger.info(`Rate limit exceeded for login from IP: ${clientIP}`);
      return c.json({ error: "Too many login attempts. Please try again later." }, 429);
    }

    try {
      const { email, password } = c.req.valid("json");

      const { account } = await createAdminClient();

      const session = await account.createEmailPasswordSession(email, password);

      setAuthCookie(c, session.secret);

      logger.info(`Successful login for email: ${email}`);
      return c.json({ success: true }, 200);
    } catch (error: unknown) {
      logger.error("Login error", error);
      // Generic error to avoid exposing details
      return c.json({ error: "Authentication failed." }, 401);
    }
  })
  .post("/signup", zValidator("json", signupSchema), async (c) => {
    const clientIP = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";
    const rateLimitKey = `signup:${clientIP}`;

    if (rateLimiter(rateLimitKey)) {
      logger.info(`Rate limit exceeded for signup from IP: ${clientIP}`);
      return c.json({ error: "Too many signup attempts. Please try again later." }, 429);
    }

    try {
      const { email, password, username } = c.req.valid("json");
      const { account } = await createAdminClient();

      // Create a new user
      await account.create(ID.unique(), email, password, username);

      // Automatically log the user in by creating a session
      const session = await account.createEmailPasswordSession(email, password);

      setAuthCookie(c, session.secret);

      logger.info(`Successful signup for email: ${email}`);
      return c.json({ success: true }, 201);
    } catch (error: unknown) {
      logger.error("Signup error", error);
      // Generic error to avoid exposing details
      return c.json({ error: "Registration failed." }, 400);
    }
  })
  .post("/logout", sessionMiddleware, async (c) => {
    // If unauthenticated user tries to logout, they will get 401 Unauthorized
    try {
      const account = c.get("account");
      await account.deleteSession("current");
      logger.info("User logged out successfully");
    } catch (error) {
      // Log the error but don't block the logout process.
      // The session might already be invalid, which is fine.
      logger.error("Failed to delete Appwrite session", error);
    } finally {
      // Always delete the cookie to ensure the user is logged out on the client side
      deleteCookie(c, AUTH_COOKIE, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return c.json({ success: true }, 200);
  });

export default app;
