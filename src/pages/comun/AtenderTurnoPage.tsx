
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import { table_padding, table_tbody, table_thead } from "../../styles/TableStyle";

import { Settings } from "../../components/Settings";
import { RootState } from "../../store";

import { openSnackbar } from '../../store/slices/SnackbarSlice';


import { AtenderTurno, CancelarTurno, ConcluirTurno, TomarTurno } from "../../connections/comun/TurnosConnection";

import { ConsultarConfiguracionUsuario } from '../../connections/comun/UsuarioConnection';
import { TurnoProps } from '../../interfaces/comun/TurnoInterface';
import { SnackbarProps } from '../../interfaces/ui/SnackbarInterface';

type ActionTurno = 'Tomar' | 'Atender' | 'Concluir' | 'Cancelar';

const defaultTurno: TurnoProps = { turno_id: 0, turno_numero: 0, turno_comentarios: '', turno_numero_cubiculo: 0, turno_estado: { id:0, nombre:''},turno_tipo: {id:0, nombre:'', nivel:''} , unidad : { id: 0, clave : '', nombre : '' }, ubicacion: { id: 0, nombre : '', numero : 0 } };

export const AtenderTurnoPage = () => {  
    const dispatch = useDispatch();

    const { ubicacion } = useSelector( ( state: RootState ) => state.auth );

    const [turno, setTurno] = useState<TurnoProps>( defaultTurno );
    
    const [open, setOpen] = useState( false );
    const [openConfirmacion, setOpenConfirmacion] = useState( false );

    const [loading, setLoading] = useState( false );

    const [actionTurno, setActionTurno] = useState<ActionTurno>( 'Tomar' );

    const { unidad: unidadRedux } = useSelector( ( state: RootState ) => state.auth );

    const [{ type: typeSnackbar, open: openMessage, message }, setOpenMessage] = useState<SnackbarProps>({
        type: 'warning',
        message: '',
        open: false,
    });
    
    const [texto, setTexto] = useState('Turno 6, pase a ventanilla 7.');

    const reproducirAudio = () => {
        if ('speechSynthesis' in window) {
        // Detener cualquier audio que se esté reproduciendo antes de iniciar uno nuevo
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(texto);
        
        // Opcional: Configurar la voz, velocidad o tono
        utterance.lang = 'es-MX'; // Idioma (español)
        utterance.rate = 1;       // Velocidad (de 0.1 a 10)
        utterance.pitch = 1;      // Tono (de 0 to 2)

        window.speechSynthesis.speak(utterance);
        } else {
        alert('Tu navegador no soporta la función de Texto a Voz');
        }
    };

    const handleCloseSnackbar = () => setOpenMessage({ type: typeSnackbar, open: false, message }) 

    const handleTomarTurno = async () => {

        setLoading( true );

        await TomarTurno().then(resp => {
    
            const { success, message, data } = resp;

            if( success ){

                if( data ){        

                    setTimeout(() => {              

                        setTurno( data );  
                        setLoading( false );
    
                        setOpenConfirmacion( false );

                    }, 500);
                }

            }
            else {

                setTimeout(() => {        

                    dispatch( openSnackbar({ message: message, variant: 'warning' })); 
    
                    setLoading( false );
    
                    setOpenConfirmacion( false );

                }, 500);

            }

        });  
        
    }

    const handleCancelarTurno = async () => {      

        setLoading( true );

        await CancelarTurno({ turno_id: turno.turno_id, turno_estado_id: 4 })
        .then(resp => {

            const { success, message } = resp;
        
            if( success ){

                setTimeout(() => {    

                    setTurno( defaultTurno );
                    setLoading( false );

                    setOpenConfirmacion( false );

                }, 500);
            }
            else {
                setTimeout(() => {            

                    setLoading( false );
                    setOpenConfirmacion( false );

                    dispatch( openSnackbar({ message: message, variant: 'warning' }));

                }, 500);
            }

        });                
    }

    const handleAtenderTurno = async () => {

        setLoading( true );
        
        await AtenderTurno({ turno_id: turno.turno_id, turno_estado_id: 2 })
        .then(resp => {

            const { success, message, data } = resp;
        
            if( success ){

                setTimeout(() => {         

                    setTurno({ ...data });
                    
                    setLoading( false );

                    setOpenConfirmacion( false );

                }, 500);
            }
            else {
                setTimeout(() => {            

                    setLoading( false );
                    setOpenConfirmacion( false );

                    dispatch( openSnackbar({ message: message, variant: 'warning' }));
                    
                }, 500);
            }

        });  
        
    }

    const handleConcluirTurno = async () => {

        setLoading( true );
        
        await ConcluirTurno({ turno_id: turno.turno_id, turno_estado_id: 3 })
        .then(resp => {

            const { success, message } = resp;
        
            if( success ){

                setTimeout(() => {         

                    setTurno( defaultTurno );
                    setLoading( false );

                    setOpenConfirmacion( false );

                }, 500);
            }
            else {
                setTimeout(() => {            

                    setLoading( false );
                    setOpenConfirmacion( false );

                    dispatch( openSnackbar({ message: message, variant: 'warning' }));
                    
                }, 500);
            }

        });  
        
    }

    useEffect(() => {
    
        if( !ubicacion ){
            setOpen( true );
        }

    }, [ ubicacion ])    

    useEffect(() => {
    
        async function obtener(){

            await ConsultarConfiguracionUsuario().then( resp => {

                if( resp.data ){    

                    const { ultimo_turno } = resp.data;   
        
                    setTurno( ultimo_turno?? defaultTurno );          
                    
                }
                
            });
        }    
        
        obtener();              

    }, [ ])   

    return (

        <>

            <Snackbar open={openMessage} autoHideDuration={1500} onClose={ handleCloseSnackbar } anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={ handleCloseSnackbar }
                    severity={ typeSnackbar }
                    variant="filled"
                    sx={{ width: '100%' }}                   
                >
                    { message }
                </Alert>
            </Snackbar> 

            <Grid container spacing={3}>

                {/* Barra superior con descripcion de la unidad */}
                <Grid size={{ xs: 12, md: 12 }}>               
                    
                    <Typography variant="h4" color="white" textAlign={'center'} p={1} sx={{ bgcolor: '#0A192D', borderRadius: 3 }}>
                        {unidadRedux?.nombre}
                    </Typography>
    
                </Grid>

                <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <Button disabled={ turno.turno_id !== 0 } size='large' variant="contained" onClick={ () => { setActionTurno( 'Tomar' ); setOpenConfirmacion( true ); } }> 
                        Tomar Turno
                    </Button>
                        
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } }  >

                    <TableContainer component={ Paper } variant="outlined" sx={{ borderRadius: 2 }} style={{backgroundColor:'rgba(255,255,255,0.6)'}}>

                        <Table>

                            <TableHead sx={{ ...table_thead }}>

                                <TableRow>   
                                    <TableCell sx={{ ...table_padding, ...table_thead, width: '2%', textAlign: 'center', fontSize:'50px', paddingY:'30px' }}>Turno</TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                <TableRow style={{...table_tbody }}>
                                    
                                    <TableCell sx={{ ...table_padding, fontSize: 200, textAlign: 'center', fontWeight: 'bold', height:'25vh', maxHeight:'25vh' }}>
                                        { turno.turno_numero === 0 ? '' : turno.turno_numero }
                                    </TableCell>

                                </TableRow>

                                <TableRow style={{...table_tbody }}>

                                    <TableCell sx={{padding:0,  fontSize: 18, textAlign: 'center' }}>

                                        { 
                                            turno.turno_id !== 0 
                                            &&   
                                                <Table sx={{ margin:0, padding:0 }} style={{backgroundColor:'rgba(255,255,255,0.1)'}}>

                                                    <TableRow>

                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button variant="outlined" color='secondary' onClick={ () => { setActionTurno( 'Cancelar' ); setOpenConfirmacion( true ); } }> 
                                                                Cancelar
                                                            </Button>
                                                        </TableCell>

                                                        {
                                                            turno.turno_estado.id===7
                                                            &&
                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button variant="contained" size='large' style={{backgroundColor:'#0A192D'}}  onClick={ () => { setActionTurno( 'Atender' ); setOpenConfirmacion( true ); } }> 
                                                                Iniciar atención
                                                            </Button>
                                                        </TableCell>
                                                        }

                                                        {
                                                            turno.turno_estado.id===2
                                                            &&
                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button variant="contained" size='large' color='success' onClick={ () => { setActionTurno( 'Concluir' ); setOpenConfirmacion( true ); } }> 
                                                                Concluir
                                                            </Button>
                                                        </TableCell>
                                                        }
                                                        {/*  
                                                        <TableCell>
                                                            <Button onClick={reproducirAudio} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                                                🔊 Reproducir Audio
                                                            </Button>
                                                        </TableCell>
                                                        */}

                                                    </TableRow>

                                                </Table>
                                        }

                                    </TableCell>

                                </TableRow>
                            
                            </TableBody>

                        </Table>

                    </TableContainer>

                </Grid>

            </Grid>     

            <Dialog
                open={ openConfirmacion }
                onClose={ () => {} }
            >
                <DialogTitle>Confirmación</DialogTitle>

                <DialogContent sx={{ width: 300 }}>

                    <DialogContentText>
                        { actionTurno === 'Tomar' && '¿Desea tomar un nuevo turno?' }
                        { actionTurno === 'Atender' && '¿Desea iniciar atención del turno actual?' }
                        { actionTurno === 'Cancelar' && '¿Desea cancelar el turno seleccionado?' }
                        { actionTurno === 'Concluir' && '¿Desea concluir el turno seleccionado?' }
                    </DialogContentText>

                </DialogContent>

                <DialogActions>
                    <Button onClick={ () => setOpenConfirmacion( false ) }>Cancelar</Button>
                    <Button 
                        variant='contained' 
                        onClick={ 
                            () => { 
                                if( actionTurno === 'Tomar' ){
                                    handleTomarTurno()
                                }
                                else if( actionTurno === 'Cancelar' ){
                                    handleCancelarTurno()
                                }
                                else if( actionTurno === 'Atender' ){
                                    handleAtenderTurno()
                                }
                                else if( actionTurno === 'Concluir' ){
                                    handleConcluirTurno()
                                }
                            }
                        } 
                        loading={ loading }
                    >
                        Aceptar
                    </Button>
                </DialogActions>

            </Dialog>

            <Settings 
                open={ open }
                setOpen={ setOpen }            
            />
        
        </>        
        
    )
}
