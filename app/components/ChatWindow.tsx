"use client";

import ChatMessage from "./ChatMessage";
import { useUserId } from "../context/UserContext";
import { useChats } from "../hooks/useChats";

function ChatWindow() {
    const { getActiveChat } = useChats();
    const userId = useUserId();
    const chat = getActiveChat();

    return (
        <div className="px-4">
            {chat?.messages.map((c, i) => <ChatMessage key={i} mine={c.sender == userId} content={c.content}/>)}
        </div> 
    );
}

export default ChatWindow;