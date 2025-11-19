"use client";

import { useEffect, useState } from "react";
import SelectChatButton from "./buttons/SelectChatButton";
import { ChatType, MessageType } from "../types/commons";
import { useChats } from "../context/ChatContext";
import { useUserId } from "../context/UserContext";

type ChatListProps = {
    chats: ChatType[]
} 

function ChatList({chats} : ChatListProps) {
    const chatContext = useChats();
    const userId = useUserId();

    useEffect(()=>{
        if (!userId) return;

        chatContext.setChats(chats)
        console.log(userId)
        const ev = new EventSource(`/api/sse?userId=${userId}`);

        ev.addEventListener("chat-created", (e) => {
            const { chatId } = JSON.parse(e.data);
            console.log("chat-created: ", chatId);
            chatContext.setChats((prev: ChatType[]) => {
                if (prev.some(c => c.id === chatId)) return prev; // evitar duplicados
                    return [
                    ...prev,
                    {
                        id: chatId as string,
                        messages: [] as MessageType[],
                    }
                ];
            });
        });

        // --- MENSAJE RECIBIDO ---
        ev.addEventListener("message-received", (e) => {
            const { chatId, message } = JSON.parse(e.data);

            chatContext.setChats(prev =>
                prev.map(chat =>
                    chat.id === chatId
                        ? { ...chat, messages: [...chat.messages, message] }
                        : chat
                )
            );
        });

        // --- CHAT ELIMINADO ---
        ev.addEventListener("chat-deleted", (e) => {
            const { chatId } = JSON.parse(e.data);
            chatContext.chats.filter(c => c.id !== chatId)
            chatContext.setChats(chatContext.chats);
        });

        return () => ev.close();

    }, [userId])

    return (  
        <div className="flex flex-col gap-3">
        {chatContext.chats.map((c: ChatType) => (
            <SelectChatButton key={c.id} chatId={c.id} lastMessage={c.messages.length > 0? c.messages[c.messages.length - 1].content: ""}/>
        ))}
        </div>
    );
}

export default ChatList;