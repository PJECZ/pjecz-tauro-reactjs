
import { HttpResponse } from "../auth/AuthInterface";

export interface EstadosTurnoResponse extends HttpResponse {
    data: EstadosTurnoProps[];
}

export interface EstadosTurnoProps {
    id:         number;
    nombre:     string;
}
