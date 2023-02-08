import type { Idl, Address } from "@coral-xyz/anchor";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";

function getProvider(wallet: AnchorWallet | undefined) {
    if (!wallet) return undefined;

    const network = "https://api.testnet.solana.com";
    const connection = new Connection(network, "confirmed");

    const provider = new AnchorProvider(
        connection, wallet, {}
    );
    return provider;
}

export default function getProgram(idl: any, address: Address, wallet: AnchorWallet | undefined) {
    if (!getProvider(wallet)) return undefined;

    const provider = getProvider(wallet);

    const a = JSON.stringify(idl);
    const b: Idl = JSON.parse(a);

    const program = new Program(b, address, provider);
    return program;
}