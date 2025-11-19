"use client";

import { useUserId } from "@/app/context/UserContext";
import { useState } from "react";

function SendMessageButton({ chatId }: { chatId: string }) {
    const userId = useUserId();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");

    async function sendMessage() {
        if (!userId || !content.trim()) return;

        setLoading(true);

        await fetch(`/api/chats/${chatId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender: userId,
                myUserId: userId,
                content,
            }),
        });

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
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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
                onClick={sendMessage}
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
