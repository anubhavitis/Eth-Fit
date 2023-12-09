import { configureChains, createConfig } from 'wagmi'
import { celo, celoAlfajores} from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { OktoConnector } from "@okto_wallet/okto-connect-sdk";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import {  WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [celo,celoAlfajores],
  [
    publicProvider(),
  ],
);

const oktoConnector = new OktoConnector({
  chains,
  options: {
    projectId: `${process.env.WALLET_CONNECT_PROJECT_ID}`,
    metadata: {
      name: "ethfit",
      description: "DAPP_DESCRIPTION",
      url: "DAPP_URL",
      icons: ["DAPP_ICON"],
    },
  },
});

export const config = createConfig({
  autoConnect: true,
  connectors: [
    oktoConnector,
    new InjectedConnector({
      chains,
      options: {
      name(detectedName) {
        if (window && window.ethereum && (window.ethereum as any).isOktoWallet) {
          return "Okto Wallet";
        } else if (Array.isArray(detectedName)) {
          return detectedName[0];
        } else {
          return detectedName;
        }
      },
    },
    }),
    new MetaMaskConnector({
      chains,
    })
  ],
  publicClient,
  webSocketPublicClient,
 });
