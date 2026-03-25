
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { RootState } from "../store";

import { DialogTokenExpired } from "../dialogs/DialogTokenExpired";

export const NavBar = () => {

    const { token } = useSelector((state: RootState) => state.auth);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {

        const interval = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <>

            <AppBar
                position="fixed"
                sx={{
                    boxShadow: "none",
                    backgroundColor: "white",
                    borderBottom: "3px solid rgba(10, 25, 45, 0.8)",
                }}
            >
                <Container maxWidth="xl">

                    <Toolbar
                        disableGutters
                        sx={{
                            height: 85,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >

                        <Box sx={{ width: 200, textAlign: "center" }}>

                            <img
                                style={{ height: 55 }}
                                src={ process.env.PUBLIC_URL + "/assets/logo-saji.png" }
                                alt="logo"
                            />

                        </Box>

                        <Box sx={{ flex: 1 }} />

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.2,
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#0A192D",
                                    color: "#fff",
                                }}
                            >
                                <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: 22,
                                    fontWeight: 600,
                                    color: "#2b2f33",
                                    lineHeight: 1,
                                    letterSpacing: "0.5px",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >

                                {
                                    currentTime.toLocaleTimeString("es-MX", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })
                                }

                            </Typography>

                        </Box>

                    </Toolbar>

                </Container>

            </AppBar>

            { token && <DialogTokenExpired /> }

        </>
    );

};