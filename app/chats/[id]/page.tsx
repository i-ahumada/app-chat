import ChatInfo from "@/app/components/ChatInfo";
import ChatWindow from "@/app/components/ChatWindow";
import SendMessageButton from "@/app/components/buttons/SendMessageButton";
import { chatsServices } from "@/app/services/chat.service";
import { ChatType, ChatResponseType } from "@/app/types/commons";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;


    return (
        <div>
            <ChatInfo />
            <ChatWindow chatId={id}/>
            <SendMessageButton/>
        </div>
    );
}