import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, MenuItem, Select, Typography } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import React from "react"
import { useNavigate } from "react-router"

import { Layout } from "../../components/Layout"

import { button_blue_ligth_small } from "../../styles/ButtonsStyle"


export const VentanillaSeleccionarPage = () => { 
    
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
                        
                        <Typography variant="h4" color="white" textAlign={'center'} p={1}>
                            Oficialía Común de Partes
                        </Typography>
                            
                    </Box>                      

                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <Card sx={{ maxWidth: 445 }}>
                        <CardActionArea>
                            <CardContent sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Seleccionar Ventanilla 
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Selecciona la ventanilla que deseas atender, para continuar con el proceso de atención al usuario.
                                </Typography>

                                <Grid size={{ xs: 12, md: 12 }} > 
                                    <Box>
                                        <Select sx={{ width: 100, height: 40, margin: 'auto', display: 'flex', justifyContent: 'center' }}
                                            labelId="select-ventanilla-label"
                                            id="select-ventanilla"
                                            value={ventanilla}
                                            label="Ventanilla"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                        </Select>
                                    </Box>
                                </Grid>
                            </CardContent>

                        </CardActionArea>
                        <CardActions sx={{backgroundColor: '#efeff1', opacity:0.6}}>
                            <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                                <Button sx={{ ...button_blue_ligth_small }} variant="contained" onClick={ () => navigate('/ventanilla/tomar') }> 
                                    Seleccionar
                                </Button>   
                            </Grid>
                            
                        </CardActions>
                        </Card>
                        
                </Grid>

            </Grid>          
            
        </Layout>  
        
    )
}
