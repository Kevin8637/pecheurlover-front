import {useLocation} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import React from "react";
import Buttons from "../../components/recapOrder/Buttons";

const RecapDetails = () => {
    const location = useLocation();
    const produits = location.state?.produits || [];

    const totalPrice = produits.reduce((total: number, produit: any) => total + produit.totalPrice, 0)
        .toFixed(2);

    return (
        <>
            <Typography variant="h4" sx={{textAlign: "center", margin: "20px"}}>
                Récapitulatif de votre commande
            </Typography>
            <Box className="recap-container" sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid black",
                borderRadius: "20px",
                width: "50%",
                margin: "auto",
                flexDirection: "column",
                boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.5)",
                background: "#86c0d8"
            }}>
                {produits.length === 0 ? (
                    <Typography>Aucun produit dans votre panier.</Typography>
                ) : (
                    <ul style={{listStyleType: "none", padding: 0}}>
                        {produits.map((produit: any) => (
                            <li key={produit.id_product}
                                style={{display: "flex", alignItems: "center", margin: "10px"}}>
                                {produit.imageUrl ? (
                                    <img src={produit.imageUrl} alt={produit.name || "Produit"}
                                         style={{
                                             width: '50px',
                                             height: '70px',
                                             marginRight: '10px',
                                             borderRadius: "8px"
                                         }}/>
                                ) : (
                                    <Typography>Aucune image disponible</Typography>
                                )}

                                <Typography variant="body1" sx={{flex: 1, textAlign: "left", marginLeft: "10px"}}>
                                    {produit.quantity} x {produit.name} - {produit.price.toFixed(2)}€/pu
                                    = <strong>{produit.totalPrice.toFixed(2)}€</strong>
                                </Typography>
                            </li>
                        ))}
                    </ul>
                )}
                <Typography variant="h5" sx={{textAlign: "right", m: 2}}>
                    Total : <strong>{totalPrice}€</strong>
                </Typography>
                <Buttons totalPrice={totalPrice} produits={produits}/>
            </Box>
        </>
    );
};

export default RecapDetails;
