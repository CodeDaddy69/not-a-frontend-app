'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import styles from './styles/mylistings.module.css'
import buttonstyles from '../../styles/buttons.module.css';
import Link from "next/link";
import { useState } from "react";
import ListingList from "./listinglist";

const fetcher = (address: string | undefined) => fetch(`/api/getListings/${address}`).then(res => res.json());
console.log(fetcher);
const Listings = () => {

    const [filter, setFilter] = useState("all");

    const { publicKey } = useWallet();
    const { data, error, isLoading } = useSWR(publicKey?.toString(), fetcher)

    if (!publicKey) {return (
        <div>
            Please connect your wallet first!
        </div>
    )}

    if (isLoading) {return <div>loading...</div>} else {

        if (data.length === 0) {return (<div>
            <div>no listings</div>
            <Link className={buttonstyles.button} href='/mylistings/newlisting'>Create new listing</Link>
            </div>)};

        return (
            <div className={styles.listingscontainer}>
                <ListingList filter={filter} setFilter={setFilter} data={data}/>
                <Link className={buttonstyles.button} href='/mylistings/newlisting'>Create new listing</Link>
            </div>
        );
    }
}
 
export default Listings;