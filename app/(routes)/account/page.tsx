'use client'

import StatsProfile from "./components/statsProfile";
import Listings from './components/listingsComponent';
import { useState } from "react";
import ActionsPage from './components/actions/actionComponent';
import { useWallet } from "@solana/wallet-adapter-react";

export default function AccountPage() {

    const [component, setComponent] = useState(0)

    let showComponent;
    switch (component) {
        case 0:
            showComponent = <Listings />
            break;
        case 1:
            showComponent = <ActionsPage />
            break;
        case 2:
            showComponent = <>dispoots</>
            break;
    };

    const { connected } = useWallet();

    if (!connected) {
        return <div className="m-auto font-xl">please connect a wallet first to see your account!</div>
    }

    return ( 
        <div>
            <div className="flex justify-center p-4 text-[22px]">Account Page</div>
            <div className="flex bg-amber-100 rounded-full mx-auto w-[600px] shadow-lg p-10 border-2 border-black mb-10"><p className="mx-auto text-xl">profile pic and name go here</p></div>
            <StatsProfile/>
            <div className="flex justify-center p-4 space-x-10">
                <button className="flex font-semibold hover:scale-110 active:scale-100" onClick={() => {
                    setComponent(0)
                }}>my listings</button>
                <button className="flex font-semibold hover:scale-110 active:scale-100" onClick={()=> {
                    setComponent(1)
                }}>actions</button>
                <button className="flex font-semibold hover:scale-110 active:scale-100" onClick={()=> {
                    setComponent(2)
                }}>disputes</button>
            </div>
            <div className='flex-col border-2 border-black mx-auto w-[800px] shadow-lg'>
                {showComponent}
            </div>
        </div>
     );
}