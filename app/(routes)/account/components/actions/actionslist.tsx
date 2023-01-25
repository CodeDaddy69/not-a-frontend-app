'use client'

import { useState } from "react";
import Action from "./action";

const ActionList = ( { program, data } ) => {

    const [ isOpen, setIsOpen ] = useState(null)

    const toggle = (index) => {
        if(isOpen === index) return setIsOpen(null);
        console.log(isOpen)
        setIsOpen(index);
    };

    return ( 
        (data.length === 0) ? <div className='p-6'>no actions to do</div> :
        <div className="flex flex-col justify-center text-center">
            {data
            .map(((listing, index) => (<Action key={index} toggle={()=>{toggle(index)}} isOpen={index === isOpen} program={program} listing={listing} />)))}
        </div>
    );
}
 
export default ActionList;