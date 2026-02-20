---
title: "BPMN: Pools und Schwimmbahnen"
description: "Dieses Modul erläutert das Konzept von Pools und Schwimmbahnen (Lanes) in der BPMN. Es beschreibt, wie Verantwortlichkeiten (WER macht WAS) visualisiert…"
slug: "bpmn-pools-und-schwimmbahnen"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://www.wissen-und-werkzeug.de/wiki/bpmn-pools-und-schwimmbahnen/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-pools-und-schwimmbahnen/#article\",\"headline\":\"BPMN: Pools und Schwimmbahnen\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-pools-und-schwimmbahnen/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://www.wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://www.wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://www.wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2026-02-16\",\"dateModified\":\"2026-02-17\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-pools-und-schwimmbahnen/\"},\"description\":\"Dieses Modul erläutert das Konzept von Pools und Schwimmbahnen (Lanes) in der BPMN. Es beschreibt, wie Verantwortlichkeiten (WER macht WAS) visualisiert…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-pools-und-schwimmbahnen/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Bpmn Pools und Schwimmbahnen\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/bpmn-pools-und-schwimmbahnen/\"}]}]}"
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

Dieses Modul erläutert das Konzept von Pools und Schwimmbahnen (Lanes) in der BPMN. Es beschreibt, wie Verantwortlichkeiten (WER macht WAS) visualisiert werden, wie hierarchische Strukturen abgebildet werden und welche Granularität für verschiedene Zielgruppen (Entscheider vs. Umsetzung) geeignet ist.

In einem Prozessmodell ist es entscheidend, nicht nur darzustellen, WAS getan wird, sondern auch, WER es tut. Unklare Zuständigkeiten gehören zu den häufigsten Schwachstellen in Prozessen. Hierfür nutzt die BPMN das Konzept von Pools und Schwimmbahnen (Lanes).

## Definition und Aufbau

- **Pool:** Der Pool ist der Zusammenschluss aller am Prozess beteiligten einer Organisation.
- **Lane (Schwimmbahn):** Eine Unterteilung innerhalb eines Pools (vertikal oder horizontal), die dazu dient, die einzelnen Beteiligten am Prozess darzustellen.

Ein Pool repräsentiert in der Regel den Prozess innerhalb der eigenen Organisation. Gibt es nur einen Beteiligten, fungiert der Pool gleichzeitig als Schwimmbahn.

## Funktionsweise

Ein Prozess startet und endet immer im selben Pool. Der gesamte Sequenzfluss vom Start- bis zum Endereignis bleibt innerhalb der Grenzen dieses Pools.
Jede am Prozess beteiligte Rolle erhält eine eigene Schwimmbahn. Aktivitäten werden in der Bahn der Rolle platziert, die sie ausführt. Dadurch werden Durchführungsverantwortung und Schnittstellen (Wechsel der Schwimmbahn) sofort sichtbar.

## Hierarchische Darstellung & Organisationseinheiten

Schwimmbahnen können verschachtelt werden, um hierarchische Strukturen abzubilden. Dies hilft, Rollen bestimmten Organisationseinheiten (z. B. Amt -> Sachgebiet -> Rolle) zuzuordnen.

## Granularität der Modellierung

Die Detailtiefe der Schwimmbahnen hängt von der Zielgruppe ab:

- **Organisationseinheiten:** Bei Prozessen mit vielen Akteuren (z. B. Stellenbesetzung mit Personalrat, Gleichstellung, Fachamt) kann eine Darstellung auf Ebene der Abteilung sinnvoller sein, um die Übersicht zu wahren. Dies eignet sich besonders für Entscheider.
- **Einzelne Rollen:** Für die technische Umsetzung (z. B. Workflow-Steuerung in DMS) muss jede spezifische Rolle modelliert werden.
- **Software als Schwimmbahn:** In digitalisierten Soll-Modellen kann eine eigene Bahn für System-Aktivitäten (Bot, Software) angelegt werden, um Anforderungen für Lastenhefte zu definieren.

---

## 🔗 Verwandte Module

- **[BPMN Kollaboration & Externe Beteiligte](/wiki/bpmn-kollaboration-externe-beteiligte/)***Kontext:* Beschreibt, wie Prozesse mit externen Partnern (außerhalb des eigenen Pools) interagieren.
- **[20_ip_atoms/Kompetenzprofil ProzessmanagerIn](#)***Kontext:* Relevante Rolle für die Definition der Zuständigkeiten im Modell.

---

### Über den Autor
**[Patrick Roßkothen](https://www.wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-02-17 aktualisiert.
