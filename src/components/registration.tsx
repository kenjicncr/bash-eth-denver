"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { CustomButton } from "./custom-button";
import { PolkadotButtonModal } from "./polkadot-button-modal";
import { TokenProofResponse, TokenproofButton } from "./tokenproof-button";
import { Select, SelectItem } from "@nextui-org/react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "@/lib/api/update-user";
import SubwalletLogo from "@/assets/logos/subwallet-icon.png";

import { isValidAddressPolkadotAddress } from "@/lib/polkadot/utils";
import { DownloadSubwalletModal } from "./download-subwallet-modal";
import { DownloadNovaModal } from "./download-nova-modal";
import { motion } from "framer-motion";
import { Button, Input, Divider } from "@nextui-org/react";
import PolkadotLogo from "@/assets/logos/polkadot-token-logo.png";
import { DialogEmailSuccess } from "./dialog-email-success";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }, // Customize as needed
  },
};

const fadeInSlower = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.6 }, // Customize as needed
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

  const [email, setEmail] = useLocalStorage("email", "");
  const [nonce, setNonce] = useLocalStorage("nonce", "");

  const [polkadotAddress, setPolkadotAddress] = useState("");

  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const submitEmailMutation = useMutation({
    mutationFn: (email: string) => {
      return updateUser({ email, role: selectedRole });
    },
    onSuccess: (data) => {
      console.log({ selectedRole });
      setEmail(data.user.email);
      setShowEmailSuccess(true);
      // setCurrentView("download");
    },
    mutationKey: ["update-user-email", email, selectedRole],
  });

  const handleSubmitEmail = (email: string) => {
    submitEmailMutation.mutate(email);
  };

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

  // --- end nova wallet submission //

  /** --- start tokenproof submission --- */

  const submitTokenproofMutation = useMutation({
    mutationFn: (tokenproofAddress: string) => {
      console.log({ tokenproofAddress });
      return updateUser({ email: email!, tokenproofAddress });
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
    console.log("success token proof");
    submitTokenproofMutation.mutate(account);
  };

  /** --- end tokenproof submission --- */
  const handleBack = ({ goBackTo }: { goBackTo: View }) => {
    setCurrentView(goBackTo);
  };

  const roles = [
    {
      value: "founder",
      label: "Founder",
    },
    {
      value: "investor",
      label: "Investor",
    },
    {
      value: "developer",
      label: "Developer",
    },
    {
      value: "fan",
      label: "Fan",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

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
            onBack={() => handleBack({ goBackTo: "email" })}
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
            roles={roles}
            selectedRole={selectedRole}
            onSelectRole={(role) => setSelectedRole(role)}
            onContinue={(email) => {
              if (email) {
                handleSubmitEmail(email);
              }
            }}
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <p className="text-4xl w-full text-white font-black">
          <span>Join our mailing list</span>
        </p>
        <p className="text-teal-200">
          For future announcements, upcoming events, and surprise rewards 👀
        </p>
      </motion.div>
      <motion.div
        variants={fadeInSlower}
        initial="hidden"
        animate="visible"
        className="pt-8"
      >
        {renderRegistrationView()}
      </motion.div>
      <DialogEmailSuccess
        isOpen={showEmailSuccess}
        onOpenChange={setShowEmailSuccess}
      />
    </div>
  );
};

type EmailViewProps = {
  onContinue: (email: string | undefined) => void;
  onBack?: () => void;
  isLoading?: boolean;
  email: string | undefined;
  onChangeEmail: (email: string) => void;
  roles: { label: string; value: string }[];
  selectedRole: string;
  onSelectRole: (role: string) => void;
};

const EmailView = ({
  email,
  onChangeEmail,
  onContinue,
  onBack,
  isLoading,
  roles,
  onSelectRole,
  selectedRole,
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
    if (email) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setIsValid(isValidEmail);
    }
  }, [email]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-2">
        <p className="text-gray-400 font-nimbus-sans-extended text-base font-normal">
          Step 1 of 3:
        </p>
      </div>
      <div className="relative py-4">
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          variant="bordered"
          label="Email address"
          placeholder="Enter your email"
          size="lg"
        />
        <Select
          label="What's your role?"
          placeholder="Select a role"
          className="max-w-xs mt-4"
          selectedKeys={[selectedRole]}
          onChange={(e) => onSelectRole && onSelectRole(e.target.value)}
        >
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </Select>
        <div className="px-4 h-4 absolute -bottom-4">
          {showError && (
            <p className="text-red-500 text-sm">
              Please enter a valid email address
            </p>
          )}
        </div>
      </div>
      <div className="pt-2 w-full flex justify-between">
        <div>
          {onBack && <CustomButton onClick={onBack}>back</CustomButton>}
        </div>

        <Button
          radius="sm"
          variant="flat"
          className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
          isLoading={isLoading}
          onClick={onSubmit}
        >
          Submit
        </Button>
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
  const [nonce, setNonce] = useLocalStorage("nonce", "");

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
        <p className="text-gray-400 font-nimbus-sans-extended text-base font-normal">
          Step 2 of 3:
        </p>
      </div>
      <div className="py-4 font-bold text-primary-500 font-display flex flex-wrap text-2xl flex">
        <p>You&apos;re waitlisted!&nbsp;</p>
        <p className="text-white">Want to skip the line?</p>
      </div>
      <p className="mt-4">
        Connect your ETH Denver account to receive your{" "}
        <span className="text-primary-500 font-bold text-yellow-500">
          VIP ticket.
        </span>
      </p>
      <div className="pt-6 pb-8 flex flex-wrap items-center justify-center gap-4 flex-col">
        <TokenproofButton onAuthenticate={handleTokenProofOnAuthenticate} />
        <div className="flex flex-col justify-center items-center pt-8">
          <p className="text-small mb-2">
            Not an ETH Denver attendee? Grab a polkadot wallet
          </p>
          <Button
            radius="sm"
            variant="flat"
            className="opacity-100 hover:text-primary-300 hover:text-opacity-100 w-52"
            onClick={onContinueWithNoTokenProof}
            startContent={
              <Image
                src={PolkadotLogo}
                alt="token proof"
                height={20}
                width={20}
              />
            }
          >
            Get a Polkadot wallet
          </Button>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="pt-2 w-full flex justify-between">
        <Button
          radius="sm"
          variant="flat"
          className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
          onClick={onBack}
        >
          Back
        </Button>
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
  const [email] = useLocalStorage("email");

  return (
    <div>
      <div>
        <div className="flex flex-col lg:flex-row gap-2">
          <p className="text-gray-400 font-nimbus-sans-extended text-base font-normal">
            Step 3 of 3:
          </p>
          <p className="mb-2">
            Check your Tokenproof app for the{" "}
            <span className="font-bold">{`{bash}`}</span> ticket and event
            details.
          </p>{" "}
        </div>
        <div className="my-4 w-274 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="flex flex-col">
          <p className="text-teal-300 text-xl text-center">
            Download a Polkadot Wallet for hidden rewards 👀
          </p>
          <p className="text-gray-100 text-md text-center font-normal">
            You don{`'`}t want to miss this
          </p>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
            <DownloadNovaModal
              onClick={async () => {
                fetch(`/api/track-download-clicks`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: email,
                    action: "download-nova",
                  }),
                });
              }}
            />
            <p className="text-center">or</p>
            <Button
              radius="sm"
              variant="flat"
              className="opacity-100 hover:text-primary-300 hover:text-opacity-100 w-52"
              as="a"
              target="_blank"
              rel="noreferrer noopener nofollow"
              href="https://www.subwallet.app/download.html?lang=1"
              onClick={async () => {
                fetch(`/api/track-download-clicks`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: email,
                    action: "download-subwallet",
                  }),
                });
              }}
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
        <Button
          radius="sm"
          variant="flat"
          className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
          onClick={onBack}
        >
          back
        </Button>
        <Button
          radius="sm"
          variant="flat"
          className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
          isLoading={isSubmitLoading}
          onClick={onContinue}
        >
          submit for hidden rewards
        </Button>
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
  const [email] = useLocalStorage("email");
  return (
    <div>
      <div>
        <div>
          <div className="flex flex-col lg:flex-row gap-2">
            <p className="text-gray-400 font-nimbus-sans-extended text-base font-normal">
              Step 3 of 3:
            </p>
          </div>

          <div className="py-4 font-bold text-white font-display text-2xl">
            Enter your Polkadot address to skip the line.
          </div>

          <div className="w-full">
            <Input
              type="text"
              value={address}
              onChange={(e: any) => onChangeAddress(e.target.value)}
              variant="underlined"
              label="Polkadot Address"
            />
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
              <DownloadNovaModal
                onClick={async () => {
                  fetch(`/api/track-download-clicks`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: email,
                      action: "download-nova",
                    }),
                  });
                }}
              />
              <Button
                radius="sm"
                variant="flat"
                className="opacity-100 hover:text-primary-300 hover:text-opacity-100 w-52"
                as="a"
                target="_blank"
                rel="noreferrer noopener nofollow"
                href="https://www.subwallet.app/download.html?lang=1"
                onClick={async () => {
                  fetch(`/api/track-download-clicks`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: email,
                      action: "download-subwallet",
                    }),
                  });
                }}
                startContent={
                  <Image src={SubwalletLogo} alt="token proof" height={20} />
                }
              >
                Download Subwallet
              </Button>
            </div>
          </div>
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

        <p className="text-gray-100 text-sm font-normal py-4">
          *Only{" "}
          <span className="bold">
            ETH Denver participants WITH a valid Polkadot address{" "}
          </span>
          are eligble for the hidden rewards and special perks inside the event.
        </p>

        <Divider className="my-4" />

        <div className="pt-2 w-full flex justify-between">
          <Button
            radius="sm"
            variant="flat"
            className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            radius="sm"
            variant="flat"
            className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
            isLoading={isSubmitLoading}
            onClick={onContinue}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
