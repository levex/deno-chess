export async function handler(_req: Request): Promise<Response> {
  const gameUuid = crypto.randomUUID();
  const playerColor = Math.random() > 0.5 ? "white" : "black";

  // TODO: create the invitation for the other player

  return new Response("", {
    status: 307,
    headers: { Location: `/game/${gameUuid}?color=${playerColor}` },
  });
}
