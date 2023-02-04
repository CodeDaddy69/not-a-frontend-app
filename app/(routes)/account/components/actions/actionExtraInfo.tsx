import ActionButton from "./actionButton";
import type { ReactElement } from "react";
const ActionExtraInfo = ( { listing, program } ) => {

    let content: ReactElement = <div className="m-auto text=[18px] p-4">awating response from @username</div>; // change to default as awaiting response from @username
    switch(listing.escrow.escrowState) {
        case "buyerSent":
            if(program.provider.publicKey.toBase58() === listing.seller) {
                content = <div className="flex py-6">
                    <div className="w-1/3">note from buyer note from buyer note from buyer note from buyer</div>
                    <div className="w-1/3">shipping details: <br />5 cameron elder street<br /> jewsville</div>
                    <div className="text-right">
                        <ActionButton program={program} listing={listing} />
                    </div>
                </div>
            }
            break;

        case "sellerSent":
            if(program.provider.publicKey.toBase58() === listing.escrow.buyer) {
                content =  <div className="flex py-6">
                    <div className="w-1/3">put something here?</div>
                    <div className="w-2/3 text-right">
                        <ActionButton program={program} listing={listing} />
                    </div>
                </div>
            }
            break;

        case "toDispute":
            console.log("here")
            content =  <div className="flex py-6">Check your disputes</div>
            break;
        default:
            break;
    }

    return (content);
}
 
export default ActionExtraInfo;