import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';

import { LoginColumnStyle, LoginLayoutStyle, LoginRowStyle, LoginTextStyle } from '../../styles/LoginStyle';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { login, stateProps } from '../../store/slices/AuthSlice';
import { openSnackbar } from "../../store/slices/SnackbarSlice";

import { Login } from '../../connections/auth/AuthConnection';

import '../../css/Login.css';

export const LoginPage = () => {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [correoElectronico, setCorreoElectronico] = useState('recepcionista@pjecz.gob.mx');
    const [contrasena, setContrasena] = useState('Recepcionista1');

    const handleLogin = async ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {

        e.preventDefault();

        const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correoElectronico);

        if( !correoElectronico ){
            dispatch( openSnackbar({ message: 'Debes escribir el correo electrónico', variant: 'warning' }));        
            return;
        }
        else if( !validEmail ){   
            dispatch( openSnackbar({ message: 'El correo electrónico no tiene un formato validó', variant: 'warning' }));     
            return;
        }
        else if( !contrasena ){
            dispatch( openSnackbar({ message: 'Debes escribir la contraseña', variant: 'warning' }));     
            return;
        }
        else {

            setLoading( true );

            await Login( { username: correoElectronico, password: contrasena } ).then( resp => {

                const { success, message, access_token, username, rol , unidad, ubicacion } = resp;

                if( success ){

                    const data: stateProps = {
                        username: username,
                        token: access_token,                    
                        correoElectronico: correoElectronico,
                        rol: rol,
                        unidad: unidad,
                        ubicacion: ( ubicacion && ubicacion?.id !== 1 ) ? `Ventanilla ${ ubicacion.numero }` : '',
                    };

                    setTimeout(() => {
                  
                        dispatch( login( data ) );
                        window.localStorage.setItem('data', JSON.stringify(data));
    
                        setLoading( false );
                        
                    }, 700);

                }
                else{

                    setTimeout(() => {                        
                        
                        dispatch( openSnackbar({ message: message, variant: 'error' }));    

                        setLoading( false );
                        
                    }, 700);

                }

            });            
        }
    }

    return (
        <Box style={ LoginLayoutStyle }>
                       
            <Grid container style={ LoginRowStyle }>
                
                {/* Formulario */}
                <Grid size={{ xs: 12, md: 7, lg: 5 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                   
                    <Grid container style={ LoginColumnStyle }>
                        
                        <Grid size={{ xs: 6 }} style={{ textAlign: 'center' }}>
                            <img src={ process.env.PUBLIC_URL + "/assets/logo-pjecz.png"} alt="Poder Judicial" style={{ height: 130 }} />        
                        </Grid>
                        
                        <Grid size={{ xs: 6 }} style={{ textAlign: 'center' }}>
                            <img src={ process.env.PUBLIC_URL + "/assets/logo.png"} alt="SAJI" style={{ height: 115 }} />
                        </Grid>

                    </Grid>

                    <Typography variant="h5" mt={2} fontWeight={'bold'} textAlign={'center'} sx={{ mt: 5 }}>Bienvenidos</Typography>
                    <Typography variant="subtitle1" color='secondary' fontSize={14} mt={3}>Ingrese con sus credenciales</Typography>

                    <form>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '350px',
                                gap: 2,
                                mt: 3,
                                mb: 3
                            }}
                        >

                            <FormControl sx={{ mt: 2 }}>
                              
                                <TextField
                                    fullWidth
                                    label='Correo electrónico'
                                    type="email"
                                    placeholder="persona@pjecz.gob.mx"
                                    autoComplete="off"                             
                                    variant="outlined"                
                                    slotProps={{
                                        input: {
                                            autoComplete: 'off'
                                        },
                                        inputLabel: {
                                            shrink: true,
                                        }
                                    }}                           
                                    value={ correoElectronico }                   
                                    onChange={ (e) => setCorreoElectronico( e.target.value ) }
                                />
                            </FormControl>

                            <FormControl sx={{ mt: 2 }}>
                                <InputLabel shrink>Contraseña</InputLabel>
                                <OutlinedInput
                                    notched
                                    fullWidth    
                                    label='Contraseña'
                                    placeholder="****************"                                                                                                     
                                    type={ showPassword ? 'text' : 'password' }
                                    value={ contrasena }                   
                                    onChange={ (e) => setContrasena( e.target.value ) }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                size='small'
                                                aria-label={ showPassword ? 'hide the password' : 'display the password' }                                        
                                                onClick={ () => setShowPassword( ( show ) => !show ) }
                                            >
                                                { showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> }
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            
                            <Button
                                fullWidth
                                variant="contained"    
                                type='submit'
                                sx={{ my: 3 }}        
                                onClick={ handleLogin }                
                                loading={ loading }
                            >
                                Ingresar
                            </Button>

                        </Box>

                    </form>           

                    <Typography style={ LoginTextStyle }>
                        <strong>SAJI</strong> es una plataforma de gestión judicial de última generación, la cual permite optimizar los procesos enfocados en ofrecer a la ciudadanía una justicia pronta, expedita, innovadora, transparente y abierta.
                    </Typography>

                </Grid>

                {/* Imagen */}
                
                <Grid size={{ xs: 12, md: 5, lg: 7 }} sx={{ display: { md: 'flex', xs: 'none' } }} style={{ alignItems: "center", justifyContent: "center", background: "#f0f2f5", height: "100%" }}>
                    <img src={ process.env.PUBLIC_URL + "/assets/balanzabg.jpeg"} alt="Balanza" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Grid>

            </Grid>

        </Box>
    );
};
