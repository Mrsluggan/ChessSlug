import React, { useState, useEffect } from 'react';
import BoardTile from './BoardTile';
import { getMove, startGame, sendMoveSocket } from "./ChessLogic"


interface BoardProps {
    gameId: number,
    newMovmentData: any

}
export default function Board({ gameId, newMovmentData }: BoardProps) {
    const [boardTiles, setBoardTiles] = useState<Array<string>>([]);
    const [boardPawnsPosition, setBoardPawnsPosition] = useState<({ color: string, name: string })[][]>(
        Array(8).fill(null).map(() => Array(8).fill({ color: "", name: "" }))
    ); const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);

    const [currentPlayer, setCurrentPlayer] = useState<{ login: string, id: number, color: string }>();
    const [playerColor, setPlayerColor] = useState<string>("white");

    const [gameRunning, setGameRunning] = useState<boolean>(false);





    useEffect(() => {

        if (newMovmentData) {


            if (newMovmentData.startPosition && newMovmentData.endPosition) {
                movePiece(newMovmentData.startPosition, newMovmentData.endPosition);
            }
            if (newMovmentData.currentPlayer && newMovmentData.gameRunning) {
                setCurrentPlayer(newMovmentData.currentPlayer);
                setGameRunning(newMovmentData.gameRunning);
            }


        }


    }, [newMovmentData]);

    const initializeBoard = () => {
        let colorCheck = false;
        let newBoardTiles = [];
        handleGetData();
        for (let xIndex = 0; xIndex < 8; xIndex++) {
            for (let yIndex = 0; yIndex < 8; yIndex++) {
                newBoardTiles.push(colorCheck ? "green" : "black");
                colorCheck = !colorCheck;
            }
            colorCheck = !colorCheck;
        }
        setBoardTiles(newBoardTiles);
    }
    const movePiece = (selectedTile: { row: number; col: number }, endPosition: { row: number; col: number }) => {
        console.log("nu körs programmet!");

        let updatedBoard = [...boardPawnsPosition];
        updatedBoard[endPosition.row][endPosition.col] = updatedBoard[selectedTile.row][selectedTile.col];
        updatedBoard[selectedTile.row][endPosition.col] = { color: "", name: "" };

        setBoardPawnsPosition(updatedBoard);
    }

    const handlePawnMove = async (indexNumber: number) => {
        if (selectedTile && gameId && currentPlayer) {
            let endPosition = { row: Math.floor(indexNumber / 8), col: indexNumber % 8 };

            // todo, fixa så man kollar om movment är korrekt!
            sendMoveSocket(gameId, selectedTile, endPosition, currentPlayer)
            setSelectedTile(null);
        } else {
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
                setGameRunning(data.data.gameRunning);
                setCurrentPlayer(data.data.currentPlayer);
                setBoardPawnsPosition(newBoardPawnsPosition)

            }
        });
    };

    const handleStartGame = () => {
        startGame(gameId);
        setGameRunning(true)
        startGame(gameId);
    }

    useEffect(() => {
        initializeBoard();
    }, []);

    return (
        <div>
            {gameRunning}

            <div>
                {gameRunning && currentPlayer ? <p>{currentPlayer.login} turn</p> : <p>Waiting for host to start</p>}
                <button onClick={handleStartGame}>Start game</button>
            </div>
            <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, auto)", alignContent: "center", justifyContent: "center" }}>
                    {boardTiles.length > 0 &&
                        boardTiles.map((color, index) => (
                            <BoardTile gameRunning={gameRunning} handlePawnMove={handlePawnMove} key={index} color={color} tileIndex={index} initialPawn={boardPawnsPosition[Math.floor(index / 8)][index % 8]} />
                        ))
                    }
                </div>
            </div>
        </div>)
}
