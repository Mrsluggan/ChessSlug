import React, { useState, useEffect } from 'react';

interface BoardTileProps {
    color: string;
    tileIndex: number;
    initialPawn: { color: string, name: string } | null
    gameRunning: boolean
    currentPlayer: { login: string, id: number, color: string } | null
    player: { login: string, id: number, color: string } | null
    handlePawnMove: (indexNumber: number, isPeice: boolean) => void
}

export default function BoardTile({ currentPlayer, player, color, tileIndex, initialPawn, gameRunning, handlePawnMove }: BoardTileProps) {
    const [pawn, setPawn] = useState<any | null>(null);
    const [colorCheck, setColorCheck] = useState<string>(color);

    const handleDisplayPawn = (color: string, name: string) => {
        switch (color) {
            case "black":
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
            case "white":
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
        if (player?.id !== currentPlayer?.id) {
            return
        }
        if (gameRunning) {
            if (pawn) {
                setColorCheck("white");

            }


            handlePawnMove(tileIndex, pawn !== null);
        }
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
