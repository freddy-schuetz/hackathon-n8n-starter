# 🗄️ Brauche ich eine Datenbank? — Niederschwellig zuerst

Kurz: **meistens brauchst du keine externe DB.** Wähle nach *wo die Daten leben*:

| Fall | Lösung | Setup-Aufwand |
|------|--------|---------------|
| Daten gehören zu einem **n8n-Workflow** | **n8n Data Tables** | ⭐ null (eingebaut) |
| **Deploytes Frontend / mehrere Dienste / Login / Vektoren** | **Supabase Free** | mittel (1× Anmeldung) |
| **Lokaler Prototyp / ein Backend-Prozess mit Volume** | **SQLite** | null (Datei) |

---

## 1. n8n Data Tables — Default für Workflows (null Setup)

In n8n **eingebaut**, schon in deiner **Cloud-Trial** dabei. Keine Anmeldung, kein Connection-String, kein eigener Server.

- Tabellen mit Spalten anlegen, aus Workflows **lesen / schreiben / aktualisieren / löschen** (Node **„Data Table"**) — oder von Claude per MCP (`n8n_manage_datatable`).
- **Limit: 50 MB** gesamt (alle Tabellen zusammen) auf Cloud — für Hackathon-Mengen reichlich.
- Ideal für: Lookups, Status/State merken, kleine Listen, Deduplizierung, Zwischenspeicher.
- Sag zu Claude: *„Leg eine Data Table `leads` mit Spalten name, email, status an und schreib im Workflow neue Einträge rein."*
- Winziger State ohne Tabelle: n8n **workflow static data** (Schlüssel-Werte).

→ **Das ist für die allermeisten n8n-Use-Cases der richtige, niederschwelligste Weg.**

## 2. Supabase Free — echte geteilte DB für deployte Apps

Wenn ein **Frontend auf Vercel** und/oder **mehrere Dienste** eine **gemeinsame** Postgres-DB brauchen, oder du **Login/Auth** bzw. **Vektor-Suche (pgvector, z.B. KI-Memory)** willst.

- **Free-Tier:** **kein Kreditkarte**, 500 MB DB, 2 Projekte, Postgres + Auth + REST + Realtime inklusive.
- ⚠️ **Pausiert nach 1 Woche Inaktivität** — während des Hackathons egal, danach im Dashboard 1× reaktivieren.
- **Setup:** [supabase.com](https://supabase.com) → neues Projekt → Tabelle anlegen → `Project URL` + `anon key` (fürs Frontend) bzw. **Connection-String** (für Backend/n8n).
- **n8n:** Node **„Supabase"** oder **„Postgres"**. **Next.js:** `@supabase/supabase-js`. **FastAPI:** `psycopg` mit dem Connection-String (siehe auskommentiertes Beispiel in `../backend-example/app/main.py`).
- ⚠️ Keys nur in `.env.local` / n8n-Credentials — **nie ins Repo**.

## 3. SQLite — nur lokal / ein einzelner Prozess

Null Setup, eine Datei. Gut für **lokale Prototypen** oder ein **Backend, das als ein dauerhafter Prozess mit Volume** läuft (z.B. `backend-example` als Docker-Container mit gemountetem Volume).

- ⚠️ **Funktioniert NICHT auf Vercel-Serverless:** dort ist das Dateisystem flüchtig — die `.sqlite`-Datei ist nach jedem Request weg. Für ein deploytes Next.js-Frontend ist SQLite daher die falsche Wahl.
- Das [snipKI hackathon-starter-kit](https://github.com/freddy-schuetz/hackathon-starter-kit) nutzt SQLite, weil es **lokal** läuft — genau der passende Fall. **Sobald deployt → Supabase.**

---

### Faustregel
**n8n-Workflow → Data Tables. Deployte App / Auth / Vektoren → Supabase Free. Nur lokal → SQLite.**
