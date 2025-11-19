import { sseClients } from "./sseClients";

export function sendSSE(userId: string, event: string, payload: any) {
  const clients = sseClients.get(userId);
  if (!clients) return;

  const msg = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  const encoded = new TextEncoder().encode(msg);

  for (const { controller } of clients) {
    controller.enqueue(encoded);
  }
}
