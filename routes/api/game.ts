import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(
    _req: Request,
    ctx: HandlerContext,
  ): Promise<Response> {
    const kv = await Deno.openKv();
    const { gameId } = ctx.params;

    const game = await kv.get(["game", gameId]);
    if (game.value === null) {
      return new Response(JSON.stringify({
        error: "No Game Found",
      }));
    }

    return new Response(JSON.stringify(game));
  },
  async POST(req, ctx): Promise<Response> {
    const data = await req.json();
    const { gameUuid, fen } = data;

    const kv = await Deno.openKv();
    await kv.set(["game", gameUuid], { state: fen });

    return new Response(JSON.stringify({ state: "OK" }));
  },
};
