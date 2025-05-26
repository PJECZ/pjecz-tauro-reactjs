
import { HttpResponse } from "../auth/AuthInterface";

export interface VentanillaResponse extends HttpResponse {
    data: Ventanilla[];
}

export interface Ventanilla {
    id:         number;
    nombre:     string;
    numero:     string;
}

export interface VentanillaProps {
    id:         number;
    nombre:     string;
    numero:     number | null;
}