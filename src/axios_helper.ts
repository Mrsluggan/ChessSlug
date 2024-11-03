
import axios from "axios";

axios.defaults.baseURL = "https://chessslug-backend-production.up.railway.app/";
axios.defaults.headers.common["Content-Type"] = "application/json";
export const setUser = (user: { login: string, firstName: string, lastName: string }) => {
    localStorage.setItem("user", JSON.stringify(user));
}
export const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.login;
}
export const getAuthToken = (): string | null => {
    return window.localStorage.getItem("auth_token");
}
export const removeToken = (): void => {
    window.localStorage.removeItem("auth_token");
}
export const setAuthToken = (token: string) => {
    window.localStorage.setItem("auth_token", token);
}

export const request = async (method: string, url: string, data?: any) => {

    const authToken = getAuthToken();

    // Set up headers if authToken exists
    const headers: Record<string, string> = {};
    if (authToken && authToken !== "null") {
        headers.Authorization = `Bearer ${authToken}`;
    }

    // Return the axios request
    return await axios({
        method,
        url,
        data: data || null,  // Handle cases where data might be undefined
        headers
    });


}
