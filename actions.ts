import { AUTH_COOKIE } from '@/app/(auth)/constants';

import { cookies } from 'next/headers';
import { Account, Client, Models } from 'node-appwrite';

export const getCurrentUser = async (): Promise<Models.User | null> => {
  try {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    if (!endpoint || !project) {
      throw new Error('Appwrite endpoint or project not configured');
    }

    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(project);

    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE);

    if (!sessionCookie) {
      return null;
    }

    // Set the session cookie on the client
    client.setSession(sessionCookie.value);

    const account = new Account(client);

    return await account.get();
  } catch (error) {
    console.error('Failed to fetch current user:', error instanceof Error ? error.message : error);
    return null;
  }
};
