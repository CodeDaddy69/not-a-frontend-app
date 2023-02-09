import type { Program, Idl } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

interface createListingProps {
    program: Program<Idl>,
    listingName: string,
    price: string
}

export const createListing = async ({ program, listingName, price}: createListingProps) => {
    
    const listing_identifier = new anchor.BN(Date.now() - require('./startDate').START_DATE);
    console.log(listing_identifier.toNumber());
    const [PDA, bump] = PublicKey.findProgramAddressSync(
        [
            anchor.utils.bytes.utf8.encode("listing"),
            program.provider.publicKey.toBuffer(),
            listing_identifier.toArrayLike(Buffer, "le", 8)
        ], 
        program.programId
    );

    console.log(bump);
    // dont touch this with a 10ft barge pole, it breaks so easily and it nearly made me cry
    let listing_args = {
        bump: bump,
        price: new anchor.BN(Number(price)),
        identifier: listing_identifier,
        name: listingName,
        itemType: {jacket:{}} ,
        colour: {blue:{}} ,
        condition: {tag: {new:{} }, conditionMap: [{isMajor: true, isFront: true, xPos: 1, yPos: 1}]},
        seller: program.provider.publicKey,
        saleState: {forSale:{}}
      };


    const tx = await program.methods.createListing(listing_args).accounts({
        initialiser: program.provider.publicKey,
        userListing: PDA,
        systemProgram: SystemProgram.programId
    })
    .rpc();

    console.log(tx);
    console.log(`Listing created at ${PDA.toString()}`);

    return { isSuccess: true, PDA }
}