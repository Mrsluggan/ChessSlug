import React from 'react'
import { useState, useEffect, useRef } from 'react'
import BoardTile from './BoardTile';
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

    useEffect(() => {
        initializeBoard();
    }, []);

    const initializeBoard = () => {
        let colorCheck = false;
        let newBoardTiles = [];

        for (let xIndex = 0; xIndex < 8; xIndex++) {
            for (let yIndex = 0; yIndex < 8; yIndex++) {
                if (!colorCheck) {
                    newBoardTiles.push("green");
                } else {
                    newBoardTiles.push("black");
                }
                colorCheck = !colorCheck;

            }
            colorCheck = !colorCheck;

        }
        setBoardTiles(newBoardTiles);
    }


    const updateBoard = () => {

    }


    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, auto)", alignContent: "center" }}>

            {
                boardTiles.map((color, index) => (
                    <BoardTile key={index} color={color} tileIndex={index} initialPawn={boardPawnsPosition[Math.floor(index / 8)][index % 8]} />
                ))
            }
        </div >
    )
}
