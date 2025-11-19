"use client";

import Avatar from "boring-avatars";
import { splitChatIdForUser } from "../functions/helper";
import { useUserId } from "../context/UserContext";
import { useChats } from "../hooks/useChats";

function ChatInfo() {
    const { activeChat } = useChats();
    const userId = useUserId();

    if (!activeChat) return null; 
    
    const { other } = splitChatIdForUser(activeChat, userId);

    return (
        <div className="flex items-center gap-3">
            <Avatar
                name={other}
                variant="beam"
                size={40}
            />
            <strong className="dark:text-gray-300">
                {other}
            </strong>
        </div>
    );
}

export default ChatInfo;
