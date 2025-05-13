import { Box, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router';

import { button_red_small } from '../styles/ButtonsStyle';


export const Footer = () => {

  const navigate = useNavigate();
    
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#ddd",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginBottom: "0",
        position: "fixed",
        float: "bottom",
        bottom: "0",
      }}
    >
      
      <Container maxWidth="lg">
        <Grid sx={{ display: 'flex', justifyContent: 'left', margin:'auto', fontSize:'2em' }}>
          Ventanilla {localStorage.getItem('ventanilla')}
        </Grid>
        <Grid container direction="column" alignItems="end">
          <img 
              style={{ width: 40, height: 40, marginRight: 10 }}
              src={ process.env.PUBLIC_URL + "/assets/config.png"}
              alt='config'
          />
          <Button sx={{...button_red_small}} variant="contained" color="primary" onClick={() => navigate('/auth/login')}>
            Cerrar Sesión
          </Button>
        </Grid>
      </Container>
    </Box>
  )
}
