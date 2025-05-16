import {FC} from 'react';
import {Box} from "@mui/material";
import ProductSelection from "../../components/ProductSelection";
import ListProductInOrder from "../../components/dashboardBody/aside/ListProductInOrder";
import ProductsList from "../../components/dashboardBody/ProductsList";
import Footer from "../C_footer/Footer";

const Dashboard: FC<{}> = ({}) => {
    return (
        <>
            <Box sx={{display: "flex", flexDirection: "row"}}>
                <Box sx={{width: "80%", backgroundColor: "#87CEEB"}}>
                    <h1>Notre fish à l'afish</h1>
                    <ProductSelection/>
                    <ProductsList/>
                </Box>
                <Box sx={{width: "20%", backgroundColor: "#c7f2fe", border: "1px solid black"}}>
                    <ListProductInOrder/>
                </Box>
            </Box>
        </>

    );
};

export default Dashboard;
