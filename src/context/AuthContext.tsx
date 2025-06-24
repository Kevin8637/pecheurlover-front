import {createContext, useState} from "react";

export const AuthContext = createContext({
    isLogged: false,
    setIsLogged: (value: boolean) => {},
    userRole: "",
    setUserRole: (role: string) => {}
});


export const AuthProvider = ({children}: any) => {
    const [isLogged, setIsLogged] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged, userRole, setUserRole}}>
            {children}
        </AuthContext.Provider>
    );
};
