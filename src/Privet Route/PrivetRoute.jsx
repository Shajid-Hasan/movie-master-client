import React, { useContext } from 'react';
import { AuthContext } from '../Context/Authentication';
import { Navigate } from 'react-router';
import { HashLoader } from 'react-spinners';

const PrivetRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)

    if(loading){
        return (
            <div className='h-[97vh] flex items-center justify-center'>
                <HashLoader color=' #5A0000' />
            </div>
        )
    }

    if(!user){
        return <Navigate to='/login'/>
    }

    return children;
};

export default PrivetRoute;