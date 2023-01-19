'use client'

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import getProgram from "../../../../../lib/walletContext/getProgram";
import idl from '../../../../../lib/idl/idl.json';
import address from '../../../../../lib/idl/idl_address.json';

const startDisputePage = ( { params } ) => {

    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);

    const [reason, setReason] = useState("");

    const handleSubmit = async (e) => {
        if (!program) return;

        e.preventDefault();
        
    };

    // fetch listing image and link to display

    return (
    <div className="h-screen flex flex-col space-y-6">
        <div className='text-center'>
            <h1 className="text-2xl">info about disputes go here...</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus tempora molestias doloribus ipsa, tenetur, dolore voluptatem nostrum quod deleniti et, reprehenderit harum laboriosam ea magnam. Quis tenetur dolore officiis laborum!</p>
        </div>
        <div className="flex mx-auto border-black border-2">
            {params.listing}
        </div>
        <form onSubmit={handleSubmit} className="h-screen text-center flex flex-col space-y-4">
            <div className="flex mx-auto">
                <label className="px-2">Reason for dispute</label>
                <input type="text"
                required
                value = {reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-[#e2e8f0]"
                />
            </div>
            <div className="flex mx-auto p-2 rounded-full bg-amber-100 border-black border-2 hover:scale-110 active:scale-100">
                <button className='font-semibold'>start dispute</button>
            </div>
        </form>
    </div>
    )
}

export default startDisputePage