
import { HttpResponse } from "../auth/AuthInterface";

export interface VentanillaResponse extends HttpResponse {
    data: Ventanilla[];
}

export interface Ventanilla {
    ventanilla_id:         number;
    ventanilla_nombre:     string;
    ventanilla_numero:     string;
}

export interface VentanillaProps {
    id:         number;
    nombre:     string;
    numero:     number | null;
}