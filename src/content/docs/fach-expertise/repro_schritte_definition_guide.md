---
title: "Repro Schritte (definition & Guide)"
description: "Repro-Schritte (Reproduction Steps) sind präzise, sequenzielle Anweisungen, um ein technisches Problem oder ein Fehlverhalten exakt nachzustellen."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Künstliche Intelligenz.
Es ist im Thema Künstliche Intelligenz verortet und dem Subtopic Vibe Coding zugeordnet.
Klassifizierung: grundlagen mit der Zielsetzung umsetzen.
%%

# Repro-Schritte (Definition & Guide)

Thema-Kontext: Beschreibt Hintergründe, Anleitungen und Vorlagen zum Vibe Coding. Ebenfalls werden generelle Erläuterungen geleifert, wie Vibe Coding grundsätzlich funktioniert.

## **Zusammenfassung**

> Repro-Schritte (Reproduction Steps) sind präzise, sequenzielle Anweisungen, um ein technisches Problem oder ein Fehlverhalten exakt nachzustellen.
> 

**Dieses Modul beantwortet folgende Fragen:**

- Warum sind Repro-Schritte für den Workflow mit KI-Codern essenziell?
- Wie ist ein perfekter Repro-Schritt aufgebaut?
- Was unterscheidet gute von schlechten Fehlerbeschreibungen?

## Was sind Repro-Schritte?

Repro-Schritte sind eine klare Anleitung, wie man ein Problem zuverlässig nachstellt. Das Ziel ist es, dass eine andere Person (oder eine KI) die Schritte 1:1 ausführen kann und am Ende exakt dasselbe fehlerhafte Verhalten beobachtet.

### Die Vorteile im Workflow

1. **Kein Raten:** Die KI muss nicht vermuten, wo der Fehler liegt.
2. **Präzision:** Gezielte Änderungen statt großflächiger Refactorings.
3. **Validierung:** Nach dem Fix können dieselben Schritte genutzt werden, um den Erfolg zu prüfen.

## Aufbau eines Repro-Schritts (Faustformel)

Ein guter Schritt folgt dem Schema: **Startzustand → Aktion → Eingabe → Beobachtung**.

### Qualitätskriterien

- **Sequenziell:** Klare Nummerierung (1, 2, 3…).
- **Konkret:** Benennung spezifischer Buttons, Seiten oder Eingabewerte.
- **Minimal:** Nur die Schritte aufnehmen, die absolut notwendig sind.
- **Deterministisch:** Das Ergebnis sollte bei jedem Durchlauf identisch sein.

## Beispiele

### UI-Bug

1. App starten (`npm run dev`)
2. Login als User "[test@example.com](mailto:test@example.com)"
3. Navigiere zu `/settings`
4. Klicke "Save", ohne etwas zu ändern
5. **Beobachtung:** Button bleibt auf "Saving…" hängen (Spinner endet nie)

### Daten-/Edge-Case

1. User hat keinen `profile.avatarUrl` in der DB (null)
2. Öffne Profilseite `/profile`
3. **Beobachtung:** Seite crasht
4. **Erwartung:** Anzeige eines Platzhalter-Avatars

---

## 🔗 Verwandte Module

- **[Vibe Coding Prompt-Vorlage](#)
- ***Kontext:* Die Repro-Schritte sind ein Kernbestandteil der Vibe Coding Vorlage.
- **[Prompten](#)
- ***Kontext:* Methodik zur präzisen Aufgabenstellung an KIs.