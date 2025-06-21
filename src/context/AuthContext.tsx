import {createContext, useState} from "react";

// Création du contexte d’authentification
export const AuthContext = createContext({
    isLogged: false, // Indique si l’utilisateur est connecté
    setIsLogged: (value: boolean) => {}, // Fonction pour modifier l’état de connexion
    userRole: "", // Rôle de l'utilisateur (admin, user)
    setUserRole: (role: string) => {}
});

// Fournisseur d’authentification global
export const AuthProvider = ({children}: any) => {
    const [isLogged, setIsLogged] = useState(false); // État de connexion
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || ""); // État du rôle de l'utilisateur

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged, userRole, setUserRole}}>
            {children}
        </AuthContext.Provider>
    );
};
