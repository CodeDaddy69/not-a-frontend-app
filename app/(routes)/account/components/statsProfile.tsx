'use client'

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import getProgram from "../../../lib/walletContext/getProgram";
import fetchStats from "../lib/fetchStats";
import idl from '../../../lib/idl/idl.json';
import address from '../../../lib/idl/idl_address.json';

const StatsProfile = async () => {
    
    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);

    if (!program) return;

    const res = await fetchStats(program);
    
    
    return ( 
    <div>
        <>purchases: {res.purchase}</>
        <>purchase disputes: {res.purchaseDisputes}</>
        <>sales: {res.sales}</>
        <>sale disputes: {res.saleDisputes}</>
    </div> );
}
 
export default StatsProfile;