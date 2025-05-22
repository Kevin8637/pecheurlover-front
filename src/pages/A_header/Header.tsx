import React, {FC, useState} from 'react';
import {Box, Button, IconButton, Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Header: FC<{}> = ({}) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDashboard = () => {
        navigate("/dashboard");
    };

    const handleAdmin = () => {
        handleClose();
        navigate("/adminListOrders");
    };

    const handleProduits = () => {
         handleClose();
         navigate("/dashboard#products");
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Box sx={{
            marginBottom: "20px",
            height: '100px',
            bgcolor: "#06BEF0",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            border: "1px solid black"
        }}>
            <img className="logoNavbar" alt="Logo Pecheur-Lover" src="/logo.png" onClick={handleDashboard}
                 style={{cursor: 'pointer'}}/>
            <IconButton onClick={handleMenuClick}>
                <MenuIcon fontSize="large"/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
            >
                <MenuItem onClick={handleProduits}>Nos produits</MenuItem>
                <MenuItem onClick={handleAdmin}>Mode Admin</MenuItem>
                <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
            </Menu>
        </Box>
    );
};

export default Header;
