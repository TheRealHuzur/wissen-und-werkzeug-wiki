---
title: "First Pass Yield (fpy)"
description: "Definition und Berechnung des First Pass Yield (FPY) als Qualitätskennzahl. Sie misst den Anteil der Prozessdurchläufe (Fälle), die im ersten Durchlauf ohne Nacharbeit fehlerfrei abgeschlossen werden, und deckt somit versteckte Ineffizienzen (\\\"Hidden Factory\\\") auf."
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement.
Es ist im Thema Prozessmanagement verortet und dem Subtopic Controlling zugeordnet.
Klassifizierung: framework mit der Zielsetzung steuern.
%%

# Kennzahl: First Pass Yield (FPY)

Thema-Kontext: Steuerung von Prozessen anhand von Kennzahlen.

## Zusammenfassung

Definition und Berechnung des First Pass Yield (FPY) als Qualitätskennzahl. Sie misst den Anteil der Prozessdurchläufe (Fälle), die im ersten Durchlauf ohne Nacharbeit fehlerfrei abgeschlossen werden, und deckt somit versteckte Ineffizienzen ("Hidden Factory") auf.

Der First Pass Yield (FPY) ist eine harte Qualitätskennzahl, die besonders in arbeitsteiligen Prozessen Schwachstellen aufdeckt, die von reinen Output-Kennzahlen oft übersehen werden.

### Definition

Unter FPY wird der Prozentsatz an Bearbeitungsobjekten verstanden, deren Ergebnisse bereits im ersten Prozessdurchlauf fehlerfrei sind und **keine Nacharbeit** erfordern.

Die Qualität eines Zwischenergebnisses bemisst sich also daran, ob das Ergebnis:

1. Sofort weiterverarbeitet werden kann.
2. Richtig weiterverarbeitet wird.

### Warum FPY messen?

Ein fehlerhaftes Zwischenergebnis hat zwei negative Konsequenzen:

- **Sichtbare Nacharbeit:** Es führt zu Rückfragen und Schleifen (Mehrarbeit/Zeitverlust).
- **Versteckte Fehler:** Das fehlerhafte Zwischenergebnis wird nicht erkannt, weiterverarbeitet und beschädigt die Qualität des Endergebnisses massiv.

### Berechnung

Die Formel zur Berechnung des FPY lautet:

$$FPY (\%) = \frac{\text{Anzahl abgeschlossener Objekte ohne Nacharbeit}}{\text{Anzahl aller abgeschlossenen Objekte}} \times 100$$

### Logik im Prozessmodell

In einem Prozessmodell lässt sich der FPY an Übergabepunkten prüfen. Es entspricht logisch einem **Exklusiven Gateway (XOR)**, das prüft: "Ergebnis ohne Nacharbeit?".

- **Ja:** Prozess läuft weiter (FPY = 1 bzw. 100% für diesen Fall).
- **Nein:** Rückschleife/Nacharbeit (FPY = 0 für diesen Fall).
    
    ![First Pass Yield.png](/wiki/wiki-assets/FPY.png)
    

> 🖼 GRAFIK: FPY-LogikdiagrammKI-Beschreibung: Ein Flussdiagramm, das zwei Teilprozesse zeigt. Dazwischen befindet sich ein Prüfpunkt (Gateway). Ein Pfad "Ja" (Ohne Nacharbeit) führt weiter (FPY=1), ein Pfad "Nein" führt zur Seite (FPY=0).
> 

---

## 🔗 Verwandte Module

- **[BPMN Das Exklusive Gateway (XOR)](/wiki/fach-expertise/bpmn_das_exklusive_gateway_xor/)
- ***Kontext:* Das BPMN-Element, mit dem die Entscheidungslogik (Fehlerfrei: Ja/Nein) im Prozessdiagramm modelliert wird.
- **[Prozesskennzahlen (KPIs) Die 5 Dimensionen](#)
- ***Kontext:* Einordnung des FPY in die Dimension der "Prozessqualität".
- **[BPMN Aufgaben und Teilprozesse](/wiki/fach-expertise/bpmn_aufgaben_und_teilprozesse/)
- ***Kontext:* FPY wird oft zwischen zwei Teilprozessen gemessen.