---
name: n8n-testdaten
description: Testdaten-Generierung fuer n8n Workflows. Format, Szenarien-Typen, Pin-Daten Integration und Testablauf. Verwenden nach Workflow-Erstellung oder vor Aktivierung.
---

# Testdaten-Generierung (nach Workflow-Erstellung)

Nach Erstellung oder signifikanter Änderung eines Workflows **IMMER** Testdaten generieren und testen.

## Ablauf
1. **Testszenarien definieren** — Pro Workflow 3-5 Szenarien:
   - Happy Path (Normalfall)
   - Edge Case (Grenzwerte, leere Felder, Sonderzeichen)
   - Error Case (ungültige Daten, fehlende Pflichtfelder)
   - Bei Webhook-Workflows: verschiedene Payload-Strukturen

2. **Pin-Daten generieren** — Testdaten als Pin-Daten für den Trigger-Node:
```
prepare_test_pin_data({workflowId: "...", nodeId: "trigger-node"})
```

3. **Tests ausführen** — Workflow mit Testdaten ausführen:
```
n8n_test_workflow({id: "...", pinData: {...}})
```

4. **Ergebnisse prüfen** — Execution abrufen und Output validieren:
```
n8n_executions({action: "get", id: "execution-id"})
```

## Testdaten-Format
```json
{
  "testScenarios": [
    {
      "name": "Happy Path - Vollständige Daten",
      "description": "Alle Pflichtfelder gefüllt, gültige Werte",
      "pinData": {"Webhook": [{"json": {"body": {"email": "test@example.com", "name": "Max Mustermann"}}}]},
      "expectedResult": "success",
      "expectedOutput": "Email versendet / Datensatz erstellt / etc."
    },
    {
      "name": "Edge Case - Leere Felder",
      "pinData": {"Webhook": [{"json": {"body": {"email": "", "name": ""}}}]},
      "expectedResult": "error_handled",
      "expectedOutput": "Validierungsfehler abgefangen"
    }
  ]
}
```

## Wann testen?
- Nach `n8n_create_workflow` — immer
- Nach signifikanten `n8n_update_partial_workflow` Änderungen (neue Nodes, geänderte Logik)
- Vor Aktivierung eines Workflows — PFLICHT
- NICHT nach kosmetischen Änderungen (Position, Rename)
