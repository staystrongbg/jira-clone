'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Image
          src="/logo-light.svg"
          alt="Logo"
          width={152}
          height={32}
          priority
          className="cursor-pointer"
        />
        <div>
          <Link
            href="/"
            className="text-white px-4 py-2 hover:bg-gray-700 rounded"
          >
            Home
          </Link>
          <Button variant={'secondary'} className="ml-4">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};
