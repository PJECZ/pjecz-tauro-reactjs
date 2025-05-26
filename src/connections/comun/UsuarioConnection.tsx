
import HttpClientToken from '../../services/HttpClientToken';

import { AxiosError } from 'axios';

import { ActualizarUsuarioParams, ActualizarUsuarioResponse, ConsultarConfiguracionUsuarioResponse } from '../../interfaces/comun/UsuarioInterface';

export const ActualizarUsuario = ( params: ActualizarUsuarioParams ) => {

    return new Promise<ActualizarUsuarioResponse>( (resolve, eject) => {

        const data = JSON.parse( window.localStorage.getItem('data') ?? '' );

        if( data ){

            const { token } = data;
        
            HttpClientToken.post('/api/v1/actualizar_usuario', params, token)
            .then( ( { data } : { data : ActualizarUsuarioResponse }) => {           
                resolve( data );
            })
            .catch( ( error: AxiosError ) => {
                resolve({ 
                    success: false, 
                    message: error.message,
                    data: {                        
                        ventanilla: {
                            id: 0,
                            nombre: '',
                            numero: 0,
                        },
                        usuario_nombre_completo: '',
                        turnos_tipos: [],
                        unidad: {
                            id: 0,
                            nombre: '',
                            clave: '',                            
                        },
                        rol: {
                            id: 0, 
                            nombre: '',                            
                        }
                    },
                });
            });

        }
        else {
            resolve({ 
                success: false, 
                message: 'Ocurrio un error',
                data: {                        
                    ventanilla: {
                        id: 0,
                        nombre: '',
                        numero: 0,
                    },
                    usuario_nombre_completo: '',
                    turnos_tipos: [],
                    unidad: {
                        id: 0,
                        nombre: '',
                        clave: '',                            
                    },
                    rol: {
                        id: 0, 
                        nombre: '',                            
                    }
                },
            }); 
        }
        
    });    

}

export const ConsultarConfiguracionUsuario = () => {

    return new Promise<ConsultarConfiguracionUsuarioResponse>( (resolve, eject) => {

        const data = JSON.parse( window.localStorage.getItem('data') ?? '' );

        if( data ){

            const { token } = data;
        
            HttpClientToken.get('/api/v1/consultar_configuracion_usuario', token)
            .then( ( { data } : { data : ConsultarConfiguracionUsuarioResponse }) => {           
                resolve( data );
            })
            .catch( ( error: AxiosError ) => {
                resolve({ 
                    success: false, 
                    message: error.message,
                    data: {                        
                        ventanilla: {
                            id: 0,
                            nombre: '',
                            numero: 0,
                        },
                        usuario_nombre_completo: '',
                        turnos_tipos: [],
                        unidad: {
                            id: 0,
                            nombre: '',
                            clave: '',                            
                        },
                        rol: {
                            id: 0, 
                            nombre: '',                            
                        }
                    },
                });
            });

        }
        else {
            resolve({ 
                success: false, 
                message: 'Ocurrio un error',
                data: {                        
                    ventanilla: {
                        id: 0,
                        nombre: '',
                        numero: 0,
                    },
                    usuario_nombre_completo: '',
                    turnos_tipos: [],
                    unidad: {
                        id: 0,
                        nombre: '',
                        clave: '',                            
                    },
                    rol: {
                        id: 0, 
                        nombre: '',                            
                    }
                },
            });
        }
        
    });    

}