"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
