import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store";
import { toast } from "@/hooks/use-toast";

interface SignOutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignOutDialog: React.FC<SignOutDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const setName = useUserStore((state) => state.setName);
  const setRole = useUserStore((state) => state.setRole);
  const setAccountId = useUserStore((state) => state.setAccountId);

  const handleSignOut = () => {
    setName("");
    setRole("guest");
    setAccountId("");
    toast({ title: "Signed out successfully" });
    onOpenChange(false); // Close the dialog after sign-out
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign out?</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={handleSignOut}>
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
  );
};

export default SignOutDialog;
