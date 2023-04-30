import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const kv = await Deno.openKv();
  const { gameId } = ctx.params;

  const game = await kv.get([`game-${gameId}`]);
  if (game.value === null) {
    return new Response(JSON.stringify({
      error: "No Game Found",
    }));
  }

  return new Response(JSON.stringify(game));
};
