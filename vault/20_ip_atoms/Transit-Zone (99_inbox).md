---
id: 99_inbox_transit_zone
aliases:
  - 99_inbox_transit_zone
parent_topic: second_brain
subtopic: system_architektur
type: grundlagen
intent: umsetzen
status: ki_ready
created: 2026-02-16
summary: Dieses Modul beschreibt 99_inbox als Transit-Zone für neue Entwürfe und Rohmaterial. Es erklärt, warum die Inbox wichtig ist, welche Minimalregeln verhindern, dass Inhalte verloren gehen, und wie du Notizen Schritt für Schritt in saubere Module im Inhaltspool überführst.
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul  dokumentiert den Aufbau deines Second-Brain-Systems.
Es ist im Thema Second Brain verortet und dem Subtopic Struktur des Vaults zugeordnet.
Klassifizierung: grundlagen mit der Zielsetzung umsetzen.
%%

# Transit-Zone (99_inbox)

**Zusammenfassung**

> Die Inbox ist dein Sicherheitsnetz. Sie erlaubt dir, Dinge schnell festzuhalten, ohne sofort Struktur herstellen zu müssen. Gleichzeitig verhindert sie, dass Unfertiges den Wissensbestand verwässert.

**Dieses Modul beantwortet folgende Fragen:**
- Was gehört in die Inbox – und warum?
- Welche Minimalregeln machen Inbox-Notizen später verwertbar?
- Wie wird aus einer Inbox-Notiz ein „KI-Ready“ Modul?

## Warum du eine Inbox brauchst

Wenn man versucht, jede Idee sofort perfekt einzuordnen, schreibt man am Ende weniger – oder man erzeugt Stress. Die Inbox nimmt diesen Druck raus. Du kannst sammeln, ohne die Systemlogik zu verletzen. Das funktioniert aber nur, wenn es später einen verlässlichen Kurationspfad gibt.

## Was typischerweise in der Inbox landet

In der Praxis sind das Rohnotizen aus Gesprächen, Fragmente, Linksammlungen, offene Fragen oder Importreste aus Migrationen. Entscheidend ist nicht, dass es schon „schön“ ist, sondern dass es überhaupt erfasst ist.

## Minimalregeln (damit du später nicht rätselst)

Eine Inbox-Notiz braucht keinen YAML-Header. Sie braucht aber zwei Dinge: einen sinnvollen Arbeitstitel und mindestens einen Satz oder ein paar Stichpunkte, warum das relevant ist. Das reicht, um später weiterzuarbeiten, ohne dass du dich wieder komplett hineinfinden musst.

## Der Weg in den Inhaltspool

Wenn du kuratierst, gehst du in einer einfachen Reihenfolge vor: erst entscheiden, ob es überhaupt ein dauerhaftes Modul werden soll, dann einordnen (parent_topic, subtopic) und erst danach sauber ausformulieren. Zum Schluss prüfst du über den quality_monitor, ob Pflichtfelder und Mindestqualität erfüllt sind, bevor du den Status auf ki_ready setzt.

---

## 🔗 Verwandte Module
- **[[20_ip_atoms Inhaltspool]]**  
  Kontext: Zielzustand für ausgearbeitete Inhalte.
