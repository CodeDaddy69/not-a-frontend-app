'use client'

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import getProgram from "../../../lib/walletContext/getProgram";
import useSWR from "swr";
import idl from '../../../lib/idl/idl.json';
import address from '../../../lib/idl/idl_address.json';
import ActionsListSelling from './components/actionslistselling';
import ActionsListBuying from "./components/actionslistbuying";

const fetcher = (address: string | undefined) => fetch(`/api/getActions/${address}`).then(res => res.json());

const ActionsPage = () => {
    
    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);
    const { data, error, isLoading } = useSWR(wallet?.publicKey.toString(), fetcher);

    if (!wallet) {
        return (
        <div>
            Please connect your wallet first!
        </div>)
    }

    return (
        <div className="flex flex-col 
        items-center justify-center">
            <h1>Under sale</h1>
            <ActionsListSelling program={program} data={data} isLoading={isLoading}/>
            <h1>Under purchase</h1>
            <ActionsListBuying program={program} data={data} isLoading={isLoading}/>
        </div>
     );
}
 
export default ActionsPage;