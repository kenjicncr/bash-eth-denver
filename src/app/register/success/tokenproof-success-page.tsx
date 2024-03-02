"use client";
import { Button, Input, Skeleton, Spacer } from "@nextui-org/react";
import { LandingPagePartners } from "@/components/landing-page-partners";
import { DownloadNovaModal } from "@/components/download-nova-modal";
import SubwalletLogo from "@/assets/logos/subwallet-icon.png";

import Image from "next/image";
import { PolkadotButtonModal } from "@/components/polkadot-button-modal";
import { useLocalStorage } from "react-use";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { updateUser } from "@/lib/api/update-user";
import { toast } from "sonner";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { isValidAddressPolkadotAddress } from "@/lib/polkadot/utils";

type DownloadViewProps = {
  onContinue: () => void;
  onBack: () => void;
  isTokenproofValid?: boolean;
  onConnectAccount: (address: string) => void;
  onChangeAddress: (address: string) => void;
  address: string;
  isSubmitLoading: boolean;
  isAuthenticated: boolean;
};

const DownloadView = ({
  onBack,
  onContinue,
  isTokenproofValid,
  onConnectAccount,
  onChangeAddress,
  address,
  isSubmitLoading,
  isAuthenticated,
}: DownloadViewProps) => {
  return (
    <div>
      <div>
        <div className="flex flex-col lg:flex-row gap-2">
          <p className="text-gray-400 font-nimbus-sans-extended text-base font-normal">
            Step 3 of 3:
          </p>
          {isAuthenticated ? (
            <p className="mb-2">
              Check your Tokenproof app for the{" "}
              <span className="font-bold">{`{bash}`}</span> ticket and event
              details.
            </p>
          ) : (
            <p>Get access with a polkadot wallet</p>
          )}
        </div>
        <div className="my-4 w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="flex flex-col">
          {isAuthenticated ? (
            <div>
              <p className="text-teal-300 text-xl text-center">
                Download a Polkadot Wallet for hidden rewards 👀
              </p>
              <p className="text-gray-100 text-md text-center font-normal">
                You don{`'`}t want to miss this
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xl text-center">
                Please download a Polkadot Wallet and provide the address you
                generate. We will verify it upon your arrival at the door.
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center py-4">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
            <DownloadNovaModal />
            <p className="text-center">or</p>
            <Button
              radius="sm"
              variant="flat"
              className="opacity-100 hover:text-primary-300 hover:text-opacity-100 w-52"
              as="a"
              target="_blank"
              rel="noreferrer noopener nofollow"
              href="https://www.subwallet.app/download.html?lang=1"
              startContent={
                <Image src={SubwalletLogo} alt="token proof" height={20} />
              }
            >
              Download Subwallet
            </Button>
          </div>
        </div>
        <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="flex flex-col items-center w-full">
          <div className="py-4 flex flex-col items-center w-full">
            <p className="text-gray-100 text-sm mb-2">
              {" "}
              {`Already installed a polkadot wallet?`}
            </p>
            <div>
              <PolkadotButtonModal
                address={address}
                onChangeAddress={onChangeAddress}
                onConnectAccount={onConnectAccount}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 w-full flex justify-between">
        <div />
        <Button
          radius="sm"
          variant="flat"
          size="lg"
          className="bg-primary-500 w-full lg:w-auto opacity-100 hover:text-primary-300 hover:text-opacity-100"
          isLoading={isSubmitLoading}
          onClick={onContinue}
        >
          {isAuthenticated ? "submit for hidden rewards" : "submit"}
        </Button>
      </div>
    </div>
  );
};

export const TokenproofSuccessPage = () => {
  const [email, setEmail] = useLocalStorage("email", "");
  const [nonce, setNonce] = useLocalStorage("nonce", "");

  console.log({ email, nonce });

  const nonceAccountQuery = useQuery({
    queryKey: ["nonce-account", nonce],
    queryFn: async () => {
      const response = await fetch(`/api/get-nonce-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nonce,
        }),
      });

      return await response.json();
    },

    enabled: !!nonce,
  });

  console.log(nonceAccountQuery.data);

  useEffect(() => {
    if (nonceAccountQuery.data?.account) {
      const handleUpdateUserAccount = async () => {
        return await updateUser({
          email: email!,
          tokenproofAddress: nonceAccountQuery.data.account,
        });
      };

      handleUpdateUserAccount();
    }
  }, [nonceAccountQuery.data?.account, email]);

  console.log(nonceAccountQuery.data);

  const [polkadotAddress, setPolkadotAddress] = useState("");

  // For Nov wallet submission

  const submitNovaWalletMutation = useMutation({
    mutationFn: (polkadotAddress: string) => {
      return updateUser({ email: email!, polkadotAddress });
    },
    onSuccess: (data) => {
      console.log({ data });
      // setPolkadotAddress(polkadotAddress);
      toast.success("Thank you! You're all set.", {
        duration: 20000,
        dismissible: true,
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        duration: 10000,
        dismissible: true,
      });
    },
    mutationKey: ["update-user-polkadot", polkadotAddress],
  });

  const handleChangePolkadotAddress = (address: string) => {
    setPolkadotAddress(address);
  };

  const handleConnectNovaWallet = (address: string) => {
    console.log({ address });
    setPolkadotAddress(address);
  };

  const handleOnContinueConnect = () => {
    if (isValidAddressPolkadotAddress(polkadotAddress)) {
      submitNovaWalletMutation.mutate(polkadotAddress);
    } else {
      toast.error("Not a valid polkadot address", {
        position: "top-center",
      });
    }
  };

  const router = useRouter();

  const isAuthenticated = nonceAccountQuery.data?.status === "authenticated";

  return (
    <div className="max-w-2xl mx-auto w-full">
      {!nonceAccountQuery.isLoading ? (
        <div className="overflow-hidden relative w-full h-screen flex flex-col justify-center items-center h-screen px-4">
          <div className="absolute bottom-0 opacity-30 z-0">
            <LandingPagePartners />
          </div>
          <div className="relative z-1 w-full">
            <p className="text-4xl w-full text-white font-black">
              {isAuthenticated ? (
                <span className="text-yellow-500">
                  Congrats! You’re in for March 02.
                </span>
              ) : (
                <span className="text-red-500 text-3xl">
                  Looks like you {`don't`} have an ETH Denver Ticket
                </span>
              )}
            </p>
            <p>Email: {email}</p>
            <DownloadView
              onBack={() => {}}
              isAuthenticated={isAuthenticated}
              onContinue={handleOnContinueConnect}
              onChangeAddress={handleChangePolkadotAddress}
              onConnectAccount={handleConnectNovaWallet}
              address={polkadotAddress}
              isSubmitLoading={submitNovaWalletMutation.isPending}
            />
          </div>
        </div>
      ) : (
        <div className="overflow-hidden relative w-full h-screen flex flex-col justify-center items-center h-screen px-4">
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
