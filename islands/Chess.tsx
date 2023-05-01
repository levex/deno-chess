import { useEffect, useState } from "preact/hooks";
import Chessboard from "chessboardjsx";
import { Chess, ShortMove } from "chess.js";
import { server } from "../communication/server.ts";

export default function ChessIsland(props) {
  const [chess, setChess] = useState(new Chess(props.fen));
  const [fen, setFen] = useState(chess.fen());

  useEffect(() => {
    const subscription = server.subscribeMessages(props.gameUuid, (msg) => {
      console.log("NEW MSG", msg);
      setFen(msg.fen);
      chess.load(msg.fen);

      // chessboardjsx is slightly broken - force a re-render.
      this.forceUpdate();
    });

    return () => {
      subscription.unsubscribe();
    };
  });

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
        server.sendMessage(props.gameUuid, newFen);
      });
    }
  };

  return (
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
  );
}
