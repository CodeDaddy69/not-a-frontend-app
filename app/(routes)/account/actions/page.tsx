'use client'

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import getProgram from "../../../lib/walletContext/getProgram";
import useSWR from "swr";
import idl from '../../../lib/idl/idl.json';
import address from '../../../lib/idl/idl_address.json';
import ActionsListSelling from './components/actionslistselling';
import ActionsListBuying from "./components/actionslistbuying";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ActionsPage = () => {
    
    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);
    const { data, error, isLoading } = useSWR(`/api/getActions/${wallet?.publicKey.toString()}`, fetcher);

    if (!wallet) {
        return (
        <div>
            Please connect your wallet first!
        </div>)
    }

    return (
        <div className="flex-col 
        items-center justify-center text-center">
            <h1 className="border-b-2 border-black p-2">under sale</h1>
            <ActionsListSelling program={program} data={data} isLoading={isLoading}/>
            <h1 className="border-b-2 border-t-2 border-black p-2">under purchase</h1>
            <ActionsListBuying program={program} data={data} isLoading={isLoading}/>
        </div>
     );
}
 
export default ActionsPage;