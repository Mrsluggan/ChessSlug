
import { request } from '../../axios_helper'

export const sendMove = (positionData: any) => {
    console.log(positionData);

    request("POST", "/chess", positionData).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}

export const getMove = async () => {
    try {
        const response = await request("GET", `/chessboards/1`, "");
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const createBoard = async () => {
    try {
        const response = await request("GET", "/createChess", "");
        return response;
    } catch (error) {
        console.log(error);
    }
};