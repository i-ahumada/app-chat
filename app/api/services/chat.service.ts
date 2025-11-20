// app/services/chatBackend.service.ts
import { db } from "@/app/lib/db";
import { ChatType, MessageType } from "@/app/types/commons";
import { sendSSE } from "@/app/lib/sseSend";
import { splitChatIdForUser } from "@/app/functions/helper";

export const chatServices = {
  createChat: async (chat: { id: string; creator: string; messages: MessageType[] }) => {
    if (!chat.id) throw new Error("El chat debe tener un id");
    if (!chat.creator) throw new Error("El chat debe tener un creador");
    if (!Array.isArray(chat.messages)) throw new Error("El chat debe tener un arreglo de mensajes");
    const exists = await db.getById(chat.id);
    if (exists) throw new Error("El chat ya existe");
    const chatToStore: ChatType = {id: chat.id, messages: chat.messages};
    await db.addChat(chatToStore);
    // Notificar al otro usuario
    const { other } = splitChatIdForUser(chat.id, chat.creator);
    sendSSE(other, "chat-created", { chatId: chat.id });
    return chatToStore;
  },

  addMessage: async (chatId: string, message: MessageType) => {
    if (!chatId) throw new Error("Debe proveer chatId");
    if (!message.sender || !message.content || !message.time) throw new Error("El mensaje debe tener sender, content y la hora");

    const chat = await db.getById(chatId);
    if (!chat) throw new Error("Chat no encontrado");

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
}