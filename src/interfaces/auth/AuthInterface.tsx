
import { RolProps } from "../comun/RolInterface";
import { UnidadProps } from "../comun/UnidadInterface";
import { VentanillaProps } from "../comun/VentanillaInterface";

export interface HttpResponse {
    success:    boolean;
    message:    string;
}

export interface LoginParams {
    username:      string;
    password:      string;
}

export interface LoginResponse extends HttpResponse {  
    access_token:               string;
    username:                   string;
    usuario_nombre_completo:    string;
    rol:                        RolProps;
    unidad?:                    UnidadProps;
    ventanilla?:                VentanillaProps;
}