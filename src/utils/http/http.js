import axios from "axios";
const tg = window.Telegram.WebApp
let authToken = window.localStorage.getItem("token");

const baseURL = "https://visitca.travel/api/";

const $host = axios.create({
    baseURL: baseURL
})

const $authHost = axios.create({
    baseURL: baseURL,
});

const updateAuthHeader = (token) => {
    $authHost.defaults.headers.Authorization = `Bearer ${token}`;
};

const RefreshToken = async () => {
    const JWT = window.localStorage.getItem("token");
    console.log(JWT);
    try {
        const response = await axios.post(
            "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api/refresh_token",
            null,
            {
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
            }
        );
        console.log(response);

        authToken = response.data.access_token;
        window.localStorage.setItem("token", authToken);

        updateAuthHeader(authToken);
    } catch (error) {
        console.error("Token yangilash muvaffaqiyatsiz bo'ldi:", error);
    }
};

$authHost.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
});

$authHost.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await RefreshToken();
            return $authHost(originalRequest);
        }

        return Promise.reject(error);
    }
);

$host.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 404) {
            window.localStorage.removeItem('token')
            window.location.reload()
        }
        return Promise.reject(error);
    }
);


setInterval(RefreshToken, 20 * 60 * 1000);

export {$authHost, $host, RefreshToken};
