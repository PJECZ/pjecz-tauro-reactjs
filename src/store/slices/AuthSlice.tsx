
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UnidadProps } from '../../interfaces/comun/UnidadInterface';
import { RolProps } from '../../interfaces/comun/RolInterface';

export interface stateProps {
    username?:               string;   
    correoElectronico?:      string;
    token?:                  string;
    unidad?:                 UnidadProps;
    ventanilla?:             string;
    rol?:                    RolProps;
}

const initialState = {
    token: '',
    nombres: '', 
    apellidos: '', 
    correoElectronico: '',
    rol: undefined,
    unidad: undefined,   
} as stateProps;

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: ( state, { payload } : PayloadAction<stateProps> ) => {
            state.token = payload.token;        
            state.username = payload.username;  
            state.correoElectronico = payload.correoElectronico; 
            state.rol = payload.rol; 
            state.unidad = payload.unidad; 
            state.ventanilla = payload.ventanilla;
        },
        logout: ( state ) => {     
            state.token = '';
            state.username = '';
            state.correoElectronico = '';         
            state.rol = undefined;          
            state.unidad = undefined;          
            state.ventanilla = '';          
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer