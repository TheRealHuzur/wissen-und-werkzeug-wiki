---
id: bpmn_das_parallele_gateway_and
aliases:
  - bpmn_das_parallele_gateway_and
  - BPMN Das Parallele Gateway (AND)
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn
type: Article
status: ki_ready
created: 2025-12-15
updated:
description: "Das parallele Gateway (AND) steuert die gleichzeitige oder reihenfolgeunabhängige Ausführung aller ausgehenden Pfade. Gekennzeichnet durch das + Symbol, aktiviert es im Split-Modus ausnahmslos alle Wege, während es bei der Zusammenführung als Synchronisationspunkt dient: Der Prozess wird erst fortge"
image:
offer_heading: "Die Zusammenführung ist die schwierigere Hälfte"
offer_text: "Das parallele Gateway ist schnell gesetzt, falsch gebaut wird häufiger die Zusammenführung als die Verzweigung. Der [Grundkurs BPMN](/grundkurs-bpmn/) erklärt beide Seiten im Zusammenhang und macht sichtbar, woran ein hängender Pfad liegt."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Das Parallele Gateway (AND)

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