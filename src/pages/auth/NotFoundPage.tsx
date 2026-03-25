
import { Link } from 'react-router';

import { Box, Button, Divider, Container, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const NotFoundPage = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }} >

            <Container maxWidth="xl" component="main" sx={{ mt: 12, mb: 3, textAlign: 'center' }}>
                <img
                    src={ process.env.PUBLIC_URL + "/assets/logo-simple.png"}
                    alt={"PJECZ"}
                    style={{ width: 300 }}
                />
            </Container>
        
            <Container sx={{ my: 5 }} maxWidth="lg">

                <Typography variant="h4" component="h1" textAlign={'center'}>
                    LO SENTIMOS <br /> ESTA PÁGINA NO ESTÁ DISPONIBLE
                </Typography>

                <Divider sx={{ mt: 5 }}/>
                
            </Container>   

            <Container maxWidth="sm">
                <Typography textAlign={'center'} fontSize={16}>
                    Es posible que el enlace haya sido cambiado, eliminado o no exista.
                </Typography>
            </Container> 

            <Container component="main" maxWidth="md" sx={{ my: 5, textAlign: 'center' }}>               
                <Link to="/" style={{ textDecoration: 'none' }} > 
                    <Button color='secondary' variant="outlined" startIcon={ <ArrowBackIcon /> } >Regresar a la pagina anterior</Button> 
                </Link>  
            </Container> 

        </Box>
    )
}