"use client";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

export default function Inbox() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4 border-r border-gray-800">
      {/* Icono decorativo /}*/}
      <ChatBubbleLeftEllipsisIcon className="w-16 h-16 mb-4 text-gray-400 animate-bounce" />

      {/* Texto */}
      <p className="text-gray-400 text-lg">
        Selecciona un chat para comenzar
      </p>
    </div>
  );
}