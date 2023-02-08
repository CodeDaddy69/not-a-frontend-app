import Link from "next/link";
import Image from 'next/image';
import testImage from '../../../public/me.png';


// Python backend fetch via flask 
const getFlask = async () => {
    const res = await fetch("http://127.0.0.1:5000/listings", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await res.json()
}

const ExampleListing = async () => {

    const flaskData = await getFlask();

    console.log(flaskData)
    if (flaskData.length === 0) return <div>no listings to show</div>

    return (
        <div className="p-4 bg-amber-100">
            <ul className="flex space-x-4">
                {flaskData.map((listing) => 
                <li key={listing.listing}>
                    <div className="flex-col bg-white rounded hover:scale-105">
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
 

export default ExampleListing;