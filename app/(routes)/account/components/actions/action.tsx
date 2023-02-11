import ActionButton from "./actionButton";
import formatTimeLeft from "../../lib/timeLeftFormatting";
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { Collapse } from "react-collapse";
import ActionExtraInfo from "./actionExtraInfo";

const Action = ( { toggle, isOpen, program, listing, mutate } ) => {
    
    const timeLeft = formatTimeLeft(listing.timeLastAction)

    return (
    <div className="flex flex-col p-2 bg-amber-100">
        <button className="flex hover:font-semibold focus:font-semibold" onClick={()=>toggle()}>
            <div className="w-1/3 text-center">{listing.name}</div>
            {/* gross nested ternery here */}
            <div className="w-1/3">@username</div>
            <div className="flex justify-between w-1/3">
                <p className="flex">
                    {timeLeft ? ((timeLeft.days === 0) ?
                    `${timeLeft.hours} hours ${timeLeft.minutes} minutes left` :
                    `${timeLeft.days} days ${timeLeft.hours} hours left`) :
                    "timed out"}
                </p>
                <p className="flex text-xl">
                    {isOpen ? <BiChevronUp/> : <BiChevronDown/>}
                </p>
            </div>
        </button>
        <div className="">
        <Collapse isOpened={isOpen}>
            {/* <div className="flex py-6">
                <div className="w-1/3">note from buyer note from buyer note from buyer note from buyer</div>
                <div className="w-1/3">shipping details: <br />5 cameron elder street<br /> jewsville</div>
                <div className="text-right">
                    <ActionButton program={program} listing={listing} />
                </div>
            </div> */}
            <ActionExtraInfo listing={listing} program={program} mutate={mutate}/>
        </Collapse>
        </div>
    </div>);
}
 
export default Action;