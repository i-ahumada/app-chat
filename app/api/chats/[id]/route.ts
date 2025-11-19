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
  console.log("\n\n\n\n\n\n\n\n\n\n\n\nCHAT ID: ", id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
//   await db.addMessage(chatId, message);

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

export const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const chatId = params.id;

  await db.removeChat(chatId);

  const { a, b } = getUsersFromChatId(chatId);

  sendSSE(a, "chat-deleted", { chatId });
  sendSSE(b, "chat-deleted", { chatId });

  return NextResponse.json({ ok: true });
};
