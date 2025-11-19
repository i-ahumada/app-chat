"use client";

import { useChats } from "@/app/hooks/useChats";
import { useRouter } from "next/navigation";
import { useState } from "react";

function EndChatButton() {
    const { deleteChat, activeChat } = useChats();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    function endChat() {
        if (!activeChat) return; 
        setLoading(true);
        deleteChat(activeChat); 
        router.push("/");
        router.refresh();
    }

    return (
        <button
            onClick={endChat}
            disabled={loading}
            className="
                px-3 py-1 rounded-md
                bg-red-300 dark:bg-red-900 
                hover:bg-red-200 hover:dark:bg-red-700 
                transition-colors duration-150
                disabled:opacity-50 cursor-pointer
            "
        >
            {loading ? "Cerrando..." : "Terminar chat"}
        </button>
    );
}

export default EndChatButton;
