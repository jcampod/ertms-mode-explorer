import type { ATOTransitionTranslation } from '../types';

export const frATOTransitions: Record<string, ATOTransitionTranslation> = {
  'NP-CO': {
    description: 'La mise sous tension lance la configuration ATO',
    detailedDescription:
      'Lorsque l\u2019\u00e9quipement embarqu\u00e9 ATO est aliment\u00e9, le syst\u00e8me commence sa s\u00e9quence de configuration. Cela inclut le chargement des param\u00e8tres du v\u00e9hicule, l\u2019initialisation des modules internes et la pr\u00e9paration de l\u2019interface ETCS.',
    conditions: [
      'Le syst\u00e8me ATO re\u00e7oit l\u2019alimentation',
    ],
  },
  'CO-NP': {
    description: '\u00c9chec de configuration, retour \u00e0 No Power',
    detailedDescription:
      'Si le syst\u00e8me ATO \u00e9choue \u00e0 son autotest, rencontre des donn\u00e9es de configuration incompatibles ou perd l\u2019alimentation pendant l\u2019initialisation, il retourne \u00e0 l\u2019\u00e9tat No Power.',
    conditions: [
      '\u00c9chec de configuration ou alimentation retir\u00e9e',
    ],
  },
  'CO-NA': {
    description: 'Configuration r\u00e9ussie, passage \u00e0 Not Available',
    detailedDescription:
      'Apr\u00e8s avoir termin\u00e9 les autotests et \u00e9tabli l\u2019interface Subset-130 avec l\u2019unit\u00e9 embarqu\u00e9e ETCS, le syst\u00e8me ATO entre dans l\u2019\u00e9tat Not Available. Il surveille d\u00e9sormais si l\u2019ETCS est en mode Full Supervision et si un Profil de trajet est disponible.',
    conditions: [
      'Configuration et autotest termin\u00e9s avec succ\u00e8s',
      'Interface unit\u00e9 embarqu\u00e9e ETCS \u00e9tablie',
    ],
  },
  'NA-AV': {
    description: 'Toutes les conditions remplies \u2014 l\u2019ATO devient Available',
    detailedDescription:
      'Lorsque l\u2019unit\u00e9 embarqu\u00e9e ETCS confirme le mode Full Supervision avec une autorisation de mouvement valide, et qu\u2019un Profil de trajet a \u00e9t\u00e9 re\u00e7u via l\u2019interface sol ATO (Subset-126), l\u2019ATO passe \u00e0 Available. Le conducteur est inform\u00e9 que l\u2019ATO peut \u00eatre enclench\u00e9.',
    conditions: [
      'L\u2019ETCS entre en mode Full Supervision (FS)',
      'Profil de trajet valide re\u00e7u du sol',
      'Aucune inhibition de s\u00e9curit\u00e9 active',
    ],
  },
  'AV-NA': {
    description: 'Conditions perdues \u2014 l\u2019ATO n\u2019est plus Available',
    detailedDescription:
      'Si l\u2019ETCS quitte le mode Full Supervision (par ex. en raison d\u2019une transition de mode vers On Sight ou Trip), si le Profil de trajet expire ou devient invalide, ou si une inhibition de s\u00e9curit\u00e9 est lev\u00e9e, l\u2019ATO revient \u00e0 Not Available jusqu\u2019au r\u00e9tablissement des conditions.',
    conditions: [
      'L\u2019ETCS quitte le mode Full Supervision, ou',
      'Le Profil de trajet devient invalide, ou',
      'Inhibition de s\u00e9curit\u00e9 activ\u00e9e',
    ],
  },
  'AV-RE': {
    description: 'Pr\u00e9conditions d\u2019enclenchement remplies',
    detailedDescription:
      'Lorsque le train est \u00e0 l\u2019arr\u00eat (ou dans la fen\u00eatre de vitesse d\u2019enclenchement autoris\u00e9e) et que toutes les conditions physiques sont remplies \u2014 portes verrouill\u00e9es, freins v\u00e9rifi\u00e9s \u2014 l\u2019ATO signale sa disponibilit\u00e9 sur le DMI et passe \u00e0 Ready for Engagement.',
    conditions: [
      'Train \u00e0 l\u2019arr\u00eat ou dans la vitesse d\u2019enclenchement',
      'Portes confirm\u00e9es ferm\u00e9es et verrouill\u00e9es',
      'Syst\u00e8me de freinage op\u00e9rationnel',
    ],
  },
  'RE-AV': {
    description: 'Pr\u00e9conditions perdues \u2014 retour \u00e0 Available',
    detailedDescription:
      'Si une pr\u00e9condition d\u2019enclenchement est viol\u00e9e en \u00e9tat Ready for Engagement \u2014 par exemple, une porte est ouverte ou un d\u00e9faut de frein est d\u00e9tect\u00e9 \u2014 l\u2019ATO revient \u00e0 l\u2019\u00e9tat Available et le conducteur en est inform\u00e9.',
    conditions: [
      'Pr\u00e9conditions d\u2019enclenchement perdues (par ex. portes ouvertes)',
    ],
  },
  'RE-EG': {
    description: 'Le conducteur enclenche l\u2019ATO \u2014 la conduite Automatic Driving commence',
    detailedDescription:
      'Le conducteur appuie sur le bouton d\u2019enclenchement ATO sur le DMI. L\u2019unit\u00e9 embarqu\u00e9e ETCS passe en mode Automatic Driving (AD) sous Full Supervision, et l\u2019ATO commence \u00e0 contr\u00f4ler la traction et le freinage selon le Profil de trajet. En GoA 3\u20134, l\u2019enclenchement peut se faire automatiquement.',
    conditions: [
      'Le conducteur confirme l\u2019enclenchement ATO via le DMI',
      'L\u2019ETCS passe en mode AD (Automatic Driving)',
    ],
  },
  'EG-DE': {
    description: 'L\u2019ATO commence le d\u00e9senclenchement contr\u00f4l\u00e9',
    detailedDescription:
      'Le d\u00e9senclenchement est initi\u00e9 lorsque le conducteur appuie sur le bouton de d\u00e9senclenchement, lorsque le Profil de trajet se termine, ou lorsqu\u2019un point de transition planifi\u00e9 est atteint. Le syst\u00e8me ATO am\u00e8ne le train \u00e0 un \u00e9tat s\u00fbr et pr\u00e9pare la remise du contr\u00f4le au conducteur.',
    conditions: [
      'Le conducteur demande le d\u00e9senclenchement, ou',
      'Fin du Profil de trajet atteinte, ou',
      'Point de passation planifi\u00e9 atteint',
    ],
  },
  'EG-NA': {
    description: 'D\u00e9senclenchement d\u2019urgence \u2014 retour imm\u00e9diat \u00e0 Not Available',
    detailedDescription:
      'Si une condition critique survient pendant la conduite Automatic Driving \u2014 comme l\u2019ETCS d\u00e9clenchant une transition de mode (par ex. Trip), une panne de communication avec le sol ATO, ou un d\u00e9faut critique du syst\u00e8me \u2014 l\u2019ATO se d\u00e9sengage imm\u00e9diatement sans la s\u00e9quence de passation contr\u00f4l\u00e9e. La supervision de s\u00e9curit\u00e9 ETCS reste active.',
    conditions: [
      'L\u2019ETCS quitte le mode Full Supervision / AD, ou',
      'Condition critique de s\u00e9curit\u00e9 d\u00e9clench\u00e9e, ou',
      'Perte de communication avec le sol ATO',
    ],
  },
  'DE-NA': {
    description: 'D\u00e9senclenchement termin\u00e9 \u2014 conditions non remplies pour un r\u00e9enclenchement',
    detailedDescription:
      'Apr\u00e8s que la passation contr\u00f4l\u00e9e au conducteur est termin\u00e9e et que les conditions d\u2019enclenchement ne sont plus satisfaites (par ex. l\u2019ETCS a quitt\u00e9 le mode FS, trajet termin\u00e9), l\u2019ATO revient \u00e0 Not Available.',
    conditions: [
      'D\u00e9senclenchement termin\u00e9',
      'Les conditions ATO ne sont plus remplies',
    ],
  },
  'DE-AV': {
    description: 'D\u00e9senclenchement termin\u00e9 \u2014 l\u2019ATO reste Available pour un r\u00e9enclenchement',
    detailedDescription:
      'Apr\u00e8s que la passation contr\u00f4l\u00e9e est termin\u00e9e, si toutes les conditions ATO sont toujours remplies (ETCS en FS, Profil de trajet valide), le syst\u00e8me revient \u00e0 Available, permettant au conducteur de r\u00e9engager l\u2019ATO s\u2019il le souhaite.',
    conditions: [
      'D\u00e9senclenchement termin\u00e9',
      'Les conditions ATO sont toujours remplies',
    ],
  },
  'DE-RE': {
    description: 'D\u00e9senclenchement termin\u00e9 \u2014 tous les pr\u00e9requis d\u2019enclenchement toujours remplis, pr\u00eat pour un r\u00e9enclenchement imm\u00e9diat',
    detailedDescription:
      'Si apr\u00e8s un d\u00e9senclenchement contr\u00f4l\u00e9 toutes les conditions restent satisfaites \u2014 ETCS en Full Supervision, Profil de trajet valide, train \u00e0 l\u2019arr\u00eat avec portes verrouill\u00e9es et freins v\u00e9rifi\u00e9s \u2014 l\u2019ATO peut sauter l\u2019\u00e9tat Available et passer directement \u00e0 Ready for Engagement. Cela permet un r\u00e9enclenchement rapide, par exemple apr\u00e8s une br\u00e8ve intervention manuelle en gare.',
    conditions: [
      'D\u00e9senclenchement termin\u00e9',
      'ETCS toujours en mode FS avec MA valide',
      'Profil de trajet valide toujours actif',
      'Train \u00e0 l\u2019arr\u00eat ou dans la vitesse d\u2019enclenchement',
      'Portes ferm\u00e9es et verrouill\u00e9es, freins v\u00e9rifi\u00e9s',
    ],
  },
  'ANY-NP': {
    description: 'Perte d\u2019alimentation, retour \u00e0 No Power depuis tout \u00e9tat',
    detailedDescription:
      'Si le syst\u00e8me embarqu\u00e9 ATO perd son alimentation \u00e0 tout moment pendant le fonctionnement, il entre imm\u00e9diatement dans l\u2019\u00e9tat No Power. C\u2019est une transition universelle qui peut survenir depuis tout \u00e9tat ATO. L\u2019ETCS continue de fonctionner ind\u00e9pendamment.',
    conditions: [
      'Perte d\u2019alimentation du syst\u00e8me ATO',
    ],
  },
};
