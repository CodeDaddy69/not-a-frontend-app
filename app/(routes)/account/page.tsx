'use client'

import StatsProfile from "./components/statsProfile";
import Link from 'next/link';
import Listings from './mylistings/listings';
import { useState } from "react";
import ActionsPage from './actions/page';

export default function AccountPage() {

    const [isListings, setIsListings] = useState(true)

    return ( 
        <div>
            <div className="flex justify-center p-4">Account Page</div>
            <StatsProfile/>
            <div className="flex justify-center p-4 space-x-10">
                <button className="flex hover:scale-110 active:scale-100 font-semibold" onClick={() => {
                    setIsListings(true)
                }}>my listings</button>
                <button className="flex hover:scale-110 active:scale-100 font-semibold" onClick={()=> {
                    setIsListings(false)
                }}>actions</button>
            </div>
            <div className='flex-col border-2 border-black mx-auto w-[800px]'>
                {isListings ? <Listings /> : <ActionsPage />}
            </div>
        </div>
     );
}