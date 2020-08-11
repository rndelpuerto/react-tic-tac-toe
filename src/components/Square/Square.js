import React from "react";
import "./style.css";

export default function Square({ index, children, onClick }) {
  return (
    <button
      className="square"
      onClick={() => onClick(index)}
      disabled={!!children ? "disabled" : ""}
    >
      <span className="player-symbol noselect">{children}</span>
    </button>
  );
}
