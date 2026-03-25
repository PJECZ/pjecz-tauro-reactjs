
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material';

import store from './store';

import { AppRouter } from './routers/AppRouter';

import { SnackbarContainer } from './components/snackbar/SnackbarContainer';

import './css/App.css';

const theme = createTheme({
    palette: {
        primary: {            
            main: '#0A192D',
        },
        secondary: {
            main: '#4D4D50'
        },
        error: {
            main: '#BC4065'
        },
        info: {
            main: '#5AB9B9'
        },
        warning: {
            main: '#ffc107',            
        },
    },
    components: {
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontFamily: 'Open Sans, Arial, sans-serif',
                }
            }
        },
        MuiInputBase: {
            styleOverrides:{
                input: {
                    "&::placeholder": {
                        opacity: 0.6,
                        color:'#000',
                    },
                    "&:disabled": {
                        opacity: 0.6,
                        color:'#000',
                        WebkitTextFillColor: "#000 !important",
                    }
                }
           }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    },                    
                },
                paper: {
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                    borderRadius: 10,
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)"
                }
            }
        },
    }
});

export const App = () => {

    return (
        <ThemeProvider theme={theme}>

            <Provider store = { store }>
        
                <AppRouter />
                <SnackbarContainer />   

            </Provider>
        
        </ThemeProvider>
    )
}