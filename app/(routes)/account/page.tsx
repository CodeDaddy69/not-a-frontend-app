import StatsProfile from "./components/statsProfile";
import Link from 'next/link';

export default function AccountPage() {

    return ( 
        <div>
            <div className="flex justify-center p-4">Account Page</div>
            <StatsProfile/>
            <div className="flex justify-center p-4 space-x-10">
                <Link className="flex hover:underline" href="/account/mylistings">my listings</Link>
                <Link className="flex hover:underline" href="/account/actions">actions page</Link>
            </div>
        </div>
     );
}