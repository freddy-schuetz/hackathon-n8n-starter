---
name: frontend-build
description: Standard-Stack, Backend-Anbindung (n8n-Webhook / FastAPI / AI-Streaming) und Vercel-Deploy für Next.js/React-Frontends. Verwenden beim Bauen/Debuggen von UI, bei Tailwind, bei n8n-Webhook- oder FastAPI-Anbindung, beim AI-Chat-Streaming und beim Deployen nach Vercel. Lauffähiges Beispiel: frontend-starter/.
---

# Frontend bauen & deployen

Verbindliche Konventionen für Web-Frontends. Ziel: keine Stack-Drift, keine bekannten Fehler wiederholen. Für **neue** Projekte siehe Skill `frontend-scaffold`. Lauffähiges Beispiel in diesem Repo: **`frontend-starter/`**.

## Standard-Stack (nicht abweichen ohne Grund)

| Bereich | Festlegung |
|---------|-----------|
| Framework | **Next.js 16** (App Router), `next@16.x` |
| UI | **React 19**, `react`/`react-dom@^19` |
| Sprache | **TypeScript 5.9** (neuestes 5.x, **kein** TS 6), `strict: true` |
| Styling | **Tailwind CSS 4** (CSS-first: `@import "tailwindcss"` in der globalen CSS, **kein** `tailwind.config.ts`; PostCSS-Plugin `@tailwindcss/postcss`) |
| Paketmanager | **npm** — kein pnpm/yarn/bun |
| Pfad-Alias | `@/*` → `./*` |
| Map-Apps | `maplibre-gl@^4.7`, **dynamisch** importiert (SSR-safe), OSM-Raster ohne API-Key |

`tsconfig` Eckwerte: `noEmit`, `jsx: preserve`, `moduleResolution: bundler`, `module: esnext`, `skipLibCheck`, `paths: {"@/*": ["./*"]}`.

### Versions-Policy
Auf **current-stable** pinnen und bewusst nachziehen — nicht Bleeding-Edge jagen, aber auch nicht Majors zurückfallen lassen. Konkret: Framework/React/Tailwind auf dem aktuellen stabilen Major (Stand 2026-06: Next 16, React 19, Tailwind 4), **TypeScript** bewusst auf dem neuesten **5.x** halten, bis sich der jüngste TS-Major (6.x) gesetzt hat. Tailwind 3→4 ist Breaking (CSS-first, kein JS-Config).

Ordnerkonvention: `app/` (Routes) · `components/` (UI) · `lib/` (`n8n.ts` bzw. `api.ts`, `types.ts`).

## Backend-Anbindung — Eskalationsleiter

**n8n ist Backend #1.** Erst wenn n8n für den Fall nicht sinnvoll ist, eine Stufe runter:

1. **Muster A — n8n-Webhook** (*immer zuerst*): Orchestrierung, Integrationen, Scheduled Jobs, **auch nicht-streamende AI** (LangChain/AI-Agent-Nodes).
2. **Muster B — FastAPI** — wenn eigene Rechen-/DB-/Geo-Logik n8n sprengt. Service-Seite (Struktur, Docker, Deploy) → Skill `backend-fastapi` (+ Beispiel `backend-example/`).
3. **Muster C — Next-natives AI-Streaming** — *nur* für **Token-Streaming** einer Chat-UI ins eigene Frontend (n8n-Webhooks geben *eine* fertige Antwort, streamen keine Tokens).

### Muster A — n8n-Webhook (Default)
- Env: `NEXT_PUBLIC_N8N_BASE=https://…` (Client-seitig).
- URL-Builder gebündelt in `lib/n8n.ts`, z.B. `${NEXT_PUBLIC_N8N_BASE}/webhook/<pfad>`.
- ⚠️ **Webhook-Payload liegt n8n-seitig unter `.body`** (vgl. CLAUDE.md) — der n8n-Workflow muss das berücksichtigen, nicht das Frontend.
- Voice-Apps: OpenAI Realtime über **ephemeren Token** (n8n liefert Token, Browser baut WebRTC auf).

### Muster B — FastAPI-Proxy / Monorepo
- Struktur: `frontend/` (Next.js, Vercel) + `backend/` (FastAPI, Docker auf VPS). Die **Service-Seite** steht im Skill `backend-fastapi` — hier nur die Frontend-/Proxy-Seite.
- `frontend/next.config.mjs` proxyt `/api/*` an den Backend-Service → **kein CORS**:

