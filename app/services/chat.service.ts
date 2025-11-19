import { ChatResponseType } from "../types/commons";
import axios from "axios";

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

  sendMessage: (chatId: string, userId: string, content: string): Promise<void> => {
    return axios.patch(`/api/chats/${chatId}`, { sender: userId, content })
  },
};
