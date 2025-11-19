"use client";

import { createContext, useContext, useState } from "react";
import { ChatType } from "../types/commons";

export type ChatContextType = {
  chats: ChatType[];
  setChats: React.Dispatch<React.SetStateAction<ChatType[]>>;
  activeChat: string | null;
  setActiveChat: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <ChatContext.Provider value={{ chats, setChats, activeChat, setActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext debe usarse dentro de ChatProvider");
  return ctx;
}
