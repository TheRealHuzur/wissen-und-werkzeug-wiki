---
id: bpmn_der_sequenzfluss
aliases:
  - bpmn_der_sequenzfluss
  - BPMN Der Sequenzfluss
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn
type: Article
status: ki_ready
created: 2026-02-16
updated:
description: Der Sequenzfluss visualisiert die chronologisch-sachlogische Abfolge eines Prozesses. Er definiert den Pfad und verbindet dabei ausschließlich Elemente innerhalb eines Pools.
image:
offer_heading: "Die einfachste Regel bricht am häufigsten"
offer_text: "Wohin ein Pfeil zeigen darf und wohin nicht, entscheidet über die Lesbarkeit des ganzen Modells. Der [Grundkurs BPMN](/grundkurs-bpmn/) stellt die Regeln im Zusammenhang vor, statt sie als Liste abzuarbeiten."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Der Sequenzfluss


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

- **[[BPMN Aufgaben und Teilprozesse]]***Kontext:* Erläutert die Knotenpunkte (Aufgaben), die durch den Sequenzfluss verbunden werden.
- **[[BPMN Pools und Schwimmbahnen]]***Kontext:* Definiert die Container-Grenzen, an denen der Sequenzfluss stoppen muss.
- **[[BPMN Kollaboration & Externe Beteiligte]]***Kontext:* Erklärt den Nachrichtenfluss, der im Gegensatz zum Sequenzfluss Poolgrenzen überschreiten darf.