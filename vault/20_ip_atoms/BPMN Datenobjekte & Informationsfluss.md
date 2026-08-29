---
id: bpmn_datenobjekte_informationsfluss
aliases:
  - bpmn_datenobjekte_informationsfluss
  - BPMN Datenobjekte & Informationsfluss
parent_topic: prozessmanagement
subtopic: bpmn
type: framework
intent: verstehen
status: ki_ready
created: 2025-12-15
summary: "Datenobjekte und Datenspeicher visualisieren den Informationsfluss innerhalb eines Prozesses, indem sie Transportmedien (z. B. Dokumente) und persistente Ablagen (z. B. Datenbanken) darstellen. Die Verbindung erfolgt über Datenassoziationen, wobei die Pfeilrichtung zwischen Input (Lesen) und Output "
offer_heading: "Wenn das Modell auch die Unterlagen erklären soll"
offer_text: "Datenobjekte zeigen, was ein Prozess braucht und was er hinterlässt, ohne den Ablauf zu überfrachten. Der [Grundkurs BPMN](/grundkurs-bpmn/) ordnet ein, wann sich der Aufwand lohnt und wann er ein Modell nur voller macht."
---


%%
RAG-CONTEXT-ANCHOR:
Dieses Modul dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Bpmn zugeordnet.
Klassifizierung: framework mit der Zielsetzung verstehen.
%%

# BPMN: Datenobjekte & Informationsfluss

## Zusammenfassung

> Datenobjekte und Datenspeicher visualisieren den Informationsfluss innerhalb eines Prozesses, indem sie Transportmedien (z. B. Dokumente) und persistente Ablagen (z. B. Datenbanken) darstellen. Die Verbindung erfolgt über Datenassoziationen, wobei die Pfeilrichtung zwischen Input (Lesen) und Output (Schreiben) unterscheidet. Zur Präzisierung können Zustände in eckigen Klammern ergänzt werden; der Informationsaustausch über Poolgrenzen hinweg erfolgt jedoch ausschließlich über den Nachrichtenfluss.
> 

## Grundlagen

In der BPMN werden Informationen durch zwei primäre Objekte dargestellt:

1. **Datenobjekt:** Symbolisiert das Transportmedium der Information (z. B. ein Papierdokument, eine Datei, ein Telefonat). Es repräsentiert die Information selbst, unabhängig von ihrer physischen Form.
2. **Datenspeicher:** Symbolisiert den Ort, an dem Daten persistent abgelegt werden (z. B. Datenbank, Aktenschrank).

## Modellierung mit Datenobjekten

Datenobjekte machen sichtbar, welche Informationen ein Prozess benötigt oder erzeugt.

- **Datenassoziation:** Eine gepunktete Linie mit Pfeil verbindet die Aktivität mit dem Datenobjekt.
    - Pfeil zur Aktivität = **Input** (lesen).
    - Pfeil zum Objekt = **Output** (schreiben/erzeugen).
- **Zustand:** Der Bearbeitungsstatus eines Objekts kann in eckigen Klammern direkt am Namen notiert werden (z. B. `Rechnung [geprüft]`).

### Darstellungsvarianten

- **Kompakt:** Ein einzelnes Datenobjekt-Symbol hat sowohl eingehende als auch ausgehende Pfeile. Dies spart Platz, kann aber unübersichtlich werden.
- **Sequenziell:** Wird eine Information zu einem späteren Zeitpunkt im Prozess erneut benötigt, wird das Datenobjekt zur besseren Lesbarkeit ein zweites Mal eingezeichnet.
- **Mit Ereignissen:** Datenobjekte können mit Nachrichtenereignissen gekoppelt werden (z. B. beim Eingang einer Bewerbung), was oft für die Automatisierung in BPM-Software relevant ist.

## Grenzen der Darstellung

Datenobjekte und Assoziationen visualisieren den Informationsfluss ausschließlich **innerhalb** eines Pools (eines einzigen Prozesses). Sobald Informationen über Prozessgrenzen hinweg (zwischen verschiedenen Pools/Teilnehmern) ausgetauscht werden, muss zwingend der **Nachrichtenfluss** (gestrichelte Linie) verwendet werden.