import {FC} from "react";
import {Box} from "@mui/material";
import styled from "styled-components";

interface SearchBarProps {
    searchTerm: string; // Valeur actuelle de la recherche
    setSearchTerm: (value: string) => void; // Mise à jour de la recherche
    onSearch: () => void; // Fonction appelée lors de la recherche
}

const SearchBar: FC<SearchBarProps> = ({searchTerm, setSearchTerm, onSearch}) => {
    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", mt: 2}}>
            <StyledInput
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </Box>
    );
};

// Style pour le champ de recherche
const StyledInput = styled.input`
    width: 300px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #66b3ff;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease-in-out;

    &:focus {
        border-color: #3399ff;
        box-shadow: 0px 0px 8px rgba(51, 153, 255, 0.6);
    }

    &:hover {
        border-color: #4da6ff;
    }
`;

export default SearchBar;
