import ChatList from "./ChatList";
import { chatsServices } from "../services/chat.service";


function ChatPanel() {

    return ( 
        <div className="px-3 py-5">
            <ChatList />
        </div>
    );
}

export default ChatPanel;