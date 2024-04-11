import axios from "axios";

let authToken = null;

const baseURL = "https://visitca.travel/api/";

const $host = axios.create({
    baseURL: baseURL
});

const $authHost = axios.create({
    baseURL: baseURL,
});

const updateAuthHeader = (token) => {
    $authHost.defaults.headers.Authorization = `Bearer ${token}`;
};

const RefreshToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    authToken = urlParams.get('token');

    if (!authToken) {
        console.error("Token not found in URL");
        return;
    }
    console.log(authToken)
    try {
        const response = await axios.post(
            "https://visitca.travel/api/refresh_token",
            null,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        console.log(response)
        authToken = response.data.access_token;
        urlParams.set('token', authToken);

        // Construct the new URL with updated token and replace the current one
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, document.title, newUrl);

        updateAuthHeader(authToken);
        console.log('erwrwer')
    } catch (error) {
        console.error("Failed to refresh token:", error);
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
        if (error.response?.status === 404 ) {
            window.localStorage.clear()
            window.location.reload()
        }
        return Promise.reject(error);
    }
);

setInterval(RefreshToken, 60 * 20 * 1000    );

export { $authHost, $host, RefreshToken };
