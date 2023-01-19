import Action from "./action";

const ActionsListBuying = ( {program, data, isLoading} ) => {
    


    if (isLoading) return <div>loading...</div>

    const newdata = data.filter((listing) => (listing.escrow?.buyer === program.provider.publicKey.toString()))
    if (newdata.length === 0) return <div className='p-6'>no actions to do</div>

    return (
    <ul>
        {newdata
        .map((listing => (<Action key={listing.listing} program={program} listing={listing} />)))}
    </ul>)
}
 
export default ActionsListBuying;