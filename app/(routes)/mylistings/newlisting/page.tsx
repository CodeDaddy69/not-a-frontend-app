'use client'

import { useState } from "react";
import getProgram from "../../../lib/walletContext/getProgram";
import { createListing } from "./createListing";
import idl from '../../../lib/idl/idl.json';
import address from '../../../lib/idl/idl_address.json';
import { useAnchorWallet } from "@solana/wallet-adapter-react";


const NewListingPage = () => {

    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);

    const [listingName, setListingName] = useState("");
    const [price, setPrice] = useState("0");
    const [itemType, setItemType] = useState("");
    const [color, setColor] = useState("0");
    const [condition, setCondition] = useState("");
    const [saleState, setSaleState] = useState("0");
    
    // This is called when the form is filled in by the seller which writes to boockchain and our mongoDB. 
    const handleSubmit = async (e) => {
        if (!program) return;

        // CreateListing actually writes to the blockchain
        e.preventDefault();
        const { isSuccess, PDA } = await createListing({ program, listingName, price});

        if (!isSuccess) {
            // handle error here
            return;
        }

        const listing = {
            listing: PDA,
            price: price,
            name: listingName,
            itemType: itemType,
            colour: color,
            condition: condition,
            saleState: saleState,
            seller: program.provider.publicKey?.toBase58()
        };

        const res2 =  fetch(`http://localhost:5000/newlisting`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(listing)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }


    return ( 
        <div>
            <form onSubmit={handleSubmit} className="h-screen">
                <div>
                    <label className="px-2">Listing name:</label>
                    <input type="text"
                    required
                    value = {listingName}
                    onChange={(e) => setListingName(e.target.value)}
                    className="bg-[#e2e8f0]"
                    />
                </div>
                <div className="py-5">
                    <label className="px-2">Listing price:</label>
                    <input type="number"
                    required
                    value = {price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-[#e2e8f0]"
                    />
                </div>
                <div>
                    <label className="px-2">Item Type:</label>
                    <input type="text"
                    required
                    value = {itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    className="bg-[#e2e8f0]"
                    />
                </div>
                <div className="py-5">
                    <label className="px-2">Color:</label>
                    <input type="text"
                    required
                    value = {color}
                    onChange={(e) => setColor(e.target.value)}
                    className="bg-[#e2e8f0]"
                    />
                </div>
                <div>
                    <label className="px-2">Condition:</label>
                    <input type="text"
                    required
                    value = {condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="bg-[#e2e8f0]"
                    />
                </div>
                <div className="py-5">
                    <label className="px-2">Status:</label>
                    <input type="text"
                    required
                    value = {saleState}
                    onChange={(e) => setSaleState(e.target.value)}
                    className="bg-[#e2e8f0]"
                    />
                </div>
                <div className="px-2">
                    <button className="bg-[#e2e8f0]">Create listing</button>
                </div>
            </form>
        </div>
     );
}
 
export default NewListingPage;