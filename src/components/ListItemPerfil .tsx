
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Avatar, Menu, MenuItem, Typography, ListItem, Button, ListItemText, ListItemIcon, CircularProgress } from "@mui/material"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

import { AvatarAppBarStyle, ListItembuttonStyle, ListItemIconStyle, ListSubItemStyle, ListTypographyStyle, TypographyAppBarStyle } from '../styles/ListItemStyle';

import { logout } from "../store/slices/AuthSlice";
import { RootState } from "../store";

export const ListItemUsuarioPerfil = () => {

    const dispatch = useDispatch();

    const { nombres, apellidos } = useSelector( ( state: RootState ) => state.auth );

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(false);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {

        setLoading( true );      

        setTimeout(() => {

            localStorage.setItem('lastPath', '/' );
            localStorage.clear();
            
            dispatch( logout() );
            setLoading( false );
        
        }, 400);           

    }

    const open = Boolean(anchorEl);   

    return (
        
        <>
            <ListItem component="div" style={{ textAlign: 'right' }}> 

                <ListItemText style={ListItemIconStyle}>
                
                    <Button color="inherit" style={ListItembuttonStyle} onClick={ handleOpenMenu } >
                        <Avatar 
                            alt="Mi Avatar"                             
                            style={AvatarAppBarStyle} 
                            src={'https://mui.com/static/images/avatar/2.jpg'} 
                        />
                        
                        <Typography sx={{ ...TypographyAppBarStyle, marginLeft: 2, display: { xs: 'none', 'xl': 'flex' } }} >
                            { nombres } <br />
                            { apellidos }
                        </Typography>

                        <KeyboardArrowDownIcon style={ ListItemIconStyle } />       

                    </Button>

                </ListItemText>

            </ListItem>

            <Menu elevation={ 4 } anchorEl={ anchorEl } anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }} keepMounted open={ open } onClose={ handleCloseMenu }>  

                <MenuItem style={ ListSubItemStyle } onClick={ handleLogout } >

                    <ListItemIcon style={ ListItemIconStyle }>         

                        {
                            loading
                            ?
                                <CircularProgress size={20} />
                            :
                                <ExitToAppOutlinedIcon style={{ ...ListItemIconStyle, fontSize: 20 }} />  
                        }              

                    </ListItemIcon>

                    <ListItemText style={ListTypographyStyle}> Salir </ListItemText>   

                </MenuItem>    

            </Menu>  

        </>

    )
}