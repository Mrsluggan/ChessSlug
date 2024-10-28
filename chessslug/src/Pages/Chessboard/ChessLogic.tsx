
import { request, getAuthToken } from '../../axios_helper'

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
const socket = new SockJS("http://localhost:8080/ws");
const stompClient = Stomp.over(socket);
stompClient.debug = f => f;
var stompFailureCallback = function (error: any) {
    console.log('STOMP: ' + error);
    setTimeout(connectToSocket, 10000);
    console.log('STOMP: Reconecting in 10 seconds');
};

export const connectToGame = (gameId: number, onMessageReceived: (data: any) => void, onMoveReceived: (data: any) => void) => {

    stompClient.subscribe(`/topic/gameState/${gameId}`, (message: any) => {
        const data = JSON.parse(message.body);
        onMessageReceived(data);
    });
    stompClient.subscribe(`/topic/gameState/move/${gameId}`, (message: any) => {
        
        const data = JSON.parse(message.body);
        onMoveReceived(data);
    });

};
export const connectToSocket = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        stompClient.connect({}, () => {

            console.log("connected");
            resolve(stompClient);

        }, (error: any) => {
            console.error("WebSocket connection failed: ", error);
            reject(error); 
        },stompFailureCallback);
    });
};
export const gameList = (onNewGameRecived: (data: any) => void) => {
    stompClient.subscribe(`/topic/gameState/gameList/`, (message: any) => {
        console.log(message.body);
        
        const data = JSON.parse(message.body);
        onNewGameRecived(data);
    });
    

};

export const sendMoveSocket = (gameId: number, startPosition: any, endPosition: any, player: { login: string, id: number, color: string }) => {
    
    if (stompClient && stompClient.connected) {
        stompClient.send(`/app/gameState/move/${gameId}`, {}, JSON.stringify({ startPosition, endPosition, player }));
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

export const startGame = async (gameId: number) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(`/app/gameState/start/${gameId}`, {}, JSON.stringify({ token: getAuthToken() }));
    } else {
        console.error("WebSocket-anslutning är inte aktiv");
    }
};
export const joinGame = async (gameId: number) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(`/app/gameState/join/${gameId}`, {}, JSON.stringify({ token: getAuthToken() }));
    } else {
        console.error("WebSocket-anslutning är inte aktiv");
    }
};

export const createBoard = async () => {
    try {

        if (stompClient && stompClient.connected) {
            stompClient.send(`/app/create/gameState/`, {}, JSON.stringify({ token: getAuthToken() }));
        } else {
            console.error("WebSocket-anslutning är inte aktiv");
        }

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


