---
id: bpmn_ereignisse_grundlagen_konzept
aliases:
  - bpmn_ereignisse_grundlagen_konzept
  - BPMN Ereignisse (Grundlagen & Konzept)
  - BPMN Ereignisse
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn
type: Article
status: ki_ready
created: 2026-02-16
updated: 2026-09-16
description: Ereignisse steuern den Fluss eines Prozesses in BPMN. Die drei Arten, die zehn Ereignisse des Basis-Level und die Regeln für ihre Beschriftung.
image:
offer_heading: "Ereignisse sind das Fundament, nicht das Beiwerk"
offer_text: "Start, Zwischenereignis und Ende folgen einem gemeinsamen Konzept, das sich leichter versteht als die einzelnen Symbole. Der [Grundkurs BPMN](/grundkurs-bpmn/) baut dieses Verständnis systematisch auf."
---

# BPMN: Ereignisse

## Zusammenfassung

Ereignisse steuern den Fluss eines Prozesses. Sie legen fest, wodurch er ausgelöst wird, worauf er wartet und womit er endet. Ein Ereignis beschreibt dabei immer einen Zustand, der eingetreten ist, nie eine Tätigkeit. Dargestellt wird es als Kreis, und die Art des Randes zeigt, um welche Art von Ereignis es sich handelt.

## Was ein Ereignis ist

Ein Ereignis ist etwas, das während eines Prozesses passiert. Es hat eine Ursache oder eine Wirkung und beeinflusst, wie es weitergeht. Der Unterschied zur [[BPMN Aufgaben und Teilprozesse|Aufgabe]] ist der entscheidende Punkt: Eine Aufgabe beschreibt Arbeit, die jemand erledigt, ein Ereignis beschreibt einen Zustand, der eintritt.

Daraus folgt die Grundregel: Ereignisse enthalten nie Bearbeitungszeit. Ein Nachrichtenereignis hält allein fest, dass eine Information eingegangen ist. Alles, was mit dieser Information anschließend geschieht, modellierst du als Aufgabe.

## Die drei Arten von Ereignissen

Um welche Art von Ereignis es sich handelt, erkennst du an seinem Rand.

![[bpmn-ereignisse-rand.png]]

| Art | Rand | Funktion |
| --- | --- | --- |
| Startereignis | dünn | löst den Prozess aus |
| Zwischenereignis | doppelt | hält den Prozess an, bis etwas eintritt |
| Endereignis | dick | schließt den Prozess oder einen Pfad ab |

Manche Werkzeuge färben Startereignisse grün und Endereignisse rot. Das ist Darstellung, keine Aussage: Maßgeblich ist allein der Rand.

## Die zehn Ereignisse des Basis-Level

Zusätzlich zum Rand kann ein Symbol im Kreis angeben, worum es sich handelt: ein Briefumschlag für eine Nachricht, eine Uhr für die Zeit, ein Blatt für eine Bedingung. Aus allen Kombinationen kennt die BPMN über 50 Ereignissymbole. Für die fachliche Modellierung brauchst du davon zehn. Sie bilden das Basis-Level der Modellierungskonvention von Wissen & Werkzeug.

![[bpmn-ereignisse-basis-level.png]]

| Ereignistyp | Startereignis | Zwischenereignis | Endereignis |
| --- | --- | --- | --- |
| Unbestimmt | ja | ja | ja |
| Nachricht | ja | ja | ja |
| Zeit | ja | ja | nein |
| Bedingt | ja | ja | nein |

Zwei Dinge fallen an dieser Übersicht auf.

Erstens sind die vier Zwischenereignisse ausschließlich empfangend, ihre Symbole sind also nicht ausgefüllt. Der Prozess wartet an dieser Stelle, er löst nichts aus. Ein Versand wird als Aufgabe modelliert oder als [[BPMN Endereignisse|Nachrichten-Endereignis]].

Zweitens gibt es kein zeitbasiertes Endereignis. Ein Zeitereignis kann der Prozess nie selbst herbeiführen, und am Ende steht immer ein Ergebnis, das er erzeugt hat.

## Was im Modell geschieht: die Marke

Die Dynamik von Ereignissen lässt sich an einer Marke nachvollziehen, die den Prozess durchläuft.

1. **Start:** Tritt das Startereignis ein, entsteht eine Marke.
2. **Zwischen:** Trifft die Marke auf ein Zwischenereignis, wartet sie dort, bis das Ereignis eintritt.
3. **Ende:** Trifft die Marke auf ein Endereignis, wird sie aufgebraucht und verlässt das Modell.

