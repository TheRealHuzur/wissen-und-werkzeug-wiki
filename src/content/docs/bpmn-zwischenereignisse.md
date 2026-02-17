---
title: "Bpmn Zwischenereignisse"
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
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Bpmn Zwischenereignisse\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-zwischenereignisse/\",\"description\":\"Zwischenereignisse treten zwischen Start und Ende eines Prozesses auf. In der fachlichen Modellierung werden sie meist als \\\"empfangende\\\" Ereignisse genutzt,…\"}"
  - tag: meta
    attrs:
      name: rag-context
      content: "Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement. Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet. Klassifizierung: framework mit der Zielsetzung verstehen."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Zwischenereignisse

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.

## **Zusammenfassung**

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