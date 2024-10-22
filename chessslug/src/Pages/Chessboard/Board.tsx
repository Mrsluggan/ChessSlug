import React, { useState, useEffect } from 'react';
import BoardTile from './BoardTile';
import { sendMove, getMove } from "./ChessLogic"
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
interface BoardProps {
    gameId: number
}
export default function Board({ gameId }: BoardProps) {
    const [boardTiles, setBoardTiles] = useState<Array<string>>([]);
    const [boardPawnsPosition, setBoardPawnsPosition] = useState<({ color: string, name: string })[][]>([]);
    const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        stompClient.subscribe('/topic/gamestate/'+gameId, (message) => {
            handleGetData();
        });
    });

    useEffect(() => {
        handleGetData();
    }, []);

    const initializeBoard = () => {
        let colorCheck = false;
        let newBoardTiles = [];

        for (let xIndex = 0; xIndex < 8; xIndex++) {
            for (let yIndex = 0; yIndex < 8; yIndex++) {
                newBoardTiles.push(colorCheck ? "green" : "black");
                colorCheck = !colorCheck;
            }
            colorCheck = !colorCheck;
        }
        setBoardTiles(newBoardTiles);
    }
    const handlePawnMove = async (indexNumber: number) => {
        if (selectedTile && gameId) {
            let position = { row: Math.floor(indexNumber / 8), col: indexNumber % 8 };
            await sendMove(gameId, selectedTile.row, selectedTile.col, position.row, position.col);

            stompClient.send("/app/gamestate/" + gameId, {}, JSON.stringify({ message: "test" }));


            handleGetData();
            setBoardTiles([]);
            setSelectedTile(null);
        } else {
            console.log("pjäsen vald!");
            let startPosition = { row: Math.floor(indexNumber / 8), col: indexNumber % 8 };
            setSelectedTile(startPosition);
        }
    }

    const handleGetData = () => {
        getMove(gameId).then((data: any) => {
            if (data) {
                let newBoardPawnsPosition: any[] = [];
                data.data.board.squares.forEach((element: any) => {
                    newBoardPawnsPosition.push(element)
                });
                setBoardPawnsPosition(newBoardPawnsPosition)

            }
        });
    };

    return (
        <>
            <div>
            <button onClick={() => initializeBoard()}>Starta</button>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, auto)", alignContent: "center", justifyContent: "center" }}>
                    {boardTiles.length > 0 &&
                        boardTiles.map((color, index) => (
                            <BoardTile handlePawnMove={handlePawnMove} key={index} color={color} tileIndex={index} initialPawn={boardPawnsPosition[Math.floor(index / 8)][index % 8]} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
