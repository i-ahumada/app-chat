// app/services/products.service.ts
import { ChatType, ChatResponseType } from "../types/commons";
import axios from "axios";

export const chatsServices = {
    getById: async (chatId: string): Promise<ChatResponseType> => {
        const res = await axios.get(`/api/chats/${chatId}`);
        return res.data;
    },

    getByUUID: async (uuid: string): Promise<ChatResponseType> => {
        const res = await axios.get(`/api/users/${uuid}`);
        return res.data;
    },

    create: async (chat: ChatType): Promise<ChatResponseType> => {
        const res = await axios.post("/api/chats", chat);
        return res.data;
    },

    delete: async (chatId: number): Promise<void> => {
        axios.delete(`/api/chats/${chatId}`);
    },
};