import { useState } from "preact/hooks";
import Chessboard from "chessboardjsx";
import { Chess, ShortMove } from "chess.js";

export default function ChessIsland(props) {
  const [chess, setChess] = useState(new Chess(props.fen));
  const [fen, setFen] = useState(chess.fen());

  const gameChannel = new BroadcastChannel(`game-${props.gameUuid}`);
  gameChannel.onmessage = (msg) => {
    const newFen = msg.data;
    setFen(newFen);
    setChess(new Chess(newFen));
  };

  const myMove = (chess: Chess): boolean => {
    let currentTurn = chess.turn();
    return (currentTurn == "b" && props.orientation == "black") ||
      (currentTurn == "w" && props.orientation == "white");
  };

  const handleMove = (move: ShortMove) => {
    if (myMove(chess) && chess.move(move)) {
      let newFen = chess.fen();

      fetch("/api/game", {
        method: "POST",
        body: JSON.stringify({
          gameUuid: props.gameUuid,
          fen: chess.fen(),
        }),
      }).then(() => {
        setFen(newFen);
        gameChannel.postMessage(newFen);
      })
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
