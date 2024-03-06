import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface DialogEmailSuccess {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export const DialogEmailSuccess = ({
  isOpen,
  onOpenChange,
}: DialogEmailSuccess) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] min-h-48 py-8 flex items-center justify-center">
        <DialogHeader className="">
          <DialogTitle className=" text-center text-4xl text-teal-300">
            Success!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            You are now part of our mailing list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
