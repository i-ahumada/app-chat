"use client";

import { createContext, useContext, useState } from "react";
import { ChatType } from "../types/commons";

/**
 * Contexto de React para manejar el estado global de los chats en la aplicación.
 * Permite almacenar y actualizar:
 * 
 * - chats: arreglo de chats del usuario o null si aún no se cargaron.
 * - activeChat: ID del chat actualmente activo o null si no hay ninguno seleccionado.
 * 
 * Proporciona:
 * - setChats: función para actualizar la lista de chats.
 * - setActiveChat: función para actualizar el chat activo.
 * 
 * Uso:
 * - ChatProvider: componente que envuelve la app y provee el contexto.
 * - useChatContext: hook para consumir el contexto en cualquier componente hijo.
 */


export type ChatContextType = {
  chats: ChatType[] | null; // ahora puede ser null
  setChats: React.Dispatch<React.SetStateAction<ChatType[] | null>>;
  activeChat: string | null;
  setActiveChat: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<ChatType[] | null>(null); // inicialmente null
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
