"use client";

import { useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
import { useUserId } from "../context/UserContext";
import { MessageType } from "../types/commons";

export const useSSE = () => {
  const { setChats, setActiveChat } = useChatContext();
  const userId = useUserId();

  useEffect(() => {
    if (!userId) return;

    const ev = new EventSource(`/api/sse?userId=${userId}`);

    // Chat creado
    ev.addEventListener("chat-created", (e: MessageEvent) => {
      const { chatId } = JSON.parse(e.data);

      setChats(prev => {
        if (prev.some(c => c.id === chatId)) return prev; // evitar duplicados
        return [...prev, { id: chatId, messages: [] as MessageType[] }];
      });
    });

    // Mensaje recibido
    ev.addEventListener("message-received", (e: MessageEvent) => {
      const { chatId, message } = JSON.parse(e.data);

      setChats(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      );
    });

    // Chat eliminado
    ev.addEventListener("chat-deleted", (e: MessageEvent) => {
      const { chatId } = JSON.parse(e.data);
      setActiveChat(null);
      setChats(prev => prev.filter(c => c.id !== chatId));
    });

    return () => ev.close();
  }, [userId, setChats]);
};
