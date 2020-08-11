import React, { useState, useEffect } from "react";
import "./App.css";

import StatusBar from "./components/StatusBar";
import Board from "./components/Board";

function App() {
  const PLAYER_1 = "X";
  const PLAYER_2 = "O";

  const playerSymbols = [PLAYER_1, PLAYER_2];

  const initBoardState = [null, null, null, null, null, null, null, null, null];

  const initGameState = {
    currentPlayer: Math.round(Math.random()),
    score: { player1: 0, player2: 0 },
    games: 0,
  };

  const [boardState, setBoardState] = useState(initBoardState);

  const [gameState, setGameState] = useState(initGameState);

  const cellIndex = (i, j) => {
    return i * 3 + j;
  };

  const checkRows = () => {
    let occurrences = 1;
    let i = 0;
    let j = 1;

    while (i < 3) {
      if (
        boardState[cellIndex(i, j)] &&
        boardState[cellIndex(i, j)] === boardState[cellIndex(i, j - 1)]
      ) {
        occurrences++;
        if (occurrences === 3) return true;
      } else {
        occurrences = 1;
        j = 3;
      }

      if (j > 2) {
        i++;
        j = 1;
      } else j++;
    }

    return false;
  };

  const checkCols = () => {
    let occurrences = 1;
    let i = 1;
    let j = 0;

    while (j < 3) {
      if (
        boardState[cellIndex(i, j)] &&
        boardState[cellIndex(i, j)] === boardState[cellIndex(i - 1, j)]
      ) {
        occurrences++;
        if (occurrences === 3) return true;
      } else {
        occurrences = 1;
        i = 3;
      }

      if (i > 2) {
        j++;
        i = 1;
      } else i++;
    }

    return false;
  };

  const checkDiags = () => {
    return (
      (boardState[0] &&
        boardState[0] === boardState[4] &&
        boardState[4] === boardState[8]) ||
      (boardState[2] &&
        boardState[2] === boardState[4] &&
        boardState[4] === boardState[6])
    );
  };

  const checkGame = () => {
    return checkRows() || checkCols() || checkDiags();
  };

  const getNextPlayer = () => (gameState.currentPlayer ? 0 : 1);

  const handlePlay = (cellIndex) => {
    const newBoardState = [...boardState];
    newBoardState[cellIndex] = playerSymbols[gameState.currentPlayer];
    setBoardState(newBoardState);
  };

  useEffect(() => {
    if (checkGame()) {
      alert(`The winner is ${playerSymbols[gameState.currentPlayer]}!`);

      const newScore = { ...gameState.score };
      newScore[gameState.currentPlayer ? "player1" : "player2"]++;

      setGameState({
        ...gameState,
        score: newScore,
        games: gameState.games + 1,
      });

      setBoardState(initBoardState);
    } else if (!boardState.some((elem) => elem === null)) {
      alert("Draw!");
      setGameState({ ...gameState, games: gameState.games + 1 });
      setBoardState(initBoardState);
    } else setGameState({ ...gameState, currentPlayer: getNextPlayer() });
  }, [boardState]);

  return (
    <div className="game">
      <div className="game__status">
        <StatusBar gameStatus={gameState} />
      </div>
      <div className="game__board">
        <Board state={boardState} onClick={handlePlay} />
      </div>
    </div>
  );
}

export default App;
