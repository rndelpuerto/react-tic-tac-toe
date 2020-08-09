import React from "react";
import "./style.css";

export default function StatusBar({ gameStatus }) {
  return (
    <div className="status-bar">
      <div className="status-box noselect">
        Player: <strong>{gameStatus.currentPlayer ? "O" : "X"}</strong>
      </div>
      <div className="status-box status-box--score noselect">
        <span>
          O: <strong>{gameStatus?.score?.player1}</strong>
        </span>{" "}
        -{" "}
        <span>
          <strong>{gameStatus?.score?.player2}</strong> :X
        </span>
      </div>
      <div className="status-box noselect">
        Games: <strong>{gameStatus?.games}</strong>
      </div>
    </div>
  );
}
