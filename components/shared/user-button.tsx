"use client";

import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AvatarFallback } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { useCurrentUser } from "../auth/api/use-current";
import { useLogout } from "../auth/api/use-logout";

export const UserButton = () => {
  const { data } = useCurrentUser();
  const { mutate: logOut } = useLogout();

  const avatarFallback = data?.name.charAt(0) || data?.email.charAt(0) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={() => logOut()} className="cursor-pointer">
          <LogOut className="size-4 mr-2 text-amber-600" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
