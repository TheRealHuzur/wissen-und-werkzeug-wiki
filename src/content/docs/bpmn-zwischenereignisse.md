---
title: "BPMN: Zwischenereignisse"
description: "Zwischenereignisse treten zwischen Start und Ende eines Prozesses auf. In der fachlichen Modellierung werden sie meist als \"empfangende\" Ereignisse genutzt,…"
slug: "bpmn-zwischenereignisse"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://www.wissen-und-werkzeug.de/wiki/bpmn-zwischenereignisse/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-zwischenereignisse/#article\",\"headline\":\"BPMN: Zwischenereignisse\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-zwischenereignisse/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://www.wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://www.wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://www.wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2026-02-16\",\"dateModified\":\"2026-02-17\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-zwischenereignisse/\"},\"description\":\"Zwischenereignisse treten zwischen Start und Ende eines Prozesses auf. In der fachlichen Modellierung werden sie meist als \\\"empfangende\\\" Ereignisse genutzt,…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-zwischenereignisse/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Bpmn Zwischenereignisse\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-zwischenereignisse/\"}]}]}"
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

> Zwischenereignisse treten zwischen Start und Ende eines Prozesses auf. In der fachlichen Modellierung werden sie meist als "empfangende" Ereignisse genutzt, um Wartezustände (auf Zeit, Nachricht oder Bedingung) darzustellen.
> 

**Dieses Modul beantwortet folgende Fragen:**

- Wie stelle ich Wartezeiten oder Verzögerungen im Prozess dar?
- Was ist der Unterschied zwischen sendenden und empfangenden Zwischenereignissen?
- Wie reagiert der Prozessfluss auf externe Einflüsse?

## Funktion und Logik

Zwischenereignisse unterbrechen den Sequenzfluss, bis das definierte Ereignis eintritt.

- **Sequenzfluss:** Sie haben **IMMER** genau einen eingehenden und **IMMER** genau einen ausgehenden Sequenzfluss.
- **Das "Warten"-Prinzip:** Trifft die Prozess-Marke auf ein Zwischenereignis, bleibt sie dort stehen ("Pausentaste"), bis der Auslöser (Trigger) von außen kommt.

> Wichtig: Ereignisse prüfen keine historischen Zustände. Sie warten auf ein Ereignis in der Zukunft. Wenn das Ereignis bereits vor Ankunft der Marke eingetreten ist, bekommt die Marke dies theoretisch nicht mit (in der technischen Ausführung relevant).
> 

## Typen von Zwischenereignissen (Empfangend)

Im "Wissen und Werkzeug"-Standard konzentrieren wir uns auf empfangende Ereignisse (Doppelter Rand, nicht schwarz ausgefülltes Symbol).

### Nachrichten-Zwischenereignis (Message Intermediate Event)

Der Prozess wartet auf den Eingang einer Information (z. B. Antwort auf ein Angebot). Erst wenn die Nachricht eintrifft, geht es weiter.

### Zeit-Zwischenereignis (Timer Intermediate Event)

Stellt eine zeitliche Verzögerung dar (z. B. „Wiedervorlage in 2 Wochen“ oder „Warten auf Stichtag“).

> 🖼 GRAFIK: Zeit-ZwischenereignisKI-Beschreibung: Kreis mit doppeltem Rand und Uhr-Symbol.
> 

### Bedingungs-Zwischenereignis (Conditional Intermediate Event)

Der Prozess pausiert, bis eine bestimmte Bedingung wahr wird (z. B. „Mindestteilnehmerzahl erreicht“).

> 🖼 GRAFIK: Bedingungs-ZwischenereignisKI-Beschreibung: Kreis mit doppeltem Rand und Bedingungs-Symbol.
> 

---

## 🔗 Verwandte Module

- **[BPMN Ereignisse (Grundlagen & Konzept)](/wiki/bpmn-ereignisse-grundlagen-konzept/)***Kontext:* Basisdefinition.
- **[BPMN Das Ereignisbasierte Gateway](/wiki/bpmn-das-ereignisbasierte-gateway/)***Kontext:* Spezielle Nutzung von Zwischenereignissen zur Pfadentscheidung.

---

### Über den Autor
**[Patrick Roßkothen](https://www.wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-02-17 aktualisiert.
