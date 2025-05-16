

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TypeUser = 'Recepcionista' | 'Ventanilla';

export interface stateProps {
    username?:               string;   
    correoElectronico?:      string;
    token?:                  string;
    unidad?:                 string;
    ventanilla?:             string;
    tipoUsuario?:            TypeUser;
}

const initialState = {
    token: '',
    nombres: '', 
    apellidos: '', 
    correoElectronico: '', 
} as stateProps;

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: ( state, { payload } : PayloadAction<stateProps> ) => {
            state.token = payload.token;        
            state.username = payload.username;  
            state.correoElectronico = payload.correoElectronico; 
            state.tipoUsuario = payload.tipoUsuario; 
            state.unidad = payload.unidad; 
            state.ventanilla = payload.ventanilla; 
        },
        logout: ( state ) => {     
            state.token = '';
            state.username = '';
            state.correoElectronico = '';         
            state.tipoUsuario = 'Ventanilla';          
            state.unidad = '';          
            state.ventanilla = '';          
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer