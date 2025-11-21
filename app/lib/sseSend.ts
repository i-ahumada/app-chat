import { sseClients } from "./sseClients";
/**
 * Función auxiliar usada para enviar eventos SSE (Server-Sent Events)
 * 
 * Contexto:
 * - Cuando un usuario crea un chat, envía un mensaje o elimina un chat,
 *   el backend debe notificar en tiempo real al otro usuario.
 * - Cada usuario mantiene una conexión SSE abierta contra /api/sse.
 * - sseClients almacena todas esas conexiones activas.
 * 
 * Uso:
 * - sendSSE(userId, "message-received", { chatId, message })
 * - sendSSE(userId, "chat-created", { chatId })
 * - sendSSE(userId, "chat-deleted", { chatId })
 * 
 * Justificación:
 * - Se pone en un archivo separado porque esta función se usa desde
 *   múltiples servicios del backend (createChat, addMessage, deleteChat).
 * - Evita duplicar lógica de armado y envío del formato SSE.
 * - Mantiene limpio el código del servicio de chats.
 */

export function sendSSE(userId: string, event: string, payload: any) {
  const clients = sseClients.get(userId);
  if (!clients) return;

  const msg = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  const encoded = new TextEncoder().encode(msg);

  for (const { controller } of clients) {
    controller.enqueue(encoded);
  }
}
