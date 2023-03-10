'use client'

import fetchStats from "../lib/fetchStats";
import getProgram from "../../../lib/walletContext/getProgram";
import idl from '../../../lib/idl/idl.json';
import address from '../../../lib/idl/idl_address.json';
import useSWR from 'swr';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function StatsProfile( ) {

    const [stats, setStats] = useState({
        purchases: 0,
        purchaseDisputes: 0,
        sales: 0,
        saleDisputes: 0,
    });

    const handleClick = async () => {

        if (!program) return;

        const data = await fetchStats(program);
        // cast type then:
        if (!!data) setStats(data);

        // then sync to database
        const res = await fetch(`/api/setStats/${program.provider.publicKey}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(res)
    }

    const wallet = useAnchorWallet();
    const program = getProgram(idl, address.address, wallet);

    const { data, error, isLoading } = useSWR(`/api/getStats/${wallet?.publicKey.toString()}`, fetcher)

    useEffect(()=>{
        if (!isLoading && !!data) setStats(data);
	}, [isLoading]);

    return ( 
    <div className="mx-auto flex justify-center space-x-10 p-4 border-2 border-black w-[800px] bg-amber-100 shadow-lg">
        {!isLoading ? <>
    <div>purchases: {stats.purchases}</div>
    <div>purchase disputes: {stats.purchaseDisputes}</div>
    <div>sales: {stats.sales}</div>
    <div>sale disputes: {stats.saleDisputes}</div>
    <button className="hover:underline" onClick={handleClick}>sync from blockchain</button>
    </> :
    <>loading...</>}
    </div> 
    )
}