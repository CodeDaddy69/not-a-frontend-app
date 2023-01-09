// 'use client'

import updateState from "./lib/updateState";

const ActionButton = ( { program, listing } ) => {

    const handleClick = async ( dispute?: boolean ) => {
        await updateState({ program, listing, dispute });
        console.log("state updated")
    }
    

    if (listing.escrow.escrowState === "sellerSent") {

        if (listing.seller === program.provider.publicKey.toString()) {
            return <> awaiting response...</>
        }

        return (
        <>
            <button className="hover:underline"
            onClick={() => {
                handleClick(false)
            }}>
                Item Received
            </button>
            <button className="hover:underline"
            onClick={() => {
                handleClick(true)
            }}>
                Start Dispute
            </button>
        </>)
    }

    if (listing.escrow.escrowState === "buyerSent") {

        if (listing.escrow.buyer === program.provider.publicKey.toString()) {
            return <> awaiting response...</>
        }

        return ( 
            <button className="hover:underline"
            onClick={() => {
                handleClick()
            }}>
                confirm shipped
            </button>
        );
    }

    return <> no action</>
}
 
export default ActionButton;