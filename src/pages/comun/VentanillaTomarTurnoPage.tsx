
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { Layout } from "../../components/Layout"

import { button_blue_ligth } from "../../styles/ButtonsStyle"
import { table_padding, table_tbody, table_thead } from "../../styles/TableStyle"

export const VentanillaTomarTurnoPage = () => {  

    const navigate = useNavigate();

    const [turnos, setTurnos] = useState([{'numero': 0, 'estatus': 'En espera'}, {'numero': 1, 'estatus': 'Atendiendo'}]);

    useEffect(() => {
      const obtenerDatos = async () => {
        const res = await fetch('http://localhost:5000/api/v1/turnos', { method: 'GET', mode: 'no-cors',headers: {'Content-Type': 'application/json'}});
        {/*const data = await res.json();
        setTurnos([...turnos,data]);*/}
      }

      obtenerDatos();
      console.log(turnos);

    }, [])
     
    return (

        
        <Layout>
            
            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 12 }}>               
                
                    <Box bgcolor={'#333'} sx={{ opacity:0.6}}>
                        
                        <Typography variant="h4" color="white" textAlign={'center'} p={1}>
                            Oficialía Común de Partes
                        </Typography>
                            
                    </Box>                      

                </Grid>

                <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >
                    <Button sx={{ ...button_blue_ligth }} variant="contained" onClick={ () => navigate('/ventanilla/atender') }> 
                        Tomar Turno
                    </Button>
                        
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <TableContainer component={ Paper } variant="outlined" sx={{ borderRadius: 2 }}>

                        <Table>

                            <TableHead sx={{ ...table_thead }}>

                                <TableRow>   
                                    <TableCell sx={{ ...table_padding, ...table_thead, width: '2%', textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontSize: 18, width: '30%', textAlign: 'center' }}>Turno</TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, width: '18%', textAlign: 'center' }}>Estatus</TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {
                                turnos.map((turno, i) => (
                                    <TableRow key={i} style={{...table_tbody }}>
                                        <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>{i + 1}</TableCell>
                                        <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>{turno.numero}</TableCell>
                                        <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>{turno.estatus}</TableCell>
                                    </TableRow>
                                ))
                                }

                            </TableBody>

                        </Table>

                    </TableContainer>

                </Grid>

            </Grid>          
            
        </Layout>  
        
    )
}
