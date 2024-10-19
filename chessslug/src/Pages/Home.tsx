import React from 'react'
import { request, setAuthToken, getAuthToken } from "./../axios_helper"
import { useEffect, useState } from 'react'
import Board from './Chessboard/Board';
export default function Home() {
    const [allCurrentGames, setAllCururentGames] = useState<[]>([])
    const [currentGameId, setCurrentGameId] = useState<number | null>(null);
    
    useEffect(() => {
        if (getAuthToken()) {
            request("GET", "/gameState/all").then((response) => {
                setAllCururentGames(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
                setAuthToken("");
            })
        }
    }, [])

    const joingame = (gameId: any) => {
        console.log(gameId);
        setCurrentGameId(gameId);
    }


    return (

        <div style={{}}>

            {!currentGameId ? (
                <div style={{}}>
                    <div className='choseMode' style={{}}>
                        <div className='modeContainer' style={{}}>
                            <button>Skapa spel</button>
                            <ul style={{}}>
                                {allCurrentGames.length > 0 &&
                                    allCurrentGames.map((data: any, index) => (
                                        <li key={index}>
                                            Schack spel
                                            <button onClick={() => joingame(data.id)}>Join</button>
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
            )}

        </div>
    )

}
