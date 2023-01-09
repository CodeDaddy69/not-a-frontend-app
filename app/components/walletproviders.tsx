'use client';

import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { ReactNode, useCallback, useMemo } from "react";

const WalletContextProvider = ( { children }: { children: ReactNode} ) => {

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo( () => [
        new PhantomWalletAdapter
    ],
    [ network ]);

    const onError = useCallback(
        (error: WalletError) => {
            console.error(error);
        },
        []
    );

    return ( 
    <ConnectionProvider endpoint={ endpoint }>
        <WalletProvider wallets={ wallets } onError={ onError } autoConnect>
            <ReactUIWalletModalProvider>
                { children }
            </ReactUIWalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>);
}
 
export default WalletContextProvider;