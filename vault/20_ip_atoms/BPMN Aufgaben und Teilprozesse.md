---
id: bpmn_aufgaben_und_teilprozesse
aliases:
  - bpmn_aufgaben_und_teilprozesse
  - BPMN Aufgaben und Teilprozesse
  - BPMN Aufgaben
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn
type: Article
status: ki_ready
created: 2026-02-16
updated: 2026-09-13
description: Die Aufgabe ist das Grundelement jedes BPMN-Modells. Benennung nach Objekt und Verb, genau ein eingehender und ein ausgehender Sequenzfluss.
image:
offer_heading: "Regeln kennen ist das eine, schneiden das andere"
offer_text: "Wo eine Aufgabe endet und die nächste beginnt, entscheidet sich am Zweck des Modells. Der [Grundkurs BPMN](/grundkurs-bpmn/) übt diesen Schnitt an Prozessen aus der Verwaltung."
---

# BPMN: Aufgaben

## Zusammenfassung

Eine Aufgabe beschreibt eine Tätigkeit, die im Modell nicht weiter detailliert wird. Sie wird als Rechteck mit abgerundeten Ecken dargestellt, nach dem Schema Objekt und Verb benannt und hat nach der Konvention von Wissen & Werkzeug genau einen eingehenden und einen ausgehenden Sequenzfluss.

## Wofür eine Aufgabe steht

Aufgaben bilden den Kern jedes Prozessmodells. Sie geben an, welche Tätigkeiten ausgeführt werden. Eine Aufgabe beschreibt dabei eine einzelne Tätigkeit, die im Modell nicht weiter detailliert wird.

![[bpmn-aufgabe.png]]

## Objekt und Verb

Die Bezeichnung folgt immer dem Schema Objekt und Verb: „Antrag prüfen", „Bescheid erstellen", „Akte anlegen".

Der häufigste Fehler in der Praxis ist die Substantivierung. „Antragsprüfung" lässt offen, was tatsächlich getan wird, und verdeckt, dass hinter dem Wort mehrere Tätigkeiten stecken können. Die Form Objekt und Verb zwingt dazu, beides zu benennen, und macht damit auch sichtbar, wenn eine Aufgabe in Wahrheit mehrere ist.

## Genau ein Eingang, ein Ausgang

Eine Aufgabe hat genau einen eingehenden und genau einen ausgehenden [[BPMN Der Sequenzfluss|Sequenzfluss]]. Das folgt aus der Regel, dass alle Verzweigungen und Zusammenführungen über [[BPMN Grundlagen und Regeln für BPMN Gateways|Gateways]] modelliert werden. Mehr als einen Ein- oder Ausgang haben deshalb nur Gateways.

Der zweite häufige Fehler betrifft genau diese Stelle: Mehrere Pfade laufen direkt in eine Aufgabe hinein, ohne dass ein Gateway davor steht. Damit bleibt offen, ob die Aufgabe beginnt, sobald der erste Pfad ankommt, oder erst, wenn alle angekommen sind. Ein Gateway macht diese Entscheidung sichtbar: Das exklusive führt zusammen, sobald ein Pfad ankommt, das parallele wartet auf alle.

## Wie detailliert

Der Detailgrad leitet sich aus dem Modellierungsziel ab. Für einen Überblick reicht die Aufgabe „Formelle Voraussetzungen prüfen". Soll das Modell Wissen für die Einarbeitung tragen, muss sichtbar werden, welche Prüfungen im Einzelnen stattfinden und welche Folgen sie haben.

## Häufige Fragen

### Wie benenne ich eine Aufgabe in BPMN?

Die Bezeichnung folgt immer dem Schema Objekt und Verb, zum Beispiel „Antrag prüfen" oder „Bescheid erstellen". Substantivierungen wie „Antragsprüfung" sind nicht zulässig. Die Form zwingt dazu, Gegenstand und Tätigkeit zu benennen, und macht für Lesende eindeutig, was an dieser Stelle im Prozess geschieht.

### Darf eine Aufgabe mehrere eingehende Sequenzflüsse haben?

Nach der Konvention von Wissen & Werkzeug nicht. Eine Aufgabe hat genau einen eingehenden und einen ausgehenden Sequenzfluss. Laufen mehrere Pfade zusammen, gehört ein Gateway davor. Die BPMN selbst lässt mehrere eingehende Flüsse zwar zu, die Art der Zusammenführung bleibt dann aber unausgesprochen und das Modell mehrdeutig.

### Wie detailliert modelliere ich Aufgaben?

Der Detailgrad leitet sich aus dem Modellierungsziel ab. Für einen Überblick genügt eine grobe Aufgabe. Soll das Modell als Wissensspeicher für die Einarbeitung dienen, werden die einzelnen Schritte und ihre Folgen sichtbar gemacht. Ein Modell hat den richtigen Detailgrad, wenn es die Frage beantwortet, für die es erstellt wurde.

### Worin unterscheidet sich eine Aufgabe von einem Teilprozess?

Eine Aufgabe beschreibt eine Tätigkeit auf der Aktivitätenebene und wird dort nicht weiter detailliert. Ein Teilprozess fasst einen Hauptbestandteil des Prozesses zusammen und liegt eine Ebene darüber. Erkennbar ist er am Pluszeichen im Symbol, und dahinter liegt ein eigenes Modell mit eigenem Startereignis und mindestens einem Endereignis.

## Verwandte Artikel

- **[[BPMN Der Sequenzfluss]]**  
  Beschreibt, welche Elemente verbunden werden dürfen und warum ein Sequenzfluss keine Poolgrenze überschreitet.
- **[[BPMN Grundlagen und Regeln für BPMN Gateways]]**  
  Zeigt, wie Verzweigungen und Zusammenführungen modelliert werden, die an einer Aufgabe nicht erlaubt sind.
- **[[BPMN Pools und Schwimmbahnen]]**  
  Ergänzt die Aufgabe um die Rolle, die sie ausführt, und um die Grenzen des Prozesses.
- **[[Die 3 Ebenen der Prozessmodellierung]]**  
  Ordnet die Aktivitätenebene in das Vorgehen vom groben Überblick bis zum detaillierten Modell ein.
