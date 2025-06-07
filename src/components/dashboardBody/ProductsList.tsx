import {FC, useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import apiSpringBoot from "../../api/apiSpringBoot";

const ProductsList: FC = () => {
    const [products, setProducts] = useState<any[]>([]); // Liste de tous les produits
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Produits filtrés selon la recherche
    const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche

    // Récupération des produits à l'initialisation
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiSpringBoot.get<any[]>("/products/all");
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
            }
        };
        fetchProducts();
    }, []);

    // Mise à jour des produits filtrés à chaque modification du terme de recherche
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, products]);

    // Permet un filtrage manuel au clic
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
            return;
        }
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div id="products">
            <h1>Nos produits</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}/>
            <Cards products={filteredProducts}/>
        </div>
    );
};

export default ProductsList;
