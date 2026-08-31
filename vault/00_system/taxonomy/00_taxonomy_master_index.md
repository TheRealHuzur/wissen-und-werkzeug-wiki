# Wissens-Ontologie Master-Index

Stand 31.08.2026, nach der Struktur-Migration. Maßgeblich ist [[Standards-Wiki]], Abschnitt 7; hier steht der Wertevorrat, dort die Begründung je Feld.

## 1. Strukturelle Felder

Der Pfad steht in jeder Notiz, ein Feld je Ebene. Gefüllt wird bis zur tatsächlichen Tiefe, untere Felder bleiben leer.

- `ebene_1`: die oberste Ebene, zum Beispiel `prozessmanagement`
- `ebene_2`: die zweite Ebene, zum Beispiel `prozesse-verstehen`
- `ebene_3`: die dritte Ebene, zum Beispiel `bpmn`

Die Nummer statt eines sprechenden Namens, weil die mittlere Ebene im Prozessmanagement eine Phase ist, in den anderen Bereichen aber nicht. Jeder inhaltliche Name wäre in zwei von drei Bereichen falsch.

**Werte in Bindestrichschreibweise**, nie mit Unterstrich. Der Wert entspricht dem Slug der zugehörigen MOC-Notiz.

Die Felder `parent_topic` und `subtopic` gibt es nicht mehr. Sie sind am 31.08.2026 durch die drei Ebenenfelder ersetzt worden.

## 2. Erlaubte Wissens-Arten (`type`)

Die Werte sind direkt die schema.org-Namen, damit zwischen Notiz und Ausgabe keine Übersetzungstabelle entsteht.

[[Article]]
[[HowTo]]
[[CollectionPage]]

Die frühere Sechserliste (`grundlagen`, `framework`, `theorie`, `anleitung`, `vorlage`, `best_practice`) ist ersatzlos entfallen. Sie war nicht trennscharf und erreichte die Ausgabe an keiner Stelle. Die alten Dateien liegen in `_papierkorb/types/`.

## 3. Das Feld `intent` ist gestrichen

Die fünf Werte `verstehen`, `gestalten`, `umsetzen`, `betreiben` und `steuern` sind zur Gliederung geworden: Sie stehen jetzt als Bereiche der zweiten Ebene im Prozessmanagement, also als Werte von `ebene_2`.

**Das ist keine Eins-zu-eins-Übersetzung.** Die fünf Bereiche gelten im Prozessmanagement; im Wissensmanagement und in der Personalbedarfsermittlung ist die zweite Ebene keine Phase. Wer eine neue Notiz einsortiert, wählt deshalb den Knoten aus dem Baum, nicht ein Verb aus einer Liste.

Die Auswahlhilfe zu den alten `intent`-Werten liegt in `_papierkorb/intents/`. Sie ist nicht in eine Auswahlhilfe für `ebene_2` umgedeutet worden, weil ihre Zuordnung nur innerhalb des Prozessmanagements trägt.

## 4. Weitere Felder mit festem Wertevorrat

| Feld | erlaubte Werte |
|---|---|
| `status` | Artikel: `entwurf` oder `ki_ready`. Hub: `aktiv` |

`moc_level` gibt es nicht mehr. Die Ebene einer MOC-Notiz ergibt sich aus der Zahl ihrer gefüllten Ebenenfelder.

`summary` heißt `description`. `area` wird nicht angelegt.

## 5. Validierungs-Regel

Eine Notiz ist valide, wenn sie

1. genau einen Wert in `ebene_1` trägt,
2. die Ebenenfelder lückenlos von oben füllt, also kein `ebene_3` ohne `ebene_2`,
3. mit ihrem tiefsten gefüllten Ebenenfeld auf einen Knoten zeigt, zu dem eine MOC-Notiz existiert, und
4. genau einen der drei `type`-Werte trägt.

Punkt 3 prüft der Export bei jedem Lauf und meldet Abweichungen als `pfadOhneKnoten`.
