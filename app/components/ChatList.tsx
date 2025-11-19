"use client";

import SelectChatButton from "./buttons/SelectChatButton";
import { ChatType } from "../types/commons";
import { useChats } from "../hooks/useChats";

function ChatList() {
    const { chats } = useChats();

    return (  
        <div className="flex flex-col gap-3">
        {chats.map((c: ChatType) => (
            <SelectChatButton key={c.id} chatId={c.id} lastMessage={c.messages.length > 0? c.messages[c.messages.length - 1].content: ""}/>
        ))}
        </div>
    );
}

export default ChatList;