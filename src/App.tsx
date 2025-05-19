
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material';

import store from './store';

import { AppRouter } from './routers/AppRouter';

import './css/App.css';

const theme = createTheme({
    palette: {
        primary: {            
            main: '#003366',
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
    },
    components: {
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontFamily: 'Open Sans, Arial, sans-serif',
                }
            }
        }
    }
});

export const App = () => {

    return (
        <ThemeProvider theme={theme}>

            <Provider store = { store }>
        
                <AppRouter />

            </Provider>
        
        </ThemeProvider>
    )
}