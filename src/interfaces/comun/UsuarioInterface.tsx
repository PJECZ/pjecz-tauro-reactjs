import { HttpResponse } from "../auth/AuthInterface";

import { RolProps } from "./RolInterface";
import { TiposTurnoProps } from "./TiposTurnoInterface";
import { TurnoProps } from "./TurnoInterface";
import { UnidadProps } from "./UnidadInterface";
import { VentanillaProps } from "./VentanillaInterface";

export interface ActualizarUsuarioParams {
    ventanilla_id:            number;
    turnos_tipos_ids:         number[];
}

export interface ActualizarUsuarioResponse extends HttpResponse {
   data:  ConsultarConfiguracionUsuarioData;
}

export interface ConsultarConfiguracionUsuarioResponse extends HttpResponse {
    data:  ConsultarConfiguracionUsuarioData;
}

export interface ConsultarConfiguracionUsuarioData {
    ventanilla:                 VentanillaProps;
    unidad:                     UnidadProps;
    rol:                        RolProps;
    turnos_tipos:               TiposTurnoProps[];
    usuario_nombre_completo:    string;
    ultimo_turno?:              TurnoProps;
}