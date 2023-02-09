<<<<<<< HEAD
import BuyButton from './buyNow';
import Image from 'next/image';
import testImage from '../../../../public/me.png';

interface pageProps {
    params: { address: string}
}

const getListing = async ( address: string ) => {
    const res = await fetch(`http://localhost:3000/api/getListing/${address}`);
    return await res.json()
}

const ListingPage = async ( { params }: pageProps ) => {

    const listing = await getListing(params.address);

    if (!listing) {return <div>cannot find listing!</div>}

    return ( 
        <div className="flex justify-center space-x-4">
            <div className='flex justify-center'>
                <Image className="" src={testImage} alt="test" width={350} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className="flex-1 text-xl font-semibold top-0">{listing.name}</div>
                <div className='flex space-x-10'>
                    <div className='text-xl'>{listing.saleState}:    ${listing.price}</div>
                    {(listing?.saleState === 'for sale') ? 
                    <BuyButton
                    listing={listing.listing}
                    price={listing.price}
                    seller={listing.seller}
                    />
                    :
                    <></>}
                </div>
                <div>seller: {listing.seller}</div>
            </div>
        </div>
    );
}
 
=======
import BuyButton from './buyNow';
import Image from 'next/image';
import testImage from '../../../../public/me.png';

interface pageProps {
    params: { address: string}
}

const getListing = async ( address: string ) => {
    const res = await fetch(`http://localhost:3000/api/getListing/${address}`);
    return await res.json()
}

const ListingPage = async ( { params }: pageProps ) => {

    const listing = await getListing(params.address);

    if (!listing) {return <div>cannot find listing!</div>}

    return ( 
        <div className="flex justify-center space-x-4">
            <div className='flex justify-center'>
                <Image className="" src={testImage} alt="test" width={350} />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className="top-0 flex-1 text-xl font-semibold">{listing.name}</div>
                {(listing?.saleState === 'for sale') ? 
                    <BuyButton
                    listing={listing.listing}
                    price={listing.price}
                    seller={listing.seller}
                    />
                    :
                    <></>}
                <div className='flex space-x-10'>
                    <div className='text-xl'>{listing.saleState}:    ${listing.price}</div>
                </div>
                <div>seller: {listing.seller}</div>
            </div>
        </div>
    );
}
 
>>>>>>> 8e1221ecd8ae9d34aaec488a743c56d994219acc
export default ListingPage;