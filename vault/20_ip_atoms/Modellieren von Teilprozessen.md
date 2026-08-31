---
id: modellieren_von_teilprozessen
aliases:
  - modellieren_von_teilprozessen
  - Modellieren von Teilprozessen
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3:
type: Article
status: entwurf
created: 2026-02-16
updated:
description: Dieses Modul beschreibt die spezifischen Modellierungsregeln für Teilprozesse innerhalb einer Ereigniskette. Es fokussiert sich auf den "Happy Day", den optimalen Detailgrad und die korrekte Sequenzierung von Zwischenereignissen.
image:
offer_heading:
offer_text:
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement (Modellierung BPMN Teilprozesse).
Es ist im Thema Prozessmanagement verortet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# Modellieren von Teilprozessen

## Zusammenfassung

> Dieses Modul beschreibt die spezifischen Modellierungsregeln für Teilprozesse innerhalb einer Ereigniskette. Es fokussiert sich auf den "Happy Day", den optimalen Detailgrad und die korrekte Sequenzierung von Zwischenereignissen.

**Dieses Modul beantwortet folgende Fragen:**

- Nach welchen Grundsätzen werden Teilprozesse in Pools modelliert?
- Welchen Detailgrad sollte ein Teilprozessmodell haben?
- Wie sieht das Standard-Sequenzmuster für eine saubere Modellierung von Teilprozessen aus?

## Grundsätze der Modellierung

Teilprozesse werden innerhalb eines Pools in entsprechenden Schwimmbahnen (Lanes) abgebildet. Dabei gelten folgende Kernregeln:

- **Happy-Day-Szenario:** Prozesse sind primär so zu beschreiben, wie sie im Idealfall (ohne Störungen oder Sonderlocken) ablaufen.
    - *Hilfsfrage:* Wie läuft der Prozess, wenn alles wie geplant funktioniert?
- **Verzicht auf Verzweigungen:** Um die Komplexität auf dieser Ebene gering zu halten, sollte auf das Modellieren von Gateways und Verzweigungen so weit wie möglich verzichtet werden.

## Detailgrad und Schwimmbahnwechsel

Der Detailgrad eines Modells wird maßgeblich durch die Interaktion der Beteiligten bestimmt.

- **Regel:** Es ist darauf hinzuarbeiten, dass nach jedem abgeschlossenen Teilprozess ein Wechsel der Schwimmbahn erfolgt. Dies verdeutlicht die Übergabepunkte (Schnittstellen) zwischen Rollen oder Abteilungen.
- **Ausnahme:** Längere geplante, zeitliche Unterbrechungen innerhalb einer Verantwortlichkeit (z. B. "Anhörungsverfahren durchführen" oder "Stellungnahmen einholen") können als eigene Teilprozesse ohne Bahnwechsel modelliert werden.

## Modellierung von Zwischenereignissen (Sequenzmuster)

Jeder Teilprozess benötigt einen klaren Auslöser und führt zu einem definierten Ergebnis. Für eine konsistente Struktur ist folgendes Muster anzuwenden:

1. **Ergebnis:** Nur das Ergebnis des Teilprozesses wird explizit modelliert.
    - *Hilfsfrage:* Durch welches Ereignis wird dieser Schritt angestoßen?
2. **Abfolge:** Es entsteht eine Kette nach dem Schema:
    - `Start` → `Teilprozess` → `Zwischenergebnis` → `Teilprozess` → `Zwischenergebnis` [...] → `Ende`.

---

## 🔗 Verwandte Module

- **[[Die 3 Ebenen der Prozessmodellierung]]**  
  Kontext: Dieses Modul liefert die detaillierten Konventionen für die Anwendung auf Ebene 2 und 3.
- **[[BPMN Aufgaben und Teilprozesse]]**  
  Kontext: Grundlegende Definitionen von Aktivitäten und kollabierten Teilprozessen.
- **[[BPMN Pools und Schwimmbahnen]]**  
  Kontext: Basisregeln für die Strukturierung von Verantwortlichkeiten in BPMN.