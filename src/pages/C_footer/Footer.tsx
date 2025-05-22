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
                    <p>Tous droits réservés</p>
                    <div className="footer-pecheurlover">
                        <img src={"/logo.png"} alt={"logo Pecheur-Lover"} className={"footer-logo"}/>
                        <p>&copy; 2025 PecheurLover</p>
                    </div>
                    <a href="">Mentions légales</a>
                </div>
            </footer>
        </Box>

    );
};

export default Footer;
