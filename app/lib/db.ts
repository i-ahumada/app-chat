import fs from "fs/promises";
import path from "path";
import { ChatType, MessageType } from "../types/commons";

const DB_PATH = path.join(process.cwd(), "/app/repositories/db.json");

class ChatsDB {
    // Leer el archivo
    private async readDB(): Promise<ChatType[]> {
        try {
        const data = await fs.readFile(DB_PATH, "utf-8");
        return JSON.parse(data) as ChatType[];
        } catch {
        return [];
        }
    }

    // Escribir el archivo
    private async writeDB(chats: ChatType[]): Promise<void> {
        await fs.writeFile(DB_PATH, JSON.stringify(chats, null, 2));
    }

    // Obtener todos los chats donde participa el usuario
    async getByUUID(uuid: string): Promise<ChatType[]> {
        const chats = await this.readDB();
        return chats.filter(chat => {
            const [a, b] = chat.id.split("_");
            return a === uuid || b === uuid;
        });
    }

    // Obtener chat por id
    async getById(idChat: string): Promise<ChatType | undefined> {
        const chats = await this.readDB();
        return chats.find(c => c.id === idChat);
    }

    // Agregar un nuevo chat (si no existe)
    async addChat(chat: ChatType): Promise<void> {
        const chats = await this.readDB();
        if (!chats.find(c => c.id === chat.id)) chats.push(chat);
        await this.writeDB(chats);
    }

    // Agregar un mensaje a un chat existente
    async addMessage(idChat: string, message: MessageType): Promise<void> {
        const chats = await this.readDB();

        // crear un NUEVO array de chats
        const updatedChats = chats.map(chat =>
            chat.id === idChat
                ? { ...chat, messages: [...chat.messages, message] }
                : chat
        );

        await this.writeDB(updatedChats);
    }


    // Eliminar chat por id
    async removeChat(idChat: string): Promise<void> {
        const chats = await this.readDB();
        await this.writeDB(chats.filter(c => c.id !== idChat));
    }
}

export const db = new ChatsDB();