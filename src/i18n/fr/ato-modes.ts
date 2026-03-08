import type { ATOStateTranslation } from '../types';

export const frATOStates: Record<string, ATOStateTranslation> = {
  NP: {
    name: 'Hors tension',
    description: 'Le syst\u00e8me embarqu\u00e9 ATO est hors tension. Aucune fonctionnalit\u00e9 ATO n\u2019est disponible.',
    detailedDescription:
      'No Power est l\u2019\u00e9tat initial du syst\u00e8me embarqu\u00e9 ATO lorsque l\u2019\u00e9quipement ATO du train n\u2019est pas aliment\u00e9. Dans cet \u00e9tat, aucune fonction ATO n\u2019est ex\u00e9cut\u00e9e et le syst\u00e8me n\u2019a aucune connaissance de la position du train, du profil de trajet ou de l\u2019\u00e9tat ETCS. La transition hors de NP se produit lorsque le syst\u00e8me ATO re\u00e7oit l\u2019alimentation et commence sa s\u00e9quence de configuration.',
    keyCharacteristics: [
      'Syst\u00e8me ATO compl\u00e8tement inactif',
      'Aucune communication avec l\u2019unit\u00e9 embarqu\u00e9e ETCS',
      'Aucun profil de trajet charg\u00e9',
      'Aucune interface conducteur active',
      'Activ\u00e9 lors d\u2019une perte d\u2019alimentation ou d\u2019une commande d\u2019arr\u00eat',
    ],
    goaRelevance: 'Applicable \u00e0 tous les niveaux GoA (GoA 1\u20134)',
    etcsRequirement: 'Aucune \u2014 l\u2019ATO est ind\u00e9pendant de l\u2019ETCS dans cet \u00e9tat',
  },
  CO: {
    name: 'Configuration',
    description: 'Le syst\u00e8me ATO est en cours d\u2019initialisation : chargement de la configuration, r\u00e9alisation des autotests et \u00e9tablissement des interfaces de communication.',
    detailedDescription:
      'Pendant la Configuration, l\u2019unit\u00e9 embarqu\u00e9e ATO effectue les proc\u00e9dures de d\u00e9marrage, notamment les autotests mat\u00e9riels, le chargement des donn\u00e9es de configuration (param\u00e8tres du v\u00e9hicule, mod\u00e8les de freinage) et l\u2019\u00e9tablissement de l\u2019interface avec l\u2019unit\u00e9 embarqu\u00e9e ETCS via l\u2019interface Subset-130. Le syst\u00e8me tente \u00e9galement de se connecter au sol ATO via GSM-R ou FRMCS. Si la configuration \u00e9choue, le syst\u00e8me retourne en NP.',
    keyCharacteristics: [
      'Autotest mat\u00e9riel et logiciel en cours',
      'Donn\u00e9es de configuration du v\u00e9hicule charg\u00e9es',
      'Interface ETCS embarqu\u00e9e (Subset-130) initialis\u00e9e',
      'Liaison de communication sol en cours d\u2019\u00e9tablissement',
      'La saisie de donn\u00e9es conducteur peut \u00eatre requise',
    ],
    goaRelevance: 'Applicable \u00e0 tous les niveaux GoA (GoA 1\u20134)',
    etcsRequirement: 'L\u2019unit\u00e9 embarqu\u00e9e ETCS doit \u00eatre sous tension et accessible pour la mise en place de l\u2019interface',
  },
  NA: {
    name: 'Non disponible',
    description: 'L\u2019ATO est configur\u00e9 mais ne peut pas \u00eatre enclench\u00e9. Les conditions essentielles pour le fonctionnement ATO ne sont pas remplies.',
    detailedDescription:
      'Not Available indique que le syst\u00e8me ATO a termin\u00e9 la configuration mais qu\u2019une ou plusieurs pr\u00e9conditions pour la conduite automatique sont manquantes. Raisons typiques : l\u2019ETCS n\u2019est pas en mode Full Supervision (FS), aucun Profil de trajet valide n\u2019a \u00e9t\u00e9 re\u00e7u du sol ATO, ou une inhibition li\u00e9e \u00e0 la s\u00e9curit\u00e9 est active. Le syst\u00e8me surveille en permanence les conditions et passe \u00e0 Available (AV) lorsque toutes les exigences sont remplies.',
    keyCharacteristics: [
      'ATO configur\u00e9 et surveillant les conditions',
      'Le mode ETCS n\u2019est pas Full Supervision, ou',
      'Aucun Profil de trajet valide re\u00e7u, ou',
      'Inhibition de s\u00e9curit\u00e9 active (par ex. d\u00e9faut de frein)',
      'Le conducteur est inform\u00e9 via le DMI ATO',
    ],
    goaRelevance: 'Applicable \u00e0 tous les niveaux GoA (GoA 1\u20134)',
    etcsRequirement: 'L\u2019ETCS doit \u00eatre op\u00e9rationnel ; l\u2019ATO attend le mode Full Supervision (FS)',
  },
  AV: {
    name: 'Disponible',
    description: 'Toutes les conditions pour l\u2019enclenchement ATO sont remplies. Le syst\u00e8me est pr\u00eat et attend que le conducteur s\u00e9lectionne l\u2019enclenchement ATO.',
    detailedDescription:
      'Dans l\u2019\u00e9tat Available, toutes les pr\u00e9conditions pour la conduite automatique sont remplies : l\u2019ETCS est en mode Full Supervision (FS), un Profil de trajet valide est charg\u00e9, le train est \u00e0 l\u2019arr\u00eat ou dans la fen\u00eatre de vitesse d\u2019enclenchement, et aucune inhibition n\u2019est active. Le conducteur est inform\u00e9 via le DMI ATO que l\u2019ATO peut \u00eatre enclench\u00e9. En GoA 2, le conducteur doit explicitement demander l\u2019enclenchement. Le syst\u00e8me surveille les conditions en permanence \u2014 si une condition est perdue, il revient \u00e0 NA.',
    keyCharacteristics: [
      'ETCS en mode Full Supervision (FS) confirm\u00e9',
      'Profil de trajet valide re\u00e7u et actif',
      'Aucune inhibition de s\u00e9curit\u00e9 pr\u00e9sente',
      'Le DMI ATO indique la disponibilit\u00e9 pour l\u2019enclenchement',
      'En attente de la commande d\u2019enclenchement du conducteur (GoA 2)',
    ],
    goaRelevance: 'GoA 1 : mode consultatif disponible ; GoA 2 : enclenchement semi-automatique possible ; GoA 3\u20134 : enclenchement automatique d\u00e9clench\u00e9',
    etcsRequirement: 'L\u2019ETCS doit \u00eatre en Full Supervision (FS) avec une autorisation de mouvement valide',
  },
  RE: {
    name: 'Pr\u00eat pour l\u2019enclenchement',
    description: 'Toutes les pr\u00e9conditions d\u2019enclenchement sont remplies. L\u2019ATO est pr\u00eat \u00e0 prendre le contr\u00f4le de la conduite \u2014 en attente de la confirmation finale du conducteur.',
    detailedDescription:
      'Ready for Engagement est atteint lorsque le syst\u00e8me ATO a v\u00e9rifi\u00e9 tous les pr\u00e9requis techniques et op\u00e9rationnels : mode ETCS FS actif, autorisation de mouvement valide, Profil de trajet charg\u00e9, portes ferm\u00e9es et verrouill\u00e9es, syst\u00e8me de freinage v\u00e9rifi\u00e9, et train \u00e0 l\u2019arr\u00eat (ou dans la vitesse autoris\u00e9e). Le conducteur confirme l\u2019enclenchement via le DMI ATO. \u00c0 la confirmation, le syst\u00e8me passe \u00e0 Engaged (EG) et commence la conduite automatique.',
    keyCharacteristics: [
      'Tous les pr\u00e9requis d\u2019enclenchement v\u00e9rifi\u00e9s',
      'Portes confirm\u00e9es ferm\u00e9es et verrouill\u00e9es',
      'Train \u00e0 l\u2019arr\u00eat ou dans la vitesse d\u2019enclenchement',
      'Syst\u00e8me de freinage op\u00e9rationnel et v\u00e9rifi\u00e9',
      'Confirmation finale du conducteur attendue',
    ],
    goaRelevance: 'GoA 2 : le conducteur appuie sur enclenchement ; GoA 3\u20134 : l\u2019enclenchement peut \u00eatre automatique apr\u00e8s r\u00e9union des conditions',
    etcsRequirement: 'Mode ETCS FS avec MA valide ; transition vers le mode AD (Automatic Driving) pr\u00e9par\u00e9e',
  },
  EG: {
    name: 'Enclench\u00e9',
    description: 'L\u2019ATO conduit activement le train \u2014 contr\u00f4lant l\u2019acc\u00e9l\u00e9ration, la vitesse de croisi\u00e8re, la marche sur l\u2019erre et le freinage selon le Profil de trajet.',
    detailedDescription:
      'Engaged est l\u2019\u00e9tat op\u00e9rationnel principal o\u00f9 le syst\u00e8me ATO a le contr\u00f4le total de la traction et du freinage. Le syst\u00e8me suit le Profil de trajet pour optimiser la trajectoire de vitesse afin de respecter l\u2019horaire et l\u2019efficacit\u00e9 \u00e9nerg\u00e9tique. Il calcule les courbes de freinage pour les arr\u00eats en gare, respecte les restrictions de vitesse et g\u00e8re les phases de marche sur l\u2019erre. Toutes les commandes ATO sont supervis\u00e9es par l\u2019ETCS \u2014 si l\u2019ATO viole l\u2019autorisation de mouvement ou le profil de vitesse, l\u2019ETCS applique un freinage de service ou d\u2019urgence. Le conducteur surveille les op\u00e9rations et peut d\u00e9sengager \u00e0 tout moment.',
    keyCharacteristics: [
      'L\u2019ATO contr\u00f4le la traction, le freinage et la marche sur l\u2019erre',
      'Vitesse optimis\u00e9e pour l\u2019horaire et l\u2019efficacit\u00e9 \u00e9nerg\u00e9tique',
      'Arr\u00eats en gare avec pr\u00e9cision (g\u00e9n\u00e9ralement \u00b10,5 m)',
      'L\u2019ETCS supervise toutes les actions ATO \u2014 priorit\u00e9 de s\u00e9curit\u00e9 active',
      'Le conducteur peut d\u00e9sengager \u00e0 tout moment (GoA 2)',
    ],
    goaRelevance: 'GoA 1 : consultatif uniquement (le conducteur conduit) ; GoA 2 : l\u2019ATO conduit, le conducteur surveille ; GoA 3 : l\u2019ATO conduit, agent de bord pr\u00e9sent ; GoA 4 : enti\u00e8rement sans personnel',
    etcsRequirement: 'ETCS en mode AD (Automatic Driving) sous supervision FS ; MA valide requis en permanence',
  },
  DE: {
    name: 'D\u00e9senclenchement',
    description: 'L\u2019ATO remet le contr\u00f4le au conducteur de mani\u00e8re contr\u00f4l\u00e9e, assurant une transition s\u00fbre.',
    detailedDescription:
      'Disengaging est une transition contr\u00f4l\u00e9e de la conduite automatique \u00e0 la conduite manuelle. Cet \u00e9tat est activ\u00e9 lorsque le conducteur demande le d\u00e9senclenchement, lorsqu\u2019une fin planifi\u00e9e du fonctionnement ATO est atteinte (par ex. fin du Profil de trajet), ou lorsque certaines conditions n\u00e9cessitent la reprise en main par le conducteur. Le syst\u00e8me ATO s\u2019assure que le train est dans un \u00e9tat s\u00fbr avant de terminer la passation \u2014 cela peut inclure l\u2019arr\u00eat contr\u00f4l\u00e9 du train si n\u00e9cessaire. Une fois la passation termin\u00e9e, le syst\u00e8me passe \u00e0 NA ou AV.',
    keyCharacteristics: [
      'Passation contr\u00f4l\u00e9e de l\u2019ATO au conducteur',
      'Train amen\u00e9 \u00e0 un \u00e9tat s\u00fbr si n\u00e9cessaire',
      'L\u2019ETCS revient \u00e0 la supervision FS normale',
      'Le conducteur reprend le contr\u00f4le manuel de la traction/freinage',
      'Le DMI ATO confirme la fin du d\u00e9senclenchement',
    ],
    goaRelevance: 'GoA 2 : initi\u00e9 par le conducteur ; GoA 3\u20134 : peut \u00eatre d\u00e9clench\u00e9 par les conditions du syst\u00e8me',
    etcsRequirement: 'L\u2019ETCS passe du mode AD au mode FS',
  },
};
