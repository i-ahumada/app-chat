"use client";

import { useState } from "react";
import Avatar from "boring-avatars";
import { useUserId } from "../context/UserContext";
import AddChatButton from "./buttons/AddChatButton";

function Navbar() {
    const userId = useUserId();
    const [copied, setCopied] = useState(false);

    const copyId = async () => {
        if (!userId) return;
        await navigator.clipboard.writeText(userId);
        setCopied(true);
        setTimeout(() => setCopied(false), 900);
    };

    return (
        <div className="h-full flex flex-col justify-between items-center py-5">
            <AddChatButton />

            <div className="relative group flex flex-col items-center">
                
                {/* AVATAR */}
                <button
                    onClick={copyId}
                    className="rounded-full transition-transform duration-150 active:scale-90 cursor-pointer"
                >
                    <Avatar name={userId} variant="beam" size={50} />
                </button>

                {/* HOVER TAG (UUID + Ícono copiar) */}
                <div
                    className="
                        absolute 
                        left-14 top-1/2 -translate-y-1/2   
                        px-3 py-1 rounded-xl
                        bg-gray-200 dark:bg-gray-700
                        text-xs text-gray-800 dark:text-gray-200
                        shadow
                        opacity-0 group-hover:opacity-100
                        translate-x-[-5px] group-hover:translate-x-0
                        transition-all duration-150
                        flex items-center gap-2 pointer-events-none
                        whitespace-nowrap
                    "
                >
                    <span>{userId}</span>

                    {/* Ícono cuadrado de "copiar" */}
                    <div className="w-3 h-3 border border-gray-700 dark:border-gray-300 rounded-sm"></div>
                </div>

                {/* Texto "Copiado" */}
                {copied && (
                    <span
                        className="
                            absolute -top-7 text-xs text-gray-600 
                            dark:text-gray-300 opacity-0 animate-fade-in-out
                        "
                    >
                        Copiado
                    </span>
                )}
            </div>
        </div>
    );
}

export default Navbar;
