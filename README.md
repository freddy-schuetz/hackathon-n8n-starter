# 🚀 Hackathon-Starter: n8n + Claude Code

Eine fertige Grundlage, um beim Hackathon mit **Claude Code** und **n8n** sofort loszulegen — auch ohne Vorerfahrung. Enthält vorkonfigurierte Skills, die n8n-MCP-Anbindung und lauffähige Frontend-/Backend-Beispiele.

---

## ✨ Einrichten in 1 Satz

Öffne die **Claude Code Desktop-App** und schreib:

> **„Richte mir `https://github.com/freddy-schuetz/hackathon-n8n-starter` ein."**

Claude erledigt den Rest (klonen, konfigurieren) und fragt dich nur nach deinem n8n-Zugang. Danach kannst du direkt Workflows bauen lassen.

> Du brauchst vorher nur: **Claude Code Desktop** (eingeloggt mit deinem Claude-Account), **Node.js ≥ 20** und **git**.

---

## 🤖 Setup-Anleitung für Claude (Agent-Runbook)

*Wenn dich jemand bittet, dieses Repo einzurichten, arbeite diese Schritte ab:*

1. **Klonen** (falls noch nicht geschehen) und den Ordner als Projekt öffnen:
   ```bash
   git clone https://github.com/freddy-schuetz/hackathon-n8n-starter
   ```
2. **MCP-Konfig anlegen:** `cp .mcp.json.example .mcp.json`
3. **n8n-Zugang erfragen** und in `.mcp.json` eintragen (Felder `N8N_API_URL` und `N8N_API_KEY`):
   - Frage den User nach seiner **n8n-Cloud-URL** (z.B. `https://xxxx.app.n8n.cloud`) und seinem **n8n-API-Key**.
   - Hat er noch keinen: Anleitung in Schritt „n8n-Trial holen" unten weitergeben.
   - `.mcp.json` ist über `.gitignore` ausgeschlossen → der Key bleibt lokal. **Den Key niemals committen oder ausgeben.**
4. **(Optional) Frontend-Deps installieren**, falls der User eine UI will: `cd frontend-starter && npm install`.
5. **User bitten**, Claude Code neu zu laden/starten, damit der n8n-MCP-Server + die Skills aktiv werden.
6. **Verbindung testen:** `n8n_health_check` aufrufen → muss OK liefern.
7. **Fertig melden** und anbieten: „Soll ich dir deinen ersten Workflow bauen? Es gibt ein Beispiel unter `examples/workflows/hello-webhook.json`."

---

## 🔑 n8n-Trial holen (für Teilnehmer)

1. Auf **[n8n.io](https://n8n.io)** registrieren → kostenlose **Cloud-Trial** starten.
2. Deine Instanz-URL notieren (z.B. `https://deinname.app.n8n.cloud`).
3. In n8n: **Settings → n8n API → Create API Key** → Key kopieren.
4. URL + Key Claude geben (oder selbst in `.mcp.json` eintragen).

---

## 🛠️ Manuelles Setup (ohne Claude, falls gewünscht)

```bash
git clone https://github.com/freddy-schuetz/hackathon-n8n-starter
cd hackathon-n8n-starter
cp .mcp.json.example .mcp.json        # dann N8N_API_URL + N8N_API_KEY eintragen
```
Ordner in Claude Code öffnen → der n8n-MCP-Server (`npx n8n-mcp`) und alle Skills laden automatisch. Verbindung mit „prüfe die n8n-Verbindung" testen.

---

## 📦 Was ist drin?

```
.claude/skills/      Vorkonfigurierte Skills (n8n-Bauen, Testdaten, Doku, Security, Frontend, Backend)
.mcp.json.example    Vorlage für die n8n-MCP-Anbindung (du trägst deinen Key ein)
CLAUDE.md            n8n-Konventionen (lädt automatisch, hilft Claude beim korrekten Bauen)
examples/workflows/  Importierbarer Demo-Workflow für den Einstieg
frontend-starter/    Lauffähige Next.js-App (Formular → n8n-Webhook, optional KI-Chat)
backend-example/     Lauffähiges FastAPI-Backend (für eigene Rechen-/DB-Logik)
```

**Workflows dokumentieren:** Der Skill `n8n-dokumentation` fügt auf Wunsch **Sticky Notes in einfacher Sprache** in deinen Workflow ein — so siehst du auf einen Blick, was wo passiert.

---

## 🧪 Dein erster Workflow

Sag zu Claude z.B.:
> „Bau mir einen Workflow: Webhook empfängt einen Namen, und antworte mit einer freundlichen Begrüßung. Danach dokumentiere ihn mit Sticky Notes."

Oder importiere `examples/workflows/hello-webhook.json` direkt in n8n (Workflows → Import from File).

---

## 🎨 Optional: Frontend & Backend

- **`frontend-starter/`** — Next.js-App mit Formular, das einen n8n-Webhook aufruft. Optionaler KI-Chat (braucht `ANTHROPIC_API_KEY`). Start: `cd frontend-starter && npm install && npm run dev`.
- **`backend-example/`** — FastAPI-Service (`/health` + Beispiel-Endpoint), falls n8n für schwere Rechen-/DB-Logik nicht reicht. Start: siehe `backend-example/README.md`.

---

## 🗄️ Brauche ich eine Datenbank?

Meistens nicht extern. Faustregel:
- **Daten im n8n-Workflow** → **n8n Data Tables** (eingebaut, null Setup, in der Trial dabei).
- **Deployte App / Login / Vektoren** → **Supabase Free** (kein Kreditkarte).
- **Nur lokal** → **SQLite** (nicht auf Vercel-Serverless!).

Details + How-to: **[`docs/datenbank.md`](docs/datenbank.md)**.

---

## ⚠️ Sicherheit
- **Niemals** API-Keys (n8n, Anthropic) ins Repo committen. `.mcp.json` und `.env*` sind in `.gitignore`.
- API-Keys gehören nur in `.mcp.json` (lokal) bzw. n8n-Credentials.

## 📄 Lizenz & Dank
MIT (siehe `LICENSE`). Die n8n-Kern-Skills und der n8n-MCP-Server stammen von
[Romuald Członkowski / czlonkowski](https://github.com/czlonkowski) — Details in `ATTRIBUTION.md`.
