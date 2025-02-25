import React from "react";
import { UserCircle } from "lucide-react"; // Placeholder icon
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserBadge = ({ name = "Guest", pic = "", role = "" }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-5  w-fit p-0">
          <UserCircle className="w-7 h-7 " /> {/* Icon */}
          <div className="flex flex-col text-left">
            <span className="font-medium px-2">{name}</span>
            <span className="font-light px-2 text-xs uppercase">
              {role.toUpperCase()}
            </span>{" "}
            {/* Role */}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBadge;
