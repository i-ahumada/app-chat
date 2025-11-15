"use client";

import { createContext, useContext, useState } from "react";

export type ChatContextType = {
  selectedChat: string | null;
  setSelectedChat: (id: string | null) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  
  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat debe usarse dentro de ChatProvider");
  return ctx;
}
