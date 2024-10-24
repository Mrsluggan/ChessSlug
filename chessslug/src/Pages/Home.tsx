import React from 'react'
import { request, setAuthToken, getAuthToken } from "./../axios_helper"

import { useEffect, useState, useContext } from 'react'
import { UserLoggedInContext } from '../App';

import Board from './Chessboard/Board';
import { createBoard, joinGame, removeBoard, connectToGame, connectToSocket, gameList } from './Chessboard/ChessLogic';
export default function Home() {
    const [allCurrentGames, setAllCururentGames] = useState<any[]>([]);
    const [currentGameId, setCurrentGameId] = useState<number | null>(null);
    const [newMovementData, setNewMovementData] = useState<any>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const isLoggedIn = useContext(UserLoggedInContext);
    const onMessageReceived = (data: any) => {
        console.log(data);
        
        setNewMovementData(data);
    }
    const onNewGameRecived = (data: any) => {
        setAllCururentGames((prev) => [...prev, data]);
    }
    const onJoiningGame = (data: any) => {
        setCurrentGameId(data.gameId);
    }
    const onStartingGame = (data: any) => {
        setAllCururentGames((prev) => [...prev, data]);
    }
    useEffect(() => {
        const fetchGamesAndConnect = async () => {
            if (getAuthToken()) {
                try {
                    const response = await request("GET", "/gameState/all");
                    setAllCururentGames(response.data);

                    await connectToSocket().then(stompClient => setSocket(stompClient))
                } catch (error) {
                    setAuthToken("");
                }
            }
        }

        fetchGamesAndConnect();
    }, [isLoggedIn]);


    useEffect(() => {
        if (socket) {
            gameList(onNewGameRecived);
        }
    }, [socket]);




    const joingame = (gameId: number) => {
        if (socket) {
            connectToGame(gameId, onMessageReceived)
            joinGame(gameId)
            setCurrentGameId(gameId);
        }


    }
    const createGame = () => {
        createBoard()
    }



    return (

        <div style={{}}>
            {isLoggedIn ? (
                <>
                    {!currentGameId ? (
                        <div style={{}}>
                            <div className='choseMode' style={{}}>
                                <div className='modeContainer' style={{}}>
                                    <button onClick={createGame}>Skapa spel</button>
                                    <ul style={{}}>
                                        {allCurrentGames.length > 0 &&
                                            allCurrentGames.map((data: any, index) => (
                                                <li key={index}>
                                                    Schack spel
                                                    <button onClick={() => joingame(data.id)}>Join</button><br />
                                                    Spelare
                                                    {data.players.map((element: any, index: number) => (
                                                        <div key={index}>{element.login}</div>
                                                    ))}
                                                    <button onClick={() => removeBoard(data.id)}>Ta bort bräde</button>
                                                </li>
                                            ))

                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                    ) : (

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Board newMovmentData={newMovementData} gameId={currentGameId} />
                        </div>
                    )}</>
            ) : (
                <div>fuck u</div>
            )}


        </div>
    )

}
