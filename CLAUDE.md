# Hackathon-Starter: n8n + Claude Code

Diese Datei wird beim Öffnen des Projekts automatisch geladen und enthält die wichtigsten n8n-Konventionen. **Erst-Setup noch nicht erledigt?** → siehe [README.md](README.md).

## Was ist das?
Eine fertige Grundlage, um mit **Claude Code + n8n-mcp** Automatisierungs-Workflows in **n8n** zu bauen — plus optionale Starter für **Frontend** (Next.js) und **Backend** (FastAPI). Die geladenen Skills helfen Claude, korrekte Workflows zu erzeugen.

## Arbeitsweise (WICHTIG — so verhältst du dich)
- **Zielgruppe sind Einsteiger.** Erkläre in **einfacher Sprache**, ohne unerklärten Fachjargon.
- **Erst die Idee klären (bei Unsicherheit):** Ist der Teilnehmer unsicher, was/wie er bauen soll, beschreibt seine Idee vage/umständlich, oder es geht direkt nach dem Setup los → nutze **zuerst** den Skill `idee-klaeren` (freundliches Interview → **Prozess-Steckbrief**), **bevor** du baust. Biete es proaktiv an. (Hat jemand dagegen einen **fertigen Plan** und will ihn härtetesten lassen — „grill mich" — → Skill `grill-me`, aber **nur auf ausdrücklichen Wunsch**.)
- **Sei proaktiv:** Führe den Standard-Prozess **selbstständig** durch — frag den User nicht für jeden Schritt um Erlaubnis.
- **Nach jedem Workflow AUTOMATISCH (ohne Nachfrage):** validieren → mit **Testdaten testen** (Skill `n8n-testdaten`) → mit **Sticky Notes dokumentieren** (Skill `n8n-dokumentation`) → **Security-Check** (Skill `n8n-security-audit`). Ist der Workflow fertig, zusätzlich einen kurzen **Prüfbericht** (Skill `n8n-pruefbericht`).
- **Silent Execution:** Werkzeuge ohne Zwischenkommentar ausführen, danach **kurz und verständlich** berichten, was gebaut/getestet/dokumentiert wurde.
- **Frontend/App zeigen = DU startest sie (nicht der User):** Will der User seine App ansehen/testen, übernimm das **selbst** — falls nötig `npm install`, dann `npm run dev` **im Hintergrund** starten (blockiert nicht), und ihm die **`http://localhost:3000`**-URL geben bzw. die Vorschau/den Browser öffnen. Den User **keine Befehle tippen lassen**. Läuft der Server schon, einfach die URL nennen.

## Workflow-Erstellung: Standard-Prozess
Diesen Ablauf führst du **automatisch** durch (Schritte 6–9 + 11 ohne Extra-Aufforderung):

1. `tools_documentation()` — Best Practices laden
2. `search_templates({query: "..."})` — passende Vorlage prüfen
3. Passt eine Vorlage: `n8n_deploy_template({templateId})` — **Autor nennen**
4. Sonst: `search_nodes()` → `get_node({detail: "standard"})` → `n8n_create_workflow()`
5. Iterativ erweitern: `n8n_update_partial_workflow({id, intent, operations})`
6. Validieren: `n8n_validate_workflow({id})` → `n8n_autofix_workflow({id})`
7. Testdaten generieren und **in der Instanz testen** — fängt Laufzeitfehler, die der statische Validator nicht sieht (Skill: `n8n-testdaten`)
8. **Workflow dokumentieren** mit Sticky Notes (Skill: `n8n-dokumentation`)
9. Security-Checkliste (Skill: `n8n-security-audit`)
10. Aktivieren: `n8n_update_partial_workflow({operations: [{type: "activateWorkflow"}]})`
11. **Prüfbericht** erstellen, sobald der Workflow fertig/abzugeben ist (Skill: `n8n-pruefbericht`)

## Kritische Konventionen

### nodeType-Formate (je nach Tool unterschiedlich!)
| Tool-Kategorie | Format | Beispiel |
|---------------|--------|----------|
| Search/Validate | `nodes-base.*` | `nodes-base.slack` |
| Workflow-Tools | `n8n-nodes-base.*` | `n8n-nodes-base.slack` |
| AI/LangChain | `@n8n/n8n-nodes-langchain.*` | `@n8n/n8n-nodes-langchain.agent` |

### Webhook-Datenstruktur
Webhook-Daten liegen unter `.body`:
```
FALSCH:  {{$json.email}}
RICHTIG: {{$json.body.email}}
```

### Expression-Syntax
- Expressions immer mit `{{}}`: `{{$json.field}}`
- In **Code Nodes KEIN** `{{}}`: `$json.field`
- Node-Namen mit Leerzeichen in Quotes: `{{$node["HTTP Request"].json.data}}`
- Node-Namen sind case-sensitive

### IF-Node Multi-Output Routing (KRITISCH!)
IF-Nodes haben zwei Outputs. `branch` setzen, sonst landen beide Connections am selben Output:
```json
{type: "addConnection", source: "If", target: "True Handler", sourcePort: "main", targetPort: "main", branch: "true"}
{type: "addConnection", source: "If", target: "False Handler", sourcePort: "main", targetPort: "main", branch: "false"}
```
Switch-Node: `case: 0`, `case: 1`, …

### addConnection-Syntax (vier separate String-Parameter!)
```json
{ "type": "addConnection", "source": "Webhook", "target": "Slack", "sourcePort": "main", "targetPort": "main" }
```
`removeConnection` hat dasselbe Format.

### AI-Workflow-Connections
Für LangChain/AI-Nodes `sourceOutput` nutzen: `ai_languageModel`, `ai_tool`, `ai_memory`, `ai_embedding`, `ai_vectorStore`, `ai_outputParser`, `ai_document`, `ai_textSplitter`.

⚠️ **AI-Tool-Node-Namen:** Der Name eines als Tool verbundenen Nodes (`ai_tool`) wird zum **Funktionsnamen fürs LLM** — daher **nur Buchstaben, Ziffern und Unterstriche** (kein Leerzeichen/Bindestrich/Klammer/Umlaut, nicht mit Ziffer beginnen). Beispiel: `hello_webhook_aufrufen`, nicht „hello-webhook aufrufen".

⚠️ **AI-Sub-Nodes haben kein „Execute":** Tool-/Modell-/Memory-Nodes laufen **nur, wenn der Agent sie aufruft**. Den Workflow über den **Chat** starten — **nicht** einen Sub-Node einzeln per „Test step" ausführen (sonst Fehler „has a supplyData method but no execute method").

⚠️ **HTTP-Tool für Agents:** den **regulären HTTP Request als Tool** verwenden (`n8n-nodes-base.httpRequestTool`, v4.x) mit `$fromAI('feld','Beschreibung','string')` für vom LLM gefüllte Werte — **nicht** den Legacy-Node `@n8n/n8n-nodes-langchain.toolHttpRequest` (v1.1, deprecated). Allgemein gilt: fast jeder Standard-Node kann als Tool an den Agent gehängt werden.

## Best Practices

### Do
- **Template-First**: immer Templates prüfen, bevor von Scratch gebaut wird
- **Explicit Parameters**: ALLE Parameter explizit setzen (Default-Werte = #1 Fehlerquelle)
- Workflows **iterativ** bauen, `intent` bei Updates angeben
- Nach signifikanten Änderungen validieren; Validation-Profil `runtime`
- Batch-Operationen in **einem** `n8n_update_partial_workflow`-Call
- `includeExamples: true` für echte Konfigurationsbeispiele

### Don't
- nodeType-Prefix vergessen
- Validation vor Aktivierung überspringen
- Expression-Syntax in Code Nodes verwenden
- **Code Nodes nutzen, wenn Standard-Nodes verfügbar sind** (Code = letzter Ausweg)

## Sicherheit
1. **API-Keys niemals** in Workflow-Parametern — n8n **Credentials** nutzen!
2. Security-Checkliste vor Aktivierung (Skill: `n8n-security-audit`)
3. Keine personenbezogenen Daten in Node-Namen/Notes
4. Workflow-Änderungen werden automatisch nach `backup/` gesichert (Hook)

## Datenbank?
Meistens keine externe nötig. **n8n-Workflow** → **n8n Data Tables** (eingebaut, `n8n_manage_datatable`, 50 MB, in der Cloud-Trial). **Deployte App / Auth / Vektoren** → **Supabase Free**. **Nur lokal** → SQLite (nie auf Vercel-Serverless). Details: `docs/datenbank.md`.

## Geladene Skills
**Am Anfang:** `idee-klaeren` — Idee/Prozess mit dem Teilnehmer klären → klarer Bau-Auftrag (Steckbrief); Ideen-Menü in `docs/ideen.md` · `grill-me` — Härtetest für einen **fertigen** Plan, **nur auf ausdrücklichen Wunsch** („grill mich").
**n8n:** `n8n-mcp-tools-expert`, `n8n-workflow-patterns`, `n8n-node-configuration`, `n8n-expression-syntax`, `n8n-validation-expert`, `n8n-code-javascript`, `n8n-code-python` (von czlonkowski/n8n-skills) · `n8n-testdaten`, `n8n-dokumentation`, `n8n-security-audit`, `n8n-pruefbericht`
**Frontend/Backend (optional):** `frontend-build`, `frontend-scaffold`, `backend-fastapi` — lauffähige Beispiele in `frontend-starter/` und `backend-example/`.
