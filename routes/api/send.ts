import { HandlerContext } from "$fresh/server.ts";
import { GameChannel } from "../../communication/game.ts";

export async function handler(
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> {
  const data = await req.json();
  const channel = new GameChannel(data.gameUuid);
  const fen = data.fen;

  channel.sendFen(fen);

  channel.close();
  return new Response("OK");
}
