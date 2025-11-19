"use client";

import { useUserId } from "@/app/context/UserContext";
import { useState } from "react";

function AddChatButton() {
    const [loading, setLoading] = useState(false);
    const userId = useUserId();

    async function createChat() {
        setLoading(true);

        // Pedimos al usuario con quién quiere chatear
        const other = prompt("Ingrese el UUID del otro usuario:");
        if (!other) {
            setLoading(false);
            return;
        }

        const chatId = `${userId}_${other}`;

        await fetch("/api/chats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: chatId })
        });

        setLoading(false);
    }

    return (
        <button
            onClick={createChat}
            className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
            {loading ? "Creando..." : "Crear chat"}
        </button>
    );
}

export default AddChatButton;
