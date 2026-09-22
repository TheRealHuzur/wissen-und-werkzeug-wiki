---
id: bpmn_startereignisse
aliases:
  - bpmn_startereignisse
  - BPMN Startereignisse
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn
type: Article
status: ki_ready
created: 2026-02-16
updated: 2026-09-18
description: Startereignisse legen fest, wodurch ein Prozess ausgelöst wird. Die vier Typen des Basis-Level, ihre Regeln und die Modellierung mehrerer Auslöser.
image:
offer_heading: "Womit ein Prozess beginnt, bestimmt seinen Zuschnitt"
offer_text: "Der Auslöser legt fest, wo ein Prozess anfängt und was noch davor gehört. Der [Grundkurs BPMN](/grundkurs-bpmn/) zeigt, wie sich Prozessgrenzen bewusst setzen lassen, statt sich zu ergeben."
---

# BPMN: Startereignisse

## Zusammenfassung

Ein Startereignis sagt, wodurch ein Prozess ausgelöst wird. Es steht am Anfang des Modells, ist am dünnen Rand zu erkennen und hat keinen eingehenden, dafür genau einen ausgehenden Sequenzfluss. Für die fachliche Modellierung reichen vier Typen: das unbestimmte, das Nachrichten-, das zeitbasierte und das bedingte Startereignis.

## Wofür ein Startereignis steht

Jeder Prozess hat einen Auslöser. Nach dem Wissen und Werkzeug-Prinzip beginnt jeder Prozess deshalb mit mindestens einem Startereignis, und jeder Pfad im Modell hat einen sichtbaren Anfang.

Das Startereignis beschreibt den Impuls, der den Prozess in Gang setzt, nicht die erste Handlung. Genau hier passiert der häufigste Fehler: Richtig ist der Zustand „Antrag ist eingegangen“. Modelliert wird stattdessen die Tätigkeit „Antrag entgegennehmen“. Damit steht im Kreis eine [[BPMN Aufgaben und Teilprozesse|Aufgabe]], und der Auslöser des Prozesses fehlt im Modell.

Drei Regeln gelten für jedes Startereignis:

- **Kein Eingang, ein Ausgang:** Ein Startereignis hat keinen eingehenden und genau einen ausgehenden [[BPMN Der Sequenzfluss|Sequenzfluss]].
- **Keine Bearbeitungszeit:** Das Ereignis hält nur fest, dass etwas eingetreten ist. Was danach mit dem Eingang geschieht, modellierst du als Aufgabe.
- **Beschriftung als Zustand:** Die Beschriftung sagt, welcher Zustand eingetreten sein muss, damit der Prozess startet, zum Beispiel „Antrag ist eingegangen“ oder „Kunde ruft an“.

Welche Symbole für die fachliche Modellierung vorgesehen sind, legt die Modellierungskonvention von Wissen & Werkzeug fest. Sie steht auf der [Werkzeugseite](/werkzeuge/) zum Download bereit.

## Die vier Startereignisse des Basis-Level

Das Symbol im Kreis sagt, welcher Art der Auslöser ist. Die BPMN kennt dafür eine Fülle von Kombinationen, im Basis-Level sind es vier.

![[bpmn-startereignisse-uebersicht.png]]

### Unbestimmtes Startereignis

Der Kreis bleibt leer. Der Prozess startet, ohne dass die Art des Auslösers festgelegt wird. Welches Ereignis eingetreten sein muss, sagt allein die Beschriftung. Das ist der Normalfall, wenn der Auslöser weder eine eingehende Information noch ein Zeitpunkt noch eine Bedingung ist.

![[bpmn-startereignis-unbestimmt.png]]

### Nachrichten-Startereignis

Der Prozess startet mit dem Eingang einer Information. Das Briefsymbol ist dabei nicht wörtlich zu nehmen: Gemeint ist jede Form von Information, also auch ein Anruf, eine Mail oder ein Formular aus einem Fachverfahren.

![[bpmn-startereignis-nachricht.png]]

### Zeitbasiertes Startereignis

Der Prozess startet zu einem bestimmten Zeitpunkt. Das kann ein Datum sein, eine Uhrzeit oder ein wiederkehrender Termin wie „jeden Montag“.

![[bpmn-startereignis-zeit.png]]

### Bedingtes Startereignis

Der Prozess startet, sobald eine sachliche Bedingung erfüllt ist. Gemeint ist ein Wert, der eine festgelegte Grenze über- oder unterschreitet: Der Lagerbestand fällt unter drei Stück, also wird nachbestellt. Für ein Seminar liegen mehr als fünf Anmeldungen vor, also wird es bestätigt.

