
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';

import TuneIcon from '@mui/icons-material/Tune';
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonIcon from '@mui/icons-material/Person';

import { RootState } from '../store';
import { logout } from '../store/slices/AuthSlice';
import { Settings } from './Settings';

export const Footer = () => {

    const dispatch = useDispatch();
    
    const { username, ventanilla, tipoUsuario } = useSelector( ( state: RootState ) => state.auth );

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {

        setLoading( true );      

        setTimeout(() => {

            localStorage.setItem('lastPath', '/' );
            localStorage.clear();
            
            dispatch( logout() );
            setLoading( false );
        
        }, 700);           

    }    
    
    return (

        <>
            
            <AppBar position="fixed" color="primary" sx={{borderTop:'1px solid #999', top: 'auto', bottom: 0, boxShadow: 'none', backgroundColor: '#f5f5f5', opacity: 0.8, height: 65 }}>

                <Toolbar>    
                    <Box sx={{ ml:3 , display: 'flex', alignItems: 'end'}}>
                        <PersonIcon sx={{ color: '#003366', fontSize: 40 }} />
                    </Box>

                    <Box sx={{ flex: 1, marginLeft:0 }}>

                        <Grid container sx={{ ml: 3, display:'flex' }}>

                            <Grid size={{ xs: 12, md: 12 }}>
                                <Typography variant='subtitle2' sx={{ fontSize: 18, color: 'black' }} >
                                    { username }
                                </Typography>
                            </Grid>
                        
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Typography variant='subtitle1' sx={{ color: 'black' }} >
                                    { ventanilla }
                                </Typography>
                            </Grid>

                        </Grid>      

                    </Box>

                    <Box>

                        {
                            ( tipoUsuario === 'Ventanilla' )
                            &&
                                <IconButton color="primary" sx={{ mr: 3 }} onClick={ () => setOpen( true ) }>
                                    <TuneIcon />
                                </IconButton>
                        }

                        <Button 
                            variant='contained' 
                            color="primary"
                            onClick={ handleLogout }
                            loading={ loading }
                            >
                            <ExitToAppOutlinedIcon />
                        </Button>

                    </Box>

                </Toolbar>

            </AppBar>

            <Settings 
                open={ open }
                setOpen={ setOpen }            
            />

        </>
    );
}
