// DEPRECATED
// import Action from "./action";

// const ActionsListSelling = ( { toggle, isOpen, program, data, isLoading} ) => {
    


//     if (isLoading) return <div>loading...</div>


//     if (data.length === 0 ) return <div className='p-6'>no actions to do</div>
//     const newdata = data.filter((listing) => (listing.seller === program.provider.publicKey.toString()) && Boolean(listing.escrow))
//     if (newdata.length === 0 ) return <div className='p-6'>no actions to do</div>


//     return (
//     <ul>
//         {newdata
//         .map(((listing, index) => (<Action key={index} toggle={()=>{toggle(index)}} isOpen={index === isOpen} program={program} listing={listing} />)))}
//     </ul>
//     )
// }
 
// export default ActionsListSelling;