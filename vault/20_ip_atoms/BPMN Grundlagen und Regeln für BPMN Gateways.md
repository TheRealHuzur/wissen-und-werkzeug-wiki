---
id: bpmn-gateways-grundlagen-regeln
aliases:
  - bpmn_grundlagen_und_regeln_fur_bpmn_gateways
  - BPMN Grundlagen und Regeln für BPMN Gateways
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn
type: Article
status: ki_ready
created: 2025-12-15
updated:
description: Gateways fungieren in der BPMN als reine Logik-Knoten zur Steuerung des Prozessflusses durch Verzweigung (Split) und Zusammenführung (Join). Sie stellen keine Tätigkeiten dar und verbrauchen keine Zeit. Nach dem „Wissen und Werkzeug“-Prinzip müssen Gateways explizit modelliert werden, wobei ein Spli
image:
offer_heading: "Regeln kennen und Regeln anwenden sind zwei Dinge"
offer_text: "Die Regeln für Gateways sind schnell gelesen, im fertigen Modell tauchen sie trotzdem als Fehler wieder auf. Der [Grundkurs BPMN](/grundkurs-bpmn/) zeigt, woran das liegt und worauf es beim Verzweigen ankommt."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Grundlagen und Regeln für BPMN Gateways

## Zusammenfassung

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

- **[BPMN: Das Exklusive Gateway (XOR)](/wiki/bpmn-das-exklusive-gateway-xor/)** – Vertiefung zur Entweder/Oder-Entscheidung (wird im Text als Standard-Verzweigung referenziert).
- **[[Das Parallele Gateway (AND)]]** – Für gleichzeitige Pfade (eines der 4 Basis-Gateways).
- **[[Das Inklusive Gateway (OR)]]** – Die komplexe "Und/Oder"-Variante (eines der 4 Basis-Gateways).
- **[[Das Ereignisbasierte Gateway]]** – Die erwähnte Ausnahme für ereignisgesteuerte Pfade.

**Übergeordnete Konzepte:**

- **[[Datenobjekte & Informationsfluss]]** – Relevant, wenn Entscheidungen auf Daten basieren (Input/Output).