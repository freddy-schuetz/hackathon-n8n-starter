---
name: n8n-pruefbericht
description: Deutschsprachiger Pruefbericht-Template fuer Kunden-Workflows. Verwenden nach Workflow-Fertigstellung fuer kundenfertigen Report mit Testergebnissen, Validierung und Security-Status.
---

# Prüfbericht (nach Workflow-Abschluss)

Nach Fertigstellung eines Workflows für einen Kunden **einen deutschsprachigen Prüfbericht erstellen** und im jeweiligen Projektordner ablegen.

## Wann erstellen?
- Bei jedem Workflow der an einen Kunden geliefert wird
- Bei signifikanten Updates an bestehenden Kunden-Workflows
- Auf Anfrage des Users

## Bericht-Template

```markdown
# Workflow-Prüfbericht

## Allgemeine Informationen
| Feld | Wert |
|------|------|
| Workflow-Name | [Name] |
| Workflow-ID | [ID] |
| Erstellt am | [Datum] |
| Geprüft am | [Datum] |
| Erstellt von | [Dein Name] |

## Beschreibung
[Was macht der Workflow? 2-3 Sätze zur Funktion]

## Architektur
[Kurze Beschreibung der Workflow-Struktur: Trigger → Verarbeitung → Output]
[Anzahl Nodes, verwendete Services/Integrationen]

## Testergebnisse

| Testszenario | Status | Ergebnis |
|-------------|--------|----------|
| Happy Path | PASS/FAIL | [Beschreibung] |
| Edge Case | PASS/FAIL | [Beschreibung] |
| Error Case | PASS/FAIL | [Beschreibung] |

## Validierung

| Prüfung | Status |
|---------|--------|
| Technische Validierung (n8n_validate_workflow) | PASS/FAIL |
| Auto-Fix angewendet | Ja/Nein |
| Expression-Syntax geprüft | PASS/FAIL |

## Security-Prüfung

| Prüfpunkt | Status |
|-----------|--------|
| Keine hardcoded Secrets | OK/WARNUNG |
| Webhook-Authentifizierung | OK/WARNUNG/N.A. |
| Fehlerbehandlung vorhanden | OK/WARNUNG |
| Datenminimierung | OK/WARNUNG |

## Empfehlungen
[Optionale Hinweise: Was sollte der Kunde beachten? Welche Credentials müssen eingerichtet werden?]

## Gesamtergebnis
**Status: FREIGEGEBEN / BEDINGT FREIGEGEBEN / NICHT FREIGEGEBEN**

---
*Erstellt mit dem Hackathon-Starter · friedemann-schuetz.de*
```

> Den Footer **„Erstellt mit dem Hackathon-Starter · friedemann-schuetz.de"** als kurze Attribution am Berichtsende beibehalten.

## Dateiname & Ablage
- Format: `Pruefbericht_[WorkflowName]_[YYYY-MM-DD].md`
- Ablage: In deinem Projektordner (z.B. `reports/` oder `docs/`)
- Bei Bedarf als PDF konvertieren (pandoc/puppeteer)
