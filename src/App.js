import React, { useReducer, useEffect } from "react";
import "./App.css";

import StatusBar from "./components/StatusBar";
import Board from "./components/Board";

const PLAYER_1 = "X";
const PLAYER_2 = "O";

const playerSymbols = [PLAYER_1, PLAYER_2];

const initBoardState = [null, null, null, null, null, null, null, null, null];

const initGameState = {
  board: initBoardState,
  currentPlayer: Math.round(Math.random()),
  score: { player1: 0, player2: 0 },
  games: 0,
};

const ActionType = {
  SET_NEXT_PLAYER: "SET_NEXT_PLAYER",
  UPDATE_BOARD: "UPDATE_BOARD",
  UPDATE_GAME: "UPDATE_GAME",
  RESET_GAME: "RESET_GAME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.SET_NEXT_PLAYER:
      return {
        ...state,
        currentPlayer: state.currentPlayer ? 0 : 1,
      };

    case ActionType.UPDATE_BOARD:
      const newBoardState = [...state.board];
      newBoardState[action.cellIndex] = playerSymbols[state.currentPlayer];

      return {
        ...state,
        board: newBoardState,
      };

    case ActionType.UPDATE_GAME:
      let newScore;

      if (!action.draw) {
        newScore = { ...state.score };
        newScore[state.currentPlayer ? "player1" : "player2"]++;
      } else newScore = state.score;

      return {
        ...state,
        board: initBoardState,
        score: newScore,
        games: state.games + 1,
      };

    case ActionType.RESET_GAME:
      return initGameState;

    default:
      return state;
  }
};

function App() {
  const [gameState, dispatch] = useReducer(reducer, initGameState);

  const cellIndex = (i, j) => {
    return i * 3 + j;
  };

  const checkRows = () => {
    let occurrences = 1;
    let i = 0;
    let j = 1;

    const { board } = gameState;

    while (i < 3) {
      if (
        board[cellIndex(i, j)] &&
        board[cellIndex(i, j)] === board[cellIndex(i, j - 1)]
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

    const { board } = gameState;

    while (j < 3) {
      if (
        board[cellIndex(i, j)] &&
        board[cellIndex(i, j)] === board[cellIndex(i - 1, j)]
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
    const { board } = gameState;
    return (
      (board[0] && board[0] === board[4] && board[4] === board[8]) ||
      (board[2] && board[2] === board[4] && board[4] === board[6])
    );
  };

  const checkGame = () => {
    return checkRows() || checkCols() || checkDiags();
  };

  const handlePlay = (cellIndex) => {
    dispatch({ type: ActionType.UPDATE_BOARD, cellIndex });
  };

  useEffect(() => {
    if (checkGame()) {
      alert(`The winner is ${playerSymbols[gameState.currentPlayer]}!`);
      dispatch({ type: ActionType.UPDATE_GAME, draw: false });
    } else if (!gameState.board.some((elem) => elem === null)) {
      alert("Draw!");
      dispatch({ type: ActionType.UPDATE_GAME, draw: true });
    } else dispatch({ type: ActionType.SET_NEXT_PLAYER });
  }, [gameState.board]);

  return (
    <div className="game">
      <div className="game__status">
        <StatusBar gameStatus={gameState} />
      </div>
      <div className="game__board">
        <Board state={gameState.board} onClick={handlePlay} />
      </div>
    </div>
  );
}

export default App;
