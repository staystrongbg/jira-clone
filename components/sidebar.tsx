import Image from 'next/image';
import Link from 'next/link';
import { DottedSeparator } from './shared/dotted-separator';
import { Navigation } from './navigation';

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 w-full p-4">
      <Link href="/">
        <Image
          src={'/logo.svg'}
          alt="Logo"
          width={164}
          height={48}
          className="cursor-pointer h-auto w-auto"
        />
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};
