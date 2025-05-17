'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider, useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from "react";

// Import wallet adapter styles
require("@solana/wallet-adapter-react-ui/styles.css");

type WalletContextType = {
  address: string | null;
  isConnected: boolean;
  walletType: string;
  isVerified: boolean;
  connect: () => void;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  walletType: '',
  isVerified: false,
  connect: () => {},
  disconnect: () => {}
});

export const useWallet = () => useContext(WalletContext);

// Inner component that uses the Solana wallet adapter
function WalletContextInner({ children }: { children: ReactNode }) {
  const { connected, publicKey, connect, disconnect } = useSolanaWallet();
  const [isVerified, setIsVerified] = useState(true); // Default to true for demo purposes

  // Create the wallet context value
  const walletContextValue = {
    address: publicKey?.toString() || null,
    isConnected: connected,
    walletType: 'Phantom', // Assuming Phantom wallet for now
    isVerified,
    connect: () => {
      try {
        connect().catch(console.error);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    },
    disconnect: () => {
      try {
        disconnect().catch(console.error);
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    }
  };

  return (
    <WalletContext.Provider value={walletContextValue}>
      {children}
    </WalletContext.Provider>
  );
}

// Wrapper component that provides the wallet context
export function WalletContextProvider({ children }: { children: ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  
  return (
    <ConnectionProvider endpoint={"https://api.mainnet-beta.solana.com"}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextInner>
            {children}
          </WalletContextInner>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}