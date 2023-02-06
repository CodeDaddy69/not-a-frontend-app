'use client'

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import getProgram from "../../../../lib/walletContext/getProgram";
import useSWR from "swr";
import idl from '../../../../lib/idl/idl.json';
import address from '../../../../lib/idl/idl_address.json';
import ActionsList from "./actionslist";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ActionsPage = () => {
    
    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);
    const { data, error, isLoading } = useSWR(`/api/getActions/${wallet?.publicKey.toString()}`, fetcher);

    let dataSelling = [];
    let dataBuying = [];

    if (!!data) {
        dataSelling = data.filter((listing) => (listing.seller === program.provider.publicKey.toString()) && Boolean(listing.escrow));
        dataBuying = data.filter((listing) => (listing.escrow?.buyer === program.provider.publicKey.toString()));
    }
    
    // sort action data into buying and selling
    if (!wallet) {
        return (
        <div>
            Please connect your wallet first!
        </div>)
    }

    return (
        <div className="flex-col 
        items-center justify-center text-center">
            {isLoading ? <div className="m-auto">loading actions...</div> :
            <div>
                <h1 className="border-b-2 border-black p-2">under sale</h1>
                {/* selling */}
                <ActionsList program={program} data={dataSelling}/>
                <h1 className="border-b-2 border-t-2 border-black p-2">under purchase</h1>
                {/* buying */}
                <ActionsList program={program} data={dataBuying}/>
            </div>
            }
        </div>
     );
    // return (
    //     <div className="flex-col 
    //     items-center justify-center text-center">
    //         <h1 className="border-b-2 border-black p-2">under sale</h1>
    //         <ActionsListSelling toggle={toggle} isOpen={isOpen} 
    //         program={program} data={data} isLoading={isLoading}/>
    //         <h1 className="border-b-2 border-t-2 border-black p-2">under purchase</h1>
    //         <ActionsListBuying toggle={toggle} isOpen={isOpen} 
    //         program={program} data={data} isLoading={isLoading}/>
    //     </div>
    //  );
}
 
export default ActionsPage;