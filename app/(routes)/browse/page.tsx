import styles from '../mylistings/styles/mylistings.module.css'
import buttonstyles from '../../styles/buttons.module.css';
import Link from "next/link";

const getBrowse = async () => {
    const res = await fetch("http://localhost:3000/api/getBrowse");
    return await res.json()
}

// Python backend fetch via flask 
const getFlask = async () => {
    const res = await fetch("http://localhost:5000/data");
    return await res.json()
}

const BrowsePage = async () => {

    const data = await getBrowse();
    const flaskData = await getFlask();

    if (data.length == 0) {
        return(
            <div>
                <ul>
                    {flaskData.map((listing) => 
                    <>
                    <h1>{listing.Name}</h1>
                    <h1>{listing.Age}</h1>
                    <h1>{listing.Date}</h1>
                    <h1>{listing.programmmin}</h1>
                    </>
                    )}
                </ul>
            </div>
        )
    }

    // In time this will actually be replaced with the above code which fetches the data from python backend 
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