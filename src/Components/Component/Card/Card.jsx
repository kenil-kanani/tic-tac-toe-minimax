import { memo } from "react";
import Icons from "../Icons/Icons";
import "./Card.css";

function Card({ onPlay, player, index, endGame, board }) {
  let icon = <Icons />
  if (player == "X") {
    icon = <Icons name={"cross"} />
  } else if (player == "O") {
    icon = <Icons name={"Circle"} />
  }

  return (
    <div className="card" onClick={() => !endGame && (player >= 0 && player <= 8) && onPlay(index)}>
      {icon}
    </div>
  );
}

export default memo(Card);
