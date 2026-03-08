import type { ATOTransitionTranslation } from '../types';

export const deATOTransitions: Record<string, ATOTransitionTranslation> = {
  'NP-CO': {
    description: 'Einschalten leitet ATO-Konfiguration ein',
    detailedDescription:
      'Wenn die ATO-Bordausr\u00FCstung unter Spannung gesetzt wird, beginnt das System seine Konfigurationssequenz. Dies umfasst das Laden von Fahrzeugparametern, die Initialisierung interner Module und die Vorbereitung der ETCS-Schnittstelle.',
    conditions: [
      'ATO-System erh\u00E4lt Strom',
    ],
  },
  'CO-NP': {
    description: 'Konfigurationsfehler f\u00FChrt zur\u00FCck zu No Power',
    detailedDescription:
      'Wenn das ATO-System seinen Selbsttest nicht besteht, inkompatible Konfigurationsdaten antrifft oder w\u00E4hrend der Initialisierung den Strom verliert, kehrt es in den No Power-Zustand zur\u00FCck.',
    conditions: [
      'Konfigurationsfehler oder Stromverlust',
    ],
  },
  'CO-NA': {
    description: 'Erfolgreiche Configuration f\u00FChrt zu Not Available',
    detailedDescription:
      'Nach Abschluss der Selbsttests und Herstellung der Subset-130-Schnittstelle mit der ETCS-Bordausr\u00FCstung wechselt das ATO-System in den Not Available-Zustand. Es \u00FCberwacht nun, ob ETCS in Full Supervision ist und ob ein Fahrprofil verf\u00FCgbar ist.',
    conditions: [
      'Konfiguration und Selbsttest erfolgreich abgeschlossen',
      'ETCS-Bordschnittstelle hergestellt',
    ],
  },
  'NA-AV': {
    description: 'Alle Bedingungen erf\u00FCllt \u2014 ATO wird verf\u00FCgbar',
    detailedDescription:
      'Wenn die ETCS-Bordausr\u00FCstung den Full Supervision-Modus mit g\u00FCltiger Fahrterlaubnis best\u00E4tigt und ein Fahrprofil \u00FCber die ATO-Streckenschnittstelle (Subset-126) empfangen wurde, wechselt ATO in den Zustand Available. Der Triebfahrzeugf\u00FChrer wird informiert, dass ATO eingeschaltet werden kann.',
    conditions: [
      'ETCS wechselt in Full Supervision (FS)',
      'G\u00FCltiges Fahrprofil vom Streckensystem empfangen',
      'Keine Sicherheitssperren aktiv',
    ],
  },
  'AV-NA': {
    description: 'Bedingungen verloren \u2014 ATO nicht mehr verf\u00FCgbar',
    detailedDescription:
      'Wenn ETCS den Full Supervision-Modus verl\u00E4sst (z. B. durch einen Betriebsartwechsel zu On Sight oder Trip), wenn das Fahrprofil abl\u00E4uft oder ung\u00FCltig wird, oder wenn eine Sicherheitssperre ausgel\u00F6st wird, kehrt ATO in den Zustand Not Available zur\u00FCck, bis die Bedingungen wiederhergestellt sind.',
    conditions: [
      'ETCS verl\u00E4sst Full Supervision-Modus, oder',
      'Fahrprofil wird ung\u00FCltig, oder',
      'Sicherheitssperre aktiviert',
    ],
  },
  'AV-RE': {
    description: 'Einschaltvoraussetzungen erf\u00FCllt',
    detailedDescription:
      'Wenn der Zug steht (oder sich innerhalb des erlaubten Einschaltgeschwindigkeitsfensters befindet) und alle physischen Bedingungen erf\u00FCllt sind \u2014 T\u00FCren verriegelt, Bremsen verifiziert \u2014 signalisiert ATO Bereitschaft am DMI und wechselt in den Zustand Ready for Engagement.',
    conditions: [
      'Zug im Stillstand oder innerhalb der Einschaltgeschwindigkeit',
      'T\u00FCren best\u00E4tigt geschlossen und verriegelt',
      'Bremssystem betriebsbereit',
    ],
  },
  'RE-AV': {
    description: 'Voraussetzungen verloren \u2014 R\u00FCckkehr zu Available',
    detailedDescription:
      'Wenn eine Einschaltvoraussetzung w\u00E4hrend des Zustands Ready for Engagement verletzt wird \u2014 zum Beispiel eine T\u00FCr ge\u00F6ffnet oder eine Bremsst\u00F6rung erkannt wird \u2014 kehrt ATO in den Zustand Available zur\u00FCck und der Triebfahrzeugf\u00FChrer wird informiert.',
    conditions: [
      'Einschaltvoraussetzungen verloren (z. B. T\u00FCren ge\u00F6ffnet)',
    ],
  },
  'RE-EG': {
    description: 'Triebfahrzeugf\u00FChrer schaltet ATO ein \u2014 automatisches Fahren beginnt',
    detailedDescription:
      'Der Triebfahrzeugf\u00FChrer dr\u00FCckt die ATO-Einschalttaste am DMI. Die ETCS-Bordausr\u00FCstung wechselt in den Automatic Driving (AD)-Modus unter Full Supervision, und ATO beginnt, Zugkraft und Bremsung gem\u00E4\u00DF dem Fahrprofil zu steuern. Bei GoA 3\u20134 kann die Einschaltung automatisch erfolgen.',
    conditions: [
      'Triebfahrzeugf\u00FChrer best\u00E4tigt ATO-Einschaltung per DMI',
      'ETCS wechselt in AD (Automatic Driving)-Modus',
    ],
  },
  'EG-DE': {
    description: 'ATO beginnt kontrolliertes Ausschalten',
    detailedDescription:
      'Das Ausschalten wird eingeleitet, wenn der Triebfahrzeugf\u00FChrer die Ausschalttaste dr\u00FCckt, wenn das Fahrprofil endet oder wenn ein geplanter \u00DCbergangspunkt erreicht wird. Das ATO-System bringt den Zug in einen sicheren Zustand und bereitet die \u00DCbergabe der Kontrolle an den Triebfahrzeugf\u00FChrer vor.',
    conditions: [
      'Triebfahrzeugf\u00FChrer fordert Ausschaltung an, oder',
      'Ende des Fahrprofils erreicht, oder',
      'Geplanter \u00DCbergabepunkt erreicht',
    ],
  },
  'EG-NA': {
    description: 'Notausschaltung \u2014 sofortige R\u00FCckkehr zu Not Available',
    detailedDescription:
      'Wenn w\u00E4hrend des automatischen Fahrens ein kritischer Zustand eintritt \u2014 wie ein ETCS-Betriebsartwechsel (z. B. Trip), ein Kommunikationsausfall mit dem ATO-Streckensystem oder ein sicherheitskritischer Systemfehler \u2014 schaltet ATO sofort ohne die kontrollierte \u00DCbergabesequenz aus. Die ETCS-Sicherheits\u00FCberwachung bleibt aktiv.',
    conditions: [
      'ETCS verl\u00E4sst Full Supervision / AD-Modus, oder',
      'Kritischer Sicherheitszustand ausgel\u00F6st, oder',
      'Kommunikationsverlust mit ATO-Streckensystem',
    ],
  },
  'DE-NA': {
    description: 'Ausschaltung abgeschlossen \u2014 Bedingungen f\u00FCr Wiedereinschaltung nicht erf\u00FCllt',
    detailedDescription:
      'Nachdem die kontrollierte \u00DCbergabe an den Triebfahrzeugf\u00FChrer abgeschlossen ist und die Einschaltbedingungen nicht mehr erf\u00FCllt sind (z. B. ETCS hat FS-Modus verlassen, Fahrt beendet), kehrt ATO in den Zustand Not Available zur\u00FCck.',
    conditions: [
      'Ausschaltung abgeschlossen',
      'ATO-Bedingungen nicht mehr erf\u00FCllt',
    ],
  },
  'DE-AV': {
    description: 'Ausschaltung abgeschlossen \u2014 ATO bleibt f\u00FCr Wiedereinschaltung verf\u00FCgbar',
    detailedDescription:
      'Nachdem die kontrollierte \u00DCbergabe abgeschlossen ist und alle ATO-Bedingungen noch erf\u00FCllt sind (ETCS in FS, g\u00FCltiges Fahrprofil), kehrt das System in den Zustand Available zur\u00FCck, was dem Triebfahrzeugf\u00FChrer erm\u00F6glicht, ATO bei Bedarf wieder einzuschalten.',
    conditions: [
      'Ausschaltung abgeschlossen',
      'ATO-Bedingungen weiterhin erf\u00FCllt',
    ],
  },
  'DE-RE': {
    description: 'Ausschaltung abgeschlossen \u2014 alle Einschaltvoraussetzungen noch erf\u00FCllt, bereit zur sofortigen Wiedereinschaltung',
    detailedDescription:
      'Wenn nach einer kontrollierten Ausschaltung alle Bedingungen erf\u00FCllt bleiben \u2014 ETCS in Full Supervision, g\u00FCltiges Fahrprofil, Zug im Stillstand mit verriegelten T\u00FCren und verifizierten Bremsen \u2014 kann ATO den Zustand Available \u00FCberspringen und direkt in den Zustand Ready for Engagement wechseln. Dies erm\u00F6glicht eine schnelle Wiedereinschaltung, zum Beispiel nach einem kurzen manuellen Eingriff an einer Station.',
    conditions: [
      'Ausschaltung abgeschlossen',
      'ETCS weiterhin im FS-Modus mit g\u00FCltiger MA',
      'G\u00FCltiges Fahrprofil weiterhin aktiv',
      'Zug im Stillstand oder innerhalb der Einschaltgeschwindigkeit',
      'T\u00FCren geschlossen und verriegelt, Bremsen verifiziert',
    ],
  },
  'ANY-NP': {
    description: 'Stromverlust f\u00FChrt von jedem Zustand zu No Power zur\u00FCck',
    detailedDescription:
      'Wenn das ATO-Bordsystem zu einem beliebigen Zeitpunkt w\u00E4hrend des Betriebs den Strom verliert, wechselt es sofort in den No Power-Zustand. Dies ist ein universeller \u00DCbergang, der von jedem ATO-Zustand aus auftreten kann. ETCS arbeitet unabh\u00E4ngig weiter.',
    conditions: [
      'ATO-System-Stromverlust',
    ],
  },
};
