import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";

export const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <aside className="h-full bg-neutral-100 w-full p-4 flex flex-col cursor-pointer">
      {!isMobile && (
        <Link href="/">
          <Image
            src={"/logo.svg"}
            alt="Logo"
            width={164}
            height={48}
            className="h-auto w-auto"
          />
        </Link>
      )}
      <DottedSeparator className="my-4" />
      <div className="flex-grow">
        <Navigation />
      </div>
      <DottedSeparator className="my-4" />
      {isMobile && (
        <Link href="/" className="w-fit self-center">
          <Image
            src={"/logo.svg"}
            alt="Logo"
            width={164}
            height={48}
            className="h-auto w-auto"
          />
        </Link>
      )}
    </aside>
  );
};
