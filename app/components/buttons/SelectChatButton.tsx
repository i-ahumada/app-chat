"use client";

import Avatar from "boring-avatars";
import { splitChatIdForUser } from "@/app/functions/helper";
import { useUserId } from "@/app/context/UserContext";
import Link from "next/link";

type ChatButtonProps = {
    chatId: string,
    lastMessage: string
}

function SelectChatButton({chatId, lastMessage}: ChatButtonProps) {
    const userId = useUserId(); 
    const { mine, other } = splitChatIdForUser(chatId, userId);

    return (  
        <Link href={`/chats/${chatId}`} className="
            group
            w-full 
            rounded-xl 
            p-2 
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 hover:dark:bg-gray-700
            transition-colors duration-150
            cursor-pointer
            ">
            <div className="flex items-start gap-3 h-15">

                <Avatar name={other} variant="beam"/>

                <div className="flex flex-col flex-1 overflow-hidden">

                <div className="relative">
                    <strong className="
                    block whitespace-nowrap overflow-hidden
                    transition-colors duration-150
                    ">
                    {other}
                    </strong>

                    <div className="
                    absolute right-0 top-0 h-full w-10 pointer-events-none
                    bg-gradient-to-l
                    from-gray-100 dark:from-gray-800
                    to-transparent
                    group-hover:from-gray-200 group-hover:dark:from-gray-700
                    transition-colors duration-150
                    " />
                </div>

                <div className="relative mt-1">
                    <em className="
                    block whitespace-nowrap overflow-hidden
                    transition-colors duration-150
                    ">
                    {lastMessage}
                    </em>

                    <div className="
                    absolute right-0 top-0 h-full w-10 pointer-events-none
                    bg-gradient-to-l
                    from-gray-100 dark:from-gray-800
                    to-transparent
                    group-hover:from-gray-200 group-hover:dark:from-gray-700
                    transition-colors duration-150
                    " />
                </div>

                </div>
            </div>
        </Link>

    );
}

export default SelectChatButton;