
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Box, IconButton, Toolbar, Typography, Avatar, Tooltip, Button } from '@mui/material';

import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonIcon from '@mui/icons-material/Person';
import TuneIcon from '@mui/icons-material/Tune';

import { RootState } from '../store';
import { logout } from '../store/slices/AuthSlice';

import { Settings } from './Settings';

export const Footer = () => {

    const dispatch = useDispatch();

    const { username, ubicacion, rol } = useSelector( ( state: RootState ) => state.auth );

    const [loading, setLoading] = useState( false );
    const [open, setOpen] = useState( false );

    const handleLogout = async () => {

        setLoading( true );

        setTimeout(() => {

            localStorage.setItem('lastPath', '/');
            localStorage.clear();

            dispatch( logout() );
            setLoading( false );

        }, 700);
    };

    return (
        <>

            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    top: 'auto',
                    bottom: 0,
                    backgroundColor: '#f4f5f7',
                    borderTop: '1px solid #d8dde6',
                }}
            >

                <Toolbar
                    sx={{
                        minHeight: '64px !important',
                        px: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

                        <Avatar
                            sx={{
                                width: 34,
                                height: 34,
                                bgcolor: '#d9e6f5',
                                color: '#294a6d',
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 20 }} />
                        </Avatar>

                        <Box>

                            <Typography
                                sx={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: '#2b2f33',
                                }}
                            >
                                { username }
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: '#7a8594',
                                }}
                            >
                                { ubicacion }
                            </Typography>

                        </Box>

                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        {
                            rol?.nombre === 'VENTANILLA'
                            &&                            
                                <Tooltip title="Configuración">
                                    
                                    <IconButton
                                        onClick={ () => setOpen( true ) }
                                        sx={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: 1.5,
                                            border: '1px solid #d4dae3',
                                            backgroundColor: '#fff',
                                            color: '#44556b',
                                            '&:hover': {
                                                backgroundColor: '#eef2f7',
                                            },
                                        }}
                                    >
                                        <TuneIcon fontSize="small" />
                                    </IconButton>

                                </Tooltip>                                
                        }

                        <Tooltip title="Cerrar sesión">

                            <Button
                                loading={loading}
                                onClick={handleLogout}
                                variant="contained"
                                sx={{
                                    minWidth: 38,
                                    width: 38,
                                    height: 38,
                                    p: 0,
                                    borderRadius: 1.5,                                
                                }}
                            >
                                <ExitToAppOutlinedIcon fontSize="small" />
                            </Button>

                        </Tooltip>

                    </Box>

                </Toolbar>

            </AppBar>

            <Settings
                open={open}
                setOpen={setOpen}
            />

        </>
    );

};