```js
// frontend/next.config.mjs
const backend = process.env.BACKEND_URL || "http://127.0.0.1:8080";
/** @type {import('next').NextConfig} */
export default {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backend}/:path*` }];
  },
};
```

- Frontend ruft immer **relativ** `/api/...` auf (nie die Backend-URL hart codieren).
- Prod: `BACKEND_URL` als Vercel-Env auf die Backend-Subdomain setzen.

### Muster C — Next-natives AI-Streaming (Vercel AI SDK)

**Nur** wenn eine Chat-UI **Token-Streaming** ins eigene Frontend braucht (sonst AI über n8n!). Dünner Route Handler, kein eigenes Backend. Provider: **Anthropic direkt** (Vercel-freundlich, Env-Key).

Deps: `ai@^6`, `@ai-sdk/anthropic@^3`, `@ai-sdk/react@^3`. Env: `ANTHROPIC_API_KEY`.

`lib/ai/model.ts` — eine Stelle für Provider + Modell:
```ts
import { anthropic } from "@ai-sdk/anthropic"; // liest ANTHROPIC_API_KEY aus der Env
export const getModel = () => anthropic("claude-opus-4-8");
```

`app/api/chat/route.ts` — Streaming-Endpoint:
```ts
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getModel } from "@/lib/ai/model";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamText({ model: getModel(), messages: await convertToModelMessages(messages) });
  return result.toUIMessageStreamResponse();
}
```

Client (`"use client"`) mit `useChat` aus `@ai-sdk/react` (Default-Endpoint `POST /api/chat`):
```tsx
const { messages, sendMessage, status } = useChat();
// senden:  sendMessage({ text: input })
// rendern: message.parts.filter(p => p.type === "text").map(p => p.text).join("")
```

- ⚠️ **Persistenz NICHT via SQLite** — Vercel-Serverless hat ephemeres FS, eine lokale `.sqlite` ist nach dem Request weg. Chatverlauf/Daten → Supabase/Postgres oder n8n.

## Vercel-Deploy-Playbook

- **Schnellweg (einmaliger Hackathon-Deploy):** im Frontend-Ordner `npx vercel login` (Browser-Login macht der User), dann `npx vercel --prod`. Geht **ohne** GitHub-Repo. Env-Vars vorher per `npx vercel env add <NAME> production` setzen (oder im Dashboard).
- **Laufende Entwicklung:** Git-Import (Repo in Vercel importieren) → jeder `git push` deployt automatisch.
- ⚠️ **`NEXT_PUBLIC_*` ist build-time** — Env **vor** dem Build setzen; nach Änderung **neu deployen**, sonst greift der alte Wert.
- ⚠️ **git-Autor-Mail muss zu deinem GitHub-Account passen** (nur Git-Weg), sonst kann Vercel den Push ablehnen.
- **Monorepo:** in Vercel `rootDirectory = frontend` setzen.
- Falls die CLI mal hängt: den **Git-Import-Weg** nutzen. Secrets nur ins Vercel-Dashboard / `.env.local`, **nie** ins Repo.

## Vor dem Push verifizieren (Pflicht)

1. **`npm run build`** lokal — Build muss grün sein (fängt SSR-/Type-Fehler vor Vercel ab).
2. `npm run dev` für visuelle Preview der Änderung.
3. Erst dann `git push`.

## Env-Var-Checkliste

- n8n-Webhook (Muster A): `NEXT_PUBLIC_N8N_BASE`
- FastAPI-/Monorepo-App (Muster B): `BACKEND_URL` (Prod)
- AI-Streaming (Muster C): `ANTHROPIC_API_KEY`
- App-eigene Secrets: nur in `.env.local` / Vercel-Dashboard, nie im Repo.

## a11y-Mini-Checkliste (vor Release)

- Semantische Elemente (`<button>`, `<nav>`, `<main>`, `<label for>`) statt klickbarer `<div>`.
- Jedes Interaktionselement per Tastatur erreichbar; sichtbarer `:focus`-Zustand.
- Bilder mit `alt`; Icons-only-Buttons mit `aria-label`.
- Farbkontrast ≥ 4.5:1 für Text; Status nie nur über Farbe kommunizieren.
- Formularfehler textlich + `aria-invalid`/`aria-describedby`.

## QA vor Release (manuell, leichtgewichtig)

- Happy-Path + ein Fehlerfall je zentralem Flow im Browser durchklicken.
- Netzwerk-Tab: keine 4xx/5xx auf den `/api`- bzw. Webhook-Calls.
- Mobile-Viewport (375px) prüfen — Layout bricht nicht.
- Console frei von Errors/Warnings; **keine `console.log`-Reste** committen.
