'use server';

import { z } from 'zod';

export async function signInUser(data: FormData) {
  const email = data.get('email') as string;
  const password = data.get('password') as string;
  //zod validation here on the server side
  const formSchema = z.object({
    email: z.string({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  });
  const parsedData = formSchema.safeParse({ email, password });

  console.log('Parsed Data:', parsedData);
}
