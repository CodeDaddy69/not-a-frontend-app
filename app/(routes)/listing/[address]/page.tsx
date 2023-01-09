import buttonstyles from '../../../styles/buttons.module.css'
import BuyButton from './buyNow';
import listingstyles from './listing.module.css';
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
        <div className={listingstyles.listing}>
            <div className="text-xl font-medium">{listing.name}</div>
            <div>${listing.price}</div>
            <div>{listing.saleState}</div>
            <div>seller: {listing.seller}</div>
            <BuyButton
            listing={listing.listing}
            price={listing.price}
            seller={listing.seller}
            />
        </div>
    );
}
 
export default ListingPage;