
import axios from "axios";
import { get } from "http";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Content-Type"] = "application/json";


export const getAuthToken = (): string | null => {
    return window.localStorage.getItem("auth_token");
}

export const setAuthToken = (token: string) => {
    window.localStorage.setItem("auth_token",token);
}
export const request = (method: string, url: string, data: string) => {
    let headers = {
        
    }
    const authToken = getAuthToken();
    if (authToken !== null && authToken !== "null") {

        headers = {
            Authorization: `Bearer ${authToken}`
        }

    }
    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    })
}
