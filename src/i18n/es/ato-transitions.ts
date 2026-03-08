import type { ATOTransitionTranslation } from '../types';

export const esATOTransitions: Record<string, ATOTransitionTranslation> = {
  'NP-CO': {
    description: 'El encendido inicia la configuración de ATO',
    detailedDescription:
      'Cuando el equipo ATO de a bordo se energiza, el sistema comienza su secuencia de configuración. Esto incluye la carga de parámetros del vehículo, la inicialización de módulos internos y la preparación de la interfaz con ETCS.',
    conditions: [
      'El sistema ATO recibe alimentación',
    ],
  },
  'CO-NP': {
    description: 'El fallo de configuración devuelve a No Power',
    detailedDescription:
      'Si el sistema ATO falla en su autodiagnóstico, encuentra datos de configuración incompatibles o pierde la alimentación durante la inicialización, vuelve al estado No Power.',
    conditions: [
      'Fallo de configuración o alimentación eliminada',
    ],
  },
  'CO-NA': {
    description: 'Configuración exitosa conduce a Not Available',
    detailedDescription:
      'Tras completar los autodiagnósticos y establecer la interfaz Subset-130 con el ETCS de a bordo, el sistema ATO entra en el estado Not Available. Ahora monitoriza si ETCS está en modo Full Supervision y si hay un Perfil de Viaje disponible.',
    conditions: [
      'Configuración y autodiagnóstico completados con éxito',
      'Interfaz con ETCS de a bordo establecida',
    ],
  },
  'NA-AV': {
    description: 'Se cumplen todas las condiciones — ATO pasa a Available',
    detailedDescription:
      'Cuando el ETCS de a bordo confirma el modo Full Supervision con una Autorización de Movimiento válida, y se ha recibido un Perfil de Viaje a través de la interfaz del ATO de vía (Subset-126), ATO transiciona a Available. Se informa al maquinista de que se puede activar ATO.',
    conditions: [
      'ETCS entra en modo Full Supervision (FS)',
      'Perfil de Viaje válido recibido de la vía',
      'Sin inhibiciones de seguridad activas',
    ],
  },
  'AV-NA': {
    description: 'Condiciones perdidas — ATO ya no disponible',
    detailedDescription:
      'Si ETCS sale del modo Full Supervision (por ejemplo, debido a una transición de modo a On Sight o Trip), si el Perfil de Viaje expira o se invalida, o si se activa una inhibición de seguridad, ATO vuelve a Not Available hasta que se restauren las condiciones.',
    conditions: [
      'ETCS sale del modo Full Supervision, o',
      'El Perfil de Viaje se invalida, o',
      'Inhibición de seguridad activada',
    ],
  },
  'AV-RE': {
    description: 'Precondiciones de activación cumplidas',
    detailedDescription:
      'Cuando el tren está estacionario (o dentro de la ventana de velocidad de activación permitida) y se cumplen todas las condiciones físicas — puertas cerradas, frenos verificados — ATO indica preparación en el DMI y transiciona a Ready for Engagement.',
    conditions: [
      'Tren detenido o dentro de la velocidad de activación',
      'Puertas confirmadas cerradas y bloqueadas',
      'Sistema de frenos operativo',
    ],
  },
  'RE-AV': {
    description: 'Precondiciones perdidas — retorno a Available',
    detailedDescription:
      'Si se viola alguna precondición de activación mientras está en Ready for Engagement — por ejemplo, se abre una puerta o se detecta un fallo de freno — ATO vuelve al estado Available y se informa al maquinista.',
    conditions: [
      'Precondiciones de activación perdidas (por ejemplo, puertas abiertas)',
    ],
  },
  'RE-EG': {
    description: 'El maquinista activa ATO — comienza la conducción automática',
    detailedDescription:
      'El maquinista pulsa el botón de activación de ATO en el DMI. El ETCS de a bordo transiciona al modo Automatic Driving (AD) bajo Full Supervision, y ATO comienza a controlar la tracción y el frenado según el Perfil de Viaje. En GoA 3-4, la activación puede ocurrir automáticamente.',
    conditions: [
      'El maquinista confirma la activación de ATO a través del DMI',
      'ETCS transiciona al modo AD (Automatic Driving)',
    ],
  },
  'EG-DE': {
    description: 'ATO comienza la desactivación controlada',
    detailedDescription:
      'La desactivación se inicia cuando el maquinista pulsa el botón de desactivación, cuando el Perfil de Viaje termina o cuando se alcanza un punto de transición planificado. ATO lleva el tren a un estado seguro y prepara la transferencia del control al maquinista.',
    conditions: [
      'El maquinista solicita la desactivación, o',
      'Se alcanza el fin del Perfil de Viaje, o',
      'Se alcanza el punto de transferencia planificado',
    ],
  },
  'EG-NA': {
    description: 'Desactivación de emergencia — retorno inmediato a Not Available',
    detailedDescription:
      'Si ocurre una condición crítica durante la conducción automática — como que ETCS active una transición de modo (por ejemplo, Trip), un fallo de comunicación con el ATO de vía o un fallo crítico de seguridad del sistema — ATO se desactiva inmediatamente sin la secuencia de transferencia controlada. La supervisión de seguridad ETCS permanece activa.',
    conditions: [
      'ETCS sale de Full Supervision / modo AD, o',
      'Condición crítica de seguridad activada, o',
      'Pérdida de comunicación con el ATO de vía',
    ],
  },
  'DE-NA': {
    description: 'Desactivación completa — no se cumplen condiciones para reactivación',
    detailedDescription:
      'Después de que la transferencia controlada al maquinista se completa y las condiciones de activación ya no se cumplen (por ejemplo, ETCS salió del modo FS, el viaje terminó), ATO vuelve a Not Available.',
    conditions: [
      'Desactivación completada',
      'Las condiciones de ATO ya no se cumplen',
    ],
  },
  'DE-AV': {
    description: 'Desactivación completa — ATO permanece disponible para reactivación',
    detailedDescription:
      'Tras completar la transferencia controlada, si todas las condiciones de ATO siguen cumpliéndose (ETCS en FS, Perfil de Viaje válido), el sistema vuelve a Available, permitiendo al maquinista reactivar ATO si lo desea.',
    conditions: [
      'Desactivación completada',
      'Las condiciones de ATO siguen cumpliéndose',
    ],
  },
  'DE-RE': {
    description: 'Desactivación completa — todos los prerrequisitos de activación aún se cumplen, listo para reactivación inmediata',
    detailedDescription:
      'Si tras una desactivación controlada todas las condiciones siguen satisfechas — ETCS en Full Supervision, Perfil de Viaje válido, tren detenido con puertas bloqueadas y frenos verificados — ATO puede saltar el estado Available y transicionar directamente a Ready for Engagement. Esto permite una reactivación rápida, por ejemplo tras una breve intervención manual en una estación.',
    conditions: [
      'Desactivación completada',
      'ETCS aún en modo FS con MA válida',
      'Perfil de Viaje válido aún activo',
      'Tren detenido o dentro de la velocidad de activación',
      'Puertas cerradas y bloqueadas, frenos verificados',
    ],
  },
  'ANY-NP': {
    description: 'La pérdida de alimentación devuelve a No Power desde cualquier estado',
    detailedDescription:
      'Si el sistema ATO de a bordo pierde la alimentación en cualquier momento durante la operación, entra inmediatamente en el estado No Power. Esta es una transición universal que puede ocurrir desde cualquier estado ATO. ETCS continúa operando de forma independiente.',
    conditions: [
      'Pérdida de alimentación del sistema ATO',
    ],
  },
};
