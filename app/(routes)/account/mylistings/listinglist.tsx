import Link from "next/link";

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
        <li className="bg-amber-100 border-b-2 border-black" key={listing.listing}>
            <Link className="flex justify-between p-2 hover:bg-amber-200" href={`/listing/${listing.listing}`}>
                {/* <p>{listing.listing}</p> */}
                <p>{listing.name}</p>
                <p>${listing.price}</p>
                <p>type: {listing.itemType}</p>
                {/* <p>colour: {listing.colour}</p>
                <p>condition: {listing.condition}</p> */}
                <p>{listing.saleState}</p>
            </Link>
        </li>))

    return (
        <div className='flex-1'>
            <div className="text-center border-b-2 border-black">
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