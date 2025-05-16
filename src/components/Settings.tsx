
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Dialog, DialogContent, DialogActions, Button, Box, Chip, FormControl, MenuItem, Select, SelectChangeEvent, Grid, DialogTitle, TextField } from "@mui/material";

import { RootState } from "../store";
import { login, stateProps } from "../store/slices/AuthSlice";

import { ConsultarVentanillasActivas } from "../connections/comun/VentanillaConnection";

import { Ventanilla } from "../interfaces/comun/VentanillaInterface";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const tipos = [ 'Normal', 'Urgente', 'Con cita', ];

export const Settings = ( { open, setOpen }: Props ) => {

    const { username, correoElectronico, token } = useSelector( ( state: RootState ) => state.auth );

    const dispatch = useDispatch();

    const [tipoTurno, setTipoTurno] = useState<string[]>([]);

    const [ventanilla, setVentanilla] = useState<number>(0);
    const [ventanillaArray, setVentanillaArray] = useState<Ventanilla[]>([]);
    
    const handleChange = (event: SelectChangeEvent<typeof tipoTurno> ) => {
     
        const { target: { value }, } = event;

        setTipoTurno( typeof value === 'string' ? value.split(',') : value, );
    };

    const handleGuardarConfiguracion = () => {

        console.log( ventanilla );

        const data: stateProps = {
            username: username,
            token: token,                    
            correoElectronico: correoElectronico,
            tipoUsuario: 'Ventanilla',
            unidad: '',
        };

        dispatch( login( data ) );

        window.localStorage.setItem('data', JSON.stringify(data));    

        setOpen( false );
    }

    useEffect(() => {
      
        async function obtener(){

            await ConsultarVentanillasActivas().then( resp => {
                setVentanillaArray( resp.data );
            });
        }

        obtener();

    }, [])       

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
                                    ventanillaArray.map( ( { id, nombre } ) => (
                                        <MenuItem key={id} value={id}>{ nombre } { id } </MenuItem>      
                                    ))
                                }
                            </TextField>

                        </FormControl>   

                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 12 }}>
                        
                        <FormControl fullWidth>
                            <Select
                                labelId="select-tipo-turno"
                                id="select-tipo-turno"
                                label="Tipo de Turno"               
                                multiple      
                                value={ tipoTurno }
                                onChange={ handleChange }      
                                displayEmpty
                                input={ 
                                    <TextField 
                                        id="select-ventanillas" 
                                        label="Tipo de Turno" 
                                        select
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }} 
                                        value={0}
                                    /> 
                                }
                                renderValue={ ( selected ) => {

                                    if ( selected.length === 0 ) {
                                        return <>Seleccione el (los) tipo(s) de turno</>;
                                    }
                                    
                                    return (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {
                                                selected.map( ( value ) => (
                                                    <Chip key={ value } label={ value } />
                                                ))
                                            }
                                        </Box>
                                    );
                                }}
                            >
                                {
                                    tipos.map( ( name ) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>   

                    </Grid>

                </Grid>          
          
            </DialogContent>
           
            <DialogActions>

                <Button variant="contained" onClick={ handleGuardarConfiguracion } autoFocus>
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>       
       
    )
}
