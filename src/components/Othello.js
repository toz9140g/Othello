import React, { useEffect, useState } from "react";
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
  const [turn, setTurn] = useState("W");
  const [pass, setPass] = useState(false);
  const [end, setEnd] = useState(false);

  const stateCount = (state) => {
    let count = 0;
    cellArray.filter(
      (cellRow) => (count += cellRow.filter((cell) => cell === state).length)
    );
    return count;
  };

  const WinnerMessage = () => {
    if (end) {
      if (stateCount("B") > stateCount("W")) {
        return "흑 승리!!";
      } else if (stateCount("B") < stateCount("W")) {
        return "백 승리!!";
      } else {
        return "무승부!!";
      }
    } else if (stateCount("B") === 0) {
      setEnd(true);
      return "백 승리!!";
    } else if (stateCount("W") === 0) {
      setEnd(true);
      return "흑 승리!!";
    } else return turn === "B" ? "흑의 차례입니다." : "백의 차례입니다.";
  };

  /*
    8방향 rowInc, colInc 표.
    (-1, -1)   (-1,  0)   (-1, +1)
    ( 0, -1)   ( 0,  0)   ( 0, +1)
    (+1, -1)   (+1,  0)   (+1, +1)
  */
  const reverseAble = (row, col, rowInc, colInc) => {
    let opponent = false;
    while (1) {
      row += rowInc;
      col += colInc;
      if (row < 0 || row >= 8 || col < 0 || col >= 8) return false;
      if (opponent) {
        if (cellArray[row][col] === turn) return true;
        else if (cellArray[row][col] === "E") return false;
      } else {
        if (cellArray[row][col] === turn) return false;
        else if (cellArray[row][col] === "E") return false;
        else opponent = true;
      }
    }
  };

  const placeAble = (row, col) => {
    return (
      reverseAble(row, col, -1, -1) ||
      reverseAble(row, col, -1, 0) ||
      reverseAble(row, col, -1, 1) ||
      reverseAble(row, col, 0, -1) ||
      reverseAble(row, col, 0, 0) ||
      reverseAble(row, col, 0, 1) ||
      reverseAble(row, col, 1, -1) ||
      reverseAble(row, col, 1, 0) ||
      reverseAble(row, col, 1, 1)
    );
  };

  const reverse = (row, col, rowInc, colInc) => {
    let opponent = false;
    let reverseArray = [];
    while (1) {
      row += rowInc;
      col += colInc;
      if (row < 0 || row >= 8 || col < 0 || col >= 8) return;
      if (opponent) {
        if (cellArray[row][col] === turn) break;
        else if (cellArray[row][col] === "E") return;
        else reverseArray.push({ row, col });
      } else {
        if (cellArray[row][col] === turn) break;
        else if (cellArray[row][col] === "E") return;
        else {
          opponent = true;
          reverseArray.push({ row, col });
        }
      }
    }
    let copy = [...cellArray];
    reverseArray.map(
      (reverseCell) => (copy[reverseCell.row][reverseCell.col] = turn)
    );
    setCellArray(copy);
  };

  const reverseAll = (row, col) => {
    reverse(row, col, -1, -1);
    reverse(row, col, -1, 0);
    reverse(row, col, -1, 1);
    reverse(row, col, 0, -1);
    reverse(row, col, 0, 0);
    reverse(row, col, 0, 1);
    reverse(row, col, 1, -1);
    reverse(row, col, 1, 0);
    reverse(row, col, 1, 1);
  };

  const onClick = (row, col) => {
    let copy = [...cellArray];
    reverseAll(row, col);
    copy[row][col] = turn;
    turn === "W" ? setTurn("B") : setTurn("W");
    setCellArray(copy);
  };

  useEffect(() => {
    if (end) return;
    let count = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (cellArray[i][j] === "E") {
          if (placeAble(i, j)) {
            count++;
          }
        }
      }
    }
    if (count === 0) {
      if (!pass) setPass(true);
      else setEnd(true);
      turn === "W" ? setTurn("B") : setTurn("W");
    } else {
      setPass(false);
    }
  }, [cellArray, placeAble, turn, pass, end]);

  const cellList = cellArray.map((cells, index) => (
    <tr key={index}>
      {cells.map((cell, i) =>
        cell === "E" ? (
          <td
            key={i}
            onClick={() => onClick(index, i)}
            className={placeAble(index, i) ? "place-able" : ""}
          ></td>
        ) : (
          <td key={i}>
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
      <div className="score-board">
        <div className="black-score">흑 : {stateCount("B")}</div>
        <div className="white-score">백 : {stateCount("W")} </div>
        <div className="game-result">{WinnerMessage()}</div>
      </div>
    </div>
  );
};

export default Othello;
