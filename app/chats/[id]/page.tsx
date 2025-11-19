"use client"

import ChatInfo from "@/app/components/ChatInfo";
import ChatWindow from "@/app/components/ChatWindow";
import SendMessageButton from "@/app/components/buttons/SendMessageButton";
import EndChatButton from "@/app/components/buttons/EndChatButton";
import { useChats } from "@/app/hooks/useChats";

export default function ChatPage() {
    const { activeChat } = useChats();

    if (!activeChat) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <span className="text-[6rem] mb-4">😢</span>
                <h1 className="text-3xl font-bold mb-2">Chat finalizado</h1>
                <p className="text-lg text-center max-w-xs">
                    Parece que esta conversación ha terminado. Podés volver a la lista de chats o iniciar uno nuevo.
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-[1] flex items-center justify-between px-4 min-h-0 border-b border-neutral-300 dark:border-neutral-700">
                <ChatInfo/>
                <EndChatButton/>
            </div>

            <div className="flex-[8] min-h-0 overflow-y-auto">
                <ChatWindow/>
            </div>

            <div className="flex-[1] min-h-0">
                <SendMessageButton/>
            </div>
        </div>
    );
}
