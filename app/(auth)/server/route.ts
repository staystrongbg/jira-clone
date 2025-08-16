import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signupSchema } from "@/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { ID } from "node-appwrite";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";

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
    try {
      const { email, password } = c.req.valid("json");

      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return c.json({ data: session, success: true }, 200);
    } catch (error: any) {
      // Appwrite specific error for invalid credentials
      if (error.code === 401) {
        return c.json({ error: "Invalid email or password." }, 401);
      }
      // Generic error for other cases
      return c.json({ error: "An unexpected error occurred." }, 500);
    }
  })
  .post("/signup", zValidator("json", signupSchema), async (c) => {
    try {
      const { email, password, username } = c.req.valid("json");
      const { account } = await createAdminClient();

      // Create a new user
      await account.create(ID.unique(), email, password, username);

      // Automatically log the user in by creating a session
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return c.json({ success: true }, 201);
    } catch (error: any) {
      // Appwrite specific error for existing user
      if (error.code === 409) {
        return c.json({ error: "A user with this email already exists." }, 409);
      }
      // Generic error for other cases
      return c.json({ error: "An unexpected error occurred." }, 500);
    }
  })
  .post("/logout", sessionMiddleware, async (c) => {
    //if unauthenticcated user tries to logout he will be introduced to 401 Unauthorized  otherwise information about session will be sent
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true }, 200);
  });

export default app;
