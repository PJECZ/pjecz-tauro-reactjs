
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

export interface CrearTurnoResponse  extends HttpResponse {
    data:   CrearTurno
}
export interface CrearTurno {
    turno_id:           number,
    turno_numero:       number,
    turno_estado:       string,
    turno_comentarios:  string,
    ventanilla:       VentanillaProps,
}

export interface TomarTurnoResponse extends HttpResponse {
    data :  TurnoData
}

export interface CancelarTurnoResponse extends HttpResponse {
    data :  TurnoData
}

export interface ConcluirTurnoResponse extends HttpResponse {
    data :  TurnoData
}

export interface TurnoData {
    turno_id:           number,
    turno_numero:       number,
    turno_estado:       string,
    turno_comentarios:  string,
    ventanilla:         VentanillaProps,
}