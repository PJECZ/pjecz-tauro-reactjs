
import HttpClientToken from '../../services/HttpClientToken';

import { AxiosError } from 'axios';

import { UbicacionResponse } from '../../interfaces/comun/UbicacionInterface';

export const ConsultarUbicacionesActivas = ( ) => {

    return new Promise<UbicacionResponse>( (resolve, eject) => {

        const data = JSON.parse( window.localStorage.getItem('data') ?? '{}' );

        if( data ){

            const { token } = data;
        
            HttpClientToken.get('/api_oauth2/v1/consultar_ubicaciones_activas', token)
            .then( ( { data } : { data : UbicacionResponse }) => {           
                resolve( data );
            })
            .catch( ( error: AxiosError ) => {
                resolve( { success: false, message: error.message, data: [] } );
            });

        }
        else {
            resolve( { success: false, message: 'Ocurrio un error', data: [] } ); 
        }
        
    });    

}