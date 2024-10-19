
import { request } from '../../axios_helper'



export const getMove = async (gameId: number) => {
    try {
        const response = await request("GET", `/gameState/${gameId}`, "");
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const sendMove = async (gameId: number, fX: number, fY: number, tX: number, tY: number) => {
    try {
        const response = await request("POST", `/gameState/${gameId}/move/?startRow=${fX}&startCol=${fY}&endRow=${tX}&endCol=${tY}`, "");

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