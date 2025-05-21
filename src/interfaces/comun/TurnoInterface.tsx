
import { UnidadProps } from "./UnidadInterface";
import { VentanillaProps } from "./VentanillaInterface";

export interface TurnoProps {
    turno_id:               number;
    turno_numero:           number;
    turno_estado:           string;
    turno_comentarios:      string;
    unidad:                 UnidadProps;
    ventanilla:             VentanillaProps;
}