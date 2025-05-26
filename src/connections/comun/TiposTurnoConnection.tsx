
import HttpClientToken from '../../services/HttpClientToken';

import { AxiosError } from 'axios';

import { TiposTurnoResponse } from '../../interfaces/comun/TiposTurnoInterface';

export const ConsultarTiposTurno = ( ) => {

    return new Promise<TiposTurnoResponse>( (resolve, eject) => {

        const data = JSON.parse( window.localStorage.getItem('data') ?? '' );

        if( data ){

            const { token } = data;
        
            HttpClientToken.get('/api/v1/consultar_turnos_tipos', token)
            .then( ( { data } : { data : TiposTurnoResponse }) => {           
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