export class Server {
  subscribeMessages(
    gameUuid: string,
    onMessage,
  ) {
    const events = new EventSource(`/api/connect/${gameUuid}`);
    const listener = (e: MessageEvent) => {
      const msg = JSON.parse(e.data);
      onMessage(msg);
    };
    events.addEventListener("message", listener);
    return {
      unsubscribe() {
        events.removeEventListener("message", listener);
      },
    };
  }

  sendMessage(gameUuid: string, fen: string) {
    const data = {
        fen,
        gameUuid
    };
    fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const server = new Server();
