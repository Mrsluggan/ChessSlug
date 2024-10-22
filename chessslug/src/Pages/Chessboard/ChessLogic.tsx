
import { request } from '../../axios_helper'

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient: any = null;

export const connectWebSocket = (gameId: number, onMessageReceived: (data: any) => void) => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log("WebSocket ansluten");
        stompClient.subscribe(`/topic/gamestate/${gameId}`, (message: any) => {
            const data = JSON.parse(message.body);
            onMessageReceived(data);
        });
    }, (error: any) => {
        console.error("WebSocket-anslutning misslyckades: ", error);
    });
};

export const sendMoveSocket = (gameId: number, selectedTile: any, position: any) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(`/app/gamestate/${gameId}`, {}, JSON.stringify({ selectedTile, position }));
    } else {
        console.error("WebSocket-anslutning är inte aktiv");
    }
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.disconnect(() => {
            console.log("WebSocket frånkopplad");
        });
    }
};

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
        const response = await request("GET", `/create/gameState/`, "");
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const joinBoard = async (gameId: number) => {
    try {
        const response = await request("PUT", `/gameState/${gameId}`, "");
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const removeBoard = async (gameId: number) => {
    try {
        const response = await request("DELETE", `/gameState/${gameId}`, "");
        return response;
    } catch (error) {
        console.log(error);
    }
};