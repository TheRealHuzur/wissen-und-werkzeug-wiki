---
id: bpmn_das_ereignisbasierte_gateway
aliases:
  - bpmn_das_ereignisbasierte_gateway
  - BPMN Das Ereignisbasierte Gateway
parent_topic: prozessmanagement
subtopic: bpmn
type: framework
intent: verstehen
status: ki_ready
created: 2025-12-15
summary: Das ereignisbasierte Gateway steuert den Prozessverlauf nicht über Datenentscheidungen, sondern über externe Ereignisse. Der Pfad des Ereignisses, das zuerst eintritt (z. B. Nachrichteneingang vs. Zeitablauf), bestimmt exklusiv den weiteren Weg des Prozesses.
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Das Ereignisbasierte Gateway

## Zusammenfassung

> Das ereignisbasierte Gateway steuert den Prozessverlauf nicht über Datenentscheidungen, sondern über externe Ereignisse. Der Pfad des Ereignisses, das zuerst eintritt (z. B. Nachrichteneingang vs. Zeitablauf), bestimmt exklusiv den weiteren Weg des Prozesses.
> 

# Funktionsweise

Das ereignisbasierte Gateway ist eine Sonderform. Es wird verwendet, wenn der weitere Prozessverlauf nicht durch Daten, sondern durch das Warten auf  Ereignisse bestimmt wird.

- **Logik (Wettlauf):** Die möglichen Ereignisse werden direkt hinter dem Gateway modelliert.  Der Pfad des Ereignisses, das **zuerst** eintritt, wird gewählt.
- **Exklusivität:** Es kann immer nur einer der Pfade beschritten werden.

## Anwendungsbeispiel

Diese Logik ist ideal für Fristenregelungen.

- **Szenario:** Eine Rechnung wird versendet.
- **Pfad A (Nachricht):** Geld geht ein (Reaktion erfolgt).
- **Pfad B (Timer):** Die Zahlungsfrist läuft ab (Zeit vergeht).

Tritt der Timer zuerst ein, wird der Mahnprozess gestartet. Geht das Geld zuerst ein, wird der Vorgang abgeschlossen.

## Zusammenführung

Da nur ein Pfad gewählt wird, erfolgt die Zusammenführung nach denselben Regeln wie bei einem **exklusiven Gateway**. Es wird daher für die Zusammenführung das Standard-XOR-Symbol (X) verwendet.