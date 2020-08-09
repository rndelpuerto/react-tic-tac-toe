import React from "react";
import "./style.css";
import Square from "../Square";

export default function Board({ state, onClick }) {
  return (
    <div className="board">
      {state?.map((playerSymbol, index) => (
        <Square index={index} key={index} onClick={onClick}>
          {playerSymbol}
        </Square>
      ))}
    </div>
  );
}
