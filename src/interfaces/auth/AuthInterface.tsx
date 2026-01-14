
import { RolProps } from "../comun/RolInterface";
import { UnidadProps } from "../comun/UnidadInterface";
import { UbicacionProps } from "../comun/UbicacionInterface";

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
    ubicacion?:                UbicacionProps;
}