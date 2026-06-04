// Muster A — n8n-Webhook aus dem Frontend aufrufen.
// Basis-URL kommt aus der Env (build-time, daher NEXT_PUBLIC_*).

const BASE = process.env.NEXT_PUBLIC_N8N_BASE ?? "";

export function webhookUrl(path: string): string {
  const clean = path.replace(/^\//, "");
  return `${BASE}/webhook/${clean}`;
}

export async function postWebhook<T = unknown>(
  path: string,
  body: unknown,
): Promise<T> {
  if (!BASE) {
    throw new Error(
      "NEXT_PUBLIC_N8N_BASE ist nicht gesetzt — trage deine n8n-URL in .env.local ein.",
    );
  }
  const res = await fetch(webhookUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Webhook-Fehler ${res.status}: ${await res.text()}`);
  }
  // n8n kann JSON oder Text zurückgeben:
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
}
