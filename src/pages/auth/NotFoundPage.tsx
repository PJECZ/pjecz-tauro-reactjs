
import { Link } from 'react-router';

import { Box, Button, Divider, Container, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { NavBar } from '../../components/NavBar';

export const NotFoundPage = () => {

    return (
        <>
            <NavBar />

            <Box sx={{ mt: 35 }} >
            
                <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
                    <Typography variant="h4" component="h1" gutterBottom>
                        LO SENTIMOS, ESTA PÁGINA NO ESTÁ DISPONIBLE
                    </Typography>

                    <Divider />
                </Container>   

                <Container component="main" sx={{ mt: 2 }} maxWidth="md">
                    <Typography variant="h6">
                        Es posible que el enlace haya sido cambiado, eliminado o no exista.
                    </Typography>
                </Container> 

                <Container component="main" sx={{ mt: 2 }} maxWidth="md">               
                    <Link to="/" style={{ textDecoration: 'none' }} > 
                        <Button variant="contained" startIcon={ <ArrowBackIcon /> } >Regresar a la pagina de inicio</Button> 
                    </Link>  
                </Container> 

            </Box>

        </>
    )
}