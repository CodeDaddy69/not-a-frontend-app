const ListingList = ( { filter, setFilter, data }) => {

    if (!data) return <></>

    let showData;
    switch (filter) {   
        case "for sale": 
        case "under sale": 
        case "sold":
            showData = data.filter(listing => listing.saleState === filter);
            break;
        case "all":
            showData = data;
            break;
        default:
            break;
    }

    const list = (typeof showData === "undefined") ? <div>No listings</div> :
     showData.map((listing) => (
        <li className="bg-amber-100 border-b-2 border-t-2 border-black" key={listing.listing}>
            <h1>{listing.listing}</h1>
            <h1 className="font-bold">{listing.name}</h1>
            <h1>${listing.price}</h1>
            <h1>type: {listing.itemType}</h1>
            <h1>colour: {listing.colour}</h1>
            <h1>condition: {listing.condition}</h1>
            <h1>{listing.saleState}</h1>
        </li>))

    return (
        <div className='flex-1'>
            <div className="text-center">
                <button className="p-2 hover:underline focus:underline" onClick={() => {setFilter("all")}}>all</button>
                <button className="p-2 hover:underline focus:underline" onClick={() => {setFilter("for sale")}}>for sale</button>
                <button className="p-2 hover:underline focus:underline" onClick={() => {setFilter("under sale")}}>under sale</button>
                <button className="p-2 hover:underline focus:underline" onClick={() => {setFilter("sold")}}>sold</button>
            </div>
            <ul>
                {list}
            </ul>
        </div>
    );
}
 
export default ListingList;