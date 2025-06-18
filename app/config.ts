import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia, base, zora, celo, optimism } from "wagmi/chains";
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia, base, zora, celo, optimism],
  // connectors: [metaMask()],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [zora.id]: http(),
    [base.id]: http(),
    [celo.id]: http(),
    [optimism.id]: http(),
  },
});
