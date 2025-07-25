'use client';

import { DottedSeparator } from '../shared/dotted-separator';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';

const formSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string({ message: 'Invalid password' }).min(6),
});

export const SignInCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', data);
    //add error handling and success messages as needed
    try {
      // Simulate form submission logic
      // This could be an API call to your backend for authentication
      console.log('Submitting form with data:', data);
      // If successful, you might redirect the user or show a success message
      // If there's an error, you can set an error state in the form
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: 'An error occurred during form submission',
      });
      console.error('Error during form submission:', error);
      // Handle error (e.g., show a toast notification)
      return;
    }
    form.reset(); // Reset the form after submission
    // Handle form submission logic here
  };

  return (
    <Card className="w-full h-full md:w-[487ox] shadow-none border-none">
      <CardHeader className="flex flex-col items-center justify-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button variant={'secondary'} size={'lg'} className="w-full">
          Sign in with Google
        </Button>
        <Button variant={'secondary'} size={'lg'} className="w-full">
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  );
};
