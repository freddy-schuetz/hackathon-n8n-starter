# Backend-Example (FastAPI, Muster B)

Minimaler Compute-Service für Fälle, in denen n8n nicht reicht (schwere Rechen-/DB-/Geo-Logik).

## Lokal starten
```bash
python -m venv .venv
. .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080
```
Test: `curl http://127.0.0.1:8080/health` → `{"status":"ok",...}`

## Docker
```bash
docker build -t backend-example .
docker run -p 8080:8080 backend-example
```

## An ein Frontend anbinden (Muster B)
Im Frontend (`../frontend-starter/next.config.mjs`) den Rewrite einkommentieren und
`BACKEND_URL` setzen — dann ruft das Frontend `/api/...` relativ auf (kein CORS).

## Endpunkte
- `GET /health` — Healthcheck
- `POST /echo` — Body `{"text":"hallo"}` → `{"upper":"HALLO","length":5}`

## Deploy
Docker-Image auf einem VPS hinter Reverse-Proxy mit TLS. Env-Vars (DSN, API-Keys)
am Container setzen, nie ins Image. Läuft **nicht** auf Vercel-Serverless.
