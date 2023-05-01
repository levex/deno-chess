import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(
    req: Request,
    _ctx: HandlerContext,
  ): Promise<Response> {
    const kv = await Deno.openKv();
    const gameUuid = new URL(req.url).searchParams.get("gameUuid");
    if (gameUuid == null) {
      return new Response(JSON.stringify({
        error: "Client Error",
        gameUuid: "",
        fen: "",
      }));
    }

    const game = await kv.get(["game", gameUuid]);
    if (game.value === null) {
      return new Response(JSON.stringify({
        error: "No Game Found",
        gameUuid: "",
        fen: "",
      }));
    }

    return new Response(JSON.stringify({
      error: null,
      gameUuid: gameUuid,
      fen: game.value.state,
    }));
  },
  async POST(req, _ctx): Promise<Response> {
    const data = await req.json();
    const { gameUuid, fen } = data;

    const kv = await Deno.openKv();
    await kv.set(["game", gameUuid], { state: fen });

    return new Response(JSON.stringify({ state: "OK" }));
  },
};
