"use client";

import SelectChatButton from "./buttons/SelectChatButton";
import { useChats } from "../hooks/useChats";

function ChatList() {
    const { chats } = useChats();

    if (!chats) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 gap-3">
                <div className="w-10 h-10 border-4 border-gray-100 border-dashed rounded-full animate-spin"></div>
                <p className="text-lg font-medium">Cargando tus chats...</p>
            </div>
        );
    }

    if (chats.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 gap-4">
                <p className="text-xl font-semibold">¡Aún no tienes chats!</p>
                <p className="text-sm text-center text-gray-400 dark:text-gray-500 max-w-xs">
                    Cuando empieces a conversar, tus chats aparecerán aquí.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {chats.filter(Boolean).map(c => (
                <SelectChatButton
                    key={c.id}
                    chatId={c.id}
                    lastMessage={c.messages?.length > 0 ? c.messages[c.messages.length - 1].content : ""}
                />
            ))}
        </div>
    );
}

export default ChatList;