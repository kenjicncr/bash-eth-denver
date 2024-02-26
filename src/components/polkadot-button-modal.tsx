import { WalletConnectModal } from "@walletconnect/modal";
import UniversalProvider from "@walletconnect/universal-provider";
import { useEffect, useState } from "react";
import { isWalletInstalled } from "@talismn/connect-wallets";

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

import { LoadingSpinner } from "./loading-spinner";

import novaWalletLogo from "@/assets/icons/NovaWallet.svg";
import subWalletLogo from "@/assets/icons/subwallet-logo.svg";
import Image from "next/image";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const params = {
  requiredNamespaces: {
    polkadot: {
      methods: ["polkadot_signTransaction", "polkadot_signMessage"],
      chains: [
        "polkadot:91b171bb158e2d3848fa23a9f1c25182", // polkadot
      ],
      events: ["chainChanged", "accountsChanged"],
    },
  },
};

interface PolkadotButtonProps {
  onConnectAccount: (address: string) => void;
}
export const PolkadotButtonModal = ({
  onConnectAccount,
}: PolkadotButtonProps) => {
  // const { provider } = useUniversalConnect();
  const [polkadotAddress, setPolkadotAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [walletConnectModal, setWalletConnectModal] =
    useState<WalletConnectModal | null>(null);

  const openSubWallet = async () => {
    if (typeof window !== "undefined" && window.injectedWeb3) {
      if (window.injectedWeb3) {
        if (window.injectedWeb3["subwallet-js"]) {
          const wallet_selected = window.injectedWeb3["subwallet-js"];
          if (wallet_selected.enable) {
            const wallet_connection = await wallet_selected.enable(
              "Bash | Eth Denver After Party"
            );
            const wallet_accounts = await wallet_connection.accounts.get();
            if (wallet_accounts.length > 0) {
              onConnectAccount(wallet_accounts[0].address);
              setIsOpen(false);
              await wallet_connection.provider?.disconnect();
            }
          }
        }
      }
      const wallet_selected = window.injectedWeb3["subwallet-js"];
    }
  };

  const openWalletConnectModal = async () => {
    console.log("open wallet conenct modal");
    const initializeProvider = async () => {
      const initializedProvider = await UniversalProvider.init({
        projectId: projectId,
        relayUrl: "wss://relay.walletconnect.com",
      });

      return initializedProvider;
    };
    const provider = await initializeProvider();

    console.log(`wallet connect provider: `, provider);

    if (provider) {
      setIsLoading(true);
      const { uri, approval } = await provider.client.connect(params);

      const walletConnectModal = new WalletConnectModal({
        projectId: projectId!,
        explorerRecommendedWalletIds: [
          // nova
          `43fd1a0aeb90df53ade012cca36692a46d265f0b99b7561e645af42d752edb92`,
          // subwallet
          `9ce87712b99b3eb57396cc8621db8900ac983c712236f48fb70ad28760be3f6a`,
        ],
      });
      setWalletConnectModal(walletConnectModal);

      if (uri) {
        try {
          walletConnectModal.openModal({ uri });

          console.log("waiting wallet connect approval...", uri);

          const walletConnectSession = await approval();

          console.log("wallet connect approved");

          const walletConnectAccount = Object.values(
            walletConnectSession.namespaces
          )
            .map((namespace) => namespace.accounts)
            .flat();

          // grab account addresses from CAIP account formatted accounts
          const accounts = walletConnectAccount.map((wcAccount) => {
            const address = wcAccount.split(":")[2];
            return address;
          });

          console.log({ accounts });

          setPolkadotAddress(accounts[0]);
          onConnectAccount && onConnectAccount(accounts[0]);
          setIsOpen(false);
          setIsLoading(false);

          walletConnectModal.closeModal();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = walletConnectModal?.subscribeModal((state) => {
      console.log(state);
      if (state.open === false) {
        setIsLoading(false);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [walletConnectModal]);

  const isExtensionInstalled = (extensionName: "subwallet-js" | "nova") => {
    if (extensionName === "subwallet-js") {
      return isWalletInstalled("subwallet-js");
    } else if (extensionName === "nova") {
      return window?.walletExtension?.isNovaWallet;
    }

    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="flex justify-center items-center h-8 px-4 py-6 flex-shrink-0 rounded-md border-2 border-white bg-white text-black"
        >
          Select Wallet
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-teal-400">
        <DialogHeader>
          <DialogTitle>Download Subwallet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <button
            onClick={openWalletConnectModal}
            aria-label="Connect with Nova Wallet"
            className="flex justify-center items-center px-4 py-4 bg-white text-black  rounded-md"
          >
            {isLoading ? (
              <LoadingSpinner size={20} color="black" />
            ) : (
              <Image
                src={novaWalletLogo}
                alt="nova wallet"
                height={20}
                width={20}
              />
            )}
            <span className="ml-2 tracking-wide">Connect Nova Wallet</span>
          </button>
          <button
            onClick={() => {
              if (isExtensionInstalled("subwallet-js")) {
                openSubWallet();
              } else {
                openWalletConnectModal();
              }
            }}
            aria-label="Connect with SubWallet"
            className="flex justify-center items-center px-4 py-4 bg-white text-black  rounded-md"
          >
            {isLoading ? (
              <LoadingSpinner size={20} color="black" />
            ) : (
              <Image
                src={subWalletLogo}
                alt="nova wallet"
                height={20}
                width={20}
              />
            )}
            <span className="ml-2 tracking-wide">Connect Subwallet</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
