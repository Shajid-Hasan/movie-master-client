import React, { useContext } from 'react';
import { AuthContext } from '../Context/Authentication';
import { Navigate, useLocation } from 'react-router';
import { HashLoader } from 'react-spinners';

const PrivetRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)

    const location = useLocation()
    console.log(location);

    if(loading){
        return (
            <div className='h-[97vh] flex items-center justify-center'>
                <HashLoader color=' #5A0000' />
            </div>
        )
    }

    if(!user){
        return <Navigate to='/login' state={location.pathname}/>
    }

    return children;
};

export default PrivetRoute;