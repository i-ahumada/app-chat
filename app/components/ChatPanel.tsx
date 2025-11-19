import ChatList from "./ChatList";
import { chatsServices } from "../services/chat.service";


function ChatPanel() {
    const chats = [
            {
                id: "8ea7fd5f-3d61-4af3-9ec2-79e1c78f1d81_8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                messages: [
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "8f2b0c41-0e17-4e3b-baf4-d3cbe91c62c4",
                        content: "sexo?"
                    },
                    {
                        sender: "addss",
                        content: "Ni en pedo"
                    }
                ],
            }
        ]
    return ( 
        <div className="px-3 py-5">
            <ChatList chats={chats}/>
        </div>
    );
}

export default ChatPanel;