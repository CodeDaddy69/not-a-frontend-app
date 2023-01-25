import DisputeForm from './components/disputeForm';
import Image from 'next/image';
import testImage from '../../../../../../public/me.png';


const getListing = async ( address: string ) => {
    const res = await fetch(`http://localhost:3000/api/getListing/${address}`);
    return await res.json()
}

const startDisputePage = async ( { params } ) => {

    const listing = await getListing(params.listing);

    return (
    <div className="h-screen flex flex-col space-y-6">
        <div className='text-center'>
            <h1 className="text-2xl">info about disputes go here...</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus tempora molestias doloribus ipsa, tenetur, dolore voluptatem nostrum quod deleniti et, reprehenderit harum laboriosam ea magnam. Quis tenetur dolore officiis laborum!</p>
        </div>
        <div className="flex mx-auto border-black border-2 p-2 space-x-2">
            <Image  className="" src={testImage} alt="test" width={100} />
            {!listing ? 
            <p className="m-auto">"loading..."</p>:
            <div className='flex flex-col text-center justify-around'>
                <p>{listing.name}</p>
                <p>{listing.listing}</p>
            </div>
            }
        </div>
        <DisputeForm listing={listing} />
    </div>
    )
}

export default startDisputePage