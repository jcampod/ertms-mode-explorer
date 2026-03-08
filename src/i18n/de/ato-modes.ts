import type { ATOStateTranslation } from '../types';

export const deATOStates: Record<string, ATOStateTranslation> = {
  NP: {
    name: 'No Power',
    description: 'Das ATO-Bordsystem ist ausgeschaltet. Keine ATO-Funktionalit\u00E4t verf\u00FCgbar.',
    detailedDescription:
      'No Power ist der Ausgangszustand des ATO-Bordsystems, wenn die ATO-Ausr\u00FCstung des Zuges nicht unter Spannung steht. In diesem Zustand werden keine ATO-Funktionen ausgef\u00FChrt und das System hat kein Wissen \u00FCber Zugposition, Fahrprofil oder ETCS-Status. Der \u00DCbergang aus NP erfolgt, wenn das ATO-System Strom erh\u00E4lt und seine Konfigurationssequenz beginnt.',
    keyCharacteristics: [
      'ATO-System vollst\u00E4ndig inaktiv',
      'Keine Kommunikation mit ETCS-Bordausr\u00FCstung',
      'Kein Fahrprofil geladen',
      'Keine Fahrerschnittstelle aktiv',
      'Eingenommen bei Stromverlust oder Abschaltbefehl',
    ],
    goaRelevance: 'Anwendbar auf alle GoA-Stufen (GoA 1\u20134)',
    etcsRequirement: 'Keine \u2014 ATO ist in diesem Zustand unabh\u00E4ngig von ETCS',
  },
  CO: {
    name: 'Konfiguration',
    description: 'Das ATO-System initialisiert sich: l\u00E4dt Konfiguration, f\u00FChrt Selbsttests durch und stellt Kommunikationsschnittstellen her.',
    detailedDescription:
      'W\u00E4hrend der Konfiguration f\u00FChrt die ATO-Bordausr\u00FCstung Startvorg\u00E4nge durch, einschlie\u00DFlich Hardware-Selbstpr\u00FCfungen, Laden von Konfigurationsdaten (Fahrzeugparameter, Bremsmodelle) und Herstellung der Schnittstelle mit der ETCS-Bordeinheit \u00FCber die Subset-130-Schnittstelle. Das System versucht auch, eine Verbindung zum ATO-Streckensystem \u00FCber GSM-R oder FRMCS herzustellen. Wenn die Konfiguration fehlschl\u00E4gt, kehrt das System zu NP zur\u00FCck.',
    keyCharacteristics: [
      'Hardware- und Software-Selbsttest l\u00E4uft',
      'Fahrzeugkonfigurationsdaten geladen',
      'ETCS-Bordschnittstelle (Subset-130) initialisiert',
      'Streckenseitige Kommunikationsverbindung wird hergestellt',
      'Fahrerdateneingabe kann erforderlich sein',
    ],
    goaRelevance: 'Anwendbar auf alle GoA-Stufen (GoA 1\u20134)',
    etcsRequirement: 'ETCS-Bordausr\u00FCstung muss eingeschaltet und f\u00FCr Schnittstellenaufbau zug\u00E4nglich sein',
  },
  NA: {
    name: 'Nicht verf\u00FCgbar',
    description: 'ATO ist konfiguriert, kann aber nicht eingeschaltet werden. Wesentliche Voraussetzungen f\u00FCr den ATO-Betrieb sind nicht erf\u00FCllt.',
    detailedDescription:
      'Not Available zeigt an, dass das ATO-System die Konfiguration abgeschlossen hat, aber eine oder mehrere Voraussetzungen f\u00FCr automatisches Fahren fehlen. Typische Gr\u00FCnde sind: ETCS ist nicht in Full Supervision (FS), kein g\u00FCltiges Fahrprofil wurde vom ATO-Streckensystem empfangen, oder eine sicherheitsrelevante Sperre ist aktiv. Das System \u00FCberwacht kontinuierlich die Bedingungen und wechselt zu Available (AV), wenn alle Anforderungen erf\u00FCllt sind.',
    keyCharacteristics: [
      'ATO konfiguriert und \u00FCberwacht Bedingungen',
      'ETCS-Modus ist nicht Full Supervision, oder',
      'Kein g\u00FCltiges Fahrprofil empfangen, oder',
      'Sicherheitssperre aktiv (z. B. Bremsst\u00F6rung)',
      'Triebfahrzeugf\u00FChrer \u00FCber ATO-DMI (Driver Machine Interface) informiert',
    ],
    goaRelevance: 'Anwendbar auf alle GoA-Stufen (GoA 1\u20134)',
    etcsRequirement: 'ETCS muss betriebsbereit sein; ATO wartet auf Full Supervision (FS)',
  },
  AV: {
    name: 'Verf\u00FCgbar',
    description: 'Alle Bedingungen f\u00FCr die ATO-Einschaltung sind erf\u00FCllt. Das System ist bereit und wartet darauf, dass der Triebfahrzeugf\u00FChrer die ATO-Einschaltung w\u00E4hlt.',
    detailedDescription:
      'Im Available-Zustand sind alle Voraussetzungen f\u00FCr automatisches Fahren erf\u00FCllt: ETCS ist in Full Supervision (FS), ein g\u00FCltiges Fahrprofil ist geladen, der Zug steht oder befindet sich im Einschaltgeschwindigkeitsfenster, und es sind keine Sperren aktiv. Der Triebfahrzeugf\u00FChrer wird \u00FCber das ATO-DMI informiert, dass ATO eingeschaltet werden kann. Bei GoA 2 muss der Triebfahrzeugf\u00FChrer die Einschaltung ausdr\u00FCcklich anfordern. Das System \u00FCberwacht die Bedingungen kontinuierlich \u2014 wenn eine Bedingung verloren geht, kehrt es zu Not Available zur\u00FCck.',
    keyCharacteristics: [
      'ETCS in Full Supervision (FS) best\u00E4tigt',
      'G\u00FCltiges Fahrprofil empfangen und aktiv',
      'Keine Sicherheitssperren vorhanden',
      'ATO-DMI zeigt Einschaltbereitschaft an',
      'Warten auf Einschaltbefehl des Triebfahrzeugf\u00FChrers (GoA 2)',
    ],
    goaRelevance: 'GoA 1: Beratungsmodus verf\u00FCgbar; GoA 2: halbautomatische Einschaltung m\u00F6glich; GoA 3\u20134: automatische Einschaltung ausgel\u00F6st',
    etcsRequirement: 'ETCS muss in Full Supervision (FS) mit g\u00FCltiger Fahrterlaubnis sein',
  },
  RE: {
    name: 'Bereit zur Einschaltung',
    description: 'Alle Einschaltvoraussetzungen erf\u00FCllt. ATO ist bereit, das Fahren zu \u00FCbernehmen \u2014 wartet auf abschlie\u00DFende Best\u00E4tigung durch den Triebfahrzeugf\u00FChrer.',
    detailedDescription:
      'Ready for Engagement wird erreicht, wenn das ATO-System alle technischen und betrieblichen Voraussetzungen \u00FCberpr\u00FCft hat: ETCS Full Supervision-Modus aktiv, g\u00FCltige Fahrterlaubnis, Fahrprofil geladen, T\u00FCren geschlossen und verriegelt, Bremssystem verifiziert und Zug im Stillstand (oder innerhalb der erlaubten Geschwindigkeit). Der Triebfahrzeugf\u00FChrer best\u00E4tigt die Einschaltung \u00FCber das ATO-DMI. Nach Best\u00E4tigung wechselt das System zu Engaged (EG) und beginnt das automatische Fahren.',
    keyCharacteristics: [
      'Alle Einschaltvoraussetzungen verifiziert',
      'T\u00FCren best\u00E4tigt geschlossen und verriegelt',
      'Zug im Stillstand oder innerhalb der Einschaltgeschwindigkeit',
      'Bremssystem betriebsbereit und verifiziert',
      'Abschlie\u00DFende Best\u00E4tigung durch den Triebfahrzeugf\u00FChrer erwartet',
    ],
    goaRelevance: 'GoA 2: Triebfahrzeugf\u00FChrer dr\u00FCckt Einschalten; GoA 3\u20134: Einschaltung kann nach Erf\u00FCllung der Bedingungen automatisch erfolgen',
    etcsRequirement: 'ETCS Full Supervision-Modus mit g\u00FCltiger MA; \u00DCbergang zum AD (Automatic Driving)-Modus vorbereitet',
  },
  EG: {
    name: 'Eingeschaltet',
    description: 'ATO f\u00E4hrt den Zug aktiv \u2014 steuert Beschleunigung, Beharrungsfahrt, Ausrollen und Bremsen gem\u00E4\u00DF dem Fahrprofil.',
    detailedDescription:
      'Engaged ist der prim\u00E4re Betriebszustand, in dem das ATO-System die volle Kontrolle \u00FCber Zugkraft und Bremsung hat. Das System folgt dem Fahrprofil, um das Geschwindigkeitsprofil f\u00FCr Fahrplaneinhaltung und Energieeffizienz zu optimieren. Es berechnet Bremskurven f\u00FCr Stationshalte, beachtet Geschwindigkeitsbeschr\u00E4nkungen und steuert Ausrollphasen. Alle ATO-Befehle werden von ETCS \u00FCberwacht \u2014 wenn ATO die Fahrterlaubnis oder das Geschwindigkeitsprofil verletzt, wendet ETCS die Betriebs- oder Notbremse an. Der Triebfahrzeugf\u00FChrer \u00FCberwacht den Betrieb und kann jederzeit ausschalten.',
    keyCharacteristics: [
      'ATO steuert Zugkraft, Bremsung und Ausrollen',
      'Geschwindigkeit optimiert f\u00FCr Fahrplan und Energieeffizienz',
      'Stationshalte mit Pr\u00E4zision (typischerweise \u00B10,5 m)',
      'ETCS \u00FCberwacht alle ATO-Aktionen \u2014 Sicherheits\u00FCbersteuerung aktiv',
      'Triebfahrzeugf\u00FChrer kann jederzeit ausschalten (GoA 2)',
    ],
    goaRelevance: 'GoA 1: nur beratend (Triebfahrzeugf\u00FChrer f\u00E4hrt); GoA 2: ATO f\u00E4hrt, Triebfahrzeugf\u00FChrer \u00FCberwacht; GoA 3: ATO f\u00E4hrt, Zugbegleiter an Bord; GoA 4: vollst\u00E4ndig unbemannt',
    etcsRequirement: 'ETCS im AD (Automatic Driving)-Modus unter Full Supervision-\u00DCberwachung; g\u00FCltige MA jederzeit erforderlich',
  },
  DE: {
    name: 'Ausschalten',
    description: 'ATO \u00FCbergibt die Kontrolle kontrolliert an den Triebfahrzeugf\u00FChrer zur\u00FCck und gew\u00E4hrleistet einen sicheren \u00DCbergang.',
    detailedDescription:
      'Disengaging ist ein kontrollierter \u00DCbergang vom automatischen zum manuellen Fahren. Dieser Zustand wird eingenommen, wenn der Triebfahrzeugf\u00FChrer das Ausschalten anfordert, wenn ein geplantes Ende des ATO-Betriebs erreicht ist (z. B. Ende des Fahrprofils) oder wenn bestimmte Bedingungen eine \u00DCbernahme durch den Triebfahrzeugf\u00FChrer erfordern. Das ATO-System stellt sicher, dass sich der Zug in einem sicheren Zustand befindet, bevor die \u00DCbergabe abgeschlossen wird \u2014 dies kann bei Bedarf ein kontrolliertes Anhalten des Zuges umfassen. Sobald die \u00DCbergabe abgeschlossen ist, wechselt das System zu Not Available oder Available.',
    keyCharacteristics: [
      'Kontrollierte \u00DCbergabe von ATO an Triebfahrzeugf\u00FChrer',
      'Zug bei Bedarf in sicheren Zustand gebracht',
      'ETCS kehrt zur normalen Full Supervision-\u00DCberwachung zur\u00FCck',
      'Triebfahrzeugf\u00FChrer \u00FCbernimmt manuelle Kontrolle \u00FCber Zugkraft/Bremsung',
      'ATO-DMI best\u00E4tigt Abschluss des Ausschaltens',
    ],
    goaRelevance: 'GoA 2: triebfahrzeugf\u00FChrerinitiiert; GoA 3\u20134: kann durch Systembedingungen ausgel\u00F6st werden',
    etcsRequirement: 'ETCS wechselt von AD zur\u00FCck zum Full Supervision-Modus',
  },
};
