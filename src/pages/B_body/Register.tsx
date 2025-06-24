import React, {FC, useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {createGlobalStyle} from "styled-components";
import apiSpringBoot from "../../api/apiSpringBoot";

const Register: FC<{}> = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [saumons, setSaumons] = useState([]);
    const navigate = useNavigate();

    const GlobalStyle = createGlobalStyle`
        body {
            background-color: #87CEEB;
            height: 100vh;
            overflow: hidden;
        }
    `;

    useEffect(() => {
        const handleClick = (event: any) => {
            const newSaumon = {
                id: Date.now(),
                x: event.clientX - 100,
                y: event.clientY - 100,
            };

            setSaumons((prevSaumons) => [...prevSaumons, newSaumon]);
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const isPasswordValid = (password: string) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{12,}$/;
            return regex.test(password);
        };
        if (!isPasswordValid(password)) {
            setError("Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        try {
            await apiSpringBoot.post("/auth/register", {
                email,
                password
            });
            navigate("/");
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Email déjà utilisé");
            } else {
                setError("Erreur réseau ou serveur");
            }
        }
    };

    return (
        <>
            <GlobalStyle/>
            <h1>Bienvenue chez Pêcheur Lover</h1>
            <div className="app">
                <div className="container">
                    <div className="form_area">
                        <p className="title">S'inscrire</p>
                        <form onSubmit={handleRegister}>
                            <div className="form_group">
                                <label className="sub_title">Email</label>
                                <input placeholder="Entre ton email" className="form_style" type="email" value={email}
                                       onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="form_group">
                                <label className="sub_title">Mot de passe</label>
                                <input placeholder="Entre ton mot de passe" className="form_style" type="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <div className="form_group">
                                <label className="sub_title">Confirmation du mot de passe</label>
                                <input placeholder="Entre ton mot de passe" className="form_style"
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)} type="password" required/>
                            </div>
                            {error && (
                                <p style={{
                                    color: "indianred",
                                    margin: "10px 0",
                                    fontSize: "0.9rem",
                                    wordWrap: "break-word",
                                    whiteSpace: "normal",
                                    width: "100%",
                                    maxWidth: "100%",
                                    overflowWrap: "break-word"
                                }}>
                                    {error}
                                </p>
                            )}

                            <button type="submit" className="btn">S'INSCRIRE</button>
                            <p>Déjà un compte ? <Link to="/">Se connecter ici</Link></p>
                        </form>
                    </div>
                </div>
                {saumons.map((saumon: any) => (
                    <div key={saumon.id} className="saumon-wrapper" style={{left: saumon.x, top: saumon.y}}>
                        <div className="saumon-container">
                            <svg height="200px" width="200px" viewBox="0 0 512 512" fill="#EE8B8B">
                                <path d="M196.749,306.744c-19.5,21.5-48,32-48,32l-32-40l16-8L196.749,306.744z"></path>
                                <path
                                    d="M308.749,204.744c0,0-22.5-23.625-48-42c0,0-16,16-48,30l24,18L308.749,204.744z"></path>
                                <path
                                    d="M500.749,242.744c-20,6-32,32-32,32h32c-18.667,15.334-85.333,48-160,48s-142.667,5.334-216-32 c-55.831-28.424-55,32-120,32c0,0,16-41,16-64s-16-64-16-64c65,0,63,58,120,32s197-32,224-32S474.749,229.744,500.749,242.744z"></path>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Register;
