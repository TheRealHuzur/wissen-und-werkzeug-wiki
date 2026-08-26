---
title: "BPMN: Startereignisse"
description: "Startereignisse definieren den Auslöser eines Prozesses und erzeugen beim Eintreten eine neue Prozessinstanz (Token). Sie haben keinen eingehenden, aber genau…"
slug: "bpmn-startereignisse"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://wissen-und-werkzeug.de/wiki/bpmn-startereignisse/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-startereignisse/#article\",\"headline\":\"BPMN: Startereignisse\",\"url\":\"https://wissen-und-werkzeug.de/wiki/bpmn-startereignisse/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2026-02-16\",\"dateModified\":\"2026-08-26\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-startereignisse/\"},\"description\":\"Startereignisse definieren den Auslöser eines Prozesses und erzeugen beim Eintreten eine neue Prozessinstanz (Token). Sie haben keinen eingehenden, aber genau…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-startereignisse/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Bpmn Startereignisse\",\"item\":\"https://wissen-und-werkzeug.de/wiki/bpmn-startereignisse/\"}]}]}"
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

> Startereignisse definieren den Auslöser eines Prozesses und erzeugen beim Eintreten eine neue Prozessinstanz (Token). Sie haben keinen eingehenden, aber genau einen ausgehenden Sequenzfluss.
> 

**Dieses Modul beantwortet folgende Fragen:**

- Wie wird ein Prozess in BPMN korrekt gestartet?
- Welche Arten von Startereignissen gibt es (Nachricht, Zeit, Bedingung)?
- Wie benenne ich Startereignisse richtig?

## Eigenschaften und Regeln

Jeder Prozess benötigt mindestens einen Auslöser. Das Startereignis beschreibt den Impuls, der den Prozess in Gang setzt, nicht die erste Handlung.

- **Sequenzfluss:** Startereignisse haben **NIE** einen eingehenden und **IMMER** genau einen ausgehenden Sequenzfluss.
- **Benennung:** Konvention ist ein Verb im Perfekt oder ein Zustand (z. B. „Antrag ist eingegangen“, „Frist ist verstrichen“).

## Typen von Startereignissen

### Unbestimmtes Startereignis

Zeigt an, dass der Prozess gestartet wird, ohne den Auslöser technisch zu spezifizieren. Es wird oft verwendet, wenn der Prozess durch einen manuellen Start oder einen nicht näher definierten Auslöser beginnt.

### Nachrichten-Startereignis (Message Start Event)

Der Prozess startet durch den Eingang einer Information (z. B. E-Mail, Anruf, Antrag).

- *Symbol:* Briefumschlag.
- *Hinweis:* "Nachricht" bedeutet hier jegliche Form von Informationsaustausch, nicht zwingend einen Brief.

### Zeitbasiertes Startereignis (Timer Start Event)

Der Prozess startet zu einem definierten Zeitpunkt (Datum, Uhrzeit) oder nach einem Zyklus (z. B. „Jeden Montag“).

- *Symbol:* Uhr.

### Bedingtes Startereignis (Conditional Start Event)

Der Prozess startet automatisch, wenn eine bestimmte sachliche Bedingung erfüllt ist (z. B. „Temperatur fällt unter 0 Grad“).

- *Symbol:* Dokument/Liste (je nach Tool-Darstellung).

## Modellierung mehrerer Startmöglichkeiten

Ein Prozess kann auf verschiedene Arten ausgelöst werden (z. B. Antrag per Post ODER per Mail). Dies wird modelliert, indem mehrere Startereignisse platziert werden, deren Sequenzflüsse im Verlauf (meist über ein Gateway) zusammengeführt werden.

---

## 🔗 Verwandte Module

- **[BPMN Ereignisse (Grundlagen & Konzept)](/wiki/bpmn-ereignisse-grundlagen-konzept/)***Kontext:* Übergeordnetes Konzept.
- **[BPMN Das Exklusive Gateway (XOR)](/wiki/bpmn-das-exklusive-gateway-xor/)***Kontext:* Häufig genutzt, um Pfade nach verschiedenen Startereignissen zusammenzuführen.

---

### Über den Autor
**[Patrick Roßkothen](https://wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-08-26 aktualisiert.
