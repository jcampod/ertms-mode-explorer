import type { ModeTranslation } from '../types';

export const frModes: Record<string, ModeTranslation> = {
  NP: {
    name: 'Hors tension',
    description:
      'L\u2019ordinateur de bord est \u00e9teint. Rien ne fonctionne \u2014 pas d\u2019\u00e9cran, pas de protection, pas de communication. Comme une voiture avec le contact coup\u00e9.',
    detailedDescription:
      'Toutes les fonctions ETCS sont inactives : pas de supervision de vitesse, pas de communication avec le sol, pas d\u2019affichage DMI et pas de commandes de frein. Le train peut encore se d\u00e9placer selon les r\u00e8gles nationales d\u2019exploitation ou les signaux physiques, mais l\u2019ETCS n\u2019assure aucune protection. Ce mode est activ\u00e9 lorsque la cabine est d\u00e9sactiv\u00e9e ou que l\u2019alimentation principale est coup\u00e9e. La transition vers Stand By (SB) se produit lorsque le conducteur met l\u2019ETCS sous tension et que le syst\u00e8me termine son autotest.',
    speedLimit: null,
    driverResponsibility:
      'Responsabilit\u00e9 compl\u00e8te selon les r\u00e8gles nationales. L\u2019ETCS ne fournit aucune protection ni information.',
    realWorldContext:
      'C\u2019est l\u2019\u00e9tat du train lorsqu\u2019il est gar\u00e9 au d\u00e9p\u00f4t pendant la nuit, ou lorsqu\u2019une locomotive est stationn\u00e9e avec tous les syst\u00e8mes \u00e9teints. Se produit \u00e9galement lors de la phase initiale avant qu\u2019un conducteur ne commence son service et mette la cabine sous tension.',
    keyCharacteristics: [
      'Aucune fonction ETCS disponible',
      'Aucune supervision de vitesse ni intervention de freinage',
      'DMI inactif et \u00e9teint',
      'Aucune communication avec le RBC ou les lecteurs de balises',
      'Mouvement du train r\u00e9gi enti\u00e8rement par les r\u00e8gles nationales',
    ],
  },
  SB: {
    name: 'Veille',
    description:
      'Le syst\u00e8me vient de d\u00e9marrer et a r\u00e9ussi ses v\u00e9rifications. Il attend maintenant que le conducteur saisisse son identifiant et les donn\u00e9es du train avant de pouvoir commencer le trajet. C\u2019est le point de d\u00e9part de tout.',
    detailedDescription:
      'Stand By est l\u2019\u00e9tat initial apr\u00e8s la mise sous tension de l\u2019ETCS et la r\u00e9ussite de l\u2019autotest. Le DMI est actif et affiche les \u00e9crans de saisie de donn\u00e9es. Le conducteur doit saisir ou valider son identifiant, le num\u00e9ro de marche du train et les donn\u00e9es du train (longueur, caract\u00e9ristiques de freinage, vitesse maximale, cat\u00e9gorie de charge par essieu, etc.). Le syst\u00e8me d\u00e9termine le niveau ETCS et, en Niveau 2/3, tente d\u2019\u00e9tablir la communication avec le Centre de Bloc Radio (RBC). Aucune autorisation de mouvement (MA) n\u2019existe \u2014 le train doit rester \u00e0 l\u2019arr\u00eat. Depuis SB, le train peut transitionner vers Full Supervision (MA obtenue), Staff Responsible (pas de MA disponible), Shunting, Sleeping, Non Leading ou d\u2019autres modes selon la situation.',
    speedLimit: '0 km/h (le train doit \u00eatre \u00e0 l\u2019arr\u00eat)',
    driverResponsibility:
      'Saisir/valider l\u2019identifiant conducteur, les donn\u00e9es du train et confirmer le niveau ETCS. S\u2019assurer que le train est \u00e0 l\u2019arr\u00eat.',
    realWorldContext:
      'Un conducteur arrivant au d\u00e9p\u00f4t monte dans la cabine, met le train sous tension et effectue la proc\u00e9dure de saisie de donn\u00e9es sur l\u2019\u00e9cran DMI. Cela se produit au d\u00e9but de chaque mission et apr\u00e8s certaines proc\u00e9dures de r\u00e9tablissement.',
    keyCharacteristics: [
      'DMI actif et affichant les champs de saisie de donn\u00e9es',
      'Autotest termin\u00e9 avec succ\u00e8s',
      'Aucune autorisation de mouvement accord\u00e9e',
      'Saisie/validation des donn\u00e9es du train requise',
      'Mode passerelle vers tous les modes op\u00e9rationnels et sp\u00e9ciaux',
    ],
  },
  SH: {
    name: 'Manoeuvre',
    description:
      'Le train se d\u00e9place lentement dans un faisceau \u2014 attelage de wagons, repositionnement ou composition d\u2019un train. La vitesse est plafonn\u00e9e \u00e0 30 km/h, mais le conducteur doit surveiller la voie lui-m\u00eame car l\u2019ETCS ne v\u00e9rifie pas l\u2019itin\u00e9raire.',
    detailedDescription:
      'Le mode Shunting est utilis\u00e9 pour les mouvements \u00e0 basse vitesse dans les faisceaux : composition/d\u00e9composition de trains, positionnement de wagons et op\u00e9rations de triage. L\u2019ETCS assure la supervision d\u2019une vitesse plafond (g\u00e9n\u00e9ralement 30 km/h, configurable selon la valeur nationale) mais ne d\u00e9livre ni ne supervise d\u2019autorisation de mouvement (MA). Il n\u2019y a aucune protection contre les itin\u00e9raires conflictuels ou les voies occup\u00e9es. Le conducteur doit v\u00e9rifier visuellement que la voie est libre et suivre les signaux \u00e0 main ou les instructions locales de manoeuvre. En Niveau 2/3, la session RBC peut \u00eatre lib\u00e9r\u00e9e. Le principe cl\u00e9 de s\u00e9curit\u00e9 est que la vitesse est limit\u00e9e mais la s\u00e9curit\u00e9 de l\u2019itin\u00e9raire rel\u00e8ve de la responsabilit\u00e9 du conducteur.',
    speedLimit: '30 km/h (la valeur nationale peut diff\u00e9rer)',
    driverResponsibility:
      'Responsabilit\u00e9 compl\u00e8te de la s\u00e9curit\u00e9 de l\u2019itin\u00e9raire, de la d\u00e9tection d\u2019obstacles et du respect des instructions locales de manoeuvre.',
    realWorldContext:
      'Utilis\u00e9 dans les faisceaux de triage et les d\u00e9p\u00f4ts lors de l\u2019attelage/d\u00e9telage de wagons, du repositionnement de trains sur les voies de garage, ou du d\u00e9placement d\u2019une locomotive \u00e0 l\u2019autre extr\u00e9mit\u00e9 d\u2019un train. Courant au d\u00e9but et \u00e0 la fin du trajet d\u2019un train dans les gares terminus.',
    keyCharacteristics: [
      'Vitesse maximale supervis\u00e9e \u00e0 30 km/h (par d\u00e9faut)',
      'Aucune autorisation de mouvement ni protection d\u2019itin\u00e9raire par l\u2019ETCS',
      'Le conducteur est responsable de l\u2019itin\u00e9raire et du d\u00e9gagement des obstacles',
      'Peut \u00eatre initi\u00e9 par demande du conducteur ou ordre du sol',
      'La session RBC peut \u00eatre lib\u00e9r\u00e9e en Niveau 2/3',
    ],
  },
  FS: {
    name: 'Supervision compl\u00e8te',
    description:
      'C\u2019est le mode principal \u2014 le syst\u00e8me est enti\u00e8rement en charge de la s\u00e9curit\u00e9. Il sait \u00e0 quelle vitesse le train peut rouler, o\u00f9 il doit s\u2019arr\u00eater, et freinera automatiquement si n\u00e9cessaire. La mani\u00e8re la plus s\u00fbre de circuler.',
    detailedDescription:
      'Full Supervision est le mode de fonctionnement standard et offre le plus haut niveau de s\u00e9curit\u00e9. L\u2019unit\u00e9 embarqu\u00e9e d\u00e9tient une autorisation de mouvement (MA) valide d\u00e9finissant la limite de circulation s\u00fbre (fin d\u2019autorisation, EOA). Elle dispose \u00e9galement de la description compl\u00e8te de la voie : profil de vitesse statique (vitesse de ligne, restrictions temporaires de vitesse), profil de gradient (pour le calcul des courbes de freinage) et informations de profil de mode. Le syst\u00e8me calcule en continu la vitesse autoris\u00e9e, la vitesse d\u2019alerte et les courbes d\u2019intervention. Si le conducteur d\u00e9passe la vitesse autoris\u00e9e, des interventions progressives se produisent : indication \u2192 alerte \u2192 frein de service \u2192 frein d\u2019urgence. En Niveau 2/3, le MA provient par radio du RBC ; en Niveau 1, via Eurobalise ou Euroloop.',
    speedLimit: 'Selon le profil de vitesse statique et le MA (jusqu\u2019\u00e0 la vitesse de ligne)',
    driverResponsibility:
      'Conduire dans les limites de la vitesse autoris\u00e9e. R\u00e9pondre aux indications du DMI. L\u2019ETCS assure une protection compl\u00e8te.',
    realWorldContext:
      'La condition normale de fonctionnement pour la circulation en ligne sur les lignes \u00e0 grande vitesse et conventionnelles \u00e9quip\u00e9es ETCS. C\u2019est ainsi que circulent les trains sur des lignes comme le Madrid-Barcelone AVE, le tunnel de base du Gothard, ou les lignes principales danoises en ETCS Niveau 2.',
    keyCharacteristics: [
      'Supervision continue de la vitesse par rapport au MA et au profil de vitesse',
      'Intervention du frein d\u2019urgence si l\u2019EOA risque d\u2019\u00eatre d\u00e9pass\u00e9e',
      'Description compl\u00e8te de la voie (gradient, restrictions de vitesse) disponible',
      'Courbes de freinage calcul\u00e9es \u00e0 partir des donn\u00e9es sp\u00e9cifiques du train',
      'Plus haut niveau de protection de s\u00e9curit\u00e9 ETCS',
    ],
  },
  LS: {
    name: 'Supervision limit\u00e9e',
    description:
      'Comme Full Supervision, mais le syst\u00e8me dispose de moins d\u2019informations d\u00e9taill\u00e9es sur la voie \u00e0 venir. Il prot\u00e8ge toujours le train, mais utilise des valeurs par d\u00e9faut plus s\u00fbres l\u00e0 o\u00f9 les donn\u00e9es manquent. Un tremplin pour les lignes en cours de mise \u00e0 niveau ETCS.',
    detailedDescription:
      'Limited Supervision fournit une autorisation de mouvement et une supervision de vitesse, mais avec des informations de voie moins d\u00e9taill\u00e9es que FS. L\u2019unit\u00e9 embarqu\u00e9e dispose d\u2019un MA avec une EOA, donc le train est prot\u00e9g\u00e9 contre le d\u00e9passement de son autorisation. Cependant, la description de la voie peut \u00eatre incompl\u00e8te : les profils de gradient peuvent \u00eatre absents, et certaines restrictions de vitesse peuvent reposer sur des valeurs nationales par d\u00e9faut plut\u00f4t que sur des donn\u00e9es pr\u00e9cises de l\u2019infrastructure. Les calculs de courbes de freinage peuvent utiliser des param\u00e8tres conservateurs par d\u00e9faut, r\u00e9sultant potentiellement en des profils de vitesse plus restrictifs (mais toujours s\u00fbrs). LS a \u00e9t\u00e9 introduit pour permettre une migration progressive des syst\u00e8mes nationaux vers l\u2019ETCS complet, permettant un d\u00e9ploiement anticip\u00e9 avec un effort de mise en oeuvre r\u00e9duit c\u00f4t\u00e9 sol.',
    speedLimit: 'Selon le MA et le profil de vitesse disponible (les valeurs nationales peuvent s\u2019appliquer)',
    driverResponsibility:
      'Conduire dans les limites de la vitesse supervis\u00e9e. \u00catre conscient que la supervision peut \u00eatre moins pr\u00e9cise qu\u2019en Full Supervision.',
    realWorldContext:
      'Utilis\u00e9 sur les lignes en cours de migration vers l\u2019ETCS mais o\u00f9 les donn\u00e9es sol (profils de gradient, restrictions de vitesse d\u00e9taill\u00e9es) ne sont pas encore compl\u00e8tement ing\u00e9nier\u00e9es. Permet un d\u00e9ploiement anticip\u00e9 de l\u2019ETCS avec un effort de mise en oeuvre r\u00e9duit.',
    keyCharacteristics: [
      'MA valide avec supervision de l\u2019EOA',
      'Description de voie r\u00e9duite par rapport \u00e0 Full Supervision',
      'Certains param\u00e8tres utilisent des valeurs nationales par d\u00e9faut',
      'Con\u00e7u pour une migration progressive depuis les syst\u00e8mes nationaux',
      'Les courbes de freinage peuvent \u00eatre plus conservatives en raison de donn\u00e9es incompl\u00e8tes',
    ],
  },
  OS: {
    name: 'Marche \u00e0 vue',
    description:
      'Avancez avec prudence \u2014 il pourrait y avoir quelque chose sur la voie devant (un autre train, un obstacle). La vitesse est plafonn\u00e9e \u00e0 30 km/h et le conducteur doit \u00eatre pr\u00eat \u00e0 s\u2019arr\u00eater \u00e0 tout moment en fonction de ce qu\u2019il voit.',
    detailedDescription:
      'Le mode On Sight est utilis\u00e9 lorsque le sol ne peut pas garantir que la section \u00e0 venir est libre. Cela se produit g\u00e9n\u00e9ralement lorsque les circuits de voie ou les compteurs d\u2019essieux sont en panne, lorsqu\u2019une section n\u00e9cessite une inspection visuelle, ou lorsque le poste d\u2019aiguillage a lib\u00e9r\u00e9 un itin\u00e9raire avec occupation connue \u00e0 l\u2019avant. L\u2019ETCS supervise une vitesse plafond (g\u00e9n\u00e9ralement 30 km/h) et le conducteur doit \u00eatre pr\u00eat \u00e0 s\u2019arr\u00eater avant tout obstacle visible. Le mode est d\u00e9clench\u00e9 par un profil de mode OS depuis le sol, g\u00e9n\u00e9ralement int\u00e9gr\u00e9 dans le MA. L\u2019unit\u00e9 embarqu\u00e9e continue de superviser le MA/EOA en plus de la vitesse plafond OS. Une fois la zone OS franchie, le syst\u00e8me revient en Full Supervision.',
    speedLimit: '30 km/h (la valeur nationale peut diff\u00e9rer)',
    driverResponsibility:
      'Conduire \u00e0 vue. \u00catre pr\u00eat \u00e0 s\u2019arr\u00eater dans la distance de visibilit\u00e9. Attention compl\u00e8te sur la voie \u00e0 l\u2019avant.',
    realWorldContext:
      'Courant lors de l\u2019entr\u00e9e dans une zone de gare o\u00f9 la d\u00e9tection de voie a partiellement d\u00e9failli, ou lorsqu\u2019un train doit traverser une section apr\u00e8s la perte de d\u00e9tection d\u2019un train pr\u00e9c\u00e9dent. \u00c9galement utilis\u00e9 pour les mouvements vers des quais occup\u00e9s ou des zones de d\u00e9p\u00f4t.',
    keyCharacteristics: [
      'Vitesse maximale supervis\u00e9e \u00e0 30 km/h (par d\u00e9faut)',
      'La voie \u00e0 l\u2019avant peut \u00eatre occup\u00e9e ou obstru\u00e9e',
      'Le conducteur doit \u00eatre pr\u00eat \u00e0 s\u2019arr\u00eater \u00e0 vue',
      'D\u00e9clench\u00e9 par un profil de mode OS depuis le sol',
      'MA/EOA toujours supervis\u00e9s en plus de la vitesse plafond',
    ],
  },
  SR: {
    name: 'Responsabilit\u00e9 du personnel',
    description:
      'Le syst\u00e8me ne peut pas donner au train un itin\u00e9raire en bonne et due forme, alors le conducteur prend les choses en main. Le r\u00e9gulateur appelle par radio et dit \u00ab OK, vous pouvez y aller. \u00bb La vitesse est plafonn\u00e9e \u00e0 40 km/h. C\u2019est la solution de repli quand les choses ne fonctionnent pas normalement.',
    detailedDescription:
      'Le mode Staff Responsible est le mode de repli utilis\u00e9 lorsque l\u2019ETCS ne peut pas fournir d\u2019autorisation de mouvement mais que le train doit se d\u00e9placer. Sc\u00e9narios typiques : panne de communication RBC, dysfonctionnement du lecteur de balises, donn\u00e9es sol manquantes ou d\u00e9part depuis une zone non \u00e9quip\u00e9e. Le r\u00e9gulateur autorise le conducteur par ordre verbal, autorisation \u00e9crite ou proc\u00e9dure nationale. L\u2019ETCS supervise une vitesse plafond (40 km/h par d\u00e9faut) tandis que le conducteur prend la responsabilit\u00e9 des signaux, des restrictions de vitesse et des conditions de l\u2019itin\u00e9raire. Le conducteur doit acquitter l\u2019entr\u00e9e en mode SR sur le DMI. Si un MA valide est ensuite re\u00e7u, le syst\u00e8me transite vers Full Supervision. SR est essentiel pour la r\u00e9silience op\u00e9rationnelle \u2014 les trains peuvent continuer \u00e0 circuler en toute s\u00e9curit\u00e9 m\u00eame avec une infrastructure d\u00e9grad\u00e9e.',
    speedLimit: '40 km/h (la valeur nationale peut diff\u00e9rer)',
    driverResponsibility:
      'Responsabilit\u00e9 compl\u00e8te du mouvement s\u00fbr sous autorisation du r\u00e9gulateur. Observer les signaux et les restrictions de vitesse.',
    realWorldContext:
      'Utilis\u00e9 lorsqu\u2019un conducteur re\u00e7oit un ordre verbal pour franchir un signal ferm\u00e9, lors du d\u00e9marrage d\u2019une mission sans MA disponible, ou lorsque la communication avec le RBC est perdue mais que le r\u00e9gulateur autorise le mouvement. Tr\u00e8s courant en exploitation d\u00e9grad\u00e9e.',
    keyCharacteristics: [
      'Aucune autorisation de mouvement de l\u2019ETCS',
      'Vitesse plafond supervis\u00e9e \u00e0 40 km/h (par d\u00e9faut)',
      'Conducteur autoris\u00e9 par le r\u00e9gulateur (verbal/\u00e9crit)',
      'Mode de repli essentiel pour les op\u00e9rations d\u00e9grad\u00e9es',
      'Transition vers FS \u00e0 la r\u00e9ception d\u2019un MA valide',
    ],
  },
  UN: {
    name: 'Non \u00e9quip\u00e9',
    description:
      'Le train est entr\u00e9 sur un tron\u00e7on de voie qui ne poss\u00e8de aucun \u00e9quipement ETCS. Le syst\u00e8me ne peut que limiter la vitesse maximale \u2014 tout le reste d\u00e9pend du conducteur et des anciens signaux le long de la voie.',
    detailedDescription:
      'Le mode Unfitted est utilis\u00e9 sur les voies sans \u00e9quipement sol ETCS (ETCS Niveau 0). L\u2019unit\u00e9 embarqu\u00e9e ne fournit qu\u2019une supervision de base : une vitesse plafond bas\u00e9e sur la valeur nationale pour les zones non \u00e9quip\u00e9es, plus la vitesse maximale propre du train. Il n\u2019y a ni MA, ni profil de vitesse depuis le sol, ni communication RBC. Le conducteur circule selon les r\u00e8gles de signalisation nationales (signaux lat\u00e9raux, tableaux de vitesse, proc\u00e9dures d\u2019exploitation). Si un syst\u00e8me national de protection des trains (par ex. PZB, ASFA, KVB, TPWS) est disponible via un STM, le train passe en mode SN \u00e0 la place. Le mode UN est courant lors des op\u00e9rations transfrontali\u00e8res lors de la transition d\u2019une ligne \u00e9quip\u00e9e \u00e0 une section non \u00e9quip\u00e9e.',
    speedLimit: 'Selon la valeur nationale pour les zones non \u00e9quip\u00e9es',
    driverResponsibility:
      'Responsabilit\u00e9 compl\u00e8te selon les r\u00e8gles de signalisation nationales. L\u2019ETCS ne fournit qu\u2019une supervision de la vitesse plafond.',
    realWorldContext:
      'Se produit lorsqu\u2019un train \u00e9quip\u00e9 ETCS circule sur une ligne secondaire ou un itin\u00e9raire ancien sans infrastructure sol ETCS. \u00c9galement courant lors des transitions transfrontali\u00e8res entre r\u00e9seaux \u00e9quip\u00e9s et non \u00e9quip\u00e9s.',
    keyCharacteristics: [
      'Aucun \u00e9quipement sol ETCS pr\u00e9sent (Niveau 0)',
      'Supervision de la vitesse plafond de base uniquement',
      'Aucun MA, aucune description de voie de l\u2019ETCS',
      'Le conducteur suit la signalisation et les r\u00e8gles nationales',
      'Les trains \u00e9quip\u00e9s d\u2019un STM utilisent le mode SN si un syst\u00e8me national est disponible',
    ],
  },
  SN: {
    name: 'STM National',
    description:
      'Le train est pass\u00e9 dans une zone disposant d\u2019un syst\u00e8me de protection des trains d\u2019un autre pays. L\u2019ETCS c\u00e8de le contr\u00f4le \u00e0 ce syst\u00e8me national via un adaptateur sp\u00e9cial (STM). L\u2019ancien syst\u00e8me local prot\u00e8ge d\u00e9sormais le train.',
    detailedDescription:
      'Le mode STM National permet \u00e0 un train ETCS de fonctionner sous un syst\u00e8me national h\u00e9rit\u00e9 de protection des trains via un Module de Transmission Sp\u00e9cifique (STM). Le STM connecte les \u00e9quipements de voie du syst\u00e8me national (balises nationales, aimants de voie, boucles inductives) \u00e0 l\u2019architecture embarqu\u00e9e ETCS. Le STM assure la supervision de vitesse, l\u2019interpr\u00e9tation des signaux et les commandes de frein selon les r\u00e8gles nationales. L\u2019unit\u00e9 embarqu\u00e9e ETCS coordonne l\u2019\u00e9tat global mais d\u00e9l\u00e8gue la protection au STM. Le DMI peut afficher des informations sp\u00e9cifiques au syst\u00e8me national. C\u2019est essentiel pour l\u2019interop\u00e9rabilit\u00e9 transfrontali\u00e8re : un train peut passer de Full Supervision ETCS \u00e0 un syst\u00e8me national (PZB en Allemagne, KVB en France, ASFA en Espagne, SCMT en Italie) lors du passage d\u2019une ligne ETCS \u00e0 une ligne prot\u00e9g\u00e9e nationalement.',
    speedLimit: 'Selon la supervision du syst\u00e8me national',
    driverResponsibility:
      'Suivre les indications et les r\u00e8gles du syst\u00e8me national. L\u2019ETCS coordonne mais c\u2019est le syst\u00e8me national qui supervise.',
    realWorldContext:
      'Essentiel pour les trains transfrontaliers en Europe. Par exemple, un train Thalys ou ICE circulant depuis une section ETCS Niveau 2 vers une zone prot\u00e9g\u00e9e par le syst\u00e8me national (PZB, KVB, TVM, etc.) du pays voisin.',
    keyCharacteristics: [
      'Syst\u00e8me national de protection des trains actif via STM',
      'L\u2019ETCS d\u00e9l\u00e8gue la supervision au syst\u00e8me national',
      'Essentiel pour l\u2019interop\u00e9rabilit\u00e9 transfrontali\u00e8re',
      'Le DMI peut afficher des informations sp\u00e9cifiques au syst\u00e8me national',
      'D\u00e9clench\u00e9 par un profil de mode du syst\u00e8me national depuis le sol',
    ],
  },
  SL: {
    name: 'Sommeil',
    description:
      'Cette unit\u00e9 ETCS est allum\u00e9e mais quelqu\u2019un d\u2019autre conduit. Une autre cabine ou un autre syst\u00e8me embarqu\u00e9 est en charge. Celle-ci reste simplement en veille silencieuse.',
    detailedDescription:
      'Le mode Sleeping est activ\u00e9 lorsque l\u2019unit\u00e9 embarqu\u00e9e ETCS reconna\u00eet qu\u2019elle n\u2019est pas l\u2019unit\u00e9 menante active. Cela se produit lorsqu\u2019un train a plusieurs unit\u00e9s ETCS et qu\u2019une seule est d\u00e9sign\u00e9e comme menante, lorsque la cabine arri\u00e8re d\u2019un train r\u00e9versible est sous tension mais non utilis\u00e9e, ou lorsqu\u2019une locomotive est attel\u00e9e mais qu\u2019une autre unit\u00e9 conduit. En mode Sleeping, l\u2019unit\u00e9 embarqu\u00e9e maintient son \u00e9tat interne (donn\u00e9es du train, position) mais ne r\u00e9alise pas de supervision active \u2014 pas de commandes de frein, pas de communication RBC pour les MAs, et pas de supervision op\u00e9rationnelle sur le DMI. La transition de Sleeping \u00e0 Stand By se produit lorsque le conducteur active cette cabine comme unit\u00e9 menante.',
    speedLimit: null,
    driverResponsibility:
      'Aucune conduite active depuis cette cabine. Une autre unit\u00e9 a le contr\u00f4le.',
    realWorldContext:
      'La cabine arri\u00e8re d\u2019un train r\u00e9versible de banlieue a son ETCS en mode Sleeping tandis que le conducteur op\u00e8re depuis la cabine avant. S\u2019applique \u00e9galement \u00e0 une locomotive de renfort ou une unit\u00e9 remorqu\u00e9e haut-le-pied.',
    keyCharacteristics: [
      'ETCS sous tension mais ne supervisant pas activement',
      'Aucune commande de frein \u00e9mise par cette unit\u00e9',
      'Une autre unit\u00e9 ETCS ou cabine est menante',
      '\u00c9tat interne (donn\u00e9es du train, position) maintenu',
      'Transition vers SB lorsque cette cabine devient menante',
    ],
  },
  TR: {
    name: 'D\u00e9clenchement',
    description:
      'Urgence ! Le train a d\u00e9pass\u00e9 un point o\u00f9 il aurait d\u00fb s\u2019arr\u00eater (ou quelque chose de dangereux a \u00e9t\u00e9 d\u00e9tect\u00e9). Les freins se d\u00e9clenchent automatiquement et le train doit s\u2019arr\u00eater compl\u00e8tement. C\u2019est le \u00ab bouton d\u2019urgence \u00bb de l\u2019ETCS.',
    detailedDescription:
      'Le mode Trip est la r\u00e9ponse d\u2019urgence de l\u2019ETCS face \u00e0 une situation potentiellement dangereuse. Il se d\u00e9clenche lorsque le train d\u00e9passe la fin d\u2019autorisation (EOA), lorsqu\u2019un groupe de balises commande un Trip, ou lorsque d\u2019autres conditions critiques de s\u00e9curit\u00e9 sont d\u00e9tect\u00e9es (par ex. franchissement d\u2019un signal d\u2019arr\u00eat en Niveau 1). L\u2019ETCS commande imm\u00e9diatement une application compl\u00e8te du frein d\u2019urgence. Le DMI affiche l\u2019indication de Trip. Aucun mouvement suppl\u00e9mentaire n\u2019est autoris\u00e9 tant que le conducteur n\u2019a pas acquitt\u00e9 le Trip et que les conditions sp\u00e9cifiques de r\u00e9tablissement ne sont pas remplies. Le Trip repr\u00e9sente la derni\u00e8re ligne de d\u00e9fense du syst\u00e8me contre une collision ou un d\u00e9raillement. La s\u00e9v\u00e9rit\u00e9 est d\u00e9lib\u00e9r\u00e9e \u2014 le freinage d\u2019urgence et la proc\u00e9dure de r\u00e9tablissement Post Trip garantissent le r\u00e9tablissement de conditions s\u00fbres. Chaque \u00e9v\u00e9nement de Trip est enregistr\u00e9 et peut n\u00e9cessiter une enqu\u00eate.',
    speedLimit: '0 km/h (freinage d\u2019urgence jusqu\u2019\u00e0 l\u2019arr\u00eat complet)',
    driverResponsibility:
      'Laisser le train s\u2019arr\u00eater. Ne pas tenter de se d\u00e9placer. Acquitter le d\u00e9clenchement et contacter le r\u00e9gulateur.',
    realWorldContext:
      'Se produit si un conducteur juge mal son freinage et d\u00e9passe l\u2019EOA, si une panne de communication provoque l\u2019expiration du MA \u00e0 un moment inopportun, ou si le sol d\u00e9clenche d\u00e9lib\u00e9r\u00e9ment le train en raison d\u2019un conflit d\u00e9tect\u00e9. Un \u00e9v\u00e9nement op\u00e9rationnel grave qui fait toujours l\u2019objet d\u2019une enqu\u00eate.',
    keyCharacteristics: [
      'Frein d\u2019urgence appliqu\u00e9 imm\u00e9diatement et automatiquement',
      'D\u00e9clench\u00e9 par le d\u00e9passement de l\u2019EOA ou un \u00e9v\u00e9nement critique de s\u00e9curit\u00e9',
      'Le train doit s\u2019arr\u00eater compl\u00e8tement',
      'Aucun mouvement autoris\u00e9 tant qu\u2019il n\u2019est pas acquitt\u00e9 et r\u00e9tabli',
      'Transition vers Post Trip apr\u00e8s l\u2019arr\u00eat complet et l\u2019acquittement du conducteur',
    ],
  },
  PT: {
    name: 'Post Trip',
    description:
      'L\u2019arr\u00eat d\u2019urgence est termin\u00e9 et le conducteur a appuy\u00e9 sur \u00ab acquitter \u00bb. Le train reste \u00e0 l\u2019arr\u00eat pendant que le conducteur appelle le r\u00e9gulateur pour d\u00e9cider de la suite. Personne ne bouge tant qu\u2019un plan n\u2019est pas convenu.',
    detailedDescription:
      'Le mode Post Trip est activ\u00e9 apr\u00e8s un \u00e9v\u00e9nement de Trip, une fois que le train s\u2019est arr\u00eat\u00e9 et que le conducteur a acquitt\u00e9 le Trip sur le DMI. L\u2019ETCS emp\u00eache tout mouvement vers l\u2019avant au-del\u00e0 du point d\u2019arr\u00eat. Le conducteur doit contacter le r\u00e9gulateur pour signaler le Trip et recevoir des instructions. Le r\u00e9gulateur peut autoriser le conducteur \u00e0 poursuivre en mode Staff Responsible, demander un mouvement de Shunting ou donner d\u2019autres instructions. En Niveau 2/3, l\u2019unit\u00e9 embarqu\u00e9e peut tenter de r\u00e9tablir la communication RBC et demander un nouveau MA. Le Post Trip offre une pause proc\u00e9durale \u2014 le conducteur et le r\u00e9gulateur doivent \u00e9valuer la situation avant que le train ne se d\u00e9place \u00e0 nouveau. Un mouvement en arri\u00e8re limit\u00e9 peut \u00eatre possible s\u2019il est autoris\u00e9.',
    speedLimit: '0 km/h (\u00e0 l\u2019arr\u00eat, marche arri\u00e8re limit\u00e9e possible)',
    driverResponsibility:
      'Contacter le r\u00e9gulateur. Signaler l\u2019\u00e9v\u00e9nement de d\u00e9clenchement. Attendre l\u2019autorisation avant tout mouvement.',
    realWorldContext:
      'Apr\u00e8s un \u00e9v\u00e9nement de d\u00e9clenchement \u00e0 un signal de gare, le conducteur contacte le r\u00e9gulateur par radio, explique la situation et le r\u00e9gulateur peut d\u00e9livrer une autorit\u00e9 verbale pour proc\u00e9der en mode SR au-del\u00e0 du signal ferm\u00e9, ou peut demander au train de reculer pour lib\u00e9rer le recouvrement.',
    keyCharacteristics: [
      'Activ\u00e9 apr\u00e8s le d\u00e9clenchement et l\u2019arr\u00eat du train',
      'Le conducteur doit acquitter le d\u00e9clenchement sur le DMI',
      'Aucun mouvement en avant autoris\u00e9 sans autorisation',
      'Le conducteur doit contacter le r\u00e9gulateur pour obtenir des instructions',
      'Transite g\u00e9n\u00e9ralement vers SR ou SH sous autorit\u00e9 du r\u00e9gulateur',
    ],
  },
  SF: {
    name: 'D\u00e9faillance syst\u00e8me',
    description:
      'L\u2019ordinateur de bord du train s\u2019est plant\u00e9 ou a d\u00e9tect\u00e9 une erreur interne grave. Il ne peut plus \u00eatre consid\u00e9r\u00e9 comme fiable pour assurer la s\u00e9curit\u00e9 du train, il d\u00e9clenche donc le frein d\u2019urgence et s\u2019arr\u00eate. Le conducteur doit revenir aux r\u00e8gles classiques.',
    detailedDescription:
      'Le mode System Failure est activ\u00e9 lorsque l\u2019unit\u00e9 embarqu\u00e9e ETCS d\u00e9tecte une panne compromettant sa capacit\u00e9 \u00e0 superviser le train en toute s\u00e9curit\u00e9 \u2014 panne mat\u00e9rielle (processeur, m\u00e9moire, capteur), erreur logicielle ou \u00e9chec de v\u00e9rification de coh\u00e9rence interne. Le syst\u00e8me commande une application du frein d\u2019urgence. Le DMI indique la d\u00e9faillance. L\u2019ETCS ne peut plus fournir aucune supervision, le conducteur doit donc fonctionner selon les r\u00e8gles et proc\u00e9dures nationales pour la circulation sans protection du train. Le r\u00e9tablissement n\u00e9cessite g\u00e9n\u00e9ralement un cycle de mise hors/sous tension (passage par NP vers SB). Si la panne persiste, l\u2019ETCS doit \u00eatre isol\u00e9 (mode IS) et le train circule sans protection ou est retir\u00e9 du service. C\u2019est un \u00e9v\u00e9nement rare mais critique.',
    speedLimit: '0 km/h (frein d\u2019urgence appliqu\u00e9)',
    driverResponsibility:
      'Suivre les r\u00e8gles nationales pour la circulation sans ETCS. Signaler la d\u00e9faillance. Peut n\u00e9cessiter l\u2019isolation de l\u2019ETCS.',
    realWorldContext:
      'Un \u00e9v\u00e9nement rare qui pourrait survenir suite \u00e0 une panne mat\u00e9rielle de l\u2019ordinateur de bord, un logiciel corrompu ou un dysfonctionnement de capteur (par ex. panne de l\u2019odom\u00e9trie, d\u00e9faut de l\u2019enregistreur juridique). Le train est g\u00e9n\u00e9ralement immobilis\u00e9 jusqu\u2019\u00e0 ce que la maintenance puisse \u00e9valuer la panne.',
    keyCharacteristics: [
      'D\u00e9faillance embarqu\u00e9e critique de s\u00e9curit\u00e9 d\u00e9tect\u00e9e',
      'Frein d\u2019urgence appliqu\u00e9 automatiquement',
      'L\u2019ETCS ne peut plus garantir une supervision s\u00fbre',
      'Le conducteur doit revenir aux r\u00e8gles d\u2019exploitation nationales',
      'Le r\u00e9tablissement n\u00e9cessite un cycle de mise hors/sous tension ou l\u2019isolation de l\u2019ETCS',
    ],
  },
  IS: {
    name: 'Isolation',
    description:
      'Le conducteur a d\u00e9lib\u00e9r\u00e9ment \u00e9teint l\u2019ETCS \u00e0 l\u2019aide d\u2019un interrupteur physique. Le syst\u00e8me est compl\u00e8tement d\u00e9sactiv\u00e9 \u2014 comme si on d\u00e9branchait la prise. Utilis\u00e9 lorsque l\u2019ETCS est en panne et ne peut pas \u00eatre r\u00e9par\u00e9 sur place.',
    detailedDescription:
      'Le mode Isolation est activ\u00e9 lorsque le conducteur actionne l\u2019interrupteur physique d\u2019isolation ETCS pour d\u00e9sactiver compl\u00e8tement l\u2019\u00e9quipement embarqu\u00e9. C\u2019est une action d\u00e9lib\u00e9r\u00e9e. Une fois isol\u00e9, l\u2019ETCS ne fournit aucune supervision, aucun affichage DMI (ou affiche une indication d\u2019isolation), aucune commande de frein et aucune communication avec le sol. Le train fonctionne enti\u00e8rement selon les r\u00e8gles nationales et tout syst\u00e8me ind\u00e9pendant de protection nationale des trains. L\u2019Isolation est utilis\u00e9e lorsque l\u2019ETCS a un d\u00e9faut persistant qui ne peut pas \u00eatre r\u00e9solu, pendant la maintenance, ou dans des sc\u00e9narios sp\u00e9cifiques o\u00f9 l\u2019ETCS doit \u00eatre d\u00e9sactiv\u00e9. L\u2019interrupteur d\u2019isolation est g\u00e9n\u00e9ralement un interrupteur \u00e0 cl\u00e9 physique pour \u00e9viter une activation accidentelle. Pour en sortir, le conducteur remet l\u2019interrupteur en position normale, d\u00e9clenchant une s\u00e9quence de mise sous tension et un red\u00e9marrage du syst\u00e8me.',
    speedLimit: null,
    driverResponsibility:
      'Responsabilit\u00e9 compl\u00e8te selon les r\u00e8gles nationales. Aucune protection ETCS disponible. Doit actionner l\u2019interrupteur d\u2019isolation.',
    realWorldContext:
      'Utilis\u00e9 lorsque l\u2019ETCS embarqu\u00e9 a un d\u00e9faut persistant et que le train doit continuer jusqu\u2019\u00e0 l\u2019atelier de maintenance le plus proche. \u00c9galement utilis\u00e9 lors des tests et activit\u00e9s de maintenance de l\u2019\u00e9quipement embarqu\u00e9 en atelier.',
    keyCharacteristics: [
      'ETCS d\u00e9lib\u00e9r\u00e9ment d\u00e9sactiv\u00e9 par le conducteur via un interrupteur physique',
      'Aucune fonction ETCS disponible',
      'Utilis\u00e9 pour les d\u00e9fauts persistants ou la maintenance',
      'Interrupteur \u00e0 cl\u00e9 physique emp\u00eachant l\u2019activation accidentelle',
      'La sortie n\u00e9cessite la r\u00e9initialisation de l\u2019interrupteur et un red\u00e9marrage complet du syst\u00e8me',
    ],
  },
  NL: {
    name: 'Non meneur',
    description:
      'Cette locomotive fait partie du train mais ce n\u2019est pas elle qui commande. Une autre unit\u00e9 \u00e0 l\u2019avant assure la conduite et les v\u00e9rifications de s\u00e9curit\u00e9. Celle-ci suit simplement en silence.',
    detailedDescription:
      'Le mode Non Leading est utilis\u00e9 lorsqu\u2019une unit\u00e9 motrice \u00e9quip\u00e9e ETCS fait partie d\u2019une rame mais ne contr\u00f4le pas le mouvement. Courant en traction multiple (deux locomotives ou plus attel\u00e9es ensemble) ou en exploitation r\u00e9versible o\u00f9 la locomotive arri\u00e8re a son ETCS actif mais la cabine avant a le contr\u00f4le. L\u2019unit\u00e9 embarqu\u00e9e est active et consciente de son statut mais ne demande ni ne d\u00e9tient de MA, et n\u2019\u00e9met pas de commandes de frein bas\u00e9es sur la supervision ETCS. La cabine en NL a g\u00e9n\u00e9ralement un affichage DMI r\u00e9duit. NL garantit qu\u2019une seule unit\u00e9 embarqu\u00e9e ETCS dans une rame supervise activement \u00e0 tout moment, emp\u00eachant les commandes de frein ou la gestion d\u2019autorisations conflictuelles.',
    speedLimit: null,
    driverResponsibility:
      'Surveillance uniquement. Aucune responsabilit\u00e9 de conduite active depuis cette unit\u00e9. L\u2019unit\u00e9 menante contr\u00f4le le train.',
    realWorldContext:
      'Un train de marchandises tract\u00e9 par deux locomotives attel\u00e9es : la locomotive de t\u00eate est en mode FS tandis que l\u2019ETCS de la locomotive arri\u00e8re est en mode NL. \u00c9galement utilis\u00e9 pour la voiture motrice arri\u00e8re d\u2019une rame r\u00e9versible \u00e0 grande vitesse.',
    keyCharacteristics: [
      'L\u2019unit\u00e9 n\u2019est pas la traction menante de la rame',
      'Aucune autorisation de mouvement d\u00e9tenue ou demand\u00e9e',
      'Aucune commande de frein ETCS \u00e9mise par cette unit\u00e9',
      'Emp\u00eache les supervisions conflictuelles dans les trains \u00e0 plusieurs unit\u00e9s',
      'Transition vers SB lorsque l\u2019unit\u00e9 devient menante',
    ],
  },
  RV: {
    name: 'Marche en arri\u00e8re',
    description:
      'Le train doit reculer sur une courte distance \u2014 peut-\u00eatre qu\u2019il a d\u00e9pass\u00e9 un quai ou qu\u2019il doit \u00e9vacuer un tunnel. L\u2019ETCS surveille la vitesse et la distance pour s\u2019assurer qu\u2019il ne va pas trop loin.',
    detailedDescription:
      'Le mode Reversing permet un mouvement contr\u00f4l\u00e9 en marche arri\u00e8re sous supervision ETCS. Le conducteur est autoris\u00e9 (via des informations sol ou une proc\u00e9dure ETCS sp\u00e9cifique) \u00e0 reculer sur une distance limit\u00e9e \u00e0 une vitesse limit\u00e9e. L\u2019ETCS surveille que le train ne d\u00e9passe pas la vitesse autoris\u00e9e en marche arri\u00e8re ni ne parcourt une distance sup\u00e9rieure \u00e0 celle autoris\u00e9e. Le DMI affiche l\u2019\u00e9tat de marche arri\u00e8re et la distance restante. Utilis\u00e9 pour reculer jusqu\u2019\u00e0 un quai apr\u00e8s un d\u00e9passement, se retirer d\u2019un point dangereux ou une \u00e9vacuation d\u2019urgence (par ex. reculer hors d\u2019un tunnel). Les param\u00e8tres de marche arri\u00e8re sont d\u00e9finis par les donn\u00e9es sol ou les valeurs nationales. Une fois termin\u00e9, le train passe \u00e0 un autre mode (g\u00e9n\u00e9ralement Post Trip ou Full Supervision). Ce n\u2019est pas pour la circulation bidirectionnelle r\u00e9guli\u00e8re.',
    speedLimit: '30 km/h (selon les param\u00e8tres de la zone de marche arri\u00e8re)',
    driverResponsibility:
      'Contr\u00f4ler le mouvement en marche arri\u00e8re dans les limites de vitesse et de distance autoris\u00e9es. Surveiller le DMI pour la distance restante.',
    realWorldContext:
      'Un train d\u00e9passe un quai dans une gare terminus et doit reculer. Ou un train dans un tunnel lors d\u2019une urgence doit reculer jusqu\u2019\u00e0 l\u2019entr\u00e9e du tunnel pour l\u2019\u00e9vacuation des passagers. \u00c9galement utilis\u00e9 \u00e0 des traverses-jonctions sp\u00e9cifiques.',
    keyCharacteristics: [
      'Mouvement en marche arri\u00e8re contr\u00f4l\u00e9 sous supervision ETCS',
      'Limites de vitesse et de distance appliqu\u00e9es',
      'Utilis\u00e9 pour le r\u00e9tablissement op\u00e9rationnel et les sc\u00e9narios d\u2019urgence',
      'N\u00e9cessite une autorisation sp\u00e9cifique du sol',
      'Pas pour la circulation bidirectionnelle r\u00e9guli\u00e8re',
    ],
  },
  AD: {
    name: 'Conduite automatique',
    description:
      'L\u2019ATO (conduite automatique des trains) a le contr\u00f4le. Le train se conduit tout seul \u2014 acc\u00e9l\u00e9ration, freinage et arr\u00eats en gare automatiques \u2014 tandis que l\u2019ETCS surveille toujours tout pour garantir la s\u00e9curit\u00e9. Ajout\u00e9 dans le Baseline 4.',
    detailedDescription:
      'Automatic Driving est un nouveau mode ETCS introduit dans le Baseline 4 (CCS TSI 2023) sp\u00e9cifiquement pour le fonctionnement ATO sur ETCS. Il est activ\u00e9 depuis Full Supervision lorsque le conducteur (GoA 2) ou le syst\u00e8me (GoA 3/4) enclenche l\u2019ATO. Dans ce mode, le syst\u00e8me embarqu\u00e9 ATO contr\u00f4le la traction, le freinage et la marche sur l\u2019erre selon un Profil de trajet re\u00e7u du sol ATO. L\u2019ETCS continue d\u2019assurer une supervision compl\u00e8te de s\u00e9curit\u00e9 \u2014 l\u2019autorisation de mouvement, le profil de vitesse et les courbes de freinage restent appliqu\u00e9s. Si les commandes ATO devaient violer une contrainte ETCS, la couche de s\u00e9curit\u00e9 intervient avec un freinage de service ou d\u2019urgence. Le conducteur peut d\u00e9sengager l\u2019ATO \u00e0 tout moment, revenant \u00e0 Full Supervision. Si l\u2019ETCS d\u00e9tecte une condition critique de s\u00e9curit\u00e9 (par ex. approche de l\u2019EOA), il prend la priorit\u00e9 sur l\u2019ATO automatiquement.',
    speedLimit: 'Selon le profil de vitesse statique et le MA (l\u2019ATO optimise dans l\u2019enveloppe ETCS)',
    driverResponsibility:
      'GoA 2 : surveiller le fonctionnement de l\u2019ATO, g\u00e9rer les portes et le d\u00e9part, peut intervenir \u00e0 tout moment. GoA 3/4 : r\u00f4le r\u00e9duit ou absent du conducteur.',
    realWorldContext:
      'Actuellement en phase pilote sur des lignes comme Thameslink (Royaume-Uni) et divers syst\u00e8mes de m\u00e9tro europ\u00e9ens. Ce mode permet une conduite \u00e9co\u00e9nerg\u00e9tique et optimis\u00e9e selon l\u2019horaire tout en maintenant une protection de s\u00e9curit\u00e9 ETCS compl\u00e8te. Il devrait devenir la norme pour les services urbains et de banlieue \u00e0 haute fr\u00e9quence.',
    keyCharacteristics: [
      'L\u2019ATO contr\u00f4le la traction, le freinage et la marche sur l\u2019erre automatiquement',
      'L\u2019ETCS maintient la supervision compl\u00e8te de s\u00e9curit\u00e9 (MA, vitesse, courbes de freinage)',
      'Le Profil de trajet du sol ATO guide l\u2019optimisation de la vitesse',
      'Le conducteur peut d\u00e9sengager l\u2019ATO \u00e0 tout moment (retour en FS)',
      'Introduit dans ETCS Baseline 4 / CCS TSI 2023',
    ],
  },
};
