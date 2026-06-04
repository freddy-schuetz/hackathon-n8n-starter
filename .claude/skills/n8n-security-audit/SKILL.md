---
name: n8n-security-audit
description: Security-Checkliste vor Workflow-Aktivierung und erweiterter Security Audit fuer kritische Workflows. Verwenden vor Aktivierung oder bei Security-Review.
---

# Security-Checkliste (vor Aktivierung)

**Vor jeder Workflow-Aktivierung diese Punkte prüfen:**

## Secrets & Credentials
- [ ] Keine hardcoded API Keys, Tokens oder Passwörter in Node-Parametern
- [ ] Alle Secrets über n8n Credentials eingebunden
- [ ] Keine Secrets in Code Node Variablen

## Webhooks & Endpoints
- [ ] Webhook-Authentifizierung aktiviert (Header Auth, Basic Auth oder None nur bei öffentlichen Endpoints)
- [ ] Respond to Webhook vorhanden (kein hängender Request)
- [ ] Webhook-Path nicht erratbar (kein `/test` oder `/webhook`)

## Fehlerbehandlung
- [ ] Error-Handling für HTTP Request Nodes (Continue on Fail oder Error Workflow)
- [ ] Keine unbehandelten Branches (IF/Switch: alle Pfade haben ein Ziel)
- [ ] Bei kritischen Workflows: Error Workflow konfiguriert

## Daten & Privacy
- [ ] Keine personenbezogenen Daten in Workflow-Notes oder Node-Namen
- [ ] Logging/Debug-Nodes vor Aktivierung entfernt oder deaktiviert
- [ ] Datenminimierung: nur nötige Felder weitergegeben

## Allgemein
- [ ] Workflow-Name aussagekräftig und eindeutig
- [ ] Validierung durchgelaufen (`n8n_validate_workflow`)
- [ ] Testdaten-Szenarien durchgelaufen (siehe Skill n8n-testdaten)

---

# Security Audit (bei kritischen Workflows)

Für Workflows die sensible Daten verarbeiten oder produktionskritisch sind, zusätzlich prüfen:

## Secrets-Scan
Im Workflow-JSON nach verdächtigen Mustern suchen:
- API Keys (`sk-`, `xoxb-`, `Bearer`, `token=`)
- Passwörter in Klartext
- Base64-encodierte Credentials
- Hardcoded URLs mit Credentials in Query-Parametern

## Webhook-Security
- Keine `authentication: "none"` bei Webhooks die Daten modifizieren
- Response-Codes korrekt (nicht immer 200)
- Rate-Limiting Überlegungen dokumentiert

## Code Node Audit
- Kein `eval()` oder `Function()` mit dynamischen Inputs
- Keine unvalidierte String-Interpolation in HTTP URLs
- `helpers.httpRequest()` statt `fetch()` in MCP-Kontext

## Infrastruktur
- Error Workflow für Production-Workflows konfiguriert
- Execution-Timeout gesetzt bei lang laufenden Workflows
- Retry-Logik bei externen API-Calls

## n8n-cli Security Audit
```bash
n8n-cli audit                                    # Vollständiger Security Report
n8n-cli audit --categories=credentials,nodes     # Nur bestimmte Kategorien
# Kategorien: credentials | database | nodes | filesystem | instance
```
