type SSEClient = {
  userId: string;
  controller: ReadableStreamDefaultController;
};

const globalAny: any = global;

export const sseClients: Map<string, SSEClient[]> =
  globalAny.__sse_clients || new Map();

if (!globalAny.__sse_clients) {
  globalAny.__sse_clients = sseClients;
}
