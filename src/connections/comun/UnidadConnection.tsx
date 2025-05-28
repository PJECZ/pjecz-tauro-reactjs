
import HttpClientToken from '../../services/HttpClientToken';

import { AxiosError } from 'axios';

import { UnidadesResponse } from '../../interfaces/comun/UnidadInterface';

export const ConsultarUnidades = ( ) => {

    return new Promise<UnidadesResponse>( (resolve, eject) => {

        const data = JSON.parse( window.localStorage.getItem('data') ?? '{}' );

        if( data ){

            const { token } = data;
        
            HttpClientToken.get('/api_oauth2/v1/consultar_unidades', token)
            .then( ( { data } : { data : UnidadesResponse }) => {           
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