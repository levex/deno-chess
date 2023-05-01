export class GameChannel {
  #channel: BroadcastChannel;

  constructor(gameUuid: string) {
    this.#channel = new BroadcastChannel(gameUuid);
  }

  onMessage(handler) {
    const listener = (e) => {
      handler(e.data);
    };
    this.#channel.addEventListener("message", listener);
    return {
      unsubscribe: () => {
        this.#channel.removeEventListener("message", listener);
      },
    };
  }

  close() {
    this.#channel.close();
  }

  sendFen(fen) {
    this.#channel.postMessage({
        fen: fen
    });
  }
}
