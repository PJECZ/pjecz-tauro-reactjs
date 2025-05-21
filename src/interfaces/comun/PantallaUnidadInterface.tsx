import { TurnoProps } from "./TurnoInterface";
import { UnidadProps } from "./UnidadInterface";

export interface PantallaUnidadResponse {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    unidad:      UnidadProps
    ultimo_turno?: TurnoProps;
    turnos:       TurnoProps[];
}

