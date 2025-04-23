import {FC} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../../pages/A_header/Header";
import Footer from "../../pages/C_footer/Footer";
import {Box} from "@mui/material";

const LayoutWithBar: FC<{}> = ({}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Header/>
            <Box sx={{flex: 1}}>
                <Outlet/>
            </Box>
            <Footer/>
        </Box>
    );
};

export default LayoutWithBar;
