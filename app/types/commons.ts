
export type Message = {
    sender: string,
    content: string,
}

export type ChatType = {
    id: string,
    messages: Message[],
}