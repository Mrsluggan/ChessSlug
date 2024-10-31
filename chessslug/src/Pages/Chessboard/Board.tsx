import React, { useState, useEffect } from 'react';
import BoardTile from './BoardTile';
import { getMove, startGame, sendMoveSocket, sendToAiGame } from "./ChessLogic"


interface BoardProps {
    gameId: number,
    newMovmentData: any
    boardData: any
    gamemode: string;
}
export default function Board({ gameId, newMovmentData, boardData, gamemode }: BoardProps) {
    const [boardTiles, setBoardTiles] = useState<Array<string>>([]);
    const [boardPawnsPosition, setBoardPawnsPosition] = useState<({ color: string, name: string })[][]>(Array(8).fill(null).map(() => Array(8).fill({ color: "", name: "" })));
    const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<{ login: string, id: number, color: string } | null>();
    const [playerColor, setPlayerColor] = useState<string>("");
    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [player, setPlayer] = useState<{ login: string, id: number, color: string }>(JSON.parse(localStorage.getItem("user") || "{}"));
    const [players, setPlayers] = useState<Array<{ login: string, id: number, color: string }>>([player]);

    let yourMove = new Audio("/yourMove.mp3")
    let enemyMove = new Audio("/enemyMove.mp3")

    const yourMoveSound = () => {
        yourMove.play()
    }
    const enemyMoveSound = () => {
        enemyMove.play()
    }

    useEffect(() => {
        if (newMovmentData) {
            if (currentPlayer?.id === player.id) {
                yourMoveSound();
            } else {
                enemyMoveSound();
            }
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

            if (boardData.players[1]) {
                if (boardData.players[1].id === player.id) {
                    setPlayerColor("black");

                }
            }


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
        let updatedBoard = [...boardPawnsPosition];
        updatedBoard[endPosition.row][endPosition.col] = updatedBoard[selectedTile.row][selectedTile.col];
        updatedBoard[selectedTile.row][selectedTile.col] = { color: "", name: "" };

        setBoardPawnsPosition(updatedBoard);
    }

    const handlePawnMove = async (indexNumber: number, isPeice: boolean) => {

        if (player?.id !== currentPlayer?.id) {
            return

        }
        if (selectedTile && gameId && currentPlayer && player) {
            let endPosition = { row: Math.floor(indexNumber / 8), col: indexNumber % 8 };
            console.log("pjäsen flyttas från ", selectedTile, " till ", endPosition);


            // todo, fixa så man kollar om movment är korrekt!
            if (gamemode === "aimode") {
                
                const moveSuccess = await sendMoveSocket(gameId, selectedTile, endPosition, player);

                if (moveSuccess) {
                    console.log("nu skickas det");

                    await new Promise(resolve => setTimeout(resolve, 1000));
                    sendToAiGame(gameId);
                }

            }else{
                sendMoveSocket(gameId, selectedTile, endPosition, player)

            }

            setSelectedTile(null);

        } else {

            let startPosition = { row: Math.floor(indexNumber / 8), col: indexNumber % 8 };
            console.log("pjäsen som klickades från ", startPosition, " till ", indexNumber);

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
        if (gamemode !== "aimode") {
            if (boardData.players[1].id === player.id) {
                setPlayerColor("black");

            }
        }


    }


    useEffect(() => {
        initializeBoard();

    }, [gameRunning]);

    useEffect(() => {
        if (gamemode === "aimode") {

            setPlayers([...players, { id: 0, login: "AI", color: "black" }])
            console.log(players);

        }
    }, []);

    function mapTiles(
        boardTiles: string[],
        reverse: boolean,
        props: { boardPawnsPosition: any[][]; player: any; currentPlayer: any; gameRunning: boolean; handlePawnMove: (indexNumber: number, isPeice: boolean) => void }
    ) {
        const tilesToMap = reverse ? [...boardTiles].reverse() : boardTiles;

        return tilesToMap.map((color, index) => {
            const tileIndex = reverse ? boardTiles.length - 1 - index : index;

            return (
                <BoardTile
                    key={tileIndex}
                    color={color}
                    tileIndex={tileIndex}
                    initialPawn={props.boardPawnsPosition[Math.floor(tileIndex / 8)][tileIndex % 8]}
                    player={props.player}
                    currentPlayer={props.currentPlayer}
                    gameRunning={props.gameRunning}
                    handlePawnMove={props.handlePawnMove}
                />
            );
        });
    }


    return (
        <div>
            {players.length > 1 ? null : (
                <div style={{ textAlign: "center" }}>
                    <h2>waiting for player to join</h2>
                </div>
            )}
            {players.length < 2 ? null : (
                <>
                    <div>
                        {gameRunning && currentPlayer ? (
                            <div style={{ textAlign: "center" }}>
                                <h1>{currentPlayer.login} turn</h1>
                            </div>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <h1>Waiting for host to start</h1>
                                {player?.id === players[0].id && (
                                    <div>
                                        <button onClick={handleStartGame}>Start Game</button>
                                    </div>
                                )}
                            </div>
                        )}


                    </div>


                    <div>

                        <h3>Your opponent: {players.find((player2) => player2.id !== player?.id)?.login}</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, auto)", alignContent: "center", justifyContent: "center" }}>


                            {
                                boardTiles.length > 1 &&
                                mapTiles(boardTiles, playerColor === "black", {
                                    player: player ?? null,
                                    currentPlayer: currentPlayer ?? null,
                                    gameRunning: gameRunning,
                                    handlePawnMove: handlePawnMove,
                                    boardPawnsPosition: boardPawnsPosition
                                })
                            }
                        </div>




                    </div>
                    <div style={{ textAlign: "right", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button>Give up</button>
                        <h3>You: {player?.login}</h3>
                    </div>
                </>)}
        </div>)
}
