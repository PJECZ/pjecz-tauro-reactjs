
import { HttpResponse } from "../auth/AuthInterface";

import { TurnoProps } from "./TurnoInterface";
import { UnidadProps } from "./UnidadInterface";

export interface PantallaUnidadResponse extends HttpResponse {
    data:    Data;
}

export interface Data {
    unidad:         UnidadProps
    ultimo_turno?:  TurnoProps;
    turnos:         TurnoProps[];
}

