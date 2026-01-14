
import { HttpResponse } from "../auth/AuthInterface";

export interface UbicacionResponse extends HttpResponse {
    data: Ubicacion[];
}

export interface Ubicacion {
    id:         number;
    nombre:     string;
    numero:     string;
}

export interface UbicacionProps {
    id:         number;
    nombre:     string;
    numero:     number | null;
}