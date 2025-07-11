import React, {useState, useEffect} from 'react';
import './App.css';
import Dashboard from "./pages/B_body/Dashboard";
import ProductDetails from "./pages/B_body/ProductDetails";
import RecapDetails from "./pages/B_body/RecapDetails";
import AdminListOrders from "./pages/B_body/AdminListOrders";
import Home from "./pages/B_body/Home";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import LayoutWithBar from "./components/layouts/LayoutWithBar";
import LayoutWithoutBar from "./components/layouts/LayoutWithoutBar";
import {AuthContext} from './context/AuthContext';
import {ShoppingCartProvider} from "./components/dashboardBody/shoppingCart/ShoppingCartContext";
import ListOrders from "./pages/B_body/ListOrders";
import Register from "./pages/B_body/Register";

// Composant pour gérer les titres dynamiques
const PageTitleUpdater = () => {
    const location = useLocation();

    // Créer un objet avec les titres par défaut
    const pageTitles: Record<string, string> = {
        '/dashboard': 'Dashboard',
        '/product': 'Product Details',
        '/recapOrder': 'Recap Order',
        '/adminListOrders': 'Admin Orders',
        '/listOrders': 'List Orders',
        '/': 'Home',
    };

    // Mettre à jour le titre de la page selon le chemin
    useEffect(() => {
        const pageTitle = pageTitles[location.pathname] || 'Default Title';
        document.title = pageTitle;
    }, [location]);

    return null;
};

function App() {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogged(true);
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <AuthContext.Provider value={{isLogged, setIsLogged, userRole: localStorage.getItem("userRole") || "", setUserRole: (role: string) => localStorage.setItem("userRole", role)}}>
                    <ShoppingCartProvider>
                        <PageTitleUpdater/>
                        <Routes>
                            {isLogged ? (
                                <Route path="/" element={<LayoutWithBar />}>
                                    <Route index element={<Home />} />
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="product/:id" element={<ProductDetails />} />
                                    <Route path="recapOrder" element={<RecapDetails />} />
                                    <Route path="adminListOrders" element={<AdminListOrders />} />
                                    <Route path="listOrders" element={<ListOrders />} />
                                </Route>
                            ) : (
                                <Route path="/" element={<LayoutWithoutBar />}>
                                    <Route index element={<Home />} />
                                    <Route path="register" element={<Register />} />
                                </Route>
                            )}
                        </Routes>
                    </ShoppingCartProvider>
                </AuthContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
