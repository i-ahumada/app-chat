"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useUserId } from "../context/UserContext";
import { useChats } from "../hooks/useChats";

function ChatWindow() {
    const { getActiveChat } = useChats();
    const userId = useUserId();
    const chat = getActiveChat();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const isUserAtBottom = () => {
        const el = containerRef.current;
        if (!el) return false;

        const threshold = 80; // px de tolerancia
        const position = el.scrollTop + el.clientHeight;
        const height = el.scrollHeight;

        return height - position < threshold;
    };

    // Scroll suave al fondo
    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Cada vez que llegan mensajes, scrollear si corresponde
    useEffect(() => {
        if (isUserAtBottom()) {
            scrollToBottom();
        }
    }, [chat?.messages]);

    return (
        <div
            ref={containerRef}
            className="px-4 overflow-y-auto h-full"
        >
            {chat?.messages.map((c, i) => (
                <ChatMessage
                    key={i}
                    mine={c.sender == userId}
                    content={c.content}
                    time={c.time}
                />
            ))}

            {/* Marcador invisible al fondo */}
            <div ref={bottomRef}></div>
        </div>
    );
}

export default ChatWindow;