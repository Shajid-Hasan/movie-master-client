import React, { useContext } from 'react';
import { AuthContext } from '../Context/Authentication';
import { Navigate } from 'react-router';

const PrivetRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)

    if(loading){
        return 
    }

    if(!user){
        return <Navigate to='/login'/>
    }

    return children;
};

export default PrivetRoute;