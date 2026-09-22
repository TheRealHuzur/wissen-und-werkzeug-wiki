---
id: bpmn_zwischenereignisse
aliases:
  - bpmn_zwischenereignisse
  - BPMN Zwischenereignisse
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn
type: Article
status: ki_ready
created: 2026-02-16
updated: 2026-09-11
description: Zwischenereignisse in BPMN zeigen, dass ein Prozess auf ein Ereignis wartet. Die vier empfangenden Typen mit Beispielen, Regeln und typischem Fehler.
image:
offer_heading: "Vom Nachschlagen zum Verstehen"
offer_text: "Welches Zwischenereignis das richtige ist, entscheidet sich selten am Symbol, sondern am Prozess dahinter. Der [Grundkurs BPMN](/grundkurs-bpmn/) ordnet die Ereignistypen so ein, dass du sie im Zusammenhang siehst statt einzeln."
---

# BPMN: Zwischenereignisse

## Zusammenfassung

Ein Zwischenereignis modellierst du, wenn dein Prozess auf etwas warten muss und erst weitergehen kann, sobald dieses Ereignis eintritt. Es steht zwischen zwei Aufgaben im Prozessfluss und hat einen doppelten Rand. Für die fachliche Modellierung reichen vier empfangende Typen: das unbestimmte Zwischenereignis sowie das Nachrichten-, Zeit- und Bedingungs-Zwischenereignis.

## Wann du ein Zwischenereignis modellierst

Ein Zwischenereignis wird modelliert, wenn der Prozess auf ein Ereignis wartet, das er selbst nicht herbeiführen kann. Eine Aufgabe ist erledigt, und bevor die nächste beginnen kann, muss dieses Ereignis eintreten: Eine Antwort geht ein, eine Frist läuft ab, eine Bedingung ist erfüllt. Erst dann wird der Prozess fortgesetzt.

Du erkennst Zwischenereignisse am doppelten Rand. Startereignisse haben einen dünnen Rand, Endereignisse einen dicken. Für Zwischenereignisse gelten drei Regeln:

- **Ein Eingang, ein Ausgang:** Ein Zwischenereignis hat immer genau einen eingehenden und genau einen ausgehenden [[BPMN Der Sequenzfluss|Sequenzfluss]].
- **Keine Bearbeitungszeit:** Ein Ereignis beschreibt nur den Moment, in dem etwas eintritt. Alles, was danach bearbeitet wird, modellierst du als Aufgabe.
- **Beschriftung als Zustand:** Die Beschriftung sagt, was eingetreten sein muss, damit es weitergeht, zum Beispiel „Angebot geht ein“ oder „Seminar ist ausgebucht“.

:::note[Hinweis]
Ein Zwischenereignis wartet auf etwas, das noch kommt. Ist das Ereignis schon eingetreten, bevor der Prozess an dieser Stelle ankommt, bemerkt er es nicht. In der fachlichen Modellierung spielt das selten eine Rolle, in der technischen Ausführung schon.
:::

## Die vier empfangenden Zwischenereignisse

Die BPMN kennt über 50 Ereignissymbole, darunter auch sendende Zwischenereignisse. Für die fachliche Modellierung reicht ein kleiner Ausschnitt: Im Basis-Level der Modellierungskonvention von Wissen & Werkzeug werden ausschließlich empfangende Zwischenereignisse modelliert. Ihre Symbole sind nicht ausgefüllt.

![[bpmn-zwischenereignisse-uebersicht.png]]

### Unbestimmtes Zwischenereignis

Das unbestimmte Zwischenereignis trägt kein Symbol und lässt sich deshalb immer verwenden. Es hält fest, dass ein bestimmter Zustand erreicht sein muss, ohne die Art des Ereignisses näher zu bestimmen. Was genau eingetreten ist, steht in der Beschriftung. Die drei folgenden Typen sind Präzisierungen: Du greifst zu ihnen, wenn du im Modell zeigen willst, ob der Prozess auf eine Nachricht, einen Zeitpunkt oder eine Bedingung wartet.

![[bpmn-zwischenereignis-unbestimmt.png]]

### Nachrichten-Zwischenereignis

Das Nachrichten-Zwischenereignis zeigt, dass der Prozess auf eine Nachricht wartet. Gemeint ist jede Art von Information, nicht nur ein Brief: eine E-Mail, ein Anruf, ein eingereichtes Formular. Erst wenn sie eingeht, geht der Prozess weiter.

