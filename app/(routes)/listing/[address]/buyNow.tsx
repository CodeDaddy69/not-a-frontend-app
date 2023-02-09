<<<<<<< HEAD
'use client'

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
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

    const { connected } = useWallet()
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

    return (<button className="rounded-full border-black border-2 px-4 hover:scale-110 active:scale-100 font-semibold" onClick={handleClick} disabled={!connected}>Buy now</button>);
}
 
=======
'use client'

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import getProgram from "../../../lib/walletContext/getProgram";
import { buyListing } from "./lib/buyerSend";
import idl from '../../../lib/idl/idl.json';
import address from '../../../lib/idl/idl_address.json';
import { useState } from "react";
import { Collapse } from "react-collapse";

interface listingProps {
    price: string,
    listing: string,
    seller: string,
}

const BuyButton = ( { price, listing, seller }: listingProps ) => {

    const [ hasClicked, setHasClicked ] = useState(false);
    const [ shipping, setShipping ] = useState("");
    const [ note, setNote ] = useState("");

    const { connected } = useWallet();
    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);

    const handleClick = async () => {
        if (!hasClicked) {
            setHasClicked(true)
            console.log("clicked!")
            return;
        };

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
                    escrowState: "buyerSent",
                    shipping: shipping,
                    note: note
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

    return (
    <div className="flex flex-col items-center space-y-2">
        <Collapse isOpened={hasClicked}>
            <div className="flex flex-col p-4 rounded shadow bg-amber-100">
                <label>shipping details:</label>
                <div className="h-32">
                    <textarea className="border-2 border-black resize-none" 
                    rows={4}
                    value = {shipping}
                    onChange = {e => setShipping(e.target.value)}
                    />
                </div>
                <label>note for buyer:</label>
                <div className="h-16">
                    <textarea className="border-2 border-black resize-none"
                    value = {note}
                    onChange = {e => setNote(e.target.value)}
                    />
                </div>
            </div>
        </Collapse>
        <button className="flex px-4 font-semibold border-2 border-black rounded-full hover:scale-110 active:scale-100" onClick={handleClick} disabled={!connected}>
            Buy now
        </button>
    </div>
    );
}
 
>>>>>>> 8e1221ecd8ae9d34aaec488a743c56d994219acc
export default BuyButton;