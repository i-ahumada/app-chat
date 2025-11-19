import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { sendSSE } from "@/app/lib/sseSend";
import { getUsersFromChatId } from "@/app/functions/helper";

export const POST = async (req: NextRequest) => {
  const chat = await req.json();
  // chat = { id: "userA_userB" }

  await db.addChat({ ...chat, messages: [] });

  const { a, b } = getUsersFromChatId(chat.id);

  sendSSE(a, "chat-created", { chatId: chat.id });
  sendSSE(b, "chat-created", { chatId: chat.id });

  return NextResponse.json({ ok: true });
};
