"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { routes } from "../app/(dashboard)/constants";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const isActive = pathname === route.href;
        const Icon = route.icon;
        return (
          <Link key={route.href} href={route.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 font-medium rounded-md hover:text-primary hover:bg-gray-200 transition-all"
              )}
            >
              <Icon
                className={cn(
                  "size-5 text-neutral-500",
                  isActive && "text-blue-500"
                )}
              />
              {route.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
