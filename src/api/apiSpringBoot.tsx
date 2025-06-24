import axios, {AxiosRequestConfig} from "axios";

const apiSpringBoot = axios.create({
    baseURL: "http://localhost:8080/"
});

apiSpringBoot.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        if (config.headers && typeof config.headers.set === "function") {
            config.headers.set("Authorization", `Bearer ${token}`);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getData = (url: string, config: AxiosRequestConfig = {}) => {
    return apiSpringBoot.get(url, config)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Erreur API Spring Boot:", error);
            throw error;
        });
};

export default apiSpringBoot;
