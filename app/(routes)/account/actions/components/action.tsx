import ActionButton from "./actionButton";


const Action = ( { program, listing } ) => {
    
    return ( 
    <div className="bg-amber-100 p-2 flex justify-between">
        <div className="inline block">{listing.name}</div>
        <div className="inline block">${listing.price}</div>
        <div className="inline block">action required by: {"1 day"}</div>
        <ActionButton program={program} listing={listing} />
    </div> );
}
 
export default Action;