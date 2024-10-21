import React from 'react'
import { request, setAuthToken, getAuthToken } from "./../axios_helper"

import { useEffect, useState, useContext } from 'react'
import { UserLoggedInContext } from '../App';

import Board from './Chessboard/Board';
import { createBoard, joinBoard,removeBoard } from './Chessboard/ChessLogic';
export default function Home() {
    const [allCurrentGames, setAllCururentGames] = useState<[]>([])
    const [currentGameId, setCurrentGameId] = useState<number | null>(null);
    const isLoggedIn = useContext(UserLoggedInContext);

    useEffect(() => {
        console.log(isLoggedIn);

        if (getAuthToken()) {
            request("GET", "/gameState/all").then((response) => {
                setAllCururentGames(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
                setAuthToken("");
            })
        }
    }, [isLoggedIn])

    const joingame = (gameId: number) => {
        joinBoard(gameId)
        setCurrentGameId(gameId);
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
                            <Board gameId={currentGameId} />
                        </div>
                    )}</>
            ) : (
                <div>fuck u</div>
            )}


        </div>
    )

}
