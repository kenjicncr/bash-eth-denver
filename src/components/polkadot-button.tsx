import { WalletConnectModal } from "@walletconnect/modal";
import { CustomButton } from "./custom-button";
import { useUniversalConnect } from "./universal-connect-provider";
import { useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

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

  const openWalletConnectModal = async () => {
    if (provider) {
      const { uri, approval } = await provider.client.connect(params);

      const walletConnectModal = new WalletConnectModal({
        projectId: projectId!,
      });

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

  return (
    <CustomButton onClick={openWalletConnectModal}>
      {polkadotAddress !== "" ? polkadotAddress : "Connect Nova Wallet"}
    </CustomButton>
  );
};
