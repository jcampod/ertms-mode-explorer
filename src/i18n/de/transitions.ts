import type { TransitionTranslation } from '../types';

export const deTransitions: Record<string, TransitionTranslation> = {
  'NP-SB': {
    description: 'Einschalten und Systemstart',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer schaltet die ETCS-Bordausr\u00FCstung ein. Das System f\u00FChrt seinen Start-Selbsttest durch (Pr\u00FCfung von Hardware, Softwareintegrit\u00E4t, gespeicherten Daten). Nach erfolgreichem Abschluss geht das System in den Stand By-Modus und das DMI wird f\u00FCr die Dateneingabe aktiv.',
    conditions: [
      'ETCS-Bordausr\u00FCstung eingeschaltet',
      'Selbsttest erfolgreich abgeschlossen',
    ],
  },
  'SB-NP': {
    description: 'Ausschalten',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer schaltet die ETCS-Bordausr\u00FCstung aus, typischerweise am Ende einer Mission, wenn der Zug abgestellt oder das F\u00FChrerhaus deaktiviert wird. Alle ETCS-Funktionen enden.',
    conditions: [
      'ETCS-Bordausr\u00FCstung durch den Triebfahrzeugf\u00FChrer ausgeschaltet',
    ],
  },
  'SB-FS': {
    description: 'Missionsbeginn mit vollst\u00E4ndiger MA',
    detailedDescription:
      'Nachdem der Triebfahrzeugf\u00FChrer die Dateneingabe in Stand By abgeschlossen hat, empf\u00E4ngt das System eine g\u00FCltige Fahrterlaubnis mit vollst\u00E4ndiger Streckenbeschreibung (Geschwindigkeitsprofil, Neigung). Dies ist der ideale Missionsbeginn: der Zug wechselt direkt zu Full Supervision mit allen verf\u00FCgbaren Sicherheitsdaten.',
    conditions: [
      'Fahrerdateneingabe abgeschlossen (Fahrer-ID, Zugdaten)',
      'G\u00FCltige Fahrterlaubnis (MA) empfangen',
      'Vollst\u00E4ndige Streckenbeschreibung verf\u00FCgbar',
      'ETCS-Level bestimmt (Level 1, 2 oder 3)',
    ],
  },
  'SB-SR': {
    description: 'Missionsbeginn ohne MA',
    detailedDescription:
      'Wenn der Triebfahrzeugf\u00FChrer die Dateneingabe abgeschlossen hat, aber keine Fahrterlaubnis erhalten werden kann (z. B. kein RBC-Kontakt, keine Balisendaten), kann der Triebfahrzeugf\u00FChrer den Start der Mission im Staff Responsible-Modus beantragen. Der Triebfahrzeugf\u00FChrer muss den Modus am DMI best\u00E4tigen und \u00FCbernimmt die Verantwortung f\u00FCr sichere Bewegung unter Genehmigung des Fahrdienstleiters.',
    conditions: [
      'Fahrerdateneingabe abgeschlossen',
      'Keine g\u00FCltige MA verf\u00FCgbar',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Staff Responsible-Modus am DMI',
    ],
  },
  'SB-SH': {
    description: 'Shunting-Anforderung aus Stand By',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer fordert den Wechsel in den Shunting-Modus f\u00FCr Rangierarbeiten an, oder ein Rangierbefehl wird von der Streckenausr\u00FCstung empfangen (z. B. per Balise). Das System wechselt in den Shunting-Modus f\u00FCr Rangierbewegungen mit geringer Geschwindigkeit. Vollst\u00E4ndige Zugdateneingabe ist f\u00FCr das Rangieren m\u00F6glicherweise nicht erforderlich.',
    conditions: [
      'Rangieranforderung des Triebfahrzeugf\u00FChrers oder streckenseitiger Befehl',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Rangiermodus',
    ],
  },
  'SB-SL': {
    description: 'Sleeping als nicht f\u00FChrende Einheit',
    detailedDescription:
      'Wenn das System feststellt, dass diese Bordausr\u00FCstung nicht die f\u00FChrende Einheit ist (z. B. hinteres F\u00FChrerhaus eines Wendezuges oder eine schleppend bef\u00F6rderte Einheit), wechselt es in den Sleeping-Modus. ETCS bleibt eingeschaltet, \u00FCberwacht aber nicht aktiv.',
    conditions: [
      'Dieses F\u00FChrerhaus/Einheit ist nicht die f\u00FChrende Einheit',
      'Eine andere ETCS-Bordausr\u00FCstung ist als f\u00FChrend aktiv',
    ],
  },
  'SB-NL': {
    description: 'Wechsel in den Non Leading-Modus',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer gibt an, dass diese Lokomotive nicht die f\u00FChrende Traktionseinheit im Verband ist (z. B. hintere Lokomotive bei Doppeltraktion). ETCS wechselt in den Non Leading-Modus, bleibt aktiv, gibt aber keine Bremsbefehle aus und h\u00E4lt keine MA.',
    conditions: [
      'Triebfahrzeugf\u00FChrer w\u00E4hlt Nicht f\u00FChrend',
      'Einheit ist nicht die f\u00FChrende Traktionseinheit im Verband',
    ],
  },
  'SR-FS': {
    description: 'MA empfangen w\u00E4hrend Staff Responsible',
    detailedDescription:
      'W\u00E4hrend der Fahrt im Staff Responsible-Modus passiert der Zug eine Balisengruppe oder empf\u00E4ngt eine RBC-Nachricht mit einer g\u00FCltigen Fahrterlaubnis und vollst\u00E4ndiger Streckenbeschreibung. Das System wechselt automatisch in Full Supervision und bietet vollen ETCS-Schutz.',
    conditions: [
      'G\u00FCltige Fahrterlaubnis (MA) empfangen',
      'Vollst\u00E4ndige Streckenbeschreibung verf\u00FCgbar',
    ],
  },
  'SR-OS': {
    description: 'On Sight-Betriebsartprofil empfangen',
    detailedDescription:
      'W\u00E4hrend im Staff Responsible-Modus empf\u00E4ngt der Zug ein On Sight-Betriebsartprofil von der Streckenausr\u00FCstung (per Balise oder RBC). Dies zeigt an, dass der vorausliegende Abschnitt belegt sein k\u00F6nnte und der Triebfahrzeugf\u00FChrer auf Sicht fahren muss. Das System wechselt in den On Sight-Modus mit seiner eingeschr\u00E4nkten Geschwindigkeit.',
    conditions: [
      'On Sight-Betriebsartprofil von der Streckenausr\u00FCstung empfangen',
      'G\u00FCltige MA mit definiertem On Sight-Bereich',
    ],
  },
  'SR-TR': {
    description: 'Trip ausgel\u00F6st im Staff Responsible-Modus',
    detailedDescription:
      'W\u00E4hrend der Fahrt im Staff Responsible-Modus passiert der Zug eine Balisengruppe, die einen Trip befiehlt (z. B. Schutz eines Gefahrenpunkts). ETCS wendet sofort die Notbremse an. Dies kann auftreten, wenn die m\u00FCndliche Genehmigung des Fahrdienstleiters nicht alle streckenseitigen Schutzma\u00DFnahmen ber\u00FCcksichtigt hat oder sich die Bedingungen ge\u00E4ndert haben.',
    conditions: [
      'Zug passiert eine Balisengruppe, die einen Trip befiehlt',
    ],
  },
  'SR-SH': {
    description: 'Shunting aus Staff Responsible',
    detailedDescription:
      'W\u00E4hrend im Staff Responsible-Modus fordert der Triebfahrzeugf\u00FChrer Shunting an oder ein Rangierbefehl wird von der Streckenausr\u00FCstung empfangen. Der Zug wechselt in den Shunting-Modus f\u00FCr Rangierbewegungen mit geringer Geschwindigkeit.',
    conditions: [
      'Rangieranforderung vom Triebfahrzeugf\u00FChrer oder streckenseitiger Befehl',
    ],
  },
  'FS-OS': {
    description: 'Einfahrt in On Sight-Bereich',
    detailedDescription:
      'W\u00E4hrend Full Supervision sendet die Streckenausr\u00FCstung ein On Sight-Betriebsartprofil f\u00FCr einen vorausliegenden Abschnitt (z. B. ein Bereich, in dem die Gleisfreimeldung ausgefallen ist). Wenn der Zug in diesen Bereich einf\u00E4hrt, wechselt die Betriebsart zu On Sight und die Geschwindigkeit wird eingeschr\u00E4nkt. Die MA bleibt g\u00FCltig.',
    conditions: [
      'On Sight-Betriebsartprofil von der Streckenausr\u00FCstung empfangen',
      'Zug f\u00E4hrt in den On Sight-Betriebsartprofilbereich ein',
    ],
  },
  'FS-LS': {
    description: 'Einfahrt in Limited Supervision-Bereich',
    detailedDescription:
      'Die Streckenausr\u00FCstung zeigt an, dass der vorausliegende Abschnitt nur Limited Supervision bieten kann (unvollst\u00E4ndige Streckenbeschreibung). Wenn der Zug in diesen Bereich einf\u00E4hrt, wechselt er von Full Supervision zu Limited Supervision. Die MA bleibt g\u00FCltig, aber einige \u00DCberwachungsparameter verwenden nationale Standardwerte.',
    conditions: [
      'Limited Supervision-Betriebsartprofil von der Streckenausr\u00FCstung empfangen',
      'Zug f\u00E4hrt in den Limited Supervision-Betriebsartprofilbereich ein',
    ],
  },
  'FS-SR': {
    description: 'Triebfahrzeugf\u00FChrer aktiviert Override-Funktion in Full Supervision',
    detailedDescription:
      'Wenn die Bedingungen f\u00FCr Full Supervision nicht mehr erf\u00FCllt werden k\u00F6nnen (z. B. Streckenbeschreibung wird unvollst\u00E4ndig, Kommunikationsprobleme, die keinen Trip rechtfertigen), kann das System in den Staff Responsible-Modus als eingeschr\u00E4nkten, aber noch betriebsf\u00E4higen Modus wechseln. Der Triebfahrzeugf\u00FChrer muss die \u00C4nderung best\u00E4tigen.',
    conditions: [
      'MA-Bedingungen k\u00F6nnen nicht mehr aufrechterhalten werden',
      'Sichere Bedingungen f\u00FCr Staff Responsible bestehen (keine Trip-Situation)',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Staff Responsible-Modus',
    ],
  },
  'FS-TR': {
    description: '\u00DCberfahren des EOA l\u00F6st Notfall-Trip aus',
    detailedDescription:
      'Der kritischste Sicherheits\u00FCbergang. Wenn der Zug das Fahrerlaubnisende (EOA) \u00FCberf\u00E4hrt \u2014 das hei\u00DFt, er hat den Punkt passiert, jenseits dessen sichere Bewegung nicht gew\u00E4hrleistet ist \u2014 befiehlt ETCS sofortige Notbremsung. Dies ist die grundlegende Sicherheitsfunktion von ETCS: zu verhindern, dass Z\u00FCge ungesch\u00FCtztes Gleis befahren.',
    conditions: [
      'Zug \u00FCberf\u00E4hrt das Fahrerlaubnisende (EOA)',
    ],
  },
  'FS-SH': {
    description: 'Shunting-Befehl w\u00E4hrend Full Supervision',
    detailedDescription:
      'Ein Shunting-Befehl wird von der Streckenausr\u00FCstung empfangen (typischerweise bei einer Rangierbahnhofeinfahrt oder Bahnhofsbereich). Der Zug wechselt in den Shunting-Modus, gibt die MA frei und wechselt zu Shunting-Regeln mit geringer Geschwindigkeit.',
    conditions: [
      'Rangierbefehl von der Streckenausr\u00FCstung empfangen',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Shunting',
    ],
  },
  'FS-UN': {
    description: 'Einfahrt in Unfitted-Bereich',
    detailedDescription:
      'Der Zug wechselt von einem ETCS-ausger\u00FCsteten Bereich in einen Abschnitt ohne ETCS-Streckenausr\u00FCstung (Level 0). Die MA wird freigegeben und das System bietet nur grundlegende H\u00F6chstgeschwindigkeits\u00FCberwachung. Der Triebfahrzeugf\u00FChrer muss nationale Signalvorschriften befolgen.',
    conditions: [
      'Zug f\u00E4hrt in einen Bereich ohne ETCS-Streckenausr\u00FCstung ein (Level 0)',
      'Level\u00FCbergang zu Level 0 ausgef\u00FChrt',
    ],
  },
  'FS-SN': {
    description: 'Einfahrt in STM National-Bereich',
    detailedDescription:
      'Der Zug wechselt von ETCS-Full Supervision in einen Bereich, der von einem nationalen Zugsicherungssystem gesch\u00FCtzt wird. ETCS \u00FCbergibt die \u00DCberwachung an das STM (Specific Transmission Module) f\u00FCr das jeweilige nationale System (z. B. PZB, KVB, ASFA). Dies ist ein geplanter \u00DCbergang an der Grenze zwischen ETCS- und nationalem Systembereich.',
    conditions: [
      'Nationales-System-Betriebsartprofil von der Streckenausr\u00FCstung empfangen',
      'STM verf\u00FCgbar und kompatibel mit nationalem System',
      'Level\u00FCbergang zu NTC ausgef\u00FChrt',
    ],
  },
  'FS-RV': {
    description: 'Autorisierte R\u00FCckw\u00E4rtsbewegung',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer ist autorisiert, eine R\u00FCckw\u00E4rtsbewegung durchzuf\u00FChren (z. B. Zur\u00FCcksetzen an einen Bahnsteig). Die Streckenausr\u00FCstung hat Reversing-Bereichsinformationen mit erlaubter Geschwindigkeit und Entfernung bereitgestellt. Der Triebfahrzeugf\u00FChrer h\u00E4lt den Zug an, w\u00E4hlt R\u00FCckw\u00E4rts, und das System geht in den Reversing-Modus mit \u00FCberwachtem R\u00FCckw\u00E4rtsfahren.',
    conditions: [
      'R\u00FCckw\u00E4rtsbereichsinformation von der Streckenausr\u00FCstung empfangen',
      'Triebfahrzeugf\u00FChrer w\u00E4hlt R\u00FCckw\u00E4rtsrichtung',
      'Zug im Stillstand',
    ],
  },
  'OS-FS': {
    description: 'Verlassen des On Sight-Bereichs, Wiederaufnahme von Full Supervision',
    detailedDescription:
      'Der Zug hat den On Sight-Bereich passiert (z. B. den Abschnitt mit ausgefallener Gleisfreimeldung) und das Full Supervision-Betriebsartprofil wird fortgesetzt. Das System wechselt zur\u00FCck zu Full Supervision mit voller Geschwindigkeits\u00FCberwachung und Schutz.',
    conditions: [
      'Ende des On Sight-Betriebsartprofilbereichs erreicht',
      'Full Supervision-Bedingungen erf\u00FCllt (MA und Streckenbeschreibung)',
    ],
  },
  'OS-SR': {
    description: 'Triebfahrzeugf\u00FChrer aktiviert Override-Funktion in On Sight',
    detailedDescription:
      'Wenn die Bedingungen f\u00FCr On Sight nicht mehr erf\u00FCllt werden k\u00F6nnen (z. B. MA l\u00E4uft ab oder Kommunikation geht verloren), f\u00E4llt das System in den Staff Responsible-Modus zur\u00FCck. Der Triebfahrzeugf\u00FChrer muss best\u00E4tigen und die Verantwortung f\u00FCr sichere Bewegung \u00FCbernehmen.',
    conditions: [
      'Bedingungen f\u00FCr On Sight-Modus k\u00F6nnen nicht mehr aufrechterhalten werden',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Staff Responsible-Modus',
    ],
  },
  'OS-TR': {
    description: '\u00DCberfahren des EOA im On Sight-Modus',
    detailedDescription:
      'Auch im On Sight-Modus \u00FCberwacht ETCS die Fahrterlaubnis. Wenn der Zug das EOA \u00FCberf\u00E4hrt, wird die Notbremse angewendet und das System geht in den Trip-Modus.',
    conditions: [
      'Zug \u00FCberf\u00E4hrt das Fahrerlaubnisende (EOA)',
    ],
  },
  'LS-FS': {
    description: 'Vollst\u00E4ndige Streckendaten verf\u00FCgbar, Upgrade auf Full Supervision',
    detailedDescription:
      'Der Zug f\u00E4hrt in einen Bereich ein, in dem die Streckenausr\u00FCstung vollst\u00E4ndige Streckenbeschreibungsdaten liefert. Das System wechselt von Limited Supervision zu Full Supervision und verwendet nun pr\u00E4zise Neigungs- und Geschwindigkeitsbeschr\u00E4nkungsdaten anstelle nationaler Standardwerte.',
    conditions: [
      'Full Supervision-Betriebsartprofil von der Streckenausr\u00FCstung empfangen',
      'Vollst\u00E4ndige Streckenbeschreibung jetzt verf\u00FCgbar',
    ],
  },
  'LS-TR': {
    description: '\u00DCberfahren des EOA bei Limited Supervision',
    detailedDescription:
      'Auch bei Limited Supervision wird das EOA \u00FCberwacht. Wenn der Zug seine Erlaubnis \u00FCberf\u00E4hrt, wird die Notbremse angewendet und das System geht in den Trip-Modus.',
    conditions: [
      'Zug \u00FCberf\u00E4hrt das Fahrerlaubnisende (EOA)',
    ],
  },
  'UN-FS': {
    description: 'Einfahrt in ausger\u00FCsteten Bereich aus Unfitted-Bereich',
    detailedDescription:
      'Der Zug wechselt von einem Unfitted-Bereich (Level 0) in einen ETCS-ausger\u00FCsteten Bereich. Ein Level\u00FCbergang wird ausgef\u00FChrt und das System empf\u00E4ngt eine g\u00FCltige MA mit Streckenbeschreibung, was Full Supervision erm\u00F6glicht.',
    conditions: [
      'Zug f\u00E4hrt in einen ETCS-ausger\u00FCsteten Bereich ein',
      'Level\u00FCbergang von Level 0 zu Level 1/2/3',
      'G\u00FCltige MA und Streckenbeschreibung empfangen',
    ],
  },
  'UN-SR': {
    description: 'Triebfahrzeugf\u00FChrer aktiviert Override-Funktion in Unfitted',
    detailedDescription:
      'Der Zug f\u00E4hrt von einem Unfitted-Bereich in einen ETCS-ausger\u00FCsteten Bereich, aber es ist keine Fahrterlaubnis sofort verf\u00FCgbar. Das System wechselt in den Staff Responsible-Modus als sichere R\u00FCckfallbetriebsart, bis eine MA erhalten werden kann.',
    conditions: [
      'Level\u00FCbergang zu ETCS-Level, aber keine MA verf\u00FCgbar',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Staff Responsible-Modus',
    ],
  },
  'SN-FS': {
    description: '\u00DCbergang vom nationalen System zu ETCS',
    detailedDescription:
      'Der Zug wechselt von einem Bereich mit nationalem System in einen ETCS-ausger\u00FCsteten Bereich. Das STM \u00FCbergibt die \u00DCberwachung an die ETCS-Bordausr\u00FCstung, ein Level\u00FCbergang wird ausgef\u00FChrt, und das System empf\u00E4ngt eine MA zur Aufnahme von Full Supervision. Dies ist der Standard-Grenz\u00FCbergang.',
    conditions: [
      'Zug f\u00E4hrt in einen ETCS-ausger\u00FCsteten Bereich ein',
      'Level\u00FCbergang von NTC zu Level 1/2/3',
      'G\u00FCltige MA und Streckenbeschreibung empfangen',
      'STM \u00FCbergibt an ETCS',
    ],
  },
  'SN-SR': {
    description: 'Triebfahrzeugf\u00FChrer aktiviert Override-Funktion in STM National',
    detailedDescription:
      'Der Zug wechselt von einem nationalen System in einen ETCS-Bereich, aber es ist keine Fahrterlaubnis von der ETCS-Streckenausr\u00FCstung verf\u00FCgbar. Das System geht als R\u00FCckfallbetriebsart in den Staff Responsible-Modus. Der Triebfahrzeugf\u00FChrer muss den Anweisungen des Fahrdienstleiters folgen, bis eine MA erhalten wird.',
    conditions: [
      'Level\u00FCbergang von NTC zu ETCS-Level',
      'Keine MA von ETCS-Streckenausr\u00FCstung verf\u00FCgbar',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Staff Responsible-Modus',
    ],
  },
  'TR-PT': {
    description: 'Zug nach Trip gestoppt, Triebfahrzeugf\u00FChrer best\u00E4tigt',
    detailedDescription:
      'Nach der Notbremsung im Trip-Modus verz\u00F6gert der Zug bis zum vollst\u00E4ndigen Stillstand. Der Triebfahrzeugf\u00FChrer muss dann das Trip-Ereignis am DMI best\u00E4tigen. Nach Best\u00E4tigung im Stillstand wechselt das System in den Post Trip-Modus, in dem Wiederherstellungsverfahren beginnen k\u00F6nnen.',
    conditions: [
      'Zug ist vollst\u00E4ndig zum Stillstand gekommen',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt den Trip am DMI',
    ],
  },
  'PT-SR': {
    description: 'Wiederaufnahme der Fahrt im Staff Responsible-Modus nach Trip',
    detailedDescription:
      'Nach einem Trip ist die h\u00E4ufigste Wiederherstellung, dass der Triebfahrzeugf\u00FChrer den Fahrdienstleiter kontaktiert, die Situation erkl\u00E4rt und eine m\u00FCndliche Genehmigung zum Weiterfahren erh\u00E4lt. Der Triebfahrzeugf\u00FChrer fordert dann den Staff Responsible-Modus am DMI an und best\u00E4tigt ihn, was dem Zug erm\u00F6glicht, sich unter Genehmigung des Fahrdienstleiters mit eingeschr\u00E4nkter Geschwindigkeit zu bewegen.',
    conditions: [
      'Triebfahrzeugf\u00FChrer kontaktiert Fahrdienstleiter und erh\u00E4lt Genehmigung',
      'Triebfahrzeugf\u00FChrer fordert Staff Responsible-Modus am DMI an',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Staff Responsible-Modus',
    ],
  },
  'PT-SH': {
    description: 'Shunting nach Trip',
    detailedDescription:
      'Nach einem Trip-Ereignis kann der Fahrdienstleiter den Triebfahrzeugf\u00FChrer anweisen, eine Shunting-Bewegung durchzuf\u00FChren, anstatt die Hauptfahrt fortzusetzen (z. B. um eine konfligierende Fahrstra\u00DFe freizumachen oder auf ein Abstellgleis zu fahren). Der Zug wechselt in den Shunting-Modus f\u00FCr Rangierbewegungen mit geringer Geschwindigkeit.',
    conditions: [
      'Shunting-Anforderung oder -befehl nach Trip',
      'Triebfahrzeugf\u00FChrer kontaktiert Fahrdienstleiter und erh\u00E4lt Shunting-Genehmigung',
    ],
  },
  'SH-SB': {
    description: 'Ende des Shunting, R\u00FCckkehr zu Stand By',
    detailedDescription:
      'Wenn die Rangierarbeiten abgeschlossen sind, deaktiviert der Triebfahrzeugf\u00FChrer den Shunting-Modus. Das System kehrt zu Stand By zur\u00FCck, wo der Triebfahrzeugf\u00FChrer Zugdaten eingeben/validieren und die n\u00E4chste Mission oder Bewegung vorbereiten kann.',
    conditions: [
      'Ende des Rangierens (Triebfahrzeugf\u00FChrer beendet Rangieren oder Zug h\u00E4lt)',
      'Triebfahrzeugf\u00FChrer deaktiviert Shunting-Modus',
    ],
  },
  'NL-SB': {
    description: 'Non Leading-Einheit wird f\u00FChrend',
    detailedDescription:
      'Die Non Leading-Lokomotive oder das F\u00FChrerhaus wird zur f\u00FChrenden Einheit (z. B. nach einem Triebfahrzeugf\u00FChrerwechsel an einem Kopfbahnhof oder beim Abkuppeln vom Verband). Der Triebfahrzeugf\u00FChrer aktiviert dieses F\u00FChrerhaus und ETCS wechselt zu Stand By f\u00FCr einen neuen Missionsbeginn.',
    conditions: [
      'Diese Einheit wird die f\u00FChrende Einheit',
      'Triebfahrzeugf\u00FChrer aktiviert dieses F\u00FChrerhaus als f\u00FChrend',
    ],
  },
  'SL-SB': {
    description: 'Sleeping-Einheit erwacht als f\u00FChrend',
    detailedDescription:
      'Die Sleeping-ETCS-Bordausr\u00FCstung wird aktiv, wenn dieses F\u00FChrerhaus als f\u00FChrendes F\u00FChrerhaus bestimmt wird (z. B. Richtungswechsel an einem Kopfbahnhof im Wendezugbetrieb). Der Triebfahrzeugf\u00FChrer aktiviert den Fahrtisch und das System geht in Stand By f\u00FCr Datenvalidierung und Missionsbeginn.',
    conditions: [
      'Dieses F\u00FChrerhaus/Einheit wird die aktive f\u00FChrende Einheit',
      'Fahrtisch aktiviert',
    ],
  },
  'RV-FS': {
    description: 'Ende des Reversing, Wiederaufnahme der Vorw\u00E4rtsfahrt in Full Supervision',
    detailedDescription:
      'Nachdem die R\u00FCckw\u00E4rtsbewegung abgeschlossen ist (z. B. der Zug hat zum Bahnsteig zur\u00FCckgesetzt), w\u00E4hlt der Triebfahrzeugf\u00FChrer die Vorw\u00E4rtsrichtung. Wenn eine g\u00FCltige MA f\u00FCr Vorw\u00E4rtsbewegung verf\u00FCgbar ist, wechselt das System zu Full Supervision.',
    conditions: [
      'R\u00FCckw\u00E4rtsbewegung abgeschlossen',
      'Triebfahrzeugf\u00FChrer w\u00E4hlt Vorw\u00E4rtsrichtung',
      'G\u00FCltige MA f\u00FCr Vorw\u00E4rtsbewegung verf\u00FCgbar',
    ],
  },
  'FS-FS-MA-UPDATE': {
    description: 'MA-Verl\u00E4ngerung/-Aktualisierung in Full Supervision',
    detailedDescription:
      'W\u00E4hrend Full Supervision verl\u00E4ngert oder aktualisiert die Streckenausr\u00FCstung die Fahrterlaubnis (z. B. n\u00E4chstes Signal wechselt auf Fahrt, RBC sendet MA-Verl\u00E4ngerung). Dies ist der normale kontinuierliche Betrieb im Full Supervision-Modus, der den Zug mit aktualisierter Erlaubnis weiterfahren l\u00E4sst.',
    conditions: [
      'Neue oder verl\u00E4ngerte MA von der Streckenausr\u00FCstung empfangen',
      'Aktualisierte Streckenbeschreibung empfangen',
    ],
  },
  'SB-UN': {
    description: 'Missionsbeginn in Unfitted-Bereich',
    detailedDescription:
      'Beim Start einer Mission in einem Bereich ohne ETCS-Streckenausr\u00FCstung (Level 0) wechselt das System nach der Dateneingabe in den Unfitted-Modus. Es wird nur grundlegende H\u00F6chstgeschwindigkeits\u00FCberwachung bereitgestellt.',
    conditions: [
      'ETCS-Level als Level 0 bestimmt',
      'Keine ETCS-Streckenausr\u00FCstung im Bereich',
      'Fahrerdateneingabe abgeschlossen',
    ],
  },
  'SB-SN': {
    description: 'Missionsbeginn im Bereich des nationalen Systems',
    detailedDescription:
      'Beim Start einer Mission in einem Bereich, der von einem nationalen Zugsicherungssystem gesch\u00FCtzt wird, bestimmt ETCS das Level als NTC und aktiviert das entsprechende STM. Die \u00DCberwachung wird an das nationale System \u00FCbergeben.',
    conditions: [
      'ETCS-Level als NTC bestimmt',
      'STM verf\u00FCgbar und verbunden',
      'Streckenausr\u00FCstung des nationalen Systems erkannt',
    ],
  },
  'OS-SH': {
    description: 'Shunting-Befehl im On Sight-Modus',
    detailedDescription:
      'W\u00E4hrend der Fahrt im On Sight-Modus wird ein Shunting-Befehl empfangen (z. B. Ankunft an einer Rangierbahnhofeinfahrt). Das System wechselt in den Shunting-Modus f\u00FCr Rangierbewegungen mit geringer Geschwindigkeit.',
    conditions: [
      'Rangierbefehl von der Streckenausr\u00FCstung empfangen',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Shunting',
    ],
  },
  'LS-SR': {
    description: 'Triebfahrzeugf\u00FChrer aktiviert Override-Funktion in Limited Supervision',
    detailedDescription:
      'Wenn die Fahrterlaubnisbedingungen w\u00E4hrend Limited Supervision verloren gehen (z. B. Kommunikationsausfall, Dateninkonsistenz), f\u00E4llt das System in den Staff Responsible-Modus zur\u00FCck. Der Triebfahrzeugf\u00FChrer muss best\u00E4tigen und die Verantwortung \u00FCbernehmen.',
    conditions: [
      'MA-Bedingungen k\u00F6nnen nicht mehr aufrechterhalten werden',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt Staff Responsible-Modus',
    ],
  },
  'LS-OS': {
    description: 'Einfahrt in On Sight-Bereich aus Limited Supervision',
    detailedDescription:
      'W\u00E4hrend Limited Supervision f\u00E4hrt der Zug in einen Bereich mit einem On Sight-Betriebsartprofil ein. Das System wechselt in den On Sight-Modus f\u00FCr den geschwindigkeitsbeschr\u00E4nkten Abschnitt.',
    conditions: [
      'On Sight-Betriebsartprofil von der Streckenausr\u00FCstung empfangen',
      'Zug f\u00E4hrt in den On Sight-Betriebsartprofilbereich ein',
    ],
  },
  'UN-SN': {
    description: 'Nationales System erkannt aus Unfitted-Bereich',
    detailedDescription:
      'W\u00E4hrend im Unfitted-Modus (Level 0) f\u00E4hrt der Zug in einen Bereich mit einem nationalen Zugsicherungssystem ein. Das STM wird aktiviert und die \u00DCberwachung wird an das nationale System \u00FCbergeben.',
    conditions: [
      'Streckenausr\u00FCstung des nationalen Systems erkannt',
      'STM verf\u00FCgbar und kompatibel',
      'Level\u00FCbergang zu NTC',
    ],
  },
  'SN-UN': {
    description: 'Verlassen des STM National-Bereichs in Unfitted-Bereich',
    detailedDescription:
      'Der Zug verl\u00E4sst den vom nationalen System gesch\u00FCtzten Bereich und f\u00E4hrt in einen Unfitted-Abschnitt (Level 0). Das STM wird deaktiviert und das System bietet nur grundlegende H\u00F6chstgeschwindigkeits\u00FCberwachung.',
    conditions: [
      'Streckenausr\u00FCstung des nationalen Systems endet',
      'Keine ETCS-Streckenausr\u00FCstung vorhanden',
      'Level\u00FCbergang von NTC zu Level 0',
    ],
  },
  'FS-SB': {
    description: 'Missionsende aus Full Supervision',
    detailedDescription:
      'Wenn der Zug sein Ziel erreicht und zum Stillstand kommt, f\u00FChrt der Triebfahrzeugf\u00FChrer das Missionsende-Verfahren durch (z. B. Schlie\u00DFen des Fahrtisches oder Best\u00E4tigung des Missionsendes am DMI). Die Fahrterlaubnis wird freigegeben und das System kehrt zu Stand By zur\u00FCck, bereit f\u00FCr eine neue Mission oder Ausschalten.',
    conditions: [
      'Zug im Stillstand',
      'Missionsende-Verfahren vom Triebfahrzeugf\u00FChrer durchgef\u00FChrt',
    ],
  },
  'SR-SB': {
    description: 'Missionsende aus Staff Responsible',
    detailedDescription:
      'W\u00E4hrend im Staff Responsible-Modus kann der Triebfahrzeugf\u00FChrer die Mission beenden, wenn der Zug im Stillstand ist (z. B. Ankunft am Ziel ohne je eine MA erhalten zu haben). Das System kehrt zu Stand By zur\u00FCck.',
    conditions: [
      'Zug im Stillstand',
      'Missionsende-Verfahren vom Triebfahrzeugf\u00FChrer durchgef\u00FChrt',
    ],
  },
  'OS-SB': {
    description: 'Missionsende aus On Sight',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer beendet die Mission im On Sight-Modus mit dem Zug im Stillstand. Das System kehrt zu Stand By zur\u00FCck.',
    conditions: [
      'Zug im Stillstand',
      'Missionsende-Verfahren vom Triebfahrzeugf\u00FChrer durchgef\u00FChrt',
    ],
  },
  'LS-SB': {
    description: 'Missionsende aus Limited Supervision',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer beendet die Mission im Limited Supervision-Modus mit dem Zug im Stillstand. Das System kehrt zu Stand By zur\u00FCck.',
    conditions: [
      'Zug im Stillstand',
      'Missionsende-Verfahren vom Triebfahrzeugf\u00FChrer durchgef\u00FChrt',
    ],
  },
  'UN-SB': {
    description: 'Missionsende aus Unfitted',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer beendet die Mission im Unfitted-Modus (Level 0-Bereich) mit dem Zug im Stillstand. Das System kehrt zu Stand By zur\u00FCck.',
    conditions: [
      'Zug im Stillstand',
      'Missionsende-Verfahren vom Triebfahrzeugf\u00FChrer durchgef\u00FChrt',
    ],
  },
  'SN-SB': {
    description: 'Missionsende aus STM National',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer beendet die Mission im STM National-Modus mit dem Zug im Stillstand. Die STM-Sitzung wird geschlossen und das System kehrt zu Stand By zur\u00FCck.',
    conditions: [
      'Zug im Stillstand',
      'Missionsende-Verfahren vom Triebfahrzeugf\u00FChrer durchgef\u00FChrt',
      'STM-Sitzung geschlossen',
    ],
  },
  'PT-SB': {
    description: 'Missionsende aus Post Trip',
    detailedDescription:
      'Nach einem Trip-Ereignis und Best\u00E4tigung kann der Triebfahrzeugf\u00FChrer die Mission beenden, anstatt eine Wiederherstellung durchzuf\u00FChren. Das System kehrt zu Stand By f\u00FCr einen neuen Missionsbeginn zur\u00FCck.',
    conditions: [
      'Zug im Stillstand',
      'Missionsende-Verfahren vom Triebfahrzeugf\u00FChrer durchgef\u00FChrt',
    ],
  },
  'ANY-SF': {
    description: 'System Failure von jeder Betriebsart',
    detailedDescription:
      'Von jeder aktiven ETCS-Betriebsart, wenn die Bordausr\u00FCstung einen sicherheitskritischen internen Fehler erkennt (Hardware, Software oder Datenintegrit\u00E4t), wechselt sie sofort in den System Failure-Modus. Die Notbremse wird angewendet und der Triebfahrzeugf\u00FChrer muss nationale Vorschriften befolgen. Dieser \u00DCbergang kann von jeder Betriebsart auftreten.',
    conditions: [
      'Sicherheitskritischer Bordfehler erkannt',
    ],
  },
  'ANY-IS': {
    description: 'ETCS durch Triebfahrzeugf\u00FChrer von jeder Betriebsart isoliert',
    detailedDescription:
      'Von jeder Betriebsart kann der Triebfahrzeugf\u00FChrer den physischen ETCS-Isolierschalter bet\u00E4tigen, um die ETCS-Bordausr\u00FCstung vollst\u00E4ndig zu deaktivieren. Dies ist eine bewusste Handlung, die verwendet wird, wenn ETCS defekt ist und au\u00DFer Betrieb genommen werden muss. Alle ETCS-Funktionen enden sofort.',
    conditions: [
      'Triebfahrzeugf\u00FChrer bet\u00E4tigt den physischen ETCS-Isolierschalter',
    ],
  },
  'ANY-NP': {
    description: 'Stromverlust von jeder Betriebsart',
    detailedDescription:
      'Von jeder Betriebsart, wenn die ETCS-Bordausr\u00FCstung ihre Stromversorgung verliert (F\u00FChrerhausdeaktivierung, Stromausfall, Hauptschalter aus), wechselt das System zu No Power. Alle ETCS-Funktionen enden. Dies kann eine beabsichtigte Handlung (Missionsende) oder ein ungeplantes Ereignis (Stromausfall) sein.',
    conditions: [
      'ETCS-Bordausr\u00FCstung verliert Stromversorgung',
    ],
  },
  'SF-NP': {
    description: 'Neustart nach System Failure',
    detailedDescription:
      'Nach einem System Failure ist das Standard-Wiederherstellungsverfahren, die ETCS-Bordausr\u00FCstung auszuschalten (\u00DCbergang zu No Power) und dann wieder einzuschalten (No Power zu Stand By). Wenn der Fehler vor\u00FCbergehend war, startet das System m\u00F6glicherweise normal. Wenn der Fehler bestehen bleibt, kann eine Isolation erforderlich sein.',
    conditions: [
      'Triebfahrzeugf\u00FChrer schaltet ETCS f\u00FCr Wiederherstellungsversuch aus',
    ],
  },
  'IS-NP': {
    description: 'Ende der Isolation, Systemneustart',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer stellt den Isolierschalter in die Normalstellung zur\u00FCck. ETCS durchl\u00E4uft No Power (Einschaltsequenz) und dann Stand By nach Selbsttest. Dies stellt die ETCS-Funktionalit\u00E4t wieder her, wenn der zugrunde liegende Fehler behoben wurde.',
    conditions: [
      'Isolierschalter in Normalstellung zur\u00FCckgestellt',
    ],
  },
  'FS-AD': {
    description: 'ATO-Einschaltung \u2014 Automatic Driving beginnt',
    detailedDescription:
      'Wenn alle ATO-Einschaltbedingungen erf\u00FCllt sind und der Triebfahrzeugf\u00FChrer die Einschaltung am ATO-DMI best\u00E4tigt, wechselt ETCS von Full Supervision zu Automatic Driving. Das ATO-Bordsystem \u00FCbernimmt die Steuerung von Zugkraft und Bremsung, w\u00E4hrend ETCS die volle Sicherheits\u00FCberwachung beibeh\u00E4lt. Fahrterlaubnis, Geschwindigkeitsprofil und Bremskurven werden weiterhin durchgesetzt. Dieser \u00DCbergang ist in Subset-125 (ATO SRS) und der Subset-130 ATO-OB/ETCS-OB-Schnittstelle definiert.',
    conditions: [
      'ATO-Bordsystem ist im Zustand Ready for Engagement (RE)',
      'Triebfahrzeugf\u00FChrer best\u00E4tigt ATO-Einschaltung per DMI (GoA 2)',
      'G\u00FCltiges Fahrprofil vom ATO-Streckensystem empfangen',
      'Zug im Stillstand oder innerhalb des Einschaltgeschwindigkeitsfensters',
    ],
  },
  'AD-FS': {
    description: 'ATO-Ausschaltung \u2014 R\u00FCckkehr zu manuellem Fahren unter Full Supervision',
    detailedDescription:
      'Wenn der Triebfahrzeugf\u00FChrer die manuelle Kontrolle \u00FCbernimmt (durch Dr\u00FCcken der Ausschalttaste oder \u00DCbersteuerung der Zugkraft-/Bremssteuerung) oder wenn das ATO seine Fahrt beendet, wechselt das System von Automatic Driving zur\u00FCck zu Full Supervision. Der Triebfahrzeugf\u00FChrer \u00FCbernimmt die manuelle Steuerung mit kontinuierlicher ETCS-Geschwindigkeits\u00FCberwachung. Dies ist das normale, kontrollierte Ende des ATO-Betriebs.',
    conditions: [
      'Triebfahrzeugf\u00FChrer schaltet ATO per DMI oder Zugkraft-/Brems\u00FCbersteuerung aus, oder',
      'Ende des Fahrprofils erreicht, oder',
      'ATO f\u00FChrt kontrollierte Ausschaltung durch',
    ],
  },
  'AD-TR': {
    description: 'Trip bei Automatic Driving',
    detailedDescription:
      'Eine Sicherheitsbedingung verursacht einen Trip w\u00E4hrend des ATO-Betriebs. Das ETCS \u00FCbersteuert das automatische Fahren und wendet sofort die Notbremsung an.',
    conditions: [
      'Trip-Bedingung w\u00E4hrend automatischer Fahrt erkannt',
    ],
  },
  'AD-SH': {
    description: '\u00DCbergang zu Shunting aus Automatic Driving',
    detailedDescription:
      'In bestimmten Betriebsszenarien kann ein \u00DCbergang von Automatic Driving zu Shunting erforderlich sein (z. B. Ann\u00E4herung an einen Rangierbahnhof). ATO wird ausgeschaltet und ETCS wechselt in den Shunting-Modus mit seiner reduzierten \u00DCberwachung.',
    conditions: [
      'Rangieranforderung w\u00E4hrend des ATO-Betriebs best\u00E4tigt',
    ],
  },
  'SB-TR': {
    description: 'Trip aus Stand By',
    detailedDescription:
      'Eine Sicherheitsbedingung verursacht einen Trip im Stand By Modus. Das ETCS wendet sofort die Notbremsung an.',
    conditions: ['Vom System erkannte Trip-Bedingung'],
  },
  'SH-TR': {
    description: 'Trip w\u00E4hrend Rangierfahrt',
    detailedDescription:
      'Eine Sicherheitsbedingung verursacht einen Trip w\u00E4hrend des Rangierbetriebs. Das ETCS wendet sofort die Notbremsung an.',
    conditions: ['W\u00E4hrend des Rangierens erkannte Trip-Bedingung'],
  },
  'FS-NL': {
    description: '\u00DCbergang zu Non Leading aus Full Supervision',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer gibt an, dass diese Einheit nicht mehr die f\u00FChrende Traktionseinheit ist. Das ETCS wechselt in den Modus Non Leading.',
    conditions: [
      'Triebfahrzeugf\u00FChrer w\u00E4hlt Non Leading',
      'Andere Einheit \u00FCbernimmt f\u00FChrende Kontrolle',
    ],
  },
  'UN-TR': {
    description: 'Trip im Modus Unfitted',
    detailedDescription:
      'Eine Sicherheitsbedingung verursacht einen Trip im nicht ausger\u00FCsteten Bereich. Das ETCS wendet sofort die Notbremsung an.',
    conditions: ['Trip-Bedingung in nicht ausger\u00FCstetem Gebiet erkannt'],
  },
  'SN-TR': {
    description: 'Trip im Modus STM National',
    detailedDescription:
      'Eine Sicherheitsbedingung verursacht einen Trip unter dem nationalen System \u00FCber STM. Das ETCS wendet sofort die Notbremsung an.',
    conditions: ['Trip-Bedingung unter nationaler System\u00FCberwachung erkannt'],
  },
  'RV-SB': {
    description: 'Ende des R\u00FCckfahrens zu Stand By',
    detailedDescription:
      'Nach Abschluss der genehmigten R\u00FCckfahrbewegung wechselt das System zu Stand By zur erneuten Missionsvorbereitung.',
    conditions: [
      'R\u00FCckfahrbewegung abgeschlossen',
      'Zug steht',
    ],
  },
};
