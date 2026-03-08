import type { ModeTranslation } from '../types';

export const deModes: Record<string, ModeTranslation> = {
  NP: {
    name: 'No Power',
    description:
      'Der Zugrechner ist ausgeschaltet. Nichts funktioniert \u2014 kein Bildschirm, kein Schutz, keine Kommunikation. Wie ein Auto mit ausgeschalteter Z\u00FCndung.',
    detailedDescription:
      'Alle ETCS-Funktionen sind inaktiv: keine Geschwindigkeits\u00FCberwachung, keine Kommunikation mit der Streckenausr\u00FCstung, keine DMI-Anzeige und keine Bremsbefehle. Der Zug kann sich noch nach nationalen Betriebsvorschriften oder optischen Signalen bewegen, aber ETCS bietet keinen Schutz. Diese Betriebsart wird eingenommen, wenn das F\u00FChrerhaus deaktiviert oder die Hauptstromversorgung abgeschaltet wird. Der \u00DCbergang zu Stand By (SB) erfolgt, wenn der Triebfahrzeugf\u00FChrer ETCS einschaltet und das System seinen Selbsttest abschlie\u00DFt.',
    speedLimit: null,
    driverResponsibility:
      'Volle Verantwortung nach nationalen Vorschriften. ETCS bietet keinen Schutz und keine Information.',
    realWorldContext:
      'Dies ist der Zustand des Zuges, wenn er \u00FCber Nacht im Depot abgestellt ist, oder wenn eine Lokomotive mit allen Systemen heruntergefahren geparkt ist. Tritt auch in der Anfangsphase auf, bevor ein Triebfahrzeugf\u00FChrer seine Schicht beginnt und das F\u00FChrerhaus hochf\u00E4hrt.',
    keyCharacteristics: [
      'Notbremsung wird dauerhaft kommandiert',
      'Keine ETCS-Funktionen verf\u00FCgbar',
      'Keine Geschwindigkeits\u00FCberwachung oder Bremseingriff',
      'DMI ist inaktiv und dunkel',
      'Keine Kommunikation mit RBC oder Balisenlesern',
      'Zugbewegung vollst\u00E4ndig nach nationalen Vorschriften geregelt',
    ],
  },
  SB: {
    name: 'Stand By',
    description:
      'Das System ist gerade hochgefahren und hat seine Pr\u00FCfungen bestanden. Nun wartet es darauf, dass der Triebfahrzeugf\u00FChrer seine ID und Zugdaten eingibt, bevor die Fahrt beginnen kann. Dies ist der Ausgangspunkt f\u00FCr alles.',
    detailedDescription:
      'Stand By ist der Ausgangszustand nach dem Einschalten von ETCS und erfolgreichem Selbsttest. Das DMI ist aktiv und zeigt Dateneingabebildschirme an. Der Triebfahrzeugf\u00FChrer muss seine Fahrer-ID, die Zugnummer und die Zugdaten (L\u00E4nge, Bremseigenschaften, H\u00F6chstgeschwindigkeit, Achslastkategorie usw.) eingeben oder best\u00E4tigen. Das System bestimmt das ETCS-Level und versucht bei Level 2/3, eine Kommunikation mit dem Radio Block Centre (RBC) herzustellen. Es gibt keine Fahrterlaubnis (MA) \u2014 der Zug sollte stehen bleiben. Von SB kann der Zug in Full Supervision (MA erhalten), Staff Responsible (keine MA verf\u00FCgbar), Shunting, Sleeping, Non Leading oder andere Betriebsarten wechseln, je nach Situation.',
    speedLimit: '0 km/h (Zug sollte stehen)',
    driverResponsibility:
      'Fahrer-ID, Zugdaten eingeben/best\u00E4tigen und ETCS-Level best\u00E4tigen. Sicherstellen, dass der Zug steht.',
    realWorldContext:
      'Ein Triebfahrzeugf\u00FChrer kommt im Depot an, steigt ins F\u00FChrerhaus, f\u00E4hrt den Zug hoch und durchl\u00E4uft die Dateneingabe am DMI-Bildschirm. Dies geschieht zu Beginn jeder Mission und nach bestimmten Wiederherstellungsverfahren.',
    keyCharacteristics: [
      'DMI aktiv und zeigt Dateneingabefelder an',
      'Selbsttest erfolgreich abgeschlossen',
      'Keine Fahrterlaubnis erteilt',
      'Zugdateneingabe/-validierung erforderlich',
      'Eingangsbetriebsart zu allen Betriebs- und Sonderbetriebsarten',
    ],
  },
  SH: {
    name: 'Rangieren',
    description:
      'Der Zug bewegt sich langsam in einem Rangierbahnhof \u2014 Wagen kuppeln, umsetzen oder einen Zug zusammenstellen. Die Geschwindigkeit ist durch Nationale Werte begrenzt, aber der Triebfahrzeugf\u00FChrer muss die Strecke selbst beobachten, da ETCS den Fahrweg nicht pr\u00FCft.',
    detailedDescription:
      'Der Rangiermodus wird f\u00FCr Bewegungen mit geringer Geschwindigkeit im Rangierbahnhof verwendet: Zusammenstellen/Trennen von Z\u00FCgen, Positionieren von Wagen und Rangierbetrieb. ETCS bietet eine H\u00F6chstgeschwindigkeits\u00FCberwachung (typischerweise 30 km/h, konfigurierbar je nach nationalem Wert), erteilt jedoch keine Fahrterlaubnis (MA) und \u00FCberwacht diese auch nicht. Es gibt keinen Schutz gegen konfligierende Fahrstra\u00DFen oder belegte Gleise. Der Triebfahrzeugf\u00FChrer muss visuell pr\u00FCfen, ob der Weg frei ist, und den Handzeichen oder lokalen Rangieranweisungen folgen. Bei Level 2/3 kann die RBC-Kommunikationssitzung freigegeben werden. Das wesentliche Sicherheitsprinzip ist, dass die Geschwindigkeit begrenzt ist, aber die Fahrwegsicherheit in der Verantwortung des Triebfahrzeugf\u00FChrers liegt.',
    speedLimit: 'Bestimmt durch Nationale Werte',
    driverResponsibility:
      'Volle Verantwortung f\u00FCr Fahrwegsicherheit, Hinderniserkennung und Einhaltung lokaler Rangieranweisungen.',
    realWorldContext:
      'Wird in Rangierb\u00E4hnhofen und Depots beim Kuppeln/Entkuppeln von Wagen, Umsetzen von Z\u00FCgen auf Abstellgleisen oder Bewegen einer Lokomotive zum anderen Ende eines Zuges verwendet. H\u00E4ufig am Anfang und Ende einer Zugfahrt in Kopfbahnh\u00F6fen.',
    keyCharacteristics: [
      'H\u00F6chstgeschwindigkeit \u00FCberwacht bei 30 km/h (Standard)',
      'Keine Fahrterlaubnis oder Fahrwegschutz durch ETCS',
      'Triebfahrzeugf\u00FChrer verantwortlich f\u00FCr Fahrweg und Hindernisfreiheit',
      'Kann durch Triebfahrzeugf\u00FChreranforderung oder streckenseitigen Befehl eingeleitet werden',
      'RBC-Sitzung kann bei Level 2/3 freigegeben werden',
    ],
  },
  FS: {
    name: 'Voll\u00FCberwachung',
    description:
      'Dies ist die Hauptbetriebsart \u2014 das System ist vollst\u00E4ndig f\u00FCr die Sicherheit verantwortlich. Es wei\u00DF, wie schnell der Zug fahren darf, wo er anhalten muss, und wird bei Bedarf automatisch bremsen. Die sicherste Betriebsweise.',
    detailedDescription:
      'Full Supervision ist die Standard-Betriebsart und bietet das h\u00F6chste Sicherheitsniveau. Die Fahrzeugausr\u00FCstung verf\u00FCgt \u00FCber eine g\u00FCltige Fahrterlaubnis (MA), die die Grenze der sicheren Fahrt (Fahrerlaubnisende, EOA) definiert. Sie verf\u00FCgt auch \u00FCber die vollst\u00E4ndige Streckenbeschreibung: statisches Geschwindigkeitsprofil (Streckengeschwindigkeit, vor\u00FCbergehende Langsamfahrstellen), Neigungsprofil (f\u00FCr Bremskurvenberechnung) und Betriebsartprofilinformationen. Das System berechnet kontinuierlich die zul\u00E4ssige Geschwindigkeit, Warngeschwindigkeit und Eingriffskurven. Bei \u00DCberschreitung der zul\u00E4ssigen Geschwindigkeit erfolgen abgestufte Eingriffe: Anzeige \u2192 Warnung \u2192 Betriebsbremse \u2192 Notbremse. Bei Level 2/3 kommt die MA per Funk vom RBC; bei Level 1 per Eurobalise oder Euroloop.',
    speedLimit: 'Gem\u00E4\u00DF statischem Geschwindigkeitsprofil und MA (bis zur Streckengeschwindigkeit)',
    driverResponsibility:
      'Innerhalb der zul\u00E4ssigen Geschwindigkeit fahren. Auf DMI-Anzeigen reagieren. ETCS bietet vollen Schutz.',
    realWorldContext:
      'Der normale Betriebszustand f\u00FCr Hauptstreckenfahrten auf ETCS-ausger\u00FCsteten Hochgeschwindigkeits- und konventionellen Strecken. So fahren Z\u00FCge auf Strecken wie der Madrid\u2013Barcelona AVE, dem Gotthard-Basistunnel oder d\u00E4nischen Hauptstrecken unter ETCS Level 2.',
    keyCharacteristics: [
      'Kontinuierliche Geschwindigkeits\u00FCberwachung gegen\u00FCber MA und Geschwindigkeitsprofil',
      'Notbremseingriff bei Gefahr der \u00DCberschreitung des EOA',
      'Vollst\u00E4ndige Streckenbeschreibung (Neigung, Geschwindigkeitsbeschr\u00E4nkungen) verf\u00FCgbar',
      'Bremskurven berechnet mit zugspezifischen Daten',
      'H\u00F6chstes Sicherheitsniveau des ETCS-Schutzes',
    ],
  },
  LS: {
    name: 'Eingeschr\u00E4nkte \u00DCberwachung',
    description:
      'Wie Full Supervision, aber das System hat weniger detaillierte Informationen \u00FCber die vorausliegende Strecke. Es sch\u00FCtzt den Zug weiterhin, verwendet aber sicherere Standardwerte, wo Daten fehlen. Ein Zwischenschritt f\u00FCr Strecken, die auf ETCS umger\u00FCstet werden.',
    detailedDescription:
      'Limited Supervision bietet eine Fahrterlaubnis und Geschwindigkeits\u00FCberwachung, aber mit weniger detaillierten Streckeninformationen als FS. Die Fahrzeugausr\u00FCstung hat eine MA mit einem EOA, sodass der Zug gegen das \u00DCberfahren seiner Erlaubnis gesch\u00FCtzt ist. Allerdings kann die Streckenbeschreibung unvollst\u00E4ndig sein: Neigungsprofile k\u00F6nnen fehlen, und einige Geschwindigkeitsbeschr\u00E4nkungen k\u00F6nnen auf nationalen Standardwerten statt auf pr\u00E4zisen Infrastrukturdaten beruhen. Bremskurvenberechnungen k\u00F6nnen konservative Standardparameter verwenden, was zu restriktiveren (aber dennoch sicheren) Geschwindigkeitsprofilen f\u00FChren kann. LS wurde eingef\u00FChrt, um eine schrittweise Migration von nationalen Systemen zu vollem ETCS zu erm\u00F6glichen, mit reduziertem Aufwand f\u00FCr die streckenseitige Implementierung.',
    speedLimit: 'Gem\u00E4\u00DF MA und verf\u00FCgbarem Geschwindigkeitsprofil (nationale Werte k\u00F6nnen gelten)',
    driverResponsibility:
      'Muss streckenseitige Informationen beachten und nationale Betriebsvorschriften einhalten \u2014 ETCS-Anzeigen ersetzen nicht die Streckensignale.',
    realWorldContext:
      'Wird auf Strecken eingesetzt, die auf ETCS umger\u00FCstet werden, aber deren streckenseitige Daten (z. B. Neigungsprofile, detaillierte Geschwindigkeitsbeschr\u00E4nkungen) noch nicht vollst\u00E4ndig erstellt sind. Erm\u00F6glicht fr\u00FChe ETCS-Inbetriebnahme mit reduziertem Implementierungsaufwand.',
    keyCharacteristics: [
      'G\u00FCltige MA mit EOA-\u00DCberwachung',
      'Reduzierte Streckenbeschreibung im Vergleich zu Full Supervision',
      'Einige Parameter verwenden nationale Standardwerte',
      'Konzipiert f\u00FCr schrittweise Migration von nationalen Systemen',
      'Bremskurven k\u00F6nnen konservativer sein aufgrund unvollst\u00E4ndiger Daten',
    ],
  },
  OS: {
    name: 'Fahren auf Sicht',
    description:
      'Vorsichtig weiterfahren \u2014 es k\u00F6nnte etwas auf dem Gleis voraus sein (ein anderer Zug, ein Hindernis). Die Geschwindigkeit ist durch Nationale Werte begrenzt und der Triebfahrzeugf\u00FChrer muss jederzeit bereit sein, aufgrund dessen, was er sieht, anzuhalten.',
    detailedDescription:
      'On Sight wird verwendet, wenn die Streckenausr\u00FCstung nicht garantieren kann, dass der vorausliegende Abschnitt frei ist. Dies tritt typischerweise auf, wenn Gleisfreimeldeanlagen oder Achsz\u00E4hler ausgefallen sind, wenn ein Abschnitt visuell \u00FCberpr\u00FCft werden muss, oder wenn das Stellwerk eine Fahrstra\u00DFe mit bekannter Belegung voraus freigegeben hat. ETCS \u00FCberwacht eine H\u00F6chstgeschwindigkeit (typischerweise 30 km/h) und der Triebfahrzeugf\u00FChrer muss bereit sein, vor jedem sichtbaren Hindernis anzuhalten. Die Betriebsart wird durch ein On Sight-Betriebsartprofil von der Streckenausr\u00FCstung ausgel\u00F6st, \u00FCblicherweise innerhalb der MA eingebettet. Die Fahrzeugausr\u00FCstung \u00FCberwacht weiterhin die MA/EOA zus\u00E4tzlich zur On Sight-H\u00F6chstgeschwindigkeit. Sobald der On Sight-Bereich passiert ist, wechselt das System zur\u00FCck zu Full Supervision.',
    speedLimit: 'Bestimmt durch Nationale Werte (typischerweise 40 km/h)',
    driverResponsibility:
      'Auf Sicht fahren. Bereit sein, innerhalb der Sichtweite anzuhalten. Volle Aufmerksamkeit auf das vorausliegende Gleis.',
    realWorldContext:
      'H\u00E4ufig bei der Einfahrt in einen Bahnhofsbereich, in dem die Gleisfreimeldung teilweise ausgefallen ist, oder wenn ein Zug einen Abschnitt passieren muss, nachdem die Erkennung eines vorausfahrenden Zuges verloren gegangen ist. Wird auch f\u00FCr Fahrten in belegte Bahnsteige oder Depotbereiche verwendet.',
    keyCharacteristics: [
      'H\u00F6chstgeschwindigkeit \u00FCberwacht bei 30 km/h (Standard)',
      'Vorausliegendes Gleis kann belegt oder blockiert sein',
      'Triebfahrzeugf\u00FChrer muss bereit sein, auf Sicht anzuhalten',
      'Ausgel\u00F6st durch On Sight-Betriebsartprofil von der Streckenausr\u00FCstung',
      'MA/EOA wird zus\u00E4tzlich zur H\u00F6chstgeschwindigkeit \u00FCberwacht',
    ],
  },
  SR: {
    name: 'Personalverantwortlich',
    description:
      'Das System kann dem Zug keine ordnungsgem\u00E4\u00DFe Fahrstra\u00DFe geben, daher \u00FCbernimmt der Triebfahrzeugf\u00FChrer. Der Fahrdienstleiter genehmigt die Bewegung \u00FCber die Europ\u00E4ische Weisung 7. Die Geschwindigkeit ist durch Nationale Werte begrenzt. Dies ist der R\u00FCckfallmodus, wenn die Dinge nicht normal funktionieren.',
    detailedDescription:
      'Staff Responsible ist die R\u00FCckfallbetriebsart, die verwendet wird, wenn ETCS keine Fahrterlaubnis bereitstellen kann, der Zug sich aber bewegen muss. Typische Szenarien: RBC-Kommunikationsausfall, Balisenleserfehlfunktion, fehlende streckenseitige Daten oder Start aus einem nicht ausger\u00FCsteten Bereich. Der Fahrdienstleiter autorisiert den Triebfahrzeugf\u00FChrer per m\u00FCndlichem Befehl, schriftlicher Genehmigung oder nationalem Verfahren. ETCS \u00FCberwacht eine H\u00F6chstgeschwindigkeit (Standard 40 km/h), w\u00E4hrend der Triebfahrzeugf\u00FChrer die Verantwortung f\u00FCr Signale, Geschwindigkeitsbeschr\u00E4nkungen und Streckenbedingungen \u00FCbernimmt. Der Triebfahrzeugf\u00FChrer muss den Eintritt in den SR-Modus am DMI best\u00E4tigen. Wenn anschlie\u00DFend eine g\u00FCltige MA empfangen wird, wechselt das System zu Full Supervision. SR ist entscheidend f\u00FCr die betriebliche Widerstandsf\u00E4higkeit \u2014 Z\u00FCge k\u00F6nnen sich auch bei eingeschr\u00E4nkter Infrastruktur sicher weiterbewegen.',
    speedLimit: 'Bestimmt durch Nationale Werte',
    driverResponsibility:
      'Volle Verantwortung f\u00FCr sichere Bewegung unter Genehmigung des Fahrdienstleiters. Signale und Geschwindigkeitsbeschr\u00E4nkungen beachten. Muss auf Sicht fahren, sofern nicht durch betriebliche Anweisung befreit.',
    realWorldContext:
      'Wird verwendet, wenn ein Triebfahrzeugf\u00FChrer einen m\u00FCndlichen Befehl erh\u00E4lt, an einem Halt zeigenden Signal vorbeizufahren, wenn eine Mission gestartet wird und noch keine MA verf\u00FCgbar ist, oder wenn die Kommunikation mit dem RBC verloren geht, der Fahrdienstleiter aber die Bewegung genehmigt. Sehr h\u00E4ufig im Gest\u00F6rtbetrieb.',
    keyCharacteristics: [
      'Keine Fahrterlaubnis von ETCS',
      'H\u00F6chstgeschwindigkeit \u00FCberwacht bei 40 km/h (Standard)',
      'Triebfahrzeugf\u00FChrer vom Fahrdienstleiter autorisiert (m\u00FCndlich/schriftlich)',
      'Entscheidende R\u00FCckfallbetriebsart f\u00FCr Gest\u00F6rtbetrieb',
      '\u00DCbergang zu Full Supervision wenn g\u00FCltige MA empfangen wird',
    ],
  },
  UN: {
    name: 'Nicht ausger\u00FCstet',
    description:
      'Der Zug ist auf einen Streckenabschnitt gefahren, der keinerlei ETCS-Ausr\u00FCstung hat. Das System kann nur die H\u00F6chstgeschwindigkeit begrenzen \u2014 alles andere obliegt dem Triebfahrzeugf\u00FChrer und den alten Signalen entlang der Strecke.',
    detailedDescription:
      'Unfitted wird auf Strecken ohne ETCS-Streckenausr\u00FCstung (ETCS Level 0) verwendet. Die Fahrzeugausr\u00FCstung bietet nur eine grundlegende \u00DCberwachung: eine H\u00F6chstgeschwindigkeit basierend auf dem nationalen Wert f\u00FCr nicht ausger\u00FCstete Bereiche plus der zugeigenen H\u00F6chstgeschwindigkeit. Es gibt keine MA, kein Geschwindigkeitsprofil von der Streckenausr\u00FCstung und keine RBC-Kommunikation. Der Triebfahrzeugf\u00FChrer f\u00E4hrt nach nationalen Signalvorschriften (ortsfeste Signale, Geschwindigkeitstafeln, Betriebsverfahren). Wenn ein nationales Zugsicherungssystem (z. B. PZB, ASFA, KVB, TPWS) \u00FCber ein STM verf\u00FCgbar ist, wechselt der Zug stattdessen in den STM National-Modus. Unfitted ist h\u00E4ufig bei grenz\u00FCberschreitenden Fahrten beim \u00DCbergang von einer ausger\u00FCsteten auf eine nicht ausger\u00FCstete Strecke.',
    speedLimit: 'Gem\u00E4\u00DF nationalem Wert f\u00FCr nicht ausger\u00FCstete Bereiche',
    driverResponsibility:
      'Volle Verantwortung nach nationalen Signalvorschriften. ETCS bietet nur H\u00F6chstgeschwindigkeits\u00FCberwachung.',
    realWorldContext:
      'Tritt auf, wenn ein ETCS-ausger\u00FCsteter Zug auf eine Nebenstrecke oder \u00E4ltere Strecke ohne ETCS-Streckeninfrastruktur f\u00E4hrt. Auch h\u00E4ufig bei grenz\u00FCberschreitenden \u00DCberg\u00E4ngen zwischen ausger\u00FCsteten und nicht ausger\u00FCsteten Netzen.',
    keyCharacteristics: [
      'Keine ETCS-Streckenausr\u00FCstung vorhanden (Level 0)',
      'Nur grundlegende H\u00F6chstgeschwindigkeits\u00FCberwachung',
      'Keine MA, keine Streckenbeschreibung von ETCS',
      'Triebfahrzeugf\u00FChrer folgt nationaler Signalgebung und Vorschriften',
      'STM-ausger\u00FCstete Z\u00FCge nutzen stattdessen den STM National-Modus, wenn ein nationales System verf\u00FCgbar ist',
    ],
  },
  SN: {
    name: 'STM National',
    description:
      'Der Zug ist in einen Bereich mit dem Zugsicherungssystem eines anderen Landes gefahren. ETCS \u00FCbergibt die Kontrolle an dieses nationale System \u00FCber einen speziellen Adapter (STM). Das alte lokale System sch\u00FCtzt nun den Zug.',
    detailedDescription:
      'STM National erm\u00F6glicht einem ETCS-Zug den Betrieb unter einem nationalen Zugsicherungssystem \u00FCber ein Specific Transmission Module (STM). Das STM verbindet die Streckenausr\u00FCstung des nationalen Systems (nationale Balisen, Gleismagnete, Induktionsschleifen) mit der ETCS-Fahrzeugarchitektur. Das STM bietet Geschwindigkeits\u00FCberwachung, Signalinterpretation und Bremsbefehle nach den nationalen Regeln. Die ETCS-Fahrzeugausr\u00FCstung koordiniert den Gesamtzustand, delegiert aber den Schutz an das STM. Das DMI kann nationale systemspezifische Anzeigen zeigen. Dies ist essentiell f\u00FCr grenz\u00FCberschreitende Interoperabilit\u00E4t: ein Zug kann von ETCS-Full Supervision zu einem nationalen System (PZB in Deutschland, KVB in Frankreich, ASFA in Spanien, SCMT in Italien) wechseln, wenn er von einer ETCS-Strecke auf eine national gesch\u00FCtzte Strecke f\u00E4hrt.',
    speedLimit: 'Gem\u00E4\u00DF \u00DCberwachung des nationalen Systems',
    driverResponsibility:
      'Anzeigen und Regeln des nationalen Systems befolgen. ETCS koordiniert, aber das nationale System \u00FCberwacht.',
    realWorldContext:
      'Essentiell f\u00FCr grenz\u00FCberschreitende Z\u00FCge in Europa. Zum Beispiel ein Thalys- oder ICE-Zug, der von einem ETCS Level 2-Abschnitt in einen vom nationalen System (PZB, KVB, TVM usw.) gesch\u00FCtzten Bereich des Nachbarlandes f\u00E4hrt.',
    keyCharacteristics: [
      'Nationales Zugsicherungssystem aktiv \u00FCber STM',
      'ETCS delegiert \u00DCberwachung an nationales System',
      'Essentiell f\u00FCr grenz\u00FCberschreitende Interoperabilit\u00E4t',
      'DMI kann nationale spezifische Informationen anzeigen',
      'Ausgel\u00F6st durch nationales System-Betriebsartprofil von der Streckenausr\u00FCstung',
    ],
  },
  SL: {
    name: 'Sleeping',
    description:
      'Diese ETCS-Einheit ist eingeschaltet, aber jemand anderes f\u00E4hrt. Ein anderes F\u00FChrerhaus oder ein anderes Bordsystem hat die Kontrolle. Dieses bleibt einfach ruhig im Hintergrund.',
    detailedDescription:
      'Sleeping wird eingenommen, wenn die ETCS-Fahrzeugausr\u00FCstung erkennt, dass sie nicht die aktive f\u00FChrende Einheit ist. Dies tritt auf, wenn ein Zug mehrere ETCS-Einheiten hat und nur eine als f\u00FChrend bestimmt ist, wenn das hintere F\u00FChrerhaus eines Wendezuges eingeschaltet aber nicht in Betrieb ist, oder wenn eine Lokomotive gekuppelt ist, aber eine andere Einheit f\u00E4hrt. Im Sleeping-Modus beh\u00E4lt die Fahrzeugausr\u00FCstung ihren internen Zustand (Zugdaten, Position) bei, f\u00FChrt aber keine aktive \u00DCberwachung durch \u2014 keine Bremsbefehle, keine RBC-Kommunikation f\u00FCr MAs und keine betriebliche \u00DCberwachung am DMI. Der \u00DCbergang von Sleeping zu Stand By erfolgt, wenn der Triebfahrzeugf\u00FChrer dieses F\u00FChrerhaus als f\u00FChrende Einheit aktiviert.',
    speedLimit: null,
    driverResponsibility:
      'Kein aktives Fahren von diesem F\u00FChrerhaus. Eine andere Einheit hat die Kontrolle.',
    realWorldContext:
      'Das hintere F\u00FChrerhaus eines Wendezuges im Nahverkehr hat sein ETCS im Sleeping-Modus, w\u00E4hrend der Triebfahrzeugf\u00FChrer vom vorderen F\u00FChrerhaus aus f\u00E4hrt. Gilt auch f\u00FCr eine Schublokomotive oder eine schleppend bef\u00F6rderte Einheit.',
    keyCharacteristics: [
      'ETCS eingeschaltet, aber nicht aktiv \u00FCberwachend',
      'Keine Bremsbefehle von dieser Einheit ausgesendet',
      'Eine andere ETCS-Einheit oder ein anderes F\u00FChrerhaus f\u00FChrt',
      'Interner Zustand (Zugdaten, Position) wird beibehalten',
      '\u00DCbergang zu Stand By wenn dieses F\u00FChrerhaus f\u00FChrend wird',
    ],
  },
  TR: {
    name: 'Zwangsbremsung',
    description:
      'Notfall! Der Zug ist \u00FCber einen Punkt hinausgefahren, an dem er h\u00E4tte anhalten m\u00FCssen (oder es wurde etwas Gef\u00E4hrliches erkannt). Die Bremsen werden automatisch scharf angezogen und der Zug muss vollst\u00E4ndig zum Stehen kommen. Dies ist der \u201ENotknopf\u201C von ETCS.',
    detailedDescription:
      'Trip ist die ETCS-Notfallreaktion auf eine potenziell gef\u00E4hrliche Situation. Sie wird ausgel\u00F6st, wenn der Zug das Fahrerlaubnisende (EOA) \u00FCberf\u00E4hrt, wenn eine Balisengruppe einen Trip befiehlt, oder wenn andere sicherheitskritische Bedingungen erkannt werden (z. B. \u00DCberfahren eines Halt zeigenden Signals bei Level 1). ETCS befiehlt sofort eine volle Notbremsung. Das DMI zeigt die Trip-Anzeige. Keine weitere Bewegung ist erlaubt, bis der Triebfahrzeugf\u00FChrer den Trip best\u00E4tigt und bestimmte Wiederherstellungsbedingungen erf\u00FCllt sind. Trip stellt die letzte Verteidigungslinie des Systems gegen eine Kollision oder Entgleisung dar. Die Schwere ist beabsichtigt \u2014 Notbremsung und das anschlie\u00DFende Post Trip-Wiederherstellungsverfahren stellen sicher, dass sichere Bedingungen wiederhergestellt werden. Jedes Trip-Ereignis wird protokolliert und kann eine Untersuchung erfordern.',
    speedLimit: '0 km/h (Notbremsung bis zum Stillstand)',
    driverResponsibility:
      'Zug anhalten lassen. Nicht versuchen, sich zu bewegen. Zwangsbremsung best\u00E4tigen und Fahrdienstleiter kontaktieren.',
    realWorldContext:
      'Tritt auf, wenn ein Triebfahrzeugf\u00FChrer das Bremsen falsch einsch\u00E4tzt und das EOA \u00FCberf\u00E4hrt, wenn ein Kommunikationsausfall dazu f\u00FChrt, dass die MA zu einem ung\u00FCnstigen Zeitpunkt abl\u00E4uft, oder wenn die Streckenausr\u00FCstung den Zug aufgrund eines erkannten Konflikts absichtlich zwangsbremst. Ein schwerwiegendes betriebliches Ereignis, das immer untersucht wird.',
    keyCharacteristics: [
      'Notbremse sofort und automatisch angewendet',
      'Ausgel\u00F6st durch \u00DCberfahren des EOA oder sicherheitskritisches Ereignis',
      'Zug muss vollst\u00E4ndig zum Stillstand kommen',
      'Keine Bewegung erlaubt bis best\u00E4tigt und wiederhergestellt',
      '\u00DCbergang zu Post Trip nach Stillstand und Best\u00E4tigung durch den Triebfahrzeugf\u00FChrer',
    ],
  },
  PT: {
    name: 'Post Trip',
    description:
      'Die Notbremsung ist vor\u00FCber und der Triebfahrzeugf\u00FChrer hat \u201EBest\u00E4tigen\u201C gedr\u00FCckt. Nun steht der Zug still, w\u00E4hrend der Triebfahrzeugf\u00FChrer den Fahrdienstleiter anruft, um das weitere Vorgehen zu kl\u00E4ren. Niemand bewegt sich, bis ein Plan vereinbart wurde.',
    detailedDescription:
      'Post Trip wird nach einem Trip-Ereignis eingenommen, sobald der Zug angehalten hat und der Triebfahrzeugf\u00FChrer den Trip am DMI best\u00E4tigt hat. ETCS verhindert jede Vorw\u00E4rtsbewegung \u00FCber den Stillstandspunkt hinaus. Der Triebfahrzeugf\u00FChrer muss den Fahrdienstleiter kontaktieren, um den Trip zu melden und Anweisungen zu erhalten. Der Fahrdienstleiter kann den Triebfahrzeugf\u00FChrer autorisieren, im Staff Responsible-Modus weiterzufahren, eine Shunting-Bewegung anordnen oder andere Anweisungen erteilen. Bei Level 2/3 kann die Fahrzeugausr\u00FCstung versuchen, die RBC-Kommunikation wiederherzustellen und eine neue MA anzufordern. Post Trip bietet eine prozedurale Pause \u2014 sowohl der Triebfahrzeugf\u00FChrer als auch der Fahrdienstleiter m\u00FCssen die Situation bewerten, bevor der Zug sich wieder bewegt. Eine begrenzte R\u00FCckw\u00E4rtsbewegung kann m\u00F6glich sein, wenn autorisiert.',
    speedLimit: '0 km/h (Stillstand, begrenzte R\u00FCckw\u00E4rtsbewegung m\u00F6glich)',
    driverResponsibility:
      'Fahrdienstleiter kontaktieren. Zwangsbremsungsereignis melden. Auf Genehmigung warten, bevor eine Bewegung erfolgt.',
    realWorldContext:
      'Nach einer Zwangsbremsung an einem Bahnhofssignal kontaktiert der Triebfahrzeugf\u00FChrer den Fahrdienstleiter per Funk, erkl\u00E4rt die Situation, und der Fahrdienstleiter kann eine m\u00FCndliche Genehmigung erteilen, um im SR-Modus am Halt zeigenden Signal vorbeizufahren, oder kann den Zug zur\u00FCcksetzen lassen, um den Durchrutschweg freizumachen.',
    keyCharacteristics: [
      'Eingenommen nach Trip und Stillstand des Zuges',
      'Triebfahrzeugf\u00FChrer muss Trip am DMI best\u00E4tigen',
      'Keine Vorw\u00E4rtsbewegung ohne Genehmigung erlaubt',
      'Triebfahrzeugf\u00FChrer muss Fahrdienstleiter f\u00FCr Anweisungen kontaktieren',
      '\u00DCbergang typischerweise zu Staff Responsible oder Shunting unter Genehmigung des Fahrdienstleiters',
    ],
  },
  SF: {
    name: 'Systemfehler',
    description:
      'Der Zugrechner ist abgest\u00FCrzt oder hat einen schwerwiegenden internen Fehler erkannt. Er kann nicht mehr als zuverl\u00E4ssig f\u00FCr die Sicherheit des Zuges angesehen werden, also l\u00F6st er die Notbremse aus und f\u00E4hrt herunter. Der Triebfahrzeugf\u00FChrer muss auf herk\u00F6mmliche Regeln zur\u00FCckgreifen.',
    detailedDescription:
      'System Failure wird eingenommen, wenn die ETCS-Fahrzeugausr\u00FCstung einen Fehler erkennt, der ihre F\u00E4higkeit beeintr\u00E4chtigt, den Zug sicher zu \u00FCberwachen \u2014 Hardwarefehler (Prozessor, Speicher, Sensor), Softwarefehler oder Konsistenzpr\u00FCfungsfehler. Das System befiehlt eine Notbremsung. Das DMI zeigt den Fehler an. ETCS kann keine \u00DCberwachung mehr bieten, sodass der Triebfahrzeugf\u00FChrer nach nationalen Vorschriften und Verfahren f\u00FCr Fahren ohne Zugsicherung arbeiten muss. Die Wiederherstellung erfordert typischerweise einen Neustart (Aus- und Einschalten, Durchlaufen von No Power zu Stand By). Wenn der Fehler bestehen bleibt, muss ETCS isoliert werden (Isolation-Modus) und der Zug ohne Schutz betrieben oder aus dem Dienst genommen werden. Dies ist ein seltenes, aber kritisches Ereignis.',
    speedLimit: '0 km/h (Notbremse angewendet)',
    driverResponsibility:
      'Nationale Vorschriften f\u00FCr Fahren ohne ETCS befolgen. Fehler melden. M\u00F6glicherweise ETCS isolieren.',
    realWorldContext:
      'Ein seltenes Ereignis, das durch Hardwarefehler des Bordrechners, besch\u00E4digte Software oder Sensorfehlfunktion (z. B. Odometriefehler, JRU-Fehler) auftreten kann. Der Zug wird typischerweise bis zur Fehlerbewertung durch die Instandhaltung festgehalten.',
    keyCharacteristics: [
      'Sicherheitskritischer Bordfehler erkannt',
      'Notbremse automatisch angewendet',
      'ETCS kann keine sichere \u00DCberwachung mehr gew\u00E4hrleisten',
      'Triebfahrzeugf\u00FChrer muss auf nationale Betriebsvorschriften zur\u00FCckgreifen',
      'Wiederherstellung erfordert Neustart oder ETCS-Isolation',
    ],
  },
  IS: {
    name: 'Isolierung',
    description:
      'Der Triebfahrzeugf\u00FChrer hat ETCS absichtlich \u00FCber eine implementierungsspezifische Isolierungsmethode abgeschaltet. Das System ist vollst\u00E4ndig deaktiviert. Wird verwendet, wenn ETCS defekt ist und nicht vor Ort repariert werden kann.',
    detailedDescription:
      'Isolation wird eingenommen, wenn der Triebfahrzeugf\u00FChrer den physischen ETCS-Isolierschalter bet\u00E4tigt, um die Bordausr\u00FCstung vollst\u00E4ndig zu deaktivieren. Dies ist eine bewusste Handlung. Nach der Isolation bietet ETCS keine \u00DCberwachung, keine DMI-Anzeige (oder zeigt eine Isolation-Anzeige), keine Bremsbefehle und keine streckenseitige Kommunikation. Der Zug f\u00E4hrt vollst\u00E4ndig nach nationalen Vorschriften und einem ggf. vorhandenen unabh\u00E4ngigen nationalen Zugsicherungssystem. Isolation wird verwendet, wenn ETCS einen dauerhaften Fehler hat, der nicht behoben werden kann, bei Wartungsarbeiten oder in bestimmten Szenarien, in denen ETCS deaktiviert werden muss. Der Isolierschalter ist typischerweise ein physischer Schl\u00FCsselschalter, um versehentliche Aktivierung zu verhindern. Zum Verlassen stellt der Triebfahrzeugf\u00FChrer den Schalter auf Normal, was eine Einschaltsequenz und Systemneustart ausl\u00F6st.',
    speedLimit: null,
    driverResponsibility:
      'Volle Verantwortung nach nationalen Vorschriften. Kein ETCS-Schutz verf\u00FCgbar. Isolierschalter muss bedient werden.',
    realWorldContext:
      'Wird verwendet, wenn die ETCS-Bordausr\u00FCstung einen dauerhaften Fehler hat und der Zug zur n\u00E4chsten Werkstatt weiterfahren muss. Wird auch bei Tests und Wartungsarbeiten an der Bordausr\u00FCstung in Werkst\u00E4tten verwendet.',
    keyCharacteristics: [
      'ETCS absichtlich vom Triebfahrzeugf\u00FChrer \u00FCber implementierungsspezifische Isolierungsmethode deaktiviert',
      'Keine ETCS-Funktionen verf\u00FCgbar',
      'Verwendet bei dauerhaften Fehlern oder Wartung',
      'Die Isolierungsmethode ist implementierungsspezifisch (nicht zwischen Z\u00FCgen harmonisiert)',
      'Verlassen erfordert Schalterr\u00FCckstellung und vollst\u00E4ndigen Systemneustart',
    ],
  },
  NL: {
    name: 'Nicht f\u00FChrend',
    description:
      'Diese Lokomotive ist Teil des Zuges, aber nicht die f\u00FChrende Einheit. Eine andere Einheit vorne f\u00E4hrt und f\u00FChrt die Sicherheitspr\u00FCfungen durch. Diese f\u00E4hrt einfach ruhig mit.',
    detailedDescription:
      'Non Leading wird verwendet, wenn ein angetriebenes Fahrzeug mit ETCS Teil eines Zuges ist, aber nicht die Bewegung steuert. H\u00E4ufig bei Mehrfachtraktion (zwei oder mehr Lokomotiven gekuppelt) oder Wendezugbetrieb, bei dem die hintere Lokomotive ETCS aktiv hat, aber das vordere F\u00FChrerhaus die Kontrolle hat. Die Fahrzeugausr\u00FCstung ist aktiv und kennt ihren Status, fordert aber keine MA an, h\u00E4lt keine MA und gibt keine Bremsbefehle aufgrund der ETCS-\u00DCberwachung aus. Das F\u00FChrerhaus in Non Leading hat typischerweise eine reduzierte DMI-Anzeige. Non Leading stellt sicher, dass nur eine ETCS-Fahrzeugausr\u00FCstung in einem Verband aktiv \u00FCberwacht, um konfligierende Bremsbefehle oder Erlaubnisverwaltung zu verhindern.',
    speedLimit: null,
    driverResponsibility:
      'Verantwortlich f\u00FCr die Erf\u00FCllung der Auftr\u00E4ge im Zusammenhang mit angezeigten Streckenbedingungen.',
    realWorldContext:
      'Ein G\u00FCterzug mit zwei gekuppelten Lokomotiven: die vordere Lok ist im Full Supervision-Modus, w\u00E4hrend die ETCS-Ausr\u00FCstung der hinteren Lok im Non Leading-Modus ist. Wird auch f\u00FCr den hinteren Triebkopf eines Hochgeschwindigkeits-Wendezuges verwendet.',
    keyCharacteristics: [
      'Einheit ist nicht die f\u00FChrende Traktion im Verband',
      'Keine Fahrterlaubnis gehalten oder angefordert',
      'Keine ETCS-Bremsbefehle von dieser Einheit ausgesendet',
      'Verhindert konfligierende \u00DCberwachung in Mehrtraktionsz\u00FCgen',
      '\u00DCbergang zu Stand By wenn diese Einheit die f\u00FChrende wird',
    ],
  },
  RV: {
    name: 'R\u00FCckw\u00E4rtsfahren',
    description:
      'Der Zug muss ein kurzes St\u00FCck r\u00FCckw\u00E4rts fahren \u2014 vielleicht hat er einen Bahnsteig \u00FCberfahren oder muss einen Tunnel evakuieren. ETCS \u00FCberwacht Geschwindigkeit und Entfernung, um sicherzustellen, dass er nicht zu weit f\u00E4hrt.',
    detailedDescription:
      'Der Modus Reversing erm\u00F6glicht eine kontrollierte R\u00FCckw\u00E4rtsbewegung unter ETCS-\u00DCberwachung, haupts\u00E4chlich f\u00FCr die Notevakuierung aus Gefahrensituationen vorgesehen. Der Triebfahrzeugf\u00FChrer ist (\u00FCber streckenseitige Informationen oder ein spezifisches ETCS-Verfahren) autorisiert, eine begrenzte Strecke mit begrenzter Geschwindigkeit r\u00FCckw\u00E4rts zu fahren. ETCS \u00FCberwacht, dass der Zug die autorisierte R\u00FCckw\u00E4rtsgeschwindigkeit nicht \u00FCberschreitet oder \u00FCber die autorisierte Entfernung hinausf\u00E4hrt. Das DMI zeigt den Reversing-Zustand und die verbleibende Entfernung an. Wird f\u00FCr das Zur\u00FCcksetzen an einen Bahnsteig nach \u00DCberfahren, R\u00FCckzug von einem Gefahrenpunkt oder Notfallevakuierung (z. B. R\u00FCckw\u00E4rtsfahrt aus einem Tunnel) verwendet. Reversing-Parameter werden durch streckenseitige Daten oder nationale Werte definiert. Nach Abschluss wechselt der Zug in eine andere Betriebsart (typischerweise Post Trip oder Full Supervision). Dies ist nicht f\u00FCr regul\u00E4ren bidirektionalen Betrieb.',
    speedLimit: 'Definiert durch die streckenseitigen Parameter des R\u00FCckfahrbereichs',
    driverResponsibility:
      'R\u00FCckw\u00E4rtsbewegung innerhalb der autorisierten Geschwindigkeit und Entfernung steuern. DMI f\u00FCr verbleibende Entfernung \u00FCberwachen.',
    realWorldContext:
      'Ein Zug \u00FCberf\u00E4hrt einen Bahnsteig an einem Kopfbahnhof und muss zur\u00FCcksetzen. Oder ein Zug in einem Tunnel muss bei einem Notfall zum Tunneleingang zur\u00FCckfahren, um Fahrg\u00E4ste zu evakuieren. Wird auch an bestimmten Gleisverbindungen verwendet.',
    keyCharacteristics: [
      'Kontrollierte R\u00FCckw\u00E4rtsbewegung unter ETCS-\u00DCberwachung',
      'Geschwindigkeits- und Entfernungsgrenzen durchgesetzt',
      'Verwendet f\u00FCr betriebliche Wiederherstellung und Notfallszenarien',
      'Erfordert spezifische Genehmigung von der Streckenausr\u00FCstung',
      'Nicht f\u00FCr regul\u00E4ren bidirektionalen Betrieb',
    ],
  },
  AD: {
    name: 'Automatisches Fahren',
    description:
      'ATO (Automatischer Zugbetrieb) hat die Kontrolle. Der Zug f\u00E4hrt selbst \u2014 beschleunigt, bremst und h\u00E4lt automatisch an Stationen \u2014 w\u00E4hrend ETCS weiterhin alles \u00FCberwacht, um die Sicherheit zu gew\u00E4hrleisten. Eingef\u00FChrt in Baseline 4.',
    detailedDescription:
      'Automatic Driving ist eine neue ETCS-Betriebsart, die in Baseline 4 (CCS TSI 2023) speziell f\u00FCr ATO \u00FCber ETCS-Betrieb eingef\u00FChrt wurde. Das Handbuch v2.8.0 behandelt nur GoA 1 (Fahrerberatung) und GoA 2 (\u00FCberwachtes automatisches Fahren). In dieser Betriebsart steuert das ATO-Bordsystem Zugkraft, Bremsung und Ausrollen gem\u00E4\u00DF einem vom ATO-Streckensystem empfangenen Fahrprofil. ETCS bietet weiterhin volle Sicherheits\u00FCberwachung \u2014 Fahrterlaubnis, Geschwindigkeitsprofil und Bremskurven werden weiter durchgesetzt. Wenn ATO-Befehle eine ETCS-Beschr\u00E4nkung verletzen w\u00FCrden, greift die Sicherheitsschicht mit Betriebs- oder Notbremsung ein. Der Triebfahrzeugf\u00FChrer kann ATO jederzeit ausschalten und kehrt zu Full Supervision zur\u00FCck. Wenn ETCS einen sicherheitskritischen Zustand erkennt (z. B. Ann\u00E4herung an EOA), \u00FCbersteuert es ATO automatisch.',
    speedLimit: 'Gem\u00E4\u00DF statischem Geschwindigkeitsprofil und MA (ATO optimiert innerhalb der ETCS-H\u00FCllkurve)',
    driverResponsibility:
      'GoA 2: ATO-Betrieb \u00FCberwachen, T\u00FCren und Abfahrt handhaben, kann jederzeit \u00FCbersteuern.',
    realWorldContext:
      'Wird derzeit auf Strecken wie Thameslink (UK) und verschiedenen europ\u00E4ischen U-Bahn-Systemen erprobt. Diese Betriebsart erm\u00F6glicht energieeffizientes, fahrplanoptimiertes Fahren bei voller ETCS-Sicherheits\u00FCberwachung. Wird voraussichtlich Standard f\u00FCr hochfrequenten Stadt- und Vorortverkehr.',
    keyCharacteristics: [
      'ATO steuert Zugkraft, Bremsung und Ausrollen automatisch',
      'ETCS beh\u00E4lt volle Sicherheits\u00FCberwachung (MA, Geschwindigkeit, Bremskurven)',
      'Fahrprofil vom ATO-Streckensystem leitet Geschwindigkeitsoptimierung',
      'Triebfahrzeugf\u00FChrer kann ATO jederzeit ausschalten (R\u00FCckkehr zu Full Supervision)',
      'Eingef\u00FChrt in ETCS Baseline 4 / CCS TSI 2023',
    ],
  },
};