Häufig wird an dieser Stelle der Eingang einer Information als Bedingung formuliert, etwa „unter der Bedingung, dass ein Antrag eingegangen ist“. Das ist ein Nachrichten-Startereignis. Das bedingte Startereignis meint einen Zustand, den der Prozess an einem Wert ablesen kann.

![[bpmn-startereignis-bedingt.png]]

## Mehrere Startereignisse für einen Prozess

Ein Prozess kann auf verschiedene Arten ausgelöst werden. Dann modellierst du mehrere Startereignisse und führst die Stränge dort zusammen, wo der weitere Ablauf gleich ist.

![[bpmn-startereignisse-mehrere.png]]

Im Beispiel tritt der Kunde entweder telefonisch oder persönlich an die Verwaltung heran. Die ersten Schritte unterscheiden sich, ab der Identitätsprüfung ist der Unterschied für den Ablauf unerheblich. An dieser Stelle führt ein [[BPMN Das Exklusive Gateway (XOR)|exklusives Gateway]] die beiden Stränge zusammen.

Die Startereignisse müssen dabei nicht in derselben [[BPMN Pools und Schwimmbahnen|Schwimmbahn]] liegen. Wird ein Prozess an unterschiedlichen Stellen der Organisation ausgelöst, gehört jedes Startereignis in die Bahn, in der es tatsächlich eintritt.

Der Zuschnitt des Prozesses entscheidet sich an dieser Stelle mit. Je nachdem, welches Ereignis du als Auslöser setzt, gehört ein Arbeitsschritt noch in den Prozess oder eben nicht mehr.

## Häufige Fragen

### Welche Arten von Startereignissen gibt es in BPMN?

Für die fachliche Modellierung gibt es vier Startereignisse: das unbestimmte, das Nachrichten-, das zeitbasierte und das bedingte Startereignis. Sie unterscheiden sich allein am Symbol im Kreis, nicht am Rand. Die BPMN selbst kennt weitere Auslöser wie Signal oder Eskalation, die gehören aber in technisch ausführbare Modelle.

### Wie unterscheide ich das Startereignis von der ersten Aufgabe?

Das Startereignis beschreibt den Zustand, der den Prozess auslöst, die erste Aufgabe die erste Tätigkeit danach. „Antrag ist eingegangen“ ist das Ereignis, „Zuständigkeit prüfen“ die Aufgabe. Die Probe ist die Zeit: Ein Ereignis verbraucht keine, eine Aufgabe schon. Steckt in der Beschriftung eine Tätigkeit, gehört sie ins Rechteck.

### Darf ein Startereignis einen eingehenden Sequenzfluss haben?

Nein, ein Startereignis hat nie einen eingehenden Sequenzfluss und immer genau einen ausgehenden. Es ist der Anfang des Ablaufs, vor ihm liegt nichts im Modell. Zeigt ein Pfeil auf einen Kreis mit dünnem Rand, ist entweder der Fluss falsch gesetzt oder das Element sollte ein Zwischenereignis mit doppeltem Rand sein.

### Müssen alle Startereignisse eines Prozesses in derselben Schwimmbahn liegen?

Nein, Startereignisse dürfen in verschiedenen Schwimmbahnen liegen. Jedes gehört dorthin, wo der Auslöser tatsächlich eintritt. Genau das macht sichtbar, dass ein Prozess an mehreren Stellen der Organisation beginnen kann, und ist ein Argument dafür, die Auslöser einzeln zu modellieren statt sie zu einem zusammenzufassen.

## Verwandte Artikel

- **[[BPMN Ereignisse (Grundlagen & Konzept)]]**  
  Ordnet Start-, Zwischen- und Endereignis in ein gemeinsames Konzept ein und zeigt alle zehn Ereignisse des Basis-Level.
- **[[BPMN Zwischenereignisse]]**  
  Behandelt die vier empfangenden Zwischenereignisse und damit die Wartepunkte innerhalb des Prozesses.
- **[[BPMN Endereignisse]]**  
  Erklärt, wie ein Prozess abschließt und warum unterschiedliche Ergebnisse eigene Endereignisse bekommen.
- **[[BPMN Der Sequenzfluss]]**  
  Beschreibt die Verbindung, über die aus Ereignissen, Aufgaben und Gateways ein Ablauf wird.
