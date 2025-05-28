
import HttpClientToken from '../../services/HttpClientToken';

import { AxiosError } from 'axios';

import { VentanillaResponse } from '../../interfaces/comun/VentanillaInterface';

export const ConsultarVentanillasActivas = ( ) => {

    return new Promise<VentanillaResponse>( (resolve, eject) => {

        const data = JSON.parse( window.localStorage.getItem('data') ?? '{}' );

        if( data ){

            const { token } = data;
        
            HttpClientToken.get('/api_oauth2/v1/consultar_ventanillas_activas', token)
            .then( ( { data } : { data : VentanillaResponse }) => {           
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