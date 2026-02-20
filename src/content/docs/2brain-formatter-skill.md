---
title: "2Brain-Formatter Skill"
description: "Dieses Modul beschreibt den 2Brain-Formatter Skill, ein KI-gestütztes Werkzeug zur Standardisierung von Wissensmodulen (IP-Atomen). Es dokumentiert den…"
slug: "2brain-formatter-skill"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://www.wissen-und-werkzeug.de/wiki/2brain-formatter-skill/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/2brain-formatter-skill/#article\",\"headline\":\"2Brain-Formatter Skill\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/2brain-formatter-skill/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://www.wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://www.wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://www.wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2026-02-17\",\"dateModified\":\"2026-02-17\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/2brain-formatter-skill/\"},\"description\":\"Dieses Modul beschreibt den 2Brain-Formatter Skill, ein KI-gestütztes Werkzeug zur Standardisierung von Wissensmodulen (IP-Atomen). Es dokumentiert den…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/2brain-formatter-skill/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"2brain Formatter Skill\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/2brain-formatter-skill/\"}]}]}"
  - tag: meta
    attrs:
      name: semantic-context
      content: "Das Second Brain speichert  und strukturiert Wissen. Es ist idealerweise so in Datenbanken organisiert, dass Zusammenhänge dargestellt werden können und das Wissen mit technischer Unterstützung durchsucht und aufbereitet werden kann."
  - tag: meta
    attrs:
      name: rag-context
      content: "Dieses Modul dokumentiert Fachwissen im Bereich Second Brain. Es ist im Thema Second Brain verortet und dem Subtopic System Architektur zugeordnet. Klassifizierung: anleitung mit der Zielsetzung gestalten."
---

**Zusammenfassung**

> Der **2Brain-Formatter** ist ein spezialisierter KI-Skill zur Aufbereitung von Rohinformationen in hochstrukturierte Wissensmodule. Er fungiert als intelligenter Gatekeeper, der sicherstellt, dass alle neuen Inhalte strikten technischen Standards (YAML, Sanitizing) und inhaltlichen Anforderungen für RAG-Systeme (Context Anchors, präzise Summaries) entsprechen, um eine langfristige Nutzbarkeit im digitalen Gedächtnis zu garantieren.

**Dieses Modul beantwortet folgende Fragen:**

- Wie transformiert der Skill Rohdaten in das standardisierte IP-Modul-Format?
- Welche technischen und inhaltlichen Qualitätskriterien (KI-Ready) werden durch den Skill erzwungen?
- Wie erfolgt die Integration neuer Module in die bestehende Expertise Map und den Wiki-Vault?

### Konzept und Workflow

Der Skill arbeitet in einem zweiphasigen Prozess, um maximale Qualität und Konsistenz sicherzustellen:

1.  **Phase 1: Analyse & Vorschlag**: 
    - Prüfung auf atomaren Inhalt (Atomic Content Principle).
    - Abgleich mit dem bestehenden Wiki-Vault (`/vault`) zur Vermeidung von Dubletten.
    - Vorschlag einer Aufteilung bei komplexen Quelldokumenten.
2.  **Phase 2: Umsetzung**:
    - Generierung des YAML-Headers gemäß dem KM-Schema.
    - Erstellung des RAG-Context-Anchors in standardisiertem Wording.
    - Durchführung von Naming-Konventionen und Sanitizing (z.B. Entfernung von Doppelpunkten).

### Technische Qualitätsstandards (KI-Ready)

Ein Modul erreicht erst dann den Status `ki_ready`, wenn es die automatisierten Prüfschritte des Skills erfolgreich durchläuft:

- **Metadaten**: YAML-Felder enthalten ausschließlich "Pure Strings" (keine Wikilinks) für optimale Maschinenlesbarkeit.
- **RAG-Optimierung**: Die Zusammenfassung umfasst mindestens 150 Zeichen und bietet ein echtes Abstract statt eines Teasers.
- **Taxonomie-Alignment**: Themen (`parent_topic`) und Unterthemen (`subtopic`) werden strikt aus der zentralen `Expertise Map` bezogen.
- **Vernetzung**: Der Skill durchsucht den Vault nach verwandten Modulen und verlinkt diese mit hilfreichen Kontext-Kommentaren.

### Bedeutung für das digitale Gedächtnis

Durch die konsequente Anwendung des Formatters wird das Second Brain von einer reinen Ablage zu einem strukturierten Wissensnetzwerk transformiert. Die Standardisierung ermöglicht leistungsfähige Abfragen (RAG), stabile Exporte (z.B. nach Astro/Starlight) und eine effiziente Filterung nach Intents (verstehen, umsetzen, etc.) und Types (framework, best_practice, etc.).

---

## 🔗 Verwandte Module

- **[system_architektur](/wiki/system-architektur/)**  
  *Kontext:* Die übergeordnete Einordnung des Skills in die technische Infrastruktur des Wissensmanagement-Systems.

---

### Über den Autor
**[Patrick Roßkothen](https://www.wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-02-17 aktualisiert.
