
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Alert, Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, MenuItem, Snackbar, TextField, Typography } from "@mui/material";

import { ConsultarTiposTurno } from "../../connections/comun/TiposTurnoConnection";
import { CrearTurno } from "../../connections/comun/TurnosConnection";
import { RootState } from "../../store";

import { ConsultarUnidades } from "../../connections/comun/UnidadConnection";
import { Unidades } from "../../interfaces/comun/UnidadInterface";
import { SnackbarProps } from '../../interfaces/ui/SnackbarInterface';

export const CrearTurnoPage = () => { 
    
    const [openConfirmacion, setOpenConfirmacion] = useState( false );
    const [openTurnoConfirmacion, setOpenTurnoConfirmacion] = useState( false );

    const [tipoturno, setTipoturno] =useState(0)

    const[ unidad, setUnidad] = useState(0);
    // Import or define the Unidades type if not already imported
    // import { Unidades } from '../../interfaces/comun/UnidadesInterface';
    const[ unidadArray, setUnidadArray] = useState<Unidades[]>([]);
    
    const[ observaciones, setObservaciones] = useState('');

    const { unidad: unidadRedux } = useSelector( ( state: RootState ) => state.auth );

    const [tiposTurnoArray, setTiposTurnoArray] = useState<any[]>( [] );

    const [turno, setTurno] = useState(0); 

        const [{ type: typeSnackbar, open: openMessage, message }, setOpenMessage] = useState<SnackbarProps>({
            type: 'warning',
            message: '',
            open: false,
        });
    
    const handleClose = () => setOpenMessage({ type: typeSnackbar, open: false, message })

    useEffect(() => {
        
        async function obtener(){

            await ConsultarUnidades().then( resp => {
                setUnidadArray( resp.data );
                console.log( resp.data );
            })
            .catch( error => {
                console.log( error );   
            }
            
    )}

        obtener();

    }, [])  
    
    async function obtenerTurno(){
        
        await CrearTurno( {
            "turno_tipo_id": tipoturno,
            "unidad_id": unidadRedux?.id ?? unidad,
            "comentarios": observaciones,
          } ).then(resp => {

            if( resp.data ){

                const { turno_numero } = resp.data;
                console.log(resp.data)
                setTurno( turno_numero ?? turno_numero );  
                setOpenTurnoConfirmacion( true );   
            }

        });
    }

    const handleGenerarTurno = () => {

        if(!unidadRedux ){
            setOpenMessage({ type: 'warning', open: true, message: 'Seleccione la Unidad donde se crea el turno' });
            return;
        }
        else if(!tipoturno){   
            setOpenMessage({ type: 'warning', open: true, message: 'Debes seleccionar el Tipo de Turno a crear' });
            return;
        }
        else if(!observaciones && tipoturno === 3){   
            setOpenMessage({ type: 'warning', open: true, message: 'Escriba en las observaciones el porque es Turno Urgente' });
            return;
        }
        else {
            obtenerTurno( );
            setOpenConfirmacion( false );
        }
    }

    useEffect(() => {
          
            async function obtenerTipoTurno(){
    
                await ConsultarTiposTurno().then( resp => {
                    setTiposTurnoArray( resp.data );
                    console.log( 'tipos de turno :' , resp.data );
                })
                .catch( error => {
                    console.log( error );   
                }
                
        )}
    
            obtenerTipoTurno();
    
        }, []) 


    return (

        <>   
            <Snackbar open={openMessage} autoHideDuration={1500} onClose={ handleClose } anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={ handleClose }
                    severity={ typeSnackbar }
                    variant="filled"
                    sx={{ width: '100%' }}                   
                >
                    { message }
                </Alert>
            </Snackbar> 

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
                                        onChange={ (e) => setObservaciones(  e.target.value ?? ''  ) }                           
                                    />

                                </FormControl>   

                            </Grid>

                        </CardContent>              

                        <CardActions sx={{ opacity: 0.6, p: 3 }}>                  

                            <Button fullWidth variant="contained" onClick={ () => {  setOpenConfirmacion( true )} }> 
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
                    <Button onClick={ () => setOpenConfirmacion( false ) }>Cancelar</Button>
                    <Button variant='contained' onClick={ () => {
                        setOpenConfirmacion( false ) ; handleGenerarTurno() ;
                    } } >
                        Aceptar
                    </Button>
                </DialogActions>

            </Dialog>        


            <Dialog
                open={ openTurnoConfirmacion }
                onClose={ () => {} }
            >
                <DialogTitle sx={{ backgroundColor:'#efeff1'}}>Turno nuevo</DialogTitle>

                <DialogContent sx={{ width: 300 }}>

                    <DialogContentText sx={{textAlign: 'center', paddingTop:2}} >
                       Se ha creado un nuevo turno con el número<br></br> 
                       <Typography variant="h2">{ String(turno).padStart(3,'0') }</Typography>
                    </DialogContentText>

                </DialogContent>

                <DialogActions>
                    <Button variant='contained' onClick={ () => {
                        setOpenTurnoConfirmacion( false ) ; 
                    } } >
                        Aceptar
                    </Button>
                </DialogActions>

            </Dialog> 
        
        </>
    )
}