import { Chessboard } from "react-chessboard";
const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default function Chess() {
  return (
    <>
      <Chessboard position={STARTING_FEN} id="BasicBoard" />
    </>
  );
}
