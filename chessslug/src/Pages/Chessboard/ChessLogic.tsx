
import { request, getAuthToken, setAuthToken } from '../../axios_helper'

export const sendMove = (positionData:any) => {
    request("POST", "/chess", positionData).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}

export const getMove = () => {
    return request("GET", "/getChess", "") 
        .then((response) => {
            return response;  
        })
        .catch((error) => {
            console.log(error);
        });
};