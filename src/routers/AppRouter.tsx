
import { useEffect, useRef } from "react"

import { useDispatch, useSelector } from "react-redux"

import { BrowserRouter, Route, Routes } from "react-router"

import { RootState } from "../store"

import { login } from "../store/slices/AuthSlice"

import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

import { AuthRoutes } from "./AuthRoutes "
import { SistemaTurnosRoutes } from "./SistemaTurnosRoutes"

import { PantallaPage } from "../pages/comun/PantallaPage"
import { PantallaUnidadPage } from "../pages/comun/PantallaUnidadPage"

export const AppRouter = () => {

    const dispatch = useDispatch();

    const token = useRef<String | null>(null);

    const { token: tokenRedux } = useSelector( ( state: RootState ) => state.auth );

    const data = window.localStorage.getItem("data");

    useEffect(() => {
        
        if( data ){

            dispatch( login( JSON.parse( data ) ) );

        } 
        else{            
            localStorage.removeItem('data');
            localStorage.removeItem('lastPath');
        }      

    }, [ data, dispatch ]); 

    if( data ){
        const dataJSON = JSON.parse( data );

        if( dataJSON ){
            token.current = dataJSON.token;
        }
    }
    else{
        token.current = tokenRedux ?? '';
    }

    return (

        <BrowserRouter>  

            <Routes>

                <Route path="/auth/*" element={ <PublicRoute token={ token.current } children={ <AuthRoutes /> } /> } />   

                <Route path="/pantalla" element={ <PublicRoute token={ token.current } children={ <PantallaPage /> } /> } />   

                <Route path="/pantalla/:id" element={ <PublicRoute token={ token.current } children={ <PantallaUnidadPage /> } /> } />                

                <Route path="/*" element={ <PrivateRoute token={ token.current } children={ <SistemaTurnosRoutes /> } /> } />       
            
            </Routes>
        
        </BrowserRouter>
    
    )
}