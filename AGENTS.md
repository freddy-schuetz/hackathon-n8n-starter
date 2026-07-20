# AGENTS.md — n8n-Hackathon-Starter (für Codex, OpenCode & andere Agents)

Diese Datei richtet sich an Coding-Agents, die **AGENTS.md** lesen (OpenAI **Codex**, **OpenCode**, Cursor, Gemini CLI, …).

> **Du nutzt Claude Code?** Dann brauchst du das hier nicht — nimm **[README.md](README.md)** + **CLAUDE.md** (mit kuratierten Skills + „richte mir das ein"-Setup).

## Setup (einmalig)

1. **n8n-Zugang holen:** kostenlose n8n-Cloud-Trial auf [n8n.io](https://n8n.io) starten → Instanz-URL notieren → **Settings → n8n API → API-Key** erstellen.
2. **n8n-mcp anbinden** (läuft per `npx`, keine Installation nötig):

   **Codex** → `~/.codex/config.toml` (global) oder `.codex/config.toml` (projekt-scoped, nur „trusted projects") · Vorlage: [`.codex/config.toml.example`](.codex/config.toml.example)
   ```toml
   [mcp_servers.n8n-mcp]
   command = "npx"
   args = ["-y", "n8n-mcp"]
   [mcp_servers.n8n-mcp.env]
   N8N_API_URL = "https://DEINE-INSTANZ.app.n8n.cloud"
   N8N_API_KEY = "DEIN_KEY"
   MCP_MODE = "stdio"
   ```

   **OpenCode** → `opencode.json` · Vorlage: [`opencode.json.example`](opencode.json.example)
   ```json
   { "mcp": { "n8n-mcp": { "type": "local",
     "command": ["npx", "-y", "n8n-mcp"],
     "environment": { "N8N_API_URL": "https://DEINE-INSTANZ.app.n8n.cloud", "N8N_API_KEY": "DEIN_KEY", "MCP_MODE": "stdio" } } } }
   ```

3. **Verbindung testen:** Agent bitten, `n8n_health_check` aufzurufen → muss OK liefern.
4. ⚠️ **Keys niemals committen** — die echten Configs (`.codex/config.toml`, `opencode.json`) sind in `.gitignore`.

## Arbeitsregeln: CLAUDE.md ist die einzige Quelle

**Lies [CLAUDE.md](CLAUDE.md) und befolge sie 1:1.** Dort stehen die Arbeitsweise (inkl. Idee-Klärung bei vagen Ideen), der Standard-Prozess, alle kritischen n8n-Konventionen, Best Practices und Sicherheitsregeln. Diese Datei hier ergänzt nur das agent-spezifische Setup — sie wiederholt die Regeln bewusst **nicht** (sonst laufen die Versionen auseinander).

**Skills-Übersetzung:** Wo CLAUDE.md von „Skills" spricht, sind Markdown-Ordner unter `.claude/skills/<name>/SKILL.md` gemeint. **OpenCode lädt Claude-Code-Skills nativ** — dort stehen sie dir direkt zur Verfügung. Lädt dein Agent sie nicht automatisch (z.B. Codex): lies die jeweilige `SKILL.md` einfach als Anleitung, sobald die Situation passt (z.B. `idee-klaeren` bei vager Idee, `n8n-testdaten` nach dem Bauen, `n8n-dokumentation` für Sticky Notes, `n8n-security-audit` vor der Aktivierung, `n8n-pruefbericht` am Ende).

## Wissen & Beispiele

- Tiefes n8n-Wissen liefert der **n8n-mcp-Server** selbst: starte mit `tools_documentation()`.
- Importierbare **Lern-Workflows** (mit Sticky-Notes-Erklärungen): `examples/workflows/` · **Ideen-Menü** zum Stöbern: `docs/ideen.md` · Datenbank-Wahl: `docs/datenbank.md`.
- **Frontend/Backend** (optional): lauffähige Beispiele in `frontend-starter/` (Next.js 16) und `backend-example/` (FastAPI) — Details in deren README.
