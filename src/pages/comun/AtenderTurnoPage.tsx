
import { useEffect, useState } from 'react';

import { useSelector } from "react-redux";

import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import { table_padding, table_tbody, table_thead } from "../../styles/TableStyle";

import { Settings } from "../../components/Settings";
import { RootState } from "../../store";

import { CancelarTurno, ConcluirTurno, TomarTurno } from "../../connections/comun/TurnosConnection";

import { TurnoProps } from '../../interfaces/comun/TurnoInterface';
import { SnackbarProps } from '../../interfaces/ui/SnackbarInterface';
import { ConsultarConfiguracionUsuario } from '../../connections/comun/UsuarioConnection';

type ActionTurno = 'Tomar' | 'Concluir' | 'Cancelar';

const defaultTurno: TurnoProps = { turno_id: 0, turno_numero: 0, turno_comentarios: '', turno_estado: '', unidad : { id: 0, clave : '', nombre : '' }, ventanilla: { id: 0, nombre : '', numero : 0 } };

export const AtenderTurnoPage = () => {  

    const { ventanilla } = useSelector( ( state: RootState ) => state.auth );

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

                    setOpenMessage({
                        type: 'warning',
                        open: true,
                        message,
                    });
    
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

                    setOpenMessage({
                        type: 'warning',
                        open: true,
                        message,
                    });

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

                    setOpenMessage({
                        type: 'warning',
                        open: true,
                        message,
                    });
                    
                }, 500);
            }

        });  
        
    }

    useEffect(() => {
    
        if( !ventanilla ){
            setOpen( true );
        }

    }, [ ventanilla ])    

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

                <Grid size={{ xs: 12, md: 12 }}>               
                
                    <Box bgcolor={'#003366'} sx={{ opacity:0.8}}>
                        
                        <Typography variant="h4" color="white" textAlign={'center'} p={1}>
                            { unidadRedux?.nombre } 
                        </Typography>
                            
                    </Box>                      

                </Grid>

                <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <Button disabled={ turno.turno_id !== 0 } size='large' variant="contained" onClick={ () => { setActionTurno( 'Tomar' ); setOpenConfirmacion( true ); } }> 
                        Tomar Turno
                    </Button>
                        
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <TableContainer component={ Paper } variant="outlined" sx={{ borderRadius: 2 }}>

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
                                                <Table sx={{ backgroundColor:'#ccc', margin:0, padding:0 }}>

                                                    <TableRow>

                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button variant="outlined" color='secondary' onClick={ () => { setActionTurno( 'Cancelar' ); setOpenConfirmacion( true ); } }> 
                                                                Cancelar
                                                            </Button>
                                                        </TableCell>

                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button variant="contained" size='large' color='success' onClick={ () => { setActionTurno( 'Concluir' ); setOpenConfirmacion( true ); } }> 
                                                                Concluir
                                                            </Button>
                                                        </TableCell>

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
