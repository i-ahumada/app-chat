"use client";

import ChatList from "./ChatList";
import { useUserId } from "../context/UserContext";
import { useEffect } from "react";
import { useChats } from "../hooks/useChats";
import { useSSE } from "../hooks/useSSE";

function ChatPanel() {
    const { getAllChatIdAndLastMessage } = useChats();
    const userId = useUserId();
    useSSE();

    useEffect(() => {
        if (!userId) return;
        getAllChatIdAndLastMessage();
    }, [userId]);

    return (
        <div className="px-3 py-5">
            <ChatList />
        </div>
    );
}

export default ChatPanel;
