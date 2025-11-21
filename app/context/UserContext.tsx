"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * UserContext
 * 
 * Contexto para manejar el ID único del usuario en la aplicación.
 * 
 * - UserProvider: envuelve la app y genera/recupera un userId único
 *   usando localStorage. Si no existe, crea uno con uuidv4().
 * - useUserId: hook para obtener el userId en cualquier componente hijo.
 * 
 * Notas:
 * - userId se mantiene constante mientras el usuario use la misma sesión.
 */
const UserContext = createContext<string>("");

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let stored = localStorage.getItem("user_id");
    if (!stored) {
      stored = uuidv4();
      localStorage.setItem("user_id", stored);
    }
    setUserId(stored);
  }, []);

  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserId() {
  return useContext(UserContext);
}
