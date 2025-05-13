
import { Box, Container } from "@mui/material";

import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface Props {
    children?:  React.ReactNode;
    footer?:    boolean;
}

export const Layout = ( { children, footer = false } : Props ) => {
    
    return (

        <>        
            <NavBar />            

            <Container maxWidth='xl' sx={{ pb: 5 }} >

                <Box component={ 'div' } sx={{ p: 3 }}>

                    { children }

                </Box>
               
            </Container>

            { footer && <Footer /> }

        </>      
       
    )
}