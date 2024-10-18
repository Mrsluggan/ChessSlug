import React, { useState, useEffect } from 'react';

interface BoardTileProps {
    color: string;
    tileIndex: number;
    initialPawn: string | null;
    handlePawnMove: (fromIndex: number, pawn: string | null) => void
}

export default function BoardTile({ color, tileIndex, initialPawn, handlePawnMove }: BoardTileProps) {
    const [pawn, setPawn] = useState<string | null>(null);
    const [colorCheck, setColorCheck] = useState<string>(color);
    const [selected, setSelected] = useState<boolean>(false);

    const handleDisplayPawn = (pawn: string | null) => {
        switch (pawn) {
            case "svart_bonde":
                return "♙";
            case "svart_torn":
                return "♖";
            case "svart_horse":
                return "♘";
            case "svart_löpare":
                return "♗";
            case "svart_drottning":
                return "♕";
            case "svart_kung":
                return "♔";
            case "vit_bonde":
                return "♟";
            case "vit_torn":
                return "♜";
            case "vit_horse":
                return "♞";
            case "vit_löpare":
                return "♝";
            case "vit_drottning":
                return "♛";
            case "vit_kung":
                return "♚";
            default:
                return null;
        }
    }

    useEffect(() => {
        // Varje gång initialPawn ändras, uppdatera pawn
        setPawn(handleDisplayPawn(initialPawn));
        setColorCheck(color);
    }, [initialPawn]);



    const handleClick = () => {
        if (selected) {
            setSelected(false);
        } else {
            if (pawn) {
                setColorCheck("white");
                setSelected(true);
            }
        }
        handlePawnMove(tileIndex, pawn)
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
