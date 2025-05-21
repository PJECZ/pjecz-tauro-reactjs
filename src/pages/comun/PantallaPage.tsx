import { useEffect, useState } from "react"

import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

import { Layout } from "../../components/Layout"

import { table_cell_blue, table_cell_blue_light, table_padding, table_tbody, table_thead } from "../../styles/TableStyle"

import { ConsultarTodosTurnos } from "../../connections/comun/TurnosConnection"
import { TurnoProps } from "../../interfaces/comun/TurnoInterface"

export const PantallaPage = () => {  

    const [ turnosArray, setTurnosArray ] = useState<TurnoProps[]>([]) ;
    const [ ultimoTurno, setUtimoTurno ] = useState<TurnoProps>() ;
    
     useEffect(() => {
          
        async function obtener(){

            await ConsultarTodosTurnos().then( resp => {
                setUtimoTurno( resp.data.ultimo_turno );     
                setTurnosArray( resp.data.turnos );
            });
        }

        obtener();

    }, []) 

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
                                    turnosArray.slice(0,20).map( ( turno, index ) => (
                                        
                                        <TableRow key={ index } style={{...table_tbody }}>
                                            <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>{ index + 1 }</TableCell>
                                            <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>{turno.unidad['clave']}-{ String(turno.turno_numero).padStart(3,'0') }</TableCell>
                                            <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>{ turno.turno_estado === 'ATENDIENDO' ? turno.ventanilla.numero : '' }</TableCell>
                                            <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>{ turno.turno_estado }</TableCell>
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

                            <Box mt={2} py={1} sx={{ ...table_cell_blue, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                            
                                <Typography variant="h6" color="white" textAlign={'center'} sx={{ fontSize: 150 }}>{ ultimoTurno?.unidad.clave }</Typography>
                                <Typography variant="h6" color="white" textAlign={'center'} sx={{ fontSize: 150 }}>{ String(ultimoTurno?.turno_numero).padStart(3,'0') } </Typography>

                            </Box>

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 2, md: 0 } }}>

                            <Box sx={{...table_cell_blue_light, borderTopRightRadius: 5, borderBottomRightRadius: 5 }} p={1}>
                                <Typography variant="h5" textAlign={'center'} sx={{color:'#003366'}}>Ventanilla</Typography>
                            </Box>

                            <Box mt={2} py={10} sx={{...table_cell_blue_light, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                                <Typography variant="h6" textAlign={'center'} sx={{ fontSize: 210, color:'#003366' }}>{ ultimoTurno?.ventanilla.numero}</Typography>
                            </Box>

                        </Grid>

                    </Grid>

                </Grid>

            </Grid>                      
            
        </Layout>  
        
    )
}
