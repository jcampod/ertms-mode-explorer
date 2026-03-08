import type { ATOStateTranslation } from '../types';

export const esATOStates: Record<string, ATOStateTranslation> = {
  NP: {
    name: 'Sin alimentación',
    description: 'El sistema ATO de a bordo está apagado. No hay funcionalidad ATO disponible.',
    detailedDescription:
      'No Power es el estado inicial del sistema ATO de a bordo cuando el equipo ATO del tren no está energizado. En este estado, no se realizan funciones ATO y el sistema no tiene conocimiento de la posición del tren, el perfil de viaje ni el estado de ETCS. La transición fuera de NP ocurre cuando el sistema ATO recibe alimentación y comienza su secuencia de configuración.',
    keyCharacteristics: [
      'Sistema ATO completamente inactivo',
      'Sin comunicación con el ETCS de a bordo',
      'Sin perfil de viaje cargado',
      'Sin interfaz de maquinista activa',
      'Se entra por pérdida de alimentación o comando de apagado',
    ],
    goaRelevance: 'Aplicable a todos los niveles GoA (GoA 1-4)',
    etcsRequirement: 'Ninguno — ATO es independiente de ETCS en este estado',
  },
  CO: {
    name: 'Configuración',
    description: 'El sistema ATO se está inicializando: cargando configuración, realizando autodiagnósticos y estableciendo interfaces de comunicación.',
    detailedDescription:
      'Durante Configuration, el ATO de a bordo realiza los procedimientos de arranque incluyendo autocomprobaciones de hardware, carga de datos de configuración (parámetros del vehículo, modelos de frenado) y establecimiento de la interfaz con la unidad ETCS de a bordo a través de la interfaz Subset-130. El sistema también intenta conectarse con el ATO de vía a través de GSM-R o FRMCS. Si la configuración falla, el sistema vuelve a NP.',
    keyCharacteristics: [
      'Autodiagnóstico de hardware y software en curso',
      'Datos de configuración del vehículo cargados',
      'Interfaz con ETCS de a bordo (Subset-130) inicializada',
      'Enlace de comunicación con la vía en proceso de establecimiento',
      'Puede requerirse introducción de datos del maquinista',
    ],
    goaRelevance: 'Aplicable a todos los niveles GoA (GoA 1-4)',
    etcsRequirement: 'El ETCS de a bordo debe estar alimentado y accesible para la configuración de la interfaz',
  },
  NA: {
    name: 'No disponible',
    description: 'ATO está configurado pero no puede activarse. No se cumplen las condiciones esenciales para la operación ATO.',
    detailedDescription:
      'Not Available indica que el sistema ATO ha completado la configuración pero faltan una o más precondiciones para la conducción automática. Las razones típicas incluyen: ETCS no está en modo Full Supervision (FS), no se ha recibido un Perfil de Viaje válido del ATO de vía, o hay una inhibición relevante para la seguridad activa. El sistema monitoriza las condiciones continuamente y transiciona a Available (AV) cuando se cumplen todos los requisitos.',
    keyCharacteristics: [
      'ATO configurado y monitorizando condiciones',
      'El modo ETCS no es Full Supervision, o',
      'No se ha recibido Perfil de Viaje válido, o',
      'Inhibición de seguridad activa (por ejemplo, fallo de freno)',
      'Maquinista informado a través del DMI de ATO (Interfaz Maquinista-Máquina)',
    ],
    goaRelevance: 'Aplicable a todos los niveles GoA (GoA 1-4)',
    etcsRequirement: 'ETCS debe estar operativo; ATO espera el modo Full Supervision (FS)',
  },
  AV: {
    name: 'Disponible',
    description: 'Se cumplen todas las condiciones para la activación de ATO. El sistema está listo y esperando a que el maquinista seleccione la activación de ATO.',
    detailedDescription:
      'En el estado Available, se cumplen todas las precondiciones para la conducción automática: ETCS está en modo Full Supervision (FS), hay un Perfil de Viaje válido cargado, el tren está detenido o dentro de la ventana de velocidad de activación, y no hay inhibiciones activas. Se informa al maquinista a través del DMI de ATO que se puede activar ATO. En GoA 2, el maquinista debe solicitar explícitamente la activación. El sistema monitoriza las condiciones continuamente: si se pierde alguna condición, vuelve a NA.',
    keyCharacteristics: [
      'Modo ETCS Full Supervision (FS) confirmado',
      'Perfil de Viaje válido recibido y activo',
      'Sin inhibiciones de seguridad presentes',
      'El DMI de ATO indica preparación para activar',
      'Esperando comando de activación del maquinista (GoA 2)',
    ],
    goaRelevance: 'GoA 1: modo de asesoramiento disponible; GoA 2: activación semiautomática posible; GoA 3-4: activación automática iniciada',
    etcsRequirement: 'ETCS debe estar en Full Supervision (FS) con Autorización de Movimiento válida',
  },
  RE: {
    name: 'Listo para activación',
    description: 'Se cumplen todas las precondiciones de activación. ATO está listo para asumir la conducción — esperando confirmación final del maquinista.',
    detailedDescription:
      'Ready for Engagement se alcanza cuando el sistema ATO ha verificado todos los prerrequisitos técnicos y operativos: modo ETCS FS activo, Autorización de Movimiento válida, Perfil de Viaje cargado, puertas cerradas y bloqueadas, sistema de frenos verificado y tren detenido (o dentro de la velocidad permitida). El maquinista confirma la activación a través del DMI de ATO. Tras la confirmación, el sistema transiciona a Engaged (EG) y comienza la conducción automática.',
    keyCharacteristics: [
      'Todos los prerrequisitos de activación verificados',
      'Puertas confirmadas cerradas y bloqueadas',
      'Tren detenido o dentro de la velocidad de activación',
      'Sistema de frenos operativo y verificado',
      'Esperando confirmación final del maquinista',
    ],
    goaRelevance: 'GoA 2: el maquinista pulsa activar; GoA 3-4: la activación puede ser automática tras cumplirse las condiciones',
    etcsRequirement: 'ETCS en modo FS con MA válida; transición a modo AD (Automatic Driving) preparada',
  },
  EG: {
    name: 'Activado',
    description: 'ATO está conduciendo el tren activamente — controlando aceleración, velocidad de crucero, inercia y frenado según el Perfil de Viaje.',
    detailedDescription:
      'Engaged es el estado operativo principal donde el sistema ATO tiene control total de la tracción y el frenado. El sistema sigue el Perfil de Viaje para optimizar la trayectoria de velocidad para el cumplimiento del horario y la eficiencia energética. Calcula curvas de frenado para las paradas en estación, respeta las restricciones de velocidad y gestiona las fases de inercia. Todos los comandos de ATO son supervisados por ETCS: si ATO viola la Autorización de Movimiento o el perfil de velocidad, ETCS aplica freno de servicio o de emergencia. El maquinista monitoriza las operaciones y puede desactivar ATO en cualquier momento.',
    keyCharacteristics: [
      'ATO controla tracción, frenado e inercia',
      'Velocidad optimizada para horario y eficiencia energética',
      'Paradas en estación con precisión (típicamente +/-0,5 m)',
      'ETCS supervisa todas las acciones de ATO — anulación de seguridad activa',
      'El maquinista puede desactivar en cualquier momento (GoA 2)',
    ],
    goaRelevance: 'GoA 1: solo asesoramiento (conduce el maquinista); GoA 2: ATO conduce, el maquinista monitoriza; GoA 3: ATO conduce, asistente a bordo; GoA 4: totalmente desatendido',
    etcsRequirement: 'ETCS en modo AD (Automatic Driving) bajo supervisión FS; MA válida requerida en todo momento',
  },
  DE: {
    name: 'Desactivando',
    description: 'ATO está transfiriendo el control de vuelta al maquinista de forma controlada, garantizando una transición segura.',
    detailedDescription:
      'Disengaging es una transición controlada de conducción automática a manual. Se entra en este estado cuando el maquinista solicita la desactivación, cuando se alcanza un fin planificado de la operación ATO (por ejemplo, fin del Perfil de Viaje), o cuando ciertas condiciones requieren que el maquinista asuma el control. El sistema ATO asegura que el tren esté en un estado seguro antes de completar la transferencia, lo que puede incluir llevar el tren a una parada controlada si es necesario. Una vez completada la transferencia, el sistema transiciona a NA o AV.',
    keyCharacteristics: [
      'Transferencia controlada de ATO al maquinista',
      'El tren se lleva a un estado seguro si es necesario',
      'ETCS vuelve a supervisión FS normal',
      'El maquinista asume el control manual de tracción/frenado',
      'El DMI de ATO confirma la desactivación completada',
    ],
    goaRelevance: 'GoA 2: iniciada por el maquinista; GoA 3-4: puede ser activada por condiciones del sistema',
    etcsRequirement: 'ETCS transiciona de modo AD de vuelta a modo FS',
  },
};
