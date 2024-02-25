"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CustomButton } from "./custom-button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import {
  safeConvertAddressSS58,
  usePolkadotWeb3,
} from "@/lib/polkadot/hooks/usePolkadotAccounts";
import { PolkadotButton } from "./polkadot-button";
import { TokenProofResponse, TokenproofButton } from "./tokenproof-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "@/lib/api/update-user";
import { error } from "console";
import { isValidAddressPolkadotAddress } from "@/lib/polkadot/utils";
export const Registration = () => {
  type View = "email" | "download" | "connect" | "tokenproof" | "success";

  const [currentView, setCurrentView] = useState<View>("email");

  const [email, setEmail] = useState("");
  const [polkadotAddress, setPolkadotAddress] = useState("");

  const submitEmailMutation = useMutation({
    mutationFn: (email: string) => {
      return updateUser({ email });
    },
    onSuccess: (data) => {
      console.log({ data });
      setEmail(data.user.email);
      setCurrentView("download");
    },
    mutationKey: ["update-user-email", email],
  });

  const handleSubmitEmail = (email: string) => {
    submitEmailMutation.mutate(email);
  };

  // For Nov wallet submission

  const submitNovaWalletMutation = useMutation({
    mutationFn: (polkadotAddress: string) => {
      return updateUser({ email: email, polkadotAddress });
    },
    onSuccess: (data) => {
      console.log({ data });
      setPolkadotAddress;
      setCurrentView("tokenproof");
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-center",
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
    setPolkadotAddress(address);
  };

  const handleOnContinueConnect = () => {
    if (isValidAddressPolkadotAddress(polkadotAddress)) {
      submitNovaWalletMutation.mutate(polkadotAddress);
    } else {
      toast.error("Not a valid polkadot address");
    }
  };

  // --- end nova wallet submission //

  /** --- start tokenproof submission --- */

  const submitTokenproofMutation = useMutation({
    mutationFn: (tokenproofAddress: string) => {
      return updateUser({ email: email, tokenproofAddress });
    },
    onSuccess: (data) => {
      console.log({ data });
      setCurrentView("success");
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 10000,
        dismissible: true,
      });
    },
  });

  const handleTokenProofSuccess = (account: string) => {
    submitTokenproofMutation.mutate(account);
  };

  /** --- end tokenproof submission --- */

  const handleContinueDownload = () => {
    setCurrentView("connect");
  };

  const handleBack = ({ goBackTo }: { goBackTo: View }) => {
    setCurrentView(goBackTo);
  };

  const renderRegistrationView = () => {
    switch (currentView) {
      case "tokenproof":
        return (
          <TokenproofView
            onBack={() => handleBack({ goBackTo: "connect" })}
            onSuccess={handleTokenProofSuccess}
            onError={(message) =>
              toast.error(message, {
                position: "bottom-center",
                duration: 10000,
              })
            }
          />
        );
      case "download":
        return (
          <DownloadView
            onBack={() => handleBack({ goBackTo: "email" })}
            onContinue={handleContinueDownload}
          />
        );
      case "connect":
        return (
          <ConnectWalletView
            address={polkadotAddress}
            onChangeAddress={handleChangePolkadotAddress}
            onConnectAccount={handleConnectNovaWallet}
            onContinue={handleOnContinueConnect}
            onBack={() => handleBack({ goBackTo: "download" })}
            isContinueLoading={submitNovaWalletMutation.isPending}
          />
        );
      case "success":
        return <SuccessView onBack={() => handleBack({ goBackTo: "email" })} />;
      default:
        return (
          <EmailView
            email={email}
            onChangeEmail={(email) => setEmail(email)}
            isLoading={submitEmailMutation.isPending}
            onContinue={(email) => handleSubmitEmail(email)}
          />
        );
    }
  };
  return (
    <div className="max-w-md w-full">
      <div className="flex justify-start items-end">
        <Image
          src="/bash.svg"
          alt="Logo"
          priority
          width={100}
          height={100}
          style={{ height: `auto`, width: `100px` }}
        />
        <p className="text-teal-600 font-nimbus-sans text-15 font-bold leading-none ml-4">
          ticket registration
        </p>
      </div>
      {currentView === "success" && (
        <p className="font-bold mb-2 mt-4 text-2xl text-yellow-400">
          Congrats! You’re in for March 02.
        </p>
      )}
      <div className="pt-8">{renderRegistrationView()}</div>
    </div>
  );
};

