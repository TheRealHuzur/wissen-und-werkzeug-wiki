---
id: bpmn_kollaboration_externe_beteiligte
aliases:
  - bpmn_kollaboration_externe_beteiligte
  - BPMN Kollaboration & Externe Beteiligte

area: fach_expertise
parent_topic: prozessmanagement
subtopic: bpmn
type: framework
intent: verstehen
status: ki_ready
created: 2026-02-16
summary: "Dieses Modul behandelt die Darstellung von externen Prozessbeteiligten in der BPMN (Kollaboration). Es erklärt den Einsatz von Black-Box-Pools, die Nutzung von Nachrichtenflüssen zur Kommunikation und die strikten Regeln für Verbindungen über Poolgrenzen hinweg."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Kollaboration & Externe Beteiligte

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.

## Zusammenfassung

Dieses Modul behandelt die Darstellung von externen Prozessbeteiligten in der BPMN (Kollaboration). Es erklärt den Einsatz von Black-Box-Pools, die Nutzung von Nachrichtenflüssen zur Kommunikation und die strikten Regeln für Verbindungen über Poolgrenzen hinweg.

In der Prozessmodellierung beschränkt sich der detaillierte Ablauf (Sequenzfluss) meist auf die eigene Organisation. Externe Beteiligte (z. B. Kunden, Bewerber, Partnerbehörden) sind nicht Teil des eigenen Pools, interagieren aber mit ihm. Diese Interaktion nennt man Kollaboration.

## Der Black-Box-Pool

Da der interne Prozessablauf externer Beteiligter oft unbekannt oder für das eigene Modell irrelevant ist, wird er nicht detailliert dargestellt. Stattdessen verwendet man einen "Black-Box-Pool".

- **Darstellung:** Ein leeres Rechteck, das den externen Akteur repräsentiert (z. B. "AntragstellerIn").
- **Funktion:** Er dient als Quelle und Ziel für den Informationsaustausch, ohne interne Aktivitäten zu zeigen.

## Nachrichtenfluss (Message Flow)

Der Austausch zwischen zwei Pools (z. B. Antrag geht ein, Bescheid wird versendet) wird ausschließlich über den Nachrichtenfluss dargestellt.

- **Symbol:** Gestrichelter Pfeil mit hohler Spitze und hohlem Kreis am Start.
- **Bedeutung:** Visualisiert den Schnittstellen-Dialog und den Informationsaustausch. Dies ist besonders für die Digitalisierung relevant.

## Regeln für Verbinder über Grenzen hinweg

Für die Verbindung von Elementen gelten im Kontext von Pools strikte "Immer/Nie"-Regeln:

| Verbinder | Regel | Begründung |
| --- | --- | --- |
| **Sequenzfluss** (durchgezogen) | **NIE** über Poolgrenzen | Ein Prozessablauf (Token) verlässt niemals den Pool. |
| **Assoziation** (gepunktet) | **NIE** über Poolgrenzen | Dient nur der Beschriftung/Verknüpfung innerhalb eines Kontextes. |
| **Nachrichtenfluss** (gestrichelt) | **IMMER** über Poolgrenzen | Dient per Definition der Kommunikation *zwischen* zwei getrennten Pools. |

---

## 🔗 Verwandte Module

- **[[BPMN Pools und Schwimmbahnen]]***Kontext:* Grundlage für das Verständnis von Pools, auf denen die Kollaboration aufbaut.
- **[[Datenobjekte & Informationsfluss]]***Kontext:* Ergänzend zum Nachrichtenfluss relevant für den Datenaustausch an Schnittstellen.