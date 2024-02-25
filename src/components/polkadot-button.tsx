import { WalletConnectModal } from "@walletconnect/modal";
import UniversalProvider from "@walletconnect/universal-provider";
import { CustomButton } from "./custom-button";
import { useUniversalConnect } from "./universal-connect-provider";
import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LoadingSpinner } from "./loading-spinner";

import novaWalletLogo from "@/assets/icons/NovaWallet.svg";
import Image from "next/image";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const params = {
  requiredNamespaces: {
    polkadot: {
      methods: ["polkadot_signTransaction", "polkadot_signMessage"],
      chains: [
        "polkadot:91b171bb158e2d3848fa23a9f1c25182", // polkadot
      ],
      events: ['chainChanged", "accountsChanged'],
    },
  },
};

interface PolkadotButtonProps {
  onConnectAccount: (address: string) => void;
}
export const PolkadotButton = ({ onConnectAccount }: PolkadotButtonProps) => {
  // const { provider } = useUniversalConnect();
  const [polkadotAddress, setPolkadotAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [walletConnectModal, setWalletConnectModal] =
    useState<WalletConnectModal | null>(null);

  const openWalletConnectModal = async () => {
    const initializeProvider = async () => {
      const initializedProvider = await UniversalProvider.init({
        projectId: projectId,
        relayUrl: "wss://relay.walletconnect.com",
      });

      return initializedProvider;
    };
    const provider = await initializeProvider();

    if (provider) {
      setIsLoading(true);
      const { uri, approval } = await provider.client.connect(params);

      const walletConnectModal = new WalletConnectModal({
        projectId: projectId!,
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

  return (
    <button
      onClick={openWalletConnectModal}
      aria-label="Connect with Nova Wallet"
      className="flex justify-center items-center px-4 py-4 bg-white text-black  rounded-md"
    >
      {isLoading ? (
        <LoadingSpinner size={20} color="black" />
      ) : (
        <Image src={novaWalletLogo} alt="nova wallet" height={20} width={20} />
      )}
      <span className="ml-2 tracking-wide">Connect Nova Wallet</span>
    </button>
  );
};
