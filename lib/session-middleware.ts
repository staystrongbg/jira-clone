'server-only';
// lib/session-middleware.ts

import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabaseType,
  type Storage as StorageType,
  type Users as UsersType,
} from 'node-appwrite';

import { AUTH_COOKIE } from '../app/(auth)/constants';

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabaseType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const sessionCookie = getCookie(c, AUTH_COOKIE);

    if (!sessionCookie) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Here you would typically verify the session cookie
    // For example, you could check it against a database or an external service

    client.setSession(sessionCookie);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    c.set('account', account);
    c.set('databases', databases);
    c.set('storage', storage);
    c.set('user', user);

    // If the session is valid, proceed to the next middleware or route handler
    await next();
  }
);
