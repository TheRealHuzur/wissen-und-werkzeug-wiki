---
title: "Bpmn Endereignisse"
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
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Bpmn Endereignisse\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-endereignisse/\",\"description\":\"Endereignisse markieren den Abschluss eines Prozesspfades. Sie \\\"konsumieren\\\" die Prozess-Marke. Ein Prozess kann mehrere unterschiedliche Endereignisse haben,…\"}"
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

# BPMN: Endereignisse

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.

## **Zusammenfassung**

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