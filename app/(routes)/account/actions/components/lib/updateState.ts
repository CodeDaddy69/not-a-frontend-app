import { Program, Idl } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";


interface updateProps {
    program: Program<Idl>,
    listing: any,
    dispute?: boolean
}


const updateState = async ( { program, listing, dispute }: updateProps ) => {
    
    const mint = new PublicKey("2hiumqn5Qmr18AjmMNkbbmzYXAVsBt8EPM2AkyjmhiXQ");

    let newstate;
    let saleState = "under sale"; 
    // matching the stateUpdate with the relevent program call
    switch (listing.escrow.escrowState) {
        // buyerSent -> sellerSent
        case "buyerSent":
            try{

                const tx = await program.methods.sellerSent().accounts({
                    receiver: program.provider.publicKey,
                    escrow: new PublicKey(listing.escrow.address),
                    systemProgram: SystemProgram.programId
                })
                .rpc()
                
                newstate = "sellerSent";
                console.log("seller sent");
                console.log(tx);
            } catch(err) {
                console.log("Error: ", err)
            }
            break;
        // seller sent -> buyer received && to dispute?
        case "sellerSent":
            
            const seller = new PublicKey(listing.seller);
            const buyer = new PublicKey(listing.escrow.buyer)
            const escrow = new PublicKey(listing.escrow.address);

            const sellerATA = await getAssociatedTokenAddress(mint, seller);
            const escrowATA = await getAssociatedTokenAddress(mint, escrow, true);

            const [sellerStats, _bump1] = PublicKey.findProgramAddressSync(
                [
                    anchor.utils.bytes.utf8.encode("user_stats"),
                    seller.toBuffer(),
                ], 
                program.programId
            );
            
            const [buyerStats, _bump2] = PublicKey.findProgramAddressSync(
                [
                    anchor.utils.bytes.utf8.encode("user_stats"),
                    buyer.toBuffer(),
                ], 
                program.programId
            );
            
            const tx = await program.methods.buyerReceived(dispute).accounts({
                initialiser: buyer,
                receiver: seller,
                mint: mint,
                listing: new PublicKey(listing.listing), 
                receiverTokenAccount: sellerATA,
                escrowAcc: escrow,
                escrowTokenAccount: escrowATA,
                initiaterStats: buyerStats,
                receiverStats: sellerStats,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            })
            .rpc();

            saleState = dispute? "disputed" : "sold";
            newstate = dispute ? "toDispute" : "buyerHappy";
            console.log(newstate)
            console.log(tx)
        
            break;
        // case "buyerHappy":
        //     break;
        // case "buyerAngry":
        //     break;

    }

    const update = { 
        listing: listing.listing,
        content: { 
            saleState: saleState,
            escrowState: newstate
        }
    }

    const res = await fetch('/api/listing', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
      });
    
    return;
}
 
export default updateState;