"use client";

import { useUserId } from "@/app/context/UserContext";
import { useState } from "react";

function SendMessageButton({ chatId }: { chatId: string }) {
    const userId = useUserId();
    const [loading, setLoading] = useState(false);

    async function sendMessage() {
        if (!userId) return;

        const content = prompt("Mensaje:");
        if (!content) return;

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

        setLoading(false);
    }

    return (
        <button
            onClick={sendMessage}
            className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
            {loading ? "Enviando..." : "Enviar mensaje"}
        </button>
    );
}

export default SendMessageButton;
