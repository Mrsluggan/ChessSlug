import React, { useState, useEffect } from 'react';
import { sendMove } from "./ChessLogic"

interface BoardTileProps {
    color: string;
    tileIndex: number;
    initialPawn: { color: string, name: string } | null
    handlePawnMove: (indexNumber: number) => void
}

export default function BoardTile({ color, tileIndex, initialPawn, handlePawnMove }: BoardTileProps) {
    const [pawn, setPawn] = useState<any | null>(null);
    const [colorCheck, setColorCheck] = useState<string>(color);

    const handleDisplayPawn = (color: string, name: string) => {
        switch (color) {
            case "white":
                switch (name) {
                    case "Pawn":
                        return "♙";
                    case "Rook":
                        return "♖";
                    case "Knight":
                        return "♘";
                    case "Bishop":
                        return "♗";
                    case "Queen":
                        return "♕";
                    case "King":
                        return "♔";

                }
                break;
            case "black":
                switch (name) {

                    case "Pawn":
                        return "♟";
                    case "Rook":
                        return "♜";
                    case "Knight":
                        return "♞";
                    case "Bishop":
                        return "♝";
                    case "Queen":
                        return "♛";
                    case "King":
                        return "♚";
                    default:
                        return null;

                }
            default:
                return null;
        }
    }

    useEffect(() => {
        if (initialPawn) {
            setPawn(handleDisplayPawn(initialPawn.color, initialPawn.name));
        }
        setColorCheck(color);
    }, [initialPawn]);

    const handleClick = () => {
        if (pawn) {
            setColorCheck("white");
        }
        handlePawnMove(tileIndex);
    }

    return (
        <div onClick={handleClick}
            className='BoardTile'
            style={{ width: "100px", height: "100px", margin: "0", backgroundColor: colorCheck, textAlign: "center", fontSize: "70px" }}
        >
            {pawn}
        </div>
    );
}
