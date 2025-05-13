
import { Box, Container } from "@mui/material";

import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface Props {
    children?: React.ReactNode;
}

export const Layout = ( { children } : Props ) => {
    
    return (

        <>        
            <NavBar />            

            <Container maxWidth='xl' sx={{ pb: 5 }} >

                <Box component={ 'div' } sx={{ p: 3 }}>

                    { children }

                </Box>
               
            </Container>

            <Footer />
        </>      
       
    )
}