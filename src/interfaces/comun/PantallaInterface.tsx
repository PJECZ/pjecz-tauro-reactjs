import { TurnoProps } from "./TurnoInterface";

export interface PantallaResponse {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    ultimo_turno?: TurnoProps;
    turnos:       TurnoProps[];
}

