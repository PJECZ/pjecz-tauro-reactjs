
export interface HttpResponse {
    success:    boolean;
    message:    string;
}

export interface LoginParams {
    correoElectronico:      string;
    contrasena:             string;
}

export interface LoginResponse extends HttpResponse {    
    nombres?:               string;
    apellidos?:             string;
    token?:                 string;
    correoElectronico?:     string;
}