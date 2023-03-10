'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import ListingList from "./listinglist";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Listings = () => {

    const [filter, setFilter] = useState("all");

    const { publicKey } = useWallet();
    const { data, error, isLoading } = useSWR(`/api/getListings/${publicKey?.toString()}`, fetcher)

    if (!publicKey) {return (
        <div>
            Please connect your wallet first!
        </div>
    )}

    if (isLoading) {return <div>loading...</div>} else {

        return (
            <div className="">
                {(data.length === 0) ? <div>no listings</div> :
                <ListingList filter={filter} setFilter={setFilter} data={data}/>}
                <div className="flex justify-center">
                    <Link className="font-semibold hover:scale-110 active:scale-100" href='/account/newlisting'>Create new listing</Link>
                </div>
            </div>
        );
    }
}
 
export default Listings;