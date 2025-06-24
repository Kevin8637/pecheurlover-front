import '../../styles/LoginStyles.css';
import React, {useState, useEffect, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {createGlobalStyle} from "styled-components";
import apiSpringBoot from "../../api/apiSpringBoot";

const Home = () => {
    const [saumons, setSaumons] = useState([]);
    const navigate = useNavigate();
    const {isLogged, setIsLogged, setUserRole} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const GlobalStyle = createGlobalStyle`
        body {
            background-color: #87CEEB;
            height: 100vh;
            overflow: hidden;
        }
    `;

    interface LoginResponse {
        token: string;
        role : string;
    }

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await apiSpringBoot.post<LoginResponse>("/auth/login", {
                email,
                password
            });

            const token = response.data.token;
            const role = response.data.role;
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", role);
            setIsLogged(true);
            setUserRole(role);
            navigate("/dashboard");
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setError("L'email ou le mot de passe est incorrect");
            } else if (err.response && err.response.data?.message) {
                setError(err.response.data.message);
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
                        <p className="title">Se connecter</p>
                        <form onSubmit={handleLogin}>
                            <div className="form_group">
                                <label className="sub_title">Email</label>
                                <input placeholder="Entre ton email" className="form_style" type="email" value={email}
                                       onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="form_group">
                                <label className="sub_title">Mot de passe</label>
                                <input placeholder="Entre ton mot de passe" className="form_style" type="password"
                                       value={password} onChange={(e) => setPassword(e.target.value)}
                                       required/>
                            </div>
                            {error && <p style={{color: "red", marginTop: "10px"}}>{error}</p>}
                            <button type="submit" className="btn">SE CONNECTER</button>
                            <p>Pas encore de compte ? <Link to="/register">S'inscrire ici</Link></p>
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

export default Home
