"use client";

type ChatMessageProps = {
    mine: boolean;
    content: string;
    time: string;
};

export default function ChatMessage({ mine, content, time }: ChatMessageProps) {
    return (
        <div
            className={`w-full flex ${mine ? "justify-end" : "justify-start"} my-1`}
        >
            <div
                className={`
                    relative
                    max-w-[300px]
                    px-4 py-2 rounded-2xl
                    text-gray-900 dark:text-white
                    break-words whitespace-pre-wrap
                    ${mine ? "bg-blue-100 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-800"}
                    
                    ${mine
                        ? "after:absolute after:content-[''] after:right-[-6px] after:top-3 after:border-t-8 after:border-t-transparent after:border-b-8 after:border-b-transparent after:border-l-8 after:border-l-blue-100 dark:after:border-l-blue-800"
                        : "after:absolute after:content-[''] after:left-[-6px] after:top-3 after:border-t-8 after:border-t-transparent after:border-b-8 after:border-b-transparent after:border-r-8 after:border-r-gray-100 dark:after:border-r-gray-800"
                    }
                `}
            >
                {content}

                <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 text-right">
                    {time}
                </div>
            </div>
        </div>
    );
}
