"use client";

import { useChatContext } from "../context/ChatContext";
import { useUserId } from "../context/UserContext";
import { chatsServices } from "../services/chat.service";
import { useNotification } from "../context/NotificationContext";
import { ChatResponseType, ChatType } from "../types/commons";

/**
 * useChats
 * Hook que centraliza toda la lógica de manejo de chats para el usuario actual.
 * Proporciona funciones para crear, eliminar y enviar mensajes en chats,
 * así como para obtener chats existentes y mantener el estado sincronizado.
 * 
 * Funciones principales:
 * - getActiveChat: retorna el chat activo completo.
 * - createChat: crea un nuevo chat y lo agrega al estado.
 * - sendMessage: envía un mensaje a un chat y lo agrega al estado local.
 * - deleteChat: elimina un chat del backend y del estado.
 * - getAllChatIdAndLastMessage: obtiene todos los chats del usuario y fusiona con los existentes.
 * - getChatById: obtiene un chat por su ID, evitando recargas si ya está en el estado.
 * 
 * También maneja errores mediante handleError, usando notificaciones.
 */
export const useChats = () => {
    const { chats, setChats, activeChat, setActiveChat } = useChatContext();
    const userId = useUserId();
    const { notify } = useNotification();

    const getActiveChat = () => {
        if (!activeChat) return null;
        return chats?.find(c => c?.id === activeChat) ?? null;
    };

    const handleError = (err: any, defaultMsg: string) => {
        const msg = err.response?.data?.error || err.message || defaultMsg;
        notify({ message: msg, type: "error" });
    };

    const createChat = (chatId: string) => {
        const chatPayload: ChatType = { id: chatId, messages: [] };

        chatsServices.create({ ...chatPayload, creator: userId }) // creator solo para el backend
            .then(() => setChats(prev => prev ? [...prev, chatPayload] : [chatPayload]))
            .catch(err => handleError(err, "Error creando chat"));
    };

    const sendMessage = (chatId: string, content: string, time: string) => {
        chatsServices.sendMessage(chatId, userId, content, time)
            .then(() => {
                setChats(prev =>
                    prev ? prev.map(chat =>
                        chat.id === chatId
                            ? { ...chat, messages: [...chat.messages, { sender: userId, content, time }] }
                            : chat
                    ) : []
                );
            })
            .catch(err => handleError(err, "Error enviando mensaje"));
    };

    const deleteChat = (chatId: string) => {
        chatsServices.delete(chatId, userId)
            .then(() => setChats(prev => prev ? prev.filter(chat => chat.id !== chatId) : []))
            .catch(err => handleError(err, "Error eliminando chat"));
    };

    const getAllChatIdAndLastMessage = async () => {
        try {
            const res = await chatsServices.getAll(userId);
            setChats(prev => {
                const map = new Map(prev?.map(c => [c.id, c]));
                res.chats.forEach(c => map.has(c.id) || map.set(c.id, c));
                return Array.from(map.values());
            });
        } catch (err) {
            handleError(err, "Error obteniendo chats");
        }
    };

    const getChatById = async (chatId: string): Promise<ChatType | null> => {
        const chatInContext = chats?.find(c => c.id === chatId);
        if (chatInContext && chatInContext.messages.length > 1) return chatInContext;

        try {
            const res: ChatResponseType = await chatsServices.getById(chatId);
            const chat = res.chats[0];
            console.log(chat);
            if (!chat) return null;
            setChats(prev => {
                const current = prev ?? [];
                const exists = current.some(c => c.id === chatId);
                return exists
                    ? current.map(c => c.id === chatId ? chat : c)
                    : [...current, chat];
            });
            return chat;
        } catch (err) {
            handleError(err, "Error obteniendo chat");
            return null;
        }
    };

    return {
        chats,
        activeChat,
        setActiveChat,
        getActiveChat,
        createChat,
        sendMessage,
        deleteChat,
        getAllChatIdAndLastMessage,
        getChatById,
    };
};
