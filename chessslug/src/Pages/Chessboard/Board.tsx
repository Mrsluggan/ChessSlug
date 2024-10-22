import React, { useState, useEffect } from 'react';
import BoardTile from './BoardTile';
import { sendMove, getMove, sendMoveSocket } from "./ChessLogic"


interface BoardProps {
    gameId: number,
    newMovmentData: any

}
export default function Board({ gameId, newMovmentData }: BoardProps) {
    const [boardTiles, setBoardTiles] = useState<Array<string>>([]);
    const [boardPawnsPosition, setBoardPawnsPosition] = useState<({ color: string, name: string })[][]>([]);
    const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);



    useEffect(() => {
        handleGetData();
    }, [gameId]);


    useEffect(() => {
        if (newMovmentData && newMovmentData.selectedTile && newMovmentData.position) {
            movePiece(newMovmentData.selectedTile, newMovmentData.position)
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

    const movePiece = (fromIndex: { row: number; col: number }, toIndex: { row: number; col: number }) => {
        console.log("nu körs programmet!");

        let updatedBoard = [...boardPawnsPosition];
        updatedBoard[toIndex.row][toIndex.col] = updatedBoard[fromIndex.row][fromIndex.col];
        updatedBoard[fromIndex.row][toIndex.col] = { color: "", name: "" };

        setBoardPawnsPosition(updatedBoard);
    }
    const handlePawnMove = async (indexNumber: number) => {
        if (selectedTile && gameId) {
            let position = { row: Math.floor(indexNumber / 8), col: indexNumber % 8 };


            // todo, fixa så man kollar om movment är korrekt!
            await sendMove(gameId, selectedTile.row, selectedTile.col, position.row, position.col);
            sendMoveSocket(gameId, selectedTile, position)

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
