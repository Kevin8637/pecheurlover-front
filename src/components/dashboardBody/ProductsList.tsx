import {FC, useEffect, useState} from "react";
import {Box} from "@mui/material";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import apiSpringBoot from "../../api/apiSpringBoot";

const ProductsList: FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

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


    return (
        <Box>
            <h1>Nos produits</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}/>
            <Cards products={filteredProducts}/>
        </Box>
    );
};

export default ProductsList;
