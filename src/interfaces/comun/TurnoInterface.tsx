
import { HttpResponse } from "../auth/AuthInterface";
import { UnidadProps } from "./UnidadInterface";
import { VentanillaProps } from "./VentanillaInterface";

export interface TurnoProps {
    turno_id:               number;
    turno_numero:           number;
    turno_estado:           string;
    turno_comentarios:      string;
    unidad:                 UnidadProps;
    ventanilla:             VentanillaProps;
}

export interface CrearTurnoParams {
    turno_tipo_id:      number;
    unidad_id:          number;
    comentarios:        string;
}

export interface CrearTurnoResponse extends HttpResponse {
    data:   TurnoProps
}

export interface TomarTurnoResponse extends HttpResponse {
    data :  TurnoProps
}

export interface CancelarTurnoParams {
    turno_id:               number;
    turno_estado_id:        number;
}

export interface CancelarTurnoResponse extends HttpResponse {
    data :  TurnoProps
}

export interface ConcluirTurnoParams {
    turno_id:               number;
    turno_estado_id:        number;
}

export interface ConcluirTurnoResponse extends HttpResponse {
    data :  TurnoProps
}

export interface SocketTurnoResponse extends HttpResponse {
    data:   TurnoProps
}
