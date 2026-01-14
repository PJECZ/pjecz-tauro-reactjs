import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Alert, Box, Button, FormControl, FormLabel, Grid, IconButton, InputAdornment, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material';

import { login_col, login_layout, login_row } from '../../styles/LoginStyle';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import '../../css/Login.css';

import { login, stateProps } from '../../store/slices/AuthSlice';

import { Login } from '../../connections/auth/AuthConnection';
import { SnackbarProps } from '../../interfaces/ui/SnackbarInterface';

export const LoginPage = () => {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [correoElectronico, setCorreoElectronico] = useState('recepcionista@pjecz.gob.mx');
    const [contrasena, setContrasena] = useState('Recepcionista1');

    const [{ type: typeSnackbar, open: openMessage, message }, setOpenMessage] = useState<SnackbarProps>({
        type: 'warning',
        message: '',
        open: false,
    });

    const handleClose = () => setOpenMessage({ type: typeSnackbar, open: false, message })

    const handleLogin = async ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {

        e.preventDefault();

        const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correoElectronico);

        if(!correoElectronico ){
            setOpenMessage({ type: 'warning', open: true, message: 'Debes escribir el correo electrónico' });
            return;
        }
        else if(!validEmail){   
            setOpenMessage({ type: 'warning', open: true, message: 'El correo electrónico no tiene un formato valido' });
            return;
        }
        else if(!contrasena ){
            setOpenMessage({ type: 'warning', open: true, message: 'Debes escribir la contraseña' });
            return;
        }
        else {

            setLoading( true );        

            await Login({ username: correoElectronico, password: contrasena }).then( resp => {

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
                else {

                    setOpenMessage({ type: 'warning', open: true, message: message });
                    
                    setLoading( false );
                }                  

            });                 
                   
        }
    }

    return (
        <Box style={ login_layout }>
            
            <Snackbar open={openMessage} autoHideDuration={1500} onClose={ handleClose } anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={ handleClose }
                    severity={ typeSnackbar }
                    variant="filled"
                    sx={{ width: '100%' }}                   
                >
                    { message }
                </Alert>
            </Snackbar>
           
            <Grid container style={ login_row }>
                
                {/* Formulario */}
                <Grid size={{ xs: 12, md: 7, lg: 5 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    
                    <Grid container style={ login_col } >
                        
                        <Grid size={{ xs: 6 }} style={{ textAlign: 'center' }}>
                            <img src={ process.env.PUBLIC_URL + "/assets/logo-pjecz.png" } alt="Poder Judicial" style={{ height: 120 }} />        
                        </Grid>
                        
                        <Grid size={{ xs: 6 }} style={{ textAlign: 'center' }}>
                            <img src={ process.env.PUBLIC_URL + "/assets/logo_colors.png" } alt="logo" style={{ height: 75 }} />
                        </Grid>

                    </Grid>

                    <Typography variant={'h5'} sx={{ textAlign: "center", fontWeight: 'bold', mt: 2 }}>Bienvenidos</Typography>
                    <Typography sx={{ fontSize: 16, textAlign: "center", mt: 1 }}>Ingrese con sus credenciales</Typography>

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

                            <FormControl sx={{ mt: 2 }} required>
                                <FormLabel sx={{ fontWeight: '700', fontSize: 14, color: 'rgba(0, 0, 0, 0.8)', mb: 1}}>Correo electrónico</FormLabel>
                                <TextField
                                    fullWidth
                                    type="email"
                                    placeholder="persona@pjecz.gob.mx"
                                    autoComplete="off"                             
                                    variant="outlined"     
                                    value={ correoElectronico }            
                                    onChange={ (e) => setCorreoElectronico( e.target.value ) }
                                />
                            </FormControl>

                            <FormControl sx={{ mt: 2 }} required>
                                <FormLabel sx={{ fontWeight: '700', fontSize: 14, color: 'rgba(0, 0, 0, 0.8)', mb: 1 }}>Contraseña</FormLabel>
                                <OutlinedInput
                                    fullWidth    
                                    placeholder="****************"                                
                                    autoComplete="current-password"    
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
                                sx={{ mt: 1 }}        
                                onClick={ handleLogin }      
                                loading={ loading }          
                            >
                                Ingresar
                            </Button>

                        </Box>

                    </form>           

                </Grid>

                {/* Imagen */}
                
                <Grid size={{ xs: 12, md: 5, lg: 7 }} sx={{ display: { md: 'flex', xs: 'none' } }} style={{ alignItems: "center", justifyContent: "center", background: "#f0f2f5", height: "100%" }}>
                    <img src={ process.env.PUBLIC_URL + "/assets/balanzabg.jpeg"} alt="Balanza" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Grid>

            </Grid>
        </Box>
    );
};
