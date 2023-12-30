import isWinner from "../../../helper/isWinner"
import { Fragment, useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import minimax from "../../../helper/minimax";


function Grid({ numberOfCards }) {

  function fillArray() {
    let array = Array(numberOfCards).fill("");
    array = array.map((value, idx) => {
      return idx;
    })
    return array;
  }

  const [turn, setTurn] = useState(true); // true => O -- false => X\
  const [board, setBoard] = useState(() => fillArray());
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState(0);
  const [playerName, setPlayerName] = useState("O");

  //! Minimax Algorithm

  if (!turn && moves < 9 && !winner) {
    let bestSpot = minimax(board, "X");
    play(bestSpot.index);
    // new board
    let newBoard = board.map((value, idx) => {
      if (idx == bestSpot.index) {
        return "X";
      } else {
        return value;
      }
    })
    setBoard([...newBoard]);
    setTurn(!turn);
    setMoves(moves + 1);
  }

  //! Minimax Algorithm

  function play(index) {

    if (turn == true) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }

    const win = isWinner(board, turn ? "O" : "X");
    if (win) {
      setWinner(win);
      toast.success(`Congratulations Winner is ${win}`, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    setBoard([...board]);
    setTurn(!turn);
    setMoves(moves + 1);
  };

  function reset() {
    setTurn(true);
    setBoard(() => fillArray());
    setWinner(null);
  }
  console.log("Moves : " + moves)

  return (
    <>
      <div className="grid-wrapper">

        //? Winner
        {winner && (
          <>
            <h1 className="turn-highlight"> Winner is {(winner == 'O') ? playerName : "AI RANI"} </h1>
            <button className="reset" onClick={reset}> Reset Game </button>
            <ToastContainer />
          </>
        )}

        //? Draw
        {moves == 9 && !winner && (
          <>
            <h1 className="turn-highlight"> Draw </h1>
            <button className="reset" onClick={reset}> Reset Game </button>
          </>
        )}

        //? Current Turn
        {
          !winner && moves < 9 && (
            <h1 className="turn-highlight" >  Current Turn : {(turn) ? playerName : "AI RANI"}</h1>
          )
        }
        <div className="grid">
          {board.map((value, idx) => {
            return <Card onPlay={play} endGame={(winner) ? true : false} player={value} key={idx} index={idx} board={board} />;
          })}
        </div>
      </div>
      <div>
        <label htmlFor="" style={{ color: "white" }}>Name : </label>
        <input type="text" value={playerName} onChange={(e) => {
          setPlayerName(e.target.value);
        }} />
      </div>
    </>
  );
}

export default Grid;
