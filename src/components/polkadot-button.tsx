import { WalletConnectModal } from "@walletconnect/modal";
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

export const PolkadotButton = () => {
  const { provider } = useUniversalConnect();
  const [polkadotAddress, setPolkadotAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [walletConnectModal, setWalletConnectModal] =
    useState<WalletConnectModal | null>(null);

  const openWalletConnectModal = async () => {
    if (provider) {
      setIsLoading(true);
      const { uri, approval } = await provider.client.connect(params);

      const walletConnectModal = new WalletConnectModal({
        projectId: projectId!,
        explorerRecommendedWalletIds: [
          `43fd1a0aeb90df53ade012cca36692a46d265f0b99b7561e645af42d752edb92`,
        ],
      });
      setWalletConnectModal(walletConnectModal);

      if (uri) {
        walletConnectModal.openModal({ uri });

        const walletConnectSession = await approval();

        walletConnectModal.closeModal();

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

        setPolkadotAddress(accounts[0]);
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
      <span className="ml-2 tracking-wide">
        {polkadotAddress !== "" ? polkadotAddress : "Connect Nova Wallet"}
      </span>
    </button>
  );
};
