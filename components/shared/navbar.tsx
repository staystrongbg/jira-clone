'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  const isSignInPage = pathname === '/sign-in';
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Image
          src="/logo-light.svg"
          alt="Logo"
          width={152}
          height={32}
          priority
          className="cursor-pointer h-auto w-auto"
        />
        <div>
          <Button asChild variant={'secondary'} className="ml-4">
            <Link href={isSignInPage ? 'sign-up' : 'sign-in'}>
              {isSignInPage ? 'Sign Up ' : 'Sign In'}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
