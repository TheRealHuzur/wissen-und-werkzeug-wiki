---
id: 20_ip_atoms_inhaltspool
aliases:
  - 20_ip_atoms_inhaltspool
parent_topic: second_brain
subtopic: system_architektur
type: grundlagen
intent: verstehen
status: ki_ready
created: 2026-02-16
summary: Dieses Modul beschreibt ip_atoms als den zentralen Wissensbestand deines Systems. Es erklärt, was ein Modul ist, wie es für Menschen gut lesbar bleibt und gleichzeitig maschinenlesbar wird (YAML, Summary, Context Anchor, Links). Außerdem grenzt es ab, welche Inhalte nicht in den Inhaltspool gehören.
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert den Aufbau deines Second-Brain-Systems.
Es ist im Thema Second Brain verortet und dem Subtopic Struktur des Vaults zugeordnet.
Klassifizierung: grundlagen mit der Zielsetzung verstehen.
%%

# Inhaltspool (ip_atoms)

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
- **[[Vault Ordnerstruktur Übersicht]]**  
  Kontext: Einordnung des Inhaltspools in die Gesamtstruktur.
- **[[99_inbox Transit-Zone]]**  
  Kontext: Von der Inbox zum IP-Modul.
