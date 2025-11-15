"use client";

import { useState } from "react";
import SelectChatButton from "./buttons/SelectChatButton";
import { ChatType } from "../types/commons";

function ChatList() {
    const [chats, setChats] = useState<ChatType[]>([]);

    // Hook para lo del SSE, o directamente aca no se pero settea chats

    return (  
        <div className="flex flex-col">
            <SelectChatButton chatId="129bb9e4-9425-4f64-a3cd-32b2374830fc_8ea7fd5f-3d61-4af3-9ec2-79e1c78f1d81" 
            lastMessage="Hello"/> {/* Solo es para ver el estilo */}
        {chats.map((c: ChatType) => (
            <SelectChatButton key={c.id} chatId={c.id} lastMessage={c.messages[c.messages.length - 1].content}/>
        ))}
        </div>
    );
}

export default ChatList;