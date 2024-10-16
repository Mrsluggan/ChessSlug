import React from 'react'
import { useState, useEffect, useRef } from 'react'

interface BoardTileProps {
    color: string;
    tileIndex: number;
    initialPawn: string | null;

}
export default function BoardTile({ color, tileIndex, initialPawn }: BoardTileProps) {
    const [pawn, setPawn] = useState(initialPawn); // Använd en state för pawn
    const handleClick = () => {
        console.log("på denna tile: " + tileIndex + " finns en "+ initialPawn);

    }
    const handleDisplayPawn = () => {
        switch (pawn) {
            case "svart_bonde":
                setPawn("♙");
                break;
            case "svart_torn":
                setPawn("♖");
                break;
            case "svart_horse":
                setPawn("♘");
                break;
            case "svart_löpare":
                setPawn("♗");
                break;
            case "svart_drottning":
                setPawn("♕");
                break;
            case "svart_kung":
                setPawn("♔");
                break;
            case "vit_bonde":
                setPawn("♟");
                break;
            case "vit_torn":
                setPawn("♜");
                break;
            case "vit_horse":
                setPawn("♞");
                break;
            case "vit_löpare":
                setPawn("♝");
                break;
            case "vit_drottning":
                setPawn("♛");
                break;
            case "vit_kung":
                setPawn("♚");
                break;
            default:
                break;
        }
    }

    useEffect(() => {

        handleDisplayPawn();
    }, []);

    return (
        <div onClick={handleClick} className='BoardTile' style={{ width: "100px", height: "100px", margin: "0", backgroundColor: color, textAlign: "center", fontSize: "70px" }}>
            {pawn}
        </div>
    )
}
