"use client";

import { useChat } from "../context/ChatContext";
import ChatInfo from "./ChatInfo";
import ChatWindow from "./ChatWindow";
import SendMessageButton from "./buttons/SendMessageButton";

function Chat() {
    const { selectedChat } = useChat()    

    // Se re-renderiza cuando selectedChat cambia 

    return ( 
    <div>
        <ChatInfo/>
        <ChatWindow/>
        <SendMessageButton/>
    </div> 
    );
}

export default Chat;