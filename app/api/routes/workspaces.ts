import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { workspaceSchema } from "@/schemas";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/health", (c) => {
    return c.json({ status: "OK" });
  })
  .post(
    "/",
    zValidator("json", workspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { name } = c.req.valid("json");

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
        }
      );
      return c.json({ data: workspace });
    }
  );

export default app;
