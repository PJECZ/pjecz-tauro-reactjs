
import HttpClient from '../../services/HttpClient';

import { AxiosError } from 'axios';

import { PantallaResponse } from '../../interfaces/comun/PantallaInterface';
import { PantallaUnidadResponse } from '../../interfaces/comun/PantallaUnidadInterface';

export const ConsultarTodosTurnos = ( ) => {
    

    return new Promise<PantallaResponse>( (resolve, eject) => {
        
        HttpClient.get('/api/v1/consultar_turnos')
        .then( ( { data } : { data : PantallaResponse }) => {           
            resolve( data );
        })
        .catch( ( error: AxiosError ) => {
            resolve( { success: false, message: error.message, data: { turnos: [] } } );
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
                {/*resolve({ success: false, message: error.message, data: { turnos: [] } });*/}
                resolve({ success: false, message: error.message, data: { turnos: [], unidad: { id: 0, clave: '', nombre: '' } } });
            });
    });
};
