"use client";

import { routes } from "@/app/(dashboard)/constants";
import { MobileSidebar } from "../mobile-sidebar";
import { UserButton } from "./user-button";
import { usePathname } from "next/navigation";

type PageTitleAndDescriptionProps = {
  title: string;
  description: string;
};
const PageTitleAndDescription = ({
  title,
  description,
}: PageTitleAndDescriptionProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const page = routes.find((route) => route.href === pathname);
  const title = page?.label || "";
  const description = page?.description || "";

  return (
    <nav className="flex items-center justify-between lg:p-6 p-4 w-full">
      <MobileSidebar />
      <PageTitleAndDescription title={title} description={description} />
      <UserButton />
    </nav>
  );
};
