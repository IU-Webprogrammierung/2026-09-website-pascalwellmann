# Road to Hamburg

„Road to Hamburg“ ist ein persönlicher, nicht gewerblicher Webauftritt, der meinen Trainings- und Wettkampfweg zum Hamburg-Marathon 2027 dokumentiert. Ziel ist eine neue persönliche Bestzeit und erstmals eine Marathonzeit von unter vier Stunden.

## Seitenstruktur

Der Webauftritt besteht aus folgenden Seiten:

- Startseite mit Ziel, Kennzahlen und aktuellem Stand
- Mein Weg mit bisherigen Marathonstationen und Erfahrungsberichten
- Training mit Trainingsbereichen, Wochenstruktur, Belastungssteuerung und Trainingsphasen
- Wettkämpfe mit Hauptwettkampf, Vorbereitungswettkämpfen und bisheriger Bilanz
- Ausrüstung mit persönlich genutzten Trainingsgeräten
- Impressum
- Datenschutzerklärung

## Responsive Umsetzung

Die Website wurde nach dem Mobile-First-Prinzip entwickelt.

Verwendete Darstellungsbereiche:

- Smartphone: 320 bis 767 Pixel
- Tablet: 768 bis 1199 Pixel
- Desktop: ab 1200 Pixel

Die Inhaltsanordnung wird mit CSS Grid, Flexbox und Media Queries an die verfügbare Bildschirmbreite angepasst. Je nach Seite kommen einspaltige Darstellungen, zweispaltige Raster, vier Spalten sowie Aufteilungen im Verhältnis von ungefähr zwei Dritteln zu einem Drittel zum Einsatz.

## HTML

Zum Einsatz kommen unter anderem:

- semantische Elemente wie `header`, `nav`, `main`, `section`, `article`, `aside` und `footer`
- Definitionslisten für Kennzahlen und strukturierte Daten
- `figure` und `figcaption` für Bilder und Quellenangaben
- `details` und `summary` für aufklappbare Inhalte
- `time` mit maschinenlesbaren Datums- und Zeitangaben
- Tabellen mit `caption`, Spalten- und Zeilenüberschriften
- individuelle Seitentitel und Meta-Beschreibungen
- passende Alternativtexte beziehungsweise dekorative Bilder mit leerem `alt`-Attribut

## CSS

Die Gestaltung wurde ohne CSS-Framework umgesetzt.

Verwendet werden unter anderem:

- CSS Custom Properties für Farben, Abstände, Schatten und Größen
- natives CSS-Nesting
- CSS Grid und Flexbox
- Media Queries
- responsive Schriftgrößen mit `clamp()`
- logische Eigenschaften wie `margin-block` und `padding-inline`
- Fokus-, Hover- und Aktivzustände
- wiederverwendbare Button- und Kartenklassen
- Grid-Templates und benannte Grid-Bereiche
- reduzierte Bewegungen über `prefers-reduced-motion`

Auf den nachträglichen Einsatz eines CSS-Frameworks wurde bewusst verzichtet, da die individuelle responsive Gestaltung bereits vollständig mit eigenem CSS umgesetzt wurde.

## JavaScript

Wiederkehrende globale Elemente werden nach dem DRY-Prinzip über Web Components erzeugt:

- `<site-header>`
- `<site-footer>`

Die JavaScript-Datei:

- fügt Header und Footer zentral ein,
- kennzeichnet den aktuellen Navigationspunkt mit `aria-current="page"`,
- steuert das mobile Menü,
- aktualisiert `aria-expanded`,
- ermöglicht eine einheitliche Navigation auf allen Seiten.

## Barrierefreiheit

Umgesetzte Maßnahmen:

- semantische HTML-Struktur
- logische Überschriftenhierarchie
- vollständige Tastaturbedienbarkeit
- sichtbare Fokusmarkierungen
- ausreichend große Bedienelemente
- kontrastreiche Farben
- verständliche Link- und Buttontexte
- Alternativtexte für inhaltlich relevante Bilder
- dekorative Bilder werden für assistive Technologien ausgeblendet
- ARIA-Beschriftungen für Navigation und Menü
- `aria-current` für die aktuelle Seite
- `aria-expanded` und `aria-controls` für das mobile Menü
- Screenreader-Klasse für visuell ausgeblendete Beschriftungen
- Berücksichtigung von `prefers-reduced-motion`
- bei 200 Prozent Zoom weiterhin nutzbare Darstellung
- horizontal scrollbar eingebundene Trainingstabelle auf kleinen Bildschirmen

## Bild- und Performanceoptimierung

Die Bilddateien wurden für die finale Phase überarbeitet:

- Umstellung großer PNG-Dateien auf WebP
- Anpassung überdimensionierter Bildauflösungen
- responsive Hero-Bilder mit `srcset` und `sizes`
- hohe Ladepriorität für sichtbare Hero-Bilder mit `fetchpriority="high"`
- Lazy Loading für weiter unten liegende Bilder
- explizite Bildabmessungen zur Reduzierung von Layoutverschiebungen
- verkleinerte Trainingspiktogramme
- responsive Logo-Varianten
- Favicon zur Vermeidung unnötiger 404-Anfragen

## Refactoring

Im Projektverlauf wurden unter anderem folgende Überarbeitungen vorgenommen:

- globale Header- und Footerbestandteile in Web Components ausgelagert
- Seitentitel und Meta-Beschreibungen individualisiert
- überflüssige und widersprüchliche CSS-Regeln bereinigt
- Kommentare vereinheitlicht
- unnötige Container geprüft und semantische Elemente bevorzugt
- mobile, Tablet- und Desktopanordnungen konkretisiert
- wiederkehrende Gestaltung über gemeinsame Klassen und Variablen vereinheitlicht
- Bildformate, Bildgrößen und Ladeverhalten optimiert
- Layoutverschiebungen durch die frühzeitige Registrierung der Web Components reduziert
- allgemeine Platzhalter durch konkrete Inhalte ersetzt

## Tests und Qualitätssicherung

Verwendete Prüfwerkzeuge und Testverfahren:

- W3C HTML Validator
- W3C CSS Validator
- Chrome Lighthouse
- Browser-Entwicklertools
- Responsive Design Mode
- manuelle Tests bei verschiedenen Bildschirmbreiten
- Tastaturtest
- Zoomtest bei 200 Prozent
- Kontrolle der Browserkonsole
- Prüfung aller Links, Bilder und aufklappbaren Elemente

Die fünf Hauptseiten erreichten in Lighthouse sowohl mobil als auch auf dem Desktop nahezu durchgehend Bestwerte in den Bereichen:

- Performance
- Accessibility
- Best Practices
- SEO

## Entwicklungswerkzeuge

- Visual Studio Code
- Live Server
- Git
- GitHub
- Squoosh zur Bildkomprimierung und Größenanpassung
- Microsoft Edge für Lighthouse-Tests
- Firefox für zusätzliche Darstellungs- und Funktionstests

## Git-Workflow

Die Entwicklung wurde fortlaufend mit Git versioniert. Inhaltliche Ergänzungen, Layoutänderungen, Refactorings, Fehlerkorrekturen und Performanceoptimierungen wurden in getrennten Commits dokumentiert. Der finale Entwicklungsstand befindet sich im Branch `main`.

## Externe Bibliotheken und Frameworks

Es wurden keine externen CSS- oder JavaScript-Frameworks und keine externen Schriftarten eingesetzt. Die Website basiert auf HTML, CSS und Vanilla JavaScript.