![[bpmn-zwischenereignis-nachricht.png]]

### Zeit-Zwischenereignis

Das Zeit-Zwischenereignis unterbricht den Prozess, bis ein Zeitpunkt erreicht oder eine Frist verstrichen ist. Typische Beschriftungen sind „sechs Wochen vor dem Seminar“ oder „Wiedervorlage nach zwei Wochen“.

![[bpmn-zwischenereignis-zeit.png]]

### Bedingungs-Zwischenereignis

Das Bedingungs-Zwischenereignis lässt den Prozess warten, bis eine Bedingung erfüllt ist. So kann die Anmeldung zu einem Seminar erst geschlossen werden, wenn es ausgebucht ist.

![[bpmn-zwischenereignis-bedingung.png]]

## Der häufigste Fehler: keine Alternative

Ein Zwischenereignis sagt nur, worauf der Prozess wartet. Es sagt nicht, was geschieht, wenn das Ereignis ausbleibt. Genau das wird in der Praxis oft vergessen: Das Modell zeigt den Idealfall, und niemand weiß, wie es weitergeht, wenn die Antwort nie kommt.

Die Lösung ist das [[BPMN Das Ereignisbasierte Gateway|ereignisbasierte Gateway]]. Dahinter modellierst du die möglichen Ereignisse, und der Prozess folgt dem Pfad, dessen Ereignis zuerst eintritt. Ein typisches Paar ist ein Nachrichten- und ein Zeit-Zwischenereignis: Geht das Geld ein, wird es verbucht. Verstreicht vorher die Zahlungsfrist, wird eine Mahnung gefertigt.

## Häufige Fragen

### Wie stelle ich in BPMN dar, dass ein Prozess auf etwas wartet?

Warten stellst du in BPMN mit einem empfangenden Zwischenereignis im Prozessfluss dar. Der Prozess bleibt an dieser Stelle stehen, bis das Ereignis eintritt, und läuft dann weiter. Das unbestimmte Zwischenereignis ohne Symbol passt immer. Willst du genauer zeigen, worauf gewartet wird, nimmst du das Nachrichten-, Zeit- oder Bedingungs-Zwischenereignis.

### Was ist der Unterschied zwischen sendenden und empfangenden Zwischenereignissen?

Ein empfangendes Zwischenereignis wartet darauf, dass etwas eintritt, ein sendendes löst selbst etwas aus, etwa das Verschicken einer Nachricht. Sendende Ereignisse erkennst du am ausgefüllten Symbol. Für die fachliche Modellierung reichen empfangende Zwischenereignisse. Das Versenden stellst du dort als Aufgabe dar, zum Beispiel „Angebot einreichen“.

### Was passiert, wenn das erwartete Ereignis nie eintritt?

Ohne modellierte Alternative bleibt der Prozess am Zwischenereignis stehen, und das Modell lässt offen, wie es weitergeht. Deshalb gehört an solche Stellen ein ereignisbasiertes Gateway mit einem Zeit-Zwischenereignis als Frist. Tritt das erwartete Ereignis nicht rechtzeitig ein, folgt der Prozess dem Pfad der Frist, etwa mit einer Erinnerung oder einer Mahnung.

### Worin unterscheidet sich ein Zwischenereignis von einer Aufgabe?

Ein Zwischenereignis beschreibt einen Moment, in dem etwas eintritt, eine Aufgabe beschreibt Arbeit, die jemand erledigt. Ereignisse enthalten deshalb nie Bearbeitungszeit. Geht ein Angebot ein, ist das ein Nachrichten-Zwischenereignis. Das anschließende Prüfen des Angebots ist eine Aufgabe, die im Modell direkt dahinter folgt.

## Verwandte Artikel

- **[[BPMN Ereignisse (Grundlagen & Konzept)]]**  
  Erklärt, wie sich Start-, Zwischen- und Endereignisse unterscheiden und was im Prozess an einem Ereignis geschieht.
- **[[BPMN Das Ereignisbasierte Gateway]]**  
  Zeigt, wie der Prozess zwischen mehreren Zwischenereignissen den Pfad wählt, dessen Ereignis zuerst eintritt.
- **[[BPMN Startereignisse]]**  
  Behandelt dieselben Ereignistypen am Anfang eines Prozesses, wo sie ihn auslösen, statt ihn anzuhalten.
- **[[BPMN Endereignisse]]**  
  Beschreibt, wie ein Prozess endet und warum es dort kein Zeitereignis gibt.
