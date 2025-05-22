import {FC, useEffect} from 'react';
import {Box} from "@mui/material";
import {useLocation} from "react-router-dom";
import ProductSelection from "../../components/ProductSelection";
import ListProductInOrder from "../../components/dashboardBody/aside/ListProductInOrder";
import ProductsList from "../../components/dashboardBody/ProductsList";

const Dashboard: FC<{}> = ({}) => {
    const location = useLocation(); // Hook pour récupérer l’URL actuelle

    useEffect(() => {
        // Si un hash est présent dans l'URL, on scroll automatiquement jusqu’à l’élément correspondant
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }
        }
    }, [location]);

    return (
        <>
            <Box className="dashboard-container" sx={{display: "flex", flexDirection: "row"}}>
                {/* Partie principale du dashboard */}
                <Box className="dashboard-main" sx={{width: "80%", backgroundColor: "#87CEEB"}}>
                    <h1>Notre fish à l'afish</h1>
                    <ProductSelection/>
                    <ProductsList/>
                </Box>

                {/* Sidebar avec les produits sélectionnés */}
                <Box className="dashboard-aside"
                     sx={{width: "20%", backgroundColor: "#c7f2fe", border: "1px solid black"}}>
                    <ListProductInOrder/>
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
