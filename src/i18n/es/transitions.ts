import type { TransitionTranslation } from '../types';

export const esTransitions: Record<string, TransitionTranslation> = {
  'NP-SB': {
    description: 'Encendido y arranque del sistema',
    detailedDescription:
      'El maquinista enciende el equipo ETCS de a bordo. El sistema realiza su autodiagnóstico de arranque (comprobando hardware, integridad del software, datos almacenados). Tras completarse con éxito, el sistema entra en modo Stand By y el DMI se activa para la introducción de datos.',
    conditions: [
      'Equipo ETCS de a bordo encendido',
      'Autodiagnóstico completado con éxito',
    ],
  },
  'SB-NP': {
    description: 'Apagado',
    detailedDescription:
      'El maquinista apaga el equipo ETCS de a bordo, normalmente al final de una misión cuando el tren se estaciona o la cabina se desactiva. Cesan todas las funciones ETCS.',
    conditions: [
      'Equipo ETCS de a bordo apagado por el maquinista',
    ],
  },
  'SB-FS': {
    description: 'Inicio de misión con MA completa',
    detailedDescription:
      'Después de que el maquinista complete la introducción de datos en Stand By, el sistema recibe una autorización de movimiento válida con descripción completa de la vía (perfil de velocidad, gradiente). Este es el inicio de misión ideal: el tren transiciona directamente a Full Supervision con todos los datos de seguridad disponibles.',
    conditions: [
      'Introducción de datos del maquinista completada (identificación, datos del tren)',
      'Autorización de movimiento (MA) válida recibida',
      'Descripción completa de la vía disponible',
      'Nivel ETCS determinado (Nivel 1, 2 o 3)',
    ],
  },
  'SB-SR': {
    description: 'Inicio de misión sin MA',
    detailedDescription:
      'Cuando el maquinista ha completado la introducción de datos pero no se puede obtener una autorización de movimiento (por ejemplo, sin contacto con el RBC, sin datos de balizas), el maquinista puede solicitar iniciar la misión en modo Staff Responsible. El maquinista debe confirmar el modo en el DMI y asume la responsabilidad del movimiento seguro bajo autorización del responsable de circulación.',
    conditions: [
      'Introducción de datos del maquinista completada',
      'No hay MA válida disponible',
      'El maquinista confirma el modo SR en el DMI',
    ],
  },
  'SB-SH': {
    description: 'Solicitud de maniobras desde Stand By',
    detailedDescription:
      'El maquinista solicita entrar en modo Shunting para movimientos de patio, o se recibe una orden de maniobras desde la vía (por ejemplo, a través de baliza). El sistema transiciona al modo SH para operaciones de clasificación a baja velocidad. Puede no ser necesaria la introducción completa de datos del tren para maniobras.',
    conditions: [
      'Solicitud de maniobras del maquinista u orden de vía',
      'El maquinista confirma el modo de maniobras',
    ],
  },
  'SB-SL': {
    description: 'Entrar en Sleeping como unidad no líder',
    detailedDescription:
      'Cuando el sistema determina que esta unidad de a bordo no es la unidad líder (por ejemplo, cabina trasera de un tren push-pull, o una unidad siendo remolcada sin servicio), transiciona al modo Sleeping. ETCS permanece alimentado pero no supervisa activamente.',
    conditions: [
      'Esta cabina/unidad no es la unidad líder',
      'Otro equipo ETCS de a bordo está activo como líder',
    ],
  },
  'SB-NL': {
    description: 'Entrar en modo Non Leading',
    detailedDescription:
      'El maquinista indica que esta locomotora no es la unidad de tracción líder en la composición (por ejemplo, locomotora trasera en una configuración de doble tracción). ETCS entra en modo Non Leading, permaneciendo activo pero sin emitir comandos de freno ni mantener una MA.',
    conditions: [
      'El maquinista selecciona Non Leading',
      'La unidad no es la unidad de tracción líder en la composición',
    ],
  },
  'SR-FS': {
    description: 'MA recibida en Staff Responsible',
    detailedDescription:
      'Mientras circula en modo Staff Responsible, el tren pasa un grupo de balizas o recibe un mensaje del RBC que contiene una autorización de movimiento válida con descripción completa de la vía. El sistema transiciona automáticamente a Full Supervision, proporcionando protección ETCS completa.',
    conditions: [
      'Autorización de movimiento (MA) válida recibida',
      'Descripción completa de la vía disponible',
    ],
  },
  'SR-OS': {
    description: 'Perfil de modo OS recibido',
    detailedDescription:
      'Mientras está en modo Staff Responsible, el tren recibe un perfil de modo On Sight desde la vía (a través de baliza o RBC). Esto indica que el tramo siguiente puede estar ocupado y el maquinista debe proceder a la vista. El sistema transiciona al modo OS con su velocidad restringida.',
    conditions: [
      'Perfil de modo On Sight recibido desde la vía',
      'MA válida con área OS definida',
    ],
  },
  'SR-TR': {
    description: 'Trip activado en Staff Responsible',
    detailedDescription:
      'Mientras circula en modo SR, el tren pasa un grupo de balizas que ordena un disparo (por ejemplo, protegiendo un punto de peligro). ETCS aplica inmediatamente el freno de emergencia. Esto puede ocurrir si la autorización verbal del responsable de circulación no tuvo en cuenta toda la protección de vía o si las condiciones cambiaron.',
    conditions: [
      'El tren pasa un grupo de balizas que ordena un disparo',
    ],
  },
  'SR-SH': {
    description: 'Shunting desde Staff Responsible',
    detailedDescription:
      'Mientras está en modo Staff Responsible, el maquinista solicita maniobras o se recibe una orden de maniobras desde la vía. El tren transiciona al modo Shunting para movimientos a baja velocidad en el patio.',
    conditions: [
      'Solicitud de maniobras del maquinista u orden de vía',
    ],
  },
  'FS-OS': {
    description: 'Entrada en zona de On Sight',
    detailedDescription:
      'Mientras está en Full Supervision, la vía envía un perfil de modo On Sight para un tramo próximo (por ejemplo, un área donde la detección de vía ha fallado). Al entrar en esta área, el modo cambia a OS y la velocidad se restringe. La MA sigue siendo válida.',
    conditions: [
      'Perfil de modo On Sight recibido desde la vía',
      'El tren entra en el área del perfil de modo OS',
    ],
  },
  'FS-LS': {
    description: 'Entrada en área de Limited Supervision',
    detailedDescription:
      'La vía indica que el próximo tramo solo puede proporcionar Limited Supervision (descripción incompleta de la vía). Al entrar en esta área, el tren transiciona de FS a modo LS. La MA sigue siendo válida pero algunos parámetros de supervisión usan valores nacionales por defecto.',
    conditions: [
      'Perfil de modo Limited Supervision recibido desde la vía',
      'El tren entra en el área del perfil de modo LS',
    ],
  },
  'FS-SR': {
    description: 'Pérdida de condiciones de MA, recurso a SR',
    detailedDescription:
      'Si las condiciones para Full Supervision ya no pueden mantenerse (por ejemplo, la descripción de la vía se vuelve incompleta, problemas de comunicación que no justifican un disparo), el sistema puede transicionar a Staff Responsible como modo degradado pero aún operativo. El maquinista debe confirmar el cambio.',
    conditions: [
      'Las condiciones de la MA ya no pueden mantenerse',
      'Existen condiciones seguras para SR (no es una situación de disparo)',
      'El maquinista confirma el modo SR',
    ],
  },
  'FS-TR': {
    description: 'Rebasamiento del EOA activa disparo de emergencia',
    detailedDescription:
      'La transición de seguridad más crítica. Si el tren rebasa el Fin de Autorización (EOA), es decir, ha pasado el punto más allá del cual no se garantiza un movimiento seguro, ETCS ordena frenado de emergencia inmediato. Esta es la función fundamental de seguridad de ETCS: impedir que los trenes entren en vía desprotegida.',
    conditions: [
      'El tren rebasa el Fin de Autorización (EOA)',
    ],
  },
  'FS-SH': {
    description: 'Orden de maniobras durante Full Supervision',
    detailedDescription:
      'Se recibe una orden de maniobras desde la vía (normalmente a la entrada de un patio o garganta de estación). El tren transiciona al modo Shunting, liberando la MA y cambiando a las normas de movimiento a baja velocidad en el patio.',
    conditions: [
      'Orden de maniobras recibida desde la vía',
      'El maquinista confirma las maniobras',
    ],
  },
  'FS-UN': {
    description: 'Entrada en área no equipada',
    detailedDescription:
      'El tren transiciona de un área equipada con ETCS a un tramo sin equipamiento ETCS de vía (Nivel 0). La MA se libera y el sistema proporciona solo supervisión básica de velocidad máxima. El maquinista debe seguir las normas nacionales de señalización.',
    conditions: [
      'El tren entra en un área sin equipamiento ETCS de vía (Nivel 0)',
      'Transición de nivel a Nivel 0 ejecutada',
    ],
  },
  'FS-SN': {
    description: 'Entrada en área de sistema nacional',
    detailedDescription:
      'El tren transiciona de Full Supervision ETCS a un área protegida por un sistema nacional de protección del tren. ETCS transfiere la supervisión al STM (Módulo de Transmisión Específica) del sistema nacional correspondiente (por ejemplo, PZB, KVB, ASFA). Es una transición planificada en el límite de cobertura de ETCS y del sistema nacional.',
    conditions: [
      'Perfil de modo de sistema nacional recibido desde la vía',
      'STM disponible y compatible con el sistema nacional',
      'Transición de nivel a NTC ejecutada',
    ],
  },
  'FS-RV': {
    description: 'Movimiento de retroceso autorizado',
    detailedDescription:
      'El maquinista está autorizado a realizar un movimiento de retroceso (por ejemplo, retroceder hasta un andén). La vía ha proporcionado información del área de retroceso definiendo la velocidad y distancia permitidas. El maquinista detiene el tren, selecciona marcha atrás y el sistema entra en modo RV con retroceso supervisado.',
    conditions: [
      'Información del área de retroceso recibida desde la vía',
      'El maquinista selecciona la dirección inversa',
      'Tren detenido',
    ],
  },
  'OS-FS': {
    description: 'Salida de la zona de On Sight, reanudación de Full Supervision',
    detailedDescription:
      'El tren ha pasado a través del área de On Sight (por ejemplo, el tramo con detección de vía fallida) y el perfil de modo FS se reanuda. El sistema transiciona de vuelta a Full Supervision con supervisión completa de velocidad y protección.',
    conditions: [
      'Se ha alcanzado el fin del área del perfil de modo On Sight',
      'Se cumplen las condiciones de Full Supervision (MA y descripción de vía)',
    ],
  },
  'OS-SR': {
    description: 'Pérdida de condiciones de OS, recurso a SR',
    detailedDescription:
      'Si las condiciones para el modo On Sight ya no pueden mantenerse (por ejemplo, la MA expira o se pierde la comunicación), el sistema recurre al modo Staff Responsible. El maquinista debe confirmar y asumir la responsabilidad del movimiento seguro.',
    conditions: [
      'Las condiciones del modo OS ya no pueden mantenerse',
      'El maquinista confirma el modo SR',
    ],
  },
  'OS-TR': {
    description: 'Rebasamiento del EOA en modo On Sight',
    detailedDescription:
      'Incluso en modo On Sight, ETCS supervisa la autorización de movimiento. Si el tren rebasa el EOA, se aplica el freno de emergencia y el sistema entra en modo Trip.',
    conditions: [
      'El tren rebasa el Fin de Autorización (EOA)',
    ],
  },
  'LS-FS': {
    description: 'Datos completos de vía disponibles, mejora a FS',
    detailedDescription:
      'El tren entra en un área donde la vía proporciona datos completos de descripción de vía. El sistema transiciona de Limited Supervision a Full Supervision, utilizando ahora datos precisos de gradiente y restricciones de velocidad en lugar de valores nacionales por defecto.',
    conditions: [
      'Perfil de modo Full Supervision recibido desde la vía',
      'Descripción completa de la vía ahora disponible',
    ],
  },
  'LS-TR': {
    description: 'Rebasamiento del EOA en Limited Supervision',
    detailedDescription:
      'Incluso en Limited Supervision, el EOA se supervisa. Si el tren rebasa su autorización, se aplica el freno de emergencia y el sistema entra en modo Trip.',
    conditions: [
      'El tren rebasa el Fin de Autorización (EOA)',
    ],
  },
  'UN-FS': {
    description: 'Entrada en área equipada desde no equipada',
    detailedDescription:
      'El tren transiciona de un área no equipada (Nivel 0) a un área equipada con ETCS. Se ejecuta una transición de nivel y el sistema recibe una MA válida con descripción de vía, habilitando Full Supervision.',
    conditions: [
      'El tren entra en un área equipada con ETCS',
      'Transición de nivel de Nivel 0 a Nivel 1/2/3',
      'MA válida y descripción de vía recibidas',
    ],
  },
  'UN-SR': {
    description: 'Entrada en área ETCS sin MA',
    detailedDescription:
      'El tren entra en un área equipada con ETCS desde un área no equipada, pero no hay autorización de movimiento disponible inmediatamente. El sistema transiciona al modo Staff Responsible como recurso seguro hasta que se pueda obtener una MA.',
    conditions: [
      'Transición de nivel a nivel ETCS pero sin MA disponible',
      'El maquinista confirma el modo SR',
    ],
  },
  'SN-FS': {
    description: 'Transición de sistema nacional a ETCS',
    detailedDescription:
      'El tren transiciona de un área de sistema nacional a un área equipada con ETCS. El STM transfiere la supervisión al equipo de a bordo ETCS, se ejecuta una transición de nivel y el sistema recibe una MA para entrar en Full Supervision. Esta es la transición transfronteriza estándar.',
    conditions: [
      'El tren entra en un área equipada con ETCS',
      'Transición de nivel de NTC a Nivel 1/2/3',
      'MA válida y descripción de vía recibidas',
      'STM transfiere el control a ETCS',
    ],
  },
  'SN-SR': {
    description: 'Nacional a ETCS sin MA',
    detailedDescription:
      'El tren transiciona de un sistema nacional a un área ETCS, pero no hay autorización de movimiento disponible desde la vía ETCS. El sistema entra en modo Staff Responsible como recurso. El maquinista debe seguir las instrucciones del responsable de circulación hasta obtener una MA.',
    conditions: [
      'Transición de nivel de NTC a nivel ETCS',
      'No hay MA disponible desde la vía ETCS',
      'El maquinista confirma el modo SR',
    ],
  },
  'TR-PT': {
    description: 'Tren detenido tras disparo, el maquinista confirma',
    detailedDescription:
      'Tras la aplicación del freno de emergencia en modo Trip, el tren desacelera hasta detenerse por completo. El maquinista debe entonces confirmar el evento de disparo en el DMI. Una vez confirmado con el tren detenido, el sistema transiciona al modo Post Trip, donde pueden comenzar los procedimientos de recuperación.',
    conditions: [
      'El tren se ha detenido por completo',
      'El maquinista confirma el disparo en el DMI',
    ],
  },
  'PT-SR': {
    description: 'Reanudar movimiento en Staff Responsible tras disparo',
    detailedDescription:
      'Después de un disparo, la recuperación más habitual es que el maquinista contacte con el responsable de circulación, explique la situación y reciba autorización verbal para continuar. El maquinista solicita entonces el modo SR en el DMI y lo confirma, permitiendo que el tren se mueva bajo autorización del responsable a velocidad restringida.',
    conditions: [
      'El maquinista contacta con el responsable de circulación y recibe autorización',
      'El maquinista solicita el modo SR en el DMI',
      'El maquinista confirma el modo SR',
    ],
  },
  'PT-SH': {
    description: 'Shunting tras disparo',
    detailedDescription:
      'Después de un evento de disparo, el responsable de circulación puede instruir al maquinista para realizar un movimiento de maniobras en lugar de reanudar el viaje principal (por ejemplo, para liberar una ruta conflictiva o moverse a un apartadero). El tren transiciona al modo Shunting para movimientos a baja velocidad en el patio.',
    conditions: [
      'Solicitud u orden de maniobras tras disparo',
      'El maquinista contacta con el responsable de circulación y recibe autorización de maniobras',
    ],
  },
  'SH-SB': {
    description: 'Fin de maniobras, retorno a Stand By',
    detailedDescription:
      'Cuando las operaciones de maniobra se completan, el maquinista desactiva el modo de maniobras. El sistema vuelve a Stand By, donde el maquinista puede introducir/validar los datos del tren y prepararse para la siguiente misión o movimiento.',
    conditions: [
      'Fin de maniobras (el maquinista sale de maniobras o el tren se detiene)',
      'El maquinista desactiva el modo de maniobras',
    ],
  },
  'SH-FS': {
    description: 'De maniobras a movimiento en línea principal',
    detailedDescription:
      'Durante las operaciones de maniobra, el tren recibe una autorización de movimiento válida para movimiento en línea principal (por ejemplo, después de ser montado y listo para salir del patio). El sistema transiciona a Full Supervision para el viaje en línea principal.',
    conditions: [
      'MA válida recibida para movimiento en línea principal',
      'Descripción completa de la vía disponible',
      'Transición de maniobras a línea principal autorizada',
    ],
  },
  'NL-SB': {
    description: 'Unidad Non Leading se convierte en líder',
    detailedDescription:
      'La locomotora o cabina Non Leading se convierte en la unidad líder (por ejemplo, tras un cambio de maquinista en una terminal, o al desacoplar de la composición). El maquinista activa esta cabina y ETCS transiciona a Stand By para un nuevo inicio de misión.',
    conditions: [
      'Esta unidad se convierte en la unidad líder',
      'El maquinista activa esta cabina como líder',
    ],
  },
  'SL-SB': {
    description: 'Unidad en Sleeping se despierta como líder',
    detailedDescription:
      'El equipo ETCS de a bordo en Sleeping se activa cuando esta cabina se designa como la cabina líder (por ejemplo, cambio de dirección en una terminal en operación push-pull). El maquinista activa el puesto y el sistema entra en Stand By para la validación de datos y el inicio de misión.',
    conditions: [
      'Esta cabina/unidad se convierte en la unidad líder activa',
      'Puesto de conducción activado',
    ],
  },
  'RV-FS': {
    description: 'Fin de retroceso, reanudar marcha adelante en FS',
    detailedDescription:
      'Después de completar el movimiento de retroceso (por ejemplo, el tren ha retrocedido hasta el andén), el maquinista selecciona la dirección de marcha adelante. Si hay una MA válida disponible para el movimiento hacia adelante, el sistema transiciona a Full Supervision.',
    conditions: [
      'Movimiento de retroceso completado',
      'El maquinista selecciona la dirección hacia adelante',
      'MA válida para movimiento hacia adelante disponible',
    ],
  },
  'RV-PT': {
    description: 'Retroceso completado o límite alcanzado',
    detailedDescription:
      'Si se alcanza la distancia de retroceso autorizada, o el movimiento de retroceso se cancela, y el tren está detenido, el sistema transiciona a Post Trip. El maquinista debe entonces seguir los procedimientos de recuperación para reanudar la operación normal.',
    conditions: [
      'Distancia de retroceso excedida o retroceso cancelado',
      'Tren detenido',
    ],
  },
  'FS-FS-MA-UPDATE': {
    description: 'Extensión/actualización de MA en Full Supervision',
    detailedDescription:
      'Mientras está en Full Supervision, la vía extiende o actualiza la autorización de movimiento (por ejemplo, la siguiente señal se abre, el RBC envía una extensión de MA). Esta es la operación continua normal en modo FS, manteniendo el tren en circulación con una autorización actualizada.',
    conditions: [
      'MA nueva o extendida recibida desde la vía',
      'Descripción de vía actualizada recibida',
    ],
  },
  'SB-UN': {
    description: 'Inicio de misión en área no equipada',
    detailedDescription:
      'Al iniciar una misión en un área sin equipamiento ETCS de vía (Nivel 0), el sistema transiciona al modo Unfitted tras la introducción de datos. Solo se proporciona supervisión básica de velocidad máxima.',
    conditions: [
      'Nivel ETCS determinado como Nivel 0',
      'No hay equipamiento ETCS de vía en el área',
      'Introducción de datos del maquinista completada',
    ],
  },
  'SB-SN': {
    description: 'Inicio de misión en área de sistema nacional',
    detailedDescription:
      'Al iniciar una misión en un área protegida por un sistema nacional de protección del tren, ETCS determina el nivel como NTC y activa el STM apropiado. La supervisión se transfiere al sistema nacional.',
    conditions: [
      'Nivel ETCS determinado como NTC',
      'STM disponible y conectado',
      'Equipamiento de vía del sistema nacional detectado',
    ],
  },
  'OS-SH': {
    description: 'Orden de maniobras en modo On Sight',
    detailedDescription:
      'Mientras circula en modo On Sight, se recibe una orden de maniobras (por ejemplo, al llegar a la entrada de un patio). El sistema transiciona al modo Shunting para movimientos a baja velocidad en el patio.',
    conditions: [
      'Orden de maniobras recibida desde la vía',
      'El maquinista confirma las maniobras',
    ],
  },
  'LS-SR': {
    description: 'Pérdida de condiciones de MA en Limited Supervision',
    detailedDescription:
      'Si las condiciones de la autorización de movimiento se pierden durante Limited Supervision (por ejemplo, fallo de comunicación, inconsistencia de datos), el sistema recurre al modo Staff Responsible. El maquinista debe confirmar y asumir la responsabilidad.',
    conditions: [
      'Las condiciones de la MA ya no pueden mantenerse',
      'El maquinista confirma el modo SR',
    ],
  },
  'LS-OS': {
    description: 'Entrada en área de On Sight desde Limited Supervision',
    detailedDescription:
      'Mientras está en Limited Supervision, el tren entra en un área con un perfil de modo On Sight. El sistema transiciona al modo OS para el tramo de velocidad restringida.',
    conditions: [
      'Perfil de modo On Sight recibido desde la vía',
      'El tren entra en el área del perfil de modo OS',
    ],
  },
  'UN-SN': {
    description: 'Sistema nacional detectado desde Unfitted',
    detailedDescription:
      'Mientras está en modo Unfitted (Nivel 0), el tren entra en un área con un sistema nacional de protección del tren. Se activa el STM y la supervisión se transfiere al sistema nacional.',
    conditions: [
      'Equipamiento de vía del sistema nacional detectado',
      'STM disponible y compatible',
      'Transición de nivel a NTC',
    ],
  },
  'SN-UN': {
    description: 'Salida del área de sistema nacional a no equipada',
    detailedDescription:
      'El tren sale del área protegida por el sistema nacional y entra en un tramo no equipado (Nivel 0). Se desactiva el STM y el sistema proporciona solo supervisión básica de velocidad máxima.',
    conditions: [
      'Finaliza la vía del sistema nacional',
      'No hay equipamiento ETCS de vía presente',
      'Transición de nivel de NTC a Nivel 0',
    ],
  },
  'FS-SB': {
    description: 'Fin de misión desde Full Supervision',
    detailedDescription:
      'Cuando el tren llega a su destino y se detiene, el maquinista realiza el procedimiento de Fin de Misión (por ejemplo, cerrar el puesto o confirmar el fin de misión en el DMI). La autorización de movimiento se libera y el sistema vuelve a Stand By, listo para una nueva misión o apagado.',
    conditions: [
      'Tren detenido',
      'Procedimiento de fin de misión realizado por el maquinista',
    ],
  },
  'SR-SB': {
    description: 'Fin de misión desde Staff Responsible',
    detailedDescription:
      'En modo Staff Responsible, el maquinista puede finalizar la misión cuando el tren está detenido (por ejemplo, llegó al destino sin recibir nunca una MA). El sistema vuelve a Stand By.',
    conditions: [
      'Tren detenido',
      'Procedimiento de fin de misión realizado por el maquinista',
    ],
  },
  'OS-SB': {
    description: 'Fin de misión desde On Sight',
    detailedDescription:
      'El maquinista finaliza la misión mientras está en modo On Sight con el tren detenido. El sistema vuelve a Stand By.',
    conditions: [
      'Tren detenido',
      'Procedimiento de fin de misión realizado por el maquinista',
    ],
  },
  'LS-SB': {
    description: 'Fin de misión desde Limited Supervision',
    detailedDescription:
      'El maquinista finaliza la misión mientras está en modo Limited Supervision con el tren detenido. El sistema vuelve a Stand By.',
    conditions: [
      'Tren detenido',
      'Procedimiento de fin de misión realizado por el maquinista',
    ],
  },
  'UN-SB': {
    description: 'Fin de misión desde Unfitted',
    detailedDescription:
      'El maquinista finaliza la misión mientras está en modo Unfitted (área de Nivel 0) con el tren detenido. El sistema vuelve a Stand By.',
    conditions: [
      'Tren detenido',
      'Procedimiento de fin de misión realizado por el maquinista',
    ],
  },
  'SN-SB': {
    description: 'Fin de misión desde STM National',
    detailedDescription:
      'El maquinista finaliza la misión mientras está en modo STM National con el tren detenido. La sesión STM se cierra y el sistema vuelve a Stand By.',
    conditions: [
      'Tren detenido',
      'Procedimiento de fin de misión realizado por el maquinista',
      'Sesión STM cerrada',
    ],
  },
  'PT-SB': {
    description: 'Fin de misión desde Post Trip',
    detailedDescription:
      'Después de un evento de disparo y su confirmación, el maquinista puede optar por finalizar la misión en lugar de recuperar. El sistema vuelve a Stand By para un nuevo inicio de misión.',
    conditions: [
      'Tren detenido',
      'Procedimiento de fin de misión realizado por el maquinista',
    ],
  },
  'ANY-SF': {
    description: 'System Failure desde cualquier modo',
    detailedDescription:
      'Desde cualquier modo ETCS activo, si el equipo de a bordo detecta un fallo interno crítico de seguridad (hardware, software o integridad de datos), transiciona inmediatamente al modo System Failure. Se aplica el freno de emergencia y el maquinista debe seguir las normas nacionales. Esta transición puede ocurrir desde cualquier modo.',
    conditions: [
      'Fallo crítico de seguridad en el equipo de a bordo detectado',
    ],
  },
  'ANY-IS': {
    description: 'ETCS aislado por el maquinista desde cualquier modo',
    detailedDescription:
      'Desde cualquier modo, el maquinista puede accionar el interruptor físico de aislamiento ETCS para deshabilitar completamente el equipo ETCS de a bordo. Es una acción deliberada utilizada cuando ETCS está defectuoso y debe retirarse del servicio. Todas las funciones ETCS cesan inmediatamente.',
    conditions: [
      'El maquinista acciona el interruptor físico de aislamiento ETCS',
    ],
  },
  'ANY-NP': {
    description: 'Pérdida de alimentación desde cualquier modo',
    detailedDescription:
      'Desde cualquier modo, si el equipo ETCS de a bordo pierde su alimentación (desactivación de cabina, fallo de alimentación, interruptor principal apagado), el sistema transiciona a No Power. Cesan todas las funciones ETCS. Puede ser una acción deliberada (fin de misión) o un evento no planificado (fallo de alimentación).',
    conditions: [
      'El equipo ETCS de a bordo pierde la alimentación',
    ],
  },
  'SF-NP': {
    description: 'Ciclo de alimentación tras System Failure',
    detailedDescription:
      'Tras un System Failure, el procedimiento estándar de recuperación es apagar el equipo ETCS de a bordo (transición a NP) y volver a encenderlo (NP a SB). Si el fallo fue transitorio, el sistema puede arrancar normalmente. Si el fallo persiste, puede ser necesario el aislamiento.',
    conditions: [
      'El maquinista apaga ETCS para intentar la recuperación',
    ],
  },
  'IS-NP': {
    description: 'Fin de aislamiento, reinicio del sistema',
    detailedDescription:
      'El maquinista devuelve el interruptor de aislamiento a la posición normal. ETCS transiciona a través de NP (secuencia de encendido) y luego a SB tras el autodiagnóstico. Esto restaura la funcionalidad ETCS si el fallo subyacente se ha resuelto.',
    conditions: [
      'Interruptor de aislamiento devuelto a posición normal',
    ],
  },
  'FS-AD': {
    description: 'Activación de ATO — comienza Automatic Driving',
    detailedDescription:
      'Cuando se cumplen todas las condiciones de activación de ATO y el maquinista confirma la activación en el DMI de ATO, ETCS transiciona de Full Supervision a Automatic Driving. El sistema ATO de a bordo toma el control de la tracción y el frenado mientras ETCS continúa con la supervisión completa de seguridad. La Autorización de Movimiento, el perfil de velocidad y las curvas de frenado siguen aplicándose. Esta transición se define en Subset-125 (ATO SRS) y la interfaz Subset-130 ATO-OB/ETCS-OB.',
    conditions: [
      'El ATO de a bordo está en estado Ready for Engagement (RE)',
      'El maquinista confirma la activación de ATO a través del DMI (GoA 2)',
      'Perfil de Viaje válido recibido del ATO de vía',
      'Tren detenido o dentro de la ventana de velocidad de activación',
    ],
  },
  'AD-FS': {
    description: 'Desactivación de ATO — retorno a conducción manual bajo FS',
    detailedDescription:
      'Cuando el maquinista toma el control manual (pulsando el botón de desactivación o anulando los controles de tracción/freno) o cuando ATO completa su viaje, el sistema transiciona de Automatic Driving de vuelta a Full Supervision. El maquinista reanuda el control manual con supervisión continua de velocidad ETCS. Este es el fin normal y controlado de la operación ATO.',
    conditions: [
      'El maquinista desactiva ATO a través del DMI o anulación de tracción/freno, o',
      'Se alcanza el fin del Perfil de Viaje, o',
      'ATO completa la desactivación controlada',
    ],
  },
  'AD-TR': {
    description: 'Disparo de seguridad durante Automatic Driving',
    detailedDescription:
      'Si el sistema ATO o un evento externo provoca que el tren se aproxime o rebase el Fin de Autorización, ETCS activa un disparo de emergencia independientemente del estado de ATO. Se aplica el freno de emergencia y ATO se desactiva inmediatamente. El sistema entra en modo Trip. La recuperación sigue la secuencia estándar TR, PT, SR, FS.',
    conditions: [
      'El tren rebasa el Fin de Autorización (EOA) o ATO viola la envolvente de seguridad',
    ],
  },
  'AD-SH': {
    description: 'Transición a Shunting desde Automatic Driving',
    detailedDescription:
      'En ciertos escenarios operativos, puede requerirse una transición de Automatic Driving a Shunting (por ejemplo, al aproximarse a un patio). ATO se desactiva y ETCS transiciona al modo Shunting con su supervisión reducida.',
    conditions: [
      'Solicitud de maniobras confirmada durante la operación ATO',
    ],
  },
};
