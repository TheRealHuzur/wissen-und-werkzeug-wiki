---
title: "BPMN: Endereignisse"
description: "Endereignisse markieren den Abschluss eines Prozesspfades. Sie \"konsumieren\" die Prozess-Marke. Ein Prozess kann mehrere unterschiedliche Endereignisse haben,…"
slug: "bpmn-endereignisse"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://www.wissen-und-werkzeug.de/wiki/bpmn-endereignisse/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-endereignisse/#article\",\"headline\":\"BPMN: Endereignisse\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-endereignisse/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://www.wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://www.wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://www.wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2026-02-16\",\"dateModified\":\"2026-02-17\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-endereignisse/\"},\"description\":\"Endereignisse markieren den Abschluss eines Prozesspfades. Sie \\\"konsumieren\\\" die Prozess-Marke. Ein Prozess kann mehrere unterschiedliche Endereignisse haben,…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-endereignisse/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Bpmn Endereignisse\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-endereignisse/\"}]}]}"
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

> Endereignisse markieren den Abschluss eines Prozesspfades. Sie "konsumieren" die Prozess-Marke. Ein Prozess kann mehrere unterschiedliche Endereignisse haben, um verschiedene Ergebniszustände zu dokumentieren.
> 

**Dieses Modul beantwortet folgende Fragen:**

- Wie wird ein Prozess korrekt beendet?
- Warum sollte ich mehrere Endereignisse modellieren?
- Was ist der Unterschied zwischen dem unbestimmten Ende und dem Nachrichten-Ende?

## Eigenschaften und Regeln

Ein Prozessmodell muss mindestens ein Endereignis besitzen, damit kein Pfad "ins Leere" läuft.

- **Sequenzfluss:** Endereignisse haben **IMMER** genau einen eingehenden Sequenzfluss und **KEINEN** ausgehenden.
- **Ergebnisorientierung:** Die Beschriftung des Endereignisses sollte den Endzustand beschreiben (z. B. „Antrag abgelehnt“ vs. „Antrag bewilligt“).

## Multiple Endereignisse

Es wird dringend empfohlen, unterschiedliche Ergebnisse auch durch unterschiedliche Endereignisse darzustellen.

- *Beispiel:* Ein Antragsprozess sollte nicht pauschal in „Prozess beendet“ münden, sondern differenziert in „Antrag abgelehnt“ und „Antrag bewilligt“. Dies erhöht die fachliche Aussagekraft.

## Typen von Endereignissen

### Unbestimmtes Endereignis

Der Standard-Abschluss. Zeigt an, dass der Prozesspfad hier endet.

> 🖼 GRAFIK: Unbestimmtes EndereignisKI-Beschreibung: Kreis mit dickem Rand, ohne Symbol.
> 

### Nachrichten-Endereignis (Message End Event)

Der Prozess endet mit dem Versand einer Nachricht.

- *Besonderheit:* Dies ist ein "sendendes" Ereignis (Symbol ausgefüllt).
- *Funktion:* Es impliziert den Versand. Wenn der Versand eine aktive Tätigkeit erfordert, die Zeit kostet, sollte stattdessen eine "Senden"-Aufgabe und danach ein unbestimmtes Ende verwendet werden. Das Nachrichten-Ende verbraucht keine Zeit.

> 🖼 GRAFIK: Nachrichten-EndereignisKI-Beschreibung: Kreis mit dickem Rand und ausgefülltem (schwarzen) Briefumschlag.
> 

### Hinweis zu Zeit-Ereignissen

Ein zeitbasiertes Endereignis existiert in der BPMN nicht, da ein Zeitpunkt nicht durch den Prozess selbst "erzeugt" oder ausgelöst werden kann.

---

## 🔗 Verwandte Module

- **[BPMN Ereignisse (Grundlagen & Konzept)](/wiki/bpmn-ereignisse-grundlagen-konzept/)***Kontext:* Basisdefinition.
- **[BPMN Startereignisse](/wiki/bpmn-startereignisse/)***Kontext:* Das Gegenstück zum Start.

---

### Über den Autor
**[Patrick Roßkothen](https://www.wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-02-17 aktualisiert.
