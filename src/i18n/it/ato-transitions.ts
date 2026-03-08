import type { ATOTransitionTranslation } from '../types';

export const itATOTransitions: Record<string, ATOTransitionTranslation> = {
  'NP-CO': {
    description: 'L\'accensione avvia la configurazione ATO',
    detailedDescription:
      'Quando l\'equipaggiamento ATO di bordo viene alimentato, il sistema inizia la sequenza di configurazione. Ciò include il caricamento dei parametri del veicolo, l\'inizializzazione dei moduli interni e la preparazione dell\'interfaccia ETCS.',
    conditions: [
      'Il sistema ATO riceve alimentazione',
    ],
  },
  'CO-NP': {
    description: 'Errore di configurazione, ritorno a No Power',
    detailedDescription:
      'Se il sistema ATO non supera l\'autotest, incontra dati di configurazione incompatibili o perde l\'alimentazione durante l\'inizializzazione, torna allo stato No Power.',
    conditions: [
      'Errore di configurazione o alimentazione rimossa',
    ],
  },
  'CO-NA': {
    description: 'Configurazione riuscita, transizione a Not Available',
    detailedDescription:
      'Dopo aver completato l\'autotest e aver stabilito l\'interfaccia Subset-130 con l\'ETCS di bordo, il sistema ATO entra nello stato Not Available. Ora monitora se l\'ETCS è in modo Full Supervision e se è disponibile un Profilo di Viaggio.',
    conditions: [
      'Configurazione e autotest completati con successo',
      'Interfaccia ETCS di bordo stabilita',
    ],
  },
  'NA-AV': {
    description: 'Tutte le condizioni soddisfatte — l\'ATO diventa Available',
    detailedDescription:
      'Quando l\'ETCS di bordo conferma il modo Full Supervision con un\'autorizzazione al movimento valida, e un Profilo di Viaggio è stato ricevuto tramite l\'interfaccia ATO del lato terra (Subset-126), l\'ATO transita a Available. Il macchinista viene informato che l\'ATO può essere attivato.',
    conditions: [
      'L\'ETCS entra nel modo Full Supervision (FS)',
      'Profilo di Viaggio valido ricevuto dal lato terra',
      'Nessuna inibizione di sicurezza attiva',
    ],
  },
  'AV-NA': {
    description: 'Condizioni perse — l\'ATO non è più Available',
    detailedDescription:
      'Se l\'ETCS esce dal modo Full Supervision (ad es. a causa di una transizione di modo a On Sight o Trip), se il Profilo di Viaggio scade o diventa invalido, o se viene attivata un\'inibizione di sicurezza, l\'ATO torna a Not Available fino al ripristino delle condizioni.',
    conditions: [
      'L\'ETCS esce dal modo Full Supervision, oppure',
      'Il Profilo di Viaggio diventa invalido, oppure',
      'Inibizione di sicurezza attivata',
    ],
  },
  'AV-RE': {
    description: 'Precondizioni di attivazione soddisfatte',
    detailedDescription:
      'Quando il treno è fermo (o entro la finestra di velocità di attivazione consentita) e tutte le condizioni fisiche sono soddisfatte — porte bloccate, freni verificati — l\'ATO segnala la prontezza sul DMI e transita a Ready for Engagement.',
    conditions: [
      'Treno fermo o entro la velocità di attivazione',
      'Porte confermate chiuse e bloccate',
      'Sistema frenante operativo',
    ],
  },
  'RE-AV': {
    description: 'Precondizioni perse — ritorno a Available',
    detailedDescription:
      'Se un qualsiasi prerequisito di attivazione viene violato mentre il sistema è in Ready for Engagement — ad esempio, una porta viene aperta o viene rilevato un guasto ai freni — l\'ATO torna allo stato Available e il macchinista viene informato.',
    conditions: [
      'Precondizioni di attivazione perse (ad es. porte aperte)',
    ],
  },
  'RE-EG': {
    description: 'Il macchinista attiva l\'ATO — la guida automatica inizia',
    detailedDescription:
      'Il macchinista preme il pulsante di attivazione ATO sul DMI. L\'ETCS di bordo transita nel modo Automatic Driving (AD) sotto Full Supervision, e l\'ATO inizia a controllare trazione e frenata secondo il Profilo di Viaggio. Nel GoA 3–4, l\'attivazione può avvenire automaticamente.',
    conditions: [
      'Il macchinista conferma l\'attivazione ATO tramite DMI',
      'L\'ETCS transita nel modo AD (Automatic Driving)',
    ],
  },
  'EG-DE': {
    description: 'L\'ATO inizia la disattivazione controllata',
    detailedDescription:
      'La disattivazione viene avviata quando il macchinista preme il pulsante di disattivazione, quando il Profilo di Viaggio termina, o quando viene raggiunto un punto di transizione pianificato. Il sistema ATO porta il treno in uno stato sicuro e si prepara a restituire il controllo al macchinista.',
    conditions: [
      'Il macchinista richiede la disattivazione, oppure',
      'Fine del Profilo di Viaggio raggiunta, oppure',
      'Punto di trasferimento pianificato raggiunto',
    ],
  },
  'EG-NA': {
    description: 'Disattivazione di emergenza — ritorno immediato a Not Available',
    detailedDescription:
      'Se si verifica una condizione critica durante la guida automatica — come l\'ETCS che attiva una transizione di modo (ad es. Trip), un guasto di comunicazione con il lato terra ATO, o un\'avaria critica del sistema — l\'ATO si disattiva immediatamente senza la sequenza di trasferimento controllato. La supervisione di sicurezza ETCS resta attiva.',
    conditions: [
      'L\'ETCS esce da Full Supervision / modo AD, oppure',
      'Condizione critica di sicurezza attivata, oppure',
      'Perdita di comunicazione con il lato terra ATO',
    ],
  },
  'DE-NA': {
    description: 'Disattivazione completa — condizioni non soddisfatte per la riattivazione',
    detailedDescription:
      'Dopo che il trasferimento controllato al macchinista è terminato e le condizioni di attivazione non sono più soddisfatte (ad es. l\'ETCS ha lasciato il modo FS, il viaggio è terminato), l\'ATO torna a Not Available.',
    conditions: [
      'Disattivazione completata',
      'Condizioni ATO non più soddisfatte',
    ],
  },
  'DE-AV': {
    description: 'Disattivazione completa — l\'ATO resta Available per la riattivazione',
    detailedDescription:
      'Dopo il completamento del trasferimento controllato, se tutte le condizioni ATO sono ancora soddisfatte (ETCS in FS, Profilo di Viaggio valido), il sistema torna a Available, consentendo al macchinista di riattivare l\'ATO se lo desidera.',
    conditions: [
      'Disattivazione completata',
      'Condizioni ATO ancora soddisfatte',
    ],
  },
  'DE-RE': {
    description: 'Disattivazione completa — tutti i prerequisiti di attivazione ancora soddisfatti, pronto per la riattivazione immediata',
    detailedDescription:
      'Se dopo una disattivazione controllata tutte le condizioni restano soddisfatte — ETCS in Full Supervision, Profilo di Viaggio valido, treno fermo con porte bloccate e freni verificati — l\'ATO può saltare lo stato Available e transitare direttamente a Ready for Engagement. Ciò consente una riattivazione rapida, ad esempio dopo un breve intervento manuale in stazione.',
    conditions: [
      'Disattivazione completata',
      'ETCS ancora in modo FS con MA valida',
      'Profilo di Viaggio ancora attivo',
      'Treno fermo o entro la velocità di attivazione',
      'Porte chiuse e bloccate, freni verificati',
    ],
  },
  'ANY-NP': {
    description: 'La perdita di alimentazione riporta a No Power da qualsiasi stato',
    detailedDescription:
      'Se il sistema ATO di bordo perde l\'alimentazione in qualsiasi momento durante il funzionamento, entra immediatamente nello stato No Power. Questa è una transizione universale che può verificarsi da qualsiasi stato ATO. L\'ETCS continua a operare indipendentemente.',
    conditions: [
      'Perdita di alimentazione del sistema ATO',
    ],
  },
};
