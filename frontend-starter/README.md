# Frontend-Starter (Next.js 16 + React 19 + Tailwind 4)

Minimaler, lauffähiger Starter für Hackathon-Frontends.

## Start
**Am einfachsten:** sag Claude *„starte mein Frontend"* — es übernimmt `npm install`, startet den Dev-Server (im Hintergrund) und gibt dir die **`http://localhost:3000`**-URL. Du musst nichts tippen.

Manuell geht natürlich auch:
```bash
npm install
cp .env.local.example .env.local   # NEXT_PUBLIC_N8N_BASE eintragen
npm run dev                        # http://localhost:3000
```

## Was ist drin?
- **`/` (Muster A — n8n-Webhook):** Formular → POST an `${NEXT_PUBLIC_N8N_BASE}/webhook/hello`.
  Baue dazu in n8n den Workflow aus `../examples/workflows/hello-webhook.json`.
- **`/chat` (Muster C — KI-Chat, optional):** Token-Streaming von Claude via Vercel AI SDK.
  Braucht `ANTHROPIC_API_KEY` in `.env.local`.

## Struktur
```
app/page.tsx          Webhook-Formular (Muster A)
app/chat/page.tsx     KI-Chat (Muster C)
app/api/chat/route.ts Streaming-Endpoint (Muster C)
lib/n8n.ts            Webhook-Helper
lib/ai/model.ts       LLM-Provider/Modell (Anthropic)
```

## Deploy
`npm run build` muss grün sein, dann nach Vercel pushen (`NEXT_PUBLIC_N8N_BASE` als Env setzen).
Backend-Logik gehört nach n8n (Muster A) — für eigene Rechen-/DB-Logik siehe `../backend-example/`.
