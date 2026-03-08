import type { ScenarioTranslation } from '../types';

export const esScenarios: Record<string, ScenarioTranslation> = {
  'normal-start': {
    title: 'Inicio normal de misión',
    description:
      'Acompañe a un maquinista a través de la secuencia estándar de arranque ETCS: encendido, introducción de datos, recepción de una autorización de movimiento y gestión de una zona de On Sight durante el trayecto.',
    category: 'Operaciones normales',
    steps: [
      {
        situation:
          'Usted es un maquinista que llega al depósito por la mañana temprano. Sube a la cabina y gira la llave maestra para encender el equipo ETCS de a bordo. El sistema ejecuta su autodiagnóstico, comprobando procesadores, memoria, sensores de odometría y la unidad de registro jurídico. Todas las comprobaciones pasan y la pantalla del DMI se ilumina, mostrando los campos de introducción de datos.',
        question:
          '¿ETCS se ha encendido y ha completado su autodiagnóstico con éxito. A qué modo entra el sistema?',
        explanation:
          'Tras el encendido y un autodiagnóstico exitoso, ETCS siempre entra en modo Stand By (SB). Este es el modo de acceso donde el maquinista debe introducir su identificación, los datos del tren y confirmar el nivel ETCS antes de que pueda comenzar cualquier misión. El sistema no puede ir directamente a Full Supervision porque aún no existe una autorización de movimiento.',
        hint: 'Piense en lo que debe ocurrir antes de que el tren pueda moverse. El sistema necesita primero los datos del maquinista y del tren.',
      },
      {
        situation:
          'Usted introduce su identificación de maquinista, el número de circulación del tren y valida los datos del tren (longitud: 200 m, velocidad máxima: 160 km/h, características de frenado). El nivel ETCS se confirma como Nivel 2 y el equipo de a bordo establece una sesión de comunicación con el Centro de Bloqueo por Radio (RBC). El RBC envía una autorización de movimiento válida con una descripción completa de la vía que incluye perfil de velocidad y datos de gradiente.',
        question:
          '¿Ha completado la introducción de datos y ha recibido una autorización de movimiento completa con descripción completa de la vía. A qué modo debe transicionar el sistema?',
        explanation:
          'Cuando se recibe una MA válida con descripción completa de la vía (perfil de velocidad, gradientes), el sistema transiciona a Full Supervision (FS). Este es el inicio de misión ideal: el tren tiene todo lo necesario para la máxima protección ETCS. Staff Responsible solo se usaría si no hubiera MA disponible.',
        hint: 'Tiene las mejores condiciones posibles: MA completa y datos de vía completos. ¿Qué modo proporciona el nivel más alto de supervisión?',
      },
      {
        situation:
          'Usted circula a 120 km/h en Full Supervision por la línea principal. Todo es normal: el DMI muestra la velocidad permitida, la distancia objetivo y su velocidad actual. Más adelante, el responsable de circulación ha establecido una ruta a través de una estación donde el equipo de detección de vía ha fallado parcialmente. El RBC envía una MA actualizada que contiene un perfil de modo On Sight para el próximo tramo de 800 m.',
        question:
          '¿El RBC ha enviado un perfil de modo On Sight porque la vía por delante puede estar ocupada debido a un fallo del equipo de detección. Al entrar en esta zona, a qué modo transiciona el sistema?',
        explanation:
          'Cuando la vía envía un perfil de modo On Sight (OS), el sistema transiciona al modo OS al entrar en esa zona. En modo OS, la velocidad se restringe a una velocidad determinada por Valores Nacionales y usted debe conducir a la vista, preparado para detenerse dentro de la distancia visible. La MA sigue siendo válida; solo cambia el modo de supervisión para reflejar la ocupación incierta de la vía.',
        hint: 'La vía por delante podría estar ocupada. ¿Qué modo exige que el maquinista esté preparado para detenerse a la vista?',
      },
      {
        situation:
          'Usted avanza con precaución a 25 km/h a través de la zona de On Sight, vigilando cuidadosamente cualquier obstrucción. El tramo está despejado y, tras 800 metros, pasa el final del área del perfil de modo OS. La detección de vía funciona normalmente de nuevo más allá de este punto y los datos completos de descripción de vía están disponibles.',
        question:
          '¿Ha pasado a través de la zona de On Sight sin incidentes. La vía por delante tiene equipos de detección en funcionamiento y los datos completos de vía están disponibles. A qué modo vuelve el sistema?',
        explanation:
          'Una vez que el tren sale de la zona de On Sight y se reanuda la descripción completa de la vía con condiciones normales, el sistema transiciona automáticamente de vuelta a Full Supervision (FS). Esta es la recuperación estándar: OS es una restricción temporal aplicada a un tramo específico, y FS se reanuda cuando ese tramo termina.',
        hint: 'Las condiciones que causaron el modo On Sight ya no aplican. ¿Cuál era el modo antes de entrar en la zona OS?',
      },
    ],
  },
  'trip-recovery': {
    title: 'Trip y recuperación',
    description:
      'Experimente el procedimiento de disparo de emergencia: qué sucede cuando un tren rebasa su Fin de Autorización y el proceso de recuperación paso a paso que involucra al maquinista, al responsable de circulación y al sistema ETCS.',
    category: 'Operaciones degradadas',
    steps: [
      {
        situation:
          'Usted conduce a 80 km/h en Full Supervision, aproximándose a una estación donde la siguiente señal está en peligro. El DMI muestra la curva de frenado y la velocidad objetivo de 0 km/h en el Fin de Autorización (EOA). Usted calcula mal la distancia de frenado, quizá el raíl está mojado y la adherencia es deficiente. A pesar de la intervención del freno de servicio, el tren desliza 15 metros más allá del EOA.',
        question:
          '¿El tren ha rebasado el Fin de Autorización. ETCS detecta que el tren ha pasado el EOA. Qué ocurre inmediatamente?',
        explanation:
          'Rebasar el Fin de Autorización (EOA) es la violación de seguridad más crítica en ETCS. El sistema entra inmediatamente en modo Trip (TR) y ordena la aplicación completa del freno de emergencia. Esta es la función fundamental de seguridad de ETCS: impedir que los trenes entren en vía desprotegida donde podría ocurrir una colisión.',
        hint: 'Este es un evento crítico de seguridad. El tren ha superado su límite seguro. ¿Cuál es el modo de respuesta de emergencia?',
      },
      {
        situation:
          'El freno de emergencia se ha aplicado y el tren está desacelerando rápidamente. Tras unos segundos tensos, el tren se detiene por completo unos 40 metros más allá del EOA. El DMI muestra de forma prominente la indicación de Trip. Su corazón late con fuerza, pero debe seguir el procedimiento de recuperación. Pulsa el botón de confirmación en el DMI.',
        question:
          '¿El tren se ha detenido y usted ha confirmado el disparo en el DMI. A qué modo entra el sistema para la fase de recuperación?',
        explanation:
          'Después de un disparo, una vez que el tren se detiene y el maquinista confirma el disparo en el DMI, el sistema entra en modo Post Trip (PT). Este es un estado de recuperación controlada: el tren no puede moverse hacia adelante y el maquinista debe contactar con el responsable de circulación antes de cualquier acción adicional. PT garantiza una pausa procedimental para la evaluación de seguridad.',
        hint: 'Tras la parada de emergencia, el sistema necesita un estado de recuperación. Aún no es seguro moverse. ¿Qué modo gestiona el período entre el disparo y la reanudación del movimiento?',
      },
      {
        situation:
          'Usted está en modo Post Trip. El tren está estacionario 40 metros más allá de la señal en peligro. Contacta con el responsable de circulación por radio GSM-R e informa del evento de disparo, dando su posición y número de tren. El responsable comprueba el enclavamiento y confirma que el solape más allá de la señal está libre y no hay ruta conflictiva establecida. El responsable le da autorización verbal para proceder más allá de la señal.',
        question:
          '¿El responsable de circulación ha confirmado que la ruta es segura y le ha autorizado a proceder. Usted solicita moverse hacia adelante en el DMI. A qué modo entrará el sistema?',
        explanation:
          'Después de un disparo, la recuperación estándar es proceder en modo Staff Responsible (SR). El maquinista ha recibido autorización verbal del responsable de circulación y solicita el modo SR en el DMI. En modo SR, ETCS supervisa una velocidad máxima determinada por Valores Nacionales pero el maquinista asume la responsabilidad del movimiento seguro. No se puede entrar en Full Supervision aún porque no hay MA disponible en este punto. Nótese que Staff Responsible no es la única opción post-trip en Nivel 2.',
        hint: 'Tiene una autorización verbal del responsable de circulación pero no una autorización electrónica de movimiento del RBC. ¿Qué modo permite el movimiento bajo responsabilidad del maquinista?',
      },
      {
        situation:
          'Usted procede con precaución a 35 km/h en modo Staff Responsible. Al pasar la siguiente señal (que muestra un aspecto de vía libre), el tren pasa sobre un grupo de balizas que transmite una nueva autorización de movimiento del RBC. La MA incluye una descripción completa de la vía con perfil de velocidad y datos de gradiente para la ruta por delante.',
        question:
          '¿Ha recibido una autorización de movimiento válida con descripción completa de la vía mientras estaba en modo SR. A qué modo transiciona el sistema?',
        explanation:
          'Cuando se recibe una MA válida con descripción completa de la vía en modo Staff Responsible, el sistema transiciona automáticamente a Full Supervision (FS). Este es el camino normal de recuperación: SR es un modo degradado temporal, y recibir una MA adecuada restaura la protección ETCS completa.',
        hint: 'Ahora tiene todo lo necesario para el nivel más alto de supervisión. ¿Cuál es el modo operativo principal de ETCS?',
      },
      {
        situation:
          'Ha completado su viaje con éxito y ha llegado a la estación terminal. El tren está detenido en el andén. Es el final de su misión: debe apagar ETCS y entregar el tren al siguiente maquinista. Cierra el puesto y apaga el equipo ETCS de a bordo.',
        question:
          '¿Está apagando ETCS al final de su misión. El sistema primero vuelve a Stand By al cerrar la misión. Qué ocurre cuando corta la alimentación?',
        explanation:
          'Cuando el equipo ETCS de a bordo se apaga, el sistema entra en modo No Power (NP). Cesan todas las funciones ETCS: sin DMI, sin supervisión, sin comunicación. Este es el estado natural de fin de misión. Isolation (IS) es diferente: es una deshabilitación deliberada de un sistema alimentado mediante el interruptor de aislamiento.',
        hint: 'El equipo no tiene suministro eléctrico. ¿Cuál es el estado no operativo más básico?',
      },
    ],
  },
  'shunting-ops': {
    title: 'Operaciones de maniobras',
    description:
      'Aprenda cómo los trenes transicionan dentro y fuera del modo Shunting para operaciones de patio como acoplar vagones y montar trenes antes de salir al viaje en línea principal.',
    category: 'Operaciones de patio',
    steps: [
      {
        situation:
          'Usted se encuentra en un patio de clasificación. ETCS está en Stand By tras el encendido y la introducción de datos. El controlador de patio le instruye a maniobrar su locomotora hasta el andén 3 para acoplarse con una composición de coches de viajeros. Usted pulsa el botón de solicitud de maniobras en el DMI.',
        question:
          '¿Ha solicitado maniobras desde Stand By. El sistema acepta la solicitud. A qué modo entra ETCS?',
        explanation:
          'Cuando se realiza una solicitud de maniobras desde Stand By, el sistema entra en modo Shunting (SH). En modo SH, ETCS supervisa una velocidad máxima determinada por Valores Nacionales pero no proporciona autorización de movimiento ni protección de ruta. El maquinista es responsable de observar la vía por delante y seguir las instrucciones del controlador de patio.',
        hint: 'Necesita realizar movimientos a baja velocidad en el patio. ¿Qué modo está diseñado específicamente para operaciones de clasificación?',
      },
      {
        situation:
          'Se ha acoplado con éxito a los coches de viajeros y ha completado todos los movimientos de maniobra. El tren está ahora montado y listo para su salida por la línea principal. Usted desactiva el modo de maniobras en el DMI para prepararse para el inicio de la misión en línea principal.',
        question:
          '¿Las maniobras se han completado y ha desactivado el modo de maniobras. A qué modo vuelve el sistema?',
        explanation:
          'Cuando se desactiva el modo de maniobras, el sistema vuelve al modo Stand By (SB). Este es el modo central de acceso: desde aquí, puede validar los datos del tren (que pueden haber cambiado tras el acoplamiento) y prepararse para la misión en línea principal. SB es siempre el paso intermedio entre las maniobras y los modos operacionales.',
        hint: 'Tras las maniobras, el maquinista necesita validar datos y prepararse para la siguiente misión. ¿Qué modo sirve como puerta de acceso a todos los modos operacionales?',
      },
      {
        situation:
          'De vuelta en Stand By, valida los datos del tren actualizados (el tren es ahora más largo con los coches). El nivel ETCS se confirma como Nivel 2 y el RBC establece comunicación. Se recibe una autorización de movimiento válida con descripción completa de la vía para su ruta de salida de la estación.',
        question:
          '¿Los datos del tren están validados y se ha recibido una autorización de movimiento completa. A qué modo transiciona el sistema para la salida por línea principal?',
        explanation:
          'Con la introducción de datos completada, una MA válida y una descripción completa de la vía, el sistema transiciona a Full Supervision (FS). Este es el escenario de salida ideal: el tren tiene todo lo necesario para la máxima protección ETCS en la línea principal.',
        hint: 'Tiene todas las condiciones para el modo operativo más seguro: MA completa y datos de vía completos.',
      },
    ],
  },
  'non-equipped-crossing': {
    title: 'Cruce de áreas no equipadas',
    description:
      'Navegue un trayecto transfronterizo que cruza desde territorio ETCS a vía no equipada, de vuelta a ETCS y luego a un área de sistema nacional de protección del tren.',
    category: 'Operaciones transfronterizas',
    steps: [
      {
        situation:
          'Usted conduce un tren de mercancías transfronterizo a 100 km/h en Full Supervision en una línea principal ETCS Nivel 2. La ruta por delante cruza a un tramo de ramal que no ha sido equipado con equipamiento ETCS de vía. El grupo de balizas anuncia una transición de nivel de Nivel 2 a Nivel 0. No hay balizas ETCS, no hay comunicación con el RBC y no hay sistema nacional de protección del tren en este tramo.',
        question:
          '¿El tren está entrando en un tramo sin equipamiento ETCS de vía (Nivel 0) y sin sistema nacional. A qué modo transiciona ETCS?',
        explanation:
          'Cuando el tren entra en un área sin equipamiento ETCS de vía (Nivel 0) y no hay sistema nacional disponible vía STM, el sistema entra en modo Unfitted (UN). ETCS proporciona solo supervisión básica de velocidad máxima basada en valores nacionales. El maquinista debe seguir las señales laterales y las normas operativas nacionales. STM National (SN) solo se aplicaría si hubiera un sistema nacional presente.',
        hint: 'No hay ETCS de vía ni sistema nacional. La vía está completamente "no equipada." ¿Qué modo gestiona el Nivel 0?',
      },
      {
        situation:
          'Ha circulado por el tramo no equipado durante 20 kilómetros, siguiendo señales laterales y tablas de velocidad. Más adelante, ve el cartel de transición ETCS indicando que está reingresando en un área equipada con ETCS. El tren pasa un grupo de balizas que anuncia una transición de nivel de Nivel 0 a Nivel 2. Sin embargo, el RBC está experimentando congestión y no puede proporcionar inmediatamente una autorización de movimiento.',
        question:
          '¿Está reingresando en un área equipada con ETCS (Nivel 2) pero aún no hay autorización de movimiento disponible del RBC. A qué modo transiciona el sistema?',
        explanation:
          'Al transicionar de un área no equipada a un área equipada con ETCS pero sin una MA válida, el sistema entra en modo Staff Responsible (SR). Este es el recurso seguro: el maquinista confirma el modo SR y procede bajo su propia responsabilidad a la velocidad máxima restringida (40 km/h) hasta que se pueda obtener una MA del RBC.',
        hint: '¿Está en territorio ETCS pero no tiene autorización de movimiento. Qué modo permite el movimiento bajo responsabilidad del maquinista sin MA?',
      },
      {
        situation:
          'Tras unos minutos en Staff Responsible, el RBC resuelve su congestión y envía una autorización de movimiento válida con descripción completa de la vía a través del enlace radio. El equipo de a bordo recibe la MA y verifica su integridad.',
        question:
          '¿Se ha recibido una MA válida con descripción completa de la vía del RBC. A qué modo transiciona el sistema?',
        explanation:
          'Recibir una MA válida con descripción completa de la vía en modo SR activa una transición automática a Full Supervision (FS). Este es el camino normal de mejora: SR es un recurso temporal, y FS proporciona la protección completa para la que está diseñado ETCS.',
        hint: 'Las condiciones son ahora ideales: MA completa, datos de vía completos. ¿Cuál es el modo de supervisión más alto?',
      },
      {
        situation:
          'Más adelante en la ruta, se aproxima a la frontera con el país vecino. Su ferrocarril está protegido por un sistema nacional de protección del tren (PZB). La vía ETCS envía un perfil de modo de sistema nacional, y su tren está equipado con el STM apropiado. Se ordena una transición de nivel de ETCS Nivel 2 a NTC.',
        question:
          '¿El tren está cruzando a un área protegida por un sistema nacional (PZB) vía STM. A qué modo transiciona ETCS?',
        explanation:
          'Cuando el tren entra en un área protegida por un sistema nacional de protección del tren y tiene un STM compatible, ETCS transiciona al modo STM National (SN). El STM asume la supervisión usando las normas y equipamiento del sistema nacional. Esto es distinto del modo Unfitted (UN), que se aplica cuando no hay ningún sistema de protección.',
        hint: 'Hay un sistema nacional de protección del tren presente y el tren tiene el STM para comunicarse con él. ¿Qué modo delega en el sistema nacional?',
      },
    ],
  },
  'system-failure': {
    title: 'Gestión de fallo de sistema',
    description:
      'Gestione un fallo crítico de seguridad del equipo de a bordo: desde la respuesta de emergencia inicial a través del aislamiento, la operación bajo normas nacionales y la eventual recuperación del sistema.',
    category: 'Fallos y recuperación',
    steps: [
      {
        situation:
          'Usted circula a 140 km/h en Full Supervision en una línea de alta velocidad. De repente, el equipo ETCS de a bordo detecta un fallo interno crítico de seguridad: el procesador de odometría ha producido lecturas inconsistentes y el sistema no puede garantizar una medición precisa de la velocidad. El equipo de a bordo determina que ya no puede supervisar el movimiento del tren de forma segura.',
        question:
          '¿ETCS ha detectado un fallo interno crítico de seguridad y no puede garantizar una supervisión segura. A qué modo entra el sistema?',
        explanation:
          'Cuando el equipo ETCS de a bordo detecta un fallo crítico de seguridad que le impide garantizar una supervisión segura, entra en modo System Failure (SF) y aplica inmediatamente el freno de emergencia. Esto es diferente de un Trip (TR), que está causado por una violación de seguridad externa (rebasamiento del EOA). SF significa que el propio sistema está defectuoso y no se puede confiar en él.',
        hint: 'El fallo es interno al propio equipo ETCS. El sistema ha perdido su capacidad de supervisar de forma segura. ¿Qué modo indica un fallo del equipo de a bordo?',
      },
      {
        situation:
          'El freno de emergencia ha detenido el tren en plena vía. El DMI muestra la indicación de System Failure. Usted intenta un ciclo de alimentación: apaga ETCS y lo vuelve a encender. Sin embargo, el autodiagnóstico falla de nuevo: el fallo del procesador de odometría es persistente. ETCS no puede arrancar normalmente. Necesita llevar el tren a la siguiente estación para mantenimiento. Decide utilizar el interruptor físico de aislamiento ETCS.',
        question:
          '¿El fallo es persistente y ETCS no puede reiniciarse. Usted acciona el interruptor físico de aislamiento para deshabilitar ETCS por completo. En qué modo pone esto al sistema?',
        explanation:
          'Accionar el interruptor físico de aislamiento ETCS pone al sistema en modo Isolation (IS). Esto deshabilita deliberadamente todas las funciones ETCS. A diferencia de No Power (NP), donde el sistema simplemente no tiene electricidad, Isolation es una decisión activa del maquinista para retirar ETCS del servicio. El tren operará ahora enteramente bajo normas nacionales sin protección ETCS.',
        hint: 'El maquinista está deshabilitando ETCS deliberadamente usando un interruptor físico. No es un apagado sino un aislamiento activo. ¿Qué modo representa esto?',
      },
      {
        situation:
          'Con ETCS aislado, usted opera el tren solo bajo normas nacionales. Contacta con el responsable de circulación, quien le autoriza a proceder a muy baja velocidad hasta la siguiente estación a 8 km. Conduce con cuidado, observando señales laterales y tablas de velocidad. Llega con seguridad al andén de la estación y el tren se retira del servicio para mantenimiento.',
        question:
          '¿El personal de mantenimiento ha reparado el procesador de odometría y necesita restaurar ETCS. El primer paso es devolver el interruptor de aislamiento a la posición normal. A qué modo entra ETCS cuando se restablece el interruptor de aislamiento?',
        explanation:
          'Cuando el interruptor de aislamiento se devuelve a la posición normal, ETCS transiciona primero al modo No Power (NP). El sistema debe entonces pasar por la secuencia completa de encendido (NP a SB) incluyendo el autodiagnóstico. No salta directamente a Stand By: el restablecimiento del interruptor de aislamiento activa una secuencia de reinicio limpio a través del estado sin alimentación.',
        hint: 'Restablecer el interruptor de aislamiento es como un arranque nuevo. El sistema necesita pasar por su secuencia completa de encendido. ¿Cuál es el estado inicial antes del encendido?',
      },
      {
        situation:
          'El equipo de mantenimiento enciende el equipo ETCS de a bordo. Esta vez, el autodiagnóstico se ejecuta con éxito: el procesador de odometría reparado pasa todas las comprobaciones, se verifica la integridad de la memoria y todos los subsistemas informan estado normal. El DMI se ilumina y muestra la pantalla de introducción de datos.',
        question:
          '¿ETCS se ha encendido y el autodiagnóstico ha pasado tras la reparación. A qué modo entra el sistema?',
        explanation:
          'Tras un encendido y autodiagnóstico exitosos, ETCS siempre entra en modo Stand By (SB), independientemente de lo que haya ocurrido antes. Esta es la secuencia de arranque estándar: NP a SB. Desde Stand By, se puede iniciar una nueva misión con una nueva introducción de datos. El sistema se ha restaurado completamente a la operación normal.',
        hint: 'Esta es la secuencia estándar de encendido. Tras el autodiagnóstico, el sistema espera la introducción de datos del maquinista en ¿qué modo?',
      },
    ],
  },
  'multiple-traction': {
    title: 'Operaciones de tracción múltiple',
    description:
      'Comprenda cómo ETCS gestiona trenes con múltiples unidades de tracción: configurar una locomotora como Non Leading, operar en una composición y luego reconfigurar para operación independiente.',
    category: 'Operaciones especiales',
    steps: [
      {
        situation:
          'Usted está en la cabina de una segunda locomotora que se va a acoplar a la cola de un tren de mercancías pesado. La locomotora de cabeza ya tiene su ETCS en Full Supervision y controlará el tren. Su locomotora proporcionará tracción adicional pero no debe emitir comandos de freno conflictivos ni mantener una autorización de movimiento separada. Usted selecciona "Non Leading" en el DMI.',
        question:
          '¿Ha configurado este ETCS como Non Leading porque otra locomotora está al mando. A qué modo entra el sistema?',
        explanation:
          'Cuando el maquinista selecciona Non Leading, el sistema entra en modo Non Leading (NL). En este modo, ETCS está activo y consciente de su estado pero no mantiene una MA, no emite comandos de freno y no supervisa la velocidad. Esto previene controles conflictivos entre múltiples unidades ETCS en el mismo tren. Sleeping (SL) es diferente: es para una cabina inactiva, no para una unidad no líder con maquinista.',
        hint: 'Esta unidad tiene maquinista pero no es la unidad de control. Necesita estar activa pero pasiva. ¿Qué modo es para una unidad de tracción no líder con maquinista?',
      },
      {
        situation:
          'El tren de mercancías completa su trayecto. En el patio de destino, las locomotoras se desacoplan. Su locomotora es ahora independiente y necesita operar de forma autónoma para su siguiente misión: un movimiento de locomotora aislada hasta el depósito. Usted reconfigura la cabina como unidad líder seleccionando la opción apropiada en el DMI.',
        question:
          '¿Está reconfigurando esta locomotora como unidad líder para operación independiente. A qué modo transiciona ETCS?',
        explanation:
          'Cuando una unidad Non Leading se convierte en la unidad líder, ETCS transiciona al modo Stand By (SB). Esto permite al maquinista introducir o validar los datos del tren para la nueva misión (los datos del tren serán diferentes ahora: locomotora sola en lugar de composición completa). Stand By es siempre la puerta de acceso para iniciar una nueva misión.',
        hint: 'La locomotora es ahora independiente y necesita iniciar una nueva misión. ¿Cuál es el modo de acceso donde se realiza la introducción de datos?',
      },
      {
        situation:
          'Actualiza los datos del tren para el movimiento de locomotora aislada (longitud mucho más corta, diferentes características de frenado). ETCS establece una nueva sesión con el RBC y recibe una autorización de movimiento con descripción de vía para la ruta al depósito.',
        question:
          '¿Los datos del tren están validados y se ha recibido una autorización de movimiento con descripción completa de la vía para el trayecto al depósito. A qué modo entra el sistema?',
        explanation:
          'Con los datos del tren validados, una MA válida y una descripción completa de la vía, el sistema transiciona a Full Supervision (FS). Este es el inicio de misión estándar con protección ETCS completa, la misma transición independientemente de si el tren estaba previamente en modo NL o cualquier otro modo. Stand By siempre proporciona un inicio limpio.',
        hint: 'Tiene todos los datos necesarios para la protección máxima: MA, perfil de velocidad, gradiente. ¿Cuál es el modo operativo más seguro?',
      },
    ],
  },
};
