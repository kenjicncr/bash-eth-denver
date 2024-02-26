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
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

import Image from "next/image";

import novaAppleQr from "@/assets/icons/nova-qr-apple.png";
import novaAndroidQr from "@/assets/icons/nova-qr-android.png";

import appStore from "@/assets/icons/app-store.png";
import googlePlay from "@/assets/icons/google-play.png";

interface DownloadNovaModalProps {
  onClickContinue?: () => void;
}
export const DownloadNovaModal = ({
  onClickContinue,
}: DownloadNovaModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex justify-center items-center h-8 px-4 py-6 flex-shrink-0 rounded-md border-2 border-pink-600 bg-pink-600">
          <div className="grid grid-cols-2 gap-2 mr-2">
            <FaApple />
            <IoLogoGooglePlaystore />
          </div>
          Download Nova Wallet
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-teal-400">
        <DialogHeader>
          <DialogTitle>Download Nova Wallet</DialogTitle>
          <DialogDescription className="pt-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="grid gap-4">
                <Image src={novaAppleQr} alt="nova apple qr code download" />
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://apps.apple.com/us/app/nova-polkadot-wallet/id1597119355?utm_source=bash.audio&utm_medium=referral&utm_campaign=app_download&utm_content=app_store_link"
                >
                  <Image src={appStore} alt="nova apple app store download" />
                </a>
              </div>
              <div className="grid gap-4">
                <Image
                  src={novaAndroidQr}
                  alt="nova android qr code download"
                />
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://play.google.com/store/apps/details?id=io.novafoundation.nova.market?utm_source=bash.audio&utm_medium=referral&utm_campaign=app_download&utm_content=app_store_link"
                >
                  <Image src={googlePlay} alt="nova google play download" />
                </a>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
