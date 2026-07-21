# 🚀 Hackathon-Starter: n8n + Claude Code + Frontend-Stack

Eine fertige Grundlage, um beim Hackathon mit **Claude Code** und **n8n** sofort loszulegen — auch ohne Vorerfahrung. Enthält vorkonfigurierte Skills, die n8n-MCP-Anbindung, einen modernen **Frontend-Stack** (Next.js 16 · React 19 · TypeScript · Tailwind CSS 4) und lauffähige Frontend-/Backend-Beispiele.

> 📄 **Zum ersten Mal hier? → [Schritt-für-Schritt-Anleitung als PDF](docs/Anleitung-ClaudeCode_n8n_Setup.pdf)**
> Von der Installation über den n8n-Zugang bis zum ersten laufenden Workflow — in einfacher Sprache, ohne Vorkenntnisse. *(Auch als [druckfreundliche Version](docs/Anleitung-ClaudeCode_n8n_Setup-Druck.pdf).)*

> 🧭 **Noch keine Idee — oder Idee da, aber schwer zu beschreiben?** Kein Problem: sag **„Hilf mir, meine Idee zu klären"** — Claude stellt dir ein paar einfache Fragen und macht daraus einen fertigen Bau-Plan. Ideen zum Stöbern: **[docs/ideen.md](docs/ideen.md)**.

---

## ✨ Einrichten mit nur einem Satz

Öffne die **Claude Code Desktop-App** und schreib:

> **„Richte mir `https://github.com/freddy-schuetz/hackathon-n8n-starter` ein."**

Claude erledigt den Rest (klonen, konfigurieren) und fragt dich nur nach deinem n8n-Zugang. Danach kannst du direkt Workflows bauen lassen.

