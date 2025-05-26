
import { HttpResponse } from "../auth/AuthInterface";

export interface TiposTurnoResponse extends HttpResponse {
    data: TiposTurno[];
}

export interface TiposTurno {
    id:         number;
    nombre:     string;
    nivel:     string;
}
