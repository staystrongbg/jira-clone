import { AUTH_COOKIE } from '@/app/(auth)/constants';

import { cookies } from 'next/headers';
import { Account, Client } from 'node-appwrite';

export const getCurrentUser = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

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
    console.error('Error fetching current user:', error);
    return null;
  }
};
