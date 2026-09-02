---
# ---------------------------------------------------------------------------
# BAUSTEINE EINER ARTIKELSEITE
#
# Diese Vorlage zeigt alles, was eine Artikelseite im Wiki darstellen kann:
# jedes Frontmatterfeld, das der Export auswertet, und jeden Baustein, den die
# Seite rendern kann. Sie ist zum Nachschlagen gedacht, nicht zum Ausfuellen --
# fuer eine neue Notiz ist t_ip_atom.md die kuerzere Vorlage.
#
# status steht auf entwurf. Damit wird diese Datei nicht exportiert und
# erscheint nirgends im Wiki. Zum Ansehen: status auf ki_ready setzen, einmal
# "npm run dev" laufen lassen, danach zurueckstellen.
# ---------------------------------------------------------------------------

# PFLICHT ------------------------------------------------------------------
# id: eindeutig, kleingeschrieben, mit Unterstrichen. Wird zur Adresse.
id: bausteine_artikelseite
# status: nur ki_ready wird exportiert. entwurf und verworfen bleiben liegen.
status: entwurf
# type: steuert @type in den strukturierten Daten.
# Erlaubt sind Article, HowTo und CollectionPage.
type: Article

# EINORDNUNG ---------------------------------------------------------------
# Die Ebenen tragen Brotkruemelpfad und Einordnung in der Seitenleiste.
# Nur so tief angeben, wie die Notiz tatsaechlich haengt.
ebene_1: prozessmanagement
ebene_2: prozesse-verstehen
ebene_3: bpmn

# TEXTE --------------------------------------------------------------------
# description: fuer Suchmaschinen. Der Export kuerzt auf 160 Zeichen. Fehlt
# sie, faellt der Export auf summary zurueck und warnt, wenn beides fehlt.
description: Diese Seite zeigt alle Bausteine, die eine Artikelseite im Wissen & Werkzeug Wiki darstellen kann.
# aliases: weitere Namen derselben Notiz, fuer Verweise aus anderen Notizen.
aliases:
  - Bausteine einer Artikelseite

# DATUM --------------------------------------------------------------------
# created traegt datePublished. updated traegt dateModified -- und nur wenn es
# echt spaeter als created liegt, erscheint oben die Zeile
# "Zuletzt bearbeitet am ...". Ein pauschal nachgetragenes updated bleibt
# dadurch unsichtbar.
created: 2026-02-16
updated: 2026-08-28

# ANGEBOTSVERWEIS ----------------------------------------------------------
# Wird am Seitenende als Karte mit Akzent-Oberkante ausgegeben.
# offer_heading ist die unverlinkte Ueberschrift, offer_text traegt genau
# einen Link als Inline-Markdown, Ziel als Wurzelpfad mit Schraegstrich vorn
# und hinten. Sind beide nicht sauber gesetzt, faellt die Karte weg.
offer_heading: Wo ein Teilprozess anfängt, ist eine Entscheidung
offer_text: Ob etwas eine Aufgabe bleibt oder ein eigener Teilprozess wird, hängt davon ab, für wen ein Modell gedacht ist. Der [Grundkurs BPMN](/grundkurs-bpmn/) zeigt, woran sich dieser Schnitt festmachen lässt.

# SEITENLEISTE -------------------------------------------------------------
# sidebar_order: kleinere Zahl steht weiter oben. Ohne Angabe alphabetisch.
# sidebar_hidden: true nimmt die Seite aus der Seitenleiste, ohne sie zu
# loeschen. So bleibt zum Beispiel Personalbedarfsermittlung verborgen.
sidebar_order: 10
sidebar_hidden: false

# SELTEN GEBRAUCHT ---------------------------------------------------------
# image: Vorschaubild fuer das Teilen. Derzeit in keiner Notiz gefuellt.
image:
# semantic_context: Begriffserklaerung fuer Sprachmodelle, landet als
# meta-Tag im Kopf der Seite. Nicht fuer Leserinnen und Leser sichtbar.
semantic_context: Business Process Model and Notation. Ein internationaler Standard für die grafische Darstellung von Geschäftsprozessen.
---

# Bausteine einer Artikelseite

**Zusammenfassung**
> Dieser erste Absatz wird zum Lead: dem hervorgehobenen Einleitungssatz unter der Überschrift. Der Export zieht ihn aus diesem Abschnitt ins Frontmatter und entfernt Überschrift und Zitatzeichen aus dem Text. Erkannt werden beide Schreibweisen — fett gesetzt wie hier oder als H2 — und der Satz darunter als Zitatblock oder als gewöhnlicher Absatz.

**Dieser Artikel beantwortet folgende Fragen:**

- Welche Bausteine kann eine Artikelseite darstellen?
- Wo steht welcher Baustein auf der fertigen Seite?
- Was entsteht automatisch und was muss in die Notiz?

## Fließtext, Hervorhebungen und Listen

Gewöhnlicher Fließtext steht in Inter, 16 Pixel bei 1,7 Zeilenhöhe. **Fett** setzt einen Begriff heraus, *kursiv* markiert eine Betonung oder einen fremdsprachigen Ausdruck.

