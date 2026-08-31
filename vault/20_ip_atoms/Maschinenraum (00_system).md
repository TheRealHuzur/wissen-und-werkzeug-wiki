---
id: 00_system_maschinenraum
aliases:
  - 00_system_maschinenraum
ebene_1: wissensmanagement
ebene_2: second-brain
ebene_3: system-architektur
type: Article
status: ki_ready
created: 2026-02-16
updated:
description: Dieses Modul beschreibt 00_system als technischen Maschinenraum des Vaults. Es erklärt, welche Artefakte dort liegen (Taxonomie, Bases, Templates, Schemas, Anhänge, Skripte) und welche Regeln gelten, damit Validierung, Automatisierung und Link-Stabilität im GitHub-Astro-Flow zuverlässig bleiben.
image:
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert den Aufbau deines Second-Brain-Systems.
Es ist im Thema Second Brain verortet und dem Subtopic Struktur des Vaults zugeordnet.
Klassifizierung: grundlagen mit der Zielsetzung verstehen.
%%

# Maschinenraum (00_system)

**Zusammenfassung**

> 00_system enthält alles, was den Vault stabil, prüfbar und automatisierbar macht. Man kann sich das wie den Maschinenraum eines Schiffes vorstellen: Er sorgt für Betriebssicherheit, ist aber nicht der Ort, an dem die eigentlichen Inhalte „leben“.

**Dieses Modul beantwortet folgende Fragen:**
- Was liegt in 00_system – und warum?
- Welche Unterordner gibt es und was ist ihre Aufgabe?
- Welche Regeln verhindern, dass der Maschinenraum zum Ablageort für Inhalte wird?

## Warum ein separater Maschinenraum?

Sobald du Inhalte publizierst oder maschinell auswertest (RAG), braucht dein System eine klare Trennung: Inhalte sollen sich verändern und wachsen dürfen. Systemlogik hingegen muss stabil bleiben. 00_system ist genau dieser stabile Bereich. Hier legst du fest, welche Klassifikationen erlaubt sind, wie Vorlagen aussehen und wie du Qualität überprüfst.

## Was gehört in die Unterordner?

### taxonomy
Taxonomy ist die Ontologie deines Systems. Hier definierst du verbindlich, welche Werte zum Beispiel für types und intent erlaubt sind – inklusive kurzer Erklärungen. Das ist das Mittel gegen Wildwuchs.
[[Taxonomie Types Definitionen]]
[[Taxonomie Intents Definitionen]]
### database_views
Database_views enthält deine Obsidian Bases (.base). Sie sind dein Kontrollpanel: Qualität prüfen, Sichten bauen, Inkonsistenzen finden. Typisch ist zum Beispiel ein quality_monitor, der Pflichtfelder sichtbar macht.
[[Quality Monitor Base Spezifikation]]
### templates
templates enthält Vorlagen für Notizen, insbesondere für IP-Module. Damit entstehen neue Inhalte konsistent, ohne dass du jedes Mal über Aufbau nachdenken musst.
### metadata_schemas
metadata_schemas enthält Validierungsregeln, die du später in CI/CD nutzen kannst. Der Punkt ist einfach: Wenn jemand (oder du selbst) etwas falsch einträgt, soll das System es früh melden – nicht erst im Astro-Build.
### attachments
attachments ist der zentrale Ort für Medien. Dadurch vermeidest du, dass Bilder und PDFs quer durch den Vault verstreut sind und später schwer zu migrieren oder zu publizieren sind.
### scripts
scripts enthält Hilfsskripte, die wiederkehrende Aufgaben automatisieren. Beispiele sind Sanitizing von Titeln, Audit-Reports oder Link-Checks.

## Regel: 00_system ist kein Inhaltsordner

Wenn ein Dokument primär Wissen enthält, gehört es nicht nach 00_system. Dort liegen nur Betriebsmittel. Diese eine Regel verhindert langfristig, dass die Struktur verwischt.

---

## 🔗 Verwandte Module
- **[[Vault Ordnerstruktur Übersicht]]**  
  Kontext: Einordnung von 00_system in die Gesamtstruktur.
- [[Taxonomie Types Definitionen]]
  Kontext: Definition von types.
- [[Taxonomie Intents Definitionen]]
  Kontext: Definition von intents.
