import {createContext, useState} from "react";

// Création du contexte d’authentification
export const AuthContext = createContext({
    isLogged: false, // Indique si l’utilisateur est connecté
    setIsLogged: (value: boolean) => {
    } // Fonction pour modifier l’état de connexion
});

// Fournisseur d’authentification global
export const AuthProvider = ({children}: any) => {
    const [isLogged, setIsLogged] = useState(false); // État de connexion

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged}}>
            {children}
        </AuthContext.Provider>
    );
};
