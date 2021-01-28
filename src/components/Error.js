import React from 'react';

const Error = ({mensaje}) => {
    return ( 
        <p className='my-3 p-4 alert alert-primary text-center'>{mensaje}</p>
     );
}
 
export default Error;