import { NextRequest } from "next/server";
import { sseClients } from "@/app/lib/sseClients";

/**
 * GET /api/sse
 * Endpoint que establece una conexión SSE (Server-Sent Events) para un usuario.
 * Permite enviar eventos en tiempo real al cliente (como mensajes de chat, pings, etc.).
 * 
 * Funcionamiento:
 * 1. Obtiene el userId desde los query params.
 * 2. Crea un ReadableStream para enviar datos al cliente.
 * 3. Registra al cliente en sseClients para poder enviarle eventos más adelante.
 * 4. Envía un "ping" cada 15s para mantener viva la conexión.
 * 5. Maneja el cierre de la conexión limpiando el cliente registrado.
 */
export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return new Response("Missing userId", { status: 400 });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Registrar cliente
      const list = sseClients.get(userId) || [];
      list.push({ userId, controller });
      sseClients.set(userId, list);

      // heartbeat
      const hb = setInterval(() => {
        controller.enqueue(
          encoder.encode(`event: ping\ndata: {}\n\n`)
        );
      }, 15000);

      req.signal.addEventListener("abort", () => {
        clearInterval(hb);

        const arr = sseClients.get(userId) || [];
        sseClients.set(
          userId,
          arr.filter((c) => c.controller !== controller)
        );

        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
};
