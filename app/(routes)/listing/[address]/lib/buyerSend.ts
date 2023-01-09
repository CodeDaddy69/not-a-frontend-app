import type { Program, Idl } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID, ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

interface buyProps {
    program: Program<Idl>,
    listingDetails: {
        price: number,
        listing: string,
        seller: string,
    } 
}

export const buyListing = async ({ program, listingDetails}: buyProps) => {

    const mint = new PublicKey("2hiumqn5Qmr18AjmMNkbbmzYXAVsBt8EPM2AkyjmhiXQ");
    const listingPubkey = new PublicKey(listingDetails.listing);
    const receiverPubkey = new PublicKey(listingDetails.seller)

    const [PDA, _bump2] = PublicKey.findProgramAddressSync(
        [
            anchor.utils.bytes.utf8.encode("escrow"),
            program.provider.publicKey.toBuffer(),
            listingPubkey.toBuffer()
        ],      
        program.programId
    );

    const escrowATA = await getAssociatedTokenAddress(mint, PDA, true);
    const providerATA = await getAssociatedTokenAddress(mint, program.provider.publicKey);
    console.log(providerATA.toBase58())
    

    try {
        const tx = await program.methods.initialiseTransaction(new anchor.BN(listingDetails.price))
        .accounts({
            initialiser: program.provider.publicKey,
            receiver: receiverPubkey,
            escrowAcc: PDA,
            listing: listingDetails.listing,
            tokenAccount: escrowATA,
            mint: mint,
            systemProgram: SystemProgram.programId,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY
        })
        .rpc();

        console.log(PDA.toString());
        console.log(tx);
    } catch(err) {
        console.log("Error: ", err);
    }

    try{
        const tx = await program.methods.buyerTransfer().accounts({
            initialiser: program.provider.publicKey,
            mint: mint,
            initialiserTokenAccount: providerATA,
            escrow: PDA,
            escrowTokenAccount: escrowATA,
            systemProgram: SystemProgram.programId,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

        console.log("buyer transfered");
        console.log(tx);
    } catch(err) {
        console.log("Error: ", err)
    }

    return PDA
}