type EmailViewProps = {
  onContinue: (email: string) => void;
  onBack?: () => void;
  isLoading?: boolean;
  email: string;
  onChangeEmail: (email: string) => void;
};

const EmailView = ({
  email,
  onChangeEmail,
  onContinue,
  onBack,
  isLoading,
}: EmailViewProps) => {
  const [isValid, setIsValid] = useState(true);
  const [showError, setShowError] = useState(false);

  const handleEmailChange = (e: any) => {
    const _email = e.target.value;

    onChangeEmail(_email);
  };

  const onSubmit = () => {
    if (isValid) {
      setShowError(false);
      onContinue && onContinue(email);
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    // Basic email format validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValid(isValidEmail);
  }, [email]);

  return (
    <div>
      <p className="text-teal-400 font-nimbus-sans-extended text-base font-normal">
        Step 1 of 4:
      </p>
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="enter your email address"
          className="focus:placeholder-opacity-25 px-4 py-8 text-white placeholder-white w-full bg-inherit font-nimbus-sans-extended text-base font-normal focus:outline-none"
        />
        <div className="px-4 h-4 absolute -bottom-4">
          {showError && (
            <p className="text-red-500 text-sm">
              Please enter a valid email address
            </p>
          )}
        </div>
        <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      <div className="pt-12 w-full flex justify-between">
        <div>
          {onBack && <CustomButton onClick={onBack}>back</CustomButton>}
        </div>

        <CustomButton isLoading={isLoading} onClick={onSubmit}>
          continue
        </CustomButton>
      </div>
    </div>
  );
};

interface TokenproofViewProps {
  onContinue?: () => void;
  onBack: () => void;
  onSuccess: (account: string) => void;
  onError?: (message: string) => void;
}
const TokenproofView = ({
  onContinue,
  onBack,
  onSuccess,
  onError,
}: TokenproofViewProps) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [acount, setAccount] = useState<string | undefined>(undefined);
  const [nonce, setNonce] = useState("");

  const accountQuery = useQuery({
    queryKey: ["account", nonce],
    enabled: isAuthenticated && nonce !== "",
    queryFn: async () => {
      const data = await fetch("/api/check-authentication-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nonce: nonce }),
      });

      const dataJson = await data.json();

      if (dataJson.claimTicketResult) {
        if (dataJson.claimTicketResult.claim_id) {
          console.log({ dataJson });
          onSuccess(dataJson.account);
        }

        if (dataJson.claimTicketResult.code) {
          onError && onError(dataJson.claimTicketResult.message);
        }
      }

      return dataJson;
    },
  });

  const handleTokenProofOnAuthenticate = (response: TokenProofResponse) => {
    response.status === "authenticated"
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);

    setNonce(response.nonce);
  };

  return (
    <div>
      <div className="flex">
        <p className="text-teal-400 font-nimbus-sans-extended text-base font-normal">
          Step 3 of 3:
        </p>
        <p className="font-bold mb-2 ml-2">
          verify with tokenproof to claim ticket
        </p>
      </div>
      <div className="py-12">
        <TokenproofButton onAuthenticate={handleTokenProofOnAuthenticate} />
      </div>
      <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
      {accountQuery.data && <p>{accountQuery.data.account}</p>}
      <div className="pt-12 w-full flex justify-between">
        <CustomButton onClick={onBack}>back</CustomButton>
      </div>
    </div>
  );
};

