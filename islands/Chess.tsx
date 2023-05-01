import { useState } from "preact/hooks";
import Chessboard from "chessboardjsx";
import { Chess, ShortMove } from "chess.js";

export default function ChessIsland(props) {
  const [chess] = useState(new Chess(props.fen));
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setFen(chess.fen());

      fetch("/api/game", {
        method: "POST",
        body: JSON.stringify({
          gameUuid: props.gameUuid,
          fen: chess.fen(),
        }),
      });
    }
  };

  return (
    <>
      <div>
        <Chessboard
          onDrop={(move: ShortMove) =>
            handleMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            })}
          orientation={props.orientation}
          position={fen}
          id="BasicBoard"
        />
      </div>
    </>
  );
}
