import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Deno Chess</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to Deno Chess - play chess with no timer. Create a new game or
          join a game already existing.
        </p>
        <a href="/new">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-auto rounded">
            New Game
          </button>
        </a>
      </div>
    </>
  );
}
