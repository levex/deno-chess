export function handler(_req: Request): Response {
  const gameUuid = crypto.randomUUID();
  const playerColor = Math.random() > 0.5 ? "white" : "black";

  return new Response("", {
    status: 307,
    headers: { Location: `/game/${gameUuid}?color=${playerColor}` },
  });
}
