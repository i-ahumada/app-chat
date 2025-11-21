"use client";

import { useState } from "react";
import CreateChatModal from "../modals/CreateChatModal";

function AddChatButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="h-12 w-12 flex items-center justify-center rounded-full 
                           bg-gray-100 dark:bg-gray-800 
                           hover:bg-gray-200 hover:dark:bg-gray-700 
                           transition-colors duration-200 
                           text-gray-500 dark:text-gray-400 
                           text-2xl cursor-pointer"
            >
                +
            </button>

            {open && <CreateChatModal onClose={() => setOpen(false)} />}
        </>
    );
}

export default AddChatButton;
