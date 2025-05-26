
import { useEffect, useState } from 'react';

import { useSelector } from "react-redux";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import { button_blue_ligth, button_green_small, button_yellow_small } from "../../styles/ButtonsStyle";

import { table_padding, table_tbody, table_thead } from "../../styles/TableStyle";

import { Settings } from "../../components/Settings";
import { RootState } from "../../store";

import { CancelarTurno, ConcluirTurno, TomarTurno } from "../../connections/comun/TurnosConnection";

type ActionTurno = 'Tomar' | 'Concluir' | 'Cancelar';

export const AtenderTurnoPage = () => {  

    const { ventanilla } = useSelector( ( state: RootState ) => state.auth );

    const [turno, setTurno] = useState('');
    const [turnoEstado, setTurnoEstado] = useState(0);
    const [idTurno, setIdTurno] = useState(0);

    const [isDisabled, setIsDisabled] = useState(false);
    
    const [open, setOpen] = useState( false );
    const [openConfirmacion, setOpenConfirmacion] = useState( false );

    const [actionTurno, setActionTurno] = useState<ActionTurno>( 'Tomar' );

    const { unidad: unidadRedux } = useSelector( ( state: RootState ) => state.auth );

    const handleTomarTurno = () => {
        
        async function obtenerTurno(){

            await TomarTurno(  ).then(resp => {
            
                        if( resp.data ){
            
                            const { turno_numero, turno_id } = resp.data;
                            console.log("respuesta: ",resp.data)
                            setTurno( String(turno_numero ?? '') );  
                            setIdTurno( turno_id ?? 0);  
                            setIsDisabled(true);
                        }
            
                    });
                }
        obtenerTurno();        
        
        setOpenConfirmacion( false );
    }

    const handleCancelarTurno = () => {
        
        async function cancelarTurno(){

            await CancelarTurno( {
                "turno_id": idTurno,
                "turno_estado_id": turnoEstado,
              } ).then(resp => {
            
                        if( resp.data ){
                            
                            console.log("respuesta: ",resp.data)
                            setTurno( '' );  
                            setIdTurno( 0 );  
                        }
            
                    });
                }
        cancelarTurno();        
        setIsDisabled(false);
        setOpenConfirmacion( false );
    }

    const handleConcluirTurno = () => {
        
        async function concluirTurno(){

            await ConcluirTurno( {
                "turno_id": idTurno,
                "turno_estado_id": turnoEstado,
              } ).then(resp => {
            
                        if( resp.data ){
                            
                            console.log("respuesta: ",resp.data)
                            setTurno( '' );  
                            setIdTurno( 0 );  
                        }
            
                    });
                }
        concluirTurno();        
        setIsDisabled(false);
        setOpenConfirmacion( false );
    }

    const handleCerrarModal = () => {
        setTurno( '' );
        setOpenConfirmacion( false );
    }

    useEffect(() => {
    
        if( !ventanilla ){
            setOpen( true );
        }

    }, [ ventanilla ])    

    return (

        <>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 12 }}>               
                
                    <Box bgcolor={'#003366'} sx={{ opacity:0.6}}>
                        
                        <Typography variant="h4" color="white" textAlign={'center'} p={1}>
                            { unidadRedux?.nombre } 
                        </Typography>
                            
                    </Box>                      

                </Grid>

                <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <Button disabled={ isDisabled } sx={{ ...button_blue_ligth, opacity:.8 }} variant="contained" onClick={ () => { setActionTurno( 'Tomar' ); setOpenConfirmacion( true ); } }> 
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
                                        { turno }
                                    </TableCell>

                                </TableRow>

                                <TableRow style={{...table_tbody }}>

                                    <TableCell sx={{padding:0,  fontSize: 18, textAlign: 'center' }}>

                                        { 
                                            turno !== '' 
                                            &&   
                                                <Table sx={{ backgroundColor:'#ccc', margin:0, padding:0 }}>

                                                    <TableRow>

                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button sx={{ ...button_green_small }} variant="contained" onClick={ () => { setTurnoEstado(3); setActionTurno( 'Concluir' ); setOpenConfirmacion( true ); } }> 
                                                                Concluir
                                                            </Button>
                                                        </TableCell>

                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button sx={{ ...button_yellow_small }} variant="contained" onClick={ () => { setTurnoEstado(4); setActionTurno( 'Cancelar' ); setOpenConfirmacion( true ); } }> 
                                                                Cancelar
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
                    <Button variant='contained' onClick={ 
                        () => { 
                            actionTurno === 'Tomar' ? handleTomarTurno() : handleCerrarModal() 
                            actionTurno === 'Cancelar' ? handleCancelarTurno() : handleCerrarModal()
                            actionTurno === 'Concluir' ? handleConcluirTurno() : handleCerrarModal()
                        }
                        } >
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
