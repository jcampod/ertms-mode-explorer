import type { ScenarioTranslation } from '../types';

export const frScenarios: Record<string, ScenarioTranslation> = {
  'normal-start': {
    title: 'D\u00e9marrage normal de mission',
    description:
      'Suivez un conducteur \u00e0 travers la s\u00e9quence standard de d\u00e9marrage ETCS : mise sous tension, saisie des donn\u00e9es, r\u00e9ception d\u2019une autorisation de mouvement et gestion d\u2019une zone de On Sight pendant le trajet.',
    category: 'Op\u00e9rations normales',
    steps: [
      {
        situation:
          'Vous \u00eates conducteur de train et arrivez au d\u00e9p\u00f4t t\u00f4t le matin. Vous montez dans la cabine et tournez la cl\u00e9 ma\u00eetre pour mettre l\u2019\u00e9quipement embarqu\u00e9 ETCS sous tension. Le syst\u00e8me ex\u00e9cute son autotest \u2014 v\u00e9rification des processeurs, de la m\u00e9moire, des capteurs d\u2019odom\u00e9trie et de l\u2019unit\u00e9 d\u2019enregistrement juridique. Tous les contr\u00f4les sont r\u00e9ussis et l\u2019\u00e9cran DMI s\u2019allume, affichant les champs de saisie de donn\u00e9es.',
        question:
          'L\u2019ETCS a d\u00e9marr\u00e9 et termin\u00e9 son autotest avec succ\u00e8s. Dans quel mode le syst\u00e8me entre-t-il ?',
        explanation:
          'Apr\u00e8s la mise sous tension et un autotest r\u00e9ussi, l\u2019ETCS entre toujours en mode Stand By (SB). C\u2019est le mode passerelle o\u00f9 le conducteur doit saisir son identifiant, les donn\u00e9es du train et confirmer le niveau ETCS avant de pouvoir commencer une mission. Le syst\u00e8me ne peut pas passer directement en Full Supervision car aucune autorisation de mouvement n\u2019existe encore.',
        hint: 'R\u00e9fl\u00e9chissez \u00e0 ce qui doit se passer avant que le train puisse bouger. Le syst\u00e8me a d\u2019abord besoin des donn\u00e9es du conducteur et du train.',
      },
      {
        situation:
          'Vous saisissez votre identifiant conducteur, le num\u00e9ro de marche du train et validez les donn\u00e9es du train (longueur : 200 m, vitesse max : 160 km/h, caract\u00e9ristiques de freinage). Le niveau ETCS est confirm\u00e9 comme Niveau 2 et l\u2019unit\u00e9 embarqu\u00e9e \u00e9tablit une session de communication avec le Centre de Bloc Radio (RBC). Le RBC envoie une autorisation de mouvement valide avec une description compl\u00e8te de la voie incluant le profil de vitesse et les donn\u00e9es de gradient.',
        question:
          'Vous avez termin\u00e9 la saisie de donn\u00e9es et re\u00e7u une autorisation de mouvement compl\u00e8te avec une description compl\u00e8te de la voie. Vers quel mode le syst\u00e8me doit-il transitionner ?',
        explanation:
          'Lorsqu\u2019un MA valide avec une description compl\u00e8te de la voie (profil de vitesse, gradients) est re\u00e7u, le syst\u00e8me passe en Full Supervision (FS). C\u2019est le d\u00e9but de mission id\u00e9al \u2014 le train dispose de tout le n\u00e9cessaire pour une protection ETCS maximale. Staff Responsible ne serait utilis\u00e9 que si aucun MA n\u2019\u00e9tait disponible.',
        hint: 'Vous disposez des meilleures conditions possibles : MA complet et donn\u00e9es de voie compl\u00e8tes. Quel mode offre le plus haut niveau de supervision ?',
      },
      {
        situation:
          'Vous circulez \u00e0 120 km/h en Full Supervision sur la ligne principale. Tout est normal \u2014 le DMI affiche la vitesse autoris\u00e9e, la distance cible et votre vitesse actuelle. Plus loin, le r\u00e9gulateur a \u00e9tabli un itin\u00e9raire \u00e0 travers une gare o\u00f9 l\u2019\u00e9quipement de d\u00e9tection de voie est partiellement en panne. Le RBC envoie un MA mis \u00e0 jour contenant un profil de mode On Sight pour les 800 m \u00e0 venir.',
        question:
          'Le RBC a envoy\u00e9 un profil de mode On Sight car la voie \u00e0 venir pourrait \u00eatre occup\u00e9e en raison d\u2019\u00e9quipements de d\u00e9tection en panne. En entrant dans cette zone, vers quel mode le syst\u00e8me transite-t-il ?',
        explanation:
          'Lorsque le sol envoie un profil de mode On Sight (OS), le syst\u00e8me passe en mode OS \u00e0 l\u2019entr\u00e9e de cette zone. En mode OS, la vitesse est limit\u00e9e \u00e0 30 km/h et vous devez conduire \u00e0 vue \u2014 pr\u00eat \u00e0 vous arr\u00eater dans la distance de visibilit\u00e9. Le MA reste valide ; seul le mode de supervision change pour refl\u00e9ter l\u2019incertitude d\u2019occupation de la voie.',
        hint: 'La voie devant pourrait \u00eatre occup\u00e9e. Quel mode exige que le conducteur soit pr\u00eat \u00e0 s\u2019arr\u00eater \u00e0 vue ?',
      },
      {
        situation:
          'Vous avancez prudemment \u00e0 25 km/h dans la zone de On Sight, surveillant attentivement toute obstruction. La section est libre et apr\u00e8s 800 m\u00e8tres vous d\u00e9passez la fin du profil de mode OS. La d\u00e9tection de voie fonctionne \u00e0 nouveau normalement au-del\u00e0 de ce point, et les donn\u00e9es compl\u00e8tes de description de voie sont disponibles.',
        question:
          'Vous avez travers\u00e9 la zone de On Sight en toute s\u00e9curit\u00e9. La voie \u00e0 venir dispose d\u2019\u00e9quipements de d\u00e9tection fonctionnels et les donn\u00e9es compl\u00e8tes de voie sont disponibles. Quel mode le syst\u00e8me reprend-il ?',
        explanation:
          'Une fois que le train quitte la zone de On Sight et que la description compl\u00e8te de la voie avec les conditions normales reprend, le syst\u00e8me revient automatiquement en Full Supervision (FS). C\u2019est le r\u00e9tablissement standard : OS est une restriction temporaire appliqu\u00e9e \u00e0 une section sp\u00e9cifique, et FS reprend lorsque cette section se termine.',
        hint: 'Les conditions qui ont provoqu\u00e9 le mode On Sight ne s\u2019appliquent plus. Quel \u00e9tait le mode avant d\u2019entrer dans la zone OS ?',
      },
    ],
  },

  'trip-recovery': {
    title: 'Trip et r\u00e9tablissement',
    description:
      'Vivez la proc\u00e9dure de Trip d\u2019urgence : ce qui se passe quand un train d\u00e9passe sa fin d\u2019autorisation, et le processus de r\u00e9tablissement \u00e9tape par \u00e9tape impliquant le conducteur, le r\u00e9gulateur et le syst\u00e8me ETCS.',
    category: 'Op\u00e9rations d\u00e9grad\u00e9es',
    steps: [
      {
        situation:
          'Vous conduisez \u00e0 80 km/h en Full Supervision, approchant une gare o\u00f9 le prochain signal est ferm\u00e9. Le DMI affiche la courbe de freinage et la vitesse cible de 0 km/h \u00e0 la fin d\u2019autorisation (EOA). Vous jugez mal la distance de freinage \u2014 peut-\u00eatre que le rail est mouill\u00e9 et l\u2019adh\u00e9rence mauvaise. Malgr\u00e9 l\u2019intervention du frein de service, le train glisse 15 m\u00e8tres au-del\u00e0 de l\u2019EOA.',
        question:
          'Le train a d\u00e9pass\u00e9 la fin d\u2019autorisation. L\u2019ETCS d\u00e9tecte que le train a franchi l\u2019EOA. Que se passe-t-il imm\u00e9diatement ?',
        explanation:
          'Le d\u00e9passement de la fin d\u2019autorisation (EOA) est la violation de s\u00e9curit\u00e9 la plus critique de l\u2019ETCS. Le syst\u00e8me entre imm\u00e9diatement en mode Trip (TR) et commande une application compl\u00e8te du frein d\u2019urgence. C\u2019est la fonction de s\u00e9curit\u00e9 fondamentale de l\u2019ETCS \u2014 emp\u00eacher les trains d\u2019entrer sur une voie non prot\u00e9g\u00e9e o\u00f9 une collision pourrait survenir.',
        hint: 'C\u2019est un \u00e9v\u00e9nement critique de s\u00e9curit\u00e9. Le train a d\u00e9pass\u00e9 sa limite de s\u00e9curit\u00e9. Quel est le mode de r\u00e9ponse d\u2019urgence ?',
      },
      {
        situation:
          'Le frein d\u2019urgence a \u00e9t\u00e9 appliqu\u00e9 et le train d\u00e9c\u00e9l\u00e8re rapidement. Apr\u00e8s quelques secondes de tension, le train s\u2019arr\u00eate compl\u00e8tement environ 40 m\u00e8tres au-del\u00e0 de l\u2019EOA. Le DMI affiche l\u2019indication de Trip de mani\u00e8re bien visible. Votre coeur bat vite, mais vous devez suivre la proc\u00e9dure de r\u00e9tablissement. Vous appuyez sur le bouton d\u2019acquittement sur le DMI.',
        question:
          'Le train s\u2019est arr\u00eat\u00e9 et vous avez acquitt\u00e9 le Trip sur le DMI. Dans quel mode le syst\u00e8me entre-t-il pour la phase de r\u00e9tablissement ?',
        explanation:
          'Apr\u00e8s un Trip, une fois le train \u00e0 l\u2019arr\u00eat et le conducteur ayant acquitt\u00e9 le Trip sur le DMI, le syst\u00e8me entre en mode Post Trip (PT). C\u2019est un \u00e9tat de r\u00e9tablissement contr\u00f4l\u00e9 \u2014 le train ne peut pas avancer, et le conducteur doit contacter le r\u00e9gulateur avant toute action ult\u00e9rieure. PT assure une pause proc\u00e9durale pour l\u2019\u00e9valuation de s\u00e9curit\u00e9.',
        hint: 'Apr\u00e8s l\u2019arr\u00eat d\u2019urgence, le syst\u00e8me a besoin d\u2019un \u00e9tat de r\u00e9tablissement. Il n\u2019est pas encore s\u00fbr de bouger \u2014 quel mode g\u00e8re la p\u00e9riode entre le Trip et la reprise du mouvement ?',
      },
      {
        situation:
          'Vous \u00eates en mode Post Trip. Le train est immobile 40 m\u00e8tres au-del\u00e0 du signal ferm\u00e9. Vous contactez le r\u00e9gulateur par radio GSM-R et signalez l\u2019\u00e9v\u00e9nement de Trip, en donnant votre position et le num\u00e9ro du train. Le r\u00e9gulateur v\u00e9rifie l\u2019enclenchement et confirme que la zone de recouvrement au-del\u00e0 du signal est libre et qu\u2019aucun itin\u00e9raire conflictuel n\u2019est \u00e9tabli. Le r\u00e9gulateur vous donne une autorit\u00e9 verbale pour continuer au-del\u00e0 du signal.',
        question:
          'Le r\u00e9gulateur a confirm\u00e9 que l\u2019itin\u00e9raire est s\u00fbr et vous a autoris\u00e9 \u00e0 continuer. Vous demandez \u00e0 avancer sur le DMI. Dans quel mode le syst\u00e8me entrera-t-il ?',
        explanation:
          'Apr\u00e8s un Trip, le r\u00e9tablissement standard est de poursuivre en mode Staff Responsible (SR). Le conducteur a re\u00e7u une autorisation verbale du r\u00e9gulateur et demande le mode SR sur le DMI. En mode SR, l\u2019ETCS supervise une vitesse plafond (40 km/h) mais le conducteur assume la responsabilit\u00e9 du mouvement s\u00fbr. La Full Supervision ne peut pas encore \u00eatre activ\u00e9e car aucun MA n\u2019est disponible \u00e0 ce stade.',
        hint: 'Vous avez une autorisation verbale du r\u00e9gulateur mais aucune autorisation de mouvement \u00e9lectronique du RBC. Quel mode permet le mouvement sous responsabilit\u00e9 du conducteur ?',
      },
      {
        situation:
          'Vous avancez prudemment \u00e0 35 km/h en mode Staff Responsible. En passant le signal suivant (qui pr\u00e9sente un aspect de voie libre), le train passe sur un groupe de balises qui transmet une nouvelle autorisation de mouvement du RBC. Le MA inclut une description compl\u00e8te de la voie avec le profil de vitesse et les donn\u00e9es de gradient pour l\u2019itin\u00e9raire \u00e0 venir.',
        question:
          'Vous avez re\u00e7u une autorisation de mouvement valide avec une description compl\u00e8te de la voie en mode SR. Vers quel mode le syst\u00e8me transite-t-il ?',
        explanation:
          'Lorsqu\u2019un MA valide avec une description compl\u00e8te de la voie est re\u00e7u en mode Staff Responsible, le syst\u00e8me passe automatiquement en Full Supervision (FS). C\u2019est le chemin de r\u00e9tablissement normal : SR est un mode d\u00e9grad\u00e9 temporaire, et la r\u00e9ception d\u2019un MA en bonne et due forme restaure la protection ETCS compl\u00e8te.',
        hint: 'Vous disposez d\u00e9sormais de tout ce qu\u2019il faut pour le plus haut niveau de supervision. Quel est le mode op\u00e9rationnel principal de l\u2019ETCS ?',
      },
      {
        situation:
          'Vous avez termin\u00e9 votre trajet avec succ\u00e8s et \u00eates arriv\u00e9 \u00e0 la gare terminus. Le train est \u00e0 l\u2019arr\u00eat au quai. C\u2019est la fin de votre mission \u2014 vous devez \u00e9teindre l\u2019ETCS et transmettre le train au prochain conducteur. Vous fermez le pupitre et mettez l\u2019\u00e9quipement embarqu\u00e9 ETCS hors tension.',
        question:
          'Vous mettez l\u2019ETCS hors tension \u00e0 la fin de votre mission. Le syst\u00e8me revient d\u2019abord en Stand By lorsque vous fermez la mission. Puis que se passe-t-il quand vous coupez l\u2019alimentation ?',
        explanation:
          'Lorsque l\u2019\u00e9quipement embarqu\u00e9 ETCS est mis hors tension, le syst\u00e8me entre en mode No Power (NP). Toutes les fonctions ETCS cessent \u2014 pas de DMI, pas de supervision, pas de communication. C\u2019est l\u2019\u00e9tat naturel de fin de mission. L\u2019Isolation (IS) est diff\u00e9rente : c\u2019est la d\u00e9sactivation d\u00e9lib\u00e9r\u00e9e d\u2019un syst\u00e8me sous tension via l\u2019interrupteur d\u2019isolation.',
        hint: 'L\u2019\u00e9quipement n\u2019a plus d\u2019alimentation \u00e9lectrique. Quel est l\u2019\u00e9tat non op\u00e9rationnel le plus basique ?',
      },
    ],
  },

  'shunting-ops': {
    title: 'Op\u00e9rations de manoeuvre',
    description:
      'Apprenez comment les trains transitent vers et depuis le mode Shunting pour les op\u00e9rations en faisceau comme l\u2019attelage de wagons et l\u2019assemblage de trains avant le d\u00e9part en ligne.',
    category: 'Op\u00e9rations en faisceau',
    steps: [
      {
        situation:
          'Vous \u00eates dans un faisceau de triage. L\u2019ETCS est en mode Stand By apr\u00e8s la mise sous tension et la saisie de donn\u00e9es. Le chef de manoeuvre vous demande de d\u00e9placer votre locomotive vers la voie 3 pour atteler une rame de voitures voyageurs. Vous appuyez sur le bouton de demande de Shunting sur le DMI.',
        question:
          'Vous avez demand\u00e9 le Shunting depuis le mode Stand By. Le syst\u00e8me accepte la demande. Dans quel mode l\u2019ETCS entre-t-il ?',
        explanation:
          'Lorsqu\u2019une demande de Shunting est faite depuis le mode Stand By, le syst\u00e8me entre en mode Shunting (SH). En mode SH, l\u2019ETCS supervise une vitesse plafond de 30 km/h mais ne fournit aucune autorisation de mouvement ni protection d\u2019itin\u00e9raire. Le conducteur est responsable de l\u2019observation de la voie devant lui et du suivi des instructions du chef de manoeuvre.',
        hint: 'Vous devez effectuer des mouvements \u00e0 basse vitesse en faisceau. Quel mode est sp\u00e9cifiquement con\u00e7u pour les op\u00e9rations de triage ?',
      },
      {
        situation:
          'Vous avez r\u00e9ussi l\u2019attelage avec les voitures voyageurs et termin\u00e9 tous les mouvements de Shunting. Le train est d\u00e9sormais assembl\u00e9 et pr\u00eat pour son d\u00e9part en ligne. Vous d\u00e9s\u00e9lectionnez le mode Shunting sur le DMI pour pr\u00e9parer le d\u00e9but de la mission en ligne.',
        question:
          'Le Shunting est termin\u00e9 et vous avez d\u00e9s\u00e9lectionn\u00e9 le mode Shunting. Dans quel mode le syst\u00e8me revient-il ?',
        explanation:
          'Lorsque le Shunting est d\u00e9s\u00e9lectionn\u00e9, le syst\u00e8me revient en mode Stand By (SB). C\u2019est le mode passerelle central \u2014 depuis celui-ci, vous pouvez valider les donn\u00e9es du train (qui ont pu changer apr\u00e8s l\u2019attelage) et pr\u00e9parer la mission en ligne. SB est toujours l\u2019\u00e9tape interm\u00e9diaire entre le Shunting et les modes op\u00e9rationnels.',
        hint: 'Apr\u00e8s le Shunting, le conducteur doit valider les donn\u00e9es et pr\u00e9parer la prochaine mission. Quel mode sert de passerelle vers tous les modes op\u00e9rationnels ?',
      },
      {
        situation:
          'De retour en mode Stand By, vous validez les donn\u00e9es du train mises \u00e0 jour (le train est maintenant plus long avec les voitures). Le niveau ETCS est confirm\u00e9 comme Niveau 2, et le RBC \u00e9tablit la communication. Une autorisation de mouvement valide avec description compl\u00e8te de la voie est re\u00e7ue pour votre itin\u00e9raire de d\u00e9part de la gare.',
        question:
          'Les donn\u00e9es du train sont valid\u00e9es et une autorisation de mouvement compl\u00e8te a \u00e9t\u00e9 re\u00e7ue. Vers quel mode le syst\u00e8me transite-t-il pour le d\u00e9part en ligne ?',
        explanation:
          'Avec la saisie de donn\u00e9es compl\u00e9t\u00e9e, un MA valide et une description compl\u00e8te de la voie, le syst\u00e8me passe en Full Supervision (FS). C\u2019est le sc\u00e9nario de d\u00e9part id\u00e9al \u2014 le train dispose de tout le n\u00e9cessaire pour une protection ETCS maximale en ligne.',
        hint: 'Vous r\u00e9unissez toutes les conditions pour le mode de fonctionnement le plus s\u00fbr : MA complet et donn\u00e9es de voie compl\u00e8tes.',
      },
    ],
  },

  'non-equipped-crossing': {
    title: 'Travers\u00e9e de zones non \u00e9quip\u00e9es',
    description:
      'Effectuez un trajet transfrontalier qui passe d\u2019un territoire ETCS \u00e0 une voie non \u00e9quip\u00e9e, puis de retour en ETCS, et enfin dans une zone de syst\u00e8me national de protection des trains.',
    category: 'Op\u00e9rations transfrontali\u00e8res',
    steps: [
      {
        situation:
          'Vous conduisez un train de marchandises transfrontalier \u00e0 100 km/h en Full Supervision sur une ligne principale ETCS Niveau 2. L\u2019itin\u00e9raire \u00e0 venir traverse une section de ligne secondaire qui n\u2019a pas \u00e9t\u00e9 \u00e9quip\u00e9e en ETCS c\u00f4t\u00e9 sol. Le groupe de balises annonce une transition de niveau du Niveau 2 au Niveau 0. Il n\u2019y a ni balises ETCS, ni communication RBC, ni syst\u00e8me national de protection des trains sur cette section.',
        question:
          'Le train entre dans une section sans \u00e9quipement sol ETCS (Niveau 0) et sans syst\u00e8me national. Dans quel mode l\u2019ETCS transite-t-il ?',
        explanation:
          'Lorsque le train entre dans une zone sans \u00e9quipement sol ETCS (Niveau 0) et qu\u2019aucun syst\u00e8me national n\u2019est disponible via STM, le syst\u00e8me entre en mode Unfitted (UN). L\u2019ETCS ne fournit qu\u2019une supervision de vitesse plafond de base selon les valeurs nationales. Le conducteur doit suivre les signaux lat\u00e9raux et les r\u00e8gles d\u2019exploitation nationales. STM National (SN) ne s\u2019appliquerait que si un syst\u00e8me national \u00e9tait pr\u00e9sent.',
        hint: 'Il n\u2019y a ni sol ETCS ni syst\u00e8me national. La voie est compl\u00e8tement \u00ab non \u00e9quip\u00e9e \u00bb. Quel mode g\u00e8re le Niveau 0 ?',
      },
      {
        situation:
          'Vous circulez depuis 20 kilom\u00e8tres dans la section non \u00e9quip\u00e9e, suivant les signaux lat\u00e9raux et les tableaux de vitesse. Devant vous, vous voyez le tableau de transition ETCS indiquant que vous entrez \u00e0 nouveau dans une zone \u00e9quip\u00e9e ETCS. Le train passe un groupe de balises annon\u00e7ant une transition de niveau du Niveau 0 au Niveau 2. Cependant, le RBC est en surcharge et ne peut pas fournir imm\u00e9diatement une autorisation de mouvement.',
        question:
          'Vous entrez \u00e0 nouveau dans une zone \u00e9quip\u00e9e ETCS (Niveau 2) mais aucune autorisation de mouvement n\u2019est encore disponible depuis le RBC. Dans quel mode le syst\u00e8me transite-t-il ?',
        explanation:
          'Lors de la transition d\u2019une zone non \u00e9quip\u00e9e vers une zone \u00e9quip\u00e9e ETCS mais sans MA valide, le syst\u00e8me entre en mode Staff Responsible (SR). C\u2019est le repli s\u00fbr : le conducteur acquitte le mode SR et circule sous sa propre responsabilit\u00e9 \u00e0 la vitesse plafond r\u00e9duite (40 km/h) jusqu\u2019\u00e0 obtention d\u2019un MA du RBC.',
        hint: 'Vous \u00eates en territoire ETCS mais n\u2019avez pas d\u2019autorisation de mouvement. Quel mode permet le mouvement sous responsabilit\u00e9 du conducteur sans MA ?',
      },
      {
        situation:
          'Apr\u00e8s quelques minutes en mode Staff Responsible, le RBC r\u00e9sout sa surcharge et envoie une autorisation de mouvement valide avec une description compl\u00e8te de la voie via la liaison radio. L\u2019unit\u00e9 embarqu\u00e9e re\u00e7oit le MA et v\u00e9rifie son int\u00e9grit\u00e9.',
        question:
          'Un MA valide avec une description compl\u00e8te de la voie a \u00e9t\u00e9 re\u00e7u du RBC. Vers quel mode le syst\u00e8me transite-t-il ?',
        explanation:
          'La r\u00e9ception d\u2019un MA valide avec une description compl\u00e8te de la voie en mode SR d\u00e9clenche une transition automatique vers la Full Supervision (FS). C\u2019est le chemin de passage normal \u2014 SR est un repli temporaire, et FS fournit la protection compl\u00e8te pour laquelle l\u2019ETCS est con\u00e7u.',
        hint: 'Les conditions sont d\u00e9sormais id\u00e9ales : MA complet, donn\u00e9es de voie compl\u00e8tes. Quel est le mode de supervision le plus \u00e9lev\u00e9 ?',
      },
      {
        situation:
          'Plus loin sur l\u2019itin\u00e9raire, vous approchez de la fronti\u00e8re avec le pays voisin. Son r\u00e9seau ferroviaire est prot\u00e9g\u00e9 par un syst\u00e8me national de protection des trains (PZB). Le sol ETCS envoie un profil de mode de syst\u00e8me national, et votre train est \u00e9quip\u00e9 du STM appropri\u00e9. Une transition de niveau de ETCS Niveau 2 \u00e0 NTC est command\u00e9e.',
        question:
          'Le train passe dans une zone prot\u00e9g\u00e9e par un syst\u00e8me national (PZB) via STM. Dans quel mode l\u2019ETCS transite-t-il ?',
        explanation:
          'Lorsque le train entre dans une zone prot\u00e9g\u00e9e par un syst\u00e8me national de protection des trains et dispose d\u2019un STM compatible, l\u2019ETCS passe en mode STM National (SN). Le STM prend en charge la supervision selon les r\u00e8gles et l\u2019\u00e9quipement du syst\u00e8me national. C\u2019est distinct du mode Unfitted (UN), qui s\u2019applique lorsqu\u2019il n\u2019y a aucun syst\u00e8me de protection.',
        hint: 'Un syst\u00e8me national de protection des trains est pr\u00e9sent et le train a le STM pour s\u2019y interfacer. Quel mode d\u00e9l\u00e8gue au syst\u00e8me national ?',
      },
    ],
  },

  'system-failure': {
    title: 'Gestion d\u2019une d\u00e9faillance syst\u00e8me',
    description:
      'G\u00e9rez une d\u00e9faillance critique de l\u2019\u00e9quipement embarqu\u00e9 : de la r\u00e9ponse d\u2019urgence initiale \u00e0 l\u2019isolation, en passant par l\u2019exploitation sous r\u00e8gles nationales et le r\u00e9tablissement final du syst\u00e8me.',
    category: 'D\u00e9faillance et r\u00e9tablissement',
    steps: [
      {
        situation:
          'Vous circulez \u00e0 140 km/h en Full Supervision sur une ligne \u00e0 grande vitesse. Soudain, l\u2019\u00e9quipement embarqu\u00e9 ETCS d\u00e9tecte une d\u00e9faillance interne critique de s\u00e9curit\u00e9 \u2014 le processeur d\u2019odom\u00e9trie a produit des mesures incoh\u00e9rentes et le syst\u00e8me ne peut plus garantir une mesure pr\u00e9cise de la vitesse. L\u2019unit\u00e9 embarqu\u00e9e d\u00e9termine qu\u2019elle ne peut plus superviser le mouvement du train en toute s\u00e9curit\u00e9.',
        question:
          'L\u2019ETCS a d\u00e9tect\u00e9 une d\u00e9faillance interne critique de s\u00e9curit\u00e9 et ne peut plus garantir une supervision s\u00fbre. Dans quel mode le syst\u00e8me entre-t-il ?',
        explanation:
          'Lorsque l\u2019unit\u00e9 embarqu\u00e9e ETCS d\u00e9tecte une d\u00e9faillance critique de s\u00e9curit\u00e9 l\u2019emp\u00eachant de garantir une supervision s\u00fbre, elle entre en mode System Failure (SF) et applique imm\u00e9diatement le frein d\u2019urgence. C\u2019est diff\u00e9rent d\u2019un Trip (TR), qui est caus\u00e9 par une violation de s\u00e9curit\u00e9 externe (d\u00e9passement de l\u2019EOA). SF signifie que le syst\u00e8me lui-m\u00eame est d\u00e9faillant et ne peut plus \u00eatre consid\u00e9r\u00e9 comme fiable.',
        hint: 'La panne est interne \u00e0 l\u2019\u00e9quipement ETCS lui-m\u00eame. Le syst\u00e8me a perdu sa capacit\u00e9 \u00e0 superviser en toute s\u00e9curit\u00e9. Quel mode indique une panne de l\u2019\u00e9quipement embarqu\u00e9 ?',
      },
      {
        situation:
          'Le frein d\u2019urgence a arr\u00eat\u00e9 le train en pleine voie. Le DMI affiche l\u2019indication de System Failure. Vous tentez un cycle de mise hors/sous tension \u2014 vous \u00e9teignez l\u2019ETCS puis le rallumez. Cependant, l\u2019autotest \u00e9choue \u00e0 nouveau : la panne du processeur d\u2019odom\u00e9trie est persistante. L\u2019ETCS ne peut pas red\u00e9marrer normalement. Vous devez amener le train \u00e0 la prochaine gare pour la maintenance. Vous d\u00e9cidez d\u2019utiliser l\u2019interrupteur physique d\u2019isolation ETCS.',
        question:
          'La panne est persistante et l\u2019ETCS ne peut pas red\u00e9marrer. Vous actionnez l\u2019interrupteur physique d\u2019isolation pour d\u00e9sactiver enti\u00e8rement l\u2019ETCS. Dans quel mode cela place-t-il le syst\u00e8me ?',
        explanation:
          'Actionner l\u2019interrupteur physique d\u2019isolation ETCS place le syst\u00e8me en mode Isolation (IS). Cela d\u00e9sactive d\u00e9lib\u00e9r\u00e9ment toutes les fonctions ETCS. Contrairement au mode No Power (NP), o\u00f9 le syst\u00e8me n\u2019a simplement pas d\u2019alimentation, l\u2019Isolation est une d\u00e9cision active du conducteur de mettre l\u2019ETCS hors service. Le train fonctionnera d\u00e9sormais enti\u00e8rement sous les r\u00e8gles nationales sans aucune protection ETCS.',
        hint: 'Le conducteur d\u00e9sactive d\u00e9lib\u00e9r\u00e9ment l\u2019ETCS avec un interrupteur physique. Ce n\u2019est pas une mise hors tension mais une isolation active. Quel mode repr\u00e9sente cela ?',
      },
      {
        situation:
          'Avec l\u2019ETCS isol\u00e9, vous exploitez le train uniquement sous les r\u00e8gles nationales. Vous contactez le r\u00e9gulateur, qui vous autorise \u00e0 circuler \u00e0 tr\u00e8s basse vitesse jusqu\u2019\u00e0 la prochaine gare \u00e0 8 km. Vous conduisez prudemment, observant les signaux lat\u00e9raux et les tableaux de vitesse. Vous arrivez en toute s\u00e9curit\u00e9 au quai de la gare et le train est retir\u00e9 du service pour maintenance.',
        question:
          'La maintenance a r\u00e9par\u00e9 le processeur d\u2019odom\u00e9trie et doit restaurer l\u2019ETCS. La premi\u00e8re \u00e9tape est de remettre l\u2019interrupteur d\u2019isolation en position normale. Dans quel mode l\u2019ETCS entre-t-il lorsque l\u2019interrupteur d\u2019isolation est r\u00e9initialis\u00e9 ?',
        explanation:
          'Lorsque l\u2019interrupteur d\u2019isolation est remis en position normale, l\u2019ETCS passe d\u2019abord en mode No Power (NP). Le syst\u00e8me doit ensuite passer par la s\u00e9quence compl\u00e8te de mise sous tension (NP vers SB) incluant l\u2019autotest. Il ne saute pas directement en mode Stand By \u2014 la r\u00e9initialisation de l\u2019interrupteur d\u2019isolation d\u00e9clenche une s\u00e9quence propre de red\u00e9marrage \u00e0 travers l\u2019\u00e9tat hors tension.',
        hint: 'La r\u00e9initialisation de l\u2019interrupteur d\u2019isolation est comme un nouveau d\u00e9part. Le syst\u00e8me doit passer par sa s\u00e9quence compl\u00e8te de mise sous tension. Quel est l\u2019\u00e9tat de d\u00e9part avant la mise sous tension ?',
      },
      {
        situation:
          'L\u2019\u00e9quipe de maintenance met l\u2019\u00e9quipement embarqu\u00e9 ETCS sous tension. Cette fois, l\u2019autotest s\u2019ex\u00e9cute avec succ\u00e8s \u2014 le processeur d\u2019odom\u00e9trie r\u00e9par\u00e9 r\u00e9ussit tous les contr\u00f4les, l\u2019int\u00e9grit\u00e9 de la m\u00e9moire est v\u00e9rifi\u00e9e et tous les sous-syst\u00e8mes signalent un \u00e9tat normal. Le DMI s\u2019allume et affiche l\u2019\u00e9cran de saisie de donn\u00e9es.',
        question:
          'L\u2019ETCS a \u00e9t\u00e9 mis sous tension et l\u2019autotest est r\u00e9ussi apr\u00e8s la r\u00e9paration. Dans quel mode le syst\u00e8me entre-t-il ?',
        explanation:
          'Apr\u00e8s une mise sous tension et un autotest r\u00e9ussis, l\u2019ETCS entre toujours en mode Stand By (SB), quel que soit ce qui s\u2019est pass\u00e9 auparavant. C\u2019est la s\u00e9quence standard de d\u00e9marrage : NP vers SB. Depuis Stand By, une nouvelle mission peut \u00eatre d\u00e9marr\u00e9e avec une nouvelle saisie de donn\u00e9es. Le syst\u00e8me a \u00e9t\u00e9 enti\u00e8rement restaur\u00e9 en fonctionnement normal.',
        hint: 'C\u2019est la s\u00e9quence standard de mise sous tension. Apr\u00e8s l\u2019autotest, le syst\u00e8me attend la saisie de donn\u00e9es du conducteur dans quel mode ?',
      },
    ],
  },

  'multiple-traction': {
    title: 'Op\u00e9rations en traction multiple',
    description:
      'Comprenez comment l\u2019ETCS g\u00e8re les trains \u00e0 plusieurs unit\u00e9s motrices : configuration d\u2019une locomotive comme non menante, exploitation en rame, puis reconfiguration pour une exploitation solo.',
    category: 'Op\u00e9rations sp\u00e9ciales',
    steps: [
      {
        situation:
          'Vous \u00eates dans la cabine d\u2019une seconde locomotive qui sera attel\u00e9e \u00e0 l\u2019arri\u00e8re d\u2019un train de marchandises lourd. La locomotive de t\u00eate a d\u00e9j\u00e0 son ETCS en Full Supervision et contr\u00f4lera le train. Votre locomotive fournira une traction suppl\u00e9mentaire mais ne doit pas \u00e9mettre de commandes de frein conflictuelles ni d\u00e9tenir une autorisation de mouvement s\u00e9par\u00e9e. Vous s\u00e9lectionnez \u00ab Non Leading \u00bb sur le DMI.',
        question:
          'Vous avez configur\u00e9 cet ETCS comme Non Leading car une autre locomotive a le contr\u00f4le. Dans quel mode le syst\u00e8me entre-t-il ?',
        explanation:
          'Lorsque le conducteur s\u00e9lectionne Non Leading, le syst\u00e8me entre en mode Non Leading (NL). Dans ce mode, l\u2019ETCS est actif et conscient de son statut mais ne d\u00e9tient pas de MA, n\u2019\u00e9met pas de commandes de frein et ne supervise pas la vitesse. Cela \u00e9vite les contr\u00f4les conflictuels entre plusieurs unit\u00e9s ETCS du m\u00eame train. Sleeping (SL) est diff\u00e9rent \u2014 c\u2019est pour une cabine inactive, pas une unit\u00e9 non menante avec \u00e9quipage.',
        hint: 'Cette unit\u00e9 a un conducteur mais n\u2019est pas l\u2019unit\u00e9 de contr\u00f4le. Elle doit \u00eatre active mais passive. Quel mode est pr\u00e9vu pour une unit\u00e9 de traction non menante avec \u00e9quipage ?',
      },
      {
        situation:
          'Le train de marchandises termine son trajet. Au faisceau de destination, les locomotives sont d\u00e9coupl\u00e9es. Votre locomotive est d\u00e9sormais autonome et doit fonctionner ind\u00e9pendamment pour sa prochaine mission \u2014 un mouvement haut-le-pied vers le d\u00e9p\u00f4t. Vous reconfigurez la cabine comme unit\u00e9 menante en s\u00e9lectionnant l\u2019option appropri\u00e9e sur le DMI.',
        question:
          'Vous reconfigurez cette locomotive comme unit\u00e9 menante pour une exploitation ind\u00e9pendante. Vers quel mode l\u2019ETCS transite-t-il ?',
        explanation:
          'Lorsqu\u2019une unit\u00e9 Non Leading devient l\u2019unit\u00e9 menante, l\u2019ETCS passe en mode Stand By (SB). Cela permet au conducteur de saisir ou valider les donn\u00e9es du train pour la nouvelle mission (les donn\u00e9es du train seront diff\u00e9rentes maintenant \u2014 locomotive seule au lieu d\u2019une rame compl\u00e8te). Stand By est toujours la passerelle pour d\u00e9marrer une nouvelle mission.',
        hint: 'La locomotive est maintenant ind\u00e9pendante et doit d\u00e9marrer une nouvelle mission. Quel est le mode passerelle o\u00f9 s\u2019effectue la saisie de donn\u00e9es ?',
      },
      {
        situation:
          'Vous mettez \u00e0 jour les donn\u00e9es du train pour le mouvement haut-le-pied (longueur beaucoup plus courte, caract\u00e9ristiques de freinage diff\u00e9rentes). L\u2019ETCS \u00e9tablit une nouvelle session RBC et re\u00e7oit une autorisation de mouvement avec description de voie pour l\u2019itin\u00e9raire vers le d\u00e9p\u00f4t.',
        question:
          'Les donn\u00e9es du train sont valid\u00e9es et une autorisation de mouvement avec description compl\u00e8te de la voie a \u00e9t\u00e9 re\u00e7ue pour le trajet vers le d\u00e9p\u00f4t. Dans quel mode le syst\u00e8me entre-t-il ?',
        explanation:
          'Avec les donn\u00e9es du train valid\u00e9es, un MA valide et une description compl\u00e8te de la voie, le syst\u00e8me passe en Full Supervision (FS). C\u2019est le d\u00e9marrage standard de mission avec une protection ETCS compl\u00e8te \u2014 la m\u00eame transition quel que soit le mode pr\u00e9c\u00e9dent du train (NL ou autre). Stand By fournit toujours un d\u00e9part propre.',
        hint: 'Vous disposez de toutes les donn\u00e9es n\u00e9cessaires pour la protection maximale : MA, profil de vitesse, gradient. Quel est le mode op\u00e9rationnel le plus s\u00fbr ?',
      },
    ],
  },
};
