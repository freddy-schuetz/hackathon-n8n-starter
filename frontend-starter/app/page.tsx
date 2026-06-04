"use client";

import { useState } from "react";
import { postWebhook } from "@/lib/n8n";

type HelloResponse = { message?: string };

export default function Home() {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await postWebhook<HelloResponse>("hello", { name });
      setAnswer(res.message ?? JSON.stringify(res));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 p-8">
      <header>
        <h1 className="text-2xl font-bold">Hackathon Frontend-Starter</h1>
        <p className="mt-1 text-gray-600">
          Muster A: Formular ruft einen <strong>n8n-Webhook</strong> auf.
          Baue dazu in n8n den Workflow{" "}
          <code className="rounded bg-gray-200 px-1">hello-webhook.json</code>.
        </p>
      </header>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label htmlFor="name" className="text-sm font-medium">
          Dein Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Max"
          className="rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {loading ? "Sende …" : "An n8n senden"}
        </button>
      </form>

      {answer && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
          {answer}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          {error}
        </div>
      )}

      <p className="text-sm text-gray-500">
        Optionaler KI-Chat (Muster C):{" "}
        <a href="/chat" className="text-brand underline">
          /chat
        </a>{" "}
        (braucht <code>ANTHROPIC_API_KEY</code>).
      </p>
    </main>
  );
}
