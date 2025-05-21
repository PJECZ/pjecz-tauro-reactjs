
import HttpClient from '../../services/HttpClient';

import { AxiosError } from 'axios';

import { LoginParams, LoginResponse } from '../../interfaces/auth/AuthInterface';

export const Login = ( params: LoginParams ) => {

    return new Promise<LoginResponse>( (resolve, eject) => {

        HttpClient.post('/api/v1/token', params)
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