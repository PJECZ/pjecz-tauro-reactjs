
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import { useEffect, useState } from 'react';

export const NavBar = () => {


    const [currentTime, setCurrentTime] = useState( new Date() );

    useEffect(() => {

       const interval = setInterval(() => {

            setCurrentTime( new Date() );

       }, 1000);
       
       return () => clearInterval(interval); 

    }, []); 

    return (
       
        <AppBar position="relative" sx={{  backgroundColor: '#f5f5f5', opacity: 0.8 , boxShadow:'10px 10px 31px #000000', mb:3}}>

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
                                src={ process.env.PUBLIC_URL + "/assets/logo_colors.png"}
                                alt='logo'
                            />      

                        </Box>

                    </Box>                  

                    <Box sx={{ display: 'flex' }}>
                                                
                        <Typography variant="h3" color="textSecondary">

                            <img 
                                style={{ width: 40, height: 40, marginRight: 10, marginTop: 5 }}
                                src={ process.env.PUBLIC_URL + "/assets/reloj.png"}
                                alt='clock'
                            />

                            { currentTime.toLocaleTimeString() }

                        </Typography>
                        

                    </Box>                  

                </Toolbar>

            </Container>

        </AppBar>
    )
}