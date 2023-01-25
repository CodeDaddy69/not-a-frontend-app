import Link from "next/link";
import updateState from "../../lib/updateState";

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
            <Link className="font-semibold hover:scale-110 active:scale-100" href={`/account/startdispute/${listing.listing}`}>
                start dispute
            </Link>
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