

import { useEffect, useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

import { useDispatch } from 'react-redux';

import { logout } from '../store/slices/AuthSlice';
import { ValidarToken } from '../connections/auth/AuthConnection';

export const DialogTokenExpired = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState( false );

    const [loading, setLoading] = useState( false );

    const IniciarSesion = () => {

        setLoading( true );

        setTimeout(() => {

            window.localStorage.clear();
            dispatch( logout() );

        }, 700);

    }

    useEffect(() => {
       
        async function Obtener(){

            await ValidarToken().then( resp => {

                if( resp ){

                    if( !resp.success ){
                        setOpen( true );
                    }

                }
            });

        }

        Obtener();

    }, [ ] );

    return (
        <>
            <Dialog open={ open } onClose={ () => {} } >

                <DialogTitle>
                    El tiempo de sesión ha expirado
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        Por seguridad es necesario volver a iniciar sesión
                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button 
                        variant='contained' 
                        color='primary' 
                        onClick={ IniciarSesion } 
                        loading={ loading }
                    >
                        Aceptar
                    </Button>

                </DialogActions>

            </Dialog>  
        </>
    );
}