
import { useState } from "react";

import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material"

const usuario_unidad = true;

export const CrearTurnoPage = () => { 
    
    const [openConfirmacion, setOpenConfirmacion] = useState( false );

    return (

        <>    

            <Grid container spacing={3}>

                {
                    usuario_unidad
                    &&
                        <Grid size={{ xs: 12, md: 12 }}>               
                        
                            <Box bgcolor={'#333'} sx={{ opacity:0.6}}>
                                
                                <Typography variant="h4" color="white" textAlign={'center'} p={1} sx={{ bgcolor: '#003366'}}>
                                    Oficialía Común de Partes
                                </Typography>
                                    
                            </Box>                      

                        </Grid>

                }

                <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <Card sx={{ width: 400, mt: 3 }}>
                
                        <CardContent>

                            {
                                !usuario_unidad
                                &&
                                    <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 3 }}>

                                        <FormControl fullWidth>

                                            <TextField 
                                                id="select-unidad" 
                                                label="Unidad" 
                                                select
                                                slotProps={{
                                                    inputLabel: {
                                                        shrink: true,
                                                    },
                                                }} 
                                                value={0}
                                            >       
                                                <MenuItem value={0}>Seleccione una opción</MenuItem>           
                                                <MenuItem value={1}>Oficialía Común de Partes</MenuItem>
                                                <MenuItem value={2}>Archivo Judicial</MenuItem>
                                            </TextField>

                                        </FormControl>   

                                    </Grid>
                            }                            

                            <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 3 }}> 

                                <FormControl fullWidth>

                                    <TextField 
                                        id="select-tipo-turno" 
                                        label="Tipo de turno" 
                                        select
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }} 
                                        value={0}
                                    >
                                        <MenuItem value={0}>Seleccione una opción</MenuItem>  
                                        <MenuItem value={1}>Normal</MenuItem>
                                        <MenuItem value={2}>Urgente</MenuItem>
                                        <MenuItem value={3}>Cita</MenuItem>
                                    </TextField>
                                  
                                </FormControl>   

                            </Grid>

                            <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 3 }}>

                                <FormControl fullWidth>

                                    <TextField
                                        fullWidth
                                        label="Observaciones"
                                        name="observaciones"
                                        variant="outlined"        
                                        multiline
                                        rows={4}                 
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}                           
                                    />

                                </FormControl>   

                            </Grid>

                        </CardContent>              

                        <CardActions sx={{ opacity: 0.6, p: 3 }}>                  

                            <Button fullWidth variant="contained" onClick={ () => setOpenConfirmacion( true ) }> 
                                Crear Turno
                            </Button>   
                                                    
                        </CardActions>

                    </Card>
                        
                </Grid>

            </Grid>   
            
            <Dialog
                open={ openConfirmacion }
                onClose={ () => {} }
            >
                <DialogTitle>Confirmación</DialogTitle>

                <DialogContent sx={{ width: 300 }}>

                    <DialogContentText>
                       ¿Desea crear un nuevo turno?
                    </DialogContentText>

                </DialogContent>

                <DialogActions>
                    <Button onClick={ () => setOpenConfirmacion( false ) }>Cancelar</Button>
                    <Button variant='contained' onClick={ () => setOpenConfirmacion( false ) } >
                        Aceptar
                    </Button>
                </DialogActions>

            </Dialog>        
        
        </>
    )
}
