"use client";

import { useChatContext } from "../context/ChatContext";
import { useUserId } from "../context/UserContext";
import { chatsServices } from "../services/chat.service";
import { useNotification } from "../context/NotificationContext";

export const useChats = () => {
    const { chats, setChats, activeChat, setActiveChat } = useChatContext();
    const userId = useUserId();
    const { notify } = useNotification();

    const getActiveChat = () => {
        if (!activeChat) return undefined;
        return chats.find(c => c.id === activeChat);
    };

    const handleError = (err: any, defaultMsg: string) => {
        const msg = err.response?.data?.error || err.message || defaultMsg;
        notify({ message: msg, type: "error" });
    };

    const createChat = (chatId: string) => {
        if (!userId) return;
        const chatPayload = { id: chatId, creator: userId, messages: [] };

        chatsServices.create(chatPayload)
            .then(() => setChats(prev => [...prev, chatPayload]))
            .catch(err => handleError(err, "Error creando chat"));
    };

    const sendMessage = (chatId: string, content: string, time: string) => {
        if (!userId) return;

        chatsServices.sendMessage(chatId, userId, content, time)
            .then(() => {
                setChats(prev =>
                    prev.map(chat =>
                        chat.id === chatId
                            ? { ...chat, messages: [...chat.messages, { sender: userId, content, time }] }
                            : chat
                    )
                );
            })
            .catch(err => handleError(err, "Error enviando mensaje"));
    };

    const deleteChat = (chatId: string) => {
        if (!userId) return;

        chatsServices.delete(chatId, userId)
            .then(() => setChats(prev => prev.filter(chat => chat.id !== chatId)))
            .catch(err => handleError(err, "Error eliminando chat"));
    };

    const getAll = () => {
        if (!userId) return;

        chatsServices.getAll(userId)
            .then(res => setChats(res.chats))
            .catch(err => handleError(err, "Error obteniendo chats"));
    };

    const getById = (chatId: string) => {
        return chatsServices.getById(chatId)
            .then(res => {
                const chat = res.chats[0];
                setChats(prev => {
                    const exists = prev.some(c => c.id === chatId);
                    return exists ? prev.map(c => c.id === chatId ? chat : c) : [...prev, chat];
                });
                return chat;
            })
            .catch(err => {
                handleError(err, "Error obteniendo chat");
                throw err;
            });
    };

    return {
        chats,
        activeChat,
        setActiveChat,
        getActiveChat,
        createChat,
        sendMessage,
        deleteChat,
        getAll,
        getById,
    };
};