> Du brauchst **Claude Code Desktop** ([Download](https://claude.com/download)) und einen **bezahlten Claude-Plan** (Pro, Max, Team oder Enterprise) — ohne den ist der **Code**-Bereich der App gesperrt.
>
> ⚠️ **Windows: Git vorher installieren.** Lokale Sessions starten **nur**, wenn Git schon vorhanden ist — Claude kann sich das also nicht selbst nachinstallieren. → **[Git für Windows herunterladen](https://git-scm.com/downloads/win)**, mit den Standard-Einstellungen installieren, danach **Claude einmal neu starten**. (Auf dem Mac ist Git meist schon dabei.)
>
> **Node.js** dagegen richtet Claude beim Setup bei Bedarf selbst ein (per `winget`/`brew`) — es wird für den n8n-MCP-Server gebraucht, nicht für Claude Code selbst.
>
> 🧩 **Du nutzt Codex, OpenCode o.ä. statt Claude Code?** → Setup-Anleitung in **[AGENTS.md](AGENTS.md)**.

---

## 🤖 Setup-Anleitung für Claude (Agent-Runbook)

> 💡 *Diesen Abschnitt liest **Claude** beim Einrichten. Als Teilnehmer kannst du ihn überspringen.*

*Wenn dich jemand bittet, dieses Repo einzurichten, arbeite diese Schritte ab — Ziel: **EIN Befehl, danach läuft alles**. Erledige die Voraussetzungen selbst, lass den User nichts vorinstallieren.*

1. **Voraussetzungen prüfen & ggf. installieren:**
   - `git --version` und `node --version` prüfen (Node ≥ 20 — wird für den n8n-MCP-Server via `npx` gebraucht).
   - Fehlt etwas, installieren:
     - **Windows:** `winget install --silent --accept-package-agreements --accept-source-agreements Git.Git` bzw. `OpenJS.NodeJS.LTS`
     - **macOS:** `brew install git node` (kein Homebrew vorhanden? → von [nodejs.org](https://nodejs.org) bzw. [git-scm.com](https://git-scm.com))
     - **Linux:** Paketmanager, z.B. `sudo apt install -y git nodejs npm`
   - ⚠️ Windows zeigt evtl. eine **UAC-Abfrage** (vom User bestätigen lassen). Nach der Installation ist das Programm oft erst in einem **neuen** Terminal im PATH — falls `node`/`git` direkt danach „not found": den User bitten, Claude Code **einmal neu zu starten**, dann hier weiter.
   - ℹ️ **Windows + Desktop-App:** Läuft diese Session lokal, ist Git zwangsläufig schon vorhanden (ohne Git startet dort gar keine lokale Session). Fehlt Git **vorher**, kann der User es nur selbst installieren → <https://git-scm.com/downloads/win>, danach App neu starten. In der Praxis bleibt hier meist nur **Node.js** nachzuinstallieren.
2. **Klonen** und den Ordner als Projekt öffnen: `git clone https://github.com/freddy-schuetz/hackathon-n8n-starter`
3. **MCP-Konfig anlegen:** `cp .mcp.json.example .mcp.json`
4. **n8n-Zugang erfragen** und in `.mcp.json` eintragen (`N8N_API_URL`, `N8N_API_KEY`):
   - Frage nach **n8n-Cloud-URL** + **API-Key**. Hat der User keinen: Anleitung „n8n-Trial holen" unten weitergeben.
   - `.mcp.json` ist gitignored → Key bleibt lokal. **Niemals committen oder ausgeben.**
5. **(Optional) Frontend-Deps**, falls eine UI gewünscht ist: `cd frontend-starter && npm install`.
6. **User bitten, Claude Code neu zu laden/starten**, damit n8n-MCP + Skills aktiv werden.
7. **Verbindung testen:** `n8n_health_check` → muss OK liefern.
8. **Fertig melden** und **die Idee-Klärung anbieten**: „Sollen wir gemeinsam schauen, was du bauen willst? Sag einfach ‚Hilf mir, meine Idee zu klären'." (Wer schon eine Idee hat, beschreibt sie direkt; zum Stöbern: `docs/ideen.md`, Lern-Beispiele in `examples/workflows/`.)

---

## 🔑 n8n-Trial holen (für Teilnehmer)

1. Auf **[n8n.io](https://n8n.io)** registrieren → kostenlose **Cloud-Trial** starten.
2. Deine Instanz-URL notieren (z.B. `https://deinname.app.n8n.cloud`).
3. In n8n: **Settings → n8n API → Create API Key** → Key kopieren.
4. URL + Key Claude geben (oder selbst in `.mcp.json` eintragen).

> 🏠 **Lieber selbst hosten?** Statt der Cloud-Trial kannst du auch ein **selbst gehostetes n8n** nutzen — trag einfach dessen URL + API-Key ein (sag's Claude, der Rest ist identisch). Für den schnellen Einstieg ist die Cloud-Trial am einfachsten; **self-hosted** ist datenschutzfreundlich (DSGVO) und der übliche Weg für den **produktiven** Betrieb.

---

## 🛠️ Manuelles Setup (statt der 1-Satz-Variante)

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

**Am Anfang — deine Idee klären:**
- `idee-klaeren` — macht aus einer vagen oder schwer beschreibbaren Idee einen klaren Bau-Plan (inkl. Ideen-Menü für „noch keine Idee").
- `grill-me` — nur auf Zuruf („grill mich"): zerpflückt deinen **fertigen** Plan Frage für Frage, bevor du baust.

**Workflows richtig bauen** (von [czlonkowski](https://github.com/czlonkowski/n8n-skills)):
- `n8n-mcp-tools-expert` — wie man die n8n-Werkzeuge richtig bedient (Nodes suchen, Workflow anlegen, prüfen).
- `n8n-workflow-patterns` — bewährte Baumuster: Webhook, API-Aufruf, Datenbank, KI-Agent, Zeitplan.
- `n8n-node-configuration` — wie man einen einzelnen Baustein (Node) korrekt einstellt.
- `n8n-expression-syntax` — die `{{ }}`-Ausdrücke, mit denen Daten durch den Workflow fließen.
- `n8n-validation-expert` — findet Fehler im Workflow und erklärt sie.
- `n8n-code-javascript` / `n8n-code-python` — falls mal eigener Code in einem Node nötig ist.

**Qualität sichern & verständlich machen** (von uns):
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
| `docs/ideen.md` | Ideen-Menü: konkrete Automatisierungs-Ideen zum Stöbern (branchenübergreifend). |

---

## 🧪 Dein erster Workflow

**Noch unsicher, was/wie?** Sag zuerst **„Hilf mir, meine Idee zu klären"** — Claude führt dich durch ein paar einfache Fragen und macht daraus einen Bau-Plan. Oder wenn du schon weißt, was du willst, sag einfach direkt, was du brauchst — z.B.:
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

### 👀 So siehst du deine App
Sag einfach **„starte mein Frontend"**. Claude installiert alles und startet den Server **auf deinem Rechner** — du bekommst einen Link wie **`http://localhost:3000`**, klickst drauf und **siehst deine App im Browser**. Du musst **nichts** tippen oder selbst installieren.

> `localhost` heißt: läuft **lokal auf deinem Laptop** — perfekt zum Bauen, Testen und für eine Demo am eigenen Bildschirm. (Dein n8n-Backend ist ja schon in der Cloud, deshalb funktioniert die ganze App so bereits komplett.)

### 🌍 Willst du es online teilen? → „Vercel"
Lokal läuft deine App **nur auf deinem Laptop**. Für eine **öffentliche Internet-URL** (z.B. zur Präsentation) bringst du das Frontend zu **[Vercel](https://vercel.com)** — einem **kostenlosen Hosting-Dienst für Web-Apps**, der dein Frontend zu einer echten Adresse macht (z.B. `https://mein-projekt.vercel.app`).

**Das machst du selbst (einmalig, ~2 Min — kann Claude nicht für dich tun):**
1. Auf **[vercel.com](https://vercel.com)** ein **kostenloses Konto** anlegen („Sign Up" — am einfachsten „Continue with GitHub", sonst E-Mail).
2. Wenn Claude gleich `vercel login` ausführt: im Browser, der aufgeht, kurz **bestätigen**.

**Den Rest macht Claude** — sag einfach **„stell mein Frontend online"**:
- deployt die App (`npx vercel --prod`),
- trägt deine **n8n-URL** als Einstellung (`NEXT_PUBLIC_N8N_BASE`) bei Vercel ein, damit die Online-App dein n8n erreicht,
- gibt dir die fertige **öffentliche URL**.

Dein **n8n-Backend bleibt unverändert** (ist schon in der Cloud) — nur das Frontend wird gehostet.

### 💾 (Optional) Projekt sichern/teilen → GitHub
Willst du deinen Code **sichern**, im **Team teilen** oder behalten — sag **„lade mein Projekt auf GitHub"**. Claude legt ein Repository an und lädt es hoch.

**Einmalig nötig (kann Claude nicht für dich tun):** ein **kostenloses [GitHub](https://github.com)-Konto** und ein **Login** (`gh auth login`, öffnet den Browser). Danach erledigt Claude den Rest (`git` + `gh repo create`).

> Für den **Vercel-Deploy brauchst du GitHub nicht** (der läuft über die Vercel-CLI). GitHub ist nur fürs Sichern/Teilen — komplett optional.

### Die Seeds zum Draufaufbauen
- **`frontend-starter/`** — minimales Beispiel: Formular → n8n-Webhook + optionaler KI-Chat.
- **`backend-example/`** — FastAPI-Service (`/health` + Beispiel-Endpoint), falls n8n für schwere Rechen-/DB-/Geo-Logik nicht reicht. Start: siehe `backend-example/README.md`.

---

## 🗄️ Brauche ich eine Datenbank?

Meistens nicht extern. Faustregel:
- **Daten im n8n-Workflow** → **n8n Data Tables** (eingebaut, null Setup, in der Trial dabei).
- **Deployte App / Login / Vektoren** → **Supabase Free** (keine Kreditkarte nötig).
- **Nur lokal** → **SQLite** (nicht auf Vercel-Serverless!).

Details + How-to: **[`docs/datenbank.md`](docs/datenbank.md)**.

---

## ⚠️ Sicherheit
- **Niemals** API-Keys (n8n, Anthropic) ins Repo committen. `.mcp.json` und `.env*` sind in `.gitignore`.
- API-Keys gehören nur in `.mcp.json` (lokal) bzw. n8n-Credentials.

## 👤 Gebaut von
**Friedemann Schütz** — **(KI-)Automatisierung, KI-Agenten, Frontends, Infrastruktur, Datenmanagement & Prozessoptimierung** (n8n Ambassador, Essen). Beratung · Umsetzung · Workshops & Schulungen.

Für den Hackathon reicht die **Cloud**. Für **Unternehmen** setze ich Lösungen **self-hosted & DSGVO-konform** und produktionsreif um — kostenloser Einstieg per **[KI-Check](https://ki-check.friedemann-schuetz.de)**.
→ **[friedemann-schuetz.de](https://friedemann-schuetz.de)** · [KI-Check](https://ki-check.friedemann-schuetz.de) · [LinkedIn](https://www.linkedin.com/in/friedemann-schuetz)

## 📄 Lizenz & Dank
MIT (siehe `LICENSE`).

Mit großem Dank an:
- **[Romuald Członkowski / czlonkowski](https://github.com/czlonkowski)** — die gebündelten n8n-Kern-Skills und der **n8n-MCP-Server**, auf dem das Ganze läuft.
- **[snipKI](https://snipki.de)** — Grundlage und Idee dieses Hackathon-Starters.

Details in `ATTRIBUTION.md`.
