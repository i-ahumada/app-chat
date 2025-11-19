import { NextRequest } from "next/server";
import { sseClients } from "@/app/lib/sseClients";
import { db } from "@/app/lib/db";
import { ChatResponseType } from "@/app/types/commons";
import { NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {params}: {params: { id: string } }
) => {
    const {id} = await params;

    const chats = await db.getByUUID(id)
    console.log(chats);
    const response: ChatResponseType = {
        status: 200,
        chats: chats
    };

    return NextResponse.json(response);
};