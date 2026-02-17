---
title: "Bpmn Der Sequenzfluss"
description: "Der Sequenzfluss visualisiert die chronologisch-sachlogische Abfolge eines Prozesses. Er definiert den Pfad und verbindet dabei ausschließlich Elemente…"
slug: "bpmn-der-sequenzfluss"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://www.wissen-und-werkzeug.de/wiki/bpmn-der-sequenzfluss/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Bpmn Der Sequenzfluss\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-der-sequenzfluss/\",\"description\":\"Der Sequenzfluss visualisiert die chronologisch-sachlogische Abfolge eines Prozesses. Er definiert den Pfad und verbindet dabei ausschließlich Elemente…\"}"
  - tag: meta
    attrs:
      name: rag-context
      content: "Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement. Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet. Klassifizierung: framework mit der Zielsetzung verstehen."
---

# BPMN: Der Sequenzfluss

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.

## Zusammenfassung

Der Sequenzfluss visualisiert die chronologisch-sachlogische Abfolge eines Prozesses. Er definiert den Pfad  und verbindet dabei ausschließlich Elemente innerhalb eines Pools.

**Dieses Modul beantwortet folgende Fragen:**

- Welche Elemente dürfen durch einen Sequenzfluss verbunden werden?
- Welche strikten Regeln gelten für Poolgrenzen?

## Die Funktion als Pfad

Der Sequenzfluss (Sequence Flow) zeigt die Reihenfolge an, in der Aktivitäten ausgeführt werden ("Order of Performance"). 

## Die 4 Grundregeln der Modellierung

Für die Modellierung gelten strikte Regeln, um die Logik und Lesbarkeit zu gewährleisten:

1. **Zulässige Verbindungen:** Ein Sequenzfluss darf ausschließlich **Aktivitäten, Gateways und Ereignisse** verbinden.
2. **Festigkeit:** Sequenzflüsse laufen niemals ins Leere. Sie müssen am Anfang und Ende immer fest mit einem Fluss-Element verbunden sein.
3. **Pool-Grenzen:** Sequenzflüsse verbinden nur Elemente innerhalb eines Prozesses. Sie überschreiten **niemals** eine Poolgrenze.

## Best Practices für die Gestaltung

Um die visuelle Qualität und Verständlichkeit zu erhöhen, sollten folgende Punkte beachtet werden:

- **Vermeidung von Chaos:** Überkreuzungen und Überlagerungen von Sequenzflüssen sind sollten vermieden werden, da sie die Prozesslogik optisch verfälschen können.

---

## 🔗 Verwandte Module

- **[BPMN Aufgaben und Teilprozesse](/wiki/bpmn-aufgaben-und-teilprozesse/)***Kontext:* Erläutert die Knotenpunkte (Aufgaben), die durch den Sequenzfluss verbunden werden.
- **[BPMN Pools und Schwimmbahnen](/wiki/bpmn-pools-und-schwimmbahnen/)***Kontext:* Definiert die Container-Grenzen, an denen der Sequenzfluss stoppen muss.
- **[BPMN Kollaboration & Externe Beteiligte](/wiki/bpmn-kollaboration-externe-beteiligte/)***Kontext:* Erklärt den Nachrichtenfluss, der im Gegensatz zum Sequenzfluss Poolgrenzen überschreiten darf.