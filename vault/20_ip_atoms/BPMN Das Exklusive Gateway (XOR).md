---
id: bpmn_das_exklusive_gateway_xor
aliases:
  - bpmn_das_exklusive_gateway_xor
  - BPMN Das Exklusive Gateway (XOR)
parent_topic: prozessmanagement
subtopic: bpmn
type: framework
intent: verstehen
status: ki_ready
created: 2025-12-15
summary: Das exklusive Gateway (XOR) steuert eine strikte Entweder/Oder-Entscheidung, bei der exakt ein Pfad gewählt wird. Für maximale Klarheit wird die Verwendung des „X“-Symbols und die Beschriftung der ausgehenden Pfade mit dem jeweiligen Ergebnis (statt einer zentralen Frage) empfohlen.
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Das Exklusive Gateway (XOR)

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.

## Zusammenfassung

> Das exklusive Gateway (XOR) steuert eine strikte Entweder/Oder-Entscheidung, bei der exakt ein Pfad gewählt wird. Für maximale Klarheit wird die Verwendung des „X“-Symbols und die Beschriftung der ausgehenden Pfade mit dem jeweiligen Ergebnis (statt einer zentralen Frage) empfohlen.
> 

# Funktionsweise

Das exklusive Gateway bildet eine klassische Entweder/Oder-Entscheidung ab. Die Logik schreibt vor, dass immer nur genau einer der ausgehenden Pfade beschritten werden darf.

- **Symbole:** Es existieren Varianten (leer oder mit X). Es wird empfohlen, ausschließlich das Symbol mit dem **„X“** zu verwenden, um Eindeutigkeit zu gewährleisten.
- **Anwendungsbereich:** Klassische Ja/Nein-Entscheidungen oder Prüfungen gegen Wertgrenzen (z. B. Altersgrenzen, Betragsgrenzen).

### Best Practice: Beschriftung

Eine saubere Beschriftung erhöht die Lesbarkeit drastisch. Gateways sollten nur beschriftet werden, wenn es für das Verständnis zwingend notwendig ist.

1. **Vermeidung impliziter Fragen:** Wenn sich die Frage aus der vorherigen Tätigkeit ergibt (z. B. Tätigkeit "Antrag prüfen"), ist eine Beschriftung des Gateways mit "Geprüft?" redundant.
2. **Explizite Pfad-Beschriftung (Empfohlen):** Anstatt das Gateway mit einer Frage zu versehen und die Pfade mit "Ja/Nein", sollten die **Pfade** selbst das Ergebnis beschreiben.
    - *Beispiel:* Statt "Vollständig?" (Ja/Nein), beschriften Sie die Pfade direkt mit "vollständig" und "unvollständig".

## Zusammenführung (Merge)

Bei der Zusammenführung durch ein exklusives Gateway wird der Prozess **ohne Verzögerung** fortgesetzt. Sobald einer der eingehenden Pfade am Gateway ankommt, wird der Ausgang aktiviert. Es wird nicht auf andere Pfade gewartet.

**Hinweis:** Nicht jede Verzweigung muss zwingend zusammengeführt werden. Unterschiedliche Pfade können auch zu unterschiedlichen End-Ereignissen führen (z. B. Prozess-Abbruch vs. erfolgreicher Abschluss).