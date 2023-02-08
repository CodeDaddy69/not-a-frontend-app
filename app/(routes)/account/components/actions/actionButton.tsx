import Link from "next/link";
import updateState from "../../lib/updateState";

const ActionButton = ( { program, listing } ) => {

    const handleClick = async ( dispute?: boolean ) => {
        await updateState({ program, listing, dispute });
        console.log("state updated")
    }
    

    if (listing.escrow.escrowState === "sellerSent") {

        if (listing.seller === program.provider.publicKey.toString()) {
            return <>shouldnt be displayed</>
        }

        return (
        <div className="flex justify-around">
            <button className="text-[16px] font hover:scale-110 active:scale-100 border-2 border-black rounded p-2"
            onClick={() => {
                handleClick(false)
            }}>
                item received
            </button>
            <Link className="text-[16px] font hover:scale-110 active:scale-100 border-2 border-black rounded p-2" href={`/account/startdispute/${listing.listing}`}>
                start dispute
            </Link>
        </div>)
    }

    if (listing.escrow.escrowState === "buyerSent") {

        if (listing.escrow.buyer === program.provider.publicKey.toString()) {
            return <> awaiting response...</>
        }

        return ( 
            <button className="flex m-auto text-[16px] font hover:scale-110 active:scale-100 border-2 border-black rounded p-2"
            onClick={() => {
                handleClick()
            }}>
                confirm shipped
            </button>
        );
    }

    return <>no action</>
}
 
export default ActionButton;