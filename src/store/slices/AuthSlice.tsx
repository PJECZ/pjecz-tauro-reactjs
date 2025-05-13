

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TypeUser = 'Recepcionista' | 'Ventanilla';

export interface stateProps {
    nombres?:                string;
    apellidos?:              string;
    correoElectronico?:      string;
    token?:                  string;
    tipoUsuario?:            TypeUser;
    ventanilla?:             string;
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
            state.nombres = payload.nombres;
            state.apellidos = payload.apellidos;
            state.correoElectronico = payload.correoElectronico; 
            state.tipoUsuario = payload.tipoUsuario; 
            state.ventanilla = payload.ventanilla; 
        },
        logout: ( state ) => {     
            state.token = '';
            state.nombres = '';
            state.apellidos = '';
            state.correoElectronico = '';         
            state.tipoUsuario = 'Ventanilla';          
            state.ventanilla = '';          
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer