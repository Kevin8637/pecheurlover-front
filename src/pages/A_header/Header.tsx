import React, {FC, useState} from 'react';
import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Header: FC<{}> = ({}) => {
    const navigate = useNavigate(); // Hook de navigation

    // État pour gérer l'ouverture du menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Gère le clic sur l'icône du menu
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Ferme le menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Redirection vers le dashboard
    const handleDashboard = () => {
        navigate("/dashboard");
    };

    // Redirection vers l’espace admin
    const handleAdmin = () => {
        handleClose();
        navigate("/adminListOrders");
    };

    // Redirection vers la section produits du dashboard
    const handleProduits = () => {
        handleClose();
        navigate("/dashboard#products");
    };

    // Déconnexion de l’utilisateur
    const handleLogout = () => {
        handleClose();
        localStorage.removeItem("token"); // Suppression du token
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
            {/* Logo qui redirige vers le dashboard */}
            <img className="logoNavbar" alt="Logo Pecheur-Lover" src="/logo.png" onClick={handleDashboard}
                 style={{cursor: 'pointer'}}/>

            {/* Bouton pour ouvrir le menu */}
            <IconButton onClick={handleMenuClick}>
                <MenuIcon fontSize="large"/>
            </IconButton>

            {/* Menu déroulant avec navigation */}
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
