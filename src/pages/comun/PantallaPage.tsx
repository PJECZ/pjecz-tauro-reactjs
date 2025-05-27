import { useEffect, useState } from "react";

import WifiIcon from '@mui/icons-material/Wifi';
import { AppBar, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";

import { Layout } from "../../components/Layout";

import { table_cell_blue, table_cell_blue_light, table_padding, table_tbody, table_thead } from "../../styles/TableStyle";

import { ConsultarTodosTurnos } from "../../connections/comun/TurnosConnection";

import { useSocket } from "../../hooks/useSocket";
import { SocketTurnoResponse, TurnoProps } from "../../interfaces/comun/TurnoInterface";

const defaultTurno: TurnoProps = { turno_id: 0, turno_numero: 0, turno_comentarios: '', turno_estado: '', unidad : { id: 0, clave : '', nombre : '' }, ventanilla: { id: 0, nombre : '', numero : 0 } };

const audio = new Audio('/assets/sounds/siguiente2.mp4');

export const PantallaPage = () => {  

    const [ turnosArray, setTurnosArray ] = useState<TurnoProps[]>([]) ;
    const [ ultimoTurno, setUtimoTurno ] = useState<TurnoProps>( defaultTurno );
    const [ loadFetch, setLoadFetch ] = useState( true );

    const { socket, online } = useSocket();

    useEffect( () => {

        socket.on('message', ( socketMessage: SocketTurnoResponse ) => {
           
            const turno = socketMessage.data;

            if( turno.turno_id !== 0 ){

                if( turno.turno_estado === 'EN ESPERA' ){
                    setTurnosArray( ( arrays ) => [ ...arrays, turno ]);
                }
                else if( turno.turno_estado === 'ATENDIENDO' ){

                    setTurnosArray( ( arrays ) => arrays.map( ( elem ) => {
                        if( elem.turno_id === turno.turno_id){
                            elem = { ...turno };
                        }
                        return elem;
                    }));

                    setUtimoTurno( turno );
                    audio.play();

                }
                else if( turno.turno_estado === 'COMPLETADO' || turno.turno_estado === 'CANCELADO' ){
                    setLoadFetch( true );
                }
            }

        })

        return () => { 
            socket.off('message'); 
        }

    }, [ socket ])
    
    useEffect(() => {
          
        async function obtener(){

            await ConsultarTodosTurnos().then( resp => {

                const { data } = resp;        

                if( data ){
                    
                    const { ultimo_turno, turnos } = data;

                    setUtimoTurno( ultimo_turno ?? defaultTurno );     
                    setTurnosArray( turnos );
                    setLoadFetch( false );
                }
                else {
                    setUtimoTurno( defaultTurno );     
                    setTurnosArray( [] );
                    setLoadFetch( false );
                }


            });
        }

        if( loadFetch ){
            obtener();
        }

    }, [ loadFetch ])     

    return (

        <Layout>
      
            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 5 }}>

                    <TableContainer component={ Paper } variant="outlined" sx={{ borderRadius: 2 }}>

                        <Table>

                            <TableHead sx={{ ...table_thead }}>

                                <TableRow>   
                                    <TableCell sx={{ ...table_padding, ...table_thead, width: '2%', textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontSize: 18, width: '30%', textAlign: 'center' }}>Turno</TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontSize: 18, width: '50%', textAlign: 'center' }}>Ventanilla / Recepción</TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontsize:18,  width: '18%', textAlign: 'center' }}>Estado</TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {
                                    turnosArray
                                    .slice(0, 20)
                                    .map( ( turno, index ) => (
                                        
                                        <TableRow key={ index } style={{...table_tbody }}>
                                            <TableCell sx={{ ...table_padding, fontSize: 22, textAlign: 'center', fontWeight: 'bold' }}>{ index + 1 }</TableCell>
                                            <TableCell sx={{ ...table_padding, fontSize: 22, textAlign: 'center' }}>{turno.unidad.clave}-{ String(turno.turno_numero).padStart(3,'0') }</TableCell>
                                            <TableCell sx={{ ...table_padding, fontSize: 22, textAlign: 'center' }}>{ turno.turno_estado === 'ATENDIENDO' ? turno.ventanilla.numero : '' }</TableCell>
                                            <TableCell sx={{ ...table_padding, fontSize: 22, textAlign: 'center' }}>{ turno.turno_estado }</TableCell>
                                        </TableRow>
                                        
                                    ))
                                }

                            </TableBody>

                        </Table>

                    </TableContainer>

                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>

                    <Grid container>

                        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 2, md: 0 } }}>

                            <Box sx={{ ...table_cell_blue, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} p={1}>
                                <Typography variant="h5" color="white" textAlign={'center'}>Turno</Typography>
                            </Box>

                            <Box mt={2} py={10} sx={{ ...table_cell_blue, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, height: '70%' }}>
                            
                                <Typography variant="h6" color="white" textAlign={'center'} sx={{ fontSize: 210 }}>{ ultimoTurno?.unidad.clave }</Typography>
                                <Typography variant="h6" color="white" textAlign={'center'} sx={{ fontSize: 210 }}>{ ultimoTurno.turno_numero > 0 && String(ultimoTurno?.turno_numero).padStart(3,'0') } </Typography>

                            </Box>

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 2, md: 0 } }}>

                            <Box sx={{...table_cell_blue_light, borderTopRightRadius: 5, borderBottomRightRadius: 5 }} p={1}>
                                <Typography variant="h5" textAlign={'center'} sx={{color:'#003366'}}>Ventanilla</Typography>
                            </Box>

                            <Box mt={2} py={10} sx={{...table_cell_blue_light, borderTopRightRadius: 5, borderBottomRightRadius: 5, height:'70%' }}>
                                <Typography variant="h6" textAlign={'center'} sx={{ fontSize: 210, color:'#003366' }}>{ ultimoTurno?.ventanilla.numero !== 0 && ultimoTurno?.ventanilla.numero}</Typography>
                            </Box>

                        </Grid>

                    </Grid>

                </Grid>

            </Grid>                      
            
            <AppBar position="fixed" color="primary" sx={{borderTop:'1px solid #999', top: 'auto', bottom: 0, boxShadow: 'none', backgroundColor: '#f5f5f5', opacity: 0.8, height: 65 }}>
                <Toolbar>    
                    
                    <Box sx={{  display: 'flex', alignItems: 'end'}}>

                        { 
                        online ? 
                            <List sx={{ listStyleType: 'disc' }}>
                                <ListItem sx={{fontSize:'.75em', color:'#555'}}>
                                    <ListItemIcon>
                                        <WifiIcon sx={{ color: 'green' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Conectado al servidor" />
                                </ListItem>
                            </List>
                        :
                            <List sx={{ listStyleType: 'disc' }}>
                                <ListItem sx={{fontSize:'.75em', color:'#555'}}>
                                    <ListItemIcon>
                                        <WifiIcon sx={{ color: 'red' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Desconectado" />
                                </ListItem>
                            </List>
                        }                    

                    </Box>

                </Toolbar>

            </AppBar>  
        </Layout>  
        
    )
}
