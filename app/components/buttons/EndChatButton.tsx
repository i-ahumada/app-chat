"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type EndChatButtonProps = {
    chatId: string;
};

function EndChatButton({ chatId }: EndChatButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function endChat() {
        setLoading(true);

        await fetch(`/api/chats/${chatId}`, {
            method: "DELETE",
        });

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
            {loading ? "Cerrando..." : "Cerrar chat"}
        </button>
    );
}

export default EndChatButton;
