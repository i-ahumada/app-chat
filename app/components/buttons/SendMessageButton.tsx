"use client";

import { useUserId } from "@/app/context/UserContext";
import { useChats } from "@/app/hooks/useChats";
import { useState } from "react";

function SendMessageButton() {
    const userId = useUserId();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const { sendMessage, activeChat } =  useChats();

    function handleClick() {
        if (!userId || !content.trim() || !activeChat) return;
        setLoading(true);
        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        sendMessage(activeChat, content, time);
        setContent("");
        setLoading(false);
    }

    return (
        <div className="w-full h-full flex items-center gap-3 p-3">

            {/* TextField */}
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleClick()}
                placeholder="Escribe un mensaje..."
                className="
                    flex-1 px-3 py-2 rounded-md 
                    bg-gray-100 dark:bg-gray-800
                    hover:bg-gray-200 hover:dark:bg-gray-700
                    focus:outline-none
                    transition-colors duration-150
                "
            />

            {/* Botón */}
            <button
                onClick={handleClick}
                className="
                    px-4 py-2 rounded-md w-20
                    bg-gray-100 dark:bg-gray-800
                    hover:bg-gray-200 hover:dark:bg-gray-700
                    font-medium
                    transition-colors duration-150
                    cursor-pointer
                "
            >
                {loading ? "..." : "Enviar"}
            </button>

        </div>
    );
}

export default SendMessageButton;
