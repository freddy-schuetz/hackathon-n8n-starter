---
name: backend-fastapi
description: Stack und Muster für ein eigenes Python-Backend (Muster B — Compute-/DB-/Geo-Service via FastAPI + Docker). Verwenden beim Bauen/Erweitern/Deployen eines eigenen Backends, wenn n8n nicht reicht (schwere Rechen-/DB-/Geo-Logik, Routing, Raster), bei FastAPI, uvicorn, Dockerfile oder psycopg/Postgres-DSN. Lauffähiges Beispiel: backend-example/.
---

# FastAPI-Backend bauen & deployen (Muster B)

Service-Seite der Backend-Eskalationsleiter aus `frontend-build`. Lauffähiges Referenz-Beispiel in diesem Repo: **`backend-example/`** — Stack von dort kopieren statt neu erfinden. Die Frontend-/Proxy-Seite (`/api`-Rewrite, `BACKEND_URL`) steht in `frontend-build` (Muster B), hier nur der Service.

## Wann (n8n bleibt #1)

Erst **Muster A — n8n** versuchen. FastAPI nur, wenn eigene Rechen-/DB-/Geo-Logik n8n sprengt:
- Routing/Graphen (`pgRouting`/PostGIS), Höhenmodelle/Raster (`rasterio`/DEM), schwere Geometrie (`shapely`), eigene ML-/Rechenlogik.

## Stack

| Bereich | Festlegung |
|---------|-----------|
| Sprache | **Python 3.12** |
| Framework | **FastAPI** (`fastapi>=0.110`) + **uvicorn** (`>=0.29`) |
| DB-Client | **`psycopg[binary]`** (v3) → Postgres (+ optional pgRouting/PostGIS) |
| Geo (optional) | `rasterio` (DEM/GeoTIFF — Wheels bündeln GDAL, **kein** System-GDAL nötig), `shapely`, `numpy` |
| AI (falls nötig) | Anthropic **direkt** via `ANTHROPIC_API_KEY` (gleicher Key wie Frontend-Muster-C) |
| Container | **Docker** (Image auf beliebigem VPS lauffähig) |

## Struktur (aus `backend-example/`)

```
backend/
  app/
    main.py            # FastAPI-App: app = FastAPI(title="…", version="…"), Routes
    core/              # Domänen-/Rechenlogik
    data_sources/      # externe Adapter (APIs, Dateien, …)   [optional]
    __init__.py
  requirements.txt
  Dockerfile
  .dockerignore
  data/                # Cache → Docker-VOLUME, NICHT committen   [optional]
```

## Dockerfile-Baseline

```dockerfile
FROM python:3.12-slim
WORKDIR /app
# nur nötige System-Libs (z.B. für rasterio/GDAL-Wheels) + TLS-Roots
RUN apt-get update && apt-get install -y --no-install-recommends \
        libexpat1 ca-certificates \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
EXPOSE 8080
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

## Konventionen

- **Port 8080** im Container (= Proxy-Kontrakt mit Next: `frontend/next.config` rewritet `/api/*` → `http://127.0.0.1:8080` lokal bzw. `BACKEND_URL`-Subdomain in Prod).
- **`/health`-Endpoint** liefert `{"status": "ok", …}` — für Reverse-Proxy/Smoke-Test.
- **DB per Env-DSN**, nie hardcoden: ein `_dsn()`-Helfer liest `os.environ["<APP>_DB_DSN"]`, dann `psycopg.connect(_dsn())`.
- **Secrets/Tokens** ausschließlich über `os.environ` (z.B. `ANTHROPIC_API_KEY`, Drittanbieter-Keys) — nie im Code, nie im Image.
- Explizite Versionen in `requirements.txt`; Geo-Stack über Wheels (kein System-GDAL).

## Deploy

- Docker-Image bauen und auf einem VPS laufen lassen, hinter einem Reverse-Proxy mit **TLS** (eigene Subdomain). Env-Vars (DSN, API-Keys) am Container setzen, **nicht** im Image.
- Nach Deploy: `GET /health` der Subdomain prüfen, dann einen echten Endpoint gegen den Happy-Path.
- Hinweis: FastAPI-Backends laufen **nicht** auf Vercel-Serverless — dafür einen eigenen Host/VPS nutzen (Frontend bleibt auf Vercel).

## Neues Backend starten

`backend-example/` kopieren, `app/main.py` (`title`/`version`) und `requirements.txt` anpassen, eigenen `<APP>_DB_DSN` definieren (falls DB). Frontend-Anbindung (`/api`-Rewrite) → Skill `frontend-build` (Muster B).
