import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box} from "@mui/material";
import {getData} from "../../api/apiSpringBoot";

export default function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const [invoices, setInvoices] = React.useState<any[]>([]);

    const [ordersDetails, setOrdersDetails] = React.useState<Record<number, any[]>>({});

    const handleChange = (panel: string) => async (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        if (isExpanded) {
            const invoiceId = parseInt(panel.replace("panel", ""));
            await fetchOrdersDetails(invoiceId);
        } else {
            setOrdersDetails(prevState => {
                const updatedState = {...prevState};
                delete updatedState[parseInt(panel.replace("panel", ""))];
                return updatedState;
            });
        }
    };

    React.useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const data = await getData("/invoices/admin/all");
            setInvoices(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des factures : ", error);
        }
    };

    const fetchOrdersDetails = async (id_invoice: number) => {
        if (ordersDetails[id_invoice]) return;
        try {
            const data = await getData(`/orders/by-invoice/${id_invoice}`);
            const normalizedData = Array.isArray(data) ? data : [data];
            setOrdersDetails(prevState => ({
                ...prevState,
                [id_invoice]: normalizedData
            }));
        } catch (error) {
            console.error("Erreur lors de la récupération des détails des commandes : ", error);
        }
    };

    return (
        <Box sx={{width: '80%', margin: "auto", display: "flex", flexDirection: "column"}}>
            {invoices.map((invoice, index) => (
                <Accordion expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}
                           key={invoice.id_invoice}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={`panel${index + 1}bh-content`}
                        id={`panel${index + 1}bh-header`}
                    >
                        <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%'}}>
                            <Typography sx={{flexBasis: {xs: '100%', sm: '45%', md: '23%'}}}>
                                {new Date(invoice.invoice_date).toLocaleDateString()}
                            </Typography>
                            <Typography sx={{flexBasis: {xs: '100%', sm: '45%', md: '23%'}}} color="text.secondary">
                                Facture N°{invoice.id_invoice}
                            </Typography>
                            <Typography sx={{flexBasis: {xs: '100%', sm: '45%', md: '23%'}}} color="text.secondary">
                                {invoice.email}
                            </Typography>
                            <Typography sx={{flexBasis: {xs: '100%', sm: '45%', md: '23%'}}} color="text.secondary">
                                {invoice.total_price} €
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            {Array.isArray(ordersDetails[invoice.id_invoice]) && ordersDetails[invoice.id_invoice].length > 0 ? (
                                ordersDetails[invoice.id_invoice].map((order: any, idx: number) => (
                                    <Box key={idx} sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        border: "1px solid black",
                                        alignItems: "center"
                                    }}>
                                        {order.productImage ? (
                                            <img src={order.productImage} alt={order.productName || "Produit"}
                                                 style={{width: '70px', height: '40px'}}/>
                                        ) : (
                                            <Typography>Aucune image disponible</Typography>
                                        )}
                                        <Typography>{order.productName || "Nom du produit indisponible"}</Typography>
                                        <Typography>{order.quantity} x {order.price.toFixed(2)} €</Typography>
                                        <Typography>{(order.quantity * order.price).toFixed(2)} €</Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography>Chargement des détails des commandes...</Typography>
                            )}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
