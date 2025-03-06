import { UserCircle } from "lucide-react"; // Placeholder icon
import { Button } from "@/components/ui/button";
import React, { Fragment, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";

import { useRouter } from "next/navigation";
import SignOutDialog from "./SignOutDialog"; // Import the new component

const UserBadge = ({ name = "Guest", role = "", pic = "" }) => {
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const router = useRouter();

  const handleSettings = () => {
    if (role === "instructor") {
      router.push("/instructor/panel");
    } else if (role === "student") {
      router.push("/student/panel");
    } else if (role === "admin") {
      router.push("/admin/panel");
    }
  };

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center space-x-5 w-fit p-0">
            <UserCircle className="w-7 h-7" />
            <div className="flex flex-col text-left">
              <span className="font-medium px-2">{name}</span>
              <span className="font-light px-2 text-xs uppercase">
                {role.toUpperCase()}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsSignOutDialogOpen(true)}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sign-out confirmation dialog */}
      <SignOutDialog
        isOpen={isSignOutDialogOpen}
        onOpenChange={setIsSignOutDialogOpen}
      />
    </Fragment>
  );
};

export default UserBadge;
