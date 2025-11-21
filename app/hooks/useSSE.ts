"use client";

import { useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
import { useUserId } from "../context/UserContext";
import { MessageType } from "../types/commons";

/**
 * useSSE
 * Hook que establece una conexión SSE (Server-Sent Events) para el usuario actual.
 * Escucha eventos en tiempo real del servidor y actualiza el estado de chats:
 * 
 * - "chat-created": agrega un nuevo chat si no existía.
 * - "message-received": agrega un mensaje al chat correspondiente.
 * - "chat-deleted": elimina el chat y limpia el chat activo.
 */
export const useSSE = () => {
  const { setChats, setActiveChat } = useChatContext();
  const userId = useUserId();

  useEffect(() => {
    if (!userId) return;

    const ev = new EventSource(`/api/sse?userId=${userId}`);

    ev.addEventListener("chat-created", (e: MessageEvent) => {
      const { chatId } = JSON.parse(e.data);

      setChats(prev => {
        const current = prev ?? [];
        if (current.some(c => c.id === chatId)) return current; // evitar duplicados
        return [...current, { id: chatId, messages: [] as MessageType[] }];
      });
    });

    ev.addEventListener("message-received", (e: MessageEvent) => {
      const { chatId, message } = JSON.parse(e.data);

      setChats(prev =>
        (prev ?? []).map(chat =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      );
    });

    ev.addEventListener("chat-deleted", (e: MessageEvent) => {
      const { chatId } = JSON.parse(e.data);
      setActiveChat(null);
      setChats(prev => (prev ?? []).filter(c => c.id !== chatId));
    });

    return () => ev.close();
  }, [userId, setChats, setActiveChat]);
};
