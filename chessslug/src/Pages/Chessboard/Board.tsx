import React, { useState, useEffect } from 'react';
import BoardTile from './BoardTile';
import { getMove, startGame, sendMoveSocket } from "./ChessLogic"


interface BoardProps {
    gameId: number,
    newMovmentData: any
    boardData: any
}
export default function Board({ gameId, newMovmentData, boardData }: BoardProps) {
    const [boardTiles, setBoardTiles] = useState<Array<string>>([]);
    const [boardPawnsPosition, setBoardPawnsPosition] = useState<({ color: string, name: string })[][]>(Array(8).fill(null).map(() => Array(8).fill({ color: "", name: "" }))); const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<{ login: string, id: number, color: string } | null>();
    const [playerColor, setPlayerColor] = useState<string>("white");
    const [players, setPlayers] = useState<{ login: string, id: number, color: string }[]>([{ login: "", id: 0, color: "" },{ login: "", id: 0, color: "" }]);
    const [gameRunning, setGameRunning] = useState<boolean>(false);


    const [player, setPlayer] = useState<{ login: string, id: number, color: string } | null>();

    useEffect(() => {
        const playerFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
        setPlayer(playerFromStorage);


    }, []);


    useEffect(() => {
        if (newMovmentData) {
            if (newMovmentData.startPosition && newMovmentData.endPosition) {
                movePiece(newMovmentData.startPosition, newMovmentData.endPosition);
            }
        }
    }, [newMovmentData]);

    useEffect(() => {
        if (boardData) {
            setPlayers(boardData.players);
            setGameRunning(boardData.gameRunning);
            setCurrentPlayer(boardData.currentPlayer);

        }
    }, [boardData]);

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

        if (player?.id !== currentPlayer?.id) {
            return

        }
        if (selectedTile && gameId && currentPlayer && player) {
            let endPosition = { row: Math.floor(indexNumber / 8), col: indexNumber % 8 };

            // todo, fixa så man kollar om movment är korrekt!
            sendMoveSocket(gameId, selectedTile, endPosition, player)
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

    }, [gameRunning]);

    return (
        <div>

            <div>
                {gameRunning && currentPlayer ? (
                    <div style={{ textAlign: "center" }}>
                        <h1>{currentPlayer.login} turn</h1>
                    </div>
                ) : (
                    players.length < 2 ? (
                        <p>Waiting for players to join</p>
                    ) : (
                        <button onClick={handleStartGame} disabled={gameRunning}>
                            Start game
                        </button>
                    )
                )}


            </div>
            <div>
                <h3>Your opponent: {players[1]?.login}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, auto)", alignContent: "center", justifyContent: "center" }}>

                    {boardTiles.length > 1 &&
                        boardTiles.map((color, index) => (
                            <BoardTile
                                player={player ?? null} // add null check here
                                currentPlayer={currentPlayer ?? null}
                                gameRunning={gameRunning}
                                handlePawnMove={handlePawnMove}
                                key={index}
                                color={color}
                                tileIndex={index}
                                initialPawn={boardPawnsPosition[Math.floor(index / 8)][index % 8]}
                            />
                        ))
                    }
                </div>
            </div>
            <div style={{ textAlign: "right", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button>Give up</button>
                <h3>You: {player?.login}</h3>
            </div>

        </div>)
}
