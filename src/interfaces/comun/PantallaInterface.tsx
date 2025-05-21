
import { HttpResponse } from "../auth/AuthInterface";

import { TurnoProps } from "./TurnoInterface";

export interface PantallaResponse extends HttpResponse {
    data:    Data;
}

export interface Data {
    ultimo_turno?:  TurnoProps;
    turnos:         TurnoProps[];
}

