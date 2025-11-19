"use client";

import Avatar from "boring-avatars";
import { splitChatIdForUser } from "../functions/helper";
import { useUserId } from "../context/UserContext";

type ChatInfoProps = {
    chatId: string;
};

function ChatInfo({ chatId }: ChatInfoProps) {
    const userId = useUserId();
    const {other} = splitChatIdForUser(chatId, userId)

    return (
        <div className="flex items-center gap-3">
            <Avatar
                name={other}
                variant="beam"
                size={40}
            />
            <strong className="dark:text-gray-300">
                {other}
            </strong>
        </div>
    );
}

export default ChatInfo;
