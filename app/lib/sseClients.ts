/**
* Maneja la lista global de clientes conectados por SSE.
* Se guarda en `global.__sse_clients` para que la instancia persista
* entre distintas rutas del servidor y no se borre en cada request.
* Esto permite que cualquier módulo (como sendSSE) pueda acceder
* al mismo Map y enviar eventos en tiempo real a los usuarios.
**/
import { SSEClient } from "@/app/types/commons";
const globalAny: any = global;

/* 
* Si ya existe una instancia global, la reutilizamos;
* si no, creamos un Map nuevo (userId → array de clientes SSE)
*/
export const sseClients: Map<string, SSEClient[]> =
  globalAny.__sse_clients || new Map();

/* Guardamos la instancia en el objeto global de Node.js
* para que no se recree en cada ejecución de un archivo de servidor.
*/
if (!globalAny.__sse_clients) {
  globalAny.__sse_clients = sseClients;
}
