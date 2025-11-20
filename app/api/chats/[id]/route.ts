import { NextRequest, NextResponse } from "next/server";
import { chatServices } from "../../services/chat.service";

export const PATCH = async (
  req: NextRequest,
  {params}: {params: { id: string } }
) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const message = { sender: body.sender, content: body.content, time: body.time };
    await chatServices.addMessage(id, message);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
};

export const DELETE = async (
  req: NextRequest,
  {params}: {params: { id: string } }
  ) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const userId = body.sender;
    await chatServices.deleteChat(id,userId);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
};
