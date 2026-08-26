---
title: "BPMN: Das Parallele Gateway (AND)"
description: "Das parallele Gateway (AND) steuert die gleichzeitige oder reihenfolgeunabhängige Ausführung aller ausgehenden Pfade. Gekennzeichnet durch das + Symbol,…"
slug: "bpmn-das-parallele-gateway-and"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://wissen-und-werkzeug.de/wiki/bpmn-das-parallele-gateway-and/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-parallele-gateway-and/#article\",\"headline\":\"BPMN: Das Parallele Gateway (AND)\",\"url\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-parallele-gateway-and/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2025-12-15\",\"dateModified\":\"2026-08-26\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-parallele-gateway-and/\"},\"description\":\"Das parallele Gateway (AND) steuert die gleichzeitige oder reihenfolgeunabhängige Ausführung aller ausgehenden Pfade. Gekennzeichnet durch das + Symbol,…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-parallele-gateway-and/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Bpmn das Parallele Gateway And\",\"item\":\"https://wissen-und-werkzeug.de/wiki/bpmn-das-parallele-gateway-and/\"}]}]}"
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

---

### Über den Autor
**[Patrick Roßkothen](https://wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-08-26 aktualisiert.
