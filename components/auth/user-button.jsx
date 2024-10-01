"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import UserAvatar from "../user-avatar";
import { LogoutButton } from "./logout-button";

export const UserButton = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        {/* Dot at the top right */}
        <div className="absolute top-[0.10rem] right-[0.10rem] z-10 h-2 w-2 bg-rose rounded-full border border-neutral-400"></div>
        <UserAvatar src={user?.image} quality={90} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 p-2" align="end">
        {/* <Separator /> */}
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer ">
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
