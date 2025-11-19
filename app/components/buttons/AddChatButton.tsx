"use client";

import { useState } from "react";
import { useUserId } from "@/app/context/UserContext";
import CreateChatModal from "../modals/CreateChatModal";

function AddChatButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="h-12 w-12 cursor-pointer rounded-full flex items-center justify-center 
                bg-gray-100 dark:bg-gray-800 
                hover:bg-gray-200 hover:dark:bg-gray-700 
                transition-colors duration-150"
            >
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="28" height="28" viewBox="0 0 50 50">
                    <g transform="translate(0,50) scale(0.1,-0.1)" fill="#808080ff">
                        <path d="M240 295 c0 -33 -2 -35 -35 -35 -19 0 -35 -4 -35 -10 0 -5 16 -10 35 -10 33 0 35 -2 35 -35 0 -19 5 -35 10 -35 6 0 10 16 10 35 0 33 2 35 35 35 19 0 35 5 35 10 0 6 -16 10 -35 10 -33 0 -35 2 -35 35 0 19 -4 35 -10 35 -5 0 -10 -16 -10 -35z"/>
                    </g>
                </svg>
            </button>

            {open && <CreateChatModal onClose={() => setOpen(false)} />}
        </>
    );
}

export default AddChatButton;