Eine Aufzählung ohne Reihenfolge:

- **Erster Punkt:** Der fette Vorspann trägt den Begriff, dahinter steht die Erklärung.
- **Zweiter Punkt:** Diese Form wird im Bestand am häufigsten verwendet.
- Ein Punkt ohne Vorspann funktioniert genauso.

Eine Aufzählung mit Reihenfolge, wenn Schritte aufeinander aufbauen:

1. Grobkette aufnehmen: Auslöser, fünf bis neun Schritte, Ergebnis.
2. Rollen zuordnen und Schnittstellen zu anderen Einheiten markieren.
3. Varianten und Sonderfälle ergänzen, aber nur, wenn sie regelmäßig auftreten.

Kurze technische Ausdrücke stehen als Inline-Code: `Ereignis → Funktion → Ereignis` erscheint in JetBrains Mono auf ruhiger Fläche mit feinem Rand.

### Eine Überschrift dritter Ebene

H3 gliedert innerhalb eines Abschnitts. Sie erscheint eingerückt im Verzeichnis „Auf dieser Seite". Tiefer als H3 sollte eine Artikelseite nicht gehen.

## Hinweise und Werkzeuge

Zwei Kästen stehen zur Verfügung. Der Hinweis trägt die Akzentfläche und ein Symbol:

:::note[Hinweis]
Erheben Sie nie mehr Prozesse gleichzeitig, als Sie in derselben Runde auch modellieren können. Halbfertige Erhebungen verlieren nach vier Wochen ihre Verlässlichkeit.
:::

Der Werkzeugkasten ist ruhiger gesetzt, ohne Symbol, und verweist auf etwas zum Mitnehmen:

:::tip[Werkzeug]
Das Prüfraster Verfahrensbeschreibung übersetzt ein fertiges Modell in die Beschreibung, die Ihre Akte braucht.
:::

Beide entstehen aus Starlights Aside-Syntax und funktionieren auch in gewöhnlichem Markdown. Der Name in eckigen Klammern ist die Überschrift des Kastens und frei wählbar; `note` und `tip` bestimmen allein das Aussehen.

## Tabellen

Tabellen bekommen einen Rahmen mit Radius, eine Kopfzeile in Mono-Versalien und eine fett gesetzte erste Spalte:

| Format | Geeignet für | Aufwand je Prozess |
| --- | --- | --- |
| Interview | Einzelzuständigkeiten, Sonderfälle | 1 bis 2 Stunden |
| Workshop | Prozesse über mehrere Stellen hinweg | halber Tag, 6 bis 8 Personen |
| Beobachtung | stark standardisierte Massenverfahren | 2 bis 3 Tage |

Auf schmalen Bildschirmen bleibt die Tabelle nebeneinander stehen und lässt sich seitlich schieben.

## Bilder

Bilder liegen unter `vault/00_system/attachments` und werden mit doppelten eckigen Klammern eingebunden. Der Export kopiert sie nach `public/wiki-assets` und setzt den Pfad um:

![[Hindernisse_des_Messens.png]]

## Verweise

Auf eine andere Notiz wird mit ihrem Titel verwiesen: [[BPMN Startereignisse]]. Der Export löst das in die fertige Adresse auf und warnt beim Bauen, wenn das Ziel nicht existiert. Ein eigener Ankertext geht mit senkrechtem Strich: [[BPMN Startereignisse|die Seite zu Startereignissen]].

Nach außen wird gewöhnlich verlinkt, etwa auf [die Hauptwebsite](https://wissen-und-werkzeug.de/).

## Häufige Fragen

Nur aufnehmen, wenn es drei bis fünf echte Fragen aus der Praxis gibt. Der erste Satz einer Antwort beantwortet die Frage vollständig und trägt auch allein.

### Was entsteht automatisch und muss nicht in die Notiz?

Der Brotkrümelpfad, das Verzeichnis „Auf dieser Seite", der Autorenblock am Seitenende und die Seminarkarte entstehen von selbst. Der Autorenblock steht unter jedem exportierten Artikel, die Seminarkarte nur, wenn `offer_heading` und `offer_text` gesetzt sind.

### Warum sehe ich die Zeile mit dem Bearbeitungsdatum nicht?

Sie erscheint nur, wenn `updated` echt später liegt als `created`. Ist `updated` leer oder gleich `created`, bleibt die Zeile weg — so wird ein pauschal nachgetragenes Datum nicht sichtbar.

### Was passiert mit der Überschrift ganz oben in der Notiz?

Die H1 wird beim Export entfernt. Als Seitentitel dient der Dateiname beziehungsweise das Feld `title`; Starlight setzt ihn selbst als Überschrift.

## Verwandte Artikel
- **[[BPMN Startereignisse]]**
  Kontext: Vertiefung des ersten Ereignistyps.
- **[[BPMN Der Sequenzfluss]]**
  Kontext: Verbindung der Ereignisse untereinander.
