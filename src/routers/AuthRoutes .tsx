
import { Navigate, Route, Routes } from 'react-router';

import { LoginPage } from '../pages/auth/LoginPage';

export const AuthRoutes = () => {

    return (
        <Routes>

            <Route path="login" element={ <LoginPage /> } />    

            <Route path='/*' element={ <Navigate to="/auth/login" /> } />                          

        </Routes>
    )

}