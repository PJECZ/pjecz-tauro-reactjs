
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, TextField } from "@mui/material";

import { RootState } from "../store";
import { login, stateProps } from "../store/slices/AuthSlice";

import { ConsultarVentanillasActivas } from "../connections/comun/VentanillaConnection";

import { Ventanilla } from "../interfaces/comun/VentanillaInterface";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TipoTurnosProps {
    id:         number;
    nombre:     string;
    selected?:  boolean;
}

const tipos: TipoTurnosProps[] = [
    { id: 1, nombre: 'Normal', selected: false, },
    { id: 2, nombre: 'Urgente', selected: false, },
    { id: 3, nombre: 'Con cita', selected: false, },
];

export const Settings = ( { open, setOpen }: Props ) => {

    const { username, correoElectronico, unidad, token, rol } = useSelector( ( state: RootState ) => state.auth );

    const dispatch = useDispatch();

    const [tiposTurno, setTiposTurno] = useState<TipoTurnosProps[]>( [] );
    const [tiposTurnoArray, setTiposTurnoArray] = useState<TipoTurnosProps[]>( [] );

    const [ventanilla, setVentanilla] = useState<number>(0);
    const [ventanillaArray, setVentanillaArray] = useState<Ventanilla[]>([]);
    
    const handleChange = ( id: number, checked: boolean ) => {
     
        const newArray = tiposTurnoArray.map( ( elem ) => {
            if( elem.id === id ){
                elem.selected = checked;
            }
            return elem;
        });

        const tipos = newArray.filter( ( { selected } ) => selected === true );
        setTiposTurno( tipos );

        setTiposTurnoArray( newArray );
    };

    const handleGuardarConfiguracion = () => {

        console.log( ventanilla );
        console.log( tiposTurno );

        const data: stateProps = {
            username: username,
            token: token,                    
            correoElectronico: correoElectronico,
            rol: rol,
            ventanilla: `Ventanilla ${ ventanilla }`,
            unidad: unidad
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

    useEffect(() => {
      
        setTiposTurnoArray( tipos );

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
                                    ventanillaArray.map( ( { ventanilla_id, ventanilla_nombre, ventanilla_numero } ) => (
                                        <MenuItem key={ventanilla_id} value={ventanilla_id}>{ ventanilla_nombre } - { ventanilla_numero }   </MenuItem>      
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
