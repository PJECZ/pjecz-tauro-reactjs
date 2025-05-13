
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from 'react';

export const NavBar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
       const interval = setInterval(() => {
           setCurrentTime(new Date());
       }, 1000); // Actualizar cada 1 segundo

       return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, []); // El segundo parámetro vacío asegura que useEffect se ejecute solo una vez al montar el componente

    const formattedTime = currentTime.toLocaleTimeString();

    return (
       
        <AppBar position="relative" style={{ boxShadow: 'none', backgroundColor: '#f5f5f5', opacity: 0.8 }}>

            <Container maxWidth="xl" sx={{ backgroundColor: '#f5f5f5', mt: 1 }}>

                <Toolbar 
                    disableGutters
                    sx={{ backgroundColor: '#f5f5f5', height: 125 }}
                >
                
                    <Box sx={{ textAlign: 'start' }}>               

                        <img 
                            style={{ width: 350, height: 100 }}
                            src={ process.env.PUBLIC_URL + "/assets/logo-pjecz-horizontal.png"}
                            alt='logo'
                        />                       
                        
                    </Box>  

                    <Box sx={{ flex: 1 }}>

                        <Box sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>

                            <img 
                                style={{ width: 240, height: 80 }}
                                src={ process.env.PUBLIC_URL + "/assets/logo.png"}
                                alt='logo'
                            />      

                        </Box>

                    </Box>                  

                    <Box sx={{ display: 'flex' }}>
                                                
                        <Typography variant="h3" color="textSecondary">
                            <img 
                                style={{ width: 50, height: 50, marginRight: 10 }}
                                src={ process.env.PUBLIC_URL + "/assets/reloj.png"}
                                alt='clock'
                            />
                            {formattedTime}
                        </Typography>

                    </Box>                  

                </Toolbar>

            </Container>

        </AppBar>
    )
}