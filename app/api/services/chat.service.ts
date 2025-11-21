import { db } from "@/app/lib/db";
import { ChatType, MessageType } from "@/app/types/commons";
import { sendSSE } from "@/app/lib/sseSend";
import { splitChatIdForUser } from "@/app/functions/helper";

/**
 * Servicio backend para manejar chats y mensajes. 
 * Proporciona funciones para crear, eliminar y consultar chats, así como
 * enviar notificaciones SSE al otro usuario cuando ocurren eventos.
 * 
 * Funciones principales:
 * 
 * - createChat(chat):
 *      Valida los datos del chat, lo agrega a la base de datos y notifica
 *      al otro usuario con un evento "chat-created".
 * 
 * - addMessage(chatId, message):
 *      Valida el mensaje, lo agrega al chat correspondiente en la base de datos,
 *      y notifica al otro usuario con un evento "message-received".
 * 
 * - deleteChat(chatId, userId):
 *      Elimina un chat de la base de datos y notifica al otro usuario con
 *      un evento "chat-deleted".
 * 
 * - getChatsByUser(userId):
 *      Devuelve todos los chats de un usuario.
 * 
 * - getChatById(chatId):
 *      Devuelve un chat por su ID.
 * 
 * Notas:
 * - Usa `splitChatIdForUser` para determinar al “otro usuario” de un chat.
 * - Usa `sendSSE` para enviar eventos en tiempo real al cliente.
 * - Valida todos los inputs y lanza errores si faltan campos o no existen registros.
 */
export const chatServices = {
  createChat: async (chat: { id: string; creator: string; messages: MessageType[] }) => {
    if (!chat.id) throw new Error("El chat debe tener un id");
    if (!chat.creator) throw new Error("El chat debe tener un creador");
    if (!Array.isArray(chat.messages)) throw new Error("El chat debe tener un arreglo de mensajes");

    const exists = await db.getById(chat.id);

    if (exists) throw new Error("El chat ya existe");
    const chatToStore: ChatType = { id: chat.id, messages: chat.messages };
    
    await db.addChat(chatToStore);

    // Notificar al otro usuario
    const { other } = splitChatIdForUser(chat.id, chat.creator);
    sendSSE(other, "chat-created", { chatId: chat.id });

    return chatToStore;
  },

  addMessage: async (chatId: string, message: MessageType) => {
    if (!chatId) throw new Error("Debe proveer chatId");
    if (!message.sender || !message.content || !message.time)
      throw new Error("El mensaje debe tener sender, content y la hora");

    const exists = await db.getById(chatId);
    if (!exists) throw new Error("Chat no encontrado");

    await db.addMessage(chatId, message);

    // Notificar al otro usuario
    const { other } = splitChatIdForUser(chatId, message.sender);
    sendSSE(other, "message-received", { chatId, message });

    return message;
  },

  deleteChat: async (chatId: string, userId: string) => {
    if (!chatId) throw new Error("Debe proveer chatId");

    const chat = await db.getById(chatId);
    if (!chat) throw new Error("Chat no encontrado");

    await db.removeChat(chatId);

    // Notificar al otro usuario
    const { other } = splitChatIdForUser(chatId, userId);
    sendSSE(other, "chat-deleted", { chatId });

    return true;
  },

  getChatsByUser: async (userId: string): Promise<ChatType[]> => {
    if (!userId) throw new Error("Debe proveer userId");
    return db.getByUUID(userId);
  },

  getChatById: async (chatId: string): Promise<ChatType> => {
    if (!chatId) throw new Error("Debe proveer chatId");

    const chat = await db.getById(chatId);
    if (!chat) throw new Error("Chat no encontrado");

    return chat;
  }
};
