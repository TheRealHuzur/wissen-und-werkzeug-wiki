---
id: bpmn_zwischenereignisse
aliases:
  - bpmn_zwischenereignisse
  - BPMN Zwischenereignisse
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn
type: Article
status: ki_ready
created: 2026-02-16
updated:
description: Zwischenereignisse treten zwischen Start und Ende eines Prozesses auf. In der fachlichen Modellierung werden sie meist als "empfangende" Ereignisse genutzt, um Wartezustände (auf Zeit, Nachricht oder Bedingung) darzustellen. **Dieses Modul beantwortet folgende Fragen:** - Wie stelle ich Wartezeiten
image:
offer_heading: "Vom Nachschlagen zum Verstehen"
offer_text: "Welches Zwischenereignis das richtige ist, entscheidet sich selten am Symbol, sondern am Prozess dahinter. Der [Grundkurs BPMN](/grundkurs-bpmn/) ordnet die Ereignistypen so ein, dass du sie im Zusammenhang siehst statt einzeln."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Zwischenereignisse

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

- **[[BPMN Ereignisse (Grundlagen & Konzept)]]***Kontext:* Basisdefinition.
- **[[BPMN Das Ereignisbasierte Gateway]]***Kontext:* Spezielle Nutzung von Zwischenereignissen zur Pfadentscheidung.