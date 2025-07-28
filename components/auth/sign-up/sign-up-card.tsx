'use client';

import { DottedSeparator } from '../../shared/dotted-separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { SignUpForm } from './sign-up-form';
import Link from 'next/link';

export const SignUpCard = () => {
  return (
    <Card className=" h-full md:w-[487px] shadow-none border-none">
      <CardHeader className="flex flex-col items-center justify-center p-7">
        <CardTitle className="text-2xl">Join the Team</CardTitle>
      </CardHeader>
      <CardDescription className="text-center px-7">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-blue-500 hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-blue-500 hover:underline">
          Privacy Policy
        </Link>
        .
      </CardDescription>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <SignUpForm />
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{' '}
          <span className="text-blue-500 hover:underline">
            <Link href="/sign-in">Sign in</Link>
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
