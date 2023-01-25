// DEPRECATED

// import Action from "./action";

// const ActionsListBuying = ( { program, data, isLoading } ) => {
    


//     if (isLoading) return <div>loading...</div>

//     const newdata = data.filter((listing) => (listing.escrow?.buyer === program.provider.publicKey.toString()))
//     if (newdata.length === 0) return <div className='p-6'>no actions to do</div>

//     return (
//     <div className="">
//         {newdata
//         .map(((listing, index) => (<Action key={index} toggle={()=>{toggle(index)}} isOpen={index === isOpen} program={program} listing={listing} />)))}
//     </div>
//     )
// }
 
// export default ActionsListBuying;