"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant={"outline"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-neutral-100">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Select a page</SheetDescription>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
