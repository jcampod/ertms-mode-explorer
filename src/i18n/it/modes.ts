import type { ModeTranslation } from '../types';

export const itModes: Record<string, ModeTranslation> = {
  NP: {
    name: 'Senza Alimentazione',
    description:
      'Il computer di bordo del treno è spento. Non funziona nulla: nessuno schermo, nessuna protezione, nessuna comunicazione. Come un\'automobile con il quadro spento.',
    detailedDescription:
      'Tutte le funzioni ETCS sono inattive: nessuna supervisione della velocità, nessuna comunicazione con il lato terra, nessuna visualizzazione sul DMI e nessun comando di frenata. Il treno può ancora muoversi secondo le regole nazionali o i segnali fisici, ma l\'ETCS non fornisce alcuna protezione. Si entra in questo modo quando la cabina viene disattivata o l\'alimentazione principale viene interrotta. La transizione verso Stand By (SB) avviene quando il macchinista accende l\'ETCS e il sistema completa l\'autotest.',
    speedLimit: null,
    driverResponsibility:
      'Piena responsabilità secondo le norme nazionali. L\'ETCS non fornisce alcuna protezione né informazione.',
    realWorldContext:
      'Questo è lo stato del treno quando è ricoverato in deposito durante la notte, o quando una locomotiva è parcheggiata con tutti i sistemi spenti. Si verifica anche nella fase iniziale prima che un macchinista inizi il proprio turno e accenda la cabina.',
    keyCharacteristics: [
      'La frenata di emergenza è comandata permanentemente',
      'Nessuna funzione ETCS disponibile',
      'Nessuna supervisione della velocità né intervento di frenata',
      'DMI inattivo e spento',
      'Nessuna comunicazione con RBC o lettori di boe',
      'Movimento del treno interamente governato dalle norme nazionali',
    ],
  },
  SB: {
    name: 'In Attesa',
    description:
      'Il sistema si è appena avviato e ha superato i controlli. Ora attende che il macchinista inserisca le proprie credenziali e i dati del treno prima che il viaggio possa iniziare. Questo è il punto di partenza per tutto.',
    detailedDescription:
      'Stand By è lo stato iniziale dopo l\'accensione dell\'ETCS e il completamento dell\'autotest. Il DMI è attivo e mostra le schermate di inserimento dati. Il macchinista deve inserire o convalidare il proprio ID, il numero del treno e i dati del treno (lunghezza, caratteristiche di frenata, velocità massima, categoria di carico assiale, ecc.). Il sistema determina il livello ETCS e, nel caso dei livelli 2/3, tenta di stabilire la comunicazione con il Radio Block Centre (RBC). Non esiste alcuna autorizzazione al movimento (MA) — il treno deve rimanere fermo. Da SB, il treno può transitare verso Full Supervision (MA ottenuta), Staff Responsible (nessuna MA disponibile), Shunting, Sleeping, Non Leading, o altri modi a seconda della situazione.',
    speedLimit: '0 km/h (il treno deve essere fermo)',
    driverResponsibility:
      'Inserire/convalidare ID macchinista, dati del treno e confermare il livello ETCS. Assicurarsi che il treno sia fermo.',
    realWorldContext:
      'Un macchinista che arriva al deposito sale in cabina, accende il treno e segue la procedura di inserimento dati sullo schermo del DMI. Questo avviene all\'inizio di ogni missione e dopo determinate procedure di ripristino.',
    keyCharacteristics: [
      'DMI attivo e visualizzazione dei campi di inserimento dati',
      'Autotest completato con successo',
      'Nessuna autorizzazione al movimento concessa',
      'Inserimento/convalida dei dati del treno richiesti',
      'Modo di accesso a tutti i modi operativi e speciali',
    ],
  },
  SH: {
    name: 'Manovra',
    description:
      'Il treno si muove lentamente in un piazzale — agganciando carrozze, riposizionandosi o componendo un treno. La velocità è limitata secondo i Valori Nazionali, ma il macchinista deve sorvegliare il binario personalmente perché l\'ETCS non verifica l\'itinerario.',
    detailedDescription:
      'Il modo Shunting viene utilizzato per movimenti a bassa velocità nel piazzale: composizione/separazione dei treni, posizionamento dei carri e operazioni di smistamento. L\'ETCS fornisce la supervisione della velocità massima (tipicamente 30 km/h, configurabile secondo i valori nazionali) ma non emette né supervisiona un\'autorizzazione al movimento (MA). Non vi è protezione contro itinerari in conflitto o binari occupati. Il macchinista deve verificare visivamente che il percorso sia libero e seguire le segnalazioni manuali o le istruzioni locali di manovra. Nei livelli 2/3, la sessione di comunicazione con l\'RBC può essere rilasciata. Il principio di sicurezza fondamentale è che la velocità è limitata, ma la sicurezza dell\'itinerario è responsabilità del macchinista.',
    speedLimit: 'Determinato dai Valori Nazionali',
    driverResponsibility:
      'Piena responsabilità per la sicurezza dell\'itinerario, il rilevamento di ostacoli e il rispetto delle istruzioni locali di manovra.',
    realWorldContext:
      'Utilizzato nei piazzali di smistamento e nei depositi per agganciare/sganciare carrozze, riposizionare treni sui binari di sosta o spostare una locomotiva all\'altra estremità del treno. Comune all\'inizio e alla fine del viaggio di un treno nelle stazioni terminali.',
    keyCharacteristics: [
      'Velocità massima supervisionata a 30 km/h (valore predefinito)',
      'Nessuna autorizzazione al movimento né protezione dell\'itinerario da parte dell\'ETCS',
      'Il macchinista è responsabile dell\'itinerario e della verifica degli ostacoli',
      'Può essere avviato su richiesta del macchinista o per ordine dal lato terra',
      'La sessione RBC può essere rilasciata nei livelli 2/3',
    ],
  },
  FS: {
    name: 'Supervisione Completa',
    description:
      'Questo è il modo principale — il sistema è pienamente responsabile della sicurezza. Sa quanto veloce può andare il treno, dove deve fermarsi e frenerà automaticamente se necessario. Il modo più sicuro per circolare.',
    detailedDescription:
      'Full Supervision è il modo operativo standard e fornisce il massimo livello di sicurezza. L\'unità di bordo possiede un\'autorizzazione al movimento (MA) valida che definisce il limite di marcia sicura (End of Authority, EOA). Dispone inoltre della descrizione completa del tracciato: profilo statico di velocità (velocità di linea, rallentamenti temporanei), profilo di pendenza (per il calcolo delle curve di frenata) e informazioni sul profilo di modo. Il sistema calcola continuamente la velocità consentita, la velocità di avviso e le curve di intervento. Se il macchinista supera la velocità consentita, avvengono interventi graduali: indicazione → avviso → frenata di servizio → frenata di emergenza. Nei livelli 2/3, la MA proviene via radio dall\'RBC; nel livello 1, tramite Eurobalise o Euroloop.',
    speedLimit: 'Secondo il profilo statico di velocità e la MA (fino alla velocità di linea)',
    driverResponsibility:
      'Guidare entro la velocità consentita. Rispondere alle indicazioni del DMI. L\'ETCS fornisce protezione completa.',
    realWorldContext:
      'La condizione operativa normale per la marcia in linea su tratte attrezzate con ETCS ad alta velocità e convenzionali. Così circolano i treni su linee come la Madrid-Barcellona AVE, la galleria di base del Gottardo o le linee principali danesi sotto ETCS livello 2.',
    keyCharacteristics: [
      'Supervisione continua della velocità rispetto a MA e profilo di velocità',
      'Intervento con frenata di emergenza se l\'EOA rischia di essere superata',
      'Descrizione completa del tracciato (pendenza, restrizioni di velocità) disponibile',
      'Curve di frenata calcolate utilizzando i dati specifici del treno',
      'Massimo livello di protezione di sicurezza ETCS',
    ],
  },
  LS: {
    name: 'Supervisione Limitata',
    description:
      'Come Full Supervision, ma il sistema dispone di informazioni meno dettagliate sul tracciato. Protegge comunque il treno, ma utilizza valori predefiniti più prudenti quando mancano dei dati. Un passo intermedio per le linee in fase di aggiornamento a ETCS.',
    detailedDescription:
      'Limited Supervision fornisce un\'autorizzazione al movimento e la supervisione della velocità, ma con informazioni sul tracciato meno dettagliate rispetto a FS. L\'unità di bordo ha una MA con un EOA, quindi il treno è protetto contro il superamento della propria autorizzazione. Tuttavia, la descrizione del tracciato può essere incompleta: i profili di pendenza possono essere assenti e alcune restrizioni di velocità possono basarsi su valori nazionali predefiniti piuttosto che su dati precisi dell\'infrastruttura. Il calcolo delle curve di frenata può utilizzare parametri conservativi predefiniti, con possibili profili di velocità più restrittivi (ma comunque sicuri). LS è stato introdotto per consentire una migrazione graduale dai sistemi nazionali all\'ETCS completo, permettendo un\'implementazione anticipata con un minore impegno realizzativo sul lato terra.',
    speedLimit: 'Secondo la MA e il profilo di velocità disponibile (possono applicarsi valori nazionali)',
    driverResponsibility:
      'Deve osservare le informazioni laterali e rispettare le norme di esercizio nazionali — le indicazioni ETCS non sostituiscono i segnali laterali.',
    realWorldContext:
      'Utilizzato su linee in fase di migrazione a ETCS dove i dati del lato terra (ad es. profili di pendenza, restrizioni di velocità dettagliate) non sono ancora completamente ingegnerizzati. Consente un\'implementazione anticipata di ETCS con un impegno realizzativo ridotto.',
    keyCharacteristics: [
      'MA valida con supervisione dell\'EOA',
      'Descrizione del tracciato ridotta rispetto a Full Supervision',
      'Alcuni parametri utilizzano valori nazionali predefiniti',
      'Progettato per la migrazione graduale dai sistemi nazionali',
      'Le curve di frenata possono essere più conservative a causa di dati incompleti',
    ],
  },
  OS: {
    name: 'Marcia a Vista',
    description:
      'Procedere con cautela — potrebbe esserci qualcosa sul binario davanti (un altro treno, un ostacolo). La velocità è limitata secondo i Valori Nazionali e il macchinista deve essere pronto a fermarsi in ogni momento in base a ciò che può vedere.',
    detailedDescription:
      'Il modo On Sight viene utilizzato quando il lato terra non può garantire che la sezione davanti sia libera. Ciò accade tipicamente quando i circuiti di binario o i contatori assiali sono guasti, quando una sezione necessita di ispezione visiva, o quando l\'apparato di stazione ha instradato un itinerario con occupazione nota davanti. L\'ETCS supervisiona una velocità massima (tipicamente 30 km/h) e il macchinista deve essere pronto a fermarsi prima di qualsiasi ostacolo visibile. Il modo viene attivato da un profilo di modo OS dal lato terra, solitamente incluso nella MA. L\'unità di bordo continua a supervisionare la MA/EOA oltre alla velocità massima OS. Una volta superata l\'area OS, il sistema torna in Full Supervision.',
    speedLimit: 'Determinato dai Valori Nazionali (tipicamente 40 km/h)',
    driverResponsibility:
      'Guidare a vista. Essere pronti a fermarsi entro la distanza di visibilità. Piena attenzione al binario davanti.',
    realWorldContext:
      'Comune quando si entra in un\'area di stazione dove il rilevamento del binario è parzialmente guasto, o quando un treno deve attraversare una sezione dopo che il rilevamento di un treno precedente è andato perso. Utilizzato anche per movimenti verso banchine occupate o aree di deposito.',
    keyCharacteristics: [
      'Velocità massima supervisionata a 30 km/h (valore predefinito)',
      'Il binario davanti può essere occupato o ostruito',
      'Il macchinista deve essere pronto a fermarsi a vista',
      'Attivato dal profilo di modo OS dal lato terra',
      'MA/EOA ancora supervisionata oltre alla velocità massima',
    ],
  },
  SR: {
    name: 'Responsabilità del Personale',
    description:
      'Il sistema non può dare al treno un percorso adeguato, quindi il macchinista prende il comando. Il regolatore autorizza il movimento tramite l\'Istruzione Europea 7. La velocità è limitata secondo i Valori Nazionali. Questa è la modalità di riserva quando le cose non funzionano normalmente.',
    detailedDescription:
      'Staff Responsible è il modo di riserva utilizzato quando l\'ETCS non può fornire un\'autorizzazione al movimento ma il treno deve muoversi. Scenari tipici: guasto della comunicazione con l\'RBC, malfunzionamento del lettore di boe, dati del lato terra mancanti, o partenza da un\'area non attrezzata. Il regolatore autorizza il macchinista tramite ordine verbale, autorizzazione scritta o procedura nazionale. L\'ETCS supervisiona una velocità massima (predefinita 40 km/h) mentre il macchinista si assume la responsabilità dei segnali, delle restrizioni di velocità e delle condizioni dell\'itinerario. Il macchinista deve confermare l\'ingresso nel modo SR sul DMI. Se successivamente viene ricevuta una MA valida, il sistema transita in Full Supervision. SR è fondamentale per la resilienza operativa — i treni possono continuare a muoversi in sicurezza anche con infrastruttura degradata.',
    speedLimit: 'Determinato dai Valori Nazionali',
    driverResponsibility:
      'Piena responsabilità per il movimento sicuro sotto autorizzazione del regolatore. Osservare segnali e restrizioni di velocità. Deve procedere a vista salvo esenzione per istruzione operativa.',
    realWorldContext:
      'Utilizzato quando un macchinista riceve un ordine verbale per superare un segnale a via impedita, quando si inizia una missione e non è disponibile alcuna MA, o quando la comunicazione con l\'RBC viene persa ma il regolatore autorizza il movimento. Molto comune nelle operazioni degradate.',
    keyCharacteristics: [
      'Nessuna autorizzazione al movimento da parte dell\'ETCS',
      'Velocità massima supervisionata a 40 km/h (valore predefinito)',
      'Macchinista autorizzato dal regolatore (verbale/scritto)',
      'Modo di riserva fondamentale per le operazioni degradate',
      'Transita in FS quando viene ricevuta una MA valida',
    ],
  },
  UN: {
    name: 'Non Attrezzato',
    description:
      'Il treno è entrato in un tratto di linea che non ha alcun equipaggiamento ETCS. Il sistema può solo limitare la velocità massima — tutto il resto spetta al macchinista e ai vecchi segnali lungo la linea.',
    detailedDescription:
      'Il modo Unfitted viene utilizzato su tratti senza equipaggiamento ETCS a terra (ETCS livello 0). L\'unità di bordo fornisce solo una supervisione di base: una velocità massima basata sul valore nazionale per le aree non attrezzate, oltre alla velocità massima propria del treno. Non vi è MA, nessun profilo di velocità dal lato terra e nessuna comunicazione RBC. Il macchinista opera secondo le regole nazionali di segnalamento (segnali laterali, tabelle di velocità, procedure operative). Se è disponibile un sistema nazionale di protezione treno (ad es. PZB, ASFA, KVB, TPWS) tramite STM, il treno transita in modo SN. Il modo UN è comune durante le operazioni transfrontaliere nella transizione da una linea attrezzata a una sezione non attrezzata.',
    speedLimit: 'Secondo il valore nazionale per le aree non attrezzate',
    driverResponsibility:
      'Piena responsabilità secondo le regole nazionali di segnalamento. L\'ETCS fornisce solo la supervisione della velocità massima.',
    realWorldContext:
      'Si verifica quando un treno attrezzato ETCS entra su una linea secondaria o una tratta più vecchia priva di infrastruttura ETCS a terra. Comune anche durante le transizioni transfrontaliere tra reti attrezzate e non attrezzate.',
    keyCharacteristics: [
      'Nessun equipaggiamento ETCS a terra presente (livello 0)',
      'Solo supervisione di base della velocità massima',
      'Nessuna MA, nessuna descrizione del tracciato dall\'ETCS',
      'Il macchinista segue il segnalamento e le norme nazionali',
      'I treni dotati di STM utilizzano invece il modo SN se il sistema nazionale è disponibile',
    ],
  },
  SN: {
    name: 'STM Nazionale',
    description:
      'Il treno è entrato in un\'area con un sistema di protezione treno di un altro Paese. L\'ETCS trasferisce il controllo a quel sistema nazionale attraverso un adattatore speciale (STM). Il vecchio sistema locale ora protegge il treno.',
    detailedDescription:
      'Il modo STM National consente a un treno ETCS di operare sotto un sistema nazionale di protezione treno preesistente tramite un Modulo di Trasmissione Specifico (STM). L\'STM collega l\'equipaggiamento di terra del sistema nazionale (boe nazionali, magneti di binario, anelli induttivi) all\'architettura di bordo ETCS. L\'STM fornisce la supervisione della velocità, l\'interpretazione dei segnali e i comandi di frenata secondo le regole nazionali. L\'unità di bordo ETCS coordina lo stato complessivo ma delega la protezione all\'STM. Il DMI può mostrare visualizzazioni specifiche del sistema nazionale. Questo è essenziale per l\'interoperabilità transfrontaliera: un treno può transitare da Full Supervision ETCS a un sistema nazionale (PZB in Germania, KVB in Francia, ASFA in Spagna, SCMT in Italia) quando passa da una linea ETCS a una linea protetta dal sistema nazionale.',
    speedLimit: 'Secondo la supervisione del sistema nazionale',
    driverResponsibility:
      'Seguire le indicazioni e le regole del sistema nazionale. L\'ETCS coordina ma il sistema nazionale supervisiona.',
    realWorldContext:
      'Essenziale per i treni transfrontalieri in Europa. Ad esempio, un treno Thalys o ICE che passa da una sezione ETCS livello 2 a un\'area protetta dal sistema nazionale (PZB, KVB, TVM, ecc.) del Paese confinante.',
    keyCharacteristics: [
      'Sistema nazionale di protezione treno attivo tramite STM',
      'L\'ETCS delega la supervisione al sistema nazionale',
      'Essenziale per l\'interoperabilità transfrontaliera',
      'Il DMI può mostrare informazioni specifiche del sistema nazionale',
      'Attivato dal profilo di modo del sistema nazionale dal lato terra',
    ],
  },
  SL: {
    name: 'Riposo',
    description:
      'Questa unità ETCS è accesa ma qualcun altro sta guidando. Un\'altra cabina o un altro sistema di bordo è al comando. Questa resta semplicemente inattiva in sottofondo.',
    detailedDescription:
      'Il modo Sleeping viene attivato quando l\'unità di bordo ETCS riconosce di non essere l\'unità di testa attiva. Ciò avviene quando un treno ha più unità ETCS e solo una è designata come unità di testa, quando la cabina posteriore di un treno reversibile è alimentata ma non in uso, o quando una locomotiva è agganciata ma un\'altra unità guida. Nel modo Sleeping, l\'unità di bordo mantiene il proprio stato interno (dati del treno, posizione) ma non effettua supervisione attiva — nessun comando di frenata, nessuna comunicazione RBC per le MA e nessuna supervisione operativa sul DMI. La transizione da Sleeping a Stand By avviene quando il macchinista attiva questa cabina come unità di testa.',
    speedLimit: null,
    driverResponsibility:
      'Nessuna guida attiva da questa cabina. Un\'altra unità è al comando.',
    realWorldContext:
      'La cabina posteriore di un treno reversibile per pendolari ha il proprio ETCS in modo Sleeping mentre il macchinista opera dalla cabina anteriore. Si applica anche a una locomotiva di spinta o a un\'unità trainata a macchina morta.',
    keyCharacteristics: [
      'ETCS alimentato ma non in supervisione attiva',
      'Nessun comando di frenata emesso da questa unità',
      'Un\'altra unità ETCS o cabina è in testa',
      'Stato interno (dati del treno, posizione) mantenuto',
      'Transita verso SB quando questa cabina diventa l\'unità di testa',
    ],
  },
  TR: {
    name: 'Arresto di Emergenza',
    description:
      'Emergenza! Il treno ha superato un punto dove avrebbe dovuto fermarsi (o è stata rilevata una condizione pericolosa). I freni scattano automaticamente e il treno deve fermarsi completamente. Questo è il "pulsante di panico" dell\'ETCS.',
    detailedDescription:
      'Trip è la risposta di emergenza dell\'ETCS a una situazione potenzialmente pericolosa. Viene attivato quando il treno supera l\'End of Authority (EOA), quando un gruppo di boe comanda un trip, o quando vengono rilevate altre condizioni critiche per la sicurezza (ad es. superamento di un segnale a via impedita nel livello 1). L\'ETCS comanda immediatamente una frenata di emergenza completa. Il DMI visualizza l\'indicazione di Trip. Nessun ulteriore movimento è consentito fino a quando il macchinista non conferma il trip e vengono soddisfatte le specifiche condizioni di ripristino. Il Trip rappresenta l\'ultima linea di difesa del sistema contro una collisione o un deragliamento. La severità è intenzionale — la frenata di emergenza e la successiva procedura di Post Trip garantiscono il ristabilimento delle condizioni di sicurezza. Ogni evento di Trip viene registrato e può richiedere un\'indagine.',
    speedLimit: '0 km/h (frenata di emergenza fino all\'arresto completo)',
    driverResponsibility:
      'Lasciare che il treno si fermi. Non tentare di muoversi. Confermare il trip e contattare il regolatore.',
    realWorldContext:
      'Si verifica se un macchinista valuta male la frenata e supera l\'EOA, se un guasto di comunicazione causa la scadenza della MA in un momento inopportuno, o se il lato terra provoca deliberatamente il trip del treno a causa di un conflitto rilevato. Un evento operativo grave che viene sempre indagato.',
    keyCharacteristics: [
      'Frenata di emergenza applicata immediatamente e automaticamente',
      'Attivato dal superamento dell\'EOA o da un evento critico per la sicurezza',
      'Il treno deve raggiungere l\'arresto completo',
      'Nessun movimento consentito fino alla conferma e al ripristino',
      'Transita verso Post Trip dopo l\'arresto e la conferma del macchinista',
    ],
  },
  PT: {
    name: 'Post Trip',
    description:
      'La fermata di emergenza è terminata e il macchinista ha premuto "conferma." Ora il treno resta fermo mentre il macchinista chiama il regolatore per decidere il da farsi. Nessuno si muove finché non concordano un piano.',
    detailedDescription:
      'Post Trip viene attivato dopo un evento di Trip, una volta che il treno si è fermato e il macchinista ha confermato il trip sul DMI. L\'ETCS impedisce qualsiasi movimento in avanti oltre il punto di arresto. Il macchinista deve contattare il regolatore per segnalare il trip e ricevere istruzioni. Il regolatore può autorizzare il macchinista a procedere in modo Staff Responsible, richiedere un movimento di manovra o emettere altre istruzioni. Nei livelli 2/3, l\'unità di bordo può tentare di ristabilire la comunicazione con l\'RBC e richiedere una nuova MA. Post Trip fornisce una pausa procedurale — sia il macchinista che il regolatore devono valutare la situazione prima che il treno si muova di nuovo. Un movimento di retromarcia limitato può essere possibile se autorizzato.',
    speedLimit: '0 km/h (arresto completo, possibile retromarcia limitata)',
    driverResponsibility:
      'Contattare il regolatore. Segnalare l\'evento di trip. Attendere l\'autorizzazione prima di qualsiasi movimento.',
    realWorldContext:
      'Dopo un evento di trip a un segnale di stazione, il macchinista contatta il regolatore via radio, spiega la situazione, e il regolatore può emettere un\'autorizzazione verbale a procedere in modo SR oltre il segnale a via impedita, oppure può richiedere al treno di retrocedere per liberare la zona di overlap.',
    keyCharacteristics: [
      'Attivato dopo il trip e l\'arresto del treno',
      'Il macchinista deve confermare il trip sul DMI',
      'Nessun movimento in avanti consentito senza autorizzazione',
      'Il macchinista deve contattare il regolatore per istruzioni',
      'Tipicamente transita verso SR o SH sotto autorità del regolatore',
    ],
  },
  SF: {
    name: 'Guasto di Sistema',
    description:
      'Il computer del treno è andato in avaria o ha rilevato un grave errore interno. Non ci si può più fidare per mantenere il treno in sicurezza, quindi attiva la frenata di emergenza e si spegne. Il macchinista deve affidarsi alle regole tradizionali.',
    detailedDescription:
      'System Failure viene attivato quando l\'unità di bordo ETCS rileva un\'avaria che compromette la sua capacità di supervisionare il treno in sicurezza — guasto hardware (processore, memoria, sensore), errore software o mancato superamento di un controllo di coerenza interna. Il sistema comanda una frenata di emergenza. Il DMI indica l\'avaria. L\'ETCS non può più fornire alcuna supervisione, quindi il macchinista deve operare secondo le norme e procedure nazionali per la marcia senza protezione treno. Il ripristino richiede tipicamente un ciclo di alimentazione (spegnimento e riaccensione, passando attraverso NP verso SB). Se il guasto persiste, l\'ETCS deve essere isolato (modo IS) e il treno operato senza protezione o ritirato dal servizio. Questo è un evento raro ma critico.',
    speedLimit: '0 km/h (frenata di emergenza applicata)',
    driverResponsibility:
      'Seguire le norme nazionali per la marcia senza ETCS. Segnalare il guasto. Potrebbe essere necessario isolare l\'ETCS.',
    realWorldContext:
      'Un evento raro che potrebbe verificarsi a causa di un guasto hardware del computer di bordo, software corrotto o malfunzionamento di sensori (ad es. guasto dell\'odometria, avaria del JRU). Il treno viene tipicamente trattenuto fino a quando la manutenzione può valutare il guasto.',
    keyCharacteristics: [
      'Rilevata avaria critica per la sicurezza a bordo',
      'Frenata di emergenza applicata automaticamente',
      'L\'ETCS non può più garantire una supervisione sicura',
      'Il macchinista deve tornare alle norme operative nazionali',
      'Il ripristino richiede un ciclo di alimentazione o l\'isolamento dell\'ETCS',
    ],
  },
  IS: {
    name: 'Isolamento',
    description:
      'Il macchinista ha deliberatamente disattivato l\'ETCS tramite un metodo di isolamento specifico dell\'implementazione. Il sistema è completamente disabilitato. Usato quando l\'ETCS è guasto e non può essere riparato sul posto.',
    detailedDescription:
      'Isolation viene attivato quando il macchinista aziona l\'interruttore fisico di isolamento ETCS per disabilitare completamente l\'equipaggiamento di bordo. Questa è un\'azione deliberata. Una volta isolato, l\'ETCS non fornisce supervisione, nessuna visualizzazione sul DMI (o mostra un\'indicazione di isolamento), nessun comando di frenata e nessuna comunicazione con il lato terra. Il treno opera interamente secondo le norme nazionali e qualsiasi sistema nazionale di protezione treno indipendente. Isolation viene utilizzato quando l\'ETCS ha un guasto persistente che non può essere eliminato, durante la manutenzione, o in scenari specifici dove l\'ETCS deve essere disabilitato. L\'interruttore di isolamento è tipicamente un interruttore a chiave per prevenire l\'attivazione accidentale. Per uscire, il macchinista riporta l\'interruttore in posizione normale, attivando una sequenza di accensione e riavvio del sistema.',
    speedLimit: null,
    driverResponsibility:
      'Piena responsabilità secondo le norme nazionali. Nessuna protezione ETCS disponibile. Deve azionare l\'interruttore di isolamento.',
    realWorldContext:
      'Utilizzato quando l\'ETCS di bordo ha un guasto persistente e il treno deve proseguire fino all\'officina di manutenzione più vicina. Utilizzato anche durante le attività di test e manutenzione dell\'equipaggiamento di bordo nelle officine.',
    keyCharacteristics: [
      'ETCS deliberatamente disattivato dal macchinista tramite metodo di isolamento specifico dell\'implementazione',
      'Nessuna funzione ETCS disponibile',
      'Utilizzato per guasti persistenti o manutenzione',
      'Il metodo di isolamento è specifico dell\'implementazione (non armonizzato tra i treni)',
      'L\'uscita richiede il ripristino dell\'interruttore e il riavvio completo del sistema',
    ],
  },
  NL: {
    name: 'Non in Testa',
    description:
      'Questa locomotiva fa parte del treno ma non è quella al comando. Un\'altra unità in testa si occupa della guida e dei controlli di sicurezza. Questa segue semplicemente in silenzio.',
    detailedDescription:
      'Il modo Non Leading viene utilizzato quando un\'unità motrice dotata di ETCS fa parte di un convoglio ma non controlla il movimento. Comune nella trazione multipla (due o più locomotori accoppiati) o nelle operazioni reversibili dove il locomotore in coda ha l\'ETCS attivo ma la cabina di testa è al comando. L\'unità di bordo è attiva e consapevole del proprio stato ma non richiede né detiene una MA, e non emette comandi di frenata basati sulla supervisione ETCS. La cabina in NL ha tipicamente una visualizzazione DMI ridotta. NL garantisce che una sola unità ETCS nel convoglio sia attivamente in supervisione in ogni momento, prevenendo comandi di frenata o gestione dell\'autorizzazione in conflitto.',
    speedLimit: null,
    driverResponsibility:
      'Responsabile dell\'esecuzione degli ordini associati alle condizioni di linea visualizzate.',
    realWorldContext:
      'Un treno merci trainato da due locomotori accoppiati: il locomotore di testa è in modo FS mentre l\'ETCS del locomotore in coda è in modo NL. Utilizzato anche per la motrice di coda di un treno reversibile ad alta velocità.',
    keyCharacteristics: [
      'L\'unità non è la trazione di testa nel convoglio',
      'Nessuna autorizzazione al movimento detenuta o richiesta',
      'Nessun comando di frenata ETCS emesso da questa unità',
      'Previene supervisione in conflitto nei treni a più unità',
      'Transita verso SB quando diventa l\'unità di testa',
    ],
  },
  RV: {
    name: 'Retromarcia',
    description:
      'Il treno deve andare indietro per un breve tratto — forse ha superato la banchina o deve evacuare una galleria. L\'ETCS controlla la velocità e la distanza per assicurarsi che non vada troppo lontano.',
    detailedDescription:
      'La modalità Reversing consente un movimento all\'indietro controllato sotto supervisione ETCS, principalmente destinata all\'evacuazione di emergenza da situazioni pericolose. Il macchinista è autorizzato (tramite informazioni dal lato terra o procedura ETCS specifica) a retrocedere per una distanza limitata a una velocità limitata. L\'ETCS verifica che il treno non superi la velocità di retromarcia autorizzata né percorra una distanza superiore a quella autorizzata. Il DMI mostra lo stato di retromarcia e la distanza residua. Utilizzato per arretrare verso una banchina dopo averla superata, ritirarsi da un punto pericoloso o per l\'evacuazione di emergenza (ad es. retrocedere da una galleria). I parametri di retromarcia sono definiti dai dati del lato terra o dai valori nazionali. Una volta completato, il treno transita verso un altro modo (tipicamente Post Trip o Full Supervision). Non è destinato alla marcia bidirezionale regolare.',
    speedLimit: 'Definito dai parametri dell\'area di retrocessione lato linea',
    driverResponsibility:
      'Controllare il movimento di retromarcia entro la velocità e la distanza autorizzate. Monitorare il DMI per la distanza residua.',
    realWorldContext:
      'Un treno supera la banchina in una stazione terminale e deve arretrare. Oppure un treno in una galleria durante un\'emergenza deve retrocedere fino all\'imbocco della galleria per l\'evacuazione dei passeggeri. Utilizzato anche in corrispondenza di specifici attraversamenti.',
    keyCharacteristics: [
      'Movimento di retromarcia controllato sotto supervisione ETCS',
      'Limiti di velocità e distanza applicati',
      'Utilizzato per il recupero operativo e gli scenari di emergenza',
      'Richiede autorizzazione specifica dal lato terra',
      'Non destinato alla marcia bidirezionale regolare',
    ],
  },
  AD: {
    name: 'Guida Automatica',
    description:
      'ATO (Automatic Train Operation) è al comando. Il treno si guida da solo — accelerando, frenando e fermandosi alle stazioni automaticamente — mentre l\'ETCS continua a sorvegliare tutto per garantire la sicurezza. Introdotto nel Baseline 4.',
    detailedDescription:
      'Automatic Driving è un nuovo modo ETCS introdotto nel Baseline 4 (CCS TSI 2023) specificamente per il funzionamento ATO su ETCS. Il manuale v2.8.0 copre solo GoA 1 (consulenza al macchinista) e GoA 2 (guida automatica supervisionata). Si entra da Full Supervision quando il macchinista (GoA 2) attiva l\'ATO. In questo modo, il sistema ATO di bordo controlla trazione, frenata e marcia per inerzia secondo un Profilo di Viaggio ricevuto dal lato terra ATO. L\'ETCS continua a fornire piena supervisione di sicurezza — l\'autorizzazione al movimento, il profilo di velocità e le curve di frenata restano applicati. Se i comandi ATO violassero qualsiasi vincolo ETCS, il livello di sicurezza interviene con frenata di servizio o di emergenza. Il macchinista può disattivare l\'ATO in qualsiasi momento, tornando a Full Supervision. Se l\'ETCS rileva una condizione critica per la sicurezza (ad es. avvicinamento all\'EOA), prevale automaticamente sull\'ATO.',
    speedLimit: 'Secondo il profilo statico di velocità e la MA (ATO ottimizza all\'interno dell\'inviluppo ETCS)',
    driverResponsibility:
      'GoA 2: monitorare il funzionamento ATO, gestire le porte e la partenza, possibilità di intervento in qualsiasi momento.',
    realWorldContext:
      'Attualmente in fase di sperimentazione su linee come Thameslink (UK) e diversi sistemi metropolitani europei. Questo modo consente una guida efficiente dal punto di vista energetico e ottimizzata per l\'orario, mantenendo la piena protezione di sicurezza ETCS. Si prevede che diventi lo standard per i servizi urbani e suburbani ad alta frequenza.',
    keyCharacteristics: [
      'ATO controlla trazione, frenata e marcia per inerzia automaticamente',
      'ETCS mantiene piena supervisione di sicurezza (MA, velocità, curve di frenata)',
      'Profilo di Viaggio dal lato terra ATO guida l\'ottimizzazione della velocità',
      'Il macchinista può disattivare l\'ATO in qualsiasi momento (ritorno a FS)',
      'Introdotto nell\'ETCS Baseline 4 / CCS TSI 2023',
    ],
  },
};
