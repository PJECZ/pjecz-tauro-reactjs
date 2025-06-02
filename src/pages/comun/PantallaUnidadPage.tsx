import { useEffect, useState } from "react";

import WifiIcon from '@mui/icons-material/Wifi';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { AppBar, Box, Grid, Grow, List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";

import { Layout } from "../../components/Layout";

import { useParams } from "react-router";
import { table_cell_blue, table_cell_blue_light, table_padding, table_tbody, table_thead } from "../../styles/TableStyle";

import { ConsultarTurnosUnidad } from "../../connections/comun/TurnosConnection";
import { useSocket } from "../../hooks/useSocket";
import { SocketTurnoResponse, TurnoProps } from "../../interfaces/comun/TurnoInterface";
import { UnidadProps } from "../../interfaces/comun/UnidadInterface";

const defaultTurno: TurnoProps = { turno_id: 0, turno_numero: 0, turno_comentarios: '', turno_estado: '', turno_tipo_id:0, unidad : { id: 0, clave : '', nombre : '' }, ventanilla: { id: 0, nombre : '', numero : 0 } };
const defaultUnidad: UnidadProps = { id: 0, clave : '', nombre : '' };

const audio = new Audio('/assets/sounds/siguiente2.mp3');

export const PantallaUnidadPage = () => {  

    const { id } = useParams();

    const [ turnosArray, setTurnosArray ] = useState<TurnoProps[]>([]) ;
    const [ ultimoTurno, setUtimoTurno ] = useState<TurnoProps>( defaultTurno ) ;
    const [ unidad, setUnidad ] = useState<UnidadProps>( defaultUnidad ) ;
    const [ loadFetch, setLoadFetch ] = useState( true );

    const { socket, online } = useSocket();    

    useEffect( () => {

        socket.on('message', ( socketMessage: SocketTurnoResponse ) => {
            
            const turno = socketMessage.data;

            if( turno.turno_id !== 0 && turno.unidad.id === parseInt( id ?? '0' ) ){

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

    }, [ socket, id ])

    useEffect(() => {
            
        async function obtener(){

            await ConsultarTurnosUnidad( id ?? '' ).then(resp => {

                if( resp.data ){

                    const { ultimo_turno, turnos, unidad } = resp.data;

                    setUtimoTurno( ultimo_turno ?? defaultTurno );  
                    setUnidad( unidad ?? defaultUnidad );    
                    setTurnosArray( turnos ?? [] );
                    setLoadFetch( false );
                }
                else {
                    setUtimoTurno( defaultTurno );          
                    setTurnosArray( [] );
                    setLoadFetch( false );
                }                

            });
        }

        if( loadFetch && id ){
            obtener();
        }

    }, [ loadFetch, id ]) 
     
    return (

        <Layout>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 12 }}>               

                    <Box bgcolor={'#003366'} sx={{ opacity:0.8}}>
                        
                        <Typography variant="h4" color="white" textAlign={'center'} p={1}>
                            {unidad?.nombre}
                        </Typography>
                            
                    </Box>                      

                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>

                    <TableContainer component={ Paper } variant="outlined" sx={{ borderRadius: 2 }}>

                        <Table>

                            <TableHead sx={{ ...table_thead }}>

                                <TableRow>   
                                    <TableCell sx={{ ...table_padding, ...table_thead, width: '2%', textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontSize: 18, width: '28%', textAlign: 'center' }}>Turno</TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontSize: 18, width: '20%', textAlign: 'center' }}>Ventanilla/Recepción</TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontsize: 18,  width: '50%', textAlign: 'center' }}></TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {
                                    turnosArray
                                    .slice(0, 20)
                                    .map( ( { unidad, turno_numero, turno_estado, ventanilla, turno_tipo_id }, index ) => (
                                                                            
                                        <TableRow key={ index } style={{...table_tbody }}>

                                            <Grow 
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...( { timeout: 1000 } )}
                                            > 
                                            
                                                <TableCell sx={{ ...table_padding, fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>
                                                    {turno_tipo_id===2 ? <CalendarMonthIcon sx={{ color: '#003366', fontSize: 30 }} /> : turno_tipo_id===3 ? <AccessibleIcon sx={{ color: '#449ede', fontSize: 30 }} /> : ''}
                                                </TableCell> 
                                            </Grow>
                                            
                                            <Grow 
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...( { timeout: 1000 } )}
                                            > 
                                                <TableCell sx={{ ...table_padding, fontSize: 22, textAlign: 'center' }}>{ unidad.clave }-{ String( turno_numero ).padStart(3,'0') }</TableCell>
                                            </Grow>

                                            <Grow 
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...( { timeout: 1000 } )}
                                            > 
                                                <TableCell sx={{ ...table_padding, fontSize: 22, textAlign: 'center' }}>{ turno_estado === 'ATENDIENDO' ? ventanilla.numero : '' }</TableCell> 
                                            </Grow>

                                            <Grow 
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...( { timeout: 1000 } )}
                                            > 
                                                <TableCell sx={{ ...table_padding, fontSize: 22, textAlign: 'center' }}>{ turno_estado }</TableCell> 
                                            </Grow>

                                        </TableRow>
                                        
                                    ))
                                }
                            
                            </TableBody>

                        </Table>

                    </TableContainer>

                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>

                    <Grid container>

                        <Grid size={{ xs: 12, md: 6 }} sx={{ }}>

                            <Box sx={{ ...table_cell_blue, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} p={1}>
                                <Typography variant="h5" color="white" textAlign={'center'}>Turno</Typography>
                            </Box>

                            <Box mt={2} py={10} sx={{...table_cell_blue, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, height: '70%' }}>
                            
                                <Typography variant="h6" color="white" textAlign={'center'} sx={{ fontSize: 210 }}>{ ultimoTurno.turno_numero>0 && String(ultimoTurno?.turno_numero).padStart(3,'0') }</Typography>

                            </Box>

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 2, md: 0 } }}>

                            <Box bgcolor={'#4D4D50'} sx={{ ...table_cell_blue_light, borderTopRightRadius: 5, borderBottomRightRadius: 5 }} p={1}>
                                <Typography variant="h5" textAlign={'center'} sx={{color:'#003366'}}>Ventanilla</Typography>
                            </Box>

                            <Box bgcolor={'#4D4D50'} mt={2} py={10} sx={{...table_cell_blue_light, borderTopRightRadius: 5, borderBottomRightRadius: 5, height: '70%' }}>
                                <Typography variant="h6" color="white" textAlign={'center'} sx={{ fontSize: 210, color:'#003366' }}>{ ultimoTurno.ventanilla.numero !== 0 && ultimoTurno?.ventanilla.numero}</Typography>
                            </Box>

                        </Grid>

                    </Grid>

                </Grid>


            </Grid> 

            <AppBar position="fixed" color="primary" sx={{borderTop:'1px solid #999', top: 'auto', bottom: 0, boxShadow: 'none', backgroundColor: '#f5f5f5', opacity: 0.8, height: 65 }}>
                <Toolbar>    
                    
                    <Box sx={{ marginLeft:'auto' }}>

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
