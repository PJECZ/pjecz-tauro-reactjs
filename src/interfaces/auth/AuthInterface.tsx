
export interface HttpResponse {
    success:    boolean;
    message:    string;
}

export interface LoginParams {
    username:      string;
    password:      string;
}

export interface LoginResponse extends HttpResponse {  
    access_token: string;
    username:     string;
}