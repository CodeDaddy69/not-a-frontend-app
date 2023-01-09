import Action from "./action";

const ActionsListSelling = ( {program, data, isLoading} ) => {
    


    if (isLoading) return <div>loading...</div>

    const newdata = data.filter((listing) => (listing.seller === program.provider.publicKey.toString()) && Boolean(listing.escrow))
    if (newdata.length === 0 ) return <>no actions to do</>


    return (
    <ul className="space-y-4">
        {newdata
        .map((listing => (<Action key={listing.listing} program={program} listing={listing} />)))}
    </ul>)
}
 
export default ActionsListSelling;