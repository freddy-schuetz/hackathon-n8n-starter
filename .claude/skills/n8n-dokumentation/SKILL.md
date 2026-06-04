---
name: n8n-dokumentation
description: Dokumentiert n8n-Workflows automatisch mit erklärenden Sticky-Note-Nodes in einfacher Sprache, damit Einsteiger nachvollziehen können, was passiert. Verwenden nach dem Bauen/Validieren eines Workflows oder wenn der User um Dokumentation, Erklärung, Kommentare oder Sticky Notes für einen Workflow bittet.
---

# Workflow dokumentieren (Sticky Notes in Klartext)

Nach dem Bauen/Validieren eines Workflows **erklärende Sticky Notes einfügen**, die in **einfacher, nicht-technischer Sprache** beschreiben, was der Workflow tut — damit Einsteiger (und der Kunde) den Ablauf verstehen, ohne jeden Node zu öffnen.

## Wann
- Nach `n8n_create_workflow` oder nach signifikanten Änderungen (neue Nodes/Logik).
- Wenn der User sagt „dokumentiere den Workflow", „erklär mir das", „mach Kommentare/Sticky Notes rein".
- **Sprache** = die Sprache des Users (Default: **Deutsch**).

## Was schreiben (verständlich, nicht technisch)
1. **Eine Übersichts-Sticky** oben links: Was macht der Workflow in 1–2 Sätzen? Wann läuft er (Trigger)? Was kommt raus?
2. **Pro logischem Abschnitt eine Sticky** (z.B. „Daten empfangen", „Prüfen & Filtern", „KI-Antwort erzeugen", „E-Mail senden") direkt **über/neben** den zugehörigen Nodes:
   - Was passiert hier, in Alltagssprache.
   - Worauf der Nutzer achten muss (z.B. „braucht eine E-Mail-Credential").
- Keine Code-Details, keine Node-Interna — das **Warum**, nicht das Wie.

## Wie einfügen (n8n-mcp)
Sticky Notes sind normale Nodes vom Typ `n8n-nodes-base.stickyNote`. Per `n8n_update_partial_workflow` mit `addNode`-Operationen einfügen — sie verändern den Datenfluss **nicht** (keine Connections nötig).

Parameter einer Sticky Note:
- `content` — Markdown-Text (Überschrift `##` + kurze Erklärung).
- `width`, `height` — Größe (z.B. 320 × 160), groß genug für den Text.
- `color` — Zahl 1–7 (Farbe je Abschnitt, z.B. 4=blau Übersicht, 5=grün Eingang, 3=gelb Verarbeitung, 2=rot Ausgang/Achtung).
- `position` — `[x, y]`; Sticky **oberhalb** der zugehörigen Nodes platzieren (kleineres y), damit sie als „Überschrift" über der Gruppe liegt und keine Nodes überdeckt.

Beispiel-Operation:
```json
{
  "type": "addNode",
  "node": {
    "name": "Doku: Übersicht",
    "type": "n8n-nodes-base.stickyNote",
    "position": [-200, -160],
    "parameters": {
      "content": "## Was macht dieser Workflow?\nEr empfängt ein Formular, prüft die Eingaben, lässt die KI eine Antwort schreiben und schickt sie per E-Mail.\n\n**Läuft, wenn** das Webhook-Formular abgeschickt wird.",
      "height": 180,
      "width": 340,
      "color": 4
    }
  }
}
```

## Vorgehen
1. Workflow lesen (`n8n_get_workflow`), Nodes in logische Abschnitte gruppieren und deren Positionen merken.
2. Pro Abschnitt eine Sticky knapp **oberhalb** der Gruppe platzieren (y kleiner als die Nodes), plus eine Übersichts-Sticky oben links.
3. Alle Stickies in **einem** `n8n_update_partial_workflow`-Call (mehrere `addNode`-Operationen) einfügen.
4. Kurz validieren (`n8n_validate_workflow`) — Sticky Notes dürfen nichts kaputtmachen.

## Don't
- Keine Secrets/Keys oder personenbezogene Daten in den Text schreiben.
- Stickies nicht über Nodes legen (überdeckt sie) — immer daneben/darüber.
- Nicht jeden Node einzeln kommentieren — pro **Abschnitt** eine Sticky reicht.
