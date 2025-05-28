
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

            <Container maxWidth='xl'>

                <Box component={ 'div' }>

                    { children }

                </Box>
               
            </Container>

            { footer && <Footer /> }

        </>      
       
    )
}