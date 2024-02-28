"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CustomButton } from "./custom-button";
import { useAccount } from "wagmi";
import {
  safeConvertAddressSS58,
  usePolkadotWeb3,
} from "@/lib/polkadot/hooks/usePolkadotAccounts";
import { PolkadotButtonModal } from "./polkadot-button-modal";
import { TokenProofResponse, TokenproofButton } from "./tokenproof-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "@/lib/api/update-user";
import { error } from "console";
import { isValidAddressPolkadotAddress } from "@/lib/polkadot/utils";
import { DownloadSubwalletModal } from "./download-subwallet-modal";
import appStore from "@/assets/icons/app-store.png";
import googlePlay from "@/assets/icons/google-play.png";
import { DownloadNovaModal } from "./download-nova-modal";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }, // Customize as needed
  },
};

const fadeInSlower = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 1 }, // Customize as needed
  },
};

export const Registration = () => {
  type View =
    | "email"
    | "download"
    | "connect"
    | "tokenproof"
    | "success"
    | "notethdenver";

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
      setCurrentView("tokenproof");
      setCurrentView("tokenproof");
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

  // --- end nova wallet submission //

  /** --- start tokenproof submission --- */

  const submitTokenproofMutation = useMutation({
    mutationFn: (tokenproofAddress: string) => {
      return updateUser({ email: email, tokenproofAddress });
    },
    onSuccess: (data) => {
      console.log({ data });
      setCurrentView("download");
    },
    onError: (error) => {
      setCurrentView("download");
      toast.error(error.message, {
        duration: 20000,
        dismissible: true,
        position: "top-center",
      });
    },
  });

  const handleTokenProofSuccess = (account: string) => {
    submitTokenproofMutation.mutate(account);
  };

  /** --- end tokenproof submission --- */
  const handleBack = ({ goBackTo }: { goBackTo: View }) => {
    setCurrentView(goBackTo);
  };

  const renderRegistrationView = () => {
    switch (currentView) {
      case "tokenproof":
        return (
          <TokenproofView
            onBack={() => handleBack({ goBackTo: "email" })}
            onSuccess={handleTokenProofSuccess}
            onContinueWithNoTokenProof={() => setCurrentView("notethdenver")}
            onError={(message) => {
              setCurrentView("download");
              toast.error(message, {
                position: "top-center",
                duration: 10000,
              });
            }}
          />
        );
      case "download":
        return (
          <DownloadView
            onBack={() => handleBack({ goBackTo: "tokenproof" })}
            onContinue={handleOnContinueConnect}
            onChangeAddress={handleChangePolkadotAddress}
            onConnectAccount={handleConnectNovaWallet}
            address={polkadotAddress}
            isSubmitLoading={submitNovaWalletMutation.isPending}
          />
        );
      case "notethdenver":
        return (
          <NotEthDenverAttendeeView
            onBack={() => handleBack({ goBackTo: "tokenproof" })}
            onContinue={handleOnContinueConnect}
            onChangeAddress={handleChangePolkadotAddress}
            onConnectAccount={handleConnectNovaWallet}
            address={polkadotAddress}
            isSubmitLoading={submitNovaWalletMutation.isPending}
          />
        );
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
    <div className="md:py-10 max-w-2xl mx-auto w-full">
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <p className="text-4xl w-full text-white font-black">
          Ticket Registration
        </p>
      </motion.div>
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
      <div className="flex flex-col lg:flex-row gap-2">
        <p className="text-teal-400 font-nimbus-sans-extended text-base font-normal">
          Step 1 of 3:
        </p>
        <p className="font-bold mb-2">register</p>
      </div>
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
  onContinueWithNoTokenProof: () => void;
  onBack: () => void;
  onSuccess: (account: string) => void;
  onError?: (message: string) => void;
}
const TokenproofView = ({
  onContinue,
  onBack,
  onSuccess,
  onError,
  onContinueWithNoTokenProof,
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
      <div className="flex flex-col lg:flex-row gap-2">
        <p className="text-teal-400 font-nimbus-sans-extended text-base font-normal">
          Step 2 of 3:
        </p>
        <p className="font-bold mb-2">
          verify with tokenproof to claim ticket now
        </p>
      </div>
      <p className="text-yellow-500">{`Congrats you're on the waitlist!`}</p>
      <p className="py-4 font-bold font-display text-lg">
        Are you an ETH Denver attendee?
      </p>
      <p>
        Skip the line by connecting your Tokenproof account. We{`'`}ll airdrop
        you your <span className="text-yellow-500">VIP ticket.</span>
      </p>
      <div className="py-12 flex flex-col items-center">
        <TokenproofButton onAuthenticate={handleTokenProofOnAuthenticate} />
        <button
          onClick={onContinueWithNoTokenProof}
          className="mt-4 text-gray-400 text-sm underline"
        >
          Not an ETH Denver attendee? Click here to download our partner apps
          for a Bash ticket
        </button>
      </div>
      <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="pt-12 w-full flex justify-between">
        <CustomButton onClick={onBack}>back</CustomButton>
      </div>
    </div>
  );
};

type DownloadViewProps = {
  onContinue: () => void;
  onBack: () => void;
  isTokenproofValid?: boolean;
  onConnectAccount: (address: string) => void;
  onChangeAddress: (address: string) => void;
  address: string;
  isSubmitLoading: boolean;
};

const DownloadView = ({
  onBack,
  onContinue,
  isTokenproofValid,
  onConnectAccount,
  onChangeAddress,
  address,
  isSubmitLoading,
}: DownloadViewProps) => {
  return (
    <div>
      <div>
        <div className="flex flex-col lg:flex-row gap-2">
          <p className="text-teal-400 font-nimbus-sans-extended text-base font-normal">
            Step 3 of 3:
          </p>
          <p className="font-bold mb-2">
            download a polkadot wallet for hidden rewards 👀
          </p>
        </div>
        <p className="font-bold text-2xl text-[#f0e68c] pt-4">
          Congrats! You’re in for March 02.
        </p>
        <div className="flex">
          <p className="mb-2">
            Check your Tokenproof app for the{" "}
            <span className="font-bold">{`{bash}`}</span> ticket and event
            details.
          </p>
        </div>
        <div className="my-4 w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="flex flex-col">
          <p className="text-teal-300 text-xl text-center">
            You’re eligible for hidden rewards!{" "}
          </p>
          <p className="text-gray-100 text-md text-center font-normal">
            Our sponsor polkadot will be dropping cool things during and after
            the event.{" "}
          </p>
          <p className="font-bold mt-1 text-center ">
            We guarantee you do not want to miss this.
          </p>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
            <DownloadNovaModal />
            <p className="text-center">or</p>
            <DownloadSubwalletModal />
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
              <PolkadotButtonModal onConnectAccount={onConnectAccount} />
            </div>
            <div className="w-full ">
              <p className="text-teal-400 py-2 text-center font-nimbus-sans-extended text-base font-normal">
                or
              </p>
              <p className="text-white text-center mb-4 font-nimbus-sans-extended text-base font-normal">
                copy paste polkadot wallet address you created here
              </p>
              <div className="w-full">
                <input
                  type="text"
                  value={address}
                  onChange={(e: any) => onChangeAddress(e.target.value)}
                  className="focus:placeholder-opacity-25 boder-solid border-teal-400 border-2 px-4 py-4 text-white placeholder-white w-full bg-inherit font-nimbus-sans-extended  font-normal focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 w-full flex justify-between">
        <CustomButton onClick={onBack}>back</CustomButton>
        <CustomButton isLoading={isSubmitLoading} onClick={onContinue}>
          submit for hidden rewards
        </CustomButton>
      </div>
    </div>
  );
};

type NotEthDenverAttendeeViewProps = {
  onBack: () => void;
  onConnectAccount: (address: string) => void;
  onChangeAddress: (address: string) => void;
  address: string;
  isSubmitLoading: boolean;
  onContinue: () => void;
};
const NotEthDenverAttendeeView = ({
  onBack,
  onConnectAccount,
  onChangeAddress,
  address,
  isSubmitLoading,
  onContinue,
}: NotEthDenverAttendeeViewProps) => {
  return (
    <div>
      <div>
        <div>
          <div className="flex flex-col lg:flex-row gap-2">
            <p className="text-teal-400 font-nimbus-sans-extended text-base font-normal">
              Step 3 of 3:
            </p>
            <p className="font-bold mb-2">
              download a polkadot wallet and show at the door for entry
            </p>
          </div>
          <p className="text-gray-100 text-md font-normal">
            Please note, only ETH Denver participants are eligble for the hidden
            rewards and special perks inside the event.
          </p>
          <div className="my-4 w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="flex flex-col items-center py-4">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
              <DownloadNovaModal />
              <p className="text-center">or</p>
              <DownloadSubwalletModal />
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="py-4 flex flex-col items-center w-full">
              <p className="text-gray-100 text-sm mb-2">
                {" "}
                {`Already installed a polkadot wallet?`}
              </p>
              <div>
                <PolkadotButtonModal onConnectAccount={onConnectAccount} />
              </div>
              <div className="w-full ">
                <p className="text-teal-400 py-2 text-center font-nimbus-sans-extended text-base font-normal">
                  or
                </p>
                <p className="text-white text-center mb-4 font-nimbus-sans-extended text-base font-normal">
                  copy paste polkadot wallet address you created here
                </p>
                <div className="w-full">
                  <input
                    type="text"
                    value={address}
                    onChange={(e: any) => onChangeAddress(e.target.value)}
                    className="focus:placeholder-opacity-25 boder-solid border-teal-400 border-2 px-4 py-4 text-white placeholder-white w-full bg-inherit font-nimbus-sans-extended  font-normal focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />

        <div className="pt-4 w-full flex justify-between">
          <CustomButton onClick={onBack}>back</CustomButton>
          <CustomButton isLoading={isSubmitLoading} onClick={onContinue}>
            submit for hidden rewards
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
