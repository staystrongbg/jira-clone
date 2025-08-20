"use client";

import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AvatarFallback } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { useCurrentUser } from "../../hooks/auth/use-current";
import { useLogout } from "../../hooks/auth/use-logout";

export const UserButton = () => {
  const { data: user } = useCurrentUser();
  const { mutate: logOut } = useLogout();

  const avatarFallback = user?.name.charAt(0) || user?.email.charAt(0) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => logOut()} className="cursor-pointer">
          <LogOut className="size-4 mr-2 text-amber-600" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
