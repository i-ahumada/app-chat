"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * NotificationContext
 * 
 * Contexto para manejar notificaciones globales.
 * - notify({ message, type }): muestra un mensaje de éxito o error que desaparece solo.
 * - NotificationProvider: envuelve la app y maneja estado interno.
 * - useNotification: hook para disparar notificaciones desde cualquier componente.
 * 
 * Notas:
 * - Se lanza error si se usa fuera del provider.
 * - Mensajes desaparecen automáticamente tras 4 segundos.
 */

type Notification = { message: string; type?: "error" | "success" };
type NotificationContextType = {
    notify: (notification: Notification) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    const notify = (n: Notification) => {
        setNotification(n);
        setTimeout(() => setNotification(null), 4000); // desaparece después de 4s
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            {notification && (
                <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white ${
                    notification.type === "error" ? "bg-red-300 dark:bg-red-900" : "bg-green-600"
                }`}>
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification debe usarse dentro de NotificationProvider");
    return context;
};
