import type { TransitionTranslation } from '../types';

export const itTransitions: Record<string, TransitionTranslation> = {
  'NP-SB': {
    description: 'Accensione e avvio del sistema',
    detailedDescription:
      'Il macchinista accende l\'equipaggiamento di bordo ETCS. Il sistema esegue l\'autotest di avvio (verifica hardware, integrità software, dati memorizzati). Al completamento con successo, il sistema entra nel modo Stand By e il DMI diventa attivo per l\'inserimento dei dati.',
    conditions: [
      'Equipaggiamento di bordo ETCS acceso',
      'Autotest completato con successo',
    ],
  },
  'SB-NP': {
    description: 'Spegnimento',
    detailedDescription:
      'Il macchinista spegne l\'equipaggiamento di bordo ETCS, tipicamente al termine di una missione quando il treno viene ricoverato o la cabina viene disattivata. Tutte le funzioni ETCS cessano.',
    conditions: [
      'Equipaggiamento di bordo ETCS spento dal macchinista',
    ],
  },
  'SB-FS': {
    description: 'Inizio missione con MA completa',
    detailedDescription:
      'Dopo che il macchinista ha completato l\'inserimento dei dati in Stand By, il sistema riceve un\'autorizzazione al movimento valida con descrizione completa del tracciato (profilo di velocità, pendenza). Questo è l\'inizio missione ideale: il treno transita direttamente in Full Supervision con tutti i dati di sicurezza disponibili.',
    conditions: [
      'Inserimento dati del macchinista completato (ID macchinista, dati treno)',
      'Autorizzazione al movimento (MA) valida ricevuta',
      'Descrizione completa del tracciato disponibile',
      'Livello ETCS determinato (livello 1, 2 o 3)',
    ],
  },
  'SB-SR': {
    description: 'Inizio missione senza MA',
    detailedDescription:
      'Quando il macchinista ha completato l\'inserimento dei dati ma non è possibile ottenere alcuna autorizzazione al movimento (ad es. nessun contatto con l\'RBC, nessun dato da boe), il macchinista può richiedere di iniziare la missione in modo Staff Responsible. Il macchinista deve confermare il modo sul DMI e si assume la responsabilità del movimento sicuro sotto autorità del regolatore.',
    conditions: [
      'Inserimento dati del macchinista completato',
      'Nessuna MA valida disponibile',
      'Il macchinista conferma il modo SR sul DMI',
    ],
  },
  'SB-SH': {
    description: 'Richiesta di manovra da Stand By',
    detailedDescription:
      'Il macchinista richiede l\'ingresso nel modo Shunting per i movimenti in piazzale, oppure viene ricevuto un ordine di manovra dal lato terra (ad es. tramite boa). Il sistema transita nel modo SH per le operazioni di smistamento a bassa velocità. L\'inserimento completo dei dati del treno potrebbe non essere richiesto per la manovra.',
    conditions: [
      'Richiesta di manovra del macchinista o ordine lato linea',
      'Il macchinista conferma la modalità di manovra',
    ],
  },
  'SB-SL': {
    description: 'Ingresso in Sleeping come unità non di testa',
    detailedDescription:
      'Quando il sistema determina che questa unità di bordo non è l\'unità di testa (ad es. cabina posteriore di un treno reversibile, o un\'unità trainata a macchina morta), transita nel modo Sleeping. L\'ETCS resta alimentato ma non effettua supervisione attiva.',
    conditions: [
      'Questa cabina/unità non è l\'unità di testa',
      'Un\'altra unità ETCS di bordo è attiva come unità di testa',
    ],
  },
  'SB-NL': {
    description: 'Ingresso in modo Non Leading',
    detailedDescription:
      'Il macchinista indica che questa locomotiva non è l\'unità di trazione di testa nel convoglio (ad es. locomotiva di coda in una configurazione a doppia trazione). L\'ETCS entra nel modo Non Leading, restando attivo ma senza emettere comandi di frenata né detenere una MA.',
    conditions: [
      'Il macchinista seleziona Non Leading',
      'L\'unità non è l\'unità di trazione di testa nel convoglio',
    ],
  },
  'SR-FS': {
    description: 'MA ricevuta in modo Staff Responsible',
    detailedDescription:
      'Procedendo in modo Staff Responsible, il treno supera un gruppo di boe o riceve un messaggio dall\'RBC contenente un\'autorizzazione al movimento valida con descrizione completa del tracciato. Il sistema transita automaticamente in Full Supervision, fornendo la piena protezione ETCS.',
    conditions: [
      'Autorizzazione al movimento (MA) valida ricevuta',
      'Descrizione completa del tracciato disponibile',
    ],
  },
  'SR-OS': {
    description: 'Profilo di modo OS ricevuto',
    detailedDescription:
      'In modo Staff Responsible, il treno riceve un profilo di modo On Sight dal lato terra (tramite boa o RBC). Ciò indica che la sezione successiva potrebbe essere occupata e il macchinista deve procedere a vista. Il sistema transita nel modo OS con la velocità ridotta corrispondente.',
    conditions: [
      'Profilo di modo On Sight ricevuto dal lato terra',
      'MA valida con area OS definita',
    ],
  },
  'SR-TR': {
    description: 'Trip attivato in Staff Responsible',
    detailedDescription:
      'Procedendo in modo SR, il treno supera un gruppo di boe che comanda un trip (ad es. a protezione di un punto pericoloso). L\'ETCS applica immediatamente la frenata di emergenza. Ciò può verificarsi se l\'autorità verbale del regolatore non ha tenuto conto di tutte le protezioni a terra o se le condizioni sono cambiate.',
    conditions: [
      'Il treno supera un gruppo di boe che comanda un trip',
    ],
  },
  'SR-SH': {
    description: 'Shunting da Staff Responsible',
    detailedDescription:
      'In modo Staff Responsible, il macchinista richiede la manovra oppure viene ricevuto un ordine di manovra dal lato terra. Il treno transita nel modo Shunting per i movimenti a bassa velocità in piazzale.',
    conditions: [
      'Richiesta di manovra dal macchinista o ordine dal lato terra',
    ],
  },
  'FS-OS': {
    description: 'Ingresso in area On Sight',
    detailedDescription:
      'In Full Supervision, il lato terra invia un profilo di modo On Sight per una sezione successiva (ad es. un\'area in cui il rilevamento del binario è guasto). Quando il treno entra in quest\'area, il modo transita in OS e la velocità viene ridotta. La MA resta valida.',
    conditions: [
      'Profilo di modo On Sight ricevuto dal lato terra',
      'Il treno entra nell\'area del profilo di modo OS',
    ],
  },
  'FS-LS': {
    description: 'Ingresso in area di Limited Supervision',
    detailedDescription:
      'Il lato terra indica che la sezione successiva può fornire solo Limited Supervision (descrizione del tracciato incompleta). Quando il treno entra in quest\'area, transita da FS a modo LS. La MA resta valida ma alcuni parametri di supervisione utilizzano valori nazionali predefiniti.',
    conditions: [
      'Profilo di modo Limited Supervision ricevuto dal lato terra',
      'Il treno entra nell\'area del profilo di modo LS',
    ],
  },
  'FS-SR': {
    description: 'Il macchinista attiva la funzione Override in Full Supervision',
    detailedDescription:
      'Se le condizioni per Full Supervision non possono più essere mantenute (ad es. la descrizione del tracciato diventa incompleta, problemi di comunicazione che non giustificano un trip), il sistema può transitare in Staff Responsible come modo degradato ma ancora operativo. Il macchinista deve confermare il cambiamento.',
    conditions: [
      'Le condizioni della MA non possono più essere mantenute',
      'Esistono condizioni sicure per SR (non una situazione di trip)',
      'Il macchinista conferma il modo SR',
    ],
  },
  'FS-TR': {
    description: 'Superamento dell\'EOA provoca trip di emergenza',
    detailedDescription:
      'La transizione di sicurezza più critica. Se il treno supera l\'End of Authority (EOA) — ovvero ha superato il punto oltre il quale il movimento sicuro non è garantito — l\'ETCS comanda l\'immediata frenata di emergenza. Questa è la funzione di sicurezza fondamentale dell\'ETCS: impedire ai treni di entrare in un tratto non protetto.',
    conditions: [
      'Il treno supera l\'End of Authority (EOA)',
    ],
  },
  'FS-SH': {
    description: 'Ordine di manovra durante Full Supervision',
    detailedDescription:
      'Un ordine di manovra viene ricevuto dal lato terra (tipicamente all\'ingresso di un piazzale o nella gola di stazione). Il treno transita nel modo Shunting, rilasciando la MA e passando alle regole di movimento a bassa velocità in piazzale.',
    conditions: [
      'Ordine di manovra ricevuto dal lato terra',
      'Il macchinista conferma la manovra',
    ],
  },
  'FS-UN': {
    description: 'Ingresso in area non attrezzata',
    detailedDescription:
      'Il treno transita da un\'area attrezzata ETCS a una sezione senza equipaggiamento ETCS a terra (livello 0). La MA viene rilasciata e il sistema fornisce solo la supervisione di base della velocità massima. Il macchinista deve seguire le regole di segnalamento nazionali.',
    conditions: [
      'Il treno entra in un\'area senza equipaggiamento ETCS a terra (livello 0)',
      'Transizione di livello al livello 0 eseguita',
    ],
  },
  'FS-SN': {
    description: 'Ingresso in area con sistema nazionale',
    detailedDescription:
      'Il treno transita da Full Supervision ETCS a un\'area protetta da un sistema nazionale di protezione treno. L\'ETCS trasferisce la supervisione all\'STM (Modulo di Trasmissione Specifico) per il sistema nazionale interessato (ad es. PZB, KVB, ASFA). Questa è una transizione pianificata al confine tra la copertura ETCS e quella del sistema nazionale.',
    conditions: [
      'Profilo di modo del sistema nazionale ricevuto dal lato terra',
      'STM disponibile e compatibile con il sistema nazionale',
      'Transizione di livello a NTC eseguita',
    ],
  },
  'FS-RV': {
    description: 'Movimento di retromarcia autorizzato',
    detailedDescription:
      'Il macchinista è autorizzato a effettuare un movimento di retromarcia (ad es. arretrare verso una banchina). Il lato terra ha fornito informazioni sull\'area di retromarcia che definiscono la velocità e la distanza consentite. Il macchinista ferma il treno, seleziona la retromarcia e il sistema entra nel modo RV con retromarcia supervisionata.',
    conditions: [
      'Informazioni sull\'area di retromarcia ricevute dal lato terra',
      'Il macchinista seleziona la direzione inversa',
      'Treno fermo',
    ],
  },
  'OS-FS': {
    description: 'Uscita dall\'area On Sight, ripresa di Full Supervision',
    detailedDescription:
      'Il treno ha attraversato l\'area di On Sight (ad es. la sezione con rilevamento del binario guasto) e il profilo di modo FS riprende. Il sistema torna in Full Supervision con piena supervisione della velocità e protezione.',
    conditions: [
      'Fine dell\'area del profilo di modo On Sight raggiunta',
      'Condizioni di Full Supervision soddisfatte (MA e descrizione del tracciato)',
    ],
  },
  'OS-SR': {
    description: 'Il macchinista attiva la funzione Override in On Sight',
    detailedDescription:
      'Se le condizioni per il modo On Sight non possono più essere soddisfatte (ad es. MA scaduta o comunicazione persa), il sistema torna al modo Staff Responsible. Il macchinista deve confermare e assumersi la responsabilità del movimento sicuro.',
    conditions: [
      'Le condizioni per il modo OS non possono più essere mantenute',
      'Il macchinista conferma il modo SR',
    ],
  },
  'OS-TR': {
    description: 'Superamento dell\'EOA in modo On Sight',
    detailedDescription:
      'Anche in modo On Sight, l\'ETCS supervisiona l\'autorizzazione al movimento. Se il treno supera l\'EOA, viene applicata la frenata di emergenza e il sistema entra nel modo Trip.',
    conditions: [
      'Il treno supera l\'End of Authority (EOA)',
    ],
  },
  'LS-FS': {
    description: 'Dati completi del tracciato disponibili, passaggio a FS',
    detailedDescription:
      'Il treno entra in un\'area dove il lato terra fornisce la descrizione completa dei dati del tracciato. Il sistema transita da Limited Supervision a Full Supervision, utilizzando ora dati precisi di pendenza e restrizioni di velocità al posto dei valori nazionali predefiniti.',
    conditions: [
      'Profilo di modo Full Supervision ricevuto dal lato terra',
      'Descrizione completa del tracciato ora disponibile',
    ],
  },
  'LS-TR': {
    description: 'Superamento dell\'EOA in Limited Supervision',
    detailedDescription:
      'Anche in Limited Supervision, l\'EOA è supervisionata. Se il treno supera la propria autorizzazione, viene applicata la frenata di emergenza e il sistema entra nel modo Trip.',
    conditions: [
      'Il treno supera l\'End of Authority (EOA)',
    ],
  },
  'UN-FS': {
    description: 'Ingresso in area attrezzata da area non attrezzata',
    detailedDescription:
      'Il treno transita da un\'area non attrezzata (livello 0) a un\'area attrezzata ETCS. Viene eseguita una transizione di livello e il sistema riceve una MA valida con descrizione del tracciato, abilitando Full Supervision.',
    conditions: [
      'Il treno entra in un\'area attrezzata ETCS',
      'Transizione di livello dal livello 0 al livello 1/2/3',
      'MA valida e descrizione del tracciato ricevute',
    ],
  },
  'UN-SR': {
    description: 'Il macchinista attiva la funzione Override in Unfitted',
    detailedDescription:
      'Il treno entra in un\'area attrezzata ETCS provenendo da un\'area non attrezzata, ma nessuna autorizzazione al movimento è immediatamente disponibile. Il sistema transita nel modo Staff Responsible come riserva sicura fino a quando può essere ottenuta una MA.',
    conditions: [
      'Transizione di livello a livello ETCS ma nessuna MA disponibile',
      'Il macchinista conferma il modo SR',
    ],
  },
  'SN-FS': {
    description: 'Transizione dal sistema nazionale a ETCS',
    detailedDescription:
      'Il treno transita da un\'area con sistema nazionale a un\'area attrezzata ETCS. L\'STM trasferisce la supervisione all\'unità di bordo ETCS, viene eseguita una transizione di livello e il sistema riceve una MA per entrare in Full Supervision. Questa è la transizione transfrontaliera standard.',
    conditions: [
      'Il treno entra in un\'area attrezzata ETCS',
      'Transizione di livello da NTC a livello 1/2/3',
      'MA valida e descrizione del tracciato ricevute',
      'L\'STM trasferisce il controllo all\'ETCS',
    ],
  },
  'SN-SR': {
    description: 'Il macchinista attiva la funzione Override in STM National',
    detailedDescription:
      'Il treno transita da un sistema nazionale a un\'area ETCS, ma nessuna autorizzazione al movimento è disponibile dal lato terra ETCS. Il sistema entra nel modo Staff Responsible come riserva. Il macchinista deve seguire le istruzioni del regolatore fino a quando non viene ottenuta una MA.',
    conditions: [
      'Transizione di livello da NTC a livello ETCS',
      'Nessuna MA disponibile dal lato terra ETCS',
      'Il macchinista conferma il modo SR',
    ],
  },
  'TR-PT': {
    description: 'Treno fermo dopo trip, il macchinista conferma',
    detailedDescription:
      'Dopo l\'applicazione della frenata di emergenza nel modo Trip, il treno decelera fino all\'arresto completo. Il macchinista deve quindi confermare l\'evento di trip sul DMI. Una volta confermato con il treno fermo, il sistema transita nel modo Post Trip, dove possono iniziare le procedure di ripristino.',
    conditions: [
      'Il treno ha raggiunto l\'arresto completo',
      'Il macchinista conferma il trip sul DMI',
    ],
  },
  'PT-SR': {
    description: 'Ripresa del movimento in Staff Responsible dopo trip',
    detailedDescription:
      'Dopo un trip, il ripristino più comune prevede che il macchinista contatti il regolatore, spieghi la situazione e riceva l\'autorizzazione verbale a procedere. Il macchinista quindi richiede il modo SR sul DMI e lo conferma, consentendo al treno di muoversi sotto l\'autorità del regolatore a velocità ridotta.',
    conditions: [
      'Il macchinista contatta il regolatore e riceve l\'autorizzazione',
      'Il macchinista richiede il modo SR sul DMI',
      'Il macchinista conferma il modo SR',
    ],
  },
  'PT-SH': {
    description: 'Shunting dopo trip',
    detailedDescription:
      'Dopo un evento di trip, il regolatore può istruire il macchinista a effettuare un movimento di manovra invece di riprendere il viaggio principale (ad es. per liberare un itinerario in conflitto o spostarsi su un binario di sosta). Il treno transita nel modo Shunting per i movimenti a bassa velocità in piazzale.',
    conditions: [
      'Richiesta o ordine di manovra dopo trip',
      'Il macchinista contatta il regolatore e riceve l\'autorizzazione alla manovra',
    ],
  },
  'SH-SB': {
    description: 'Fine manovra, ritorno a Stand By',
    detailedDescription:
      'Quando le operazioni di manovra sono completate, il macchinista deseleziona il modo manovra. Il sistema torna a Stand By, dove il macchinista può inserire/convalidare i dati del treno e prepararsi per la prossima missione o movimento.',
    conditions: [
      'Fine della manovra (il macchinista esce dalla manovra o il treno si ferma)',
      'Il macchinista deseleziona il modo manovra',
    ],
  },
  'NL-SB': {
    description: 'L\'unità Non Leading diventa di testa',
    detailedDescription:
      'La locomotiva o la cabina Non Leading diventa l\'unità di testa (ad es. dopo un cambio macchinista in una stazione terminale, o al distacco dal convoglio). Il macchinista attiva questa cabina e l\'ETCS transita in Stand By per un nuovo inizio missione.',
    conditions: [
      'Questa unità diventa l\'unità di testa',
      'Il macchinista attiva questa cabina come cabina di testa',
    ],
  },
  'SL-SB': {
    description: 'L\'unità in Sleeping si attiva come unità di testa',
    detailedDescription:
      'L\'unità ETCS di bordo in Sleeping si attiva quando questa cabina viene designata come cabina di testa (ad es. inversione di marcia in una stazione terminale nelle operazioni reversibili). Il macchinista attiva la postazione e il sistema entra in Stand By per la convalida dei dati e l\'inizio missione.',
    conditions: [
      'Questa cabina/unità diventa l\'unità di testa attiva',
      'Postazione di guida attivata',
    ],
  },
  'RV-FS': {
    description: 'Fine retromarcia, ripresa della marcia avanti in FS',
    detailedDescription:
      'Dopo il completamento del movimento di retromarcia (ad es. il treno è arretrato fino alla banchina), il macchinista seleziona la marcia avanti. Se una MA valida è disponibile per il movimento in avanti, il sistema transita in Full Supervision.',
    conditions: [
      'Movimento di retromarcia completato',
      'Il macchinista seleziona la direzione avanti',
      'MA valida per il movimento in avanti disponibile',
    ],
  },
  'FS-FS-MA-UPDATE': {
    description: 'Estensione/aggiornamento della MA in Full Supervision',
    detailedDescription:
      'In Full Supervision, il lato terra estende o aggiorna l\'autorizzazione al movimento (ad es. il segnale successivo si pone a via libera, l\'RBC invia l\'estensione della MA). Questa è la normale operazione continua nel modo FS, mantenendo il treno in marcia con un\'autorità aggiornata.',
    conditions: [
      'Nuova MA o MA estesa ricevuta dal lato terra',
      'Descrizione aggiornata del tracciato ricevuta',
    ],
  },
  'SB-UN': {
    description: 'Inizio missione in area non attrezzata',
    detailedDescription:
      'Quando si inizia una missione in un\'area senza equipaggiamento ETCS a terra (livello 0), il sistema transita nel modo Unfitted dopo l\'inserimento dei dati. Viene fornita solo la supervisione di base della velocità massima.',
    conditions: [
      'Livello ETCS determinato come livello 0',
      'Nessun equipaggiamento ETCS a terra nell\'area',
      'Inserimento dati del macchinista completato',
    ],
  },
  'SB-SN': {
    description: 'Inizio missione in area con sistema nazionale',
    detailedDescription:
      'Quando si inizia una missione in un\'area protetta da un sistema nazionale di protezione treno, l\'ETCS determina il livello come NTC e attiva lo STM appropriato. La supervisione viene trasferita al sistema nazionale.',
    conditions: [
      'Livello ETCS determinato come NTC',
      'STM disponibile e collegato',
      'Equipaggiamento a terra del sistema nazionale rilevato',
    ],
  },
  'OS-SH': {
    description: 'Ordine di manovra in modo On Sight',
    detailedDescription:
      'Procedendo in modo On Sight, viene ricevuto un ordine di manovra (ad es. all\'arrivo in un piazzale). Il sistema transita nel modo Shunting per i movimenti a bassa velocità in piazzale.',
    conditions: [
      'Ordine di manovra ricevuto dal lato terra',
      'Il macchinista conferma la manovra',
    ],
  },
  'LS-SR': {
    description: 'Il macchinista attiva la funzione Override in Limited Supervision',
    detailedDescription:
      'Se le condizioni dell\'autorizzazione al movimento vengono perse durante Limited Supervision (ad es. guasto di comunicazione, incoerenza dei dati), il sistema torna al modo Staff Responsible. Il macchinista deve confermare e assumersi la responsabilità.',
    conditions: [
      'Le condizioni della MA non possono più essere mantenute',
      'Il macchinista conferma il modo SR',
    ],
  },
  'LS-OS': {
    description: 'Ingresso in area On Sight da Limited Supervision',
    detailedDescription:
      'In Limited Supervision, il treno entra in un\'area con un profilo di modo On Sight. Il sistema transita nel modo OS per la sezione a velocità ridotta.',
    conditions: [
      'Profilo di modo On Sight ricevuto dal lato terra',
      'Il treno entra nell\'area del profilo di modo OS',
    ],
  },
  'UN-SN': {
    description: 'Sistema nazionale rilevato da area non attrezzata',
    detailedDescription:
      'In modo Unfitted (livello 0), il treno entra in un\'area con un sistema nazionale di protezione treno. L\'STM viene attivato e la supervisione viene trasferita al sistema nazionale.',
    conditions: [
      'Equipaggiamento a terra del sistema nazionale rilevato',
      'STM disponibile e compatibile',
      'Transizione di livello a NTC',
    ],
  },
  'SN-UN': {
    description: 'Uscita dall\'area del sistema nazionale verso area non attrezzata',
    detailedDescription:
      'Il treno lascia l\'area protetta dal sistema nazionale ed entra in una sezione non attrezzata (livello 0). L\'STM viene disattivato e il sistema fornisce solo la supervisione di base della velocità massima.',
    conditions: [
      'L\'equipaggiamento a terra del sistema nazionale termina',
      'Nessun equipaggiamento ETCS a terra presente',
      'Transizione di livello da NTC a livello 0',
    ],
  },
  'FS-SB': {
    description: 'Fine missione da Full Supervision',
    detailedDescription:
      'Quando il treno raggiunge la destinazione e si ferma, il macchinista esegue la procedura di fine missione (ad es. chiusura della postazione o conferma di fine missione sul DMI). L\'autorizzazione al movimento viene rilasciata e il sistema torna a Stand By, pronto per una nuova missione o lo spegnimento.',
    conditions: [
      'Treno fermo',
      'Procedura di fine missione eseguita dal macchinista',
    ],
  },
  'SR-SB': {
    description: 'Fine missione da Staff Responsible',
    detailedDescription:
      'In modo Staff Responsible, il macchinista può terminare la missione quando il treno è fermo (ad es. arrivo a destinazione senza aver mai ricevuto una MA). Il sistema torna a Stand By.',
    conditions: [
      'Treno fermo',
      'Procedura di fine missione eseguita dal macchinista',
    ],
  },
  'OS-SB': {
    description: 'Fine missione da On Sight',
    detailedDescription:
      'Il macchinista termina la missione in modo On Sight con il treno fermo. Il sistema torna a Stand By.',
    conditions: [
      'Treno fermo',
      'Procedura di fine missione eseguita dal macchinista',
    ],
  },
  'LS-SB': {
    description: 'Fine missione da Limited Supervision',
    detailedDescription:
      'Il macchinista termina la missione in modo Limited Supervision con il treno fermo. Il sistema torna a Stand By.',
    conditions: [
      'Treno fermo',
      'Procedura di fine missione eseguita dal macchinista',
    ],
  },
  'UN-SB': {
    description: 'Fine missione da Unfitted',
    detailedDescription:
      'Il macchinista termina la missione in modo Unfitted (area di livello 0) con il treno fermo. Il sistema torna a Stand By.',
    conditions: [
      'Treno fermo',
      'Procedura di fine missione eseguita dal macchinista',
    ],
  },
  'SN-SB': {
    description: 'Fine missione da STM National',
    detailedDescription:
      'Il macchinista termina la missione in modo STM National con il treno fermo. La sessione STM viene chiusa e il sistema torna a Stand By.',
    conditions: [
      'Treno fermo',
      'Procedura di fine missione eseguita dal macchinista',
      'Sessione STM chiusa',
    ],
  },
  'PT-SB': {
    description: 'Fine missione da Post Trip',
    detailedDescription:
      'Dopo un evento di trip e la conferma, il macchinista può scegliere di terminare la missione invece di effettuare il ripristino. Il sistema torna a Stand By per un nuovo inizio missione.',
    conditions: [
      'Treno fermo',
      'Procedura di fine missione eseguita dal macchinista',
    ],
  },
  'ANY-SF': {
    description: 'System Failure da qualsiasi modo',
    detailedDescription:
      'Da qualsiasi modo ETCS attivo, se l\'equipaggiamento di bordo rileva un\'avaria interna critica per la sicurezza (hardware, software o integrità dei dati), transita immediatamente nel modo System Failure. Viene applicata la frenata di emergenza e il macchinista deve seguire le norme nazionali. Questa transizione può avvenire da qualsiasi modo.',
    conditions: [
      'Avaria critica per la sicurezza rilevata a bordo',
    ],
  },
  'ANY-IS': {
    description: 'ETCS isolato dal macchinista da qualsiasi modo',
    detailedDescription:
      'Da qualsiasi modo, il macchinista può azionare l\'interruttore fisico di isolamento ETCS per disabilitare completamente l\'equipaggiamento di bordo ETCS. Questa è un\'azione deliberata utilizzata quando l\'ETCS è difettoso e deve essere messo fuori servizio. Tutte le funzioni ETCS cessano immediatamente.',
    conditions: [
      'Il macchinista aziona l\'interruttore fisico di isolamento ETCS',
    ],
  },
  'ANY-NP': {
    description: 'Perdita di alimentazione da qualsiasi modo',
    detailedDescription:
      'Da qualsiasi modo, se l\'equipaggiamento di bordo ETCS perde la propria alimentazione (disattivazione della cabina, guasto di alimentazione, interruttore principale spento), il sistema transita in No Power. Tutte le funzioni ETCS cessano. Può essere un\'azione deliberata (fine missione) o un evento imprevisto (guasto di alimentazione).',
    conditions: [
      'L\'equipaggiamento di bordo ETCS perde l\'alimentazione',
    ],
  },
  'SF-NP': {
    description: 'Ciclo di alimentazione dopo System Failure',
    detailedDescription:
      'Dopo un System Failure, la procedura di ripristino standard prevede lo spegnimento dell\'equipaggiamento di bordo ETCS (transizione a NP) e poi la riaccensione (da NP a SB). Se il guasto era transitorio, il sistema può avviarsi normalmente. Se il guasto persiste, potrebbe essere necessario l\'isolamento.',
    conditions: [
      'Il macchinista spegne l\'ETCS per tentare il ripristino',
    ],
  },
  'IS-NP': {
    description: 'Fine isolamento, riavvio del sistema',
    detailedDescription:
      'Il macchinista riporta l\'interruttore di isolamento in posizione normale. L\'ETCS transita attraverso NP (sequenza di accensione) e poi a SB dopo l\'autotest. Ciò ripristina le funzionalità ETCS se il guasto sottostante è stato risolto.',
    conditions: [
      'Interruttore di isolamento riportato in posizione normale',
    ],
  },
  'FS-AD': {
    description: 'Attivazione ATO — inizio Automatic Driving',
    detailedDescription:
      'Quando tutte le condizioni di attivazione ATO sono soddisfatte e il macchinista conferma l\'attivazione sul DMI ATO, l\'ETCS transita da Full Supervision ad Automatic Driving. Il sistema ATO di bordo assume il controllo della trazione e della frenata mentre l\'ETCS continua a fornire piena supervisione di sicurezza. L\'autorizzazione al movimento, il profilo di velocità e le curve di frenata restano applicati. Questa transizione è definita nel Subset-125 (ATO SRS) e nell\'interfaccia Subset-130 ATO-OB/ETCS-OB.',
    conditions: [
      'L\'ATO di bordo è nello stato Ready for Engagement (RE)',
      'Il macchinista conferma l\'attivazione ATO tramite DMI (GoA 2)',
      'Profilo di Viaggio valido ricevuto dal lato terra ATO',
      'Treno fermo o entro la finestra di velocità di attivazione',
    ],
  },
  'AD-FS': {
    description: 'Disattivazione ATO — ritorno alla guida manuale sotto FS',
    detailedDescription:
      'Quando il macchinista riprende il controllo manuale (premendo il pulsante di disattivazione o azionando i comandi di trazione/frenata) o quando l\'ATO completa il proprio viaggio, il sistema transita da Automatic Driving a Full Supervision. Il macchinista riprende il controllo manuale con supervisione continua della velocità ETCS. Questa è la conclusione normale e controllata dell\'operazione ATO.',
    conditions: [
      'Il macchinista disattiva l\'ATO tramite DMI o con override di trazione/frenata, oppure',
      'Fine del Profilo di Viaggio raggiunta, oppure',
      'L\'ATO completa la disattivazione controllata',
    ],
  },
  'AD-SH': {
    description: 'Transizione a Shunting da Automatic Driving',
    detailedDescription:
      'In determinati scenari operativi, può essere necessaria una transizione da Automatic Driving a Shunting (ad es. in avvicinamento a un piazzale). L\'ATO viene disattivato e l\'ETCS transita nel modo Shunting con la supervisione ridotta corrispondente.',
    conditions: [
      'Richiesta di manovra confermata durante il funzionamento ATO',
    ],
  },
  'SB-TR': {
    description: 'Trip da Stand By',
    detailedDescription:
      'Una condizione di sicurezza causa un trip in modalità Stand By. L\'ETCS applica immediatamente la frenata di emergenza.',
    conditions: ['Condizione di trip rilevata dal sistema'],
  },
  'SH-TR': {
    description: 'Trip durante le manovre',
    detailedDescription:
      'Una condizione di sicurezza causa un trip durante le operazioni di manovra. L\'ETCS applica immediatamente la frenata di emergenza.',
    conditions: ['Condizione di trip rilevata durante le manovre'],
  },
  'FS-NL': {
    description: 'Transizione a Non Leading da Full Supervision',
    detailedDescription:
      'Il macchinista indica che questa unità non è più l\'unità di trazione principale. L\'ETCS passa alla modalità Non Leading.',
    conditions: [
      'Il macchinista seleziona Non Leading',
      'Un\'altra unità assume il controllo principale',
    ],
  },
  'UN-TR': {
    description: 'Trip in modalità Unfitted',
    detailedDescription:
      'Una condizione di sicurezza causa un trip in zona non attrezzata. L\'ETCS applica immediatamente la frenata di emergenza.',
    conditions: [
      'Condizione di trip rilevata in territorio non attrezzato',
    ],
  },
  'SN-TR': {
    description: 'Trip in modalità STM National',
    detailedDescription:
      'Una condizione di sicurezza causa un trip sotto il sistema nazionale tramite STM. L\'ETCS applica immediatamente la frenata di emergenza.',
    conditions: [
      'Condizione di trip rilevata sotto supervisione del sistema nazionale',
    ],
  },
  'RV-SB': {
    description: 'Fine del retrocesso a Stand By',
    detailedDescription:
      'Dopo aver completato il movimento di retrocesso autorizzato, il sistema passa a Stand By per riprendere la preparazione della missione.',
    conditions: ['Movimento di retrocesso completato', 'Treno fermo'],
  },
  'AD-TR': {
    description: 'Trip in Automatic Driving',
    detailedDescription:
      'Una condizione di sicurezza causa un trip durante l\'operazione ATO. L\'ETCS annulla la guida automatica e applica immediatamente la frenata di emergenza.',
    conditions: [
      'Condizione di trip rilevata durante la guida automatica',
    ],
  },
};
