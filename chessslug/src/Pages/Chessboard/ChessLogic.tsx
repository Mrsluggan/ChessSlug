
import { request, getAuthToken, setAuthToken } from '../../axios_helper'

export const sendMove = (token: string, data: [][]) => {
    request("GET", "/message", "").then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}