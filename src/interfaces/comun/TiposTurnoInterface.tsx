
import { HttpResponse } from "../auth/AuthInterface";

export interface TiposTurnoResponse extends HttpResponse {
    data: TiposTurnoProps[];
}

export interface TiposTurnoProps {
    id:         number;
    nombre:     string;
    nivel:      string;
    selected?:  boolean;
}
