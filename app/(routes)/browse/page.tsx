import ExampleListing from "./exampleListings";
import SearchBar from "./searchBar";

const BrowsePage = () => {

    return (
        <div>
            <SearchBar/>
            {/* @ts-expect-error Server Component */}
            <ExampleListing/>
        </div>
    )
}
 
export default BrowsePage;