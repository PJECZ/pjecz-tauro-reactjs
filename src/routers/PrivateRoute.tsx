
import { JSX } from 'react';

import { Navigate, useLocation } from 'react-router';

interface props {
    token: String | null,
    children: JSX.Element,
}

export const PrivateRoute = ({ token, children }: props) => {

    const { pathname, search } = useLocation();

    const lastPath = pathname + search;    
    localStorage.setItem('lastPath', lastPath );
        
    return ( Boolean( token ) )
        ? children
        : <Navigate to="/auth/login" />
}