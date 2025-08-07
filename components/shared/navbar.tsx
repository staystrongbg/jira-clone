'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { useCurrentUser } from '../auth/api/use-current';
import { useLogout } from '../auth/api/use-logout';

export const Navbar = () => {
  const { data } = useCurrentUser();
  const { mutate } = useLogout();

  const pathname = usePathname();
  const isSignInPage = pathname === '/sign-in';

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-light.svg"
            alt="Logo"
            width={152}
            height={32}
            priority
            className="cursor-pointer h-auto w-auto"
          />
        </Link>
        <div className="flex px-12 items-start w-full">
          <Link href="/dashboard" className="text-white ml-4">
            Dashboard
          </Link>
        </div>
        <div>
          {!data && (
            <Button asChild variant={'complementary'} className="ml-4">
              <Link href={isSignInPage ? 'sign-up' : 'sign-in'}>
                {isSignInPage ? 'Sign Up ' : 'Sign In'}
              </Link>
            </Button>
          )}
          {data && (
            <div className="flex items-center">
              <span className="text-white ml-2">
                <b className="tracking-wider">{data?.name}</b>
              </span>
              <Button
                variant={'destructive'}
                className="ml-4"
                onClick={() => mutate()}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
