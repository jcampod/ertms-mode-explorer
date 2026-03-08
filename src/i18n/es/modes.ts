import type { ModeTranslation } from '../types';

export const esModes: Record<string, ModeTranslation> = {
  NP: {
    name: 'Sin alimentación',
    description:
      'El ordenador de a bordo está apagado. No funciona nada: ni pantalla, ni protección, ni comunicación. Como un coche con el contacto quitado.',
    detailedDescription:
      'Todas las funciones ETCS están inactivas: no hay supervisión de velocidad, no hay comunicación con la vía, no hay visualización en el DMI y no hay comandos de freno. El tren aún puede moverse bajo las normas nacionales de operación o señales físicas, pero ETCS no proporciona ninguna protección. Se entra en este modo cuando la cabina se desactiva o se desconecta la alimentación principal. La transición a Stand By (SB) se produce cuando el maquinista enciende el ETCS y el sistema completa su autodiagnóstico.',
    speedLimit: null,
    driverResponsibility:
      'Responsabilidad total bajo normas nacionales. ETCS no proporciona protección ni información.',
    realWorldContext:
      'Este es el estado del tren cuando está estacionado en un depósito durante la noche, o cuando una locomotora está aparcada con todos los sistemas apagados. También ocurre durante la fase inicial antes de que un maquinista comience su turno y encienda la cabina.',
    keyCharacteristics: [
      'No hay funciones ETCS disponibles',
      'No hay supervisión de velocidad ni intervención de freno',
      'El DMI está inactivo y apagado',
      'No hay comunicación con el RBC ni lectores de balizas',
      'El movimiento del tren se rige enteramente por las normas nacionales',
    ],
  },
  SB: {
    name: 'En espera',
    description:
      'El sistema se acaba de iniciar y ha pasado sus comprobaciones. Ahora espera a que el maquinista introduzca su identificación y los datos del tren antes de poder iniciar el viaje. Este es el punto de partida para todo.',
    detailedDescription:
      'Stand By es el estado inicial después del encendido de ETCS y la finalización exitosa del autodiagnóstico. El DMI está activo y muestra pantallas de introducción de datos. El maquinista debe introducir o validar su identificación, el número de circulación del tren y los datos del tren (longitud, características de frenado, velocidad máxima, categoría de carga por eje, etc.). El sistema determina el nivel ETCS y, en el caso de Nivel 2/3, intenta establecer comunicación con el Centro de Bloqueo por Radio (RBC). No existe autorización de movimiento (MA): el tren debe permanecer estacionario. Desde SB, el tren puede transicionar a Full Supervision (MA obtenida), Staff Responsible (sin MA disponible), Shunting, Sleeping, Non Leading u otros modos según la situación.',
    speedLimit: '0 km/h (el tren debe estar estacionario)',
    driverResponsibility:
      'Introducir/validar la identificación del maquinista, los datos del tren y confirmar el nivel ETCS. Asegurarse de que el tren está estacionario.',
    realWorldContext:
      'Un maquinista que llega a un depósito sube a la cabina, enciende el tren y realiza el procedimiento de introducción de datos en la pantalla del DMI. Esto ocurre al inicio de cada misión y después de ciertos procedimientos de recuperación.',
    keyCharacteristics: [
      'DMI activo mostrando campos de introducción de datos',
      'Autodiagnóstico completado con éxito',
      'No se ha otorgado autorización de movimiento',
      'Se requiere la introducción/validación de datos del tren',
      'Modo de acceso a todos los modos operacionales y especiales',
    ],
  },
  SH: {
    name: 'Maniobras',
    description:
      'El tren se mueve lentamente en un patio de maniobras: acoplando vagones, reposicionando o montando un tren. La velocidad está limitada a 30 km/h, pero el maquinista debe vigilar la vía por sí mismo porque ETCS no comprueba la ruta.',
    detailedDescription:
      'El modo Shunting se utiliza para movimientos a baja velocidad en patios: montaje/división de trenes, posicionamiento de vagones y operaciones de clasificación. ETCS proporciona supervisión de velocidad máxima (normalmente 30 km/h, configurable según valor nacional) pero no emite ni supervisa una autorización de movimiento (MA). No hay protección contra rutas conflictivas ni vía ocupada. El maquinista debe comprobar visualmente que el camino está libre y seguir las señales manuales o las instrucciones locales de maniobra. En Nivel 2/3, la sesión de comunicación con el RBC puede liberarse. El principio clave de seguridad es que la velocidad está limitada pero la seguridad de la ruta es responsabilidad del maquinista.',
    speedLimit: '30 km/h (el valor nacional puede ser diferente)',
    driverResponsibility:
      'Responsabilidad total de la seguridad de la ruta, detección de obstáculos y cumplimiento de las instrucciones locales de maniobra.',
    realWorldContext:
      'Se utiliza en patios de clasificación y depósitos al acoplar/desacoplar vagones, reposicionar trenes en apartaderos o mover una locomotora al otro extremo del tren. Es habitual al inicio y al final del viaje de un tren en estaciones terminales.',
    keyCharacteristics: [
      'Velocidad máxima supervisada a 30 km/h (por defecto)',
      'Sin autorización de movimiento ni protección de ruta por ETCS',
      'El maquinista es responsable de la ruta y la ausencia de obstáculos',
      'Puede iniciarse por solicitud del maquinista u orden de vía',
      'La sesión con el RBC puede liberarse en Nivel 2/3',
    ],
  },
  FS: {
    name: 'Supervisión completa',
    description:
      'Este es el modo principal: el sistema se encarga completamente de la seguridad. Sabe a qué velocidad puede ir el tren, dónde debe detenerse y frenará automáticamente si es necesario. La forma más segura de circular.',
    detailedDescription:
      'Full Supervision es el modo operativo estándar y proporciona el nivel más alto de seguridad. La unidad de a bordo dispone de una autorización de movimiento (MA) válida que define el límite de circulación segura (Fin de Autorización, EOA). También cuenta con la descripción completa de la vía: perfil de velocidad estática (velocidad de línea, restricciones temporales de velocidad), perfil de gradiente (para el cálculo de curvas de frenado) e información del perfil de modo. El sistema calcula continuamente la velocidad permitida, la velocidad de aviso y las curvas de intervención. Si el maquinista supera la velocidad permitida, se producen intervenciones graduales: indicación, aviso, freno de servicio y freno de emergencia. En Nivel 2/3, la MA proviene vía radio del RBC; en Nivel 1, vía Eurobaliza o Euroloop.',
    speedLimit: 'Según perfil de velocidad estática y MA (hasta velocidad de línea)',
    driverResponsibility:
      'Conducir dentro de la velocidad permitida. Responder a las indicaciones del DMI. ETCS proporciona protección completa.',
    realWorldContext:
      'La condición operativa normal para la circulación en líneas principales equipadas con ETCS de alta velocidad y convencionales. Así es como circulan los trenes en líneas como el AVE Madrid-Barcelona, el Túnel de Base del Gotardo o las líneas principales danesas bajo ETCS Nivel 2.',
    keyCharacteristics: [
      'Supervisión continua de velocidad contra MA y perfil de velocidad',
      'Intervención de freno de emergencia si se corre riesgo de rebasar el EOA',
      'Descripción completa de la vía (gradiente, restricciones de velocidad) disponible',
      'Curvas de frenado calculadas con datos específicos del tren',
      'Nivel más alto de protección de seguridad ETCS',
    ],
  },
  LS: {
    name: 'Supervisión limitada',
    description:
      'Como Full Supervision, pero el sistema dispone de información menos detallada sobre la vía por delante. Aún protege el tren, pero utiliza valores por defecto más seguros donde faltan datos. Un paso intermedio para líneas en proceso de equipamiento con ETCS.',
    detailedDescription:
      'Limited Supervision proporciona una autorización de movimiento y supervisión de velocidad, pero con información de vía menos detallada que FS. El equipo de a bordo tiene una MA con un EOA, por lo que el tren está protegido contra el rebasamiento de su autorización. Sin embargo, la descripción de la vía puede ser incompleta: los perfiles de gradiente pueden estar ausentes y algunas restricciones de velocidad pueden basarse en valores nacionales por defecto en lugar de datos precisos de infraestructura. Los cálculos de curvas de frenado pueden usar parámetros por defecto conservadores, lo que potencialmente resulta en perfiles de velocidad más restrictivos (pero igualmente seguros). LS se introdujo para permitir la migración gradual de sistemas nacionales a ETCS completo, habilitando un despliegue temprano con un esfuerzo reducido de implementación en vía.',
    speedLimit: 'Según MA y perfil de velocidad disponible (pueden aplicarse valores nacionales)',
    driverResponsibility:
      'Conducir dentro de la velocidad supervisada. Tener en cuenta que la supervisión puede ser menos precisa que en Full Supervision.',
    realWorldContext:
      'Se utiliza en líneas que están siendo migradas a ETCS pero donde los datos de vía (por ejemplo, perfiles de gradiente, restricciones detalladas de velocidad) aún no están completamente proyectados. Permite un despliegue temprano de ETCS con un esfuerzo de implementación reducido.',
    keyCharacteristics: [
      'MA válida con supervisión de EOA',
      'Descripción de vía reducida en comparación con Full Supervision',
      'Algunos parámetros utilizan valores nacionales por defecto',
      'Diseñado para la migración gradual desde sistemas nacionales',
      'Las curvas de frenado pueden ser más conservadoras debido a datos incompletos',
    ],
  },
  OS: {
    name: 'Marcha a la vista',
    description:
      'Proceda con precaución: puede haber algo en la vía por delante (otro tren, un obstáculo). La velocidad está limitada a 30 km/h y el maquinista debe estar preparado para detenerse en cualquier momento según lo que pueda ver.',
    detailedDescription:
      'El modo On Sight se utiliza cuando la vía no puede garantizar que el tramo por delante está libre. Esto ocurre típicamente cuando los circuitos de vía o contadores de ejes han fallado, cuando un tramo necesita inspección visual o cuando el enclavamiento ha establecido una ruta con ocupación conocida por delante. ETCS supervisa una velocidad máxima (normalmente 30 km/h) y el maquinista debe estar preparado para detenerse ante cualquier obstáculo visible. El modo se activa por un perfil de modo OS desde la vía, normalmente integrado en la MA. El equipo de a bordo continúa supervisando la MA/EOA además de la velocidad máxima de OS. Una vez que se pasa la zona OS, el sistema transiciona de vuelta a Full Supervision.',
    speedLimit: '30 km/h (el valor nacional puede ser diferente)',
    driverResponsibility:
      'Conducir a la vista. Estar preparado para detenerse dentro de la distancia visible. Atención total a la vía por delante.',
    realWorldContext:
      'Es habitual al entrar en una zona de estación donde la detección de vía ha fallado parcialmente, o cuando un tren debe pasar por un tramo tras la pérdida de detección de un tren precedente. También se usa para movimientos hacia andenes ocupados o zonas de depósito.',
    keyCharacteristics: [
      'Velocidad máxima supervisada a 30 km/h (por defecto)',
      'La vía por delante puede estar ocupada u obstruida',
      'El maquinista debe estar preparado para detenerse a la vista',
      'Activado por perfil de modo OS desde la vía',
      'La MA/EOA sigue supervisada además de la velocidad máxima',
    ],
  },
  SR: {
    name: 'Responsabilidad del personal',
    description:
      'El sistema no puede dar al tren una ruta adecuada, así que el maquinista toma el mando. El responsable de circulación llama por radio y dice "de acuerdo, puede circular." La velocidad está limitada a 40 km/h. Este es el recurso cuando las cosas no funcionan con normalidad.',
    detailedDescription:
      'Staff Responsible es el modo de reserva utilizado cuando ETCS no puede proporcionar una autorización de movimiento pero el tren necesita moverse. Escenarios típicos: fallo de comunicación con el RBC, avería del lector de balizas, datos de vía ausentes o inicio desde un área no equipada. El responsable de circulación autoriza al maquinista mediante orden verbal, autorización escrita o procedimiento nacional. ETCS supervisa una velocidad máxima (por defecto 40 km/h) mientras el maquinista asume la responsabilidad de señales, restricciones de velocidad y condiciones de la ruta. El maquinista debe confirmar la entrada en modo SR en el DMI. Si posteriormente se recibe una MA válida, el sistema transiciona a Full Supervision. SR es fundamental para la resiliencia operativa: los trenes pueden seguir moviéndose de forma segura incluso con infraestructura degradada.',
    speedLimit: '40 km/h (el valor nacional puede ser diferente)',
    driverResponsibility:
      'Responsabilidad total del movimiento seguro bajo autorización del responsable de circulación. Observar señales y restricciones de velocidad.',
    realWorldContext:
      'Se utiliza cuando un maquinista recibe una orden verbal para rebasar una señal en peligro, al iniciar una misión sin MA disponible o cuando se pierde la comunicación con el RBC pero el responsable de circulación autoriza el movimiento. Muy habitual en operaciones degradadas.',
    keyCharacteristics: [
      'Sin autorización de movimiento de ETCS',
      'Velocidad máxima supervisada a 40 km/h (por defecto)',
      'Maquinista autorizado por el responsable de circulación (verbal/escrito)',
      'Modo de reserva crítico para operaciones degradadas',
      'Transiciona a FS al recibir una MA válida',
    ],
  },
  UN: {
    name: 'No equipado',
    description:
      'El tren ha entrado en un tramo de vía que no tiene equipamiento ETCS en absoluto. El sistema solo puede limitar la velocidad máxima; todo lo demás depende del maquinista y las señales antiguas a lo largo de la vía.',
    detailedDescription:
      'El modo Unfitted se utiliza en vía sin equipamiento ETCS de vía (ETCS Nivel 0). El equipo de a bordo proporciona solo supervisión básica: una velocidad máxima basada en el valor nacional para áreas no equipadas, más la velocidad máxima propia del tren. No hay MA, ni perfil de velocidad de vía, ni comunicación con el RBC. El maquinista opera según las normas nacionales de señalización (señales laterales, tablas de velocidad, procedimientos operacionales). Si un sistema nacional de protección del tren (por ejemplo, PZB, ASFA, KVB, TPWS) está disponible vía STM, el tren transiciona al modo SN en su lugar. El modo Unfitted es habitual durante operaciones transfronterizas al pasar de una línea equipada a un tramo no equipado.',
    speedLimit: 'Según valor nacional para áreas no equipadas',
    driverResponsibility:
      'Responsabilidad total bajo normas nacionales de señalización. ETCS proporciona solo supervisión de velocidad máxima.',
    realWorldContext:
      'Ocurre cuando un tren equipado con ETCS circula por un ramal o ruta antigua que no tiene infraestructura ETCS de vía. También es habitual durante transiciones transfronterizas entre redes equipadas y no equipadas.',
    keyCharacteristics: [
      'No hay equipamiento ETCS de vía presente (Nivel 0)',
      'Solo supervisión básica de velocidad máxima',
      'Sin MA, sin descripción de vía de ETCS',
      'El maquinista sigue la señalización y normas nacionales',
      'Los trenes equipados con STM usan el modo SN si el sistema nacional está disponible',
    ],
  },
  SN: {
    name: 'STM Nacional',
    description:
      'El tren ha cruzado a un área con un sistema de protección del tren de otro país. ETCS transfiere el control a ese sistema nacional a través de un adaptador especial (STM). El sistema local antiguo protege ahora el tren.',
    detailedDescription:
      'El modo STM National permite que un tren ETCS opere bajo un sistema nacional de protección del tren heredado a través de un Módulo de Transmisión Específica (STM). El STM conecta el equipamiento de vía del sistema nacional (balizas nacionales, imanes de vía, lazos inductivos) a la arquitectura de a bordo ETCS. El STM proporciona supervisión de velocidad, interpretación de señales y comandos de freno según las normas nacionales. El equipo de a bordo ETCS coordina el estado general pero delega la protección al STM. El DMI puede mostrar indicaciones específicas del sistema nacional. Esto es esencial para la interoperabilidad transfronteriza: un tren puede transicionar de Full Supervision ETCS a un sistema nacional (PZB en Alemania, KVB en Francia, ASFA en España, SCMT en Italia) al cruzar de una línea ETCS a una línea protegida nacionalmente.',
    speedLimit: 'Según supervisión del sistema nacional',
    driverResponsibility:
      'Seguir las indicaciones y normas del sistema nacional. ETCS coordina pero el sistema nacional supervisa.',
    realWorldContext:
      'Esencial para trenes transfronterizos en Europa. Por ejemplo, un tren Thalys o ICE que circula desde un tramo ETCS Nivel 2 a un área protegida por el sistema nacional (PZB, KVB, TVM, etc.) del país adyacente.',
    keyCharacteristics: [
      'Sistema nacional de protección del tren activo vía STM',
      'ETCS delega la supervisión al sistema nacional',
      'Esencial para la interoperabilidad transfronteriza',
      'El DMI puede mostrar información específica del sistema nacional',
      'Activado por perfil de modo del sistema nacional desde la vía',
    ],
  },
  SL: {
    name: 'Dormido',
    description:
      'Esta unidad ETCS está encendida pero otra persona está conduciendo. Otra cabina u otro sistema de a bordo está al mando. Esta simplemente permanece en silencio en segundo plano.',
    detailedDescription:
      'El modo Sleeping se activa cuando el equipo de a bordo ETCS reconoce que no es la unidad líder activa. Esto ocurre cuando un tren tiene múltiples unidades ETCS y solo una está designada como líder, cuando la cabina trasera de un tren push-pull está alimentada pero no en uso, o cuando una locomotora está acoplada pero otra unidad está conduciendo. En modo Sleeping, el equipo de a bordo mantiene su estado interno (datos del tren, posición) pero no realiza supervisión activa: sin comandos de freno, sin comunicación con el RBC para MAs y sin supervisión operacional en el DMI. La transición de Sleeping a Stand By ocurre cuando el maquinista activa esta cabina como la unidad líder.',
    speedLimit: null,
    driverResponsibility:
      'No hay conducción activa desde esta cabina. Otra unidad está al mando.',
    realWorldContext:
      'La cabina trasera de un tren de cercanías push-pull tiene su ETCS en modo Sleeping mientras el maquinista opera desde la cabina delantera. También se aplica a una locomotora de refuerzo o una unidad sin servicio siendo remolcada.',
    keyCharacteristics: [
      'ETCS alimentado pero sin supervisar activamente',
      'Esta unidad no emite comandos de freno',
      'Otra unidad ETCS o cabina está al mando',
      'Se mantiene el estado interno (datos del tren, posición)',
      'Transiciona a SB cuando esta cabina se convierte en líder',
    ],
  },
  TR: {
    name: 'Disparo',
    description:
      '¡Emergencia! El tren ha pasado un punto donde debía haberse detenido (o se detectó algo peligroso). Los frenos se activan automáticamente y el tren debe detenerse por completo. Este es el "botón de pánico" de ETCS.',
    detailedDescription:
      'Trip es la respuesta de emergencia de ETCS ante una situación potencialmente peligrosa. Se activa cuando el tren rebasa el Fin de Autorización (EOA), cuando un grupo de balizas ordena un disparo o cuando se detectan otras condiciones críticas para la seguridad (por ejemplo, rebasar una señal de parada en Nivel 1). ETCS ordena inmediatamente una aplicación completa del freno de emergencia. El DMI muestra la indicación de Trip. No se permite ningún movimiento adicional hasta que el maquinista confirme el disparo y se cumplan condiciones específicas de recuperación. El Trip representa la última línea de defensa del sistema contra una colisión o descarrilamiento. La severidad es deliberada: el frenado de emergencia y el posterior procedimiento de recuperación Post Trip garantizan que se restablezcan las condiciones de seguridad. Cada evento de Trip se registra y puede requerir investigación.',
    speedLimit: '0 km/h (freno de emergencia hasta detención completa)',
    driverResponsibility:
      'Permitir que el tren se detenga. No intentar moverse. Confirmar el disparo y contactar con el responsable de circulación.',
    realWorldContext:
      'Ocurre si un maquinista calcula mal la frenada y rebasa el EOA, si un fallo de comunicación provoca que la MA expire en un momento inoportuno, o si la vía dispara deliberadamente el tren debido a un conflicto detectado. Es un evento operativo grave que siempre se investiga.',
    keyCharacteristics: [
      'Freno de emergencia aplicado inmediata y automáticamente',
      'Activado por rebasamiento del EOA o evento crítico de seguridad',
      'El tren debe detenerse por completo',
      'No se permite movimiento hasta que se confirme y se recupere',
      'Transiciona a Post Trip tras detención y confirmación del maquinista',
    ],
  },
  PT: {
    name: 'Post Disparo',
    description:
      'La parada de emergencia ha terminado y el maquinista ha pulsado "confirmar." Ahora el tren permanece quieto mientras el maquinista llama al responsable de circulación para decidir qué hacer a continuación. Nadie se mueve hasta que acuerden un plan.',
    detailedDescription:
      'Post Trip se activa después de un evento de Trip una vez que el tren se ha detenido y el maquinista ha confirmado el disparo en el DMI. ETCS impide cualquier movimiento hacia adelante más allá del punto de detención. El maquinista debe contactar con el responsable de circulación para informar del disparo y recibir instrucciones. El responsable de circulación puede autorizar al maquinista a proceder en modo Staff Responsible, solicitar un movimiento de maniobra u otras instrucciones. En Nivel 2/3, el equipo de a bordo puede intentar restablecer la comunicación con el RBC y solicitar una nueva MA. Post Trip proporciona una pausa procedimental: tanto el maquinista como el responsable de circulación deben evaluar la situación antes de que el tren se mueva de nuevo. Puede ser posible un movimiento de retroceso limitado si está autorizado.',
    speedLimit: '0 km/h (detenido, puede ser posible retroceso limitado)',
    driverResponsibility:
      'Contactar con el responsable de circulación. Informar del evento de disparo. Esperar autorización antes de cualquier movimiento.',
    realWorldContext:
      'Después de un evento de disparo en una señal de estación, el maquinista contacta con el responsable de circulación por radio, explica la situación y el responsable puede emitir una autorización verbal para proceder en modo SR pasando la señal en peligro, o puede solicitar que el tren retroceda para liberar el solape.',
    keyCharacteristics: [
      'Se activa después del disparo y detención del tren',
      'El maquinista debe confirmar el disparo en el DMI',
      'No se permite movimiento hacia adelante sin autorización',
      'El maquinista debe contactar con el responsable de circulación para instrucciones',
      'Normalmente transiciona a SR o SH bajo autorización del responsable de circulación',
    ],
  },
  SF: {
    name: 'Fallo de sistema',
    description:
      'El ordenador del tren se ha bloqueado o ha detectado un error interno grave. Ya no se puede confiar en él para mantener la seguridad del tren, así que activa el freno de emergencia y se apaga. El maquinista debe recurrir a las normas tradicionales.',
    detailedDescription:
      'System Failure se activa cuando el equipo de a bordo ETCS detecta un fallo que compromete su capacidad de supervisar el tren de forma segura: fallo de hardware (procesador, memoria, sensor), error de software o fallo en la comprobación de consistencia interna. El sistema ordena una aplicación del freno de emergencia. El DMI indica el fallo. ETCS ya no puede proporcionar ninguna supervisión, por lo que el maquinista debe operar bajo las normas y procedimientos nacionales para el movimiento sin protección del tren. La recuperación normalmente requiere un ciclo de alimentación (apagar y volver a encender, pasando por NP a SB). Si el fallo persiste, ETCS debe aislarse (modo IS) y el tren debe operarse sin protección o retirarse del servicio. Es un evento raro pero crítico.',
    speedLimit: '0 km/h (freno de emergencia aplicado)',
    driverResponsibility:
      'Seguir las normas nacionales para movimiento sin ETCS. Informar del fallo. Puede ser necesario aislar ETCS.',
    realWorldContext:
      'Un evento raro que podría ocurrir por fallo de hardware del ordenador de a bordo, software corrupto o avería de sensores (por ejemplo, fallo de odometría, fallo del JRU). El tren normalmente se retiene hasta que el personal de mantenimiento pueda evaluar el fallo.',
    keyCharacteristics: [
      'Fallo crítico de seguridad en el equipo de a bordo detectado',
      'Freno de emergencia aplicado automáticamente',
      'ETCS ya no puede garantizar supervisión segura',
      'El maquinista debe recurrir a las normas operativas nacionales',
      'La recuperación requiere ciclo de alimentación o aislamiento de ETCS',
    ],
  },
  IS: {
    name: 'Aislamiento',
    description:
      'El maquinista ha desactivado deliberadamente ETCS mediante un interruptor físico. El sistema está completamente deshabilitado, como desenchufarlo. Se utiliza cuando ETCS está averiado y no se puede reparar en el acto.',
    detailedDescription:
      'El modo Isolation se activa cuando el maquinista acciona el interruptor físico de aislamiento ETCS para deshabilitar completamente el equipo de a bordo. Es una acción deliberada. Una vez aislado, ETCS no proporciona supervisión, no hay indicación en el DMI (o muestra una indicación de aislamiento), no hay comandos de freno ni comunicación con la vía. El tren opera enteramente bajo las normas nacionales y cualquier sistema nacional independiente de protección del tren. Isolation se utiliza cuando ETCS tiene un fallo persistente que no se puede resolver, durante el mantenimiento o en escenarios específicos donde ETCS debe deshabilitarse. El interruptor de aislamiento es típicamente un interruptor de llave físico para prevenir activaciones accidentales. Para salir, el maquinista devuelve el interruptor a la posición normal, lo que desencadena una secuencia de encendido y reinicio del sistema.',
    speedLimit: null,
    driverResponsibility:
      'Responsabilidad total bajo normas nacionales. No hay protección ETCS disponible. Debe accionar el interruptor de aislamiento.',
    realWorldContext:
      'Se utiliza cuando el ETCS de a bordo tiene un fallo persistente y el tren necesita continuar hasta la instalación de mantenimiento más cercana. También se usa durante pruebas y actividades de mantenimiento del equipo de a bordo en talleres.',
    keyCharacteristics: [
      'ETCS deshabilitado deliberadamente por el maquinista mediante interruptor físico',
      'No hay funciones ETCS disponibles',
      'Utilizado para fallos persistentes o mantenimiento',
      'Interruptor de llave físico previene activación accidental',
      'La salida requiere restablecer el interruptor y reinicio completo del sistema',
    ],
  },
  NL: {
    name: 'No líder',
    description:
      'Esta locomotora forma parte del tren pero no es la que está al mando. Otra unidad en la parte delantera está conduciendo y realizando las comprobaciones de seguridad. Esta simplemente sigue en silencio.',
    detailedDescription:
      'El modo Non Leading se utiliza cuando una unidad con tracción y ETCS forma parte de una composición pero no está controlando el movimiento. Es habitual en tracción múltiple (dos o más locomotoras acopladas) u operaciones push-pull donde la locomotora trasera tiene ETCS activo pero la cabina delantera está al mando. El equipo de a bordo está activo y consciente de su estado pero no solicita ni mantiene una MA, y no emite comandos de freno basados en la supervisión ETCS. La cabina en NL normalmente tiene una visualización reducida en el DMI. NL asegura que solo un equipo de a bordo ETCS en una composición esté supervisando activamente en cada momento, previniendo comandos de freno o gestión de autorización conflictivos.',
    speedLimit: null,
    driverResponsibility:
      'Solo monitorización. No hay responsabilidad de conducción activa desde esta unidad. La unidad líder controla el tren.',
    realWorldContext:
      'Un tren de mercancías remolcado por dos locomotoras acopladas: la locomotora delantera está en modo FS mientras que el ETCS de la locomotora trasera está en modo NL. También se usa para el coche motor trasero de un tren push-pull de alta velocidad.',
    keyCharacteristics: [
      'La unidad no es la tracción líder en la composición',
      'No se mantiene ni solicita autorización de movimiento',
      'Esta unidad no emite comandos de freno ETCS',
      'Previene supervisión conflictiva en trenes de múltiples unidades',
      'Transiciona a SB al convertirse en la unidad líder',
    ],
  },
  RV: {
    name: 'Retroceso',
    description:
      'El tren necesita ir hacia atrás una corta distancia, quizá porque pasó de largo un andén o necesita evacuar un túnel. ETCS vigila la velocidad y la distancia para asegurarse de que no vaya demasiado lejos.',
    detailedDescription:
      'El modo Reversing permite un movimiento controlado hacia atrás bajo supervisión ETCS. El maquinista está autorizado (a través de información de vía o un procedimiento ETCS específico) a retroceder una distancia limitada a una velocidad limitada. ETCS monitoriza que el tren no supere la velocidad de retroceso autorizada ni recorra más de la distancia autorizada. El DMI muestra el estado de retroceso y la distancia restante. Se usa para retroceder hasta un andén después de pasarse, retirarse de un punto de peligro o evacuación de emergencia (por ejemplo, retroceder fuera de un túnel). Los parámetros de retroceso se definen por los datos de vía o valores nacionales. Una vez completado, el tren transiciona a otro modo (normalmente Post Trip o Full Supervision). Esto no es para circulación bidireccional regular.',
    speedLimit: '30 km/h (según parámetros del área de retroceso)',
    driverResponsibility:
      'Controlar el movimiento de retroceso dentro de la velocidad y distancia autorizadas. Monitorizar el DMI para la distancia restante.',
    realWorldContext:
      'Un tren se pasa de largo en un andén de una estación terminal y necesita retroceder. O un tren en un túnel durante una emergencia debe retroceder hasta la entrada del túnel para la evacuación de pasajeros. También se usa en cruces específicos.',
    keyCharacteristics: [
      'Movimiento de retroceso controlado bajo supervisión ETCS',
      'Límites de velocidad y distancia aplicados',
      'Utilizado para recuperación operativa y escenarios de emergencia',
      'Requiere autorización específica de la vía',
      'No es para circulación bidireccional regular',
    ],
  },
  AD: {
    name: 'Conducción automática',
    description:
      'ATO (Operación Automática de Trenes) está al mando. El tren se conduce solo: acelerando, frenando y parando en estaciones automáticamente, mientras ETCS sigue vigilando todo para garantizar la seguridad. Añadido en la Baseline 4.',
    detailedDescription:
      'Automatic Driving es un nuevo modo ETCS introducido en la Baseline 4 (CCS TSI 2023) específicamente para la operación ATO sobre ETCS. Se entra desde Full Supervision cuando el maquinista (GoA 2) o el sistema (GoA 3/4) activa ATO. En este modo, el sistema ATO de a bordo controla la tracción, el frenado y la marcha por inercia según un Perfil de Viaje recibido del ATO de vía. ETCS continúa proporcionando supervisión completa de seguridad: la Autorización de Movimiento, el perfil de velocidad y las curvas de frenado siguen aplicándose. Si los comandos de ATO violaran cualquier restricción ETCS, la capa de seguridad interviene con frenado de servicio o de emergencia. El maquinista puede desactivar ATO en cualquier momento, volviendo a Full Supervision. Si ETCS detecta una condición crítica de seguridad (por ejemplo, aproximación al EOA), anula ATO automáticamente.',
    speedLimit: 'Según perfil de velocidad estática y MA (ATO optimiza dentro de la envolvente ETCS)',
    driverResponsibility:
      'GoA 2: Monitorizar la operación ATO, gestionar puertas y salida, puede anular en cualquier momento. GoA 3/4: Rol del maquinista reducido o inexistente.',
    realWorldContext:
      'Actualmente en pruebas piloto en líneas como Thameslink (Reino Unido) y varios sistemas de metro europeos. Este modo permite una conducción energéticamente eficiente y optimizada según horario, manteniendo la protección de seguridad ETCS completa. Se espera que se convierta en estándar para servicios urbanos y suburbanos de alta frecuencia.',
    keyCharacteristics: [
      'ATO controla tracción, frenado e inercia automáticamente',
      'ETCS mantiene supervisión completa de seguridad (MA, velocidad, curvas de frenado)',
      'El Perfil de Viaje del ATO de vía guía la optimización de velocidad',
      'El maquinista puede desactivar ATO en cualquier momento (vuelve a FS)',
      'Introducido en ETCS Baseline 4 / CCS TSI 2023',
    ],
  },
};
