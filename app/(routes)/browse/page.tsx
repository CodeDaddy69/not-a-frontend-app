'use client'

import styles from '../mylistings/styles/mylistings.module.css'
import buttonstyles from '../../styles/buttons.module.css';
import Link from "next/link";
import { useState } from "react";

const BrowsePage = () => {

    const [search, setSearch] = useState("");


    // This is called when the form is filled in by the seller which writes to boockchain and our mongoDB. 
    const handleSubmit = async (e) => {

        const listing = {
            query: search
        };

        const res2 =  fetch(`http://localhost:5000/listings`,{
            'method':'POST',
                headers : {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(listing)
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        console.log(res2);

        //Here I can add the java script to list the results!

    }

    return(
        <div>
        <form onSubmit={handleSubmit} className="h-screen">
            <div>
                <label className="px-2">Search the Beanz style: </label>
                <input type="text"
                required
                value = {search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#e2e8f0]"
                />
            </div>
            <div className="px-2">
                <button className="bg-[#e2e8f0]">Search</button>
            </div>
        </form>
        </div>
    )
}
 
export default BrowsePage;