import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { chatServices } from "../../services/chat.service";

export const GET = async (
  req: NextRequest,
  {params}: {params: { id: string } }
) => {
  try {
    const { id } = await params;
    const chats = await chatServices.getChatsByUser(id);
    return NextResponse.json({ status: 200, chats });
  } catch (err: any) {
    return NextResponse.json({ status: 400, error: err.message });
  }
};