import Listings from "./listings";
import styles from './styles/mylistings.module.css';

const MyListingsPage = () => {

    return (
        <div className={styles.listingscontainer}>
            <h1>My Listings</h1>
            <Listings />
        </div>
     );
}
 
export default MyListingsPage;