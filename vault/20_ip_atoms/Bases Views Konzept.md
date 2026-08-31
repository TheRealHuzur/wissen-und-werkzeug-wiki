---
id: bases_views_konzept
aliases:
  - bases_views_konzept
ebene_1: wissensmanagement
ebene_2: second-brain
ebene_3: system-architektur
type: Article
status: entwurf
created: 2026-02-16
updated:
description: Dieses Modul beschreibt das Konzept, wie du Obsidian Bases als Kontroll- und Navigationsinstrument nutzt. Es erklärt, warum Bases in deinem System fehlende Dropdown-Zwänge kompensieren, wie Views wie quality_monitor, bpmn_view und system_audit zusammenhängen und wie du damit Inhalte schnell prüfst, filterst und kuratierst.
image:
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert die Nutzung von Bases als Qualitäts- und Navigationswerkzeug im Second-Brain-System.
Es ist im Thema Second Brain verortet und dem Subtopic Tooling: Obsidian-Konfiguration zugeordnet.
Klassifizierung: grundlagen mit der Zielsetzung verstehen.
%%

# Bases Views Konzept

**Zusammenfassung**

> Bases sind dein „Datenbankblick“ auf Markdown. Sie machen Metadaten sichtbar, filterbar und prüfbar. In deinem System sind Bases ein zentraler Ersatz für fehlende UI-Zwänge: Qualität entsteht nicht durch Dropdowns, sondern durch konsequente Sichtbarkeit und Kontrolle.

## Warum Bases in deinem System so wichtig sind

Du arbeitest mit YAML-Properties als maschinenlesbarer Schicht. Das bringt nur dann Nutzen, wenn du diese Properties auch praktisch verwenden kannst: zum Filtern, Prüfen und Steuern.

Bases sind dafür ideal, weil sie:
- Pflichtfelder sichtbar machen
- Filter als „Quality Gates“ nutzen können
- systemische Muster (Drift, Dubletten) aufdecken

## Drei View-Typen, die du unterscheidest

### 1) Quality Monitor (operativ)
Der Quality Monitor ist die tägliche/regelmäßige Arbeitsansicht. Er zeigt dir, welche Module unvollständig sind und wo du nacharbeiten musst.

Ziel: schnell sehen, was noch nicht DoD-konform ist.

### 2) Themen-View (z. B. BPMN View)
Eine Themen-View ist keine Qualitätsprüfung, sondern Navigation und kuratierter Überblick. Sie nutzt dieselben Metadaten, aber für Orientierung: Welche Module gehören zu BPMN, welche sind KI Ready, welche sind Grundlagen vs Anleitung?

Ziel: Inhalte thematisch „wie ein Wiki“ sichtbar machen, ohne dass du Maps of Content dafür überladen musst.

### 3) System Audit (Governance)
Der System Audit ist eine periodische Prüfung. Er zeigt Drift, Dublettenrisiken und Regelverstöße, die man im Alltag leicht übersieht.

Ziel: das System als Ganzes stabil halten.

## Wie die Views zusammenarbeiten

- Du schreibst Inhalte → Quality Monitor zeigt Lücken.
- Du kuratierst ein Thema → Themen-Views helfen beim Überblick.
- Du willst langfristige Stabilität → System Audit deckt strukturelle Risiken auf.

Damit trennst du „Arbeit am Inhalt“ von „Arbeit am System“ – und genau das verhindert Chaos.

---

## 🔗 Verwandte Module
- **[[Quality Monitor Base Spezifikation]]**  
  Kontext: Welche Spalten/Filter du im Quality Monitor brauchst.
- **[[System Audit Base Spezifikation]]**  
  Kontext: Welche systemischen Prüfungen du regelmäßig durchführst.
- **[[10_expertise_map MOC-Struktur]]**  
  Kontext: MOCs bleiben Navigation, Bases ergänzen sie als Sicht.
