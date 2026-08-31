---
id: 10_expertise_map_moc_struktur
aliases:
  - 10_expertise_map_moc_struktur
ebene_1: wissensmanagement
ebene_2: second-brain
ebene_3: system-architektur
type: Article
status: ki_ready
created: 2026-02-16
updated:
description: Dieses Modul erklärt die Map of Content als Navigationsschicht deines Vaults. MOCs sind Übersichtsseiten, die Leserinnen und Leser durch Themen führen, ohne Inhalte zu duplizieren. Dadurch entsteht eine stabile Wiki-Struktur und eine klare Orientierung für den menschlichen Einstieg.
image:
offer_heading:
offer_text:
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul  dokumentiert den Aufbau deines Second-Brain-Systems.
Es ist im Thema Second Brain verortet und dem Subtopic Struktur des Vaults zugeordnet.
Klassifizierung: grundlagen mit der Zielsetzung verstehen.
%%

# Map of Content Struktur (expertise_map)

**Zusammenfassung**

> Maps of Content sind die Landkarte deines Wissens. Sie geben Orientierung, führen durch Themen und verlinken auf die eigentlichen Inhalte. Damit bleibt das System lesbar, ohne dass du Inhalte doppelt pflegen musst.

**Dieses Modul beantwortet folgende Fragen:**
- Was ist ein MOC in deinem System – und was nicht?
- Warum gilt „Container statt Inhalt“?
- Wie hilft diese Struktur für Astro-Wiki-Navigation und für RAG?

## Maps of Content als Einstiegspunkte

Ein MOC (Map of Content) ist eine Seite, die man gerne als erstes öffnet, wenn man sich in einem Thema orientieren will. Ein guter MOC hat deshalb zwei Aufgaben: Er benennt das Thema verständlich und zeigt die nächsten sinnvollen Schritte, also Unterthemen und zentrale Module.

## Container statt Inhalt

Der entscheidende Gedanke ist: Inhalte werden nicht im MOC „abgelegt“, sondern als Modul. Der MOC verweist darauf. So entsteht keine Doppelpflege. Wenn du später etwas aktualisierst, musst du es an einer Stelle tun – und alle MOCs profitieren automatisch davon.

## Wie das mit deinem Zwei-Ebenen-Modell zusammenspielt

Du gliederst über parent_topic und subtopic. In der Expertise Map spiegelst du diese Ordnung als Lesepfad: Vom Einstieg ins Thema (parent_topic) gehst du zu einem konkreten Unterthema (subtopic) und von dort zu den Modulen.

Diese Trennung ist auch fürs Wiki hilfreich: Aus MOCs lässt sich Navigation generieren, während Module den Inhalt liefern.

---

## 🔗 Verwandte Module
- **[[Vault Ordnerstruktur Übersicht]]**  
  Kontext: Rolle der Expertise Map im Gesamtsystem.
- **[[20_ip_atoms Inhaltspool]]**  
  Kontext: IP-Module sind die Inhalte, auf die MOCs zeigen.
