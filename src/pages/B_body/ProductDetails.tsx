import {Box, Typography, CircularProgress} from '@mui/material';
import {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import apiSpringBoot from '../../api/apiSpringBoot';

const ProductDetails: FC = () => {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiSpringBoot.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError("Erreur lors de la récupération du produit.");
                console.error("❌ Erreur API:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) return <CircularProgress sx={{display: "block", margin: "auto", mt: 5}}/>;
    if (error) return <Typography color="error" sx={{textAlign: "center", mt: 5}}>{error}</Typography>;
    if (!product) return <Typography sx={{textAlign: "center", mt: 5}}>Produit non trouvé</Typography>;

    return (
        <>
            <Typography variant="h3" sx={{textAlign: "center", m: 2}}>
                {product.name.toUpperCase()}
            </Typography>
            <Box className="product-details-container" sx={{
                width: "80%", margin: "auto", border: "1px solid black", borderRadius: "25px",
                boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.5)"
            }}>
                <Box className="product-details-main" sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 3
                }}>
                    <img src={product.imageUrl} alt={product.name} style={{width: "300px", borderRadius: "10px"}}/>
                    <Box sx={{ml: 5}}>
                        <Typography variant="h5">Détails du produit :</Typography>
                        <ul>
                            <li><strong>Provenance :</strong> {product.country}</li>
                            <li><strong>Appât :</strong> {product.bait}</li>
                            <li><strong>Prix :</strong> {product.price.toFixed(2)} €</li>
                            <li><strong>Stock :</strong> {product.stock} unités</li>
                        </ul>
                    </Box>
                </Box>
                <Box sx={{mt: 3, px: 5}}>
                    <Typography variant="h6">Description :</Typography>
                    <Typography>{product.description}</Typography>
                </Box>
                <Box sx={{mt: 3, px: 5}}>
                    <Typography variant="h6">Côté cuisine :</Typography>
                    <ul>
                        <li className="cooking-tips"><strong>Conseil cuisson :</strong> {product.cook_tips}</li>
                        <li className="cooking-tips"><strong>Conseil accompagnement :</strong> {product.vegetables_tips}
                        </li>
                    </ul>
                </Box>
            </Box>
        </>
    );
};

export default ProductDetails;
