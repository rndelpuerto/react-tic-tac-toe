import React, { useState } from "react";
import "./style.css";

export default function Square({ index, children, onClick }) {
  return (
    <button
      className="square"
      onClick={() => onClick(index)}
      disabled={children !== null ? "disabled" : ""}
    >
      <span className="player-symbol noselect">{children}</span>
    </button>
  );
}
