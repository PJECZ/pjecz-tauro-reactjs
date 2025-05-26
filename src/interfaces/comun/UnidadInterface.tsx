import { HttpResponse } from "../auth/AuthInterface";
export interface UnidadProps {
    id:             number;
    clave:          string;
    nombre:         string;
}

export interface UnidadesResponse extends HttpResponse {
    data: Unidades[];
}

export interface Unidades {
    id:             number;
    clave:          string;
    nombre:         string;
}