import { Wallet, getWallets } from "@talismn/connect-wallets";
import { NovaWallet } from "./nova-wallet";

export enum WalletProviderType {
  MetaMask = "metamask",
  Talisman = "talisman",
  SubwalletJS = "subwallet-js",
  Enkrypt = "enkrypt",
  PolkadotJS = "polkadot-js",
  NovaWallet = "nova-wallet",
  WalletConnect = "walletconnect",
  ExternalWallet = "external",
}

export type WalletProvider = {
  type: WalletProviderType;
  wallet: Wallet;
};

const novaWallet: Wallet = new NovaWallet();

export const SUPPORTED_WALLET_PROVIDERS: WalletProvider[] = [novaWallet].map(
  (wallet) => ({
    wallet,
    type: normalizeProviderType(wallet),
  })
);

function normalizeProviderType(wallet: Wallet): WalletProviderType {
  if (wallet instanceof NovaWallet) {
    return WalletProviderType.NovaWallet;
  }

  return wallet.extensionName as WalletProviderType;
}

export function getSupportedWallets() {
  return SUPPORTED_WALLET_PROVIDERS;
}
