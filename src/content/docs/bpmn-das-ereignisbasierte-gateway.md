---
title: "BPMN: Das Ereignisbasierte Gateway"
description: "Das ereignisbasierte Gateway steuert den Prozessverlauf nicht über Datenentscheidungen, sondern über externe Ereignisse. Der Pfad des Ereignisses, das zuerst…"
slug: "bpmn-das-ereignisbasierte-gateway"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://wissen-und-werkzeug.de/wiki/bpmn-das-ereignisbasierte-gateway/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-ereignisbasierte-gateway/#article\",\"headline\":\"BPMN: Das Ereignisbasierte Gateway\",\"url\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-ereignisbasierte-gateway/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2025-12-15\",\"dateModified\":\"2026-08-26\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-ereignisbasierte-gateway/\"},\"description\":\"Das ereignisbasierte Gateway steuert den Prozessverlauf nicht über Datenentscheidungen, sondern über externe Ereignisse. Der Pfad des Ereignisses, das zuerst…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-ereignisbasierte-gateway/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Bpmn das Ereignisbasierte Gateway\",\"item\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-ereignisbasierte-gateway/\"}]}]}"
  - tag: meta
    attrs:
      name: semantic-context
      content: "Die Identifikation, Gestaltung, Dokumentation, Steuerung und Optimierung von Geschäftsprozessen zur Steigerung der Effizienz und Qualität in Organisationen."
  - tag: meta
    attrs:
      name: rag-context
      content: "Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement. Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet. Klassifizierung: framework mit der Zielsetzung verstehen."
---

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

---

### Über den Autor
**[Patrick Roßkothen](https://wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-08-26 aktualisiert.
