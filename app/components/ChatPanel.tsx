"use client";

import ChatList from "./ChatList";
import axios from "axios";
import { useUserId } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useChats } from "../context/ChatContext";


function ChatPanel() {
    const chatContext = useChats();
    const userId = useUserId();

    useEffect(() => {
        if (!userId) return;

        async function loadChats() {
            const res = await axios.get(`/api/users/${userId}`);
            const {chats} = res.data
            chatContext.setChats(chats);
        }

        loadChats();
    }, [userId]);

    return (
        <div className="px-3 py-5">
            <ChatList />
        </div>
    );
}

export default ChatPanel;
