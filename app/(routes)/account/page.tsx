import StatsProfile from "./components/statsProfile";
import Link from 'next/link';

export default function AccountPage() {

    return ( 
        <div>
            <div className="flex justify-center p-4">Account Page</div>
            <StatsProfile/>
            <Link className="flex justify-center hover:underline" href="/account/actions">actions page</Link>
        </div>
     );
}