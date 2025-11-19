import ChatInfo from "@/app/components/ChatInfo";
import ChatWindow from "@/app/components/ChatWindow";
import SendMessageButton from "@/app/components/buttons/SendMessageButton";
import EndChatButton from "@/app/components/buttons/EndChatButton";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    

    return (
        <div className="h-full flex flex-col">
            <div className="flex-[1] flex items-center justify-between px-4 min-h-0 border-b border-neutral-300 dark:border-neutral-700">
                <ChatInfo chatId={id}/>
                <EndChatButton chatId={id}/>
            </div>

            <div className="flex-[8] min-h-0 overflow-y-auto">
                <ChatWindow chatId={id} />
            </div>

            <div className="flex-[1] min-h-0">
                <SendMessageButton chatId={id} />
            </div>
        </div>
    );
}