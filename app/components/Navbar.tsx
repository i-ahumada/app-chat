"use client";

import { useState } from "react";
import Avatar from "boring-avatars";
import { useUserId } from "../context/UserContext";
import AddChatButton from "./buttons/AddChatButton";

function Navbar() {
    const userId = useUserId();
    const [showId, setShowId] = useState(false);

    const toggleId = () => {
        setShowId((prev) => !prev);
    };

    return (
        <div className="h-full flex flex-col justify-between items-center py-5">
            <AddChatButton />

            <div className="relative flex flex-col items-center">

                {/* AVATAR */}
                <button
                    onClick={toggleId}
                    className="rounded-full transition-transform duration-150 active:scale-90 cursor-pointer"
                >
                    <Avatar name={userId} variant="beam" size={50} />
                </button>

                {/* ID MOSTRADO/OCULTO */}
                {showId && (
                    <div
                        className="
                            absolute 
                            left-14 top-1/2 -translate-y-1/2   
                            px-3 py-1 rounded-xl
                            bg-gray-200 dark:bg-gray-700
                            text-xs text-gray-800 dark:text-gray-200
                            shadow
                            transition-all duration-150
                            flex items-center gap-2
                            whitespace-nowrap
                        "
                    >
                        <span>{userId}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
