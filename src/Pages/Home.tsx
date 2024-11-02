import React from 'react'
import { request, getUser, getAuthToken } from "./../axios_helper"

import { useEffect, useState, useContext } from 'react'
import { UserLoggedInContext } from '../App';

import Board from './Chessboard/Board';
import { createBoard, joinGame, removeBoard, connectToGame, connectToSocket, gameList, connectToAiGame } from './Chessboard/ChessLogic';
import LoginForm from '../Components/LoginForm/LoginForm';
interface LoginFormProps {
    handleSetLoggedIn: () => void;
}

export default function Home({ handleSetLoggedIn }: LoginFormProps) {
    const [allCurrentGames, setAllCururentGames] = useState<any[]>([]);
    const [currentGameId, setCurrentGameId] = useState<number | null>(null);
    const [newMovementData, setNewMovementData] = useState<any>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [boardData, setBoardData] = useState<any>(null);
    const isLoggedIn = useContext(UserLoggedInContext);
    const [gamemode, setGamemode] = useState<string>("");

    const fetchGames = async () => {
        if (getAuthToken()) {
            try {
                const response = await request("GET", "/gameState/all");
                console.log(response.data);

                setAllCururentGames(response.data);

            } catch (error) {
                localStorage.clear()
            }
        }
    }

    const onMessageReceived = (data: any) => {
        console.log(data);

        // måste hitta bättre lösing? va fan är detta
        if (data === '{"removed":"true"}') {
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

    const onMoveReceived = (data: any) => {
        setNewMovementData(data);
    }

    const joinGameButton = (gameId: number) => {
        if (socket) {
            setGamemode("regularmode");
            connectToGame(gameId, onMessageReceived, onMoveReceived)
            joinGame(gameId)
            setCurrentGameId(gameId);
        }

    }


    useEffect(() => {
        connectToSocket().then(stompClient => {
            setSocket(stompClient)

        })
    }, [isLoggedIn]);


    const createBoardButton = () => {

        createBoard();

    }
    const handleAiButton = async () => {
        let userName = getUser()
        if (socket && userName) {
            setGamemode("aimode")
            let gameId = await connectToAiGame(userName, onMoveReceived, onMoveReceived)
            setCurrentGameId(gameId);
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
                            <h2>Active Games</h2>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <button onClick={createBoardButton}>Create Game</button>
                                <button onClick={handleAiButton}>Battle against Ai</button>
                            </div>
                            <div className="mode-container">
                                {allCurrentGames.length > 0 ? (
                                    <ul className="game-list">
                                        {allCurrentGames.map((game, index) => (
                                            <li key={index} className="game-item">
                                                {game.gameStateName}'s Game <br />
                                                {game.players.length < 2 ? (
                                                    <button onClick={() => joinGameButton(game.id)}>Join</button>
                                                ) : (
                                                    <>Game is full</>
                                                )}
                                                <div style={{ display: "flex" }}>Players:

                                                    {game.players.map((players: any, index: number) => (
                                                        <div key={index}>
                                                            {players.login}
                                                        </div>
                                                    ))}

                                                </div>
                                                {game.gameStateName === getUser() && (
                                                    <button onClick={() => removeBoardButton(game.id)}>Remove Game</button>
                                                )}
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
                            <Board gamemode={gamemode} boardData={boardData} newMovmentData={newMovementData} gameId={currentGameId} />
                        </div>
                    )}
                </>
            ) : (
                <div className="login-prompt"><LoginForm handleSetLoggedIn={handleSetLoggedIn} /></div>
            )}
        </div>

    )

}
