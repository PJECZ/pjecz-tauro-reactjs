
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

import { Layout } from "../../components/Layout"

import { table_cell_blue, table_cell_blue_light, table_padding, table_tbody, table_thead } from "../../styles/TableStyle"

export const PantallaUnidadPage = () => {  
     
    return (

        <Layout>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 12 }}>               

                    <Box bgcolor={'#003366'} sx={{ opacity:0.8}}>
                        
                        <Typography variant="h4" color="white" textAlign={'center'} p={1}>
                            Oficialía Común de Partes
                        </Typography>
                            
                    </Box>                      

                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>

                    <TableContainer component={ Paper } variant="outlined" sx={{ borderRadius: 2 }}>

                        <Table>

                            <TableHead sx={{ ...table_thead }}>

                                <TableRow>   
                                    <TableCell sx={{ ...table_padding, ...table_thead, ...table_cell_blue, width: '2%', textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontSize: 18, width: '30%', textAlign: 'center' }}>Turno</TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, fontSize: 18, width: '50%', textAlign: 'center' }}>Ventanilla / Recepción</TableCell>
                                    <TableCell sx={{ ...table_padding, ...table_thead, width: '18%', textAlign: 'center' }}></TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                <TableRow style={{...table_tbody }}>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>1</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>024</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>8</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>Atendiendo</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>2</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>025</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>1</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>Atendiendo</TableCell>
                                </TableRow>
                            
                                <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>3</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>026</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>3</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>Atendiendo</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>4</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>027</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>4</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>Atendiendo</TableCell>
                                </TableRow>       

                                 <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>5</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>028</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>En Espera</TableCell>
                                </TableRow>       

                                <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>6</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>029</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>En Espera</TableCell>
                                </TableRow>       

                                <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>7</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>030</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>En Espera</TableCell>
                                </TableRow>       

                                <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>8</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>031</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>En Espera</TableCell>
                                </TableRow>       

                                <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>9</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>032</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>En Espera</TableCell>
                                </TableRow>  

                                <TableRow>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>10</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>033</TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}></TableCell>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>En Espera</TableCell>
                                </TableRow>  
                            
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

                            <Box mt={2} py={10} sx={{...table_cell_blue, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                            
                                <Typography variant="h6" color="white" textAlign={'center'} sx={{ fontSize: 210 }}>024</Typography>

                            </Box>

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 2, md: 0 } }}>

                            <Box bgcolor={'#4D4D50'} sx={{ ...table_cell_blue_light, borderTopRightRadius: 5, borderBottomRightRadius: 5 }} p={1}>
                                <Typography variant="h5" textAlign={'center'} sx={{color:'#003366'}}>Ventanilla</Typography>
                            </Box>

                            <Box bgcolor={'#4D4D50'} mt={2} py={10} sx={{...table_cell_blue_light, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                                <Typography variant="h6" color="white" textAlign={'center'} sx={{ fontSize: 210, color:'#003366' }}>8</Typography>
                            </Box>

                        </Grid>

                    </Grid>

                </Grid>


            </Grid>          
            
        </Layout>  
        
    )
}
