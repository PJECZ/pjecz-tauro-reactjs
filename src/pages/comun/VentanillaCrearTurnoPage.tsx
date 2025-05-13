
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import React from "react"
import { useNavigate } from "react-router"

import { Layout } from "../../components/Layout"

import { button_blue_ligth_small } from "../../styles/ButtonsStyle"


export const VentanillaCrearTurnoPage = () => { 
    
    const navigate = useNavigate();

    const [ventanilla, setVentanilla] = React.useState('0');
    
    const handleChange = (event: SelectChangeEvent) => {
        setVentanilla(event.target.value);
    };

    return (

        <Layout>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 12 }}>               
                
                    <Box bgcolor={'#333'} sx={{ opacity:0.6}}>
                        
                        <Typography variant="h4" color="white" textAlign={'center'} p={1} sx={{backgroundColor: '#003366'}}>
                            Oficialía Común de Partes
                        </Typography>
                            
                    </Box>                      

                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <Card sx={{ width:400, maxWidth: 445 }}>
                        <CardActionArea>
                            <CardContent>

                                <Grid size={{ xs: 12, md: 12 }} sx={{marginTop:4}}> 
                                        <Typography id="tipo-de-turno" sx={{ mt: 2 }}>
                                            Tipo de turno
                                            <Select sx={{ width: '100%', height: 40, margin: 'auto', display: 'flex', justifyContent: 'left' }}
                                                labelId="select-tipo-label"
                                                id="select-tipo-turno"
                                                label="Tipo de Turno"
                                            >
                                                <MenuItem value={1}>Normal</MenuItem>
                                                <MenuItem value={2}>Urgente</MenuItem>
                                                <MenuItem value={3}>Cita</MenuItem>
                                            </Select>
                                        </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }} sx={{marginTop:4}}>
                                        <Typography id="unidad" sx={{ mt: 2 }}>
                                            Observaciones
                                            <TextField
                                                id="observaciones"
                                                multiline
                                                rows={2}
                                                variant="outlined"
                                                sx={{ width: '100%', height: 40, margin: 'auto', display: 'flex', justifyContent: 'left' }} 
                                            />
                                        </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }} sx={{marginTop:8}}>
                                        <Typography id="unidad" >
                                            Unidad
                                            <Select sx={{ width: '100%', height: 40, margin: 'auto', display: 'flex', justifyContent: 'left' }}
                                                labelId="select-ventanilla-label"
                                                id="select-unidad"
                                                label="Unidad"
                                            >
                                                <MenuItem value={1}>Oficialía Común de Partes</MenuItem>
                                                <MenuItem value={2}>Archivo Judicial</MenuItem>
                                            </Select>
                                        </Typography>
                                </Grid>


                            </CardContent>

                        </CardActionArea>
                        <CardActions sx={{backgroundColor: '#efeff1', opacity:0.6}}>
                            <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                                <Button sx={{ ...button_blue_ligth_small }} variant="contained" onClick={ () => {} }> 
                                    Crear Turno
                                </Button>   
                            </Grid>
                            
                        </CardActions>
                        </Card>
                        
                </Grid>

            </Grid>          
            
        </Layout>  
        
    )
}
