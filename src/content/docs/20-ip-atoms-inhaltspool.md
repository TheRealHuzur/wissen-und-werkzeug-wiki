---
title: "Inhaltspool (ip_atoms)"
description: "Dieses Modul beschreibt ipatoms als den zentralen Wissensbestand deines Systems. Es erklärt, was ein Modul ist, wie es für Menschen gut lesbar bleibt und…"
slug: "20-ip-atoms-inhaltspool"
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://www.wissen-und-werkzeug.de/wiki/20-ip-atoms-inhaltspool/"
  - tag: script
    attrs:
      type: application/ld+json
    content: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/20-ip-atoms-inhaltspool/#article\",\"headline\":\"Inhaltspool (ip_atoms)\",\"url\":\"https://www.wissen-und-werkzeug.de/wiki/20-ip-atoms-inhaltspool/\",\"author\":{\"@type\":\"Person\",\"name\":\"Patrick Roßkothen\",\"url\":\"https://www.wissen-und-werkzeug.de/ueber-mich/\",\"sameAs\":[\"https://www.linkedin.com/in/patrickrosskothen/\"],\"jobTitle\":\"Experte für Prozess- und Wissensmanagement\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Wissen & Werkzeug\",\"url\":\"https://www.wissen-und-werkzeug.de\",\"logo\":{\"@type\":\"ImageObject\",\"url\":\"https://www.wissen-und-werkzeug.de/favicon.svg\"}},\"datePublished\":\"2026-02-16\",\"dateModified\":\"2026-02-19\",\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/20-ip-atoms-inhaltspool/\"},\"description\":\"Dieses Modul beschreibt ipatoms als den zentralen Wissensbestand deines Systems. Es erklärt, was ein Modul ist, wie es für Menschen gut lesbar bleibt und…\"},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://www.wissen-und-werkzeug.de/wiki/20-ip-atoms-inhaltspool/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Wiki\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"20 Ip Atoms Inhaltspool\",\"item\":\"https://www.wissen-und-werkzeug.de/wiki/20-ip-atoms-inhaltspool/\"}]}]}"
  - tag: meta
    attrs:
      name: semantic-context
      content: "Das Second Brain speichert  und strukturiert Wissen. Es ist idealerweise so in Datenbanken organisiert, dass Zusammenhänge dargestellt werden können und das Wissen mit technischer Unterstützung durchsucht und aufbereitet werden kann."
  - tag: meta
    attrs:
      name: rag-context
      content: "Dieses Modul dokumentiert den Aufbau deines Second-Brain-Systems. Es ist im Thema Second Brain verortet und dem Subtopic Struktur des Vaults zugeordnet. Klassifizierung: grundlagen mit der Zielsetzung verstehen."
---

**Zusammenfassung**

> ip_atoms ist dein Wissensinventar. Hier liegen Module, die man lesen kann wie kleine Handbuchkapitel – und die zugleich so strukturiert sind, dass RAG und Wikis später zuverlässig damit arbeiten können.

**Dieses Modul beantwortet folgende Fragen:**
- Was ist ein Modul in deinem System?
- Welche Bestandteile machen ein Modul handbuchfähig und KI-tauglich?
- Welche Inhalte gehören nicht in ip_atoms?

## Module als „kleine Kapitel“

Ein Modul ist ein eigenständiges Wissenselement. Es behandelt ein Thema so, dass jemand es verstehen kann, ohne vorher zehn andere Notizen zu lesen. Gleichzeitig ist es nicht beliebig groß: Wenn ein Modul zu viele Themen vermischt, wird es unübersichtlich und schwer wiederzuverwenden.

## Was ein Modul handbuchfähig macht

Du schreibst Module grundsätzlich in Fließtext, so wie man ein Kapitel in einem Handbuch schreiben würde. Listen sind erlaubt – aber sie sollen den Text unterstützen, nicht ersetzen. Der Text führt Leserinnen und Leser, erklärt Begriffe im Kontext und nutzt Beispiele, um das Verständnis zu sichern.

## Was es KI-tauglich macht (ohne den Text zu zerstören)

Damit KI-Systeme später gut mit den Modulen arbeiten können, hat jedes Modul Metadaten (YAML) als „pure strings“, eine präzise Summary als Abstract und einen Context Anchor, der die Einordnung klar macht. Im Textkörper sorgen interne Links dafür, dass zentrale Begriffe verbunden sind.

## Was nicht in den Inhaltspool gehört

Unfertige Skizzen, Rohnotizen und Importreste gehören in die Inbox. Systemartefakte wie Templates oder Schemas gehören nach 00_system. Und Maps of Content gehören nach 10_expertise_map. Diese Abgrenzung hält den Inhaltspool sauber und verhindert, dass „alles irgendwie überall“ landet.

---

## 🔗 Verwandte Module
- **[Vault Ordnerstruktur Übersicht](#)**  
  Kontext: Einordnung des Inhaltspools in die Gesamtstruktur.
- **[99_inbox Transit-Zone](#)**  
  Kontext: Von der Inbox zum IP-Modul.

---

### Über den Autor
**[Patrick Roßkothen](https://www.wissen-und-werkzeug.de/ueber-mich/)** ist Experte für Prozess- und Wissensmanagement. Dieses Modul wurde zuletzt am 2026-02-19 aktualisiert.
