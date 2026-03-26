
import { Box, Container } from "@mui/material";

import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface Props {
    children?:    React.ReactNode;
    footer?:      boolean;
}

export const Layout = ( { children, footer = false }: Props ) => {

    return (
        <>
            <NavBar />

            <Container
                maxWidth="xl"
                sx={{
                    minHeight: footer ? "calc(100vh - 128px)" : "calc(100vh - 64px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    component="div"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    { children }
                </Box>

            </Container>

            { footer && <Footer /> }
            
        </>
    );
};