import styles from '../mylistings/styles/mylistings.module.css'
import buttonstyles from '../../styles/buttons.module.css';
import Link from "next/link";

const getBrowse = async () => {
    const res = await fetch("http://localhost:3000/api/getBrowse");
    return await res.json()
}

const BrowsePage = async () => {

    const data = await getBrowse();

    if (data.length === 0) return <div>no listings to show</div>

    return (
        <div className={styles.listingscontainer}>
            <ul>
                {data.map((listing) => 
                <Link href={`/listing/${listing.listing}`}>
                    <li className={styles.listing} key={listing.listing}>
                        <h1>{listing.name}</h1>
                        <h1>${listing.price}</h1>
                        <h1>type: {listing.itemType}</h1>
                    </li>
                </Link>
                )}
            </ul>
        </div>
    )
}
 
export default BrowsePage;