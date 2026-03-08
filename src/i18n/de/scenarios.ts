import type { ScenarioTranslation } from '../types';

export const deScenarios: Record<string, ScenarioTranslation> = {
  'normal-start': {
    title: 'Normaler Missionsbeginn',
    description:
      'Begleiten Sie einen Triebfahrzeugf\u00FChrer durch die Standard-ETCS-Startsequenz: Einschalten, Dateneingabe, Empfang einer Fahrterlaubnis und Behandlung eines On Sight-Bereichs w\u00E4hrend der Fahrt.',
    category: 'Normalbetrieb',
    steps: [
      {
        situation:
          'Sie sind Triebfahrzeugf\u00FChrer und kommen fr\u00FCh morgens im Depot an. Sie steigen ins F\u00FChrerhaus und drehen den Hauptschl\u00FCssel, um die ETCS-Bordausr\u00FCstung einzuschalten. Das System f\u00FChrt seinen Selbsttest durch \u2014 pr\u00FCft Prozessoren, Speicher, Odometriesensoren und die Juridische Aufzeichnungseinheit. Alle Pr\u00FCfungen bestehen und der DMI-Bildschirm leuchtet auf und zeigt die Dateneingabefelder.',
        question:
          'ETCS wurde eingeschaltet und hat seinen Selbsttest erfolgreich abgeschlossen. In welche Betriebsart wechselt das System?',
        explanation:
          'Nach dem Einschalten und einem erfolgreichen Selbsttest geht ETCS immer in den Stand By (SB)-Modus. Dies ist die Eingangsbetriebsart, in der der Triebfahrzeugf\u00FChrer seine ID, Zugdaten eingeben und das ETCS-Level best\u00E4tigen muss, bevor eine Mission beginnen kann. Das System kann nicht direkt in Full Supervision gehen, da noch keine Fahrterlaubnis besteht.',
        hint: '\u00DCberlegen Sie, was geschehen muss, bevor der Zug fahren kann. Das System ben\u00F6tigt zuerst Fahrer- und Zugdaten.',
      },
      {
        situation:
          'Sie geben Ihre Fahrer-ID, Zugnummer ein und validieren die Zugdaten (L\u00E4nge: 200 m, H\u00F6chstgeschwindigkeit: 160 km/h, Bremseigenschaften). Das ETCS-Level wird als Level 2 best\u00E4tigt und die Bordausr\u00FCstung stellt eine Kommunikationssitzung mit dem Radio Block Centre (RBC) her. Das RBC sendet eine g\u00FCltige Fahrterlaubnis mit einer vollst\u00E4ndigen Streckenbeschreibung einschlie\u00DFlich Geschwindigkeitsprofil und Neigungsdaten.',
        question:
          'Sie haben die Dateneingabe abgeschlossen und eine vollst\u00E4ndige Fahrterlaubnis mit vollst\u00E4ndiger Streckenbeschreibung erhalten. In welche Betriebsart sollte das System wechseln?',
        explanation:
          'Wenn eine g\u00FCltige MA mit vollst\u00E4ndiger Streckenbeschreibung (Geschwindigkeitsprofil, Neigungen) empfangen wird, wechselt das System in die Full Supervision (FS). Dies ist der ideale Missionsbeginn \u2014 der Zug hat alles, was f\u00FCr maximalen ETCS-Schutz erforderlich ist. Staff Responsible w\u00FCrde nur verwendet, wenn keine MA verf\u00FCgbar w\u00E4re.',
        hint: 'Sie haben die bestm\u00F6glichen Bedingungen: vollst\u00E4ndige MA und vollst\u00E4ndige Streckendaten. Welche Betriebsart bietet das h\u00F6chste \u00DCberwachungsniveau?',
      },
      {
        situation:
          'Sie fahren mit 120 km/h in Full Supervision auf der Hauptstrecke. Alles ist normal \u2014 das DMI zeigt die zul\u00E4ssige Geschwindigkeit, die Zielentfernung und Ihre aktuelle Geschwindigkeit. Voraus hat der Fahrdienstleiter eine Fahrstra\u00DFe durch einen Bahnhof eingestellt, in dem die Gleisfreimeldeanlagen teilweise ausgefallen sind. Das RBC sendet eine aktualisierte MA mit einem On Sight-Betriebsartprofil f\u00FCr den kommenden 800 m-Abschnitt.',
        question:
          'Das RBC hat ein On Sight-Betriebsartprofil gesendet, da das vorausliegende Gleis aufgrund ausgefallener Gleisfreimeldung belegt sein k\u00F6nnte. In welche Betriebsart wechselt das System, wenn Sie in diesen Bereich einfahren?',
        explanation:
          'Wenn die Streckenausr\u00FCstung ein On Sight (OS)-Betriebsartprofil sendet, wechselt das System beim Einfahren in diesen Bereich in den OS-Modus. Im OS-Modus wird die Geschwindigkeit auf 30 km/h begrenzt und Sie m\u00FCssen auf Sicht fahren \u2014 bereit, innerhalb der Sichtweite anzuhalten. Die MA bleibt g\u00FCltig; nur die \u00DCberwachungsbetriebsart \u00E4ndert sich, um die unsichere Gleisbelegung widerzuspiegeln.',
        hint: 'Das Gleis voraus k\u00F6nnte belegt sein. Welche Betriebsart erfordert, dass der Triebfahrzeugf\u00FChrer bereit ist, auf Sicht anzuhalten?',
      },
      {
        situation:
          'Sie fahren vorsichtig mit 25 km/h durch den On Sight-Bereich und achten sorgf\u00E4ltig auf jedes Hindernis. Der Abschnitt ist frei, und nach 800 Metern passieren Sie das Ende des OS-Betriebsartprofilbereichs. Die Gleisfreimeldung funktioniert jenseits dieses Punktes wieder normal und die vollst\u00E4ndigen Streckenbeschreibungsdaten sind verf\u00FCgbar.',
        question:
          'Sie haben den On Sight-Bereich sicher passiert. Das vorausliegende Gleis hat funktionierende Gleisfreimeldung und vollst\u00E4ndige Streckendaten sind verf\u00FCgbar. In welche Betriebsart wechselt das System zur\u00FCck?',
        explanation:
          'Sobald der Zug den On Sight-Bereich verl\u00E4sst und die vollst\u00E4ndige Streckenbeschreibung mit normalen Bedingungen fortgesetzt wird, wechselt das System automatisch zur\u00FCck zur Full Supervision (FS). Dies ist die Standardwiederherstellung: OS ist eine vor\u00FCbergehende Einschr\u00E4nkung f\u00FCr einen bestimmten Abschnitt, und FS wird wieder aufgenommen, wenn dieser Abschnitt endet.',
        hint: 'Die Bedingungen, die den On Sight-Modus verursacht haben, gelten nicht mehr. Welche Betriebsart war vor dem Eintritt in den OS-Bereich aktiv?',
      },
    ],
  },
  'trip-recovery': {
    title: 'Trip und Wiederherstellung',
    description:
      'Erleben Sie das Notfall-Trip-Verfahren: Was passiert, wenn ein Zug sein Fahrerlaubnisende \u00FCberf\u00E4hrt, und der schrittweise Wiederherstellungsprozess unter Einbeziehung von Triebfahrzeugf\u00FChrer, Fahrdienstleiter und ETCS-System.',
    category: 'Gest\u00F6rtbetrieb',
    steps: [
      {
        situation:
          'Sie fahren mit 80 km/h in Full Supervision und n\u00E4hern sich einem Bahnhof, an dem das n\u00E4chste Signal Halt zeigt. Das DMI zeigt die Bremskurve und die Zielgeschwindigkeit von 0 km/h am Fahrerlaubnisende (EOA). Sie versch\u00E4tzen die Bremsentfernung \u2014 vielleicht ist die Schiene nass und die Adh\u00E4sion schlecht. Trotz des Betriebsbremseingriffs rutscht der Zug 15 Meter \u00FCber das EOA hinaus.',
        question:
          'Der Zug hat das Fahrerlaubnisende \u00FCberfahren. ETCS erkennt, dass der Zug das EOA passiert hat. Was passiert sofort?',
        explanation:
          'Das \u00DCberfahren des Fahrerlaubnisendes (EOA) ist der kritischste Sicherheitsversto\u00DF in ETCS. Das System geht sofort in den Trip-Modus (TR) und befiehlt eine volle Notbremsung. Dies ist die grundlegende Sicherheitsfunktion von ETCS \u2014 zu verhindern, dass Z\u00FCge ungesch\u00FCtztes Gleis befahren, wo eine Kollision auftreten k\u00F6nnte.',
        hint: 'Dies ist ein sicherheitskritisches Ereignis. Der Zug hat seine sichere Grenze \u00FCberschritten. Welches ist die Notfallbetriebsart?',
      },
      {
        situation:
          'Die Notbremse wurde angewendet und der Zug verz\u00F6gert schnell. Nach einigen angespannten Sekunden kommt der Zug etwa 40 Meter jenseits des EOA zum vollst\u00E4ndigen Stillstand. Das DMI zeigt die Trip-Anzeige deutlich an. Ihr Herz rast, aber Sie m\u00FCssen dem Wiederherstellungsverfahren folgen. Sie dr\u00FCcken die Best\u00E4tigungstaste am DMI.',
        question:
          'Der Zug hat angehalten und Sie haben den Trip am DMI best\u00E4tigt. In welche Betriebsart wechselt das System f\u00FCr die Wiederherstellungsphase?',
        explanation:
          'Nach einem Trip, sobald der Zug zum Stillstand kommt und der Triebfahrzeugf\u00FChrer den Trip am DMI best\u00E4tigt, wechselt das System in den Post Trip (PT)-Modus. Dies ist ein kontrollierter Wiederherstellungszustand \u2014 der Zug kann sich nicht vorw\u00E4rts bewegen, und der Triebfahrzeugf\u00FChrer muss den Fahrdienstleiter kontaktieren, bevor weitere Ma\u00DFnahmen ergriffen werden. PT gew\u00E4hrleistet eine prozedurale Pause f\u00FCr die Sicherheitsbewertung.',
        hint: 'Nach dem Notstopp ben\u00F6tigt das System einen Wiederherstellungszustand. Es ist noch nicht sicher, sich zu bewegen \u2014 welche Betriebsart behandelt den Zeitraum zwischen Trip und Wiederaufnahme der Fahrt?',
      },
      {
        situation:
          'Sie sind im Post Trip-Modus. Der Zug steht 40 Meter jenseits des Halt zeigenden Signals. Sie kontaktieren den Fahrdienstleiter per GSM-R-Funk und melden das Trip-Ereignis mit Angabe Ihrer Position und Zugnummer. Der Fahrdienstleiter pr\u00FCft das Stellwerk und best\u00E4tigt, dass der Durchrutschweg jenseits des Signals frei ist und keine konfligierende Fahrstra\u00DFe eingestellt ist. Der Fahrdienstleiter gibt Ihnen eine m\u00FCndliche Genehmigung zum Weiterfahren.',
        question:
          'Der Fahrdienstleiter hat best\u00E4tigt, dass der Fahrweg sicher ist und Sie zum Weiterfahren autorisiert. Sie fordern am DMI an, sich vorw\u00E4rts zu bewegen. In welche Betriebsart wechselt das System?',
        explanation:
          'Nach einem Trip ist die Standardwiederherstellung, im Modus Staff Responsible (SR) weiterzufahren. Der Triebfahrzeugf\u00FChrer hat eine m\u00FCndliche Genehmigung vom Fahrdienstleiter erhalten und fordert den Staff Responsible-Modus am DMI an. Im Staff Responsible-Modus \u00FCberwacht ETCS eine H\u00F6chstgeschwindigkeit (40 km/h), aber der Triebfahrzeugf\u00FChrer \u00FCbernimmt die Verantwortung f\u00FCr sichere Bewegung. Voll\u00FCberwachung kann noch nicht eingenommen werden, da zu diesem Zeitpunkt keine MA verf\u00FCgbar ist.',
        hint: 'Sie haben eine m\u00FCndliche Genehmigung vom Fahrdienstleiter, aber keine elektronische Fahrterlaubnis vom RBC. Welche Betriebsart erlaubt Bewegung unter Verantwortung des Triebfahrzeugf\u00FChrers?',
      },
      {
        situation:
          'Sie fahren vorsichtig mit 35 km/h im Staff Responsible-Modus. Als Sie das n\u00E4chste Signal passieren (das einen Fahrtbegriff zeigt), \u00FCberf\u00E4hrt der Zug eine Balisengruppe, die eine neue Fahrterlaubnis vom RBC \u00FCbertr\u00E4gt. Die MA enth\u00E4lt eine vollst\u00E4ndige Streckenbeschreibung mit Geschwindigkeitsprofil und Neigungsdaten f\u00FCr die vorausliegende Strecke.',
        question:
          'Sie haben eine g\u00FCltige Fahrterlaubnis mit vollst\u00E4ndiger Streckenbeschreibung empfangen, w\u00E4hrend Sie im Staff Responsible-Modus sind. In welche Betriebsart wechselt das System?',
        explanation:
          'Wenn eine g\u00FCltige MA mit vollst\u00E4ndiger Streckenbeschreibung empfangen wird, w\u00E4hrend man sich im Staff Responsible-Modus befindet, wechselt das System automatisch zur Full Supervision (FS). Dies ist der normale Wiederherstellungspfad: SR ist eine vor\u00FCbergehende eingeschr\u00E4nkte Betriebsart, und der Empfang einer ordnungsgem\u00E4\u00DFen MA stellt den vollen ETCS-Schutz wieder her.',
        hint: 'Sie haben nun alles, was f\u00FCr das h\u00F6chste \u00DCberwachungsniveau erforderlich ist. Was ist die prim\u00E4re Betriebsart von ETCS?',
      },
      {
        situation:
          'Sie haben Ihre Fahrt erfolgreich abgeschlossen und sind an der Endstation angekommen. Der Zug steht am Bahnsteig. Es ist das Ende Ihrer Mission \u2014 Sie m\u00FCssen ETCS herunterfahren und den Zug dem n\u00E4chsten Triebfahrzeugf\u00FChrer \u00FCbergeben. Sie schlie\u00DFen den Fahrtisch und schalten die ETCS-Bordausr\u00FCstung aus.',
        question:
          'Sie schalten ETCS am Ende Ihrer Mission aus. Das System kehrt zuerst zu Stand By zur\u00FCck, wenn Sie die Mission beenden. Was passiert dann, wenn Sie den Strom abschalten?',
        explanation:
          'Wenn die ETCS-Bordausr\u00FCstung ausgeschaltet wird, geht das System in den No Power (NP)-Modus. Alle ETCS-Funktionen enden \u2014 kein DMI, keine \u00DCberwachung, keine Kommunikation. Dies ist der nat\u00FCrliche Missionsende-Zustand. Isolation (IS) ist etwas anderes: das ist eine absichtliche Deaktivierung eines eingeschalteten Systems per Isolierschalter.',
        hint: 'Die Ausr\u00FCstung hat keine Stromversorgung. Was ist der grundlegendste nicht-betriebliche Zustand?',
      },
    ],
  },
  'shunting-ops': {
    title: 'Rangierbetrieb',
    description:
      'Lernen Sie, wie Z\u00FCge in den Shunting-Modus wechseln und ihn verlassen: f\u00FCr Rangierarbeiten wie das Kuppeln von Wagen und das Zusammenstellen von Z\u00FCgen vor der Abfahrt auf die Hauptstrecke.',
    category: 'Rangierbetrieb',
    steps: [
      {
        situation:
          'Sie sind in einem Rangierbahnhof. ETCS ist nach dem Einschalten und der Dateneingabe in Stand By. Der Rangierleiter weist Sie an, Ihre Lokomotive zum Gleis 3 zu rangieren, um an einen Wagenzug mit Reisezugwagen zu kuppeln. Sie dr\u00FCcken die Rangieranforderungstaste am DMI.',
        question:
          'Sie haben Rangieren aus Stand By angefordert. Das System akzeptiert die Anforderung. In welche Betriebsart wechselt ETCS?',
        explanation:
          'Wenn eine Rangieranforderung aus Stand By gestellt wird, wechselt das System in den Shunting-Modus (SH). Im Shunting-Modus \u00FCberwacht ETCS eine H\u00F6chstgeschwindigkeit von 30 km/h, bietet aber keine Fahrterlaubnis oder Fahrwegschutz. Der Triebfahrzeugf\u00FChrer ist verantwortlich f\u00FCr die Beobachtung des vorausliegenden Gleises und die Befolgung der Anweisungen des Rangierleiters.',
        hint: 'Sie m\u00FCssen Rangierbewegungen mit geringer Geschwindigkeit durchf\u00FChren. Welche Betriebsart ist speziell f\u00FCr den Rangierbetrieb konzipiert?',
      },
      {
        situation:
          'Sie haben erfolgreich an die Reisezugwagen gekuppelt und alle Rangierbewegungen abgeschlossen. Der Zug ist nun zusammengestellt und bereit f\u00FCr seine Hauptstreckenabfahrt. Sie deaktivieren den Shunting-Modus am DMI, um sich auf den Beginn der Hauptstreckenmission vorzubereiten.',
        question:
          'Das Rangieren ist abgeschlossen und Sie haben den Shunting-Modus deaktiviert. In welche Betriebsart kehrt das System zur\u00FCck?',
        explanation:
          'Wenn der Shunting-Modus deaktiviert wird, kehrt das System zum Stand By (SB)-Modus zur\u00FCck. Dies ist die zentrale Eingangsbetriebsart \u2014 von hier aus k\u00F6nnen Sie Zugdaten validieren (die sich nach dem Kuppeln ge\u00E4ndert haben k\u00F6nnen) und die Hauptstreckenmission vorbereiten. SB ist immer der Zwischenschritt zwischen Rangieren und Betriebsarten.',
        hint: 'Nach dem Rangieren muss der Triebfahrzeugf\u00FChrer Daten validieren und die n\u00E4chste Mission vorbereiten. Welche Betriebsart dient als Eingang zu allen Betriebsarten?',
      },
      {
        situation:
          'Zur\u00FCck in Stand By validieren Sie die aktualisierten Zugdaten (der Zug ist jetzt l\u00E4nger mit den Wagen). Das ETCS-Level wird als Level 2 best\u00E4tigt und das RBC stellt die Kommunikation her. Eine g\u00FCltige Fahrterlaubnis mit vollst\u00E4ndiger Streckenbeschreibung wird f\u00FCr Ihre Abfahrtstrecke vom Bahnhof empfangen.',
        question:
          'Die Zugdaten sind validiert und eine vollst\u00E4ndige Fahrterlaubnis wurde f\u00FCr die Abfahrt empfangen. In welche Betriebsart wechselt das System f\u00FCr die Hauptstreckenabfahrt?',
        explanation:
          'Mit abgeschlossener Dateneingabe, einer g\u00FCltigen MA und vollst\u00E4ndiger Streckenbeschreibung wechselt das System in die Full Supervision (FS). Dies ist das ideale Abfahrtsszenario \u2014 der Zug hat alles, was f\u00FCr maximalen ETCS-Schutz auf der Hauptstrecke erforderlich ist.',
        hint: 'Sie haben alle Bedingungen f\u00FCr die sicherste Betriebsart: vollst\u00E4ndige MA und vollst\u00E4ndige Streckendaten.',
      },
    ],
  },
  'non-equipped-crossing': {
    title: '\u00DCberquerung nicht ausger\u00FCsteter Bereiche',
    description:
      'Navigieren Sie eine grenz\u00FCberschreitende Fahrt, die von ETCS-Gebiet in nicht ausger\u00FCstete Strecke, zur\u00FCck zu ETCS und dann in einen Bereich mit einem nationalen Zugsicherungssystem f\u00FChrt.',
    category: 'Grenz\u00FCberschreitender Betrieb',
    steps: [
      {
        situation:
          'Sie fahren einen grenz\u00FCberschreitenden G\u00FCterzug mit 100 km/h in Full Supervision auf einer ETCS Level 2-Hauptstrecke. Die vorausliegende Strecke kreuzt einen Nebenstreckenabschnitt, der nicht mit ETCS-Streckenausr\u00FCstung ausgestattet ist. Die Balisengruppe k\u00FCndigt einen Level\u00FCbergang von Level 2 zu Level 0 an. Es gibt keine ETCS-Balisen, keine RBC-Kommunikation und kein nationales Zugsicherungssystem auf diesem Abschnitt.',
        question:
          'Der Zug f\u00E4hrt in einen Abschnitt ohne ETCS-Streckenausr\u00FCstung (Level 0) und ohne nationales System ein. In welche Betriebsart wechselt ETCS?',
        explanation:
          'Wenn der Zug in einen Bereich ohne ETCS-Streckenausr\u00FCstung (Level 0) einf\u00E4hrt und kein nationales System \u00FCber STM verf\u00FCgbar ist, wechselt das System in den Unfitted (UN)-Modus. ETCS bietet nur grundlegende H\u00F6chstgeschwindigkeits\u00FCberwachung basierend auf nationalen Werten. Der Triebfahrzeugf\u00FChrer muss ortsfeste Signale und nationale Betriebsvorschriften befolgen. STM National (SN) w\u00FCrde nur gelten, wenn ein nationales System vorhanden w\u00E4re.',
        hint: 'Es gibt keine ETCS-Streckenausr\u00FCstung und kein nationales System. Die Strecke ist vollst\u00E4ndig \u201Enicht ausger\u00FCstet\u201C. Welche Betriebsart behandelt Level 0?',
      },
      {
        situation:
          'Sie sind 20 Kilometer durch den nicht ausger\u00FCsteten Abschnitt gefahren und haben ortsfeste Signale und Geschwindigkeitstafeln befolgt. Voraus sehen Sie die ETCS-\u00DCbergangstafel, die anzeigt, dass Sie wieder in einen ETCS-ausger\u00FCsteten Bereich einfahren. Der Zug passiert eine Balisengruppe, die einen Level\u00FCbergang von Level 0 zu Level 2 ank\u00FCndigt. Das RBC hat jedoch \u00DCberlastung und kann nicht sofort eine Fahrterlaubnis bereitstellen.',
        question:
          'Sie fahren wieder in einen ETCS-ausger\u00FCsteten Bereich (Level 2) ein, aber es ist noch keine Fahrterlaubnis vom RBC verf\u00FCgbar. In welche Betriebsart wechselt das System?',
        explanation:
          'Beim \u00DCbergang von einem nicht ausger\u00FCsteten Bereich in einen ETCS-ausger\u00FCsteten Bereich ohne g\u00FCltige MA wechselt das System in den Modus Staff Responsible (SR). Dies ist die sichere R\u00FCckfallbetriebsart: Der Triebfahrzeugf\u00FChrer best\u00E4tigt den Staff Responsible-Modus und f\u00E4hrt unter eigener Verantwortung mit der eingeschr\u00E4nkten H\u00F6chstgeschwindigkeit (40 km/h) weiter, bis eine MA vom RBC erhalten werden kann.',
        hint: 'Sie befinden sich in ETCS-Gebiet, haben aber keine Fahrterlaubnis. Welche Betriebsart erlaubt Bewegung unter Verantwortung des Triebfahrzeugf\u00FChrers ohne MA?',
      },
      {
        situation:
          'Nach einigen Minuten im Staff Responsible-Modus behebt das RBC seine \u00DCberlastung und sendet eine g\u00FCltige Fahrterlaubnis mit vollst\u00E4ndiger Streckenbeschreibung \u00FCber die Funkverbindung. Die Bordausr\u00FCstung empf\u00E4ngt die MA und \u00FCberpr\u00FCft ihre Integrit\u00E4t.',
        question:
          'Eine g\u00FCltige MA mit vollst\u00E4ndiger Streckenbeschreibung wurde vom RBC empfangen. In welche Betriebsart wechselt das System?',
        explanation:
          'Der Empfang einer g\u00FCltigen MA mit vollst\u00E4ndiger Streckenbeschreibung im Staff Responsible-Modus l\u00F6st einen automatischen \u00DCbergang zur Full Supervision (FS) aus. Dies ist der normale Upgrade-Pfad \u2014 SR ist eine vor\u00FCbergehende R\u00FCckfallbetriebsart, und FS bietet den vollen Schutz, f\u00FCr den ETCS ausgelegt ist.',
        hint: 'Die Bedingungen sind nun ideal: vollst\u00E4ndige MA, vollst\u00E4ndige Streckendaten. Was ist die h\u00F6chste \u00DCberwachungsbetriebsart?',
      },
      {
        situation:
          'Weiter auf der Strecke n\u00E4hern Sie sich der Grenze zum Nachbarland. Dessen Eisenbahn ist durch ein nationales Zugsicherungssystem (PZB) gesch\u00FCtzt. Die ETCS-Streckenausr\u00FCstung sendet ein Betriebsartprofil f\u00FCr das nationale System, und Ihr Zug ist mit dem entsprechenden STM ausger\u00FCstet. Ein Level\u00FCbergang von ETCS Level 2 zu NTC wird befohlen.',
        question:
          'Der Zug f\u00E4hrt in einen Bereich ein, der von einem nationalen System (PZB) \u00FCber STM gesch\u00FCtzt wird. In welche Betriebsart wechselt ETCS?',
        explanation:
          'Wenn der Zug in einen Bereich einf\u00E4hrt, der von einem nationalen Zugsicherungssystem gesch\u00FCtzt wird und ein kompatibles STM hat, wechselt ETCS in den STM National (SN)-Modus. Das STM \u00FCbernimmt die \u00DCberwachung unter Verwendung der nationalen Systemregeln und -ausr\u00FCstung. Dies unterscheidet sich vom Unfitted (UN)-Modus, der gilt, wenn \u00FCberhaupt kein Schutzsystem vorhanden ist.',
        hint: 'Ein nationales Zugsicherungssystem ist vorhanden und der Zug hat das STM, um damit zu kommunizieren. Welche Betriebsart delegiert an das nationale System?',
      },
    ],
  },
  'system-failure': {
    title: 'System Failure-Behandlung',
    description:
      'Behandeln Sie einen sicherheitskritischen Bordfehler: von der anf\u00E4nglichen Notfallreaktion \u00FCber die Isolation, den Betrieb nach nationalen Vorschriften bis zur letztendlichen Systemwiederherstellung.',
    category: 'St\u00F6rung und Wiederherstellung',
    steps: [
      {
        situation:
          'Sie fahren mit 140 km/h in Full Supervision auf einer Hochgeschwindigkeitsstrecke. Pl\u00F6tzlich erkennt die ETCS-Bordausr\u00FCstung einen internen sicherheitskritischen Fehler \u2014 der Odometrieprozessor hat inkonsistente Messwerte erzeugt und das System kann keine genaue Geschwindigkeitsmessung mehr gew\u00E4hrleisten. Die Bordausr\u00FCstung stellt fest, dass sie die Zugbewegung nicht mehr sicher \u00FCberwachen kann.',
        question:
          'ETCS hat einen sicherheitskritischen internen Fehler erkannt und kann keine sichere \u00DCberwachung mehr gew\u00E4hrleisten. In welche Betriebsart wechselt das System?',
        explanation:
          'Wenn die ETCS-Bordausr\u00FCstung einen sicherheitskritischen Fehler erkennt, der sie daran hindert, eine sichere \u00DCberwachung zu gew\u00E4hrleisten, wechselt sie in den System Failure (SF)-Modus und wendet sofort die Notbremse an. Dies unterscheidet sich von einer Trip (TR), die durch eine externe Sicherheitsverletzung (\u00DCberfahren des EOA) verursacht wird. SF bedeutet, dass das System selbst fehlerhaft ist und nicht vertraut werden kann.',
        hint: 'Der Fehler liegt innerhalb der ETCS-Ausr\u00FCstung selbst. Das System hat seine F\u00E4higkeit zur sicheren \u00DCberwachung verloren. Welche Betriebsart zeigt einen Bordausr\u00FCstungsfehler an?',
      },
      {
        situation:
          'Die Notbremse hat den Zug auf der freien Strecke zum Stillstand gebracht. Das DMI zeigt die System Failure-Anzeige. Sie versuchen einen Neustart \u2014 Sie schalten ETCS aus und wieder ein. Allerdings schl\u00E4gt der Selbsttest erneut fehl: der Odometrieprozessorfehler ist dauerhaft. ETCS kann nicht normal starten. Sie m\u00FCssen den Zug zum n\u00E4chsten Bahnhof f\u00FCr die Instandhaltung bringen. Sie entscheiden sich, den physischen ETCS-Isolierschalter zu verwenden.',
        question:
          'Der Fehler ist dauerhaft und ETCS kann nicht neu starten. Sie bet\u00E4tigen den physischen Isolierschalter, um ETCS vollst\u00E4ndig zu deaktivieren. In welche Betriebsart versetzt dies das System?',
        explanation:
          'Die Bet\u00E4tigung des physischen ETCS-Isolierschalters versetzt das System in den Isolation-Modus (IS). Dies deaktiviert absichtlich alle ETCS-Funktionen. Anders als No Power (NP), wo das System einfach keinen Strom hat, ist Isolation eine aktive Entscheidung des Triebfahrzeugf\u00FChrers, ETCS au\u00DFer Betrieb zu nehmen. Der Zug f\u00E4hrt nun vollst\u00E4ndig nach nationalen Vorschriften ohne ETCS-Schutz.',
        hint: 'Der Triebfahrzeugf\u00FChrer deaktiviert ETCS absichtlich mit einem physischen Schalter. Dies ist kein Ausschalten, sondern eine aktive Isolation. Welche Betriebsart repr\u00E4sentiert dies?',
      },
      {
        situation:
          'Mit isoliertem ETCS fahren Sie den Zug nur nach nationalen Vorschriften. Sie kontaktieren den Fahrdienstleiter, der Sie autorisiert, mit sehr geringer Geschwindigkeit zum n\u00E4chsten Bahnhof 8 km voraus zu fahren. Sie fahren vorsichtig und beachten ortsfeste Signale und Geschwindigkeitstafeln. Sie kommen sicher am Bahnsteig an und der Zug wird f\u00FCr die Instandhaltung aus dem Dienst genommen.',
        question:
          'Die Instandhaltung hat den Odometrieprozessor repariert und muss ETCS wiederherstellen. Der erste Schritt ist, den Isolierschalter in die Normalstellung zur\u00FCckzustellen. In welche Betriebsart wechselt ETCS, wenn der Isolierschalter zur\u00FCckgestellt wird?',
        explanation:
          'Wenn der Isolierschalter in die Normalstellung zur\u00FCckgestellt wird, wechselt ETCS zuerst in den No Power (NP)-Modus. Das System muss dann die vollst\u00E4ndige Einschaltsequenz (NP zu SB) einschlie\u00DFlich Selbsttest durchlaufen. Es springt nicht direkt zu Stand By \u2014 die Isolierschalterr\u00FCckstellung l\u00F6st eine saubere Neustartsequenz \u00FCber den stromlosen Zustand aus.',
        hint: 'Die R\u00FCckstellung des Isolierschalters ist wie ein Neustart. Das System muss seine vollst\u00E4ndige Einschaltsequenz durchlaufen. Was ist der Ausgangszustand vor dem Einschalten?',
      },
      {
        situation:
          'Das Instandhaltungsteam schaltet die ETCS-Bordausr\u00FCstung ein. Diesmal l\u00E4uft der Selbsttest erfolgreich \u2014 der reparierte Odometrieprozessor besteht alle Pr\u00FCfungen, die Speicherintegrit\u00E4t wird verifiziert und alle Subsysteme melden Normalstatus. Das DMI leuchtet auf und zeigt den Dateneingabebildschirm.',
        question:
          'ETCS wurde eingeschaltet und der Selbsttest nach der Reparatur bestanden. In welche Betriebsart wechselt das System?',
        explanation:
          'Nach erfolgreichem Einschalten und Selbsttest wechselt ETCS immer in den Stand By (SB)-Modus, unabh\u00E4ngig davon, was zuvor passiert ist. Dies ist die Standard-Startsequenz: NP zu SB. Von Stand By aus kann eine neue Mission mit frischer Dateneingabe gestartet werden. Das System wurde vollst\u00E4ndig in den Normalbetrieb zur\u00FCckversetzt.',
        hint: 'Dies ist die Standard-Einschaltsequenz. Nach dem Selbsttest wartet das System auf die Fahrerdateneingabe in welcher Betriebsart?',
      },
    ],
  },
  'multiple-traction': {
    title: 'Mehrtraktionsbetrieb',
    description:
      'Verstehen Sie, wie ETCS Z\u00FCge mit mehreren angetriebenen Einheiten behandelt: Konfiguration einer Lokomotive als nicht f\u00FChrend, Betrieb im Verband und anschlie\u00DFende Neukonfiguration f\u00FCr den Einzelbetrieb.',
    category: 'Sonderbetrieb',
    steps: [
      {
        situation:
          'Sie sind im F\u00FChrerhaus einer zweiten Lokomotive, die an das Ende eines schweren G\u00FCterzuges gekuppelt wird. Die f\u00FChrende Lokomotive hat ihr ETCS bereits in Full Supervision und steuert den Zug. Ihre Lokomotive wird zus\u00E4tzliche Zugkraft liefern, darf aber keine konfligierenden Bremsbefehle aussenden oder eine separate Fahrterlaubnis halten. Sie w\u00E4hlen \u201ENon Leading\u201C am DMI.',
        question:
          'Sie haben dieses ETCS als Non Leading konfiguriert, weil eine andere Lokomotive die Kontrolle hat. In welche Betriebsart wechselt das System?',
        explanation:
          'Wenn der Triebfahrzeugf\u00FChrer Non Leading w\u00E4hlt, wechselt das System in den Non Leading (NL)-Modus. In diesem Modus ist ETCS aktiv und kennt seinen Status, h\u00E4lt aber keine MA, gibt keine Bremsbefehle aus und \u00FCberwacht keine Geschwindigkeit. Dies verhindert konfligierende Steuerung zwischen mehreren ETCS-Einheiten im selben Zug. Sleeping (SL) ist anders \u2014 das ist f\u00FCr ein inaktives F\u00FChrerhaus, nicht f\u00FCr eine aktiv besetzte nicht f\u00FChrende Einheit.',
        hint: 'Diese Einheit hat einen Triebfahrzeugf\u00FChrer, ist aber nicht die steuernde Einheit. Sie muss aktiv, aber passiv sein. Welche Betriebsart ist f\u00FCr eine besetzte nicht f\u00FChrende Traktionseinheit vorgesehen?',
      },
      {
        situation:
          'Der G\u00FCterzug schlie\u00DFt seine Fahrt ab. Im Zielrangierbahnhof werden die Lokomotiven abgekuppelt. Ihre Lokomotive ist nun eigenst\u00E4ndig und muss f\u00FCr ihre n\u00E4chste Mission \u2014 eine Leerfahrt zum Depot \u2014 unabh\u00E4ngig betrieben werden. Sie konfigurieren das F\u00FChrerhaus als f\u00FChrende Einheit um, indem Sie die entsprechende Option am DMI w\u00E4hlen.',
        question:
          'Sie konfigurieren diese Lokomotive als f\u00FChrende Einheit f\u00FCr den unabh\u00E4ngigen Betrieb um. In welche Betriebsart wechselt ETCS?',
        explanation:
          'Wenn eine nicht f\u00FChrende Einheit zur f\u00FChrenden Einheit wird, wechselt ETCS in den Stand By (SB)-Modus. Dies erm\u00F6glicht dem Triebfahrzeugf\u00FChrer, Zugdaten f\u00FCr die neue Mission einzugeben oder zu validieren (die Zugdaten werden anders sein \u2014 Einzellokomotive statt vollst\u00E4ndiger Verband). Stand By ist immer der Zugang zum Start einer neuen Mission.',
        hint: 'Die Lokomotive ist nun unabh\u00E4ngig und muss eine neue Mission starten. Welche Betriebsart ist die Eingangsbetriebsart, in der die Dateneingabe erfolgt?',
      },
      {
        situation:
          'Sie aktualisieren die Zugdaten f\u00FCr die Leerfahrt (viel k\u00FCrzere L\u00E4nge, andere Bremseigenschaften). ETCS stellt eine neue RBC-Sitzung her und empf\u00E4ngt eine Fahrterlaubnis mit Streckenbeschreibung f\u00FCr die Strecke zum Depot.',
        question:
          'Die Zugdaten sind validiert und eine Fahrterlaubnis mit vollst\u00E4ndiger Streckenbeschreibung wurde f\u00FCr die Depotfahrt empfangen. In welche Betriebsart wechselt das System?',
        explanation:
          'Mit validierten Zugdaten, einer g\u00FCltigen MA und vollst\u00E4ndiger Streckenbeschreibung wechselt das System in die Full Supervision (FS). Dies ist der Standard-Missionsbeginn mit vollem ETCS-Schutz \u2014 derselbe \u00DCbergang unabh\u00E4ngig davon, ob der Zug zuvor im Non Leading-Modus oder einer anderen Betriebsart war. Stand By bietet immer einen sauberen Neustart.',
        hint: 'Sie haben alle erforderlichen Daten f\u00FCr maximalen Schutz: MA, Geschwindigkeitsprofil, Neigung. Was ist die sicherste Betriebsart?',
      },
    ],
  },
};
