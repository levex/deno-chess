import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Chess from "../../islands/Chess.tsx";

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { gameUuid } = ctx.params;
    const color = new URL(req.url).searchParams.get("color") || "white";
    const kv = await Deno.openKv();
    const gameState = await kv.get(["game", gameUuid]);
    if (gameState.value === null) {
      await kv.set(["game", gameUuid], { state: STARTING_FEN });

      const shareUrl = new URL(req.url);
      const shareUrlSearch = shareUrl.searchParams;
      shareUrlSearch.set(
        "color",
        color == "white" ? "black" : "white",
      );
      shareUrl.search = shareUrlSearch.toString();
      return ctx.render({
        gameState: STARTING_FEN,
        gameUuid: gameUuid,
        newGame: true,
        playerColor: color,
        shareUrl: shareUrl.toString(),
      });
    }

    return ctx.render({
      gameState: gameState.value.state,
      gameUuid: gameUuid,
      newGame: false,
      playerColor: color,
      url: null,
    });
  },
};

export default function Page({ data }: PageProps) {
  const { gameUuid, gameState, newGame, playerColor } = data;
  return (
    <>
      <Head>
        <title>Deno Chess - Game {gameUuid}</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        {newGame &&
          (
            <p class="my-6">
              Good luck - share this link to have your opponent join:
              <br />
              <code>
                {data.shareUrl}
              </code>
            </p>
          )}
        {!newGame &&
          (
            <p class="my-6">
              Good luck and have fun!
            </p>
          )}
        <Chess orientation={playerColor} fen={gameState} gameUuid={gameUuid} />
      </div>
    </>
  );
}
