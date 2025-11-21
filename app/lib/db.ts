import fs from "fs/promises";
import path from "path";
import { ChatType, MessageType } from "../types/commons";

const DB_PATH = path.join(process.cwd(), "/app/repositories/db.json");

class ChatsDB {
    private async readDB(): Promise<ChatType[]> {
        try {
        const data = await fs.readFile(DB_PATH, "utf-8");
        return JSON.parse(data) as ChatType[];
        } catch {
        return [];
        }
    }

    private async writeDB(chats: ChatType[]): Promise<void> {
        await fs.writeFile(DB_PATH, JSON.stringify(chats, null, 2));
    }

    // Obtener todos los chats y ultimo msj de cada uno donde participa el usuario
    async getByUUID(uuid: string): Promise<ChatType[]> {
        const chats = await this.readDB();

        const userChats = chats.filter(chat => {
            const [a, b] = chat.id.split("_");
            return a === uuid || b === uuid;
        });

        return userChats.map(chat => {
            const lastMsg = chat.messages?.length
                ? chat.messages[chat.messages.length - 1]
                : null;

            return {
                ...chat,
                messages: lastMsg ? [lastMsg] : []
            };
        });
    }

    async getById(idChat: string): Promise<ChatType | null> {
        const chats = await this.readDB();
        const chat = chats.find(c => c.id === idChat);
        if (!chat) {
            return null;
        }
        return chat;
    }

    async addChat(chat: ChatType): Promise<void> {
        const chats = await this.readDB();
        if (!chats.find(c => c.id === chat.id)) chats.push(chat);
        await this.writeDB(chats);
    }

    async addMessage(idChat: string, message: MessageType): Promise<void> {
        const chats = await this.readDB();
        const updatedChats = chats.map(chat =>
            chat.id === idChat
                ? { ...chat, messages: [...chat.messages, message] }
                : chat
        );

        await this.writeDB(updatedChats);
    }
    async removeChat(idChat: string): Promise<void> {
        const chats = await this.readDB();
        await this.writeDB(chats.filter(c => c.id !== idChat));
    }
}

export const db = new ChatsDB();