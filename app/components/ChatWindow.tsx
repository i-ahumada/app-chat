"use client";
import { useEffect, useState } from "react";
import { ChatType } from "../types/commons";
import { useChats } from "../context/ChatContext";
import ChatMessage from "./ChatMessage";
import { useUserId } from "../context/UserContext";

export type ChatWindowProps = {
    chatId: string
}

function ChatWindow({ chatId } : ChatWindowProps) {
    const chatContext  = useChats();
    const userId = useUserId();
    const chat = chatContext.chats.find(c => c.id === chatId);
    console.log(chatId)
    return ( 
        chat?.messages.map((c, i) => <ChatMessage key={i} mine={c.sender == userId} content={c.content}/>)
    );
}

export default ChatWindow;