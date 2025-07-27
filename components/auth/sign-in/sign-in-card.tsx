'use client';

import { DottedSeparator } from '../../shared/dotted-separator';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import Image from 'next/image';
import { SignInForm } from './sign-in-form';
import Link from 'next/link';

export const SignInCard = () => {
  return (
    <Card className=" h-full md:w-[487px] shadow-none border-none">
      <CardHeader className="flex flex-col items-center justify-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <SignInForm />
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button variant={'secondary'} size={'lg'} className="w-full">
          <Image src={'/google.svg'} width={24} height={24} alt="google" /> Sign
          in with Google
        </Button>
        <Button variant={'secondary'} size={'lg'} className="w-full">
          <Image src={'/github.svg'} width={24} height={24} alt="git" />
          Sign in with GitHub
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{' '}
          <span className="text-blue-500 hover:underline">
            <Link href="/sign-up">Sign Up</Link>
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
