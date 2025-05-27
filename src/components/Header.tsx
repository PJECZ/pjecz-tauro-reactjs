
import { Box, AppBar, Toolbar } from "@mui/material"

export const Header = () => {

    return (

        <Box sx={{ flexGrow: 1 }} >
            
            <AppBar position="static" sx={{ bgcolor: 'transparent',  boxShadow: 'none' }}>

                <Toolbar sx={{ height: 120 }}>
                   
                    <Box sx={{ textAlign: 'start' }}>               

                        <img 
                            style={{ width: 300 }}
                            src={ process.env.PUBLIC_URL + "/assets/logo-pjecz-horizontal.png"}
                            alt='logo'
                        />                       

                    </Box>  

                </Toolbar>

            </AppBar>

        </Box>
    )
}
