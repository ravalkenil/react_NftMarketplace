import "./App.css";
import Layout from "./components/Layout/Layout";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const Bsc: Chain = {
  id: 97,
  name: 'Bsc Testnet',
  network: 'TBNB',
  iconUrl: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Bsc',
    symbol: 'Bsc',
  },
  rpcUrls: {
    default: {
      http: [' https://data-seed-prebsc-1-s1.binance.org:8545'],
    },
  },
  blockExplorers: {
    default: { name: 'bsc', url: 'https://explorer.binance.org/smart-testnet' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: true,
};

const Sepolia: Chain = {
  id: 11155111,
  name: 'Sepolia',
  network: 'Sepolia Test Netwok',
  iconUrl: 'https://cryptologos.cc/logos/binance-coin-bnb-log.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'S',
    symbol: 'Bsc',
  },
  rpcUrls: {
    default: {
      http: ['  https://eth-sepolia.g.alchemy.com/v2/'],
    },
  },
  blockExplorers: {
    default: { name: 'bsc', url: ' https://eth-sepolia.g.alchemy.com/v2/' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum,chain.polygonMumbai,Bsc,Sepolia],
  // [
  //   jsonRpcProvider({
  //     rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
  //   }),
  // ],
  [alchemyProvider({ alchemyId:"" }), publicProvider()]
);


const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function App() {
  return( 
    <div>
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
         <Layout />;
      </RainbowKitProvider>
     </WagmiConfig>
    </div>    
   )
 
    
}

export default App;
