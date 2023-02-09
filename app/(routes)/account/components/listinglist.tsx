import Link from "next/link";
import Image from 'next/image';
import testImage from '../../../../public/me.png';

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
            <Link className="flex text-center p-2 hover:bg-amber-200" href={`/listing/${listing.listing}`}>
                {/* <Image className="" src={testImage} alt="test" width={50}/> */}
                <p className="w-1/3">{listing.name}</p>
                <p className="w-1/3">${listing.price}</p>
                <p className="w-1/3">{listing.saleState}</p>
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