## Ereignisse richtig beschriften

Die Beschriftung sagt, welcher Zustand eingetreten ist oder eingetreten sein muss, damit der Prozess fortgesetzt werden kann. Sie steht deshalb in der Vollzugsform: „Antrag ist eingegangen“, „Frist ist verstrichen“, „Akte ist archiviert“.

Das ist der häufigste Fehler in der Praxis. In der Beschriftung steckt dann doch eine Handlung, etwa „Antrag entgegennehmen“, und aus dem Ereignis wird eine verkappte Aufgabe. Die Probe ist einfach: Lässt sich die Beschriftung mit „ist“ oder „hat“ zu einem Satz ergänzen, beschreibt sie einen Zustand. Braucht sie ein „wird gerade“, gehört sie in eine Aufgabe.

## Jeder Prozess beginnt und endet mit einem Ereignis

Nach dem Wissen und Werkzeug-Prinzip startet jeder Prozess mit mindestens einem Startereignis und endet mit mindestens einem Endereignis. Kein Pfad im Modell läuft ins Leere.

Mehrere Startereignisse sind zulässig, wenn ein Prozess auf verschiedene Arten ausgelöst wird. Sie werden modelliert und im weiteren Verlauf über ein Gateway zusammengeführt.

Mehrere Endereignisse sind nicht nur zulässig, sondern erwünscht, sobald ein Prozess tatsächlich unterschiedliche Ergebnisse hat. Die Ablehnung wegen Unzuständigkeit und der bewilligende Bescheid sind zwei Ergebnisse und gehören als zwei Endereignisse ins Modell, nicht in ein gemeinsames „Prozess beendet“.

## Häufige Fragen

### Wie beschrifte ich ein Ereignis in BPMN richtig?

Die Beschriftung eines Ereignisses benennt den Zustand, der eingetreten ist, zum Beispiel „Antrag ist eingegangen“ oder „Frist ist verstrichen“. Sie beschreibt nie eine Tätigkeit. Steckt in der Beschriftung eine Handlung, ist das Element in Wahrheit eine Aufgabe und gehört als Rechteck ins Modell, nicht als Kreis.

### Kann ein Prozess mehrere Start- und Endereignisse haben?

Ja, ein Prozess kann mehrere Start- und mehrere Endereignisse haben. Wird er auf verschiedene Arten ausgelöst, modellierst du mehrere Startereignisse und führst die Pfade über ein Gateway zusammen. Bei den Endereignissen ist Vielfalt sogar erwünscht: Jedes fachlich unterschiedliche Ergebnis bekommt sein eigenes Endereignis statt eines gemeinsamen Abschlusses.

### Woran erkenne ich, ob ein Kreis ein Start-, Zwischen- oder Endereignis ist?

Der Rand des Kreises entscheidet: dünn beim Startereignis, doppelt beim Zwischenereignis, dick beim Endereignis. Das Symbol im Inneren sagt dagegen nur, um welchen Typ es sich handelt, etwa Nachricht oder Zeit. Farben sind Sache des Werkzeugs und ohne fachliche Bedeutung.

### Wie viele Ereignissymbole brauche ich für ein fachliches Prozessmodell?

Zehn Ereignisse reichen für die fachliche Modellierung aus, obwohl die BPMN über 50 Symbole kennt. Es sind vier Startereignisse, vier Zwischenereignisse und zwei Endereignisse, jeweils in den Ausprägungen unbestimmt, Nachricht, Zeit und Bedingung. Alles darüber hinaus gehört in technisch ausführbare Modelle, nicht in ein fachliches.

## Verwandte Artikel

- **[[BPMN Startereignisse]]**  
  Zeigt die vier Auslöser im Detail und wie mehrere Startereignisse eines Prozesses zusammengeführt werden.
- **[[BPMN Zwischenereignisse]]**  
  Behandelt die vier empfangenden Zwischenereignisse und wie du damit Wartepunkte im Prozess darstellst.
- **[[BPMN Endereignisse]]**  
  Erklärt, wie ein Prozess abschließt und warum unterschiedliche Ergebnisse eigene Endereignisse bekommen.
- **[[BPMN Der Sequenzfluss]]**  
  Beschreibt die Verbindung, über die Ereignisse, Aufgaben und Gateways zu einem Ablauf werden.
