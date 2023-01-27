import styles from '../mylistings/styles/mylistings.module.css'
import buttonstyles from '../../styles/buttons.module.css';
import Link from "next/link";



// Python backend fetch via flask 
const getFlask = async () => {
    const res = await fetch("http://localhost:5000/listings");
    return await res.json()
}

const BrowsePage = async () => {

    const flaskData = await getFlask();

    return(
        <div>
            <ul>
                {flaskData.map((listing) => 
                <>
                <h1>{"Name: " + listing.name}</h1>
                <h1>{"Price: " + listing.price}</h1>
                <h1>{"itemType: " + listing.itemType}</h1>
                </>
                )}
            </ul>
        </div>
    )


}
 
export default BrowsePage;