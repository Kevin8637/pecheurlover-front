import {useContext, useState} from "react";
import {ShoppingCartContext} from "./ShoppingCartContext";
import {useNavigate} from "react-router-dom";
import {Box, Button, Typography, IconButton, TextField} from "@mui/material";
import {Delete, Remove, Add} from "@mui/icons-material";

const ShoppingCart = () => {
    const cartContext = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const goToOrders = () => {
        if (!email || !email.includes("@")) return;
        navigate("/listOrders", {state: {email}});
    };
    if (!cartContext) {
        return <Typography color="error">Erreur : Contexte du panier non disponible</Typography>;
    }
    const {shoppingCart, removeShoppingCart, updateQuantity, clearShoppingCart} = cartContext;
    const validateShoppingCart = () => {
        navigate("/recapOrder", {state: {produits: shoppingCart}});
    };

    return (
        <Box sx={{
            textAlign: "center",
            padding: 2,
            maxWidth: 400,
            margin: "auto",
        }}>
            <Typography variant="h5" sx={{mb: 2}}>Mon Panier</Typography>
            {shoppingCart.length === 0 ? (
                <Typography>Aucun produit dans le panier</Typography>
            ) : (
                <>
                    <ul style={{listStyleType: "none", padding: 0}}>
                        {shoppingCart.map((produit: any) => (
                            <li key={produit.id_product} className="cart-item" style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "10px"
                            }}>
                                <div className="cart-item-info" style={{textAlign: "center", width: "100%", display:"flex", justifyContent:"space-around", flexDirection:"row", alignItems:"center"}}>
                                    <img className="cart-img" src={produit.imageUrl} alt={produit.name}
                                         style={{width: 70, height: 40, borderRadius: "8px"}}/>
                                    <Typography variant="body1">
                                        {produit.quantity} x {produit.name} - {produit.price.toFixed(2)}€/pu
                                        = <strong>{produit.totalPrice.toFixed(2)}€</strong>
                                    </Typography>
                                </div>
                                <div className="cart-actions" style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: "5px"
                                }}>
                                    <IconButton size="small"
                                                onClick={() => updateQuantity(produit.id_product, "decrease")}>
                                        <Remove/>
                                    </IconButton>
                                    <Typography variant="body1" sx={{mx: 1, fontWeight: "bold"}}>
                                        {produit.quantity}
                                    </Typography>
                                    <IconButton size="small"
                                                onClick={() => updateQuantity(produit.id_product, "increase")}>
                                        <Add/>
                                    </IconButton>
                                    <Button onClick={() => removeShoppingCart(produit.id_product)} color="error">
                                        <Delete/>
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Typography variant="h6" sx={{textAlign: "right", mb: 2}}>
                        🛒 Total
                        : <strong>{shoppingCart.reduce((total, produit) => total + produit.totalPrice, 0).toFixed(2)}€</strong>
                    </Typography>
                    <Box sx={{display: "flex", flexDirection: "row", gap: 2, justifyContent: "center", alignItems: "center", width: "100%", mb:2}}>
                        <Button onClick={clearShoppingCart} variant="contained" color="error" fullWidth>
                            🗑️ Vider le panier
                        </Button>
                        <Button onClick={validateShoppingCart} variant="contained" color="primary" fullWidth>
                            ✅ Valider mon panier
                        </Button>
                    </Box>
                </>
            )}
            <Typography variant="h6" sx={{mt: 50}}>Mes précédentes commandes :</Typography>
            <TextField
                label="Adresse email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e:any) => {
                    setEmail(e.target.value);
                    setError(false);
                }}
                error={error}
                helperText={error ? "Veuillez entrer une adresse email valide" : ""}
                sx={{mb: 2}}
            />
            <Button onClick={goToOrders} variant="outlined" color="secondary" fullWidth sx={{mt: 2}}
                    disabled={!email.includes("@")}>
                📜 Mes commandes précédentes
            </Button>
        </Box>
    );
};

export default ShoppingCart;
