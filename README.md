# 🚀 Hackathon-Starter: n8n + Claude Code + Frontend-Stack

Eine fertige Grundlage, um beim Hackathon mit **Claude Code** und **n8n** sofort loszulegen — auch ohne Vorerfahrung. Enthält vorkonfigurierte Skills, die n8n-MCP-Anbindung, einen modernen **Frontend-Stack** (Next.js 16 · React 19 · TypeScript · Tailwind CSS 4) und lauffähige Frontend-/Backend-Beispiele.

---

## ✨ Einrichten in 1 Satz

Öffne die **Claude Code Desktop-App** und schreib:

> **„Richte mir `https://github.com/freddy-schuetz/hackathon-n8n-starter` ein."**

Claude erledigt den Rest (klonen, konfigurieren) und fragt dich nur nach deinem n8n-Zugang. Danach kannst du direkt Workflows bauen lassen.

> Du brauchst nur **Claude Code Desktop** (eingeloggt mit deinem Claude-Account). **Node.js und git richtet Claude beim Setup automatisch ein** (per `winget`/`brew`) — du musst nichts vorinstallieren.
>
> 🧩 **Du nutzt Codex, OpenCode o.ä. statt Claude Code?** → Setup-Anleitung in **[AGENTS.md](AGENTS.md)**.

---

## 🤖 Setup-Anleitung für Claude (Agent-Runbook)

*Wenn dich jemand bittet, dieses Repo einzurichten, arbeite diese Schritte ab — Ziel: **EIN Befehl, danach läuft alles**. Erledige die Voraussetzungen selbst, lass den User nichts vorinstallieren.*

