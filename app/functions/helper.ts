export function splitChatIdForUser(chatId: string, myUserId: string) {
    const [a, b] = chatId.split("_");

    if (!a || !b) {
        throw new Error("ChatId inválido, debe contener dos UUID.");
    }

    const mine = a === myUserId ? a : b;
    const other = a === myUserId ? b : a;

    return { mine, other };
}

export function getUsersFromChatId(chatId: string) {
    const [a, b] = chatId.split("_");
    if (!a || !b) throw new Error("Invalid chatId");
    return { a, b };
}
