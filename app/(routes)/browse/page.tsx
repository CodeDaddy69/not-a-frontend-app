import Link from "next/link";
import Image from 'next/image';
import testImage from '../../../public/me.png';

const getBrowse = async () => {
    const res = await fetch("http://localhost:3000/api/getBrowse");
    return await res.json()
}

const BrowsePage = async () => {

    const data = await getBrowse();

    if (data.length === 0) return <div>no listings to show</div>

    return (
        <div className="bg-amber-100 p-4">
            <ul className="flex space-x-4">
                {data.map((listing) => 
                <li key={listing.listing}>
                    <div className="flex-col bg-white hover:scale-105 rounded">
                        <Link href={`/listing/${listing.listing}`}>
                            <div className="p-2">
                                <Image className="rounded" src={testImage} alt="test" width={150} />
                                <h1 className="text-lg">{listing.name}</h1>
                                <div className="flow-root w-full">
                                    <h1 className="float-left">type: {listing.itemType}</h1>
                                    <h1 className="float-right">${listing.price}</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                </li>
                )}
            </ul>
        </div>
    )
}
 
export default BrowsePage;