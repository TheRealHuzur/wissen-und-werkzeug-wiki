---
title: "BPMN: Ereignisse (Grundlagen & Konzept)"
description: "Ereignisse sind zentrale Elemente der BPMN, die den Prozessfluss steuern, indem sie den Start, Zwischenschritte oder das Ende eines Prozesses definieren. Sie…"
slug: "bpmn-ereignisse-grundlagen-konzept"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://wissen-und-werkzeug.de/wiki/bpmn-ereignisse-grundlagen-konzept/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-ereignisse-grundlagen-konzept/#article\",\"headline\":\"BPMN: Ereignisse (Grundlagen & Konzept)\",\"url\":\"https://wissen-und-werkzeug.de/wiki/bpmn-ereignisse-grundlagen-konzept/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2026-02-16\",\"dateModified\":\"2026-08-26\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-ereignisse-grundlagen-konzept/\"},\"description\":\"Ereignisse sind zentrale Elemente der BPMN, die den Prozessfluss steuern, indem sie den Start, Zwischenschritte oder das Ende eines Prozesses definieren. Sie…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-ereignisse-grundlagen-konzept/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Bpmn Ereignisse Grundlagen Konzept\",\"item\":\"https://wissen-und-werkzeug.de/wiki/bpmn-ereignisse-grundlagen-konzept/\"}]}]}"
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

> Ereignisse sind zentrale Elemente der BPMN, die den Prozessfluss steuern, indem sie den Start, Zwischenschritte oder das Ende eines Prozesses definieren. Sie repräsentieren Zustände („etwas ist passiert“), verbrauchen keine Zeit und werden visuell durch Kreise dargestellt.
> 

**Dieses Modul beantwortet folgende Fragen:**

- Was ist ein Ereignis in der BPMN?
- Wie unterscheiden sich Start-, Zwischen- und Endereignisse optisch und funktional?
- Was passiert mit einer "Marke" (Token), wenn sie auf ein Ereignis trifft?

## Definition und Bedeutung

Ein Ereignis (Event) ist etwas, das während des Ablaufs eines Prozesses "passiert". Diese Ereignisse beeinflussen den Fluss des Modells und haben üblicherweise eine Ursache (Auslöser/Trigger) oder eine Auswirkung (Ergebnis/Result).

Im Gegensatz zu Aktivitäten, die eine aktive Handlung darstellen, beschreiben Ereignisse einen Zustand.

- **Grundregel:** Ereignisse beinhalten nie Bearbeitungszeit.
- **Funktion:** Sie setzen den Prozess in Gang, verzögern ihn (Warten auf ein Ereignis) oder beenden ihn.

## Die drei Ereignistypen

Ereignisse lassen sich anhand ihrer Position im Prozessfluss unterscheiden. Optisch werden sie primär durch die Dicke und Art ihres Randes differenziert.

| Typ | Beschreibung | Visuelles Merkmal |
| --- | --- | --- |
| **Startereignis** | Löst den Prozess aus. | Dünner Rand |
| **Zwischenereignis** | Tritt während des Prozesses auf (z. B. Warten). | Doppelter Rand |
| **Endereignis** | Schließt den Prozess oder einen Pfad ab. | Dicker Rand |

## Das Token-Konzept (Die Marke)

Um die Dynamik von Ereignissen zu verstehen, hilft das Konzept der "Marke" (Token), die den Prozess durchläuft:

1. **Start:** Tritt das Startereignis ein, wird eine Marke erzeugt.
2. **Zwischen:** Trifft die Marke auf ein empfangendes Zwischenereignis, wartet sie dort, bis das Ereignis eintritt. Ereignisse prüfen keinen Zustand rückwirkend – sie warten auf das Eintreten in der Zukunft.
3. **Ende:** Trifft eine Marke auf ein Endereignis, wird sie "konsumiert" und aus dem System genommen.

## Spezifikation durch Symbole

Zusätzlich zum Rand können Ereignisse durch Symbole im Inneren genauer bestimmt werden (z. B. Briefumschlag für Nachrichten, Uhr für Zeit).

- **Unbestimmt:** Kein Symbol.
- **Spezifiziert:** Mit Symbol (Typisierung des Auslösers).
- **Richtung:** Unterscheidung in sendende (ausgefülltes Symbol) und empfangende (leeres Symbol) Ereignisse.

---

## 🔗 Verwandte Module

- **[BPMN Startereignisse](/wiki/bpmn-startereignisse/)***Kontext:* Vertiefung des ersten Ereignistyps.
- **[BPMN Zwischenereignisse](/wiki/bpmn-zwischenereignisse/)***Kontext:* Vertiefung der Ereignisse innerhalb des Flusses.
- **[BPMN Endereignisse](/wiki/bpmn-endereignisse/)***Kontext:* Vertiefung des Prozessabschlusses.
- **[BPMN Der Sequenzfluss](/wiki/bpmn-der-sequenzfluss/)***Kontext:* Verbindung der Ereignisse untereinander.

---

### Über den Autor
**[Patrick Roßkothen](https://wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-08-26 aktualisiert.
