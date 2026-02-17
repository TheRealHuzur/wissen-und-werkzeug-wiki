---
title: "Bpmn Aufgaben Und Teilprozesse"
description: "Dieses Modul beschreibt die Darstellung des \"Was\" in einem Prozessmodell durch Aktivitäten. Es definiert Tasks als atomare Einheiten und erläutert die…"
slug: "bpmn-aufgaben-und-teilprozesse"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://www.wissen-und-werkzeug.de/wiki/bpmn-aufgaben-und-teilprozesse/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Bpmn Aufgaben Und Teilprozesse\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-aufgaben-und-teilprozesse/\",\"description\":\"Dieses Modul beschreibt die Darstellung des \\\"Was\\\" in einem Prozessmodell durch Aktivitäten. Es definiert Tasks als atomare Einheiten und erläutert die…\"}"
  - tag: meta
    attrs:
      name: rag-context
      content: "Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement. Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet. Klassifizierung: framework mit der Zielsetzung verstehen."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Aufgaben und Teilprozesse

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.

## Zusammenfassung

Dieses Modul beschreibt die Darstellung des "Was" in einem Prozessmodell durch Aktivitäten. Es definiert Tasks als atomare Einheiten und erläutert die Kapselung von Komplexität durch Teilprozesse sowie die Wiederverwendung mittels Aufrufaktivitäten.

**Dieses Modul beantwortet folgende Fragen:**

- Wie werden Tätigkeiten in BPMN grafisch dargestellt?
- Was ist der Unterschied zwischen einem Task und einem Teilprozess?
- Wie genau bewegt sich eine Marke (Token) durch hierarchische Modelle?

## Aktivitäten: Der Kern des Prozesses

Aktivitäten bilden den Kern eines jeden Prozessmodells. Sie geben an, welche Tätigkeiten ausgeführt werden und werden grundsätzlich als Rechtecke mit abgerundeten Ecken dargestellt. Wir unterscheiden zwischen atomaren **Tasks** (Aufgaben) und **Teilprozessen**.

## Die Aufgabe (Task)

Ein Task beschreibt eine atomare Tätigkeit, die im Prozess nicht weiter detailliert wird.

### Gestaltungsregeln für Tasks

- **Sequenzfluss:** Tasks haben immer genau einen eingehenden und einen ausgehenden Sequenzfluss. Verzweigungen oder Zusammenführungen werden ausschließlich über Gateways gelöst.
- **Namenskonvention (Objekt-Verrichtungsprinzip):** Die Bezeichnung folgt der Formel **Substantiv + Verb** (z. B. "Antrag prüfen"). Das "-ung Verbot" untersagt Substantivierungen wie "Antragsprüfung".

## Hierarchisierung durch Teilprozesse

Teilprozesse (Sub-Processes) fassen mehrere Aufgaben zusammen. Sie helfen, Komplexität zu kapseln ("verstecken") und Modelle übersichtlich zu halten (z. B. Details einer "Anspruchsprüfung"). Ein Plus-Zeichen im unteren Bereich markiert, dass sich hinter der Aktivität weitere Details verbergen.

### Der Ablauf im Teilprozess (Das Marken-Modell)

Um die Wirkweise der Hierarchisierung zu verstehen, betrachten wir den Weg der Marke (Token) im Detail:

1. **Eintritt:** Trifft die Marke auf einen Teilprozess, "fällt" sie von der Haupt-Ebene in die darunterliegende Ebene des Teilprozesses.
2. **Generierung:** Sie wird am **unbestimmten Startereignis** des Teilprozesses neu generiert.
3. **Durchlauf:** Sie durchläuft den detaillierten Detail-Prozess (die Kapsel) gemäß der dortigen Logik.
4. **Konsumtion:** Am **Endereignis** des Teilprozesses wird die Marke konsumiert und an den darüberliegenden Prozess (die Haupt-Ebene) zurückgegeben.
5. **Fortsetzung:** Der Prozess wird auf der Haupt-Ebene über den ausgehenden Sequenzfluss des Teilprozesses fortgesetzt.

### Verschachtelungstiefe

Teilprozesse können selbst wieder Teilprozesse enthalten. Obwohl die BPMN hier keine technischen Grenzen setzt, sollte im Sinne der Übersichtlichkeit auf zu tiefe Verschachtelungen verzichtet werden.

### Darstellungsformen

- **Inline-Darstellung:** Der Teilprozess wird als aufgeklappte "Kapsel" innerhalb des Hauptmodells dargestellt.
- **Separates Modell:** Der Teilprozess liegt als eigenes Dokument vor und wird im Hauptmodell verlinkt.

## Die Aufrufaktivität (Call Activity)

Eine Aufrufaktivität ist ein global wiederverwendbarer Prozess (z. B. "Rechnung bezahlen").

- **Funktion:** Sie verweist nicht auf ein eingebettetes Detail, sondern auf einen zentral abgelegten Standardprozess, der von vielen verschiedenen Prozessen genutzt wird.
- **Vorteil:** Zentrale Wartbarkeit – Änderungen am Standardprozess wirken sich sofort auf alle aufrufenden Prozesse aus.

---

## 🔗 Verwandte Module

- **[BPMN Der Sequenzfluss](/wiki/bpmn-der-sequenzfluss/)***Kontext:* Erläutert die Verbindung von Aktivitäten und die zwingende Nutzung von Gateways.
- **[BPMN Pools und Schwimmbahnen](/wiki/bpmn-pools-und-schwimmbahnen/)***Kontext:* Ergänzt das "Was" (Aktivität) um das "Wer" (Verantwortlichkeit).
- **[Grundlagen und Regeln für BPMN Gateways](#)***Kontext:* Vertieft die Regel, warum Tasks nur einen Ein- und Ausgang haben dürfen.