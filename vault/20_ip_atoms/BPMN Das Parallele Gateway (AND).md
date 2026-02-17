---
id: bpmn_das_parallele_gateway_and
aliases:
  - bpmn_das_parallele_gateway_and
  - BPMN Das Parallele Gateway (AND)
parent_topic: prozessmanagement
subtopic: bpmn
type: framework
intent: verstehen
status: ki_ready
created: 2025-12-15
summary: "Das parallele Gateway (AND) steuert die gleichzeitige oder reihenfolgeunabhängige Ausführung aller ausgehenden Pfade. Gekennzeichnet durch das + Symbol, aktiviert es im Split-Modus ausnahmslos alle Wege, während es bei der Zusammenführung als Synchronisationspunkt dient: Der Prozess wird erst fortge"
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Das Parallele Gateway (AND)

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.

## Zusammenfassung

> Das parallele Gateway (AND) steuert die gleichzeitige oder reihenfolgeunabhängige Ausführung aller ausgehenden Pfade. Gekennzeichnet durch das + Symbol, aktiviert es im Split-Modus ausnahmslos alle Wege, während es bei der Zusammenführung als Synchronisationspunkt dient: Der Prozess wird erst fortgesetzt, wenn alle eingehenden Pfade vollständig abgeschlossen sind.
> 

# Funktionsweise (Split)

Das parallele Gateway, gekennzeichnet durch ein **+** Symbol, zeigt an, dass **alle** ausgehenden Pfade aktiviert werden. Da hier keine Entscheidung getroffen wird, ist eine Beschriftung des Gateways nicht notwendig.

Es deckt zwei logische Szenarien ab:

1. **Echte Gleichzeitigkeit:** Abläufe finden tatsächlich zeitgleich statt.
2. **Unabhängige Reihenfolge:** Es müssen mehrere Aufgaben erledigt werden, deren Reihenfolge untereinander aber egal ist (z. B. "Getränke bestellen" und "Blumen bestellen"). Wichtig ist nur, dass alles erledigt wird.

## Zusammenführung (Synchronisation)

Die parallele Zusammenführung fungiert als Synchronisationspunkt. Der Prozess kann an dieser Stelle erst fortfahren, wenn **alle** eingehenden Pfade abgearbeitet wurden und am Gateway eingetroffen sind.

- **Zeitverhalten:** Der Pfad, der am längsten dauert, bestimmt den Zeitpunkt, wann der Prozess nach dem Gateway weiterläuft.