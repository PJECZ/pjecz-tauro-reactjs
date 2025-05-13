
import { useState, useEffect } from 'react';

import { useSelector } from "react-redux";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import { button_blue_ligth, button_green_small, button_yellow_small } from "../../styles/ButtonsStyle";

import { table_padding, table_tbody, table_thead } from "../../styles/TableStyle";

import { Settings } from "../../components/Settings";
import { RootState } from "../../store";

type ActionTurno = 'Tomar' | 'Concluir' | 'Cancelar';

export const AtenderTurnoPage = () => {  

    const { ventanilla } = useSelector( ( state: RootState ) => state.auth );

    const [turno, setTurno] = useState('');

    const [isDisabled, setIsDisabled] = useState(false);
    
    const [open, setOpen] = useState( false );
    const [openConfirmacion, setOpenConfirmacion] = useState( false );

    const [actionTurno, setActionTurno] = useState<ActionTurno>( 'Tomar' );

    const handleGenerarTurno = () => {
        
        const nuevoTurno = Math.floor( Math.random() * 100 ).toString().padStart(3, '0');

        setTurno(nuevoTurno);
        setIsDisabled(true);
        setOpenConfirmacion( false );
    }

    const handleCerrarModal = () => {
        
        setTurno( '' );
        setIsDisabled( false );
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
                            Oficialía Común de Partes
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

                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>

                                        { 
                                            turno !== '' 
                                            &&   
                                                <Table>

                                                    <TableRow>

                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button sx={{ ...button_green_small }} variant="contained" onClick={ () => { setActionTurno( 'Concluir' ); setOpenConfirmacion( true ); } }> 
                                                                Concluir
                                                            </Button>
                                                        </TableCell>

                                                        <TableCell sx={{textAlign: 'center'}}>
                                                            <Button sx={{ ...button_yellow_small }} variant="contained" onClick={ () => { setActionTurno( 'Cancelar' ); setOpenConfirmacion( true ); } }> 
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
                        { actionTurno === 'Tomar' && '¿Desea generar un nuevo turno?' }
                        { actionTurno === 'Cancelar' && '¿Desea cancelar el turno seleccionado?' }
                        { actionTurno === 'Concluir' && '¿Desea concluir el turno seleccionado?' }
                    </DialogContentText>

                </DialogContent>

                <DialogActions>
                    <Button onClick={ () => setOpenConfirmacion( false ) }>Cancelar</Button>
                    <Button variant='contained' onClick={ () => actionTurno === 'Tomar' ? handleGenerarTurno() : handleCerrarModal() } >
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