type DownloadViewProps = {
  onContinue: () => void;
  onBack: () => void;
};

const DownloadView = ({ onBack, onContinue }: DownloadViewProps) => {
  return (
    <div>
      <div>
        <div className="flex">
          <p className="text-teal-400 font-nimbus-sans-extended text-base font-normal">
            Step 2 of 4:
          </p>
          <p className="font-bold mb-2 ml-2">download nova wallet on mobile</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2">scan qr code</p>
          <Image src="/nova-qr.png" alt="qr code" width={200} height={200} />
          <p className="py-4">or visit</p>
          <div className="mb-4">
            <a
              href="https://novawallet.io/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline"
            >
              https://novawallet.io/
            </a>
          </div>
        </div>

        <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      <div className="pt-12 w-full flex justify-between">
        <CustomButton onClick={onBack}>back</CustomButton>
        <CustomButton onClick={onContinue}>continue</CustomButton>
      </div>
    </div>
  );
};

interface ConnectWalletViewProps {
  onBack: () => void;
  onContinue: () => void;
  address: string;
  onConnectAccount: (address: string) => void;
  onChangeAddress: (address: string) => void;
  isContinueLoading: boolean;
}
const ConnectWalletView = ({
  onBack,
  onContinue,
  onConnectAccount,
  onChangeAddress,
  address,
  isContinueLoading,
}: ConnectWalletViewProps) => {
  const { open, close } = useWeb3Modal();
  const { address: activeAddress, addresses } = useAccount();

  const handlePolkadotAddressChange = (e: any) =>
    onChangeAddress(e.target.value); // handleChange

  const handleClickConnectWallet = () => {
    open();
  };

  return (
    <div>
      <div>
        <div className="flex">
          <p className="text-teal-400 font-nimbus-sans-extended text-base font-normal">
            Step 2 of 3:
          </p>
          <p className="font-bold mb-2 ml-2">connect nova wallet</p>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="py-12 flex flex-col items-center w-full">
            <div>
              <PolkadotButton onConnectAccount={onConnectAccount} />
            </div>
            <div className="w-full ">
              <p className="text-teal-400 py-4 text-center font-nimbus-sans-extended text-base font-normal">
                or
              </p>
              <p
                className="text-white text-center mb-4 font-nimbus-sans-extended text-base font-normal"
                onClick={handleClickConnectWallet}
              >
                copy paste nova wallet address here
              </p>
              <div className="w-full">
                <input
                  type="text"
                  value={address}
                  onChange={handlePolkadotAddressChange}
                  className="focus:placeholder-opacity-25 boder-solid border-teal-400 border-2 px-4 py-4 text-white placeholder-white w-full bg-inherit font-nimbus-sans-extended  font-normal focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      <div className="pt-12 w-full flex justify-between">
        <CustomButton onClick={onBack}>back</CustomButton>
        <CustomButton isLoading={isContinueLoading} onClick={onContinue}>
          continue
        </CustomButton>
      </div>
    </div>
  );
};

type SuccessViewProps = {
  onBack: () => void;
};
const SuccessView = ({ onBack }: SuccessViewProps) => {
  return (
    <div>
      <div>
        <div className="flex">
          <p className="mb-2">
            Check your Tokenproof app for the{" "}
            <span className="font-bold">{`{bash}`}</span> ticket and event
            details.
          </p>
        </div>
        <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="flex flex-col pt-12">
          <p className="text-teal-600 text-xl">
            {" "}
            You’re eligible for hidden rewards!{" "}
          </p>
          <p className="text-gray-500 text-md font-normal">
            Keep your Nova wallet handy during and after the event. We’ll be
            dropping you all sorts of cool things. You’ll also need to show this
            for entry to venue.
          </p>
        </div>
      </div>
      <div className="pt-12 w-full flex justify-between">
        <CustomButton onClick={onBack}>back</CustomButton>
      </div>
    </div>
  );
};
