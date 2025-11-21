import { NextRequest, NextResponse } from "next/server";
import { chatServices } from "../services/chat.service";

export const POST = async (req: NextRequest) => {
  try {
    const chat = await req.json();

    const created = await chatServices.createChat({ ...chat, messages: [] });
    
    return NextResponse.json({ ok: true, chat: created });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
};
