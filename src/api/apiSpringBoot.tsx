import axios, {AxiosRequestConfig} from "axios";

// Création d'une instance Axios configurée pour pointer vers l'API Spring Boot
const apiSpringBoot = axios.create({
    baseURL: "http://localhost:8080/"
});

// Intercepteur pour ajouter automatiquement le token JWT dans les requêtes sortantes
apiSpringBoot.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        // Si les headers existent et qu'on peut les modifier, on y ajoute le token
        if (config.headers && typeof config.headers.set === "function") {
            config.headers.set("Authorization", `Bearer ${token}`);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Fonction utilitaire pour faire un GET et extraire la data directement
export const getData = (url: string, config: AxiosRequestConfig = {}) => {
    return apiSpringBoot.get(url, config)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Erreur API Spring Boot:", error);
            throw error;
        });
};

export default apiSpringBoot;
