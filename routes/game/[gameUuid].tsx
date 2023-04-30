import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { gameUuid } = ctx.params;
    const kv = await Deno.openKv();
    const gameState = await kv.get(["game", gameUuid]);
    if (gameState.value === null) {
      await kv.set(["game", gameUuid], { state: STARTING_FEN });
      return ctx.render({ gameState: STARTING_FEN, gameUuid: gameUuid });
    }
    return ctx.render({ gameState: gameState.value.state, gameUuid: gameUuid });
  },
};

export default function Page({ data }: PageProps) {
  let gameUuid = data.gameUuid ?? "ENOENT";
  let gameState = data.gameState ?? "ENOENT";
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
        <p class="my-6">
          Game UUID: {gameUuid}
        </p>
        <p class="my-6">
          Game State: {gameState}
        </p>
      </div>
    </>
  );
}
