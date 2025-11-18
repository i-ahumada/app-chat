"use client";

import { useEffect, useState } from "react";
import SelectChatButton from "./buttons/SelectChatButton";
import { ChatType } from "../types/commons";
import { useChats } from "../context/ChatContext";

function ChatList() {
    const chatContext = useChats();
    
    useEffect(()=>{
        chatContext.setChats([
            {
                id: "8ea7fd5f-3d61-4af3-9ec2-79e1c78f1d81_8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                messages: [
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "addss",
                        content: "Ni en pedo"
                    }
                ],
            }
        ])

        const ev = new EventSource("/api/sse");

        ev.addEventListener("chat-created", (e) => {
            const data = JSON.parse(e.data);
            console.log("Nuevo chat:", data);
        });

        ev.addEventListener("message-received", (e) => {
            const data = JSON.parse(e.data);
            console.log("Nuevo mensaje:", data);
        });

        ev.addEventListener("chat-deleted", (e) => {
            const data = JSON.parse(e.data);
            console.log("Chat eliminado:", data);
        });

        return () => ev.close();
    }, [])

    return (  
        <div className="flex flex-col gap-3">
        {chatContext.chats.map((c: ChatType) => (
            <SelectChatButton key={c.id} chatId={c.id} lastMessage={c.messages[c.messages.length - 1].content}/>
        ))}
        </div>
    );
}

export default ChatList;