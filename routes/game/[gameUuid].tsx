import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { gameUuid } = ctx.params;
    const resp = await fetch(`/api/game?gameId=${gameUuid}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const gameState = await resp.json();
    return ctx.render({ gameState: gameState, gameUuid: gameUuid });
  },
};

export default function Game({ gameState, gameUuid }: PageProps) {
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
          {gameState}
        </p>
        <Chessboard />
      </div>
    </>
  );
}
