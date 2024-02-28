import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import novaAppleQr from "@/assets/icons/nova-qr-apple.png";
import novaAndroidQr from "@/assets/icons/nova-qr-android.png";
import appStore from "@/assets/icons/app-store.png";
import googlePlay from "@/assets/icons/google-play.png";
import { Button } from "@nextui-org/react";
import SubwalletLogo from "@/assets/logos/subwallet-icon.png";

interface DownloadSubwalletModalProps {
  onClickContinue?: () => void;
}
export const DownloadSubwalletModal = ({
  onClickContinue,
}: DownloadSubwalletModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          radius="sm"
          variant="flat"
          className="opacity-100 hover:text-primary-300 hover:text-opacity-100 w-52"
          startContent={
            <Image src={SubwalletLogo} alt="token proof" height={20}/>
          }
        >
          Download Subwallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-teal-400">
        <DialogHeader>
          <DialogTitle>Download Subwallet</DialogTitle>
          <DialogDescription className="pt-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="grid gap-4">
                <Image src={novaAppleQr} alt="nova apple qr code download" />
                <button>
                  <Image src={appStore} alt="nova apple app store download" />
                </button>
              </div>
              <div className="grid gap-4">
                <Image
                  src={novaAndroidQr}
                  alt="nova android qr code download"
                />
                <button>
                  <Image src={googlePlay} alt="nova google play download" />
                </button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-8">
          <DialogClose
            onClick={onClickContinue}
            className="flex justify-center items-center h-8 px-4 py-6 flex-shrink-0 rounded-md border-2 text-black bg-white"
          >
            I have installed Subwallet
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
