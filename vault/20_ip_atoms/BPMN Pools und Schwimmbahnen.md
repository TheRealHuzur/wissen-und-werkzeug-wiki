---
id: bpmn_pools_und_schwimmbahnen
aliases:
  - bpmn_pools_und_schwimmbahnen
  - BPMN Pools und Schwimmbahnen
parent_topic: prozessmanagement
subtopic: bpmn
type: framework
intent: verstehen
status: ki_ready
created: 2026-02-16
summary: Dieses Modul erläutert das Konzept von Pools und Schwimmbahnen (Lanes) in der BPMN. Es beschreibt, wie Verantwortlichkeiten (WER macht WAS) visualisiert werden, wie hierarchische Strukturen abgebildet werden und welche Granularität für verschiedene Zielgruppen (Entscheider vs. Umsetzung) geeignet...
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Pools und Schwimmbahnen

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

- **[[BPMN Kollaboration & Externe Beteiligte]]***Kontext:* Beschreibt, wie Prozesse mit externen Partnern (außerhalb des eigenen Pools) interagieren.
- **[[20_ip_atoms/Kompetenzprofil ProzessmanagerIn]]***Kontext:* Relevante Rolle für die Definition der Zuständigkeiten im Modell.