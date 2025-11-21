import { ChatResponseType } from "../types/commons";
import axios from "axios";

/**
 * Servicio de frontend para comunicar la app con las rutas API de chats.
 *
 * Métodos:
 * - getById(chatId): obtiene un chat completo por ID.
 * - getAll(uuid): obtiene todos los chats asociados a un usuario.
 * - create(payload): crea un chat nuevo en el backend.
 * - delete(chatId, userId): elimina un chat (envía quién lo borró).
 * - sendMessage(chatId, userId, content, time): agrega un mensaje al chat.
 *
 * Notas:
 * - Usa axios para todas las solicitudes.
 * - Cada método devuelve la data del backend ya procesada.
 */
export const chatsServices = {
  getById: (chatId: string): Promise<ChatResponseType> => {
    return axios.get(`/api/chats/${chatId}`).then(res => res.data);
  },

  getAll: (uuid: string): Promise<ChatResponseType> => {
    return axios.get(`/api/users/${uuid}`).then(res => res.data);
  },

  create: (chatPayload: { id: string; creator: string; messages: any[] }): Promise<ChatResponseType> => {
    return axios.post("/api/chats", chatPayload).then(res => res.data);
  },

  delete: (chatId: string, userId: string): Promise<void> => {
    return axios.delete(`/api/chats/${chatId}`, { data: { sender: userId } }).then(() => {});
  },

  sendMessage: (chatId: string, userId: string, content: string, time: string): Promise<void> => {
    return axios.patch(`/api/chats/${chatId}`, { sender: userId, content, time})
  },
};
