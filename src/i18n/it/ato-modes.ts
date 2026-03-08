import type { ATOStateTranslation } from '../types';

export const itATOStates: Record<string, ATOStateTranslation> = {
  NP: {
    name: 'Senza Alimentazione',
    description: 'Il sistema ATO di bordo è spento. Nessuna funzionalità ATO è disponibile.',
    detailedDescription:
      'No Power è lo stato iniziale del sistema ATO di bordo quando l\'equipaggiamento ATO del treno non è alimentato. In questo stato, nessuna funzione ATO viene eseguita e il sistema non ha consapevolezza della posizione del treno, del profilo di viaggio o dello stato ETCS. La transizione da NP avviene quando il sistema ATO riceve alimentazione e inizia la sequenza di configurazione.',
    keyCharacteristics: [
      'Sistema ATO completamente inattivo',
      'Nessuna comunicazione con l\'ETCS di bordo',
      'Nessun profilo di viaggio caricato',
      'Nessuna interfaccia macchinista attiva',
      'Si entra in caso di perdita di alimentazione o comando di spegnimento',
    ],
    goaRelevance: 'Applicabile a tutti i livelli GoA (GoA 1–4)',
    etcsRequirement: 'Nessuno — l\'ATO è indipendente dall\'ETCS in questo stato',
  },
  CO: {
    name: 'Configurazione',
    description: 'Il sistema ATO si sta inizializzando: caricamento della configurazione, esecuzione dell\'autotest e stabilimento delle interfacce di comunicazione.',
    detailedDescription:
      'Durante Configuration, l\'ATO di bordo esegue le procedure di avvio, tra cui l\'autotest hardware, il caricamento dei dati di configurazione (parametri del veicolo, modelli di frenata) e l\'inizializzazione dell\'interfaccia con l\'unità ETCS di bordo tramite l\'interfaccia Subset-130. Il sistema tenta inoltre di connettersi al lato terra ATO tramite GSM-R o FRMCS. Se la configurazione fallisce, il sistema torna a NP.',
    keyCharacteristics: [
      'Autotest hardware e software in corso',
      'Dati di configurazione del veicolo caricati',
      'Interfaccia ETCS di bordo (Subset-130) inizializzata',
      'Collegamento di comunicazione con il lato terra in fase di stabilimento',
      'Potrebbe essere richiesto l\'inserimento dati del macchinista',
    ],
    goaRelevance: 'Applicabile a tutti i livelli GoA (GoA 1–4)',
    etcsRequirement: 'L\'ETCS di bordo deve essere alimentato e accessibile per la configurazione dell\'interfaccia',
  },
  NA: {
    name: 'Non Disponibile',
    description: 'L\'ATO è configurato ma non può essere attivato. Le condizioni essenziali per il funzionamento ATO non sono soddisfatte.',
    detailedDescription:
      'Not Available indica che il sistema ATO ha completato la configurazione ma una o più precondizioni per la guida automatica sono mancanti. Motivi tipici includono: l\'ETCS non è in modo Full Supervision (FS), nessun Profilo di Viaggio valido è stato ricevuto dal lato terra ATO, o è attiva un\'inibizione legata alla sicurezza. Il sistema monitora continuamente le condizioni e transita verso Available (AV) quando tutti i requisiti sono soddisfatti.',
    keyCharacteristics: [
      'ATO configurato e in monitoraggio delle condizioni',
      'Il modo ETCS non è Full Supervision, oppure',
      'Nessun Profilo di Viaggio valido ricevuto, oppure',
      'Inibizione di sicurezza attiva (ad es. guasto freni)',
      'Macchinista informato tramite DMI ATO (Driver Machine Interface)',
    ],
    goaRelevance: 'Applicabile a tutti i livelli GoA (GoA 1–4)',
    etcsRequirement: 'L\'ETCS deve essere operativo; l\'ATO attende Full Supervision (FS) o Automatic Driving (AD)',
  },
  AV: {
    name: 'Disponibile',
    description: 'Tutte le condizioni per l\'attivazione dell\'ATO sono soddisfatte. Il sistema è pronto e in attesa che il macchinista selezioni l\'attivazione dell\'ATO.',
    detailedDescription:
      'Nello stato Available, tutte le precondizioni per la guida automatica sono soddisfatte: l\'ETCS è in modo Full Supervision (FS), un Profilo di Viaggio valido è caricato, il treno è fermo o entro la finestra di velocità di attivazione, e non vi sono inibizioni attive. Il macchinista viene informato tramite il DMI ATO che l\'ATO può essere attivato. Nel GoA 2, il macchinista deve richiedere esplicitamente l\'attivazione. Il sistema monitora le condizioni continuamente — se una condizione viene persa, torna a NA.',
    keyCharacteristics: [
      'ETCS in modo Full Supervision (FS) confermato',
      'Profilo di Viaggio valido ricevuto e attivo',
      'Nessuna inibizione di sicurezza presente',
      'Il DMI ATO indica la prontezza per l\'attivazione',
      'In attesa del comando di attivazione del macchinista (GoA 2)',
    ],
    goaRelevance: 'GoA 1: modo consulenza disponibile; GoA 2: attivazione semiautomatica possibile; GoA 3–4: attivazione automatica avviata',
    etcsRequirement: 'L\'ETCS deve essere in Full Supervision (FS) con autorizzazione al movimento valida',
  },
  RE: {
    name: 'Pronto per l\'Attivazione',
    description: 'Tutti i prerequisiti di attivazione sono soddisfatti. L\'ATO è pronto ad assumere la guida — in attesa della conferma finale del macchinista.',
    detailedDescription:
      'Ready for Engagement viene raggiunto quando il sistema ATO ha verificato tutti i prerequisiti tecnici e operativi: modo ETCS FS attivo, autorizzazione al movimento valida, Profilo di Viaggio caricato, porte chiuse e bloccate, sistema frenante verificato e treno fermo (o entro la velocità consentita). Il macchinista conferma l\'attivazione tramite il DMI ATO. Una volta confermato, il sistema transita in Engaged (EG) e inizia la guida automatica.',
    keyCharacteristics: [
      'Tutti i prerequisiti di attivazione verificati',
      'Porte confermate chiuse e bloccate',
      'Treno fermo o entro la velocità di attivazione',
      'Sistema frenante operativo e verificato',
      'In attesa della conferma finale del macchinista',
    ],
    goaRelevance: 'GoA 2: il macchinista preme il pulsante di attivazione; GoA 3–4: l\'attivazione può essere automatica dopo il soddisfacimento delle condizioni',
    etcsRequirement: 'ETCS in modo FS con MA valida; transizione al modo AD (Automatic Driving) preparata',
  },
  EG: {
    name: 'Attivato',
    description: 'L\'ATO sta guidando attivamente il treno — controllando accelerazione, marcia a velocità di crociera, marcia per inerzia e frenata secondo il Profilo di Viaggio.',
    detailedDescription:
      'Engaged è lo stato operativo principale in cui il sistema ATO ha il pieno controllo di trazione e frenata. Il sistema segue il Profilo di Viaggio per ottimizzare il profilo di velocità per il rispetto dell\'orario e l\'efficienza energetica. Calcola le curve di frenata per le fermate in stazione, rispetta le restrizioni di velocità e gestisce le fasi di marcia per inerzia. Tutti i comandi ATO sono supervisionati dall\'ETCS — se l\'ATO viola l\'autorizzazione al movimento o il profilo di velocità, l\'ETCS applica la frenata di servizio o di emergenza. Il macchinista monitora le operazioni e può disattivare l\'ATO in qualsiasi momento.',
    keyCharacteristics: [
      'L\'ATO controlla trazione, frenata e marcia per inerzia',
      'Velocità ottimizzata per orario ed efficienza energetica',
      'Fermate in stazione con precisione (tipicamente ±0,5 m)',
      'L\'ETCS supervisiona tutte le azioni ATO — override di sicurezza attivo',
      'Il macchinista può disattivare l\'ATO in qualsiasi momento (GoA 2)',
    ],
    goaRelevance: 'GoA 1: solo consulenza (il macchinista guida); GoA 2: l\'ATO guida, il macchinista monitora; GoA 3: l\'ATO guida, assistente a bordo; GoA 4: completamente non presidiato',
    etcsRequirement: 'ETCS in modo AD (Automatic Driving) sotto supervisione FS; MA valida richiesta in ogni momento',
  },
  DE: {
    name: 'Disattivazione',
    description: 'L\'ATO sta restituendo il controllo al macchinista in modo controllato, garantendo una transizione sicura.',
    detailedDescription:
      'Disengaging è una transizione controllata dalla guida automatica a quella manuale. Questo stato viene attivato quando il macchinista richiede la disattivazione, quando viene raggiunta la fine pianificata dell\'operazione ATO (ad es. fine del Profilo di Viaggio), o quando determinate condizioni richiedono l\'assunzione del controllo da parte del macchinista. Il sistema ATO assicura che il treno sia in uno stato sicuro prima di completare il trasferimento — ciò può includere il portare il treno ad un arresto controllato se necessario. Una volta completato il trasferimento, il sistema transita a NA o AV.',
    keyCharacteristics: [
      'Trasferimento controllato dall\'ATO al macchinista',
      'Treno portato in stato sicuro se necessario',
      'L\'ETCS torna alla normale supervisione FS',
      'Il macchinista assume il controllo manuale di trazione/frenata',
      'Il DMI ATO conferma il completamento della disattivazione',
    ],
    goaRelevance: 'GoA 2: avviato dal macchinista; GoA 3–4: può essere attivato dalle condizioni del sistema',
    etcsRequirement: 'L\'ETCS transita da AD al modo FS normale',
  },
};
