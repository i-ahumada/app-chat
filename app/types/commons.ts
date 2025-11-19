
export type MessageType = {
    sender: string,
    content: string,
}

export type ChatType = {
    id: string,
    messages: MessageType[],
}

export type ChatResponseType = {
    status: number,
    chats: ChatType[]
}