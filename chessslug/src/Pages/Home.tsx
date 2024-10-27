import React from 'react'
import { request, setAuthToken, getAuthToken } from "./../axios_helper"

import { useEffect, useState, useContext } from 'react'
import { UserLoggedInContext } from '../App';

import Board from './Chessboard/Board';
import { createBoard, joinGame, removeBoard, connectToGame, connectToSocket, gameList } from './Chessboard/ChessLogic';
import { create } from 'domain';
export default function Home() {
    const [allCurrentGames, setAllCururentGames] = useState<any[]>([]);
    const [currentGameId, setCurrentGameId] = useState<number | null>(null);
    const [newMovementData, setNewMovementData] = useState<any>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [boardData, setBoardData] = useState<any>(null);
    const isLoggedIn = useContext(UserLoggedInContext);

    const fetchGames = async () => {
        if (getAuthToken()) {
            try {
                const response = await request("GET", "/gameState/all");
                setAllCururentGames(response.data);

            } catch (error) {
                localStorage.clear()
            }
        }
    }

    const onMessageReceived = (data: any) => {
        if (data.removed) {
            setBoardData(null);
            setCurrentGameId(null);
            alert("game has been removed!");
            window.location.reload();
        }
        
        setBoardData(data);
    }
    const onNewGameRecived = (data: any) => {
        setAllCururentGames((prev) => [...prev, data]);
    }
    const onStartingGame = (data: any) => {
        setAllCururentGames((prev) => [...prev, data]);
    }
    const onMoveReceived = (data: any) => {
        setNewMovementData(data);
    }

    const joinGameButton = (gameId: number) => {
        if (socket) {
            connectToGame(gameId, onMessageReceived, onMoveReceived)
            joinGame(gameId)
            setCurrentGameId(gameId);
        }

    }


    useEffect(() => {
        connectToSocket().then(stompClient => setSocket(stompClient))
    }, [isLoggedIn]);


    const createBoardButton = () => {
        if (socket) {
            createBoard()

        }

    }

    const removeBoardButton = (gameId: number) => {
        setAllCururentGames(prevGames => prevGames.filter(game => game.id !== gameId));
        removeBoard(gameId);
    }
    useEffect(() => {
        if (socket) {
            gameList(onNewGameRecived);

            fetchGames();
        }
    }, [socket]);



    return (

        <div className="game-container">
            {isLoggedIn ? (
                <>


                    {!currentGameId ? (

                        <div className="choose-mode">
                            <div style={{ margin: "0", padding: "0" }}>
                                <h2>Active Games</h2>
                                <button onClick={createBoardButton}>Create Game</button>

                            </div>
                            <div className="mode-container">
                                {allCurrentGames.length > 0 ? (
                                    <ul className="game-list">
                                        {allCurrentGames.map((game, index) => (
                                            <li key={index} className="game-item">
                                                Chess Game
                                                <button onClick={() => joinGameButton(game.id)}>Join</button>
                                                <div>Players:</div>

                                                <button onClick={() => removeBoardButton(game.id)}>Remove Board</button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No active games available</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="game-board">
                            <Board boardData={boardData} newMovmentData={newMovementData} gameId={currentGameId} />
                        </div>
                    )}
                </>
            ) : (
                <div className="login-prompt">Please log in to access the game</div>
            )}
        </div>

    )

}
