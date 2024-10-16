import React, { useState, useEffect } from 'react';
import BoardTile from './BoardTile';
import { sendMove, getMove } from "./ChessLogic"


export default function Board() {
    const [boardTiles, setBoardTiles] = useState<Array<string>>([]);
    const [boardPawnsPosition, setBoardPawnsPosition] = useState<(string | null)[][]>([
        ['svart_torn', 'svart_horse', 'svart_löpare', 'svart_drottning', 'svart_kung', 'svart_löpare', 'svart_horse', 'svart_torn'],
        ['svart_bonde', 'svart_bonde', 'svart_bonde', 'svart_bonde', 'svart_bonde', 'svart_bonde', 'svart_bonde', 'svart_bonde'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['vit_bonde', 'vit_bonde', 'vit_bonde', 'vit_bonde', 'vit_bonde', 'vit_bonde', 'vit_bonde', 'vit_bonde'],
        ['vit_torn', 'vit_horse', 'vit_löpare', 'vit_drottning', 'vit_kung', 'vit_löpare', 'vit_horse', 'vit_torn']
    ]);
    const [selectedPawn, setSelectedPawn] = useState<string | null>();
    const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);

    useEffect(() => {
        initializeBoard();
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

    const updatePawnsPosition = (fX: number, fY: number, tX: number, tY: number, pawn: string | null) => {
        const newBoardPawnsPosition = [...boardPawnsPosition].map(row => [...row]);

        const fromX = fX, fromY = fY;
        const toX = tX, toY = tY;

        newBoardPawnsPosition[toX][toY] = newBoardPawnsPosition[fromX][fromY];
        newBoardPawnsPosition[fromX][fromY] = null;

        setBoardPawnsPosition(newBoardPawnsPosition);
    }

    const handlePawnMove = (fromIndex: number, pawn: string | null) => {
        let position = { row: Math.floor(fromIndex / 8), col: fromIndex % 8 };

        if (selectedTile != null) {
            let position = { row: Math.floor(fromIndex / 8), col: fromIndex % 8 };

            updatePawnsPosition(selectedTile.row, selectedTile.col, position.row, position.col, pawn);
            console.log("där rörde pjäsen: " + selectedPawn + " " + " från " + selectedTile.row + " " + selectedTile.col + " till " + position.row + " " + position.col);

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
        sendMove(boardPawnsPosition);
    }

    const handleGetData = () => {
        getMove().then((data:any) => {
            const newBoardPawnsPosition = [...data.data].map(row => [...row]);
            setBoardPawnsPosition(newBoardPawnsPosition);
        });
    };

    return (
        <>
            <button onClick={handleSendData}> skicka </button>
            <button onClick={handleGetData}> hämta </button>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, auto)", alignContent: "center" }}>
                {
                    boardTiles.map((color, index) => (
                        <BoardTile handlePawnMove={handlePawnMove} key={index} color={color} tileIndex={index} initialPawn={boardPawnsPosition[Math.floor(index / 8)][index % 8]} />
                    ))
                }

            </div>

        </>
    )
}
