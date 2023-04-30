export function handler(_req: Request): Response {
  const gameUuid = crypto.randomUUID();
  return new Response("", {
    status: 307,
    headers: { Location: `/game/${gameUuid}` },
  });
}
