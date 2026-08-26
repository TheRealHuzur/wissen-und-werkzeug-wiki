---
title: "BPMN: Das Exklusive Gateway (XOR)"
description: "Das exklusive Gateway (XOR) steuert eine strikte Entweder/Oder-Entscheidung, bei der exakt ein Pfad gewählt wird. Für maximale Klarheit wird die Verwendung…"
slug: "bpmn-das-exklusive-gateway-xor"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://wissen-und-werkzeug.de/wiki/bpmn-das-exklusive-gateway-xor/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-exklusive-gateway-xor/#article\",\"headline\":\"BPMN: Das Exklusive Gateway (XOR)\",\"url\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-exklusive-gateway-xor/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2025-12-15\",\"dateModified\":\"2026-08-26\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-exklusive-gateway-xor/\"},\"description\":\"Das exklusive Gateway (XOR) steuert eine strikte Entweder/Oder-Entscheidung, bei der exakt ein Pfad gewählt wird. Für maximale Klarheit wird die Verwendung…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-exklusive-gateway-xor/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Bpmn das Exklusive Gateway Xor\",\"item\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-exklusive-gateway-xor/\"}]}]}"
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

---

### Über den Autor
**[Patrick Roßkothen](https://wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-08-26 aktualisiert.
