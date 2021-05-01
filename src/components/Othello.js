import React, { useState } from "react";
import "./Othello.scss";
import Circle from "./Circle";

const Othello = () => {
  const [cellArray, setCellArray] = useState([
    ["E", "E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "W", "B", "E", "E", "E"],
    ["E", "E", "E", "B", "W", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E", "E"],
  ]);

  const cellList = cellArray.map((cells, index) => (
    <tr key={index}>
      {cells.map((cell, index) =>
        cell === "E" ? (
          <td key={index}></td>
        ) : (
          <td key={index}>
            <Circle color={cell === "W" ? "white" : "black"} />
          </td>
        )
      )}
    </tr>
  ));

  return (
    <div className="othello">
      <table>
        <tbody>{cellList}</tbody>
      </table>
    </div>
  );
};

export default Othello;
