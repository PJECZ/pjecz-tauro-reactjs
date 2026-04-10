import { useEffect, useState } from "react";

import { useParams } from "react-router";

import { Box, Grid, Grow, List, ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import AccessibleIcon from '@mui/icons-material/Accessible';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WifiIcon from '@mui/icons-material/Wifi';

import { useSocket } from "../../hooks/useSocket";

import { content_table, table_cell_blue, table_padding, table_tbody, table_thead_unidad } from "../../styles/TableStyle";

import { ConsultarTurnosUnidad } from "../../connections/comun/TurnosConnection";

import { SocketTurnoResponse, TurnoProps } from "../../interfaces/comun/TurnoInterface";
import { UnidadProps } from "../../interfaces/comun/UnidadInterface";

const defaultTurno: TurnoProps = { turno_id: 0, turno_numero: 0, turno_comentarios: '', turno_numero_cubiculo: 0, turno_estado: {id:0, nombre:''}, turno_tipo: {id:0, nombre:'', nivel:''}, unidad : { id: 0, clave : '', nombre : '' }, ubicacion: { id: 0, nombre : '', numero : 0 } };
const defaultUnidad: UnidadProps = { id: 0, clave : '', nombre : '' };

const audio = new Audio('/assets/sounds/siguiente2.mp3');

export const PantallaOCP = () => {  

    //const { id } = useParams();
    const [id, setId] = useState('2') ;

    const [ turnosArray, setTurnosArray ] = useState<TurnoProps[]>([]) ;
    const [ ultimoTurno, setUtimoTurno ] = useState<TurnoProps>( defaultTurno ) ;
    const [ unidad, setUnidad ] = useState<UnidadProps>( defaultUnidad ) ;
    const [ loadFetch, setLoadFetch ] = useState( true );

    const { socket, online } = useSocket();    

    const [fecha, setFecha] = useState(new Date());

    useEffect( () => {

        socket.on('message', ( socketMessage: SocketTurnoResponse ) => {
            
            const turno = socketMessage.data;

            if( turno.turno_id !== 0 && turno.unidad.id === parseInt( id ?? '0' ) ){
                setFecha( new Date() );
                if( turno.turno_estado.id === 1 ){ /* 1 'EN ESPERA' */
                    /*setTurnosArray( ( arrays ) => [ ...arrays, turno ]);*/
                    setLoadFetch( true );
                }
                else if( turno.turno_estado.id === 2 || turno.turno_estado.id === 6  ){/* 2 'ATENDIENDO' , 6 'ATENDIENDO EN CUBICULO'*/

                    setTurnosArray( ( arrays ) => arrays.map( ( elem ) => {
                        if( elem.turno_id === turno.turno_id){
                            elem = { ...turno };
                        }
                        return elem;
                    }));

                    setUtimoTurno( turno );
                    audio.play();
                }
                else if( turno.turno_estado.id === 3 || turno.turno_estado.id === 4 ){/* 3 'COMPLETADO' , 4 'CANCELADO'  */ 
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

        <Box className="pantalla">

            {/* Barra superior con descripcion de la unidad */}
            <Grid size={{ xs: 12, md: 12 }} sx={{ ...content_table}} style={{ padding:8}}>               

                <Box sx={{ opacity:0.8}}>
                    
                    <Typography variant="h5" color="white" textAlign={'center'} p={0}>
                        {unidad?.nombre}
                    </Typography>
                        
                </Box>                      

            </Grid>

            {/* Espacio de lista de turnos y turno actual */}
            <Grid container spacing={3} sx={{...content_table}} style={{minHeight:'80vh'}}>
                
                {/* Espacio de Lista de Turnos */}
                <Grid size={{ xs: 12, md: 8 }}>

                    <TableContainer sx={{ borderRadius: 5, backgroundColor: 'transparent', boxShadow:'none !important'  }}>

                        <Table>

                            <TableHead sx={{ backgroundColor: 'transparent' }}>

                                <TableRow>   
                                    <TableCell sx={{  ...table_thead_unidad, width: '2%', textAlign: 'center',paddingBottom:'15px' }} style={{fontSize:'20px'}}></TableCell>
                                    <TableCell sx={{  ...table_thead_unidad, width: '30%', textAlign: 'center',paddingBottom:'15px' }} style={{fontSize:'20px'}}>Turno</TableCell>
                                    <TableCell sx={{  ...table_thead_unidad, width: '20%', textAlign: 'center',paddingBottom:'15px' }} style={{fontSize:'20px'}}>Ubicación</TableCell>
                                    <TableCell sx={{  ...table_thead_unidad, width: '50%', textAlign: 'center',paddingBottom:'15px' }} style={{fontSize:'20px'}}></TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {
                                    turnosArray
                                    .slice(0, 15)
                                    .map( ( { unidad, turno_numero, turno_estado, ubicacion, turno_tipo , turno_numero_cubiculo}, index ) => (
                                                                            
                                        <TableRow key={ index } 
                                                    sx={{...table_tbody }} 
                                                    style={ (index % 2 === 0) ? { backgroundColor: 'rgba(35, 77, 123, 0.4)' } : { backgroundColor: '#234d7b' } }>

                                            <Grow 
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...( { timeout: 1000 } )}
                                            > 
                                            
                                                <TableCell sx={{ ...table_padding }}>
                                                    {turno_tipo.id===2 ? <CalendarMonthIcon sx={{ color: '#fff', fontSize: 30 }} /> : turno_tipo.id===3 ? <AccessibleIcon sx={{ color: '#fff', fontSize: 30 }} /> : ''}
                                                </TableCell> 
                                            </Grow>
                                            
                                            <Grow 
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...( { timeout: 1000 } )}
                                            > 
                                                <TableCell sx={{ ...table_padding, fontSize: 20, textAlign: 'center',color:'#fff', }}>{ unidad.clave }-{ String( turno_numero ).padStart(3,'0') }</TableCell>
                                            </Grow>

                                            <Grow 
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...( { timeout: 1000 } )}
                                            > 
                                                <TableCell sx={{ ...table_padding,  textAlign: 'center',color:'#fff' }}> 
                                                    <Typography sx={{ fontSize:20}}> 
                                                        { turno_estado.nombre === 'ATENDIENDO' ?  'Ventanilla' : '' }
                                                        { turno_estado.nombre === 'ATENDIENDO EN CUBICULO' ? 'Cubículo' : '' }
                                                        &nbsp;
                                                        { turno_estado.nombre === 'ATENDIENDO' ? ubicacion.numero : '' }
                                                        { turno_estado.nombre === 'ATENDIENDO EN CUBICULO' ? turno_numero_cubiculo : '' }
                                                    </Typography>
                                                </TableCell> 
                                            </Grow>

                                            <Grow 
                                                in
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...( { timeout: 1000 } )}
                                            > 
                                                <TableCell 
                                                    sx={{ ...table_padding, textAlign: 'center',color:'#fff',  paddingY:0 }} 
                                                    style={{ color: (turno_estado.id===2 || turno_estado.id===6) ? '#b9dcff' : 'white', fontSize: (turno_estado.id===2 || turno_estado.id===6) ? '25px' : '15px'  }}>
                                                        { turno_estado.nombre }
                                                </TableCell> 
                                            </Grow>

                                        </TableRow>
                                        
                                    ))
                                }
                            
                            </TableBody>

                        </Table>

                    </TableContainer>

                </Grid>

                {/* Espacio de Turno Actual */}
                <Grid size={{ xs: 12, md: 4 }} style={{ paddingLeft:'80px'}}>

                    <Grid container>
                        <Grid size={{ xs: 12, md: 12 }} sx={{ mt: { xs: 2, md: 0 } }} style={{textAlign:'right'}}>
                            <Typography style={{fontFamily: 'Arial', fontSize: 15, color: '#fff',paddingRight:'20px'}}><CalendarMonthIcon sx={{ color: '#fff', fontSize: 30 }} />
                                &nbsp;{fecha.toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() + fecha.toLocaleDateString('es-ES', { weekday: 'long' }).slice(1)}, {fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}       
                            </Typography>
                            <Box style={{textAlign:'right', padding:'0px'}}>

                                { 
                                    online 
                                    ? 
                                        <List sx={{ listStyleType: 'disc' }} style={{padding:'0px'}}>
                                            <ListItem sx={{fontSize:'.75em', color:'#fff'}} style={{textAlign:'right', padding:'0px'}}>
                                                <ListItemText primary="En línea" style={{paddingRight:'5px'}} /> 
                                                <ListItemIcon>
                                                    <WifiIcon sx={{ color: '#91f36a' }} />
                                                </ListItemIcon>
                                            </ListItem>
                                        </List>
                                    :
                                        <List sx={{ listStyleType: 'disc' }} style={{padding:'0px'}}>
                                            <ListItem sx={{fontSize:'.75em', color:'#fff'}} style={{textAlign:'right', padding:'0px'}}>
                                                <ListItemText primary="Desconectado"  style={{paddingRight:'5px'}}/>
                                                <ListItemIcon>
                                                    <WifiIcon sx={{ color: 'red' }} />
                                                </ListItemIcon>
                                            </ListItem>
                                        </List>
                                }                    

                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container sx={{ mt: 1 }}>
                       <Grid size={{ xs: 12, md: 11 }} sx={{ mt: { xs: 2, md: 0 } }} >

                            <Box mt={1} py={4} sx={{ ...table_cell_blue, padding:5 }} style={{paddingTop:'5px', paddingBottom:'5px'}}>
                                <Typography style={{fontSize:30, fontWeight:'lighter'}}>Turno</Typography>
                                <Typography sx={{ fontSize: '3rem', lineHeight:.9, textAlign:'center' }}>{ ultimoTurno?.unidad.clave }</Typography>
                                <Typography sx={{ fontSize: 100, lineHeight: 0.9, textAlign:'center' }}>{ ultimoTurno.turno_numero>0 && String(ultimoTurno?.turno_numero).padStart(3,'0') }</Typography>

                                <hr style={{ marginTop:'10px', marginBottom:'10px',borderColor: '#7fbeeb', borderStyle: 'solid', borderWidth: '0.5px 0 0 0' }} />
                                
                                <Typography sx={{ fontSize:30, color:'#fff', fontWeight:'lighter'}}>{ ultimoTurno?.turno_estado.nombre === 'ATENDIENDO EN CUBICULO' ? 'Cubículo' : 'Ventanilla' }</Typography>
                                <Typography sx={{ fontSize: 150, lineHeight: 0.8, color:'#fff' }}>
                                    {ultimoTurno?.turno_numero_cubiculo > 0 
                                        ? ultimoTurno?.turno_numero_cubiculo
                                        : ultimoTurno?.ubicacion.numero !== 0 && ultimoTurno?.ubicacion.numero
                                    }    
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>

                </Grid>

            </Grid> 
            
        </Box>  
        
    )
}
