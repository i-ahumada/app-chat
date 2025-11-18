"use client";

type ChatMessageProps = {
    mine: boolean,
    content: string
}

export default function ChatMessage({ mine, content }: ChatMessageProps) {
    return (
        <div className={`w-full flex ${mine ? "justify-end" : "justify-start"} my-2`}>
            <div
                className={`
                    max-w-[300px]
                    px-4 py-2 rounded-2xl
                    text-gray dark:text-white
                    break-words whitespace-pre-wrap
                    ${mine ? "bg-blue-100 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-800"}
                `}
            >
                {content}
            </div>
        </div>
    );
}
