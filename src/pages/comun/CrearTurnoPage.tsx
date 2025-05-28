
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Alert, Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material";

import { ConsultarTiposTurno } from "../../connections/comun/TiposTurnoConnection";
import { CrearTurno } from "../../connections/comun/TurnosConnection";
import { RootState } from "../../store";

import { ConsultarUnidades } from "../../connections/comun/UnidadConnection";

import { Unidades } from "../../interfaces/comun/UnidadInterface";
import { TurnoProps } from "../../interfaces/comun/TurnoInterface";

const defaultTurno: TurnoProps = { turno_id: 0, turno_numero: 0, turno_comentarios: '', turno_estado: '', unidad : { id: 0, clave : '', nombre : '' }, ventanilla: { id: 0, nombre : '', numero : 0 } };

export interface ErrorsProps {
    tipoTurno?:         string;
    unidad?:            string;
    observaciones?:     string;
}

export const CrearTurnoPage = () => { 
    
    const [openConfirmacion, setOpenConfirmacion] = useState( false );
    const [openTurnoConfirmacion, setOpenTurnoConfirmacion] = useState( false );

    const [loading, setLoading] = useState( false );

    const [tipoturno, setTipoturno] =useState(0)

    const[ unidad, setUnidad] = useState(0);
   
    const[ unidadArray, setUnidadArray] = useState<Unidades[]>([]);
    
    const[ observaciones, setObservaciones] = useState('');

    const { unidad: unidadRedux } = useSelector( ( state: RootState ) => state.auth );

    const [tiposTurnoArray, setTiposTurnoArray] = useState<any[]>( [] );

    const [turno, setTurno] = useState<TurnoProps>( defaultTurno ); 

    const [errors, setErrors] = useState<ErrorsProps>( {} );

    const handleValidateFields = () => {

        setErrors( {} );

        let valid = true;
        let errors: ErrorsProps = {};

        if( !unidadRedux && unidad === 0 ){
            errors = { unidad: 'Debe seleccionar una unidad' };        
            valid = false;   
        }
        else if( tipoturno === 0 ) {   
            errors = { tipoTurno: 'Debe seleccionar el tipo de turno' };
            valid = false;           
        }
        else if( observaciones === '' && tipoturno === 3 ){   
            errors = { observaciones: 'Escribe las observaciones' };          
            valid = false;
        }


        if( valid ){
            setOpenConfirmacion( true ); 
        }
        else {
            setErrors( errors );
        }

    }
    
    const handleCrearTurno = async () => {       

        setLoading( true );

        await CrearTurno({ turno_tipo_id: tipoturno, unidad_id: unidadRedux?.id===1 ? unidad : unidadRedux?.id ?? 0, comentarios: observaciones })
        .then(resp => {

            if( resp.data ){

                setTimeout(() => {
                    
                    setTurno( resp.data );
                        
                    setOpenTurnoConfirmacion( true );   
                    setOpenConfirmacion( false ); 
                    setLoading( false );     

                }, 500);                

            }
            else {
                setLoading( false );
            }

        });
        
    }

    const handleCloseNuevoTurno = () => {

        setUnidad( 0 );
        setTipoturno( 0 );
        setObservaciones( '' );

        setOpenTurnoConfirmacion( false );  
        setOpenConfirmacion( false );
    }

    useEffect(() => {
    
        async function obtener(){

            await ConsultarUnidades().then( resp => {
                setUnidadArray( resp.data ?? [] );
            });
        }

        obtener();

    }, [])  
    
    useEffect(() => {
          
        async function obtenerTipoTurno(){

            await ConsultarTiposTurno().then( resp => {
                setTiposTurnoArray( resp.data ?? [] );
            });

        }
    
        obtenerTipoTurno();

    }, []) 

    return (

        <>   

            <Grid container spacing={3}>

                {
                    unidadRedux?.id!==1
                    &&
                        <Grid size={{ xs: 12, md: 12 }}>               
                        
                            <Box bgcolor={'#333'} sx={{ opacity:0.6}}>
                                
                                <Typography variant="h4" color="white" textAlign={'center'} p={1} sx={{ bgcolor: '#003366'}}>
                                    { unidadRedux?.nombre } 
                                </Typography>
                                    
                            </Box>                      

                        </Grid>

                }

                <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <Card sx={{ width: 400, mt: 3 }}>
                
                        <CardContent>

                            {
                                unidadRedux?.id===1
                                &&
                                    <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 3 }}>

                                        <FormControl fullWidth>                                            
                                            
                                            <TextField 
                                                id="select-unidad" 
                                                label="Unidad" 
                                                select
                                                slotProps={{
                                                    inputLabel: {
                                                        shrink: true,
                                                    },
                                                }} 
                                                value={unidad}
                                                onChange={ (e) => setUnidad( parseInt( e.target.value ?? '0' ) ) }
                                            >       
                                                <MenuItem value={0}>Seleccione una opción</MenuItem> 
                                                {
                                                    unidadArray?.map( ( { id, clave, nombre } ) => (
                                                        <MenuItem key={id} value={id}>{ clave } - { nombre }   </MenuItem>      
                                                    ))
                                                }          
                                                
                                            </TextField>

                                        </FormControl>   

                                        { errors.unidad && <Alert variant="standard" color="warning" sx={{ mt: 1 }}>{ errors.unidad }</Alert> }

                                    </Grid>
                            }                            

                            <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 3 }}> 

                                <FormControl fullWidth>

                                    <TextField 
                                        id="select-tipo-turno" 
                                        label="Tipo de turno" 
                                        select
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }} 
                                        value={tipoturno}
                                        onChange={ (e) => setTipoturno( parseInt( e.target.value ?? '0' ) ) }
                                    >

                                        <MenuItem value={0}>Seleccione una opción</MenuItem>  
                                        {
                                            
                                            tiposTurnoArray.map( ( item ) => (
                                                <MenuItem key={ item.id } value={ item.id }>{ item.nombre }</MenuItem>      
                                            ))
                                        }
                                    </TextField>
                                  
                                </FormControl>   

                                { errors.tipoTurno && <Alert variant="standard" color="warning" sx={{ mt: 1 }}>{ errors.tipoTurno }</Alert> }

                            </Grid>

                            <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 3 }}>
                                
                                <FormControl fullWidth>

                                    <TextField
                                        fullWidth
                                        label="Observaciones"
                                        name="observaciones"
                                        variant="outlined"        
                                        multiline
                                        rows={4}                 
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                        value={ observaciones }
                                        onChange={ (e) => setObservaciones(  e.target.value ?? ''  ) }                           
                                    />

                                </FormControl>   

                                { errors.observaciones && <Alert variant="standard" color="warning" sx={{ mt: 1 }}>{ errors.observaciones }</Alert> }

                            </Grid>

                        </CardContent>              

                        <CardActions sx={{ opacity: 0.6, p: 3 }}>                  

                            <Button fullWidth variant="contained" onClick={ handleValidateFields }> 
                                Crear Turno
                            </Button>   
                                                    
                        </CardActions>

                    </Card>
                        
                </Grid>

            </Grid>   
            
            <Dialog
                open={ openConfirmacion }
                onClose={ () => {} }
            >
                <DialogTitle>Confirmación</DialogTitle>

                <DialogContent sx={{ width: 300 }}>

                    <DialogContentText>
                       ¿Desea crear un nuevo turno?
                    </DialogContentText>

                </DialogContent>

                <DialogActions>
                    <Button onClick={ handleCloseNuevoTurno }>Cancelar</Button>
                    <Button 
                        variant='contained' 
                        onClick={  handleCrearTurno } 
                        loading={ loading }
                    >
                        Aceptar
                    </Button>
                </DialogActions>

            </Dialog>     

            <Dialog
                open={ openTurnoConfirmacion }
                onClose={ () => {} }
            >
                <DialogTitle sx={{ backgroundColor:'#efeff1'}}>Información</DialogTitle>

                <DialogContent sx={{ width: 300 }}>

                    <DialogContentText sx={{ textAlign: 'center', mt: 5 }} >

                        Se ha creado un nuevo turno con el número
                        <Typography variant="h1" sx={{ mt: 2 }}>
                            {
                                !unidadRedux
                                ?
                                    ( turno.unidad.clave ?? '' ) + '-' + String( turno.turno_numero ).padStart(3,'0')
                                :
                                    String( turno.turno_numero ).padStart(3,'0')
                            }
                        </Typography>

                    </DialogContentText>

                </DialogContent>

                <DialogActions>
                    <Button variant='contained' onClick={ handleCloseNuevoTurno  } >
                        Aceptar
                    </Button>
                </DialogActions>

            </Dialog> 
        
        </>
    )
}