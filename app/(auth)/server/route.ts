import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { loginSchema, signupSchema } from '@/schemas';
import { createAdminClient } from '@/lib/appwrite';
import { deleteCookie, setCookie } from 'hono/cookie';
import { ID } from 'node-appwrite';

//same chaining here for type safety
//const app = ...
//app.get(...) is not valid because we loose type safety
//using middleware zValidator for validation

const app = new Hono()
  .post('/login', zValidator('json', loginSchema), async (c) => {
    // Here you would typically validate the username and password
    const { email, password } = c.req.valid('json');

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    setCookie(c, 'session', session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30
    });

    return c.json({ success: true }, 200);
  })
  .post('/signup', zValidator('json', signupSchema), async (c) => {
    const { email, password, username } = c.req.valid('json');

    const { account } = await createAdminClient();

    // Create a new user with the provided email, password, and username
    const user = await account.create(ID.unique(), email, password, username);

    //check if user already exists
    if (!user) {
      return c.json({ error: 'User already exists' }, 409);
    }

    // login the user after signup
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, 'session', session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return c.json({ data: user }, 200);
  })
  .post('/logout', async (c) => {
    const { account } = await createAdminClient();
    await account.deleteSession('current'); // Delete the current session
    deleteCookie(c, 'session');
    //session middleware
    return c.json({ success: true }, 200);
  });

export default app;
