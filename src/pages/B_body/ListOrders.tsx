import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Box, Typography, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {getData} from "../../api/apiSpringBoot";

type Order = {
    id_invoice: number;
    id_product: number;
    quantity: number;
    price: number;
    productName: string;
    productImage: string;
    invoiceDate: string;
    totalPrice: number;
};

const ListOrders = () => {
    const location = useLocation();
    const email = location.state?.email || "";

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState<string | false>(false);

    useEffect(() => {
        if (!email) {
            setError("Aucun email fourni.");
            setLoading(false);
            return;
        }
        const fetchOrders = async () => {
            try {
                const data = await getData(`/orders/by-email/${email}`);
                setOrders(data);
            } catch (err) {
                setError("Erreur lors du chargement des commandes.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [email]);

    const groupedOrders = orders.reduce<Record<number, { orders: Order[], invoice_date: string, total_price: number }>>(
        (acc, order) => {
            if (!acc[order.id_invoice]) {
                acc[order.id_invoice] = {
                    orders: [],
                    invoice_date: order.invoiceDate || "Date inconnue",
                    total_price: order.totalPrice || 0
                };
            }
            acc[order.id_invoice].orders.push(order);
            return acc;
        },
        {}
    );

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{width: "80%", margin: "auto", textAlign: "center"}}>
            <Typography variant="h4" sx={{margin: "20px"}}>
                Commandes pour {email}
            </Typography>

            {loading ? (
                <Typography>Chargement des commandes...</Typography>
            ) : error ? (
                <Typography sx={{color: "red"}}>{error}</Typography>
            ) : Object.keys(groupedOrders).length === 0 ? (
                <Typography>Aucune commande trouvée pour cet email.</Typography>
            ) : (
                <Box>
                    {Object.entries(groupedOrders).map(([id_invoice, invoiceData]) => (
                        <Accordion
                            key={id_invoice}
                            expanded={expanded === `panel${id_invoice}`}
                            onChange={handleChange(`panel${id_invoice}`)}
                            sx={{backgroundColor: "#c7f2fe", boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.5)"}}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography variant="h6">
                                    {invoiceData.invoice_date ? new Date(invoiceData.invoice_date).toLocaleDateString() : "Date inconnue"}
                                    &nbsp;| Facture #{id_invoice}
                                    &nbsp;| Total
                                    : {invoiceData.total_price ? invoiceData.total_price.toFixed(2) + " €" : "Total inconnu"}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {invoiceData.orders.map((order, index) => (
                                    <Box key={index} sx={{
                                        borderBottom: "1px solid #ccc",
                                        padding: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <img src={order.productImage} alt={order.productName}
                                             style={{width: 50, height: 50}}/>
                                        <Typography>{order.productName}</Typography>
                                        <Typography>{order.quantity} x {order.price.toFixed(2)}€</Typography>
                                        <Typography>Total : {(order.quantity * order.price).toFixed(2)}€</Typography>
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ListOrders;
