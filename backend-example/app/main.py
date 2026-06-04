"""FastAPI Compute-Service (Muster B) — Minimalbeispiel.

Endpunkte:
  GET  /health  -> Healthcheck (fuer Reverse-Proxy / Smoke-Test)
  POST /echo    -> nimmt {"text": "..."} und gibt eine kleine Transformation zurueck

Eigene Rechen-/DB-/Geo-Logik hier ergaenzen, wenn n8n nicht reicht.
"""
from __future__ import annotations

import os

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="hackathon-backend-example", version="0.1.0")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "hackathon-backend-example"}


class EchoIn(BaseModel):
    text: str


@app.post("/echo")
def echo(payload: EchoIn) -> dict[str, object]:
    return {"upper": payload.text.upper(), "length": len(payload.text)}


# DB-Beispiel (auskommentiert): DSN nie hardcoden, immer aus der Env lesen.
# import psycopg
# def _dsn() -> str:
#     return os.environ["APP_DB_DSN"]
# @app.get("/items")
# def items():
#     with psycopg.connect(_dsn()) as conn, conn.cursor() as cur:
#         cur.execute("SELECT id, name FROM items LIMIT 50")
#         return [{"id": r[0], "name": r[1]} for r in cur.fetchall()]
