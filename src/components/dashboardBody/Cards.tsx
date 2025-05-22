import {FC, useContext, useEffect, useState} from 'react';
import {ProductItem} from "../../@types/ProductItem";
import {Box, Button, Grid, Typography} from "@mui/material";
import apiSpringBoot from '../../api/apiSpringBoot';
import styled from 'styled-components';
import {ShoppingCartContext} from "./shoppingCart/ShoppingCartContext";
import {useNavigate} from "react-router-dom";

interface CardsProps {
    products: ProductItem[]; // Liste des produits à afficher
}

const Cards = ({products}: CardsProps) => {
    const cartContext = useContext(ShoppingCartContext); // Contexte du panier
    const [allProducts, setAllProducts] = useState<ProductItem[] | null>(null); // Tous les produits récupérés
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs
    const navigate = useNavigate(); // Permet la navigation vers une autre page

    // Redirection vers la page de détail d’un produit
    const viewDetailsProduct = (id: number) => {
        navigate(`/product/${id}`);
    };

    // Capitalise la première lettre d’un mot
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    // Récupère la liste complète des produits depuis l’API
    const hydrateCollection = async () => {
        try {
            const response = await apiSpringBoot.get<ProductItem[]>("products/all");
            setAllProducts(response.data);
        } catch (err) {
            setError("Erreur lors du chargement des produits");
            console.error(err);
        }
    };

    // Récupération des produits au montage du composant
    useEffect(() => {
        hydrateCollection();
    }, []);

    // Affichage d’un message d’erreur
    if (error) return <Typography color="error">{error}</Typography>;
    // Affichage du chargement si les données ne sont pas encore prêtes
    if (!allProducts) return <Typography>Chargement...</Typography>;

    // Message si aucun produit n’est disponible
    if (allProducts.length === 0) {
        return <Typography>Aucun produit disponible.</Typography>;
    }

    // Vérifie la disponibilité du contexte
    if (!cartContext) {
        return <Typography color="error">Erreur : Contexte du panier non disponible</Typography>;
    }

    const {addShoppingCart} = cartContext; // Fonction pour ajouter un produit au panier

    return (
        <Box mt={2}>
            <Grid container spacing={3} sx={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Grid item key={product.id_product} sx={{textAlign: "center", margin: "30px", height: "100%"}}>
                            <StyledCard>
                                <div className="card">
                                    <img className="card-img" src={product.imageUrl} alt={product.name}/>
                                    <Typography variant="h5" className="title">
                                        {capitalizeFirstLetter(product.name)}
                                    </Typography>
                                    <Box className="card-info">
                                        <Typography variant="h6" className="price">
                                            Prix : {product.price}€
                                        </Typography>
                                        <Typography variant="subtitle1" className="stock">
                                            Quantité restante : {product.stock}
                                        </Typography>
                                        <Button onClick={() => viewDetailsProduct(product.id_product)}>
                                            En savoir plus
                                        </Button>
                                        <Button variant="contained" color="primary"
                                                onClick={() => addShoppingCart(product)}>
                                            Mettre au panier
                                        </Button>
                                    </Box>
                                </div>
                            </StyledCard>
                        </Grid>
                    ))
                ) : (
                    <Typography>Aucun produit trouvé.</Typography>
                )}
            </Grid>
        </Box>
    );
}

// Style personnalisé pour les cartes produit
const StyledCard = styled.div`
    .card {
        --background: linear-gradient(to left, #f7ba2b 0%, #ea5358 100%);
        width: 190px;
        height: 254px;
        padding: 5px;
        border-radius: 1rem;
        overflow: hidden;
        background: var(--background);
        position: relative;
        z-index: 1;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s ease-in-out;
    }

    .card:hover {
        transform: scale(1.05);
    }

    .card::after {
        position: absolute;
        content: "";
        top: 30px;
        left: 0;
        right: 0;
        z-index: -1;
        height: 100%;
        width: 100%;
        transform: scale(0.8);
        filter: blur(25px);
        background: var(--background);
        transition: opacity 0.5s;
    }

    .card-info {
        --color: #181818;
        background: var(--color);
        color: var(--color);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.5s ease;
        padding: 10px;
        box-sizing: border-box;
    }

    .card:hover::after {
        opacity: 0.1;
    }

    .card:hover .card-info {
        opacity: 1;
        color: #f7ba2b;
    }

    .card .title {
        font-weight: bold;
        letter-spacing: .1em;
    }

    .card .price {
        font-weight: normal;
        letter-spacing: 0.05em;
        margin-top: 5px;
    }

    .card-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 1rem;
        transition: opacity 0.5s ease, border-radius 0.3s ease;
    }

    .card:hover .card-img {
        opacity: 0.3;
        border-radius: 0.5rem;
    }
`;

export default Cards;
