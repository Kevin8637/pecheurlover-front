import React, {FC, useContext, useState} from "react";
import apiSpringBoot from "../../api/apiSpringBoot";
import {Box, Button, Typography} from "@mui/material";
import {ShoppingCartContext} from "../dashboardBody/shoppingCart/ShoppingCartContext";
import {useNavigate} from "react-router-dom";

type InvoiceResponse = {
    id_invoice: number;
};

const Buttons: FC<{ totalPrice: number; produits: any[] }> = ({totalPrice: propsTotalPrice, produits}) => {

    const navigate = useNavigate();
    const {clearShoppingCart, totalPrice: contextTotalPrice} = useContext(ShoppingCartContext);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const isValidEmail = value && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+/.test(value);
        setEmailError(!isValidEmail);
    };

    const handleContinueShopping = () => {
        navigate("/dashboard");
    };

    const handlePay = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            produits.map((item) => ({
                id_invoice: item.id_invoice,
                id_product: item.id_product,
                quantity: item.quantity,
                price: item.price,
            }));

            const priceToUse = propsTotalPrice || contextTotalPrice;
            const priceAsNumber = parseFloat(priceToUse);
            if (isNaN(priceAsNumber)) {
                setErrorMessage("Le prix total est invalide.");
                return;
            }
            // Vérif du stock
            for (const item of produits) {
                type StockResponse = { stock: number };
                const stockResponse = await apiSpringBoot.get<StockResponse>(`/products/${item.id_product}/stock`);
                const stockDisponible = stockResponse.data.stock;
                if (item.quantity > stockDisponible) {
                    setErrorMessage(`❌ Stock insuffisant pour ${item.name} (disponible: ${stockDisponible}).`);
                    setLoading(false);
                    return;
                }
            }

            const invoiceResponse = await apiSpringBoot.post<InvoiceResponse>(
                "/invoices/create",
                {
                    email: String(email),
                    invoice_date: new Date().toISOString().split("T")[0],
                    total_price: priceAsNumber,
                },
                {headers: {"Content-Type": "application/json"}}
            );

            const {id_invoice} = invoiceResponse.data;

            const orderPromises = produits.map(async (item) => {
                await apiSpringBoot.post("/orders/create", {
                    id_invoice,
                    id_product: item.id_product,
                    quantity: item.quantity,
                    price: item.price,
                });

                await apiSpringBoot.put(`/products/${item.id_product}/update-stock`, {
                    newStock: item.stock - item.quantity
                });
            });
            await Promise.all(orderPromises);
            clearShoppingCart();
            navigate("/dashboard");

        } catch (error: any) {
            setErrorMessage(
                error.response?.data?.message || error.message || "Une erreur est survenue."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                margin: "10px"
            }}>
                <Typography variant="h6" sx={{marginRight: "5px"}}>
                    Saisir votre adresse email :
                </Typography>
                <input
                    type="email"
                    placeholder="Entre ton email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    style={{borderColor: emailError ? "red" : "#ccc"}}
                />
            </Box>
            {emailError && (
                <Typography sx={{color: "red", textAlign: "center"}}>
                    L'email est invalide
                </Typography>
            )}
            {errorMessage && (
                <Typography sx={{color: "red", textAlign: "center", marginTop: "10px"}}>
                    {errorMessage}
                </Typography>
            )}
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "row", gap: 2, margin: 2}}>
                <Button
                    onClick={handleContinueShopping}
                    sx={{
                        backgroundColor: "#66b3ff",
                        color: "#fff",
                        borderRadius: "10px",
                        padding: "10px 20px",
                        textTransform: "none",
                        "&:hover": {backgroundColor: "#4da6e6"},
                    }}
                > Continuer mes achats
                </Button>
                <Button
                    onClick={handlePay}
                    disabled={emailError || !email || loading}
                    sx={{
                        backgroundColor: "#3399ff",
                        color: "#fff",
                        borderRadius: "10px",
                        padding: "10px 20px",
                        textTransform: "none",
                        "&:hover": {backgroundColor: "#2672cc"},
                        opacity: loading ? 0.7 : 1,
                    }}
                >{loading ? "Paiement..." : "Payer"}
                </Button>
            </Box>
        </>
    );
};

export default Buttons;
