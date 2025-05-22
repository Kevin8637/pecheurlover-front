import {FC} from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const ProductSelection: FC<{}> = ({}) => {
    return (
        <>
            <Box
                className="product-selection"
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "50px"
                }}
            >
                <img className="fish" src="/fish.jpg" alt="poisson mis en avant"/>
                <Box
                    className="product-description"
                    sx={{
                        width: "50%",
                        marginLeft: "50px",
                        height: "300px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    }}
                >
                    <h3>Nos saumons</h3>
                    <Typography>Le saumon est « anadrome » (migrateur pour se reproduire), amphibiotique (adapté à la
                        vie dans deux milieux aquatiques), potamotoque (il se reproduit en rivière) et thalassotrophe
                        (il grandit en mer) : il naît en eau douce en eaux courantes près des sources, puis descend
                        instinctivement jusqu'à la mer où il vit un à trois ans, puis retourne dans le fleuve dans
                        lequel il est né (phénomène dénommé « Homing ») pour frayer (se reproduire) et généralement
                        mourir après la ponte (certaines populations de quelques espèces peuvent cependant passer toute
                        leur vie en eau douce)</Typography>
                    <Typography>Prix : 10.28 €</Typography>
                </Box>
            </Box>

            <hr/>
        </>
    );
};

export default ProductSelection;
