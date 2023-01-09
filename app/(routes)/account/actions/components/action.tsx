import ActionButton from "./actionButton";


const Action = ( { program, listing } ) => {
    
    return ( 
    <div className="bg-[#f5f5dc] p-2 space-x-10">
        <div className="inline block">{listing.name}</div>
        <div className="inline block">${listing.price}</div>
        <div className="inline block">action required by: {"1 day"}</div>
        <ActionButton program={program} listing={listing} />
    </div> );
}
 
export default Action;