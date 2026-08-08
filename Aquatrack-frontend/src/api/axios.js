import axios from "axios";

// ==========================================
// Axios Instance
// ==========================================

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ==========================================
// Public Endpoints
// ==========================================

const publicEndpoints = [

    "/auth/login",

    "/auth/forgot-password",

    "/auth/reset-password",

    "/property-registration",

];

// ==========================================
// Attach JWT Token
// ==========================================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        const isPublicEndpoint = publicEndpoints.some(

            (endpoint) => config.url?.startsWith(endpoint)

        );

        if (token && !isPublicEndpoint) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("email");

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);

export default api;