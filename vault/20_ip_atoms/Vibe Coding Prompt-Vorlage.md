---
id: vibe_coding_prompt_vorlage
aliases:
  - vibe_coding_prompt_vorlage
  - Vibe Coding Prompt-Vorlage
parent_topic: kuenstliche_intelligenz
subtopic: vibe_coding
type: grundlagen
intent: gestalten
status: entwurf
created: 2026-02-16
summary: Diese Vorlage dient als standardisierter Prompt für das "Vibe Coding", um Software-Änderungen oder Bugfixes präzise und kontextreich an KI-Codegeräte zu kommunizieren.
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Künstliche Intelligenz.
Es ist im Thema Künstliche Intelligenz verortet und dem Subtopic Vibe Coding zugeordnet.
Klassifizierung: grundlagen mit der Zielsetzung gestalten.
%%

# Vibe Coding: Prompt-Vorlage

## Zusammenfassung

> Diese Vorlage dient als standardisierter Prompt für das "Vibe Coding", um Software-Änderungen oder Bugfixes präzise und kontextreich an KI-Codegeräte zu kommunizieren.
> 

**Dieses Modul beantwortet folgende Fragen:**

- Wie strukturiere ich einen Prompt für effizientes Vibe Coding?
- Welche Informationen benötigt eine KI, um Fehler gezielt zu beheben?
- Wie stelle ich sicher, dass der Scope einer Änderung klar definiert ist?

## Die Vorlage

Nutze diesen Code-Block als Basis für deine Anfragen:

```
ZIEL (1 Satz):
[Was soll am Ende anders/besser sein?]

IST-ZUSTAND:
- Aktuelles Verhalten: [...]
- Erwartetes Verhalten (heute nicht erreicht): [...]
- Repro-Schritte:
  1) ...
  2) ...
  3) ...
- Fehler/Logs (falls vorhanden, 1:1 reinkopieren):
  ...

SOLL-VERHALTEN:
- User Story: Als [Rolle] möchte ich [Ziel], damit [Nutzen].
- Regeln/Details:
  - ...
- Edge Cases:
  - ...

SCOPE:
- Betroffene Bereiche/Seiten/Flows:
  - ...
- Relevante Dateien/Ordner (wenn bekannt):
  - ...
- Out of scope / nicht ändern:
  - ...

CONSTRAINTS:
- Keine neuen Dependencies: [ja/nein]
- Code-Style/Patterns, die einzuhalten sind:
  - ...
- Performance/UX Vorgaben:
  - ...
- Security/Datenschutz:
  - keine Secrets in Code/Logs
  - ...

AKZEPTANZKRITERIEN (DoD):
1) ...
2) ...

VERIFIKATION:
- Commands (die nachher laufen sollen):
  - ...
- Manuelle Checks (Click-Path):
  1) ...
  2) ...
```

## 🔗 Verwandte Module

- **[[prompten]]
- ***Kontext:* Grundlagen der effektiven Kommunikation mit KI-Modellen.
- **[[Repro-Schritte (Definition & Guide)]]
- ***Kontext:* Detail-Erklärung zur Erstellung der Repro-Schritte innerhalb dieser Vorlage.