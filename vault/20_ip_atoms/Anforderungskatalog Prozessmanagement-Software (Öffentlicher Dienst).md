---
id: anforderungskatalog_prozessmanagement_software
aliases:
  - anforderungskatalog_prozessmanagement_software
parent_topic: prozessmanagement
subtopic: prozessmanagement
type: grundlagen
intent: verstehen
status: entwurf
created: 2026-02-16
summary: Dieses Modul bündelt die funktionalen Anforderungen an ein BPM-System, optimiert für die Anforderungen der öffentlichen Verwaltung. Es deckt die Bereiche Modellierung, Kollaboration, Governance und Berichterstattung ab.
---

%%
RAG-CONTEXT-ANCHOR:
Dieses Modul gehört zur Domäne Fach Expertise und dokumentiert Fachwissen im Bereich Prozessmanagement (Öffentlicher Dienst).
Es ist im Thema Prozessmanagement verortet.
Klassifizierung: grundlagen mit der Zielsetzung verstehen.
%%

# Anforderungskatalog: Prozessmanagement-Software (Öffentlicher Dienst)

## Zusammenfassung

> Dieses Modul bündelt die funktionalen Anforderungen an ein BPM-System, optimiert für die Anforderungen der öffentlichen Verwaltung. Es deckt die Bereiche Modellierung, Kollaboration, Governance und Berichterstattung ab. Die Identifikation, Gestaltung, Dokumentation, Steuerung und Optimierung von Geschäftsprozessen dient der Steigerung der Effizienz und Qualität.

**Dieses Modul beantwortet folgende Fragen:**

- Welche funktionalen Kriterien muss eine BPM-Software für den öffentlichen Dienst erfüllen?
- Wie werden Feedbackschleifen und Governance-Strukturen systemisch unterstützt?
- Welche Notationsstandards und Automatisierungshilfen sind für eine effiziente Modellierung notwendig?

## Funktionale Anforderungen

### Bereich: Modellierung & Notation

Das System muss intuitive Modellierungshilfen bieten, um sowohl Experten als auch Gelegenheitsmodellierer zu unterstützen.

- **Notationsformen:** Volle Unterstützung von BPMN 2.0.
- **Schnellmodellierung:** Verfügbarkeit eines Modellierungsassistenten (z. B. tabellarische Erfassung ohne manuelle Verzweigungspflege).
- **Modellierungs-Automatisierung:** Automatische Layout-Anpassung („Platz schaffen“) beim Einfügen von Prozessschritten in Swimlanes und Shapes.

### Bereich: Kollaboration & Kommunikation

Um die Akzeptanz und Qualität der Prozesse zu sichern, sind integrierte Feedback-Mechanismen essenziell.

- **Kollaborations-Features:** Möglichkeit, Prozesse und einzelne Schritte direkt zu kommentieren.
- **Benachrichtigungswesen:** Automatische E-Mail-Benachrichtigung an Modellierer bei neuen Kommentaren oder Prozessänderungen.
- **Betreuung & Support:** Sicherstellung der Systemnutzung und des technischen Supports über einen Zeitraum von mindestens 4 Jahren.
- **Qualifizierung:** Verfügbarkeit von Beratungs- und Schulungsangeboten.

### Bereich: Struktur & Governance

Sicherung der Datenintegrität und einheitlicher Begrifflichkeiten über das gesamte Prozessregister hinweg.

- **Berechtigungskonzept:** Mehrstufiges Rollenmodell mit gezielten Funktions-Einschränkungen je Nutzergruppe.
- **Zentrales Verzeichnis:** Hinterlegung eines Rollen- und Abteilungsverzeichnisses zur Wahrung der terminologischen Konsistenz.
- **Zentrales Prozessregister:** Aufbau einer Datenbank mit Filter- und Sortierfunktionen für alle Steckbriefe.
- **Suche:** Übergreifende Such- und Filterfunktionen (Rollen, Abteilungen, IT-Systeme).

### Bereich: Dokumentation & Analyse

Sicherstellung der Informationsdichte und der Nutzbarkeit der Prozessdaten für strategische Entscheidungen.

- **Prozesssteckbrief:** Zusammenfassung von Verantwortlichkeiten, Beteiligten und relevanten Dokumenten je Prozess.
- **Detail-Dokumentation:** Hinterlegung von Beschreibungen je Prozessschritt (per Klick sichtbar) sowie Verlinkung zu externen Dokumenten oder Dateipfaden.
- **Export:** Bereitstellung von Modellen als PDF (optional Word/Excel).
- **Auswertung:** Analysefunktionen der Prozessdatenbank zur Ableitung von Handlungsstrategien für das Prozessmanagement.

---

## 🔗 Verwandte Module

- **[[prozessmanagement]]**  
  Kontext: Basismodul für die methodischen Grundlagen, auf denen diese Software-Anforderungen aufbauen.
- **[[BPMN Der Sequenzfluss]]**  
  Kontext: Spezifikation des geforderten Notationsstandards BPMN 2.0.
- **[[Strategisches Prozessmanagement]]**  
  Kontext: Relevanz für die geforderten Auswertungsmöglichkeiten zur Ableitung von Handlungsstrategien.