
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Content-Type"] = "application/json";

export const request = (method: string, url: string, data: string) => {
    return axios({
        method: method,
        url: url,
        data: data
    })
}