1. **Voraussetzungen prüfen & ggf. installieren:**
   - `git --version` und `node --version` prüfen (Node ≥ 20 — wird für den n8n-MCP-Server via `npx` gebraucht).
   - Fehlt etwas, installieren:
     - **Windows:** `winget install --silent --accept-package-agreements --accept-source-agreements Git.Git` bzw. `OpenJS.NodeJS.LTS`
     - **macOS:** `brew install git node` (kein Homebrew vorhanden? → von [nodejs.org](https://nodejs.org) bzw. [git-scm.com](https://git-scm.com))
     - **Linux:** Paketmanager, z.B. `sudo apt install -y git nodejs npm`
   - ⚠️ Windows zeigt evtl. eine **UAC-Abfrage** (vom User bestätigen lassen). Nach der Installation ist das Programm oft erst in einem **neuen** Terminal im PATH — falls `node`/`git` direkt danach „not found": den User bitten, Claude Code **einmal neu zu starten**, dann hier weiter.
2. **Klonen** und den Ordner als Projekt öffnen: `git clone https://github.com/freddy-schuetz/hackathon-n8n-starter`
3. **MCP-Konfig anlegen:** `cp .mcp.json.example .mcp.json`
4. **n8n-Zugang erfragen** und in `.mcp.json` eintragen (`N8N_API_URL`, `N8N_API_KEY`):
   - Frage nach **n8n-Cloud-URL** + **API-Key**. Hat der User keinen: Anleitung „n8n-Trial holen" unten weitergeben.
   - `.mcp.json` ist gitignored → Key bleibt lokal. **Niemals committen oder ausgeben.**
5. **(Optional) Frontend-Deps**, falls eine UI gewünscht ist: `cd frontend-starter && npm install`.
6. **User bitten, Claude Code neu zu laden/starten**, damit n8n-MCP + Skills aktiv werden.
7. **Verbindung testen:** `n8n_health_check` → muss OK liefern.
8. **Fertig melden** und ersten Workflow anbieten (Beispiele in `examples/workflows/`).

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

## 📦 Was ist drin? (und was es für dich tut)

### Die Skills — das „Wissen", das Claude automatisch nutzt
Skills sind Spickzettel, die Claude **von selbst** heranzieht, sobald sie zum Thema passen — du musst sie nicht aufrufen.

**Workflows richtig bauen** (von [czlonkowski](https://github.com/czlonkowski/n8n-skills)):
- `n8n-mcp-tools-expert` — wie man die n8n-Werkzeuge richtig bedient (Nodes suchen, Workflow anlegen, prüfen).
- `n8n-workflow-patterns` — bewährte Baumuster: Webhook, API-Aufruf, Datenbank, KI-Agent, Zeitplan.
- `n8n-node-configuration` — wie man einen einzelnen Baustein (Node) korrekt einstellt.
- `n8n-expression-syntax` — die `{{ }}`-Ausdrücke, mit denen Daten durch den Workflow fließen.
- `n8n-code-javascript` / `n8n-code-python` — falls mal eigener Code in einem Node nötig ist.

**Qualität sichern & verständlich machen** (von uns):
- `n8n-validation-expert` — findet Fehler im Workflow und erklärt sie.
- `n8n-testdaten` — erzeugt Testfälle und probiert den Workflow durch.
- `n8n-dokumentation` — schreibt **Sticky Notes in einfacher Sprache** in den Workflow, damit du auf einen Blick siehst, was wo passiert.
- `n8n-security-audit` — Sicherheits-Check vor dem Aktivieren (keine offenen Keys, Webhooks abgesichert …).
- `n8n-pruefbericht` — erstellt am Ende einen kurzen, verständlichen Bericht zum Workflow.

**Optional: eigene Oberfläche / eigenes Backend**
- `frontend-build` / `frontend-scaffold` — **vollwertige** Web-Apps (Next.js) bauen: Formulare, Dashboards, Tabellen, Karten …, angebunden an n8n, FastAPI oder KI-Streaming.
- `backend-fastapi` — ein eigenes Python-Backend, wenn n8n für schwere Rechen-/Datenlogik nicht reicht.

### Die Dateien & Ordner
| Pfad | Was es ist |
|------|-----------|
| `CLAUDE.md` | Die Spielregeln für Claude (lädt automatisch) — sorgt dafür, dass Workflows korrekt gebaut, getestet **und automatisch dokumentiert** werden. |
| `.mcp.json.example` | Vorlage für die Verbindung zu deinem n8n (du trägst URL + Key ein). |
| `examples/workflows/` | Importierbare Lern-Beispiele (alle mit Sticky-Notes-Erklärung): **`n8n-grundlagen.json`** (Grundlogik, Trigger-Arten & wichtigste Bausteine), **`ai-agent-grundlagen.json`** (KI-Agent mit Sprachmodell, Memory & Tool), **`ai-agent-datatable.json`** (KI-Agent → Antwort in eine n8n Data Table speichern), **`ai-agent-tool-webhook.json`** (KI-Agent ruft per Tool den hello-webhook auf), **`hello-webhook.json`** (Mini-Workflow). |
| `frontend-starter/` | Lauffähige Web-App: Formular → n8n-Webhook (+ optionaler KI-Chat). |
| `backend-example/` | Lauffähiges FastAPI-Backend (`/health` + Beispiel-Endpoint). |
| `docs/datenbank.md` | Wann welche Datenbank (n8n Data Tables / Supabase / SQLite). |

---

## 🧪 Dein erster Workflow

Sag zu Claude einfach, was du brauchst — z.B.:
> „Bau mir einen Workflow: Ein Webhook empfängt einen Namen und antwortet mit einer freundlichen Begrüßung."

Claude baut den Workflow und **validiert, testet mit Beispieldaten, dokumentiert ihn mit Sticky Notes und macht einen Sicherheits-Check — automatisch**, ohne dass du danach extra darum bitten musst (so ist es in `CLAUDE.md` festgelegt). Berichtet wird am Ende verständlich, was gemacht wurde.

**Lieber erst lernen?** Importiere diese Workflows in n8n (Workflows → Import from File) — alle erklären sich selbst per **Sticky Notes**:
- `examples/workflows/n8n-grundlagen.json` — Grundlogik, die **Trigger-Arten** und die wichtigsten Bausteine (Set, IF, Webhook, HTTP, Code, Switch, Filter …).
- `examples/workflows/ai-agent-grundlagen.json` — ein **KI-Agent** mit Sprachmodell (Claude), Memory und einem Tool, inkl. der speziellen `ai_*`-Verbindungen.
- `examples/workflows/ai-agent-datatable.json` — praxisnah: **Chat → KI-Agent → Ergebnis in eine n8n Data Table speichern** (Persistenz ganz ohne externe Datenbank).
- `examples/workflows/ai-agent-tool-webhook.json` — der **KI-Agent benutzt ein Tool**: ruft live den `hello-webhook` (oder jede andere API) auf. Schön in Kombination mit `hello-webhook.json`.
- `examples/workflows/hello-webhook.json` — ein Mini-Workflow zum schnellen Ausprobieren (und als Ziel des Agent-Tools oben).

---

## 🎨 Optional: Frontend & Backend

Du willst eine eigene Oberfläche? Die Skills **`frontend-build`** + **`frontend-scaffold`** befähigen Claude, **vollwertige Next.js-Frontends** zu bauen — **nicht nur Formulare**: Multi-Page-Apps, Dashboards, Tabellen/Charts, **Karten (MapLibre)**, Chat-/Voice-UIs usw. Angebunden wahlweise an **n8n-Webhooks** (Muster A), ein **FastAPI-Backend** (Muster B) oder **KI-Streaming** (Muster C). Stack: Next.js 16 · React 19 · TypeScript · Tailwind 4.

Sag z.B. *„bau mir ein Dashboard, das die Ergebnisse aus meinem n8n-Workflow anzeigt"* — Claude scaffoldet es nach diesen Konventionen.

Lauffähige **Seeds** zum Draufaufbauen (bewusst minimal gehalten):
- **`frontend-starter/`** — minimales Beispiel: Formular → n8n-Webhook + optionaler KI-Chat (braucht `ANTHROPIC_API_KEY`). Start: `cd frontend-starter && npm install && npm run dev`.
- **`backend-example/`** — FastAPI-Service (`/health` + Beispiel-Endpoint), falls n8n für schwere Rechen-/DB-/Geo-Logik nicht reicht. Start: siehe `backend-example/README.md`.

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
MIT (siehe `LICENSE`).

Mit großem Dank an:
- **[Romuald Członkowski / czlonkowski](https://github.com/czlonkowski)** — die gebündelten n8n-Kern-Skills und der **n8n-MCP-Server**, auf dem das Ganze läuft.
- **[snipKI](https://snipki.de)** — Grundlage und Idee dieses Hackathon-Starters.

Details in `ATTRIBUTION.md`.
