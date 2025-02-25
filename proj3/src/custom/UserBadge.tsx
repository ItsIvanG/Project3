import React, { Fragment, useState } from "react";
import { UserCircle } from "lucide-react"; // Placeholder icon
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store";
import { set } from "date-fns";
import { toast } from "@/hooks/use-toast";

const UserBadge = ({ name = "Guest", role = "", pic = "" }) => {
  const setName = useUserStore((state) => state.setName);
  const setRole = useUserStore((state) => state.setRole);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSignOut = () => {
    setName("");
    setRole("");
    toast({ title: "Signed out successfully" });
  };
  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center space-x-5 w-fit p-0">
            <UserCircle className="w-7 h-7" /> {/* Icon */}
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
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign out?</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="destructive"
                onClick={handleSignOut}
              >
                Yes
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                No
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UserBadge;
