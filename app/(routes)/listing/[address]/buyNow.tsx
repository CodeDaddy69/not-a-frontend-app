'use client'

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import getProgram from "../../../lib/walletContext/getProgram";
import { buyListing } from "./lib/buyerSend";
import idl from '../../../lib/idl/idl.json';
import address from '../../../lib/idl/idl_address.json';

interface listingProps {
    price: string,
    listing: string,
    seller: string,
}

const BuyButton = ( { price, listing, seller }: listingProps ) => {

    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);

    const handleClick = async () => {
        if (!program) return;

        const escrowAddress = await buyListing({ program, listingDetails: { price: Number(price), listing, seller }});

        const update = { 
            listing: listing,
            toEscrow: true,
            content: { 
                saleState: 'under sale',
                escrow: { 
                    address: escrowAddress.toBase58(),
                    buyer: wallet.publicKey.toBase58(),
                    escrowState: "buyerSent"
                }
            }
        }

        const res = await fetch('/api/listing', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
          });
        console.log(res);
    }
     
    return (<button className="rounded-full border-black border-2 px-4 hover:scale-110 active:scale-100 font-semibold" onClick={handleClick}>Buy now</button>);
}
 
export default BuyButton;