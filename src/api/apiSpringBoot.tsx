import axios, {AxiosRequestConfig} from "axios";

// Création de l'instance Axios
const apiSpringBoot = axios.create({
    baseURL: "http://localhost:8080/"
});

// Interceptor pour injecter automatiquement le token JWT
apiSpringBoot.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        if (config.headers && typeof config.headers.set === "function") {
            // Si AxiosHeaders (v1.6+)
            config.headers.set("Authorization", `Bearer ${token}`);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// (Optionnel) Fonction utilitaire générique si tu veux l'utiliser ailleurs
export const getData = (url: string, config: AxiosRequestConfig = {}) => {
    return apiSpringBoot.get(url, config)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Erreur API Spring Boot:", error);
            throw error;
        });
};

export default apiSpringBoot;
