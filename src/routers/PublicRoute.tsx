
import { JSX } from 'react';

import { Navigate } from 'react-router';

interface props {
    token: String | null,
    children: JSX.Element,
}

export const PublicRoute = ({ token, children }: props) => {

    const lastPath = window.localStorage.getItem("lastPath");

    return ( !Boolean( token ) )
        ? children
        : <Navigate to={ lastPath ? lastPath : "/" } />
        
}