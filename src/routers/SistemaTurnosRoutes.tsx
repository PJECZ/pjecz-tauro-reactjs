
import { Routes, Route } from "react-router"

import { HomePage } from "../pages/comun/HomePage"

import { NotFoundPage } from "../pages/auth/NotFoundPage"

export const SistemaTurnosRoutes = () => {

    return (

        <Routes>
            
            <Route path="/" element={ <HomePage /> } />     

            <Route path="*" element={ <NotFoundPage /> } />

        </Routes>        
    
    )
}