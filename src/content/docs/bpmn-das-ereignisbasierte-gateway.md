---
title: "Bpmn Das Ereignisbasierte Gateway"
description: "Das ereignisbasierte Gateway steuert den Prozessverlauf nicht über Datenentscheidungen, sondern über externe Ereignisse. Der Pfad des Ereignisses, das zuerst…"
slug: "bpmn-das-ereignisbasierte-gateway"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://www.wissen-und-werkzeug.de/wiki/bpmn-das-ereignisbasierte-gateway/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Bpmn Das Ereignisbasierte Gateway\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-das-ereignisbasierte-gateway/\",\"description\":\"Das ereignisbasierte Gateway steuert den Prozessverlauf nicht über Datenentscheidungen, sondern über externe Ereignisse. Der Pfad des Ereignisses, das zuerst…\"}"
  - tag: meta
    attrs:
      name: rag-context
      content: "Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement. Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet. Klassifizierung: framework mit der Zielsetzung verstehen."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Das Ereignisbasierte Gateway

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.

## **Zusammenfassung**

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