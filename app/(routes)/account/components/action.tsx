import ActionButton from "./actionButton";
import formatTimeLeft from "../lib/timeLeftFormatting";


const Action = ( { program, listing } ) => {
    
    const timeLeft = formatTimeLeft(listing.timeLastAction)
    return ( 
    <div className="bg-amber-100 p-2 flex justify-between">
        <div className="inline block">{listing.name}</div>
        <div className="inline block">${listing.price}</div>
        {/* gross nested ternery here */}
        <div>{timeLeft ? ((timeLeft.days === 0) ?
                `${timeLeft.hours} hours ${timeLeft.minutes} minutes left` :
                `${timeLeft.days} days ${timeLeft.hours} hours left`) :
            "timed out"}
        </div>
        <ActionButton program={program} listing={listing} />
    </div> );
}
 
export default Action;