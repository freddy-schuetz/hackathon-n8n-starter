"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

// Muster C — KI-Chat mit Token-Streaming. Ruft POST /api/chat auf.
export default function ChatPage() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const busy = status === "submitted" || status === "streaming";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">KI-Chat (Muster C)</h1>
      <p className="text-sm text-gray-600">
        Streamt Antworten von Claude. Braucht <code>ANTHROPIC_API_KEY</code> in{" "}
        <code>.env.local</code>.
      </p>

      <div className="flex flex-1 flex-col gap-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "self-end rounded-lg bg-brand px-3 py-2 text-white"
                : "self-start rounded-lg bg-gray-200 px-3 py-2"
            }
          >
            {message.parts.map((part, i) =>
              part.type === "text" ? <span key={i}>{part.text}</span> : null,
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Frag mich etwas …"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-brand px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          Senden
        </button>
      </form>
    </main>
  );
}
