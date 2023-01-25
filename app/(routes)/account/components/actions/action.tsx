import ActionButton from "./actionButton";
import formatTimeLeft from "../../lib/timeLeftFormatting";
import { BiChevronDown } from "react-icons/bi"
import { Collapse } from "react-collapse";

const Action = ( { toggle, isOpen, program, listing } ) => {
    
    const timeLeft = formatTimeLeft(listing.timeLastAction)

    return (
    <div className="bg-amber-100 p-2 flex flex-col">
        <button className="flex hover:font-semibold focus:font-semibold" onClick={()=>toggle()}>
            <div className="w-1/3">{listing.name}</div>
            {/* gross nested ternery here */}
            <div className="w-1/3">{timeLeft ? ((timeLeft.days === 0) ?
                    `${timeLeft.hours} hours ${timeLeft.minutes} minutes left` :
                    `${timeLeft.days} days ${timeLeft.hours} hours left`) :
                "timed out"}
            </div>
            <div className="w-1/3">${listing.price}</div>
        </button>
        <div className="">
        <Collapse isOpened={isOpen}>
            <div className="text-right p-4">
                <ActionButton program={program} listing={listing} />
            </div>
        </Collapse>
        </div>
    </div>);
}
 
export default Action;