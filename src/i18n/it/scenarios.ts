import type { ScenarioTranslation } from '../types';

export const itScenarios: Record<string, ScenarioTranslation> = {
  'normal-start': {
    title: 'Inizio missione normale',
    description:
      'Seguite un macchinista attraverso la sequenza standard di avvio ETCS: accensione, inserimento dati, ricezione dell\'autorizzazione al movimento e gestione di un\'area On Sight durante il viaggio.',
    category: 'Operazioni normali',
    steps: [
      {
        situation:
          'Siete un macchinista che arriva al deposito la mattina presto. Salite in cabina e girate la chiave per accendere l\'equipaggiamento di bordo ETCS. Il sistema esegue l\'autotest — verificando processori, memoria, sensori odometrici e l\'unità di registrazione giuridica. Tutti i controlli sono superati e lo schermo del DMI si illumina, mostrando i campi di inserimento dati.',
        question:
          'L\'ETCS si è acceso e ha completato l\'autotest con successo. In quale modo entra il sistema?',
        explanation:
          'Dopo l\'accensione e un autotest riuscito, l\'ETCS entra sempre nel modo Stand By (SB). Questo è il modo di accesso in cui il macchinista deve inserire il proprio ID, i dati del treno e confermare il livello ETCS prima che qualsiasi missione possa iniziare. Il sistema non può andare direttamente in Full Supervision perché non esiste ancora alcuna autorizzazione al movimento.',
        hint: 'Pensate a cosa deve accadere prima che il treno possa muoversi. Il sistema necessita prima dei dati del macchinista e del treno.',
      },
      {
        situation:
          'Inserite il vostro ID macchinista, il numero del treno e convalidate i dati del treno (lunghezza: 200 m, velocità massima: 160 km/h, caratteristiche di frenata). Il livello ETCS viene confermato come livello 2 e l\'unità di bordo stabilisce una sessione di comunicazione con il Radio Block Centre (RBC). L\'RBC invia un\'autorizzazione al movimento valida con una descrizione completa del tracciato comprendente profilo di velocità e dati di pendenza.',
        question:
          'Avete completato l\'inserimento dei dati e ricevuto un\'autorizzazione al movimento completa con descrizione completa del tracciato. In quale modo deve transitare il sistema?',
        explanation:
          'Quando viene ricevuta una MA valida con descrizione completa del tracciato (profilo di velocità, pendenze), il sistema transita in Full Supervision (FS). Questo è l\'inizio missione ideale — il treno ha tutto il necessario per la massima protezione ETCS. Staff Responsible verrebbe utilizzato solo se non fosse disponibile alcuna MA.',
        hint: 'Avete le migliori condizioni possibili: MA completa e dati del tracciato completi. Quale modo fornisce il massimo livello di supervisione?',
      },
      {
        situation:
          'State circolando a 120 km/h in Full Supervision lungo la linea principale. Tutto è normale — il DMI mostra la velocità consentita, la distanza dall\'obiettivo e la vostra velocità attuale. Più avanti, il regolatore ha instradato un itinerario attraverso una stazione dove l\'equipaggiamento di rilevamento del binario è parzialmente guasto. L\'RBC invia una MA aggiornata contenente un profilo di modo On Sight per la sezione successiva di 800 m.',
        question:
          'L\'RBC ha inviato un profilo di modo On Sight perché il binario davanti potrebbe essere occupato a causa di un guasto dell\'equipaggiamento di rilevamento. Quando entrate in quest\'area, in quale modo transita il sistema?',
        explanation:
          'Quando il lato terra invia un profilo di modo On Sight (OS), il sistema transita nel modo OS all\'ingresso in quell\'area. Nel modo OS, la velocità è limitata a 30 km/h e dovete guidare a vista — pronti a fermarvi entro la distanza di visibilità. La MA resta valida; cambia solo il modo di supervisione per riflettere l\'incertezza sull\'occupazione del binario.',
        hint: 'Il binario davanti potrebbe essere occupato. Quale modo richiede al macchinista di essere pronto a fermarsi a vista?',
      },
      {
        situation:
          'Procedete con cautela a 25 km/h attraverso l\'area di On Sight, osservando attentamente la presenza di eventuali ostruzioni. La sezione è libera e dopo 800 metri superate la fine dell\'area del profilo di modo OS. Il rilevamento del binario funziona normalmente oltre questo punto e sono disponibili i dati completi della descrizione del tracciato.',
        question:
          'Avete attraversato in sicurezza l\'area di On Sight. Il binario davanti ha il rilevamento funzionante e sono disponibili i dati completi del tracciato. Quale modo riprende il sistema?',
        explanation:
          'Una volta che il treno lascia l\'area di On Sight e riprende la descrizione completa del tracciato con condizioni normali, il sistema torna automaticamente in Full Supervision (FS). Questo è il ripristino standard: OS è una restrizione temporanea applicata a una sezione specifica, e FS riprende quando quella sezione termina.',
        hint: 'Le condizioni che hanno causato il modo On Sight non si applicano più. Qual era il modo prima di entrare nell\'area OS?',
      },
    ],
  },
  'trip-recovery': {
    title: 'Trip e ripristino',
    description:
      'Vivete la procedura di trip di emergenza: cosa accade quando un treno supera il proprio End of Authority e il processo di ripristino passo dopo passo che coinvolge il macchinista, il regolatore e il sistema ETCS.',
    category: 'Operazioni degradate',
    steps: [
      {
        situation:
          'State guidando a 80 km/h in Full Supervision, in avvicinamento a una stazione dove il prossimo segnale è a via impedita. Il DMI mostra la curva di frenata e la velocità obiettivo di 0 km/h all\'End of Authority (EOA). Valutate male la distanza di frenata — forse la rotaia è bagnata e l\'aderenza è scarsa. Nonostante l\'intervento della frenata di servizio, il treno supera l\'EOA di 15 metri.',
        question:
          'Il treno ha superato l\'End of Authority. L\'ETCS rileva che il treno ha superato l\'EOA. Cosa succede immediatamente?',
        explanation:
          'Il superamento dell\'End of Authority (EOA) è la violazione di sicurezza più critica nell\'ETCS. Il sistema entra immediatamente nel modo Trip (TR) e comanda l\'applicazione completa della frenata di emergenza. Questa è la funzione di sicurezza fondamentale dell\'ETCS — impedire ai treni di entrare in un tratto non protetto dove potrebbe verificarsi una collisione.',
        hint: 'Questo è un evento critico per la sicurezza. Il treno ha superato il suo limite di sicurezza. Qual è il modo di risposta di emergenza?',
      },
      {
        situation:
          'La frenata di emergenza è stata applicata e il treno sta decelerando rapidamente. Dopo alcuni secondi concitati, il treno si arresta completamente circa 40 metri oltre l\'EOA. Il DMI visualizza in evidenza l\'indicazione di Trip. Il cuore batte forte, ma dovete seguire la procedura di ripristino. Premete il pulsante di conferma sul DMI.',
        question:
          'Il treno si è fermato e avete confermato il trip sul DMI. In quale modo entra il sistema per la fase di ripristino?',
        explanation:
          'Dopo un trip, una volta che il treno raggiunge l\'arresto completo e il macchinista conferma il trip sul DMI, il sistema entra nel modo Post Trip (PT). Questo è uno stato di ripristino controllato — il treno non può muoversi in avanti e il macchinista deve contattare il regolatore prima di qualsiasi ulteriore azione. PT garantisce una pausa procedurale per la valutazione della sicurezza.',
        hint: 'Dopo la fermata di emergenza, il sistema necessita di uno stato di ripristino. Non è ancora sicuro muoversi — quale modo gestisce il periodo tra il trip e la ripresa del movimento?',
      },
      {
        situation:
          'Siete in modo Post Trip. Il treno è fermo 40 metri oltre il segnale a via impedita. Contattate il regolatore via radio GSM-R e segnalate l\'evento di trip, fornendo la vostra posizione e il numero del treno. Il regolatore verifica l\'apparato e conferma che l\'overlap oltre il segnale è libero e non vi è alcun itinerario in conflitto instradato. Il regolatore vi dà un\'autorizzazione verbale a procedere oltre il segnale.',
        question:
          'Il regolatore ha confermato che l\'itinerario è sicuro e vi ha autorizzato a procedere. Richiedete di avanzare sul DMI. In quale modo entrerà il sistema?',
        explanation:
          'Dopo un trip, il ripristino standard prevede di procedere in modo Staff Responsible (SR). Il macchinista ha ricevuto l\'autorizzazione verbale dal regolatore e richiede il modo SR sul DMI. In modo SR, l\'ETCS supervisiona una velocità massima (40 km/h) ma il macchinista si assume la responsabilità del movimento sicuro. Non è possibile entrare in Full Supervision perché in questo momento non è disponibile alcuna MA.',
        hint: 'Avete un\'autorizzazione verbale dal regolatore ma nessuna autorizzazione al movimento elettronica dall\'RBC. Quale modo consente il movimento sotto responsabilità del macchinista?',
      },
      {
        situation:
          'State procedendo con cautela a 35 km/h in modo Staff Responsible. Quando superate il segnale successivo (che mostra un aspetto di via libera), il treno transita su un gruppo di boe che trasmette una nuova autorizzazione al movimento dall\'RBC. La MA include una descrizione completa del tracciato con profilo di velocità e dati di pendenza per l\'itinerario davanti.',
        question:
          'Avete ricevuto un\'autorizzazione al movimento valida con descrizione completa del tracciato in modo SR. In quale modo transita il sistema?',
        explanation:
          'Quando viene ricevuta una MA valida con descrizione completa del tracciato in modo Staff Responsible, il sistema transita automaticamente in Full Supervision (FS). Questo è il percorso di ripristino normale: SR è un modo degradato temporaneo e la ricezione di una MA appropriata ripristina la piena protezione ETCS.',
        hint: 'Ora avete tutto il necessario per il massimo livello di supervisione. Qual è il modo operativo principale dell\'ETCS?',
      },
      {
        situation:
          'Avete completato il viaggio con successo e siete arrivati alla stazione terminale. Il treno è fermo al marciapiede. È la fine della vostra missione — dovete spegnere l\'ETCS e consegnare il treno al prossimo macchinista. Chiudete la postazione e spegnete l\'equipaggiamento di bordo ETCS.',
        question:
          'State spegnendo l\'ETCS al termine della missione. Il sistema torna prima a Stand By quando chiudete la missione. Poi cosa succede quando togliete l\'alimentazione?',
        explanation:
          'Quando l\'equipaggiamento di bordo ETCS viene spento, il sistema entra nel modo No Power (NP). Tutte le funzioni ETCS cessano — niente DMI, nessuna supervisione, nessuna comunicazione. Questo è lo stato naturale di fine missione. Isolation (IS) è diverso: quello è la disabilitazione deliberata di un sistema alimentato tramite l\'interruttore di isolamento.',
        hint: 'L\'equipaggiamento non ha più alimentazione elettrica. Qual è lo stato non operativo più fondamentale?',
      },
    ],
  },
  'shunting-ops': {
    title: 'Operazioni di manovra',
    description:
      'Imparate come i treni transitano da e verso il modo Shunting per le operazioni in piazzale come l\'aggancio di carrozze e la composizione dei treni prima della partenza in linea.',
    category: 'Operazioni in piazzale',
    steps: [
      {
        situation:
          'Siete in un piazzale di smistamento. L\'ETCS è in Stand By dopo l\'accensione e l\'inserimento dei dati. Il controllore del piazzale vi istruisce a portare la locomotiva al binario 3 per agganciarvi a un convoglio di carrozze passeggeri. Premete il pulsante di richiesta manovra sul DMI.',
        question:
          'Avete richiesto la manovra da Stand By. Il sistema accetta la richiesta. In quale modo entra l\'ETCS?',
        explanation:
          'Quando viene effettuata una richiesta di manovra da Stand By, il sistema entra nel modo Shunting (SH). Nel modo SH, l\'ETCS supervisiona una velocità massima di 30 km/h ma non fornisce alcuna autorizzazione al movimento né protezione dell\'itinerario. Il macchinista è responsabile dell\'osservazione del binario davanti e del rispetto delle istruzioni del controllore del piazzale.',
        hint: 'Dovete effettuare movimenti a bassa velocità in piazzale. Quale modo è specificamente progettato per le operazioni di smistamento?',
      },
      {
        situation:
          'Vi siete agganciati con successo alle carrozze passeggeri e avete completato tutti i movimenti di manovra. Il treno è ora composto e pronto per la partenza in linea. Deselezionate il modo manovra sul DMI per prepararvi all\'inizio della missione in linea.',
        question:
          'La manovra è completata e avete deselezionato il modo manovra. In quale modo torna il sistema?',
        explanation:
          'Quando la manovra viene deselezionata, il sistema torna al modo Stand By (SB). Questo è il modo di accesso centrale — da qui potete convalidare i dati del treno (che possono essere cambiati dopo l\'aggancio) e prepararvi per la missione in linea. SB è sempre il passo intermedio tra Shunting e i modi operativi.',
        hint: 'Dopo la manovra, il macchinista deve convalidare i dati e prepararsi per la prossima missione. Quale modo funge da accesso a tutti i modi operativi?',
      },
      {
        situation:
          'Tornati in Stand By, convalidate i dati aggiornati del treno (il treno è ora più lungo con le carrozze). Il livello ETCS viene confermato come livello 2 e l\'RBC stabilisce la comunicazione. Viene ricevuta un\'autorizzazione al movimento valida con descrizione completa del tracciato per l\'itinerario di partenza dalla stazione.',
        question:
          'I dati del treno sono convalidati e un\'autorizzazione al movimento completa è stata ricevuta. In quale modo transita il sistema per la partenza in linea?',
        explanation:
          'Con l\'inserimento dati completato, una MA valida e la descrizione completa del tracciato, il sistema transita in Full Supervision (FS). Questo è lo scenario di partenza ideale — il treno ha tutto il necessario per la massima protezione ETCS in linea.',
        hint: 'Avete tutte le condizioni per il modo operativo più sicuro: MA completa e dati del tracciato completi.',
      },
    ],
  },
  'non-equipped-crossing': {
    title: 'Attraversamento di aree non attrezzate',
    description:
      'Navigate in un viaggio transfrontaliero che attraversa dal territorio ETCS a un tratto non attrezzato, ritorna nell\'ETCS e poi entra in un\'area con sistema nazionale di protezione treno.',
    category: 'Operazioni transfrontaliere',
    steps: [
      {
        situation:
          'State guidando un treno merci transfrontaliero a 100 km/h in Full Supervision su una linea principale ETCS livello 2. L\'itinerario attraversa una sezione di linea secondaria che non è stata dotata di equipaggiamento ETCS a terra. Il gruppo di boe annuncia una transizione di livello dal livello 2 al livello 0. Non ci sono boe ETCS, nessuna comunicazione RBC e nessun sistema nazionale di protezione treno su questa sezione.',
        question:
          'Il treno sta entrando in una sezione senza equipaggiamento ETCS a terra (livello 0) e senza sistema nazionale. In quale modo transita l\'ETCS?',
        explanation:
          'Quando il treno entra in un\'area senza equipaggiamento ETCS a terra (livello 0) e non è disponibile alcun sistema nazionale tramite STM, il sistema entra nel modo Unfitted (UN). L\'ETCS fornisce solo la supervisione di base della velocità massima basata sui valori nazionali. Il macchinista deve seguire i segnali laterali e le norme operative nazionali. STM National (SN) si applicherebbe solo se fosse presente un sistema nazionale.',
        hint: 'Non c\'è ETCS a terra e nessun sistema nazionale. La linea è completamente "non attrezzata." Quale modo gestisce il livello 0?',
      },
      {
        situation:
          'Avete percorso la sezione non attrezzata per 20 chilometri, seguendo i segnali laterali e le tabelle di velocità. Davanti, vedete la tabella di transizione ETCS che indica il rientro in un\'area attrezzata ETCS. Il treno supera un gruppo di boe che annuncia una transizione di livello dal livello 0 al livello 2. Tuttavia, l\'RBC è congestionato e non può fornire immediatamente un\'autorizzazione al movimento.',
        question:
          'State rientrando in un\'area attrezzata ETCS (livello 2) ma non è ancora disponibile alcuna autorizzazione al movimento dall\'RBC. In quale modo transita il sistema?',
        explanation:
          'Quando si transita da un\'area non attrezzata a un\'area attrezzata ETCS senza una MA valida, il sistema entra nel modo Staff Responsible (SR). Questa è la riserva sicura: il macchinista conferma il modo SR e procede sotto la propria responsabilità alla velocità massima ridotta (40 km/h) fino a quando può essere ottenuta una MA dall\'RBC.',
        hint: 'Siete in territorio ETCS ma non avete autorizzazione al movimento. Quale modo consente il movimento sotto responsabilità del macchinista senza MA?',
      },
      {
        situation:
          'Dopo alcuni minuti in Staff Responsible, l\'RBC risolve la congestione e invia un\'autorizzazione al movimento valida con descrizione completa del tracciato tramite il collegamento radio. L\'unità di bordo riceve la MA e ne verifica l\'integrità.',
        question:
          'Una MA valida con descrizione completa del tracciato è stata ricevuta dall\'RBC. In quale modo transita il sistema?',
        explanation:
          'La ricezione di una MA valida con descrizione completa del tracciato in modo SR attiva una transizione automatica in Full Supervision (FS). Questo è il normale percorso di passaggio — SR è una riserva temporanea e FS fornisce la protezione completa per cui l\'ETCS è progettato.',
        hint: 'Le condizioni sono ora ideali: MA completa, dati del tracciato completi. Qual è il modo di supervisione più elevato?',
      },
      {
        situation:
          'Più avanti lungo l\'itinerario, vi avvicinate al confine con il Paese confinante. La ferrovia è protetta da un sistema nazionale di protezione treno (PZB). Il lato terra ETCS invia un profilo di modo del sistema nazionale e il vostro treno è dotato dello STM appropriato. Viene comandata una transizione di livello da ETCS livello 2 a NTC.',
        question:
          'Il treno sta attraversando in un\'area protetta da un sistema nazionale (PZB) tramite STM. In quale modo transita l\'ETCS?',
        explanation:
          'Quando il treno entra in un\'area protetta da un sistema nazionale di protezione treno e dispone di un STM compatibile, l\'ETCS transita nel modo STM National (SN). L\'STM assume la supervisione utilizzando le regole e l\'equipaggiamento del sistema nazionale. Questo è diverso dal modo Unfitted (UN), che si applica quando non vi è alcun sistema di protezione.',
        hint: 'È presente un sistema nazionale di protezione treno e il treno ha lo STM per interfacciarsi con esso. Quale modo delega al sistema nazionale?',
      },
    ],
  },
  'system-failure': {
    title: 'Gestione del guasto di sistema',
    description:
      'Gestite un\'avaria critica di bordo: dalla risposta iniziale di emergenza attraverso l\'isolamento, l\'operatività secondo le norme nazionali e l\'eventuale ripristino del sistema.',
    category: 'Guasti e ripristino',
    steps: [
      {
        situation:
          'State circolando a 140 km/h in Full Supervision su una linea ad alta velocità. Improvvisamente, l\'equipaggiamento di bordo ETCS rileva un\'avaria interna critica per la sicurezza — il processore dell\'odometria ha prodotto letture incoerenti e il sistema non può garantire una misurazione accurata della velocità. L\'unità di bordo determina che non può più supervisionare il movimento del treno in sicurezza.',
        question:
          'L\'ETCS ha rilevato un\'avaria interna critica per la sicurezza e non può garantire una supervisione sicura. In quale modo entra il sistema?',
        explanation:
          'Quando l\'unità di bordo ETCS rileva un\'avaria critica che le impedisce di garantire una supervisione sicura, entra nel modo System Failure (SF) e applica immediatamente la frenata di emergenza. Questo è diverso da un Trip (TR), che è causato da una violazione di sicurezza esterna (superamento dell\'EOA). SF significa che il sistema stesso è difettoso e non può essere considerato affidabile.',
        hint: 'Il guasto è interno all\'equipaggiamento ETCS stesso. Il sistema ha perso la capacità di supervisionare in sicurezza. Quale modo indica un\'avaria dell\'equipaggiamento di bordo?',
      },
      {
        situation:
          'La frenata di emergenza ha portato il treno all\'arresto in piena linea. Il DMI mostra l\'indicazione di System Failure. Tentate un ciclo di alimentazione — spegnete l\'ETCS e lo riaccendete. Tuttavia, l\'autotest fallisce di nuovo: il guasto del processore dell\'odometria è persistente. L\'ETCS non può avviarsi normalmente. Dovete portare il treno alla prossima stazione per la manutenzione. Decidete di utilizzare l\'interruttore fisico di isolamento ETCS.',
        question:
          'Il guasto è persistente e l\'ETCS non può riavviarsi. Azionate l\'interruttore fisico di isolamento per disabilitare completamente l\'ETCS. In quale modo si trova il sistema?',
        explanation:
          'L\'azionamento dell\'interruttore fisico di isolamento ETCS pone il sistema nel modo Isolation (IS). Questo disabilita deliberatamente tutte le funzioni ETCS. A differenza di No Power (NP), dove il sistema semplicemente non ha elettricità, Isolation è una decisione attiva del macchinista di mettere l\'ETCS fuori servizio. Il treno opererà ora interamente secondo le norme nazionali senza alcuna protezione ETCS.',
        hint: 'Il macchinista sta deliberatamente disabilitando l\'ETCS utilizzando un interruttore fisico. Non si tratta di uno spegnimento ma di un isolamento attivo. Quale modo rappresenta questo?',
      },
      {
        situation:
          'Con l\'ETCS isolato, state operando il treno solo secondo le norme nazionali. Contattate il regolatore, che vi autorizza a procedere a velocità molto bassa fino alla prossima stazione a 8 km. Guidate con cautela, osservando i segnali laterali e le tabelle di velocità. Arrivate in sicurezza al marciapiede della stazione e il treno viene ritirato dal servizio per la manutenzione.',
        question:
          'La manutenzione ha riparato il processore dell\'odometria e deve ripristinare l\'ETCS. Il primo passo è riportare l\'interruttore di isolamento in posizione normale. In quale modo entra l\'ETCS quando l\'interruttore di isolamento viene ripristinato?',
        explanation:
          'Quando l\'interruttore di isolamento viene riportato in posizione normale, l\'ETCS transita prima nel modo No Power (NP). Il sistema deve poi seguire l\'intera sequenza di accensione (da NP a SB) incluso l\'autotest. Non passa direttamente a Stand By — il ripristino dell\'interruttore di isolamento attiva una sequenza di riavvio pulita attraverso lo stato senza alimentazione.',
        hint: 'Il ripristino dell\'interruttore di isolamento è come un nuovo inizio. Il sistema deve seguire la sequenza completa di accensione. Qual è lo stato iniziale prima dell\'accensione?',
      },
      {
        situation:
          'Il team di manutenzione accende l\'equipaggiamento di bordo ETCS. Questa volta l\'autotest viene superato con successo — il processore dell\'odometria riparato supera tutti i controlli, l\'integrità della memoria è verificata e tutti i sottosistemi segnalano uno stato normale. Il DMI si illumina e mostra la schermata di inserimento dati.',
        question:
          'L\'ETCS è stato acceso e l\'autotest è stato superato dopo la riparazione. In quale modo entra il sistema?',
        explanation:
          'Dopo un\'accensione riuscita e il superamento dell\'autotest, l\'ETCS entra sempre nel modo Stand By (SB), indipendentemente da quanto accaduto prima. Questa è la sequenza di avvio standard: da NP a SB. Da Stand By, può essere avviata una nuova missione con un nuovo inserimento dati. Il sistema è stato completamente ripristinato al funzionamento normale.',
        hint: 'Questa è la sequenza standard di accensione. Dopo l\'autotest, il sistema attende l\'inserimento dei dati del macchinista in quale modo?',
      },
    ],
  },
  'multiple-traction': {
    title: 'Operazioni in trazione multipla',
    description:
      'Comprendete come l\'ETCS gestisce i treni con più unità motrici: configurare una locomotiva come Non Leading, operare in un convoglio e poi riconfigurare per l\'operazione autonoma.',
    category: 'Operazioni speciali',
    steps: [
      {
        situation:
          'Siete nella cabina di una seconda locomotiva che sarà agganciata in coda a un pesante treno merci. La locomotiva di testa ha già il proprio ETCS in Full Supervision e controllerà il treno. La vostra locomotiva fornirà trazione aggiuntiva ma non deve emettere comandi di frenata in conflitto né detenere un\'autorizzazione al movimento separata. Selezionate "Non Leading" sul DMI.',
        question:
          'Avete configurato questo ETCS come Non Leading perché un\'altra locomotiva è al comando. In quale modo entra il sistema?',
        explanation:
          'Quando il macchinista seleziona Non Leading, il sistema entra nel modo Non Leading (NL). In questo modo, l\'ETCS è attivo e consapevole del proprio stato ma non detiene una MA, non emette comandi di frenata e non supervisiona la velocità. Questo impedisce un controllo in conflitto tra più unità ETCS nello stesso treno. Sleeping (SL) è diverso — quello è per una cabina inattiva, non per un\'unità non di testa con personale.',
        hint: 'Questa unità ha un macchinista ma non è l\'unità che comanda. Deve essere attiva ma passiva. Quale modo è per un\'unità di trazione non di testa con personale?',
      },
      {
        situation:
          'Il treno merci completa il viaggio. Nel piazzale di destinazione, le locomotive vengono sganciate. La vostra locomotiva è ora autonoma e deve operare indipendentemente per la prossima missione — un movimento a macchina isolata verso il deposito. Riconfigurate la cabina come unità di testa selezionando l\'opzione appropriata sul DMI.',
        question:
          'State riconfigurando questa locomotiva come unità di testa per l\'operazione indipendente. In quale modo transita l\'ETCS?',
        explanation:
          'Quando un\'unità Non Leading diventa l\'unità di testa, l\'ETCS transita nel modo Stand By (SB). Questo consente al macchinista di inserire o convalidare i dati del treno per la nuova missione (i dati del treno saranno diversi ora — locomotiva singola invece dell\'intero convoglio). Stand By è sempre il modo di accesso per l\'inizio di una nuova missione.',
        hint: 'La locomotiva è ora indipendente e deve iniziare una nuova missione. Qual è il modo di accesso in cui avviene l\'inserimento dei dati?',
      },
      {
        situation:
          'Aggiornate i dati del treno per il movimento a macchina isolata (lunghezza molto ridotta, caratteristiche di frenata diverse). L\'ETCS stabilisce una nuova sessione RBC e riceve un\'autorizzazione al movimento con descrizione del tracciato per l\'itinerario verso il deposito.',
        question:
          'I dati del treno sono convalidati e un\'autorizzazione al movimento con descrizione completa del tracciato è stata ricevuta per il percorso verso il deposito. In quale modo entra il sistema?',
        explanation:
          'Con i dati del treno convalidati, una MA valida e la descrizione completa del tracciato, il sistema transita in Full Supervision (FS). Questo è l\'inizio missione standard con piena protezione ETCS — la stessa transizione indipendentemente dal fatto che il treno fosse precedentemente in modo NL o in qualsiasi altro modo. Stand By fornisce sempre un inizio pulito.',
        hint: 'Avete tutti i dati necessari per la massima protezione: MA, profilo di velocità, pendenza. Qual è il modo operativo più sicuro?',
      },
    ],
  },
};
