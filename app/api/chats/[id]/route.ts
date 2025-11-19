import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { sendSSE } from "@/app/lib/sseSend";
import { splitChatIdForUser, getUsersFromChatId } from "@/app/functions/helper";

export const PATCH = async (
  req: NextRequest,
  {params}: {params: { id: string } }
) => {
  const {id} = await params;
  const body = await req.json();
  // body = { sender, content, myUserId }

  const message = {
    sender: body.sender,
    content: body.content,
  };

  await db.addMessage(id, message);

  // quien recibe el mensaje?
  const { other } = splitChatIdForUser(id, body.myUserId);

  sendSSE(other, "message-received", {
    chatId: id,
    message
  });
  sendSSE(body.myUserId, "message-received", {
    chatId: id,
    message
  });

  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  req: NextRequest,
  {params}: {params: { id: string } }
) => {
  const {id} = await params;

  await db.removeChat(id);
  
  const { a, b } = getUsersFromChatId(id);
  
  sendSSE(a, "chat-deleted", { chatId: id });
  sendSSE(b, "chat-deleted", { chatId: id });

  return NextResponse.json({ ok: true });
};
