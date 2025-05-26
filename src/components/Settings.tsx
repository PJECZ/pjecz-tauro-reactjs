
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, TextField } from "@mui/material";

import { RootState } from "../store";
import { login, stateProps } from "../store/slices/AuthSlice";

import { ConsultarVentanillasActivas } from "../connections/comun/VentanillaConnection";
import { ConsultarTiposTurno } from "../connections/comun/TiposTurnoConnection";

import { Ventanilla } from "../interfaces/comun/VentanillaInterface";
import { TiposTurnoProps } from "../interfaces/comun/TiposTurnoInterface";
import { ActualizarUsuario, ConsultarConfiguracionUsuario } from "../connections/comun/UsuarioConnection";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ErrorsProps {
    configuracion?:         string;
}

export const Settings = ( { open, setOpen }: Props ) => {

    const { username, correoElectronico, unidad, token, rol } = useSelector( ( state: RootState ) => state.auth );

    const dispatch = useDispatch();

    const [loading, setLoading] = useState( false );

    const [tiposTurno, setTiposTurno] = useState<number[]>( [] );
    const [tiposTurnoArray, setTiposTurnoArray] = useState<TiposTurnoProps[]>( [] );
    const [tiposTurnoArrayTemp, setTiposTurnoArrayTemp] = useState<TiposTurnoProps[]>( [] );

    const [ventanilla, setVentanilla] = useState<number>(0);
    const [ventanillaArray, setVentanillaArray] = useState<Ventanilla[]>([]);
    
    const [errors, setErrors] = useState<ErrorsProps>( {} );

    const handleChange = ( id: number, checked: boolean ) => {
     
        const newArray = tiposTurnoArray.map( ( elem ) => {
            if( elem.id === id ){
                elem.selected = checked;
            }
            return elem;
        });

        const tipos = newArray.filter( ( { selected } ) => selected === true );
        
        setTiposTurno( tipos.map( (elem) => elem.id ) );      
        setTiposTurnoArray( newArray );
    };

    const handleGuardarConfiguracion = async () => {

        setLoading( true );

        await ActualizarUsuario({ ventanilla_id: ventanilla, turnos_tipos_ids: tiposTurno }).then( resp => {

            const { success, message, data: dataResponse } = resp;

            if( success ){

                setTimeout(() => {

                    const { ventanilla } = dataResponse;
                    
                    const data: stateProps = {
                        username: username,
                        token: token,                    
                        correoElectronico: correoElectronico,
                        rol: rol,
                        ventanilla: `Ventanilla ${ ventanilla.numero }`,
                        unidad: unidad
                    };
            
                    dispatch( login( data ) );
            
                    window.localStorage.setItem('data', JSON.stringify(data));    
            
                    setOpen( false );
                    setLoading( false );

                }, 700);

            }
            else {

                setTimeout(() => {
                    
                    setErrors({ configuracion: message });
                    setLoading( false );

                }, 700);
            }

        });

    }

    useEffect(() => {
      
        async function obtener(){

            await ConsultarVentanillasActivas().then( resp => {
                setVentanillaArray( resp.data );
            });
        }

        if( open ){
            obtener();
        }

    }, [ open ])     
    
    useEffect(() => {

        async function obtener(){

            await ConsultarTiposTurno().then( resp => {

                if( resp.data ){    
                    setTiposTurnoArray( resp.data );
                    setTiposTurnoArrayTemp( resp.data );
                }
                
            });
        }

        if( open ){
            obtener();
        }  

    }, [ open ])    

    useEffect(() => {

        async function obtener(){

            await ConsultarConfiguracionUsuario().then( resp => {

                if( resp.data ){    

                    const { ventanilla, turnos_tipos } = resp.data;

                    if( ventanilla.id !== 0 ){
                        setVentanilla( ventanilla.id );
                    }

                    if( turnos_tipos.length !== 0 ){

                        const newArray = tiposTurnoArrayTemp.map( ( elem ) => {
                            const findElem = turnos_tipos.find( (e) => e.id === elem.id );
                            if( findElem ){
                                elem.selected = true;
                            }
                            
                            return elem;
                        });
                        
                        setTiposTurno( newArray.map( (elem) => elem.id ) );  
                        setTiposTurnoArray( newArray );
                    }
                }
                
            });
        }

        if( open && ventanillaArray.length !== 0 && tiposTurnoArrayTemp.length !== 0 ){
            obtener();
        }       

    }, [ open, ventanillaArray, tiposTurnoArrayTemp ])    

    return (        

        <Dialog         
            open={open}
            onClose={ () => {} }
            disableEscapeKeyDown
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Configuración
            </DialogTitle>
            
            <DialogContent sx={{ width: 380 }}>

                <Grid container spacing={3} mt={1}>

                    <Grid size={{ xs: 12, md: 12 }}>

                        <FormControl fullWidth>
                           
                            <TextField 
                                id="select-ventanillas" 
                                label="Ventanilla(s)" 
                                select
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }} 
                                value={ ventanilla }
                                onChange={ (e) => setVentanilla( parseInt( e.target.value ?? '0' ) ) }
                            >   
                                <MenuItem key={0} value={0}>Seleccione una opción</MenuItem>      
                                {
                                    ventanillaArray?.map( ( { id, nombre, numero } ) => (
                                        <MenuItem key={id} value={id}>{ nombre } - { numero }   </MenuItem>      
                                    ))
                                }
                            </TextField>

                        </FormControl>   

                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 12 }}>

                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend" color="primary">Tipos de turno</FormLabel>

                            <FormGroup sx={{ mt: 1 }}>

                                {
                                    tiposTurnoArray.map( ( { id, nombre, selected } ) => (

                                        <FormControlLabel
                                            key={ id }
                                            control={
                                                <Checkbox checked={ selected ?? false } onChange={ (e) => handleChange( id, e.target.checked) } />
                                            }
                                            label={ nombre }
                                        />

                                    ))
                                }

                            </FormGroup>

                        </FormControl>
                        
                    </Grid>

                    {
                        errors.configuracion
                        &&
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Alert variant="standard" color="warning">{ errors.configuracion }</Alert>
                            </Grid>
                    }

                </Grid>          
          
            </DialogContent>
           
            <DialogActions>

                <Button variant="text" onClick={ () => setOpen( false ) } autoFocus>
                    Cancelar
                </Button>

                <Button disabled={ ventanilla === 0 || tiposTurno.length === 0 } variant="contained" onClick={ handleGuardarConfiguracion } loading={ loading }>
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>       
       
    )
}
