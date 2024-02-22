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
export const Registration = () => {
  type View = "email" | "download" | "connect" | "success";

  const [currentView, setCurrentView] = useState<View>("download");

  const handleSubmitEmail = () => {
    setCurrentView("success");
  };

  const handleContinueDownload = () => {
    setCurrentView("connect");
  };

  const handleBack = ({ goBackTo }: { goBackTo: View }) => {
    setCurrentView(goBackTo);
  };

  const handleContinueConnect = () => {
    setCurrentView("email");
  };

  const renderRegistrationView = () => {
    switch (currentView) {
      case "email":
        return (
          <TokenproofView
            onBack={() => handleBack({ goBackTo: "connect" })}
            onContinue={handleSubmitEmail}
          />
        );
      case "download":
        return (
          <DownloadView onBack={() => {}} onContinue={handleContinueDownload} />
        );
      case "connect":
        return (
          <ConnectWalletView
            onContinue={handleContinueConnect}
            onBack={() => handleBack({ goBackTo: "download" })}
          />
        );
      case "success":
        return <SuccessView onBack={() => handleBack({ goBackTo: "email" })} />;
      default:
        return (
          <EmailView
            onBack={() => handleBack({ goBackTo: "connect" })}
            onContinue={handleSubmitEmail}
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
  onContinue: () => void;
  onBack: () => void;
};

const EmailView = ({ onContinue, onBack }: EmailViewProps) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div>
      <p className="text-gray-600 font-nimbus-sans-extended text-base font-normal">
        Step 3 of 3:
      </p>
      <div style={{ transform: `translateX(-50%)` }}>
        {/**
         * <input
          type="text"
          placeholder="enter your email address"
          className="focus:placeholder-opacity-25 px-4 py-4 text-white placeholder-white w-full bg-inherit font-nimbus-sans-extended text-base font-normal focus:outline-none"
        />
         */}
        <iframe
          src="https://lu.ma/embed-checkout/evt-iD7N4HyrRHKZ6MP"
          width="800"
          height="400"
          allowFullScreen={false}
          aria-hidden="false"
          tabIndex={0}
          className="overflow-hidden event-ticketing-iframe"
        />

        <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      <div className="pt-12 w-full flex justify-between">
        <CustomButton onClick={onBack}>back</CustomButton>
        <CustomButton onClick={onContinue}>continue</CustomButton>
      </div>
    </div>
  );
};

const TokenproofView = ({ onContinue, onBack }: EmailViewProps) => {
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

      return await data.json();
    },
  });

  const claimTicketMutate = useMutation({
    mutationFn: () => {
      const eventId = "741b389a-fa59-4063-9f56-1ee6fbc73635";
      const ticketId = "e73319c1-ff01-4602-b376-b871ab104017";
      return fetch("https://api.tokenproof.xyz/v1/tickets/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: accountQuery.data.account,
          network: "ethereum",
          event_id: eventId,
          ticket_options: [
            {
              guests: 1,
              id: ticketId,
            },
          ],
        }),
      });
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
      <p className="text-gray-600 font-nimbus-sans-extended text-base font-normal">
        Step 3 of 3:
      </p>
      <TokenproofButton onAuthenticate={handleTokenProofOnAuthenticate} />
      <button
        disabled={!isAuthenticated}
        onClick={() => claimTicketMutate.mutate()}
      >
        Claim ticket
      </button>
      {accountQuery.data && <p>{accountQuery.data.account}</p>}
      <div className="pt-12 w-full flex justify-between">
        <CustomButton onClick={onBack}>back</CustomButton>
        <CustomButton onClick={onContinue}>continue</CustomButton>
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
          <p className="text-gray-600 font-nimbus-sans-extended text-base font-normal">
            Step 1 of 3:
          </p>
          <p className="font-bold mb-2 ml-2">download nova wallet on mobile</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2">scan qr code</p>
          <Image src="/nova-qr.png" alt="qr code" width={200} height={200} />
          <p className="py-4">or visit</p>
          <div className="mb-4">
            <a href="https://novawallet.io/" className="underline">
              https://novawallet.io/
            </a>
          </div>
        </div>

        <div className="w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      <div className="pt-12 w-full flex justify-end">
        <CustomButton onClick={onContinue}>continue</CustomButton>
      </div>
    </div>
  );
};

const ConnectWalletView = ({ onBack, onContinue }: DownloadViewProps) => {
  const { open, close } = useWeb3Modal();
  const { address: activeAddress, addresses } = useAccount();

  const [address, setAddress] = useState("");

  useEffect(() => {
    if (address) {
      console.log("converting");
      safeConvertAddressSS58(address, 7);
    }
  }, [address]);

  const { accounts } = usePolkadotWeb3();
  console.log({ accounts });

  const handleClickConnectWallet = () => {
    open();
  };

  console.log({ addresses });

  return (
    <div>
      <div>
        <div className="flex">
          <p className="text-gray-600 font-nimbus-sans-extended text-base font-normal">
            Step 2 of 3:
          </p>
          <p className="font-bold mb-2 ml-2">connect nova wallet</p>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="py-6">
            <PolkadotButton />
          </div>
          <p className="py-4">or copy paste your EVM address</p>
          <input
            onChange={(e) => setAddress(e.target.value as `0x${string}`)}
            value={address}
            type="text"
            placeholder="0x....ethdenver"
            className="focus:placeholder-opacity-25 px-4 py-4 text-white placeholder-white w-full bg-inherit font-nimbus-sans-extended text-base font-normal focus:outline-none text-center border-2 border-gray-600 rounded-md"
          />
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

type SuccessViewProps = {
  onBack: () => void;
};
const SuccessView = ({ onBack }: SuccessViewProps) => {
  return (
    <div>
      <div>
        <div className="flex">
          <p className="mb-2">
            Check your email for a <span className="font-bold">{`{bash}`}</span>{" "}
            ticket and event details.
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
