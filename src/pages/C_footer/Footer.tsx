import {FC} from 'react';
import {Box} from "@mui/material";

const Footer: FC<{}> = ({}) => {
    return (
        <Box
            sx={{
                position: window.location.pathname === "/" ? "fixed" : "relative",
                bottom: window.location.pathname === "/" ? 0 : "auto",
                left: 0,
                right: 0,
                marginTop:"20px",
                bgcolor: "#06BEF0",
                border: "1px solid black",
            }}
        >
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 PecheurLover</p>
                    <img src={"/logo.png"} alt={"logo"} className={"footer-logo"}/>
                    <p>Tous droits réservés</p>
                    <a href="">Mentions légales</a>
                </div>
            </footer>
        </Box>

    );
};

export default Footer;
