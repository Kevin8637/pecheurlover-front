import {FC} from "react";
import {Box} from "@mui/material";
import styled from "styled-components";

interface AdminSearchBarProps {
    searchEmail: string;
    setSearchEmail: (value: string) => void;
}

const AdminSearchBar: FC<AdminSearchBarProps> = ({searchEmail, setSearchEmail}) => {
    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: 2}}>
            <StyledInput
                type="email"
                placeholder="Rechercher par email..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
            />
        </Box>
    );
};

// Champ input stylisé avec styled-components
const StyledInput = styled.input`
    width: 250px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #66b3ff;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease-in-out;
    margin-bottom: 10px;

    &:focus {
        border-color: #3399ff;
        box-shadow: 0px 0px 8px rgba(51, 153, 255, 0.6);
    }

    &:hover {
        border-color: #4da6ff;
    }
`;

export default AdminSearchBar;
