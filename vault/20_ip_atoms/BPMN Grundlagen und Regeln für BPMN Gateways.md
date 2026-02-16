---
id: bpmn_grundlagen_und_regeln_fur_bpmn_gateways
aliases:
  - bpmn_grundlagen_und_regeln_fur_bpmn_gateways
  - BPMN Grundlagen und Regeln für BPMN Gateways

area: fach_expertise
parent_topic: prozessmanagement
subtopic: bpmn
type: framework
intent: verstehen
status: ki_ready
created: 2025-12-15
summary: "Gateways fungieren in der BPMN als reine Logik-Knoten zur Steuerung des Prozessflusses durch Verzweigung (Split) und Zusammenführung (Join). Sie stellen keine Tätigkeiten dar und verbrauchen keine Zeit. Nach dem „Wissen und Werkzeug“-Prinzip müssen Gateways explizit modelliert werden, wobei ein Spli"
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Grundlagen und Regeln für BPMN Gateways

Thema-Kontext: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen mittels Symbolen wie Gateways, Events und Aktivitäten.
## **Zusammenfassung**

> Gateways fungieren in der BPMN als reine Logik-Knoten zur Steuerung des Prozessflusses durch Verzweigung (Split) und Zusammenführung (Join). Sie stellen keine Tätigkeiten dar und verbrauchen keine Zeit. Nach dem „Wissen und Werkzeug“-Prinzip müssen Gateways explizit modelliert werden, wobei ein Split genau einen Eingang und ein Join genau einen Ausgang besitzt.
> 

## Definition und Zweck

Bei Gateways handelt es sich um Elemente zur Steuerung des Prozessflusses durch Verzweigungen und Zusammenführungen. Obwohl die offizielle Spezifikation viele Darstellungsmöglichkeiten zulässt, sollten strikte Regeln eingehalten werden, um die Modelle für Dritte intuitiv verständlich zu machen.

**Wichtiges Merkmal:**
Gateways stellen niemals Tätigkeiten dar. Beim Durchlaufen eines Gateways vergeht keine Bearbeitungszeit; es ist ein reiner Logik-Punkt.

## Grundregeln für die Modellierung

Das Basis-Level der BPMN unterscheidet drei Haupt-Gateways. Nach dem "Wissen und Werkzeug"-Prinzip gelten folgende Standards:

- **Struktur:** Verzweigungen und Zusammenführungen werden grundsätzlich explizit mit Gateways modelliert.
- **Sequenzflüsse:** Gateways sind die einzigen Flussobjekte, die mehr als einen eingehenden oder ausgehenden Sequenzfluss besitzen dürfen.
- **Symbolik:** Für Verzweigung und Zusammenführung wird jeweils das gleiche Symbol verwendet (mit Ausnahme des ereignisbasierten Gateways).

### Die Grundregel der Anschlüsse

Um die Leserichtung und Logik klarzuhalten, gilt:

1. **Verzweigungen (Split):** Ein Split hat immer **einen** eingehenden und **mehrere** ausgehende Sequenzflüsse.
2. **Zusammenführungen (Join):** Ein Join hat immer **mehrere** eingehende und **einen** ausgehenden Sequenzfluss.

---

## 🔗 Weiterführende Module (Kontext)

**Spezifische Gateway-Typen:**

- **[BPMN: Das Exklusive Gateway (XOR)](BPMN%20Das%20Exklusive%20Gateway%20(XOR)%202c8d537992c580078becda90ded5cb0c.md)**  – Vertiefung zur Entweder/Oder-Entscheidung (wird im Text als Standard-Verzweigung referenziert).
- **[[Das Parallele Gateway (AND)]]** – Für gleichzeitige Pfade (eines der 4 Basis-Gateways).
- **[[Das Inklusive Gateway (OR)]]** – Die komplexe "Und/Oder"-Variante (eines der 4 Basis-Gateways).
- **[[Das Ereignisbasierte Gateway]]** – Die erwähnte Ausnahme für ereignisgesteuerte Pfade.

**Übergeordnete Konzepte:**

- **[[Datenobjekte & Informationsfluss]]** – Relevant, wenn Entscheidungen auf Daten basieren (Input/Output).