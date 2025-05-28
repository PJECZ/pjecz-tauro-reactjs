
import HttpClient from '../../services/HttpClient';
import HttpClientToken from '../../services/HttpClientToken';

import { AxiosError } from 'axios';

import { HttpResponse, LoginParams, LoginResponse } from '../../interfaces/auth/AuthInterface';

export const Login = ( params: LoginParams ) => {

    return new Promise<LoginResponse>( (resolve, eject) => {

        HttpClient.post('/api_oauth2/v1/token', params)
        .then( ( { data } : { data : LoginResponse }) => {           
            resolve( data );
        })
        .catch( ( error: AxiosError ) => {
            resolve({
                success: false,
                message: error.message,
                access_token: '',
                username: '',
                usuario_nombre_completo: '',
                rol: {
                    id: 0,
                    nombre: '',
                },
                unidad:{
                    id: 0,
                    clave: '',
                    nombre: '',
                }
            });
        });
        
    });    

}

export const ValidarToken = () => {

    return new Promise<HttpResponse>( (resolve, eject) => {

        const data = JSON.parse( window.localStorage.getItem('data') ?? '{}' );

        if( data ){

            const { token } = data;

            HttpClientToken.get('/api_oauth2/v1/validar_token', token)
            .then( ( { data } : { data : HttpResponse }) => {           
                resolve( data );
            })
            .catch( ( error: AxiosError ) => {
                resolve({
                    success: false,
                    message: error.message,                  
                });
            });

        }
        
    });    

}