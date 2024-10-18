import React, { useState, useEffect } from 'react';
import BoardTile from './BoardTile';
import { sendMove, getMove, createBoard } from "./ChessLogic"


export default function Board() {
    const [boardTiles, setBoardTiles] = useState<Array<string>>([]);
    const [boardPawnsPosition, setBoardPawnsPosition] = useState<(string | null)[][]>([]);
    const [selectedPawn, setSelectedPawn] = useState<string | null>();
    const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);
    const [board, setBoard] = useState<{ id: any, positions: { rowData: (string | null)[] }[] }>({
        id: null,
        positions: []
    });

    useEffect(() => {

        if (boardPawnsPosition.length > 0) {
            initializeBoard();

        }
    }, [boardPawnsPosition]);

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

    const updatePawnsPosition = (fX: number, fY: number, tX: number, tY: number, pawn: string | null) => {
        const newBoardPawnsPosition = [...boardPawnsPosition].map(row => [...row]);

        const fromX = fX, fromY = fY;
        const toX = tX, toY = tY;

        newBoardPawnsPosition[toX][toY] = newBoardPawnsPosition[fromX][fromY];
        newBoardPawnsPosition[fromX][fromY] = null;

        setBoardPawnsPosition(newBoardPawnsPosition);
    }

    const handlePawnMove = (fromIndex: number, pawn: string | null) => {

        if (selectedTile != null) {
            let position = { row: Math.floor(fromIndex / 8), col: fromIndex % 8 };

            updatePawnsPosition(selectedTile.row, selectedTile.col, position.row, position.col, pawn);
            console.log("där rörde pjäsen: " + selectedPawn + " " + " från " + selectedTile.row + " " + selectedTile.col + " till " + position.row + " " + position.col);
            
            handleSendData();
            setSelectedPawn(null);
            setSelectedTile(null)
        } else {
            if (pawn) {
                let position = { row: Math.floor(fromIndex / 8), col: fromIndex % 8 };

                setSelectedPawn(pawn);
                setSelectedTile(position)
            }
        }

    }
    const handleSendData = () => {
        board.positions = boardPawnsPosition.map(row => ({ rowData: row }));
        sendMove(board);
    }
    const handleNewBoard = async () => {
        await createBoard();
    }

    const handleGetData = () => {
        getMove().then((data: any) => {
            if (data) {
                setBoard(data.data);
                let newBoardPawnsPosition: any[] = [];

                data.data.positions.forEach((element: any) => {
                    newBoardPawnsPosition.push(element.rowData)

                });
                setBoardPawnsPosition(newBoardPawnsPosition);

            }
        });
    };

    return (
        <>


            <div>
                <button onClick={handleSendData}> skicka </button>
                <button onClick={handleGetData}> hämta </button>
                <button onClick={handleNewBoard}> Skapa </button>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, auto)", alignContent: "center" }}>

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
