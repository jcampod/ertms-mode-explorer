import type { TransitionTranslation } from '../types';

export const frTransitions: Record<string, TransitionTranslation> = {
  // NP <-> SB
  'NP-SB': {
    description: 'Mise sous tension et d\u00e9marrage du syst\u00e8me',
    detailedDescription:
      'Le conducteur met l\u2019\u00e9quipement embarqu\u00e9 ETCS sous tension. Le syst\u00e8me effectue son autotest de d\u00e9marrage (v\u00e9rification du mat\u00e9riel, de l\u2019int\u00e9grit\u00e9 logicielle, des donn\u00e9es stock\u00e9es). Apr\u00e8s r\u00e9ussite, le syst\u00e8me entre en mode Stand By et le DMI devient actif pour la saisie de donn\u00e9es.',
    conditions: [
      '\u00c9quipement embarqu\u00e9 ETCS mis sous tension',
      'Autotest termin\u00e9 avec succ\u00e8s',
    ],
  },
  'SB-NP': {
    description: 'Mise hors tension',
    detailedDescription:
      'Le conducteur met l\u2019\u00e9quipement embarqu\u00e9 ETCS hors tension, g\u00e9n\u00e9ralement en fin de mission lorsque le train est gar\u00e9 ou que la cabine est d\u00e9sactiv\u00e9e. Toutes les fonctions ETCS cessent.',
    conditions: [
      '\u00c9quipement embarqu\u00e9 ETCS mis hors tension par le conducteur',
    ],
  },

  // SB -> Operational modes
  'SB-FS': {
    description: 'D\u00e9but de mission avec MA complet',
    detailedDescription:
      'Apr\u00e8s que le conducteur a termin\u00e9 la saisie de donn\u00e9es en mode Stand By, le syst\u00e8me re\u00e7oit une autorisation de mouvement valide avec une description compl\u00e8te de la voie (profil de vitesse, gradient). C\u2019est le d\u00e9but de mission id\u00e9al : le train passe directement en Full Supervision avec toutes les donn\u00e9es de s\u00e9curit\u00e9 disponibles.',
    conditions: [
      'Saisie des donn\u00e9es conducteur termin\u00e9e (identifiant conducteur, donn\u00e9es du train)',
      'Autorisation de mouvement (MA) valide re\u00e7ue',
      'Description compl\u00e8te de la voie disponible',
      'Niveau ETCS d\u00e9termin\u00e9 (Niveau 1, 2 ou 3)',
    ],
  },
  'SB-SR': {
    description: 'D\u00e9but de mission sans MA',
    detailedDescription:
      'Lorsque le conducteur a termin\u00e9 la saisie de donn\u00e9es mais qu\u2019aucune autorisation de mouvement ne peut \u00eatre obtenue (par ex. pas de contact RBC, pas de donn\u00e9es de balise), le conducteur peut demander \u00e0 d\u00e9marrer la mission en mode Staff Responsible. Le conducteur doit acquitter le mode sur le DMI et assume la responsabilit\u00e9 du mouvement s\u00fbr sous autorit\u00e9 du r\u00e9gulateur.',
    conditions: [
      'Saisie des donn\u00e9es conducteur termin\u00e9e',
      'Aucun MA valide disponible',
      'Le conducteur acquitte le mode SR sur le DMI',
    ],
  },
  'SB-SH': {
    description: 'Demande de Shunting depuis Stand By',
    detailedDescription:
      'Le conducteur demande l\u2019entr\u00e9e en mode Shunting pour les mouvements en faisceau, ou un ordre de manoeuvre est re\u00e7u du sol (par ex. via balise). Le syst\u00e8me passe en mode SH pour les op\u00e9rations de triage \u00e0 basse vitesse. La saisie compl\u00e8te des donn\u00e9es du train peut ne pas \u00eatre requise pour la manoeuvre.',
    conditions: [
      'Demande de manoeuvre du conducteur ou ordre du sol',
      'Le conducteur acquitte le mode manoeuvre',
    ],
  },
  'SB-SL': {
    description: 'Entr\u00e9e en Sleeping comme unit\u00e9 non menante',
    detailedDescription:
      'Lorsque le syst\u00e8me d\u00e9termine que cette unit\u00e9 embarqu\u00e9e n\u2019est pas l\u2019unit\u00e9 menante (par ex. cabine arri\u00e8re d\u2019un train r\u00e9versible, ou unit\u00e9 remorqu\u00e9e haut-le-pied), il passe en mode Sleeping. L\u2019ETCS reste sous tension mais ne supervise pas activement.',
    conditions: [
      'Cette cabine/unit\u00e9 n\u2019est pas l\u2019unit\u00e9 menante',
      'Une autre unit\u00e9 embarqu\u00e9e ETCS est active comme menante',
    ],
  },
  'SB-NL': {
    description: 'Entr\u00e9e en mode Non Leading',
    detailedDescription:
      'Le conducteur indique que cette locomotive n\u2019est pas l\u2019unit\u00e9 de traction menante de la rame (par ex. locomotive arri\u00e8re en double traction). L\u2019ETCS entre en mode Non Leading, restant actif mais sans \u00e9mettre de commandes de frein ni d\u00e9tenir de MA.',
    conditions: [
      'Le conducteur s\u00e9lectionne Non Leading',
      'L\u2019unit\u00e9 n\u2019est pas l\u2019unit\u00e9 de traction menante de la rame',
    ],
  },

  // SR -> Other modes
  'SR-FS': {
    description: 'MA re\u00e7u en mode Staff Responsible',
    detailedDescription:
      'En circulant en mode Staff Responsible, le train passe un groupe de balises ou re\u00e7oit un message RBC contenant une autorisation de mouvement valide avec une description compl\u00e8te de la voie. Le syst\u00e8me passe automatiquement en Full Supervision, offrant la protection ETCS compl\u00e8te.',
    conditions: [
      'Autorisation de mouvement (MA) valide re\u00e7ue',
      'Description compl\u00e8te de la voie disponible',
    ],
  },
  'SR-OS': {
    description: 'Profil de mode OS re\u00e7u',
    detailedDescription:
      'En mode Staff Responsible, le train re\u00e7oit un profil de mode On Sight depuis le sol (via balise ou RBC). Cela indique que la section \u00e0 venir peut \u00eatre occup\u00e9e et que le conducteur doit proc\u00e9der \u00e0 vue. Le syst\u00e8me passe en mode OS avec sa vitesse r\u00e9duite.',
    conditions: [
      'Profil de mode On Sight re\u00e7u du sol',
      'MA valide avec zone OS d\u00e9finie',
    ],
  },
  'SR-TR': {
    description: 'Trip en mode Staff Responsible',
    detailedDescription:
      'En circulant en mode SR, le train passe un groupe de balises commandant un Trip (par ex. prot\u00e9geant un point dangereux). L\u2019ETCS applique imm\u00e9diatement le frein d\u2019urgence. Cela peut se produire si l\u2019autorisation verbale du r\u00e9gulateur n\u2019a pas pris en compte toutes les protections sol ou si les conditions ont chang\u00e9.',
    conditions: [
      'Le train passe un groupe de balises commandant un Trip',
    ],
  },
  'SR-SH': {
    description: 'Shunting depuis Staff Responsible',
    detailedDescription:
      'En mode Staff Responsible, le conducteur demande la manoeuvre ou un ordre de manoeuvre est re\u00e7u du sol. Le train passe en mode Shunting pour les mouvements \u00e0 basse vitesse en faisceau.',
    conditions: [
      'Demande de manoeuvre du conducteur ou ordre du sol',
    ],
  },

  // FS -> Other modes
  'FS-OS': {
    description: 'Entr\u00e9e dans une zone On Sight',
    detailedDescription:
      'En Full Supervision, le sol envoie un profil de mode On Sight pour une section \u00e0 venir (par ex. une zone o\u00f9 la d\u00e9tection de voie est en panne). Lorsque le train entre dans cette zone, le mode passe \u00e0 OS et la vitesse est r\u00e9duite. Le MA reste valide.',
    conditions: [
      'Profil de mode On Sight re\u00e7u du sol',
      'Le train entre dans la zone du profil de mode OS',
    ],
  },
  'FS-LS': {
    description: 'Entr\u00e9e dans une zone Limited Supervision',
    detailedDescription:
      'Le sol indique que la section \u00e0 venir ne peut fournir qu\u2019une Limited Supervision (description de voie incompl\u00e8te). Lorsque le train entre dans cette zone, il passe de FS \u00e0 LS. Le MA reste valide mais certains param\u00e8tres de supervision utilisent des valeurs nationales par d\u00e9faut.',
    conditions: [
      'Profil de mode Limited Supervision re\u00e7u du sol',
      'Le train entre dans la zone du profil de mode LS',
    ],
  },
  'FS-SR': {
    description: 'Perte des conditions du MA, repli vers SR',
    detailedDescription:
      'Si les conditions de Full Supervision ne peuvent plus \u00eatre maintenues (par ex. description de voie devenant incompl\u00e8te, probl\u00e8mes de communication ne justifiant pas un Trip), le syst\u00e8me peut passer en mode Staff Responsible comme mode d\u00e9grad\u00e9 mais encore op\u00e9rationnel. Le conducteur doit acquitter le changement.',
    conditions: [
      'Les conditions du MA ne peuvent plus \u00eatre maintenues',
      'Des conditions s\u00fbres existent pour SR (pas une situation de d\u00e9clenchement)',
      'Le conducteur acquitte le mode SR',
    ],
  },
  'FS-TR': {
    description: 'D\u00e9passement de l\u2019EOA d\u00e9clenchant un freinage d\u2019urgence',
    detailedDescription:
      'La transition de s\u00e9curit\u00e9 la plus critique. Si le train d\u00e9passe la fin d\u2019autorisation (EOA) \u2014 c\u2019est-\u00e0-dire qu\u2019il est all\u00e9 au-del\u00e0 du point au-del\u00e0 duquel le mouvement s\u00fbr n\u2019est plus garanti \u2014 l\u2019ETCS commande imm\u00e9diatement le freinage d\u2019urgence. C\u2019est la fonction de s\u00e9curit\u00e9 fondamentale de l\u2019ETCS : emp\u00eacher les trains d\u2019entrer sur une voie non prot\u00e9g\u00e9e.',
    conditions: [
      'Le train d\u00e9passe la fin d\u2019autorisation (EOA)',
    ],
  },
  'FS-SH': {
    description: 'Ordre de Shunting en Full Supervision',
    detailedDescription:
      'Un ordre de manoeuvre est re\u00e7u du sol (g\u00e9n\u00e9ralement \u00e0 l\u2019entr\u00e9e d\u2019un faisceau ou en gorge de gare). Le train passe en mode Shunting, lib\u00e9rant le MA et passant aux r\u00e8gles de mouvement \u00e0 basse vitesse en faisceau.',
    conditions: [
      'Ordre de manoeuvre re\u00e7u du sol',
      'Le conducteur acquitte la manoeuvre',
    ],
  },
  'FS-UN': {
    description: 'Entr\u00e9e dans une zone non \u00e9quip\u00e9e',
    detailedDescription:
      'Le train passe d\u2019une zone \u00e9quip\u00e9e ETCS \u00e0 une section sans \u00e9quipement sol ETCS (Niveau 0). Le MA est lib\u00e9r\u00e9 et le syst\u00e8me ne fournit qu\u2019une supervision de vitesse plafond de base. Le conducteur doit suivre les r\u00e8gles de signalisation nationales.',
    conditions: [
      'Le train entre dans une zone sans \u00e9quipement sol ETCS (Niveau 0)',
      'Transition de niveau vers le Niveau 0 ex\u00e9cut\u00e9e',
    ],
  },
  'FS-SN': {
    description: 'Entr\u00e9e dans une zone de syst\u00e8me national',
    detailedDescription:
      'Le train passe de Full Supervision ETCS \u00e0 une zone prot\u00e9g\u00e9e par un syst\u00e8me national de protection des trains. L\u2019ETCS c\u00e8de la supervision au STM (Module de Transmission Sp\u00e9cifique) pour le syst\u00e8me national concern\u00e9 (par ex. PZB, KVB, ASFA). C\u2019est une transition planifi\u00e9e \u00e0 la fronti\u00e8re de la couverture ETCS et du syst\u00e8me national.',
    conditions: [
      'Profil de mode du syst\u00e8me national re\u00e7u du sol',
      'STM disponible et compatible avec le syst\u00e8me national',
      'Transition de niveau vers NTC ex\u00e9cut\u00e9e',
    ],
  },
  'FS-RV': {
    description: 'Mouvement autoris\u00e9 en marche arri\u00e8re',
    detailedDescription:
      'Le conducteur est autoris\u00e9 \u00e0 effectuer un mouvement en marche arri\u00e8re (par ex. reculer jusqu\u2019\u00e0 un quai). Le sol a fourni les informations de zone de marche arri\u00e8re d\u00e9finissant la vitesse et la distance autoris\u00e9es. Le conducteur arr\u00eate le train, s\u00e9lectionne la marche arri\u00e8re, et le syst\u00e8me entre en mode RV avec marche arri\u00e8re supervis\u00e9e.',
    conditions: [
      'Informations de zone de marche arri\u00e8re re\u00e7ues du sol',
      'Le conducteur s\u00e9lectionne la direction inverse',
      'Train \u00e0 l\u2019arr\u00eat',
    ],
  },

  // OS -> Other modes
  'OS-FS': {
    description: 'Sortie de la zone On Sight, reprise de Full Supervision',
    detailedDescription:
      'Le train a travers\u00e9 la zone On Sight (par ex. la section avec d\u00e9tection de voie en panne) et le profil de mode FS reprend. Le syst\u00e8me revient en Full Supervision avec une supervision de vitesse et une protection compl\u00e8tes.',
    conditions: [
      'Fin de la zone du profil de mode On Sight atteinte',
      'Conditions de Full Supervision remplies (MA et description de voie)',
    ],
  },
  'OS-SR': {
    description: 'Perte des conditions OS, repli vers SR',
    detailedDescription:
      'Si les conditions du mode On Sight ne peuvent plus \u00eatre maintenues (par ex. MA expir\u00e9 ou communication perdue), le syst\u00e8me se replie en mode Staff Responsible. Le conducteur doit acquitter et prendre la responsabilit\u00e9 du mouvement s\u00fbr.',
    conditions: [
      'Les conditions du mode OS ne peuvent plus \u00eatre maintenues',
      'Le conducteur acquitte le mode SR',
    ],
  },
  'OS-TR': {
    description: 'D\u00e9passement de l\u2019EOA en mode On Sight',
    detailedDescription:
      'M\u00eame en mode On Sight, l\u2019ETCS supervise l\u2019autorisation de mouvement. Si le train d\u00e9passe l\u2019EOA, le frein d\u2019urgence est appliqu\u00e9 et le syst\u00e8me entre en mode Trip.',
    conditions: [
      'Le train d\u00e9passe la fin d\u2019autorisation (EOA)',
    ],
  },

  // LS -> Other modes
  'LS-FS': {
    description: 'Donn\u00e9es de voie compl\u00e8tes disponibles, passage en FS',
    detailedDescription:
      'Le train entre dans une zone o\u00f9 le sol fournit des donn\u00e9es de description de voie compl\u00e8tes. Le syst\u00e8me passe de Limited Supervision \u00e0 Full Supervision, utilisant d\u00e9sormais des donn\u00e9es pr\u00e9cises de gradient et de restrictions de vitesse au lieu de valeurs nationales par d\u00e9faut.',
    conditions: [
      'Profil de mode Full Supervision re\u00e7u du sol',
      'Description compl\u00e8te de la voie d\u00e9sormais disponible',
    ],
  },
  'LS-TR': {
    description: 'D\u00e9passement de l\u2019EOA en Limited Supervision',
    detailedDescription:
      'M\u00eame en Limited Supervision, l\u2019EOA est supervis\u00e9e. Si le train d\u00e9passe son autorisation, le frein d\u2019urgence est appliqu\u00e9 et le syst\u00e8me entre en mode Trip.',
    conditions: [
      'Le train d\u00e9passe la fin d\u2019autorisation (EOA)',
    ],
  },

  // UN -> Other modes
  'UN-FS': {
    description: 'Entr\u00e9e dans une zone \u00e9quip\u00e9e depuis le non \u00e9quip\u00e9',
    detailedDescription:
      'Le train passe d\u2019une zone Unfitted (Niveau 0) \u00e0 une zone \u00e9quip\u00e9e ETCS. Une transition de niveau est ex\u00e9cut\u00e9e et le syst\u00e8me re\u00e7oit un MA valide avec description de voie, permettant Full Supervision.',
    conditions: [
      'Le train entre dans une zone \u00e9quip\u00e9e ETCS',
      'Transition de niveau du Niveau 0 au Niveau 1/2/3',
      'MA valide et description de voie re\u00e7us',
    ],
  },
  'UN-SR': {
    description: 'Entr\u00e9e dans une zone ETCS sans MA',
    detailedDescription:
      'Le train entre dans une zone \u00e9quip\u00e9e ETCS depuis une zone Unfitted, mais aucune autorisation de mouvement n\u2019est imm\u00e9diatement disponible. Le syst\u00e8me passe en mode Staff Responsible comme repli s\u00fbr jusqu\u2019\u00e0 l\u2019obtention d\u2019un MA.',
    conditions: [
      'Transition de niveau vers un niveau ETCS mais aucun MA disponible',
      'Le conducteur acquitte le mode SR',
    ],
  },

  // SN -> Other modes
  'SN-FS': {
    description: 'Transition du syst\u00e8me national vers l\u2019ETCS',
    detailedDescription:
      'Le train passe d\u2019une zone de syst\u00e8me national \u00e0 une zone \u00e9quip\u00e9e ETCS. Le STM c\u00e8de la supervision \u00e0 l\u2019unit\u00e9 embarqu\u00e9e ETCS, une transition de niveau est ex\u00e9cut\u00e9e et le syst\u00e8me re\u00e7oit un MA pour entrer en Full Supervision. C\u2019est la transition transfrontali\u00e8re standard.',
    conditions: [
      'Le train entre dans une zone \u00e9quip\u00e9e ETCS',
      'Transition de niveau de NTC au Niveau 1/2/3',
      'MA valide et description de voie re\u00e7us',
      'Le STM c\u00e8de le contr\u00f4le \u00e0 l\u2019ETCS',
    ],
  },
  'SN-SR': {
    description: 'Du national vers l\u2019ETCS sans MA',
    detailedDescription:
      'Le train passe d\u2019un syst\u00e8me national \u00e0 une zone ETCS, mais aucune autorisation de mouvement n\u2019est disponible depuis le sol ETCS. Le syst\u00e8me entre en mode Staff Responsible comme solution de repli. Le conducteur doit suivre les instructions du r\u00e9gulateur jusqu\u2019\u00e0 l\u2019obtention d\u2019un MA.',
    conditions: [
      'Transition de niveau de NTC au niveau ETCS',
      'Aucun MA disponible depuis le sol ETCS',
      'Le conducteur acquitte le mode SR',
    ],
  },

  // TR -> PT
  'TR-PT': {
    description: 'Train arr\u00eat\u00e9 apr\u00e8s le Trip, acquittement du conducteur',
    detailedDescription:
      'Apr\u00e8s l\u2019application du frein d\u2019urgence en mode Trip, le train d\u00e9c\u00e9l\u00e8re jusqu\u2019\u00e0 l\u2019arr\u00eat complet. Le conducteur doit alors acquitter le Trip sur le DMI. Une fois acquitt\u00e9 \u00e0 l\u2019arr\u00eat, le syst\u00e8me passe en mode Post Trip, o\u00f9 les proc\u00e9dures de r\u00e9tablissement peuvent commencer.',
    conditions: [
      'Le train est compl\u00e8tement arr\u00eat\u00e9',
      'Le conducteur acquitte le Trip sur le DMI',
    ],
  },

  // PT -> Other modes
  'PT-SR': {
    description: 'Reprise du mouvement en Staff Responsible apr\u00e8s Trip',
    detailedDescription:
      'Apr\u00e8s un Trip, la proc\u00e9dure de r\u00e9tablissement la plus courante est que le conducteur contacte le r\u00e9gulateur, explique la situation et re\u00e7oit une autorisation verbale pour continuer. Le conducteur demande alors le mode SR sur le DMI et l\u2019acquitte, permettant au train de se d\u00e9placer sous autorit\u00e9 du r\u00e9gulateur \u00e0 vitesse r\u00e9duite.',
    conditions: [
      'Le conducteur contacte le r\u00e9gulateur et re\u00e7oit l\u2019autorisation',
      'Le conducteur demande le mode SR sur le DMI',
      'Le conducteur acquitte le mode SR',
    ],
  },
  'PT-SH': {
    description: 'Shunting apr\u00e8s Trip',
    detailedDescription:
      'Apr\u00e8s un \u00e9v\u00e9nement de Trip, le r\u00e9gulateur peut demander au conducteur d\u2019effectuer un mouvement de manoeuvre plut\u00f4t que de reprendre le trajet principal (par ex. pour lib\u00e9rer un itin\u00e9raire conflictuel ou se garer sur une voie de garage). Le train passe en mode Shunting pour les mouvements \u00e0 basse vitesse en faisceau.',
    conditions: [
      'Demande ou ordre de manoeuvre apr\u00e8s Trip',
      'Le conducteur contacte le r\u00e9gulateur et re\u00e7oit l\u2019autorisation de manoeuvre',
    ],
  },

  // SH -> Other modes
  'SH-SB': {
    description: 'Fin de Shunting, retour en Stand By',
    detailedDescription:
      'Lorsque les op\u00e9rations de manoeuvre sont termin\u00e9es, le conducteur d\u00e9s\u00e9lectionne le mode Shunting. Le syst\u00e8me revient en mode Stand By, o\u00f9 le conducteur peut saisir/valider les donn\u00e9es du train et pr\u00e9parer la prochaine mission ou le prochain mouvement.',
    conditions: [
      'Fin de manoeuvre (le conducteur quitte la manoeuvre ou le train s\u2019arr\u00eate)',
      'Le conducteur d\u00e9s\u00e9lectionne le mode manoeuvre',
    ],
  },
  'SH-FS': {
    description: 'De la manoeuvre au mouvement en ligne',
    detailedDescription:
      'Pendant les op\u00e9rations de Shunting, le train re\u00e7oit une autorisation de mouvement valide pour le mouvement en ligne (par ex. apr\u00e8s assemblage et d\u00e9part du faisceau). Le syst\u00e8me passe en Full Supervision pour le trajet en ligne.',
    conditions: [
      'MA valide re\u00e7u pour le mouvement en ligne',
      'Description compl\u00e8te de la voie disponible',
      'Transition de la manoeuvre au mouvement en ligne autoris\u00e9e',
    ],
  },

  // NL -> SB
  'NL-SB': {
    description: 'L\u2019unit\u00e9 non menante devient menante',
    detailedDescription:
      'La locomotive ou cabine Non Leading devient l\u2019unit\u00e9 menante (par ex. apr\u00e8s un changement de conducteur en gare terminus, ou lors du d\u00e9couplage de la rame). Le conducteur active cette cabine et l\u2019ETCS passe en mode Stand By pour un nouveau d\u00e9but de mission.',
    conditions: [
      'Cette unit\u00e9 devient l\u2019unit\u00e9 menante',
      'Le conducteur active cette cabine pour la conduite',
    ],
  },

  // SL -> SB
  'SL-SB': {
    description: 'L\u2019unit\u00e9 en Sleeping se r\u00e9veille comme menante',
    detailedDescription:
      'L\u2019unit\u00e9 embarqu\u00e9e ETCS en Sleeping devient active lorsque cette cabine est d\u00e9sign\u00e9e comme cabine menante (par ex. inversion de sens en gare terminus en exploitation r\u00e9versible). Le conducteur active le pupitre et le syst\u00e8me entre en mode Stand By pour la validation des donn\u00e9es et le d\u00e9but de mission.',
    conditions: [
      'Cette cabine/unit\u00e9 devient l\u2019unit\u00e9 menante active',
      'Pupitre de conduite activ\u00e9',
    ],
  },

  // RV -> Other modes
  'RV-FS': {
    description: 'Fin de la marche arri\u00e8re, reprise en FS vers l\u2019avant',
    detailedDescription:
      'Apr\u00e8s que le mouvement en Reversing est termin\u00e9 (par ex. le train a recul\u00e9 jusqu\u2019au quai), le conducteur s\u00e9lectionne la direction avant. Si un MA valide est disponible pour le mouvement vers l\u2019avant, le syst\u00e8me passe en Full Supervision.',
    conditions: [
      'Mouvement en marche arri\u00e8re termin\u00e9',
      'Le conducteur s\u00e9lectionne la direction avant',
      'MA valide pour le mouvement vers l\u2019avant disponible',
    ],
  },
  'RV-PT': {
    description: 'Marche arri\u00e8re termin\u00e9e ou limite atteinte',
    detailedDescription:
      'Si la distance autoris\u00e9e en marche arri\u00e8re est atteinte, ou si le mouvement est annul\u00e9, et que le train est \u00e0 l\u2019arr\u00eat, le syst\u00e8me passe en Post Trip. Le conducteur doit alors suivre les proc\u00e9dures de r\u00e9tablissement pour reprendre le fonctionnement normal.',
    conditions: [
      'Distance de marche arri\u00e8re d\u00e9pass\u00e9e ou marche arri\u00e8re annul\u00e9e',
      'Train \u00e0 l\u2019arr\u00eat',
    ],
  },

  // Additional common operational transitions
  'FS-FS-MA-UPDATE': {
    description: 'Extension/mise \u00e0 jour du MA en Full Supervision',
    detailedDescription:
      'En Full Supervision, le sol prolonge ou met \u00e0 jour l\u2019autorisation de mouvement (par ex. le signal suivant s\u2019ouvre, le RBC envoie une extension de MA). C\u2019est le fonctionnement continu normal en mode FS, maintenant la circulation du train avec une autorit\u00e9 mise \u00e0 jour.',
    conditions: [
      'MA nouveau ou \u00e9tendu re\u00e7u du sol',
      'Description de voie mise \u00e0 jour re\u00e7ue',
    ],
  },
  'SB-UN': {
    description: 'D\u00e9but de mission en zone non \u00e9quip\u00e9e',
    detailedDescription:
      'Lors du d\u00e9marrage d\u2019une mission dans une zone sans \u00e9quipement sol ETCS (Niveau 0), le syst\u00e8me passe en mode Unfitted apr\u00e8s la saisie de donn\u00e9es. Seule une supervision de vitesse plafond de base est fournie.',
    conditions: [
      'Niveau ETCS d\u00e9termin\u00e9 comme Niveau 0',
      'Aucun \u00e9quipement sol ETCS dans la zone',
      'Saisie des donn\u00e9es conducteur termin\u00e9e',
    ],
  },
  'SB-SN': {
    description: 'D\u00e9but de mission en zone de syst\u00e8me national',
    detailedDescription:
      'Lors du d\u00e9marrage d\u2019une mission dans une zone prot\u00e9g\u00e9e par un syst\u00e8me national de protection des trains, l\u2019ETCS d\u00e9termine le niveau comme NTC et active le STM appropri\u00e9. La supervision est c\u00e9d\u00e9e au syst\u00e8me national.',
    conditions: [
      'Niveau ETCS d\u00e9termin\u00e9 comme NTC',
      'STM disponible et connect\u00e9',
      '\u00c9quipement sol du syst\u00e8me national d\u00e9tect\u00e9',
    ],
  },
  'OS-SH': {
    description: 'Ordre de Shunting en mode On Sight',
    detailedDescription:
      'En mode On Sight, un ordre de manoeuvre est re\u00e7u (par ex. \u00e0 l\u2019arriv\u00e9e dans un faisceau). Le syst\u00e8me passe en mode Shunting pour les mouvements \u00e0 basse vitesse en faisceau.',
    conditions: [
      'Ordre de manoeuvre re\u00e7u du sol',
      'Le conducteur acquitte la manoeuvre',
    ],
  },
  'LS-SR': {
    description: 'Perte des conditions du MA en Limited Supervision',
    detailedDescription:
      'Si les conditions de l\u2019autorisation de mouvement sont perdues en Limited Supervision (par ex. panne de communication, incoh\u00e9rence de donn\u00e9es), le syst\u00e8me se replie en mode Staff Responsible. Le conducteur doit acquitter et prendre la responsabilit\u00e9.',
    conditions: [
      'Les conditions du MA ne peuvent plus \u00eatre maintenues',
      'Le conducteur acquitte le mode SR',
    ],
  },
  'LS-OS': {
    description: 'Entr\u00e9e dans une zone On Sight depuis Limited Supervision',
    detailedDescription:
      'En Limited Supervision, le train entre dans une zone avec un profil de mode On Sight. Le syst\u00e8me passe en mode OS pour la section \u00e0 vitesse r\u00e9duite.',
    conditions: [
      'Profil de mode On Sight re\u00e7u du sol',
      'Le train entre dans la zone du profil de mode OS',
    ],
  },
  'UN-SN': {
    description: 'Syst\u00e8me national d\u00e9tect\u00e9 depuis le non \u00e9quip\u00e9',
    detailedDescription:
      'En mode Unfitted (Niveau 0), le train entre dans une zone avec un syst\u00e8me national de protection des trains. Le STM est activ\u00e9 et la supervision est c\u00e9d\u00e9e au syst\u00e8me national.',
    conditions: [
      '\u00c9quipement sol du syst\u00e8me national de protection des trains d\u00e9tect\u00e9',
      'STM disponible et compatible',
      'Transition de niveau vers NTC',
    ],
  },
  'SN-UN': {
    description: 'Sortie de la zone du syst\u00e8me national vers le non \u00e9quip\u00e9',
    detailedDescription:
      'Le train quitte la zone prot\u00e9g\u00e9e par le syst\u00e8me national et entre dans une section non \u00e9quip\u00e9e (Niveau 0). Le STM est d\u00e9sactiv\u00e9 et le syst\u00e8me ne fournit qu\u2019une supervision de vitesse plafond de base.',
    conditions: [
      'Fin de la zone du syst\u00e8me national',
      'Aucun \u00e9quipement sol ETCS pr\u00e9sent',
      'Transition de niveau de NTC au Niveau 0',
    ],
  },

  // End of Mission -> SB
  'FS-SB': {
    description: 'Fin de mission depuis Full Supervision',
    detailedDescription:
      'Lorsque le train atteint sa destination et s\u2019arr\u00eate compl\u00e8tement, le conducteur effectue la proc\u00e9dure de fin de mission (par ex. fermeture du pupitre ou confirmation de fin de mission sur le DMI). L\u2019autorisation de mouvement est lib\u00e9r\u00e9e et le syst\u00e8me revient en mode Stand By, pr\u00eat pour une nouvelle mission ou la mise hors tension.',
    conditions: [
      'Train \u00e0 l\u2019arr\u00eat',
      'Proc\u00e9dure de fin de mission effectu\u00e9e par le conducteur',
    ],
  },
  'SR-SB': {
    description: 'Fin de mission depuis Staff Responsible',
    detailedDescription:
      'En mode Staff Responsible, le conducteur peut terminer la mission lorsque le train est \u00e0 l\u2019arr\u00eat (par ex. arriv\u00e9e \u00e0 destination sans jamais avoir re\u00e7u de MA). Le syst\u00e8me revient en mode Stand By.',
    conditions: [
      'Train \u00e0 l\u2019arr\u00eat',
      'Proc\u00e9dure de fin de mission effectu\u00e9e par le conducteur',
    ],
  },
  'OS-SB': {
    description: 'Fin de mission depuis On Sight',
    detailedDescription:
      'Le conducteur termine la mission en mode On Sight avec le train \u00e0 l\u2019arr\u00eat. Le syst\u00e8me revient en mode Stand By.',
    conditions: [
      'Train \u00e0 l\u2019arr\u00eat',
      'Proc\u00e9dure de fin de mission effectu\u00e9e par le conducteur',
    ],
  },
  'LS-SB': {
    description: 'Fin de mission depuis Limited Supervision',
    detailedDescription:
      'Le conducteur termine la mission en mode Limited Supervision avec le train \u00e0 l\u2019arr\u00eat. Le syst\u00e8me revient en mode Stand By.',
    conditions: [
      'Train \u00e0 l\u2019arr\u00eat',
      'Proc\u00e9dure de fin de mission effectu\u00e9e par le conducteur',
    ],
  },
  'UN-SB': {
    description: 'Fin de mission depuis Unfitted',
    detailedDescription:
      'Le conducteur termine la mission en mode Unfitted (zone Niveau 0) avec le train \u00e0 l\u2019arr\u00eat. Le syst\u00e8me revient en mode Stand By.',
    conditions: [
      'Train \u00e0 l\u2019arr\u00eat',
      'Proc\u00e9dure de fin de mission effectu\u00e9e par le conducteur',
    ],
  },
  'SN-SB': {
    description: 'Fin de mission depuis STM National',
    detailedDescription:
      'Le conducteur termine la mission en mode STM National avec le train \u00e0 l\u2019arr\u00eat. La session STM est ferm\u00e9e et le syst\u00e8me revient en mode Stand By.',
    conditions: [
      'Train \u00e0 l\u2019arr\u00eat',
      'Proc\u00e9dure de fin de mission effectu\u00e9e par le conducteur',
      'Session STM ferm\u00e9e',
    ],
  },
  'PT-SB': {
    description: 'Fin de mission depuis Post Trip',
    detailedDescription:
      'Apr\u00e8s un \u00e9v\u00e9nement de Trip et l\u2019acquittement, le conducteur peut choisir de terminer la mission au lieu de r\u00e9tablir le fonctionnement. Le syst\u00e8me revient en mode Stand By pour un nouveau d\u00e9but de mission.',
    conditions: [
      'Train \u00e0 l\u2019arr\u00eat',
      'Proc\u00e9dure de fin de mission effectu\u00e9e par le conducteur',
    ],
  },

  // Universal transitions
  'ANY-SF': {
    description: 'System Failure depuis tout mode',
    detailedDescription:
      'Depuis tout mode ETCS actif, si l\u2019\u00e9quipement embarqu\u00e9 d\u00e9tecte une d\u00e9faillance interne critique de s\u00e9curit\u00e9 (mat\u00e9riel, logiciel ou int\u00e9grit\u00e9 des donn\u00e9es), il passe imm\u00e9diatement en mode System Failure. Le frein d\u2019urgence est appliqu\u00e9 et le conducteur doit suivre les r\u00e8gles nationales. Cette transition peut survenir depuis tout mode.',
    conditions: [
      'D\u00e9faillance embarqu\u00e9e critique de s\u00e9curit\u00e9 d\u00e9tect\u00e9e',
    ],
  },
  'ANY-IS': {
    description: 'ETCS isol\u00e9 par le conducteur depuis tout mode',
    detailedDescription:
      'Depuis tout mode, le conducteur peut actionner l\u2019interrupteur physique d\u2019isolation ETCS pour d\u00e9sactiver compl\u00e8tement l\u2019\u00e9quipement embarqu\u00e9 ETCS. C\u2019est une action d\u00e9lib\u00e9r\u00e9e utilis\u00e9e lorsque l\u2019ETCS est d\u00e9fectueux et doit \u00eatre mis hors service. Toutes les fonctions ETCS cessent imm\u00e9diatement.',
    conditions: [
      'Le conducteur actionne l\u2019interrupteur physique d\u2019isolation ETCS',
    ],
  },
  'ANY-NP': {
    description: 'Perte d\u2019alimentation depuis tout mode',
    detailedDescription:
      'Depuis tout mode, si l\u2019\u00e9quipement embarqu\u00e9 ETCS perd son alimentation \u00e9lectrique (d\u00e9sactivation de la cabine, panne d\u2019alimentation, coupure de l\u2019interrupteur principal), le syst\u00e8me passe en mode No Power. Toutes les fonctions ETCS cessent. Cela peut \u00eatre une action d\u00e9lib\u00e9r\u00e9e (fin de mission) ou un \u00e9v\u00e9nement impr\u00e9vu (panne d\u2019alimentation).',
    conditions: [
      'L\u2019\u00e9quipement embarqu\u00e9 ETCS perd son alimentation',
    ],
  },

  // SF recovery
  'SF-NP': {
    description: 'Cycle de mise hors/sous tension apr\u00e8s System Failure',
    detailedDescription:
      'Apr\u00e8s un System Failure, la proc\u00e9dure de r\u00e9tablissement standard consiste \u00e0 mettre l\u2019\u00e9quipement embarqu\u00e9 ETCS hors tension (transition vers NP) puis \u00e0 le remettre sous tension (NP vers SB). Si la panne \u00e9tait transitoire, le syst\u00e8me peut d\u00e9marrer normalement. Si la panne persiste, l\u2019Isolation peut \u00eatre n\u00e9cessaire.',
    conditions: [
      'Le conducteur met l\u2019ETCS hors tension pour tenter le r\u00e9tablissement',
    ],
  },

  // IS recovery
  'IS-NP': {
    description: 'Fin de l\u2019isolation, red\u00e9marrage du syst\u00e8me',
    detailedDescription:
      'Le conducteur remet l\u2019interrupteur d\u2019isolation en position normale. L\u2019ETCS transite par NP (s\u00e9quence de mise sous tension) puis vers SB apr\u00e8s l\u2019autotest. Cela restaure les fonctionnalit\u00e9s ETCS si la panne sous-jacente a \u00e9t\u00e9 r\u00e9solue.',
    conditions: [
      'Interrupteur d\u2019isolation remis en position normale',
    ],
  },

  // AD transitions
  'FS-AD': {
    description: 'Enclenchement de l\u2019ATO \u2014 Automatic Driving commence',
    detailedDescription:
      'Lorsque toutes les conditions d\u2019enclenchement de l\u2019ATO sont remplies et que le conducteur confirme l\u2019enclenchement sur le DMI ATO, l\u2019ETCS passe de Full Supervision \u00e0 Automatic Driving. L\u2019unit\u00e9 embarqu\u00e9e ATO prend le contr\u00f4le de la traction et du freinage tandis que l\u2019ETCS continue la supervision compl\u00e8te de s\u00e9curit\u00e9. L\u2019autorisation de mouvement, le profil de vitesse et les courbes de freinage restent appliqu\u00e9s. Cette transition est d\u00e9finie dans le Subset-125 (ATO SRS) et l\u2019interface Subset-130 ATO-OB/ETCS-OB.',
    conditions: [
      'L\u2019unit\u00e9 embarqu\u00e9e ATO est en \u00e9tat Ready for Engagement (RE)',
      'Le conducteur confirme l\u2019enclenchement ATO via le DMI (GoA 2)',
      'Profil de trajet valide re\u00e7u du sol ATO',
      'Train \u00e0 l\u2019arr\u00eat ou dans la fen\u00eatre de vitesse d\u2019enclenchement',
    ],
  },
  'AD-FS': {
    description: 'D\u00e9senclenchement de l\u2019ATO \u2014 retour \u00e0 la conduite manuelle sous FS',
    detailedDescription:
      'Lorsque le conducteur reprend le contr\u00f4le manuel (en appuyant sur le bouton de d\u00e9senclenchement ou en utilisant les commandes de traction/frein) ou lorsque l\u2019ATO termine son trajet, le syst\u00e8me passe de Automatic Driving \u00e0 Full Supervision. Le conducteur reprend le contr\u00f4le manuel avec une supervision continue de vitesse ETCS. C\u2019est la fin normale et contr\u00f4l\u00e9e du fonctionnement ATO.',
    conditions: [
      'Le conducteur d\u00e9sengage l\u2019ATO via le DMI ou par priorit\u00e9 traction/frein, ou',
      'Fin du Profil de trajet atteinte, ou',
      'L\u2019ATO effectue un d\u00e9senclenchement contr\u00f4l\u00e9',
    ],
  },
  'AD-TR': {
    description: 'Trip de s\u00e9curit\u00e9 pendant Automatic Driving',
    detailedDescription:
      'Si le syst\u00e8me ATO ou un \u00e9v\u00e9nement externe provoque l\u2019approche ou le d\u00e9passement de la fin d\u2019autorisation par le train, l\u2019ETCS d\u00e9clenche un freinage d\u2019urgence quel que soit l\u2019\u00e9tat de l\u2019ATO. Le frein d\u2019urgence est appliqu\u00e9 et l\u2019ATO est imm\u00e9diatement d\u00e9sengag\u00e9. Le syst\u00e8me entre en mode Trip. Le r\u00e9tablissement suit la s\u00e9quence standard TR\u2192PT\u2192SR\u2192FS.',
    conditions: [
      'Le train d\u00e9passe la fin d\u2019autorisation (EOA) ou l\u2019ATO viole l\u2019enveloppe de s\u00e9curit\u00e9',
    ],
  },
  'AD-SH': {
    description: 'Transition vers Shunting depuis Automatic Driving',
    detailedDescription:
      'Dans certains sc\u00e9narios op\u00e9rationnels, une transition de Automatic Driving \u00e0 Shunting peut \u00eatre n\u00e9cessaire (par ex. approche d\u2019un faisceau). L\u2019ATO est d\u00e9sengag\u00e9 et l\u2019ETCS passe en mode Shunting avec sa supervision r\u00e9duite.',
    conditions: [
      'Demande de manoeuvre acquitt\u00e9e pendant le fonctionnement ATO',
    ],
  },
};
