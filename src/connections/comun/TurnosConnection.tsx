
import HttpClient from '../../services/HttpClient';
import HttpClientToken from '../../services/HttpClientToken';

import { AxiosError } from 'axios';

import { PantallaResponse } from '../../interfaces/comun/PantallaInterface';
import { PantallaUnidadResponse } from '../../interfaces/comun/PantallaUnidadInterface';

import { CancelarTurnoParams, CancelarTurnoResponse, ConcluirTurnoParams, ConcluirTurnoResponse, CrearTurnoParams, CrearTurnoResponse, TomarTurnoResponse } from '../../interfaces/comun/TurnoInterface';

export const ConsultarTodosTurnos = ( ) => {
    
    return new Promise<PantallaResponse>( (resolve, eject) => {
        
        HttpClient.get('/api/v1/consultar_turnos')
        .then( ( { data } : { data : PantallaResponse }) => {           
            resolve( data );
        })
        .catch( ( error: AxiosError ) => {
            resolve( { 
                success: false, 
                message: error.message, 
                data: { 
                    turnos: [], 
                    ultimo_turno: undefined, 
                } 
            });
        });        
                
    });    

}

export const ConsultarTurnosUnidad = (id: string)  => {

    return new Promise<PantallaUnidadResponse>((resolve, eject) => {
        
        HttpClient.get(`/api/v1/consultar_turnos/${id}`)
        .then(({ data }: { data: PantallaUnidadResponse }) => {
            resolve(data);
        })
        .catch((error: AxiosError) => {
            resolve({ 
                success: false, 
                message: error.message, 
                data: { 
                    turnos: [], 
                    unidad: { 
                        id: 0, 
                        clave: '', 
                        nombre: '' 
                    }, 
                    ultimo_turno: undefined, 
                } 
            });
        });
    });

};

export const CrearTurno = ( params : CrearTurnoParams ) => {
    
    return new Promise<CrearTurnoResponse>( (resolve, eject) => {
        
        const data = JSON.parse( window.localStorage.getItem('data') ?? '' );

        if( data ){

            const { token } = data;

            HttpClientToken.post('/api/v1/crear_turno', params, token)
            .then( ( { data } : { data : CrearTurnoResponse }) => {           
                resolve( data );
            })
            .catch( ( error: AxiosError ) => {
                resolve( { 
                    success: false, 
                    message: error.message, 
                    data: {
                        turno_id: 0,
                        turno_numero: 0,
                        turno_estado: '',
                        turno_comentarios: '',
                        ventanilla: {
                            id: 0,
                            nombre: '',
                            numero: 0,
                        },
                        unidad: {
                            id: 0,
                            clave: '',
                            nombre: '',
                        }                   
                    }
                });
            });
        }        
                
    });    

}

export const TomarTurno = () => {
    
    return new Promise<TomarTurnoResponse>( (resolve, eject) => {
        
        const data = JSON.parse( window.localStorage.getItem('data') ?? '' );

        if( data ){

            const { token } = data;

            HttpClientToken.get('/api/v1/tomar_turno',  token)
            .then( ( { data } : { data : TomarTurnoResponse }) => {           
                resolve( data );
            })
            .catch( ( error: AxiosError ) => {
                resolve( { 
                    success: false, 
                    message: error.message, 
                    data: {
                        turno_id: 0,
                        turno_numero: 0,
                        turno_estado: '',
                        turno_comentarios: '',
                        ventanilla: {
                            id: 0,
                            nombre: '',
                            numero: 0,
                        },
                        unidad: {
                            id: 0,
                            clave: '',
                            nombre: '',
                        }                        
                    }
                });
            });
        }
         
                
    });    

}

export const CancelarTurno = ( params : CancelarTurnoParams ) => {
    
    return new Promise<CancelarTurnoResponse>( (resolve, eject) => {
        
        const data = JSON.parse( window.localStorage.getItem('data') ?? '' );

        if( data ){

            const { token } = data;

            HttpClientToken.post('/api/v1/actualizar_turno_estado', params, token)
            .then( ( { data } : { data : CancelarTurnoResponse }) => {           
                resolve( data );
            })
            .catch( ( error: AxiosError ) => {
                resolve( { 
                    success: false, 
                    message: error.message, 
                    data: {
                        turno_id: 0,
                        turno_numero: 0,
                        turno_estado: '',
                        turno_comentarios: '',
                        ventanilla: {
                            id: 0,
                            nombre: '',
                            numero: 0,
                        },
                        unidad: {
                            id: 0,
                            clave: '',
                            nombre: '',
                        }                          
                    }
                });
            });
        }       
                
    });    

}

export const ConcluirTurno = ( params : ConcluirTurnoParams ) => {
    
    return new Promise<ConcluirTurnoResponse>( (resolve, eject) => {
        
        const data = JSON.parse( window.localStorage.getItem('data') ?? '' );

        if( data ){

            const { token } = data;

            HttpClientToken.post('/api/v1/actualizar_turno_estado', params, token)
            .then( ( { data } : { data : ConcluirTurnoResponse }) => {           
                resolve( data );
            })
            .catch( ( error: AxiosError ) => {
                resolve( { 
                    success: false, 
                    message: error.message, 
                    data: {
                        turno_id: 0,
                        turno_numero: 0,
                        turno_estado: '',
                        turno_comentarios: '',
                        ventanilla: {
                            id: 0,
                            nombre: '',
                            numero: 0,
                        },
                        unidad: {
                            id: 0,
                            clave: '',
                            nombre: '',
                        }                          
                    }
                });
            });
        }         
                
    });    

}
