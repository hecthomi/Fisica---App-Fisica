/* =========================================================
   FÍSICA · PLATAFORMA EDUCATIVA
   Contenido, progreso del estudiante y navegación del panel.

   Este archivo se encarga de:
     1. El contenido (temas, preguntas, simuladores, logros, retos)
     2. Los datos del estudiante, guardados en el propio equipo
     3. Las vistas del panel y los botones del menú lateral

   feria-script.js sigue encargándose del registro, el fondo
   animado, el menú y el cambio de tema.
   ========================================================= */

(function () {

    'use strict';


    /* =========================================================
       1. CONTENIDO
       ========================================================= */

    const TEMAS = [

        {
            id: 'mecanica',
            titulo: 'Mecánica Clásica',
            dibujo: 'mechanics',
            resumen: 'Leyes del movimiento, fuerzas y energía.',
            teoria: [
                {
                    t: 'El movimiento',
                    p: 'Un cuerpo se mueve cuando cambia de posición respecto a un punto de referencia. La rapidez media es la distancia recorrida dividida entre el tiempo empleado, y la aceleración es el cambio de velocidad en cada segundo. Un carro que pasa de 0 a 20 m/s en 5 segundos tiene una aceleración de 4 m/s².'
                },
                {
                    t: 'Las tres leyes de Newton',
                    p: 'Primera: si sobre un cuerpo la fuerza neta es cero, sigue en reposo o moviéndose en línea recta con velocidad constante. Segunda: la fuerza neta es igual a la masa por la aceleración. Tercera: si un cuerpo empuja a otro, este devuelve un empujón igual y en sentido contrario.'
                },
                {
                    t: 'Trabajo y energía',
                    p: 'La energía cinética es la que tiene un cuerpo por moverse y depende del cuadrado de la velocidad: al duplicar la rapidez, la energía se multiplica por cuatro. La energía potencial gravitatoria depende de la altura. La energía no se crea ni se destruye: se transforma.'
                }
            ],
            formulas: [
                { f: 'ΣF = m · a', d: 'Segunda ley de Newton: la fuerza neta es masa por aceleración.' },
                { f: 'Ec = ½ · m · v²', d: 'Energía cinética, en julios.' },
                { f: 'p = m · v', d: 'Cantidad de movimiento o momento lineal.' }
            ],
            preguntas: [
                {
                    p: 'Un carro de 1 000 kg acelera a 2 m/s². ¿Cuál es la fuerza neta que actúa sobre él?',
                    op: ['500 N', '2 000 N', '1 002 N'],
                    ok: 1,
                    exp: 'Por la segunda ley: F = m · a = 1 000 kg × 2 m/s² = 2 000 N.'
                },
                {
                    p: 'Empujas una pared con todas tus fuerzas y no se mueve. ¿La pared te empuja a ti?',
                    op: ['No, está quieta', 'Sí, con la misma fuerza en sentido contrario', 'Solo si la pared es débil'],
                    ok: 1,
                    exp: 'Es la tercera ley: a toda acción corresponde una reacción igual y opuesta. La pared no se mueve porque está sujeta al piso, no porque no responda.'
                },
                {
                    p: 'Si un cuerpo duplica su velocidad, su energía cinética…',
                    op: ['se duplica', 'se hace cuatro veces mayor', 'no cambia'],
                    ok: 1,
                    exp: 'La energía cinética depende de v al cuadrado: al duplicar v, el cuadrado se multiplica por 4.'
                }
            ]
        },

        {
            id: 'ondas',
            titulo: 'Ondas y Vibraciones',
            dibujo: 'waves',
            resumen: 'Propagación de ondas, sonido y fenómenos ondulatorios.',
            teoria: [
                {
                    t: 'Qué es una onda',
                    p: 'Una onda es una perturbación que transporta energía de un lugar a otro sin transportar materia. Cuando lanzas una piedra al agua, el corcho que flota sube y baja pero no viaja con la onda. Las ondas mecánicas (sonido) necesitan un medio; las electromagnéticas (luz) no lo necesitan.'
                },
                {
                    t: 'Elementos de una onda',
                    p: 'La amplitud es la altura máxima de la onda. La longitud de onda es la distancia entre dos crestas seguidas. La frecuencia es cuántas ondas pasan por segundo y se mide en hertz. El periodo es el tiempo que tarda una onda completa: es el inverso de la frecuencia.'
                },
                {
                    t: 'El sonido',
                    p: 'El sonido es una onda longitudinal: el aire se comprime y se expande en la misma dirección en que avanza. En el aire viaja a unos 340 m/s, en el agua mucho más rápido y en el vacío no viaja. El tono depende de la frecuencia y el volumen de la amplitud.'
                }
            ],
            formulas: [
                { f: 'v = λ · f', d: 'Velocidad de la onda: longitud de onda por frecuencia.' },
                { f: 'T = 1 / f', d: 'El periodo es el inverso de la frecuencia.' },
                { f: 'f = 1 / T', d: 'Y la frecuencia, el inverso del periodo.' }
            ],
            preguntas: [
                {
                    p: 'Una onda tiene 2 m de longitud de onda y frecuencia de 5 Hz. ¿A qué velocidad viaja?',
                    op: ['2,5 m/s', '7 m/s', '10 m/s'],
                    ok: 2,
                    exp: 'v = λ · f = 2 m × 5 Hz = 10 m/s.'
                },
                {
                    p: '¿Puede escucharse una explosión ocurrida en el espacio exterior?',
                    op: ['No, el sonido necesita un medio material', 'Sí, si es muy fuerte', 'Sí, pero se demora años'],
                    ok: 0,
                    exp: 'El sonido es una onda mecánica: sin aire, agua o algún material que vibre, no se propaga.'
                },
                {
                    p: 'Si la frecuencia aumenta y la velocidad de la onda no cambia, la longitud de onda…',
                    op: ['aumenta', 'disminuye', 'sigue igual'],
                    ok: 1,
                    exp: 'Como v = λ · f es constante, si f sube, λ tiene que bajar.'
                }
            ]
        },

        {
            id: 'optica',
            titulo: 'Óptica',
            dibujo: 'optics',
            resumen: 'Luz, reflexión, refracción y fenómenos ópticos.',
            teoria: [
                {
                    t: 'La luz',
                    p: 'La luz es una onda electromagnética que viaja en el vacío a 300 000 km por segundo, la mayor velocidad posible en el universo. En un medio homogéneo se propaga en línea recta: por eso los cuerpos proyectan sombras con bordes definidos.'
                },
                {
                    t: 'Reflexión',
                    p: 'Cuando la luz choca con una superficie pulida rebota, y el ángulo con que llega es igual al ángulo con que sale, medidos desde la línea perpendicular a la superficie. En un espejo plano la imagen es virtual, del mismo tamaño y con la izquierda y la derecha intercambiadas.'
                },
                {
                    t: 'Refracción',
                    p: 'Al pasar de un medio a otro la luz cambia de velocidad y se desvía. Por eso un lápiz metido en un vaso con agua se ve quebrado y una piscina parece menos profunda de lo que es. El índice de refracción indica cuántas veces más lenta va la luz en ese material.'
                }
            ],
            formulas: [
                { f: 'θi = θr', d: 'Ley de la reflexión: ángulo de incidencia igual al de reflexión.' },
                { f: 'n = c / v', d: 'Índice de refracción del medio.' },
                { f: 'n₁ · sen θ₁ = n₂ · sen θ₂', d: 'Ley de Snell, para la refracción.' }
            ],
            preguntas: [
                {
                    p: 'Un rayo llega a un espejo formando 30° con la normal. ¿Con qué ángulo se refleja?',
                    op: ['30°', '60°', '90°'],
                    ok: 0,
                    exp: 'El ángulo de reflexión siempre es igual al de incidencia: 30°.'
                },
                {
                    p: '¿Por qué se ve quebrado un lápiz dentro de un vaso con agua?',
                    op: ['Porque el agua lo dobla', 'Por la refracción de la luz', 'Por la sombra del vaso'],
                    ok: 1,
                    exp: 'La luz cambia de velocidad al pasar del agua al aire y se desvía; el ojo la interpreta como si viniera en línea recta.'
                },
                {
                    p: 'En el agua, cuyo índice de refracción es 1,33, la luz viaja…',
                    op: ['más rápido que en el vacío', 'más lento que en el vacío', 'a la misma velocidad'],
                    ok: 1,
                    exp: 'El índice es mayor que 1, así que la velocidad en el agua es c dividido entre 1,33: unos 225 000 km/s.'
                }
            ]
        },

        {
            id: 'electricidad',
            titulo: 'Electricidad y Magnetismo',
            dibujo: 'electricity',
            resumen: 'Cargas eléctricas, corrientes y campos magnéticos.',
            teoria: [
                {
                    t: 'La carga eléctrica',
                    p: 'Existen dos tipos de carga: positiva y negativa. Las cargas iguales se repelen y las distintas se atraen, con una fuerza que crece cuando las cargas son mayores y se debilita rápidamente con la distancia. Frotar un globo en el cabello lo carga y le permite pegarse a la pared.'
                },
                {
                    t: 'Corriente y ley de Ohm',
                    p: 'La corriente eléctrica es el flujo ordenado de cargas por un conductor y se mide en amperios. El voltaje es el empujón que las mueve y la resistencia es la oposición que encuentran. La ley de Ohm relaciona las tres: el voltaje es igual a la corriente por la resistencia.'
                },
                {
                    t: 'Magnetismo',
                    p: 'Todo imán tiene dos polos que no pueden separarse. Oersted descubrió que una corriente eléctrica crea un campo magnético a su alrededor, y Faraday que un imán en movimiento genera corriente. Esas dos ideas hacen funcionar los motores, los generadores y los transformadores.'
                }
            ],
            formulas: [
                { f: 'V = I · R', d: 'Ley de Ohm: voltaje igual a corriente por resistencia.' },
                { f: 'P = V · I', d: 'Potencia eléctrica, en vatios.' },
                { f: 'F = k · q₁ · q₂ / d²', d: 'Ley de Coulomb, la fuerza entre dos cargas.' }
            ],
            preguntas: [
                {
                    p: 'Una bombilla de 120 V tiene una resistencia de 240 Ω. ¿Qué corriente circula por ella?',
                    op: ['0,5 A', '2 A', '288 A'],
                    ok: 0,
                    exp: 'De V = I · R se despeja I = V / R = 120 / 240 = 0,5 A.'
                },
                {
                    p: 'Dos cargas negativas se acercan. ¿Qué ocurre?',
                    op: ['Se atraen', 'Se repelen', 'No pasa nada'],
                    ok: 1,
                    exp: 'Cargas del mismo signo se repelen; solo las de signo contrario se atraen.'
                },
                {
                    p: '¿Qué aparece alrededor de un cable cuando pasa corriente por él?',
                    op: ['Un campo magnético', 'Una carga positiva', 'Una onda de sonido'],
                    ok: 0,
                    exp: 'Es el experimento de Oersted: la aguja de una brújula se desvía al acercarla a un cable con corriente.'
                }
            ]
        }

    ];


    /* Crédito común: todas las simulaciones son de PhET y corren desde la
       intranet, sin salir a internet. */
    const CREDITO_PHET = 'Simulación de PhET Interactive Simulations, Universidad de Colorado Boulder ' +
        '(licencia CC BY 4.0). Corre desde la intranet, sin internet.';

    const SIMULADORES = [

        {
            id: 'sonido',
            titulo: 'Ondas Sonoras',
            dibujo: 'sound-sim',
            resumen: 'Descubre cómo viaja el sonido.',
            controles: 'Frecuencia y amplitud del parlante, regla y cronómetro, dos fuentes a la vez, bomba de vacío y pared reflectora.',
            formula: 'v = λ · f',
            aprendes: 'Que la frecuencia decide qué tan agudo se oye y la amplitud qué tan fuerte, y que el sonido necesita un medio material: sin aire no se oye nada.',
            archivo: 'sims/sound-waves_es.html',
            credito: CREDITO_PHET,
            pasos: [
                'En la pantalla <b>Intro</b> enciende el parlante. Las bandas claras y oscuras que salen de él son el aire comprimido y enrarecido que transporta el sonido.',
                'Sube la <b>frecuencia</b>: las bandas se juntan. Sube la <b>amplitud</b>: se marcan más, porque el sonido suena más fuerte.',
                'Pasa a <b>Medir</b> y usa la regla y el cronómetro para calcular cuánto tarda el sonido en recorrer una distancia.',
                'En <b>Dos Fuentes</b> enciende los dos parlantes y busca los puntos donde casi no llega sonido: ahí las ondas se cancelan.',
                'En <b>Presión del Aire</b> saca el aire de la caja: el parlante sigue vibrando, pero deja de oírse.',
                'En <b>Reflexión</b> mueve la pared y observa cómo rebota la onda: así se produce el eco.'
            ],
            observa: [
                'Las zonas apretadas son <b>compresiones</b> y las separadas <b>rarefacciones</b>: el sonido es una onda longitudinal, no sube y baja como la del agua.',
                'La frecuencia cambia el <b>tono</b> (agudo o grave) y la amplitud cambia el <b>volumen</b>: son dos cosas distintas.',
                'Al hacer el vacío el sonido desaparece: sin partículas no hay quién transmita la vibración.',
                'En el aire el sonido viaja a unos 340 m/s, un millón de veces más lento que la luz: por eso el trueno llega después del relámpago.'
            ]
        },
        {
            id: 'interferencia',
            titulo: 'Interferencia de Ondas',
            dibujo: 'interference-sim',
            resumen: 'Observa la interferencia constructiva y destructiva.',
            controles: 'Separación entre las dos fuentes, longitud de onda y encendido de una o dos fuentes.',
            formula: 'd · sen θ = m · λ',
            aprendes: 'Que dos ondas pueden sumarse y hacerse más grandes, o cancelarse y dejar zonas en silencio. Es el experimento de la doble rendija de Young.',
            archivo: 'sims/wave-interference_es.html',
            credito: CREDITO_PHET,
            pasos: [
                'Entra a la pantalla <b>Ondas</b> y abre la llave del agua. Con la regla mide la distancia entre dos crestas seguidas: esa distancia es la longitud de onda λ.',
                'Sube la <b>frecuencia</b>. Las crestas se juntan: si la rapidez de la onda no cambia, al aumentar f la longitud de onda λ tiene que disminuir.',
                'Pasa a la pantalla <b>Interferencia</b> y enciende la segunda fuente. Busca las franjas donde el agua casi no se mueve.',
                'Separa o acerca las dos fuentes y observa cómo se corren esas franjas.',
                'En la pantalla <b>Rendijas</b> elige dos rendijas y mira el patrón que se forma detrás de la barrera.',
                'Cambia de <b>agua</b> a <b>sonido</b> y a <b>luz</b>: el patrón se repite, porque es el mismo fenómeno en tres ondas distintas.'
            ],
            observa: [
                'Donde llega cresta con cresta las ondas se suman: interferencia <b>constructiva</b>, la zona más brillante o más sonora.',
                'Donde llega cresta con valle las ondas se restan: interferencia <b>destructiva</b>, zonas de calma o de silencio.',
                'Las franjas dependen de la separación d entre las fuentes y de λ: si acercas las fuentes, las franjas se abren.',
                'El sonido es una onda mecánica y la luz una onda electromagnética, pero las dos interfieren igual: la interferencia es propia de toda onda.'
            ]
        },
        {
            id: 'optica',
            titulo: 'Óptica Geométrica',
            dibujo: 'optics-sim',
            resumen: 'Forma imágenes con lentes y espejos.',
            controles: 'Lente convergente o divergente, espejo cóncavo o convexo, distancia focal, posición del objeto y rayos principales.',
            formula: '1/f = 1/dₒ + 1/dᵢ',
            aprendes: 'Dónde se forma la imagen y si queda derecha o invertida, real o virtual, según dónde pongas el objeto respecto al foco. Es la física de la lupa, la cámara y el ojo.',
            archivo: 'sims/geometric-optics-basics_es.html',
            credito: CREDITO_PHET,
            pasos: [
                'En la pantalla <b>Lente</b> arrastra el objeto y observa cómo se mueve la imagen al otro lado.',
                'Mira los rayos principales: el que entra paralelo sale por el foco y el que pasa por el centro sigue derecho. Donde se cruzan está la imagen.',
                'Aleja el objeto más allá del doble de la distancia focal: la imagen queda real, invertida y más pequeña.',
                'Acércalo hasta pasar el foco: la imagen se vuelve virtual, derecha y más grande. Eso es una lupa.',
                'Cambia la distancia focal: con f pequeña la lente desvía más la luz.',
                'Pasa a <b>Espejo</b> y repite el recorrido con un espejo cóncavo y con uno convexo.'
            ],
            observa: [
                'Objeto más lejos que 2f → imagen <b>real, invertida y menor</b>: así trabaja la cámara.',
                'Objeto entre f y 2f → imagen <b>real, invertida y mayor</b>: así trabaja el proyector.',
                'Objeto más cerca que f → imagen <b>virtual, derecha y mayor</b>: la lupa.',
                'El espejo convexo siempre da imagen virtual y reducida, pero abarca más campo: por eso se usa en los cruces y en el retrovisor.'
            ]
        },
        {
            id: 'gravedad',
            titulo: 'Fuerza de Gravedad',
            dibujo: 'gravity-sim',
            resumen: 'Mide la atracción entre dos masas.',
            controles: 'Masa de los dos cuerpos y distancia que los separa; las flechas muestran la fuerza sobre cada uno.',
            formula: 'F = G · m₁ · m₂ / r²',
            aprendes: 'Que la atracción crece con las masas y cae con el cuadrado de la distancia, y que las dos fuerzas son siempre iguales y opuestas, aunque un cuerpo sea mucho más grande que el otro.',
            archivo: 'sims/gravity-force-lab-basics_es.html',
            credito: CREDITO_PHET,
            pasos: [
                'Deja iguales la masa de la esfera azul y la de la roja, y compara las flechas: tienen el mismo tamaño y apuntan en sentidos contrarios.',
                'Duplica la masa de uno solo de los cuerpos y fíjate en que la fuerza se duplica en los <b>dos</b>.',
                'Vuelve a las masas iniciales y ahora duplica la distancia: la fuerza no baja a la mitad, baja a la cuarta parte.',
                'Triplica la distancia y comprueba que la fuerza queda en la novena parte.',
                'Anota tres pares de valores de r y F y verifica con la calculadora que F · r² se mantiene casi constante.'
            ],
            observa: [
                'Las dos flechas miden lo mismo aunque las masas sean muy distintas: es la <b>tercera ley de Newton</b>.',
                'Al duplicar r la fuerza se divide entre 4 y al triplicarla entre 9: es la ley del <b>inverso del cuadrado</b>.',
                'Aun con millones de kilogramos la fuerza es pequeñísima: la gravedad es la más débil de las interacciones, pero se siente cuando una de las masas es un planeta.',
                'La fuerza nunca llega a cero: solo se hace cada vez más pequeña al alejar los cuerpos.'
            ]
        },
        {
            id: 'densidad',
            titulo: 'Densidad y Flotación',
            dibujo: 'density-sim',
            resumen: 'Descubre por qué un cuerpo flota o se hunde.',
            controles: 'Masa y volumen de los bloques, material del que están hechos y líquido del recipiente.',
            formula: 'd = m / V',
            aprendes: 'Que flota lo que tiene menor densidad que el líquido, sin importar si es grande o pesado, y cómo hallar el volumen de un cuerpo por el agua que desplaza.',
            archivo: 'sims/density_es.html',
            credito: CREDITO_PHET,
            pasos: [
                'En la pantalla <b>Introducción</b> sube la <b>masa</b> del bloque dejando el volumen fijo y mira en qué momento se hunde.',
                'Ahora deja la masa quieta y agranda el bloque: al crecer el volumen baja la densidad y el bloque vuelve a subir.',
                'Fíjate en cuánto sube el agua al meter el bloque: ese ascenso es el volumen del cuerpo, el método de Arquímedes.',
                'En la pantalla <b>Comparar</b> pon varios bloques de igual masa y distinto volumen y ordénalos por densidad.',
                'En la pantalla <b>Misterio</b> calcula d = m/V para cada bloque y averigua de qué material está hecho.'
            ],
            observa: [
                'Flota todo lo que tiene densidad menor que la del agua: 1,00 g/cm³, que en el simulador aparece como 1,00 kg/L.',
                'Dos bloques con la misma masa pueden comportarse distinto: lo que manda es la <b>densidad</b>, no el peso.',
                'La densidad es una propiedad <b>intensiva</b>: al partir el bloque en dos, cada mitad conserva la misma densidad.',
                'Un barco de acero flota porque su forma encierra aire: la densidad media del conjunto queda por debajo de la del agua.'
            ]
        },
        {
            id: 'luz',
            titulo: 'Reflexión y Refracción',
            dibujo: 'luz-sim',
            resumen: 'Mira cómo se desvía la luz al cambiar de medio.',
            controles: 'Ángulo del rayo láser, material de arriba y de abajo (aire, agua, vidrio o uno a la medida), índice de refracción, transportador, medidor de intensidad y prismas.',
            formula: 'n₁ · sen θ₁ = n₂ · sen θ₂',
            aprendes: 'Que al pasar de un medio a otro la luz cambia de rapidez y por eso se desvía, que siempre se refleja una parte, y que pasado cierto ángulo deja de salir: la reflexión total interna, la física de la fibra óptica.',
            archivo: 'sims/bending-light_es.html',
            credito: CREDITO_PHET,
            pasos: [
                'En la pantalla <b>Introducción</b> enciende el láser sobre la superficie del agua. Verás <b>dos</b> rayos: uno que rebota (reflejado) y otro que entra y se dobla (refractado).',
                'Abre el <b>transportador</b> y mide el ángulo de entrada y el de salida. Los ángulos se miden desde la <b>normal</b>, la línea perpendicular a la superficie, no desde la superficie.',
                'Inclina el láser poco a poco y anota tres parejas de ángulos. Comprueba con la calculadora que n₁·sen θ₁ y n₂·sen θ₂ dan casi lo mismo.',
                'Cambia el material de abajo de <b>agua</b> a <b>vidrio</b>: al subir el índice de refracción el rayo se dobla más y se pega a la normal.',
                'Ahora pon el láser <b>dentro</b> del agua apuntando hacia el aire y ábrelo hasta que el rayo refractado desaparezca: ese es el <b>ángulo crítico</b>, y de ahí en adelante toda la luz se queda adentro.',
                'En <b>Más Herramientas</b> usa el medidor de intensidad para ver cuánta luz se va con el reflejo y cuánta sigue de largo.',
                'En <b>Prismas</b> mete un prisma en el camino del haz blanco y separa la luz en los colores del arco iris.'
            ],
            observa: [
                'El ángulo de <b>reflexión</b> siempre es igual al de incidencia; el de <b>refracción</b> no: ese depende de los dos medios.',
                'Al entrar a un medio más denso (n mayor) la luz se frena y se <b>acerca</b> a la normal; al salir a uno menos denso se aleja.',
                'El rayo nunca se refracta del todo: parte de la luz se refleja siempre, aunque sea poca.',
                'Pasado el ángulo crítico ya no sale nada: es la <b>reflexión total interna</b>, la que mantiene la señal atrapada dentro de la fibra óptica.',
                'Cada color se desvía distinto: por eso el prisma los separa y por eso se forma el arco iris.'
            ]
        }

];


    const LOGROS = [

        { id: 'primer_paso', icono: '⚛', titulo: 'Primer paso', pista: 'Entra a la plataforma', meta: 1 },
        { id: 'explorador', icono: '🔭', titulo: 'Explorador', pista: 'Completa tu primer tema', meta: 1 },
        { id: 'estudioso', icono: '📚', titulo: 'Estudioso', pista: 'Completa los cuatro temas', meta: 4 },
        { id: 'buen_ojo', icono: '🎯', titulo: 'Buen ojo', pista: 'Acierta 5 preguntas', meta: 5 },
        { id: 'impecable', icono: '💯', titulo: 'Impecable', pista: 'Responde bien las 3 preguntas de un tema', meta: 1 },
        { id: 'curioso', icono: '🧪', titulo: 'Curioso', pista: 'Usa cuatro simuladores', meta: 4 },
        { id: 'retador', icono: '⚡', titulo: 'Retador', pista: 'Acierta 5 retos del día', meta: 5 },
        { id: 'constante', icono: '🔥', titulo: 'Constante', pista: 'Entra 3 días seguidos', meta: 3 }

    ];


    const RETOS = [
        { p: '¿En qué unidad se mide la fuerza?', op: ['Julio', 'Newton', 'Vatio'], ok: 1, tema: 'Mecánica', dif: 'Fácil', esc: 'fuerza', exp: 'El newton (N) es la fuerza que le da a 1 kg una aceleración de 1 m/s².' },
        { p: '¿Qué se conserva siempre en un sistema aislado?', op: ['La energía', 'La velocidad', 'La temperatura'], ok: 0, tema: 'Energía', dif: 'Media', esc: 'energia', exp: 'La energía total se conserva: solo cambia de forma.' },
        { p: 'La velocidad del sonido en el aire es cercana a…', op: ['34 m/s', '340 m/s', '3 400 m/s'], ok: 1, tema: 'Ondas', dif: 'Fácil', esc: 'sonido', exp: 'Unos 340 m/s a temperatura ambiente. Por eso el trueno llega después del relámpago.' },
        { p: '¿Cuál de estas NO es una onda electromagnética?', op: ['La luz visible', 'El sonido', 'Las ondas de radio'], ok: 1, tema: 'Ondas', dif: 'Media', esc: 'antena', exp: 'El sonido es una onda mecánica: necesita un medio material.' },
        { p: 'Si duplicas la resistencia y dejas el mismo voltaje, la corriente…', op: ['se duplica', 'se reduce a la mitad', 'no cambia'], ok: 1, tema: 'Electricidad', dif: 'Media', esc: 'circuito', exp: 'I = V / R: si R se duplica, I baja a la mitad.' },
        { p: '¿Qué mide un amperímetro?', op: ['El voltaje', 'La corriente', 'La resistencia'], ok: 1, tema: 'Electricidad', dif: 'Fácil', esc: 'medidor', exp: 'La corriente eléctrica, en amperios, y se conecta en serie.' },
        { p: 'Un objeto en caída libre, sin aire, cae…', op: ['más rápido si es pesado', 'igual sin importar su masa', 'más rápido si es liviano'], ok: 1, tema: 'Mecánica', dif: 'Media', esc: 'caida', exp: 'Sin resistencia del aire todos caen con la misma aceleración: 9,8 m/s². Se comprobó en la Luna con un martillo y una pluma.' },
        { p: '¿A qué ángulo un proyectil alcanza la mayor distancia?', op: ['30°', '45°', '60°'], ok: 1, tema: 'Mecánica', dif: 'Media', esc: 'proyectil', exp: 'A 45°, porque sen(2 × 45°) = sen 90° = 1, el valor máximo.' },
        { p: 'El periodo de un péndulo depende de…', op: ['la masa', 'la longitud de la cuerda', 'el color de la esfera'], ok: 1, tema: 'Mecánica', dif: 'Fácil', esc: 'pendulo', exp: 'De la longitud y de la gravedad. La masa no influye.' },
        { p: '¿Qué le pasa a la luz al pasar del aire al agua?', op: ['Se acelera', 'Se desvía y se hace más lenta', 'Desaparece'], ok: 1, tema: 'Óptica', dif: 'Media', esc: 'refraccion', exp: 'Cambia de velocidad y por eso se desvía: es la refracción.' },
        { p: 'La energía cinética de un cuerpo depende de…', op: ['su masa y su velocidad', 'solo su masa', 'solo su altura'], ok: 0, tema: 'Energía', dif: 'Fácil', esc: 'cinetica', exp: 'Ec = ½ m v²: influyen la masa y, sobre todo, la velocidad.' },
        { p: '¿Qué genera un campo magnético?', op: ['Una carga en reposo', 'Una carga en movimiento', 'El vacío'], ok: 1, tema: 'Magnetismo', dif: 'Difícil', esc: 'campo', exp: 'Las cargas en movimiento, es decir, la corriente eléctrica.' }
    ];


    /* Ilustración de cada reto: dibujos hechos con SVG, sin imágenes
       externas, para que funcionen sin internet y sigan el tema claro
       u oscuro (los colores salen de las variables del CSS). */

    const ESCENAS = {

        fuerza:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<line class="e-piso" x1="12" y1="72" x2="188" y2="72"/>' +
            '<g class="e-empuja">' +
            '<line class="e-flecha" x1="40" y1="56" x2="74" y2="56"/>' +
            '<polyline class="e-flecha" points="66,49 75,56 66,63"/>' +
            '<text class="e-txt" x="42" y="44">F</text>' +
            '</g>' +
            '<rect class="e-cuerpo" x="80" y="44" width="30" height="28" rx="3"/>' +
            '<line class="e-estela e1" x1="120" y1="50" x2="140" y2="50"/>' +
            '<line class="e-estela e2" x1="120" y1="58" x2="148" y2="58"/>' +
            '<line class="e-estela e3" x1="120" y1="66" x2="136" y2="66"/>' +
            '</svg>',

        energia:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<line class="e-piso" x1="12" y1="76" x2="188" y2="76"/>' +
            '<path class="e-guia" d="M28 76 Q56 10 84 76 Q108 26 132 76 Q152 40 172 76"/>' +
            '<circle class="e-bola e-rebota" cx="28" cy="68" r="8"/>' +
            '<text class="e-txt" x="146" y="30">Ep + Ec</text>' +
            '</svg>',

        sonido:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<path class="e-cuerpo" d="M34 38h12l16-13v42l-16-13H34z"/>' +
            '<path class="e-arco a1" d="M74 30a30 30 0 0 1 0 32"/>' +
            '<path class="e-arco a2" d="M90 20a46 46 0 0 1 0 52"/>' +
            '<path class="e-arco a3" d="M106 10a62 62 0 0 1 0 72"/>' +
            '<text class="e-txt" x="150" y="52">340 m/s</text>' +
            '</svg>',

        antena:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<line class="e-piso" x1="34" y1="78" x2="34" y2="30"/>' +
            '<polyline class="e-piso" points="24,78 34,66 44,78"/>' +
            '<circle class="e-punto e-late" cx="34" cy="26" r="4"/>' +
            '<path class="e-onda o1" d="M56 52q10-18 20 0t20 0"/>' +
            '<path class="e-onda o2" d="M96 52q10-18 20 0t20 0"/>' +
            '<path class="e-onda o3" d="M136 52q10-18 20 0t20 0"/>' +
            '</svg>',

        circuito:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<rect class="e-guia" x="30" y="24" width="140" height="46" rx="4" fill="none"/>' +
            '<line class="e-flecha" x1="24" y1="38" x2="24" y2="56"/>' +
            '<line class="e-piso" x1="36" y1="42" x2="36" y2="52"/>' +
            '<polyline class="e-onda" points="86,24 92,16 100,32 108,16 116,32 122,24"/>' +
            '<circle class="e-punto e-fluye p1" cx="40" cy="70" r="3.2"/>' +
            '<circle class="e-punto e-fluye p2" cx="40" cy="70" r="3.2"/>' +
            '<circle class="e-punto e-fluye p3" cx="40" cy="70" r="3.2"/>' +
            '<text class="e-txt" x="140" y="16">V = I·R</text>' +
            '</svg>',

        medidor:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<circle class="e-cuerpo" cx="100" cy="58" r="34"/>' +
            '<path class="e-guia" d="M74 58a26 26 0 0 1 52 0"/>' +
            '<g class="e-aguja"><line class="e-flecha" x1="100" y1="58" x2="100" y2="32"/></g>' +
            '<circle class="e-punto" cx="100" cy="58" r="3"/>' +
            '<text class="e-txt" x="93" y="76">A</text>' +
            '</svg>',

        caida:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<line class="e-piso" x1="12" y1="84" x2="188" y2="84"/>' +
            '<g class="e-cae c1"><rect class="e-cuerpo" x="62" y="14" width="22" height="14" rx="2"/></g>' +
            '<g class="e-cae c2"><path class="e-onda" d="M124 14q10 8 0 16q-10-8 0-16"/></g>' +
            '<line class="e-guia" x1="73" y1="34" x2="73" y2="80"/>' +
            '<line class="e-guia" x1="124" y1="34" x2="124" y2="80"/>' +
            '<text class="e-txt" x="140" y="52">g = 9,8</text>' +
            '</svg>',

        proyectil:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<line class="e-piso" x1="12" y1="76" x2="188" y2="76"/>' +
            '<path class="e-traza" d="M28 76Q100 -6 172 76"/>' +
            '<circle class="e-bola e-vuela" cx="28" cy="76" r="5"/>' +
            '<line class="e-flecha" x1="28" y1="76" x2="52" y2="56"/>' +
            '<text class="e-txt" x="52" y="72">45°</text>' +
            '</svg>',

        pendulo:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<line class="e-piso" x1="60" y1="14" x2="140" y2="14"/>' +
            '<g class="e-oscila">' +
            '<line class="e-guia" x1="100" y1="14" x2="100" y2="62"/>' +
            '<circle class="e-bola" cx="100" cy="68" r="9"/>' +
            '</g>' +
            '<path class="e-guia" d="M78 62a28 28 0 0 0 44 0"/>' +
            '<text class="e-txt" x="132" y="40">T = 2π√(L/g)</text>' +
            '</svg>',

        refraccion:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<rect class="e-agua" x="12" y="48" width="176" height="34" rx="2"/>' +
            '<line class="e-piso" x1="12" y1="48" x2="188" y2="48"/>' +
            '<line class="e-guia" x1="96" y1="12" x2="96" y2="82" stroke-dasharray="3 4"/>' +
            '<line class="e-rayo" x1="52" y1="12" x2="96" y2="48"/>' +
            '<line class="e-rayo" x1="96" y1="48" x2="126" y2="82"/>' +
            '<text class="e-txt" x="140" y="30">aire</text>' +
            '<text class="e-txt" x="140" y="70">agua</text>' +
            '</svg>',

        cinetica:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<line class="e-piso" x1="12" y1="72" x2="188" y2="72"/>' +
            '<g class="e-rueda">' +
            '<path class="e-cuerpo" d="M64 72V56h12l10-12h22l6 12h14v16z"/>' +
            '<circle class="e-punto" cx="80" cy="72" r="5"/>' +
            '<circle class="e-punto" cx="118" cy="72" r="5"/>' +
            '</g>' +
            '<line class="e-estela e1" x1="30" y1="52" x2="52" y2="52"/>' +
            '<line class="e-estela e2" x1="24" y1="62" x2="52" y2="62"/>' +
            '<text class="e-txt" x="140" y="40">Ec = ½mv²</text>' +
            '</svg>',

        campo:
            '<svg class="esc" viewBox="0 0 200 92" aria-hidden="true">' +
            '<line class="e-flecha" x1="100" y1="86" x2="100" y2="8"/>' +
            '<polyline class="e-flecha" points="94,16 100,8 106,16"/>' +
            '<g class="e-gira">' +
            '<ellipse class="e-onda" cx="100" cy="46" rx="46" ry="13"/>' +
            '<ellipse class="e-onda" cx="100" cy="46" rx="30" ry="8"/>' +
            '</g>' +
            '<text class="e-txt" x="146" y="80">B</text>' +
            '<text class="e-txt" x="82" y="82">I</text>' +
            '</svg>'

    };


    /* =========================================================
       ILUSTRACIÓN DE CADA TEMA
       Dibujos animados en SVG: se usan en la lista de temas y
       como portada de la lectura. Sin imágenes externas.
       ========================================================= */

    const ILUSTRACIONES = {

        mecanica:
            '<svg class="ilu" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
            '<line class="i-piso" x1="0" y1="98" x2="320" y2="98"/>' +
            '<path class="i-arco" d="M62 98Q170 2 278 98"/>' +
            '<circle class="i-bola i-lanza" cx="62" cy="98" r="6"/>' +
            '<g class="i-caja">' +
            '<rect class="i-cuerpo" x="40" y="66" width="32" height="32" rx="3"/>' +
            '<line class="i-flecha" x1="8" y1="82" x2="32" y2="82"/>' +
            '<polyline class="i-flecha" points="25,76 33,82 25,88"/>' +
            '</g>' +
            '<line class="i-estela e1" x1="84" y1="72" x2="104" y2="72"/>' +
            '<line class="i-estela e2" x1="84" y1="82" x2="110" y2="82"/>' +
            '<line class="i-estela e3" x1="84" y1="92" x2="100" y2="92"/>' +
            '<text class="i-txt" x="238" y="30">F = m·a</text>' +
            '</svg>',

        ondas:
            '<svg class="ilu" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
            '<g class="i-desliza">' +
            '<path class="i-onda" d="M-80 62q20-36 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0"/>' +
            '<path class="i-onda i-tenue" d="M-80 84q20-22 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0"/>' +
            '</g>' +
            '<path class="i-cuerpo" d="M18 46h14l18-15v48l-18-15H18z"/>' +
            '<line class="i-cota" x1="120" y1="26" x2="200" y2="26"/>' +
            '<line class="i-cota" x1="120" y1="21" x2="120" y2="31"/>' +
            '<line class="i-cota" x1="200" y1="21" x2="200" y2="31"/>' +
            '<text class="i-txt" x="152" y="18">λ</text>' +
            '</svg>',

        optica:
            '<svg class="ilu" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
            '<line class="i-haz" x1="6" y1="58" x2="128" y2="58"/>' +
            '<polygon class="i-prisma" points="160,22 204,96 116,96"/>' +
            '<g class="i-arcoiris">' +
            '<line class="a1" x1="168" y1="62" x2="316" y2="34"/>' +
            '<line class="a2" x1="168" y1="62" x2="316" y2="48"/>' +
            '<line class="a3" x1="168" y1="62" x2="316" y2="62"/>' +
            '<line class="a4" x1="168" y1="62" x2="316" y2="76"/>' +
            '<line class="a5" x1="168" y1="62" x2="316" y2="90"/>' +
            '<line class="a6" x1="168" y1="62" x2="316" y2="104"/>' +
            '</g>' +
            '<text class="i-txt" x="18" y="42">luz</text>' +
            '</svg>',

        electricidad:
            '<svg class="ilu" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
            '<rect class="i-cable" x="46" y="30" width="228" height="66" rx="6"/>' +
            '<line class="i-flecha" x1="46" y1="52" x2="46" y2="74"/>' +
            '<line class="i-piso" x1="58" y1="57" x2="58" y2="69"/>' +
            '<circle class="i-foco-luz" cx="160" cy="30" r="20"/>' +
            '<circle class="i-foco" cx="160" cy="30" r="12"/>' +
            '<path class="i-filamento" d="M154 30l4-5 4 10 4-5"/>' +
            '<circle class="i-carga c1" cx="60" cy="96" r="4"/>' +
            '<circle class="i-carga c2" cx="60" cy="96" r="4"/>' +
            '<circle class="i-carga c3" cx="60" cy="96" r="4"/>' +
            '<text class="i-txt" x="238" y="20">V = I·R</text>' +
            '</svg>'

    };


    /* =========================================================
       LABORATORIO RÁPIDO
       Un experimento por tema: se mueven los controles y el
       dibujo y el resultado cambian al instante.
       ========================================================= */

    const LABS = {

        mecanica: {
            titulo: 'Empuja la caja',
            nota: 'Mueve la masa y la aceleración: la flecha de la fuerza crece contigo.',
            formula: 'F = m · a',
            controles: [
                { id: 'm', et: 'Masa', min: 1, max: 10, paso: 1, val: 3, uni: ' kg' },
                { id: 'a', et: 'Aceleración', min: 1, max: 10, paso: 1, val: 4, uni: ' m/s²' }
            ],
            calcular: function (v) {
                return { valor: (v.m * v.a).toFixed(0) + ' N', pie: 'Con ' + v.m + ' kg y ' + v.a + ' m/s² hacen falta ' + (v.m * v.a) + ' newton.' };
            },
            dibujo: function (v) {
                const lado = 16 + v.m * 3.4;
                const flecha = 18 + v.m * v.a * 1.5;
                const y = 96 - lado;
                return '<svg class="lab-svg" viewBox="0 0 300 120" aria-hidden="true">' +
                    '<line class="l-piso" x1="10" y1="96" x2="290" y2="96"/>' +
                    '<line class="l-flecha" x1="' + (150 - flecha) + '" y1="' + (y + lado / 2) + '" x2="146" y2="' + (y + lado / 2) + '"/>' +
                    '<polyline class="l-flecha" points="' + (140) + ',' + (y + lado / 2 - 6) + ' 148,' + (y + lado / 2) + ' 140,' + (y + lado / 2 + 6) + '"/>' +
                    '<rect class="l-cuerpo" x="150" y="' + y + '" width="' + lado + '" height="' + lado + '" rx="3"/>' +
                    '<text class="l-txt" x="' + (150 + lado / 2 - 8) + '" y="' + (y + lado / 2 + 4) + '">' + v.m + '</text>' +
                    '<text class="l-txt l-dato" x="' + Math.max(12, 140 - flecha) + '" y="' + (y + lado / 2 - 12) + '">' + (v.m * v.a) + ' N</text>' +
                    '</svg>';
            }
        },

        ondas: {
            titulo: 'Estira la onda',
            nota: 'Cambia la longitud de onda y la frecuencia: mira cómo viaja más rápido o más lento.',
            formula: 'v = λ · f',
            controles: [
                { id: 'l', et: 'Longitud de onda', min: 0.5, max: 4, paso: 0.5, val: 2, uni: ' m' },
                { id: 'f', et: 'Frecuencia', min: 1, max: 10, paso: 1, val: 3, uni: ' Hz' }
            ],
            calcular: function (v) {
                return { valor: (v.l * v.f).toFixed(1) + ' m/s', pie: 'Periodo T = ' + (1 / v.f).toFixed(2) + ' s' };
            },
            dibujo: function (v) {
                const ancho = v.l * 26;              /* pixeles por longitud de onda */
                const alto = 26;
                let d = 'M-' + ancho + ' 60';
                for (let i = 0; i < 16; i++) {
                    d += 'q' + (ancho / 4) + ' -' + alto + ' ' + (ancho / 2) + ' 0t' + (ancho / 2) + ' 0';
                }
                const dur = Math.max(0.5, 6 / (v.l * v.f)).toFixed(2);
                return '<svg class="lab-svg" viewBox="0 0 300 120" aria-hidden="true">' +
                    '<g class="l-desliza" style="animation-duration:' + dur + 's;--paso:' + ancho + 'px">' +
                    '<path class="l-onda" d="' + d + '"/>' +
                    '</g>' +
                    '<line class="l-cota" x1="40" y1="24" x2="' + (40 + ancho) + '" y2="24"/>' +
                    '<line class="l-cota" x1="40" y1="19" x2="40" y2="29"/>' +
                    '<line class="l-cota" x1="' + (40 + ancho) + '" y1="19" x2="' + (40 + ancho) + '" y2="29"/>' +
                    '<text class="l-txt l-dato" x="' + (44 + ancho) + '" y="28">λ = ' + v.l + ' m</text>' +
                    '</svg>';
            }
        },

        optica: {
            titulo: 'Dobla el rayo',
            nota: 'Cambia el ángulo con que la luz entra al agua y observa cuánto se desvía.',
            formula: 'n₁·sen θ₁ = n₂·sen θ₂',
            controles: [
                { id: 'i', et: 'Ángulo de entrada', min: 0, max: 80, paso: 5, val: 45, uni: '°' },
                { id: 'n', et: 'Índice del medio (agua 1,3 · vidrio 1,5)', min: 1.1, max: 1.6, paso: 0.1, val: 1.3, uni: '' }
            ],
            calcular: function (v) {
                const r = Math.asin(Math.min(1, Math.sin(v.i * Math.PI / 180) / v.n)) * 180 / Math.PI;
                return { valor: r.toFixed(1) + '°', pie: 'La luz viaja a ' + (300000 / v.n).toFixed(0) + ' km/s dentro de ese medio.' };
            },
            dibujo: function (v) {
                const rad = v.i * Math.PI / 180;
                const ref = Math.asin(Math.min(1, Math.sin(rad) / v.n));
                const cx = 150, cy = 62, largo = 58;
                const x1 = cx - Math.sin(rad) * largo, y1 = cy - Math.cos(rad) * largo;
                const x2 = cx + Math.sin(ref) * largo, y2 = cy + Math.cos(ref) * largo;
                return '<svg class="lab-svg" viewBox="0 0 300 120" aria-hidden="true">' +
                    '<rect class="l-agua" x="10" y="62" width="280" height="48" rx="3"/>' +
                    '<line class="l-piso" x1="10" y1="62" x2="290" y2="62"/>' +
                    '<line class="l-normal" x1="150" y1="8" x2="150" y2="114"/>' +
                    '<line class="l-rayo" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="150" y2="62"/>' +
                    '<line class="l-rayo l-rayo-2" x1="150" y1="62" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>' +
                    '<text class="l-txt l-dato" x="18" y="26">' + v.i + '°</text>' +
                    '<text class="l-txt l-dato" x="18" y="104">' + (ref * 180 / Math.PI).toFixed(1) + '°</text>' +
                    '<text class="l-txt" x="248" y="26">aire</text>' +
                    '<text class="l-txt" x="242" y="104">medio</text>' +
                    '</svg>';
            }
        },

        electricidad: {
            titulo: 'Enciende el bombillo',
            nota: 'Sube el voltaje o baja la resistencia: el bombillo alumbra más y las cargas corren más rápido.',
            formula: 'I = V / R',
            controles: [
                { id: 'v', et: 'Voltaje', min: 1.5, max: 12, paso: 0.5, val: 6, uni: ' V' },
                { id: 'r', et: 'Resistencia', min: 10, max: 100, paso: 5, val: 40, uni: ' Ω' }
            ],
            calcular: function (v) {
                const i = v.v / v.r;
                return { valor: (i * 1000).toFixed(0) + ' mA', pie: 'Potencia: ' + (v.v * i).toFixed(2) + ' W' };
            },
            dibujo: function (v) {
                const i = v.v / v.r;
                const brillo = Math.min(1, i / 0.4);
                const dur = Math.max(0.6, 3 - brillo * 2.2).toFixed(2);
                return '<svg class="lab-svg" viewBox="0 0 300 120" aria-hidden="true">' +
                    '<rect class="l-cable" x="40" y="30" width="220" height="70" rx="6"/>' +
                    '<line class="l-flecha" x1="40" y1="52" x2="40" y2="78"/>' +
                    '<line class="l-piso" x1="52" y1="58" x2="52" y2="72"/>' +
                    '<text class="l-txt l-dato" x="16" y="26">' + v.v + ' V</text>' +
                    '<rect class="l-resistencia" x="228" y="52" width="14" height="26" rx="2"/>' +
                    '<text class="l-txt" x="248" y="70">' + v.r + ' Ω</text>' +
                    '<circle class="l-halo" cx="150" cy="30" r="24" style="opacity:' + (brillo * 0.5).toFixed(2) + '"/>' +
                    '<circle class="l-foco" cx="150" cy="30" r="13" style="fill-opacity:' + brillo.toFixed(2) + '"/>' +
                    '<path class="l-filamento" d="M143 30l4-6 5 12 5-6"/>' +
                    '<circle class="l-carga q1" cx="46" cy="100" r="4" style="animation-duration:' + dur + 's"/>' +
                    '<circle class="l-carga q2" cx="46" cy="100" r="4" style="animation-duration:' + dur + 's;animation-delay:' + (dur / 3).toFixed(2) + 's"/>' +
                    '<circle class="l-carga q3" cx="46" cy="100" r="4" style="animation-duration:' + dur + 's;animation-delay:' + (dur / 1.5).toFixed(2) + 's"/>' +
                    '</svg>';
            }
        }

    };


    const NIVELES = [
        { min: 0, nombre: 'Aprendiz' },
        { min: 60, nombre: 'Explorador' },
        { min: 150, nombre: 'Investigador' },
        { min: 300, nombre: 'Científico' },
        { min: 500, nombre: 'Físico' }
    ];


    /* Puntos que otorga cada acción */
    const PUNTOS = {
        lectura: 10,
        pregunta: 5,
        temaCompleto: 15,
        todosLosTemas: 25,
        ficha: 3,
        simulador: 8,
        retoBien: 15,
        retoIntento: 2
    };


    /* =========================================================
       2. DATOS DEL ESTUDIANTE
       ========================================================= */

    const CLAVE = 'fisica-datos';

    /* Marca de sesión abierta: si está, al recargar la página se vuelve
       directo al tablero en vez de pedir el nombre otra vez. */
    const CLAVE_SESION = 'fisica-sesion';

    function abrirSesion() {
        try { localStorage.setItem(CLAVE_SESION, '1'); } catch (e) { }
    }

    function cerrarSesion() {
        try { localStorage.removeItem(CLAVE_SESION); } catch (e) { }
    }

    function haySesion() {
        try { return localStorage.getItem(CLAVE_SESION) === '1'; } catch (e) { return false; }
    }

    const estadoBase = {
        nombre: '',
        grado: '',
        desde: '',
        puntos: 0,
        temas: {},          /* id -> {leido:false, aciertos:[], avance:0} */
        fichas: [],         /* simuladores revisados */
        simulados: [],      /* simuladores que se abrieron y se usaron */
        logros: [],         /* ids desbloqueados */
        aciertos: 0,        /* preguntas correctas en total */
        retos: {
            dia: '',            /* día del reto que está activo */
            idx: null,          /* cuál de los retos salió hoy */
            respondido: false,
            elegida: null,      /* opción que marcó el estudiante */
            ultimoOk: null,
            hechos: 0,
            aciertos: 0,
            racha: 0,
            ultimaRespuesta: '',
            vistos: []          /* últimos retos, para no repetirlos */
        },
        racha: { dias: 0, ultima: '' },
        actividad: []       /* [{texto, ts}] */
    };

    let datos = leerDatos();


    function leerDatos() {
        let guardado = null;
        try {
            guardado = JSON.parse(localStorage.getItem(CLAVE));
        } catch (e) {
            guardado = null;
        }
        const base = JSON.parse(JSON.stringify(estadoBase));
        if (!guardado || typeof guardado !== 'object') return base;
        const d = Object.assign(base, guardado);

        /* Datos de una versión anterior: se completan los campos nuevos */
        d.retos = Object.assign(JSON.parse(JSON.stringify(estadoBase.retos)), d.retos || {});
        if (!Array.isArray(d.retos.vistos)) d.retos.vistos = [];
        if (!Array.isArray(d.simulados)) d.simulados = [];

        return d;
    }


    function guardarDatos() {
        try {
            localStorage.setItem(CLAVE, JSON.stringify(datos));
        } catch (e) { /* modo privado o sin espacio: la app sigue funcionando */ }
    }


    function temaDe(id) {
        if (!datos.temas[id]) {
            datos.temas[id] = { leido: false, aciertos: [], avance: 0 };
        }
        return datos.temas[id];
    }


    /* =========================================================
       3. UTILIDADES
       ========================================================= */

    function $(sel) { return document.querySelector(sel); }
    function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

    function esc(txt) {
        return String(txt).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function hoy() {
        const d = new Date();
        return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    }

    function aviso(texto) {
        if (typeof window.mostrarMensaje === 'function') window.mostrarMensaje(texto);
    }

    function nivelDe(puntos) {
        let actual = NIVELES[0], siguiente = null;
        for (let i = 0; i < NIVELES.length; i++) {
            if (puntos >= NIVELES[i].min) actual = NIVELES[i];
            else { siguiente = NIVELES[i]; break; }
        }
        return { actual: actual, siguiente: siguiente };
    }

    function anotar(texto) {
        datos.actividad.unshift({ texto: texto, ts: Date.now() });
        datos.actividad = datos.actividad.slice(0, 8);
    }

    function haceCuanto(ts) {
        const min = Math.floor((Date.now() - ts) / 60000);
        if (min < 1) return 'hace un momento';
        if (min < 60) return 'hace ' + min + ' min';
        const h = Math.floor(min / 60);
        if (h < 24) return 'hace ' + h + ' h';
        const d = Math.floor(h / 24);
        return d === 1 ? 'ayer' : 'hace ' + d + ' días';
    }


    /* --- Puntos --- */

    function sumarPuntos(cantidad, motivo) {
        datos.puntos += cantidad;
        if (motivo) anotar(motivo + '  +' + cantidad);
        guardarDatos();
        animarPuntos();
    }

    let puntosPintados = 0;

    function animarPuntos() {
        const caja = document.getElementById('puntosTotales');
        if (!caja) return;
        const desde = puntosPintados;
        const hasta = datos.puntos;
        const inicio = Date.now();
        const dura = 500;
        (function paso() {
            const t = Math.min(1, (Date.now() - inicio) / dura);
            const valor = Math.round(desde + (hasta - desde) * t);
            caja.textContent = valor.toLocaleString('es-CO');
            if (t < 1) requestAnimationFrame(paso);
            else puntosPintados = hasta;
        })();
        const texto = document.getElementById('puntosTexto');
        if (texto) texto.textContent = nivelDe(datos.puntos).actual.nombre;
    }


    /* --- Progreso --- */

    function avanceTema(id) {
        const t = temaDe(id);
        let v = t.leido ? 40 : 0;
        v += t.aciertos.filter(Boolean).length * 20;
        return Math.min(100, v);
    }

    function temasCompletos() {
        return TEMAS.filter(function (t) { return avanceTema(t.id) >= 100; }).length;
    }

    function avanceGeneral() {
        let suma = 0;
        TEMAS.forEach(function (t) { suma += avanceTema(t.id); });
        return Math.round(suma / TEMAS.length);
    }


    /* --- Logros --- */

    function progresoLogro(id) {
        switch (id) {
            case 'primer_paso': return datos.nombre ? 1 : 0;
            case 'explorador': return temasCompletos() >= 1 ? 1 : 0;
            case 'estudioso': return temasCompletos();
            case 'buen_ojo': return datos.aciertos;
            case 'impecable':
                return TEMAS.some(function (t) {
                    const d = temaDe(t.id);
                    return d.aciertos.filter(Boolean).length === t.preguntas.length;
                }) ? 1 : 0;
            case 'curioso': return datos.fichas.length;
            case 'retador': return datos.retos.aciertos;
            case 'constante': return datos.racha.dias;
        }
        return 0;
    }

    function revisarLogros() {
        LOGROS.forEach(function (l) {
            if (datos.logros.indexOf(l.id) !== -1) return;
            if (progresoLogro(l.id) >= l.meta) {
                datos.logros.push(l.id);
                anotar('Logro desbloqueado: ' + l.titulo);
                aviso('🏅 ¡Logro desbloqueado! ' + l.titulo);
            }
        });
        guardarDatos();
    }


    /* --- Racha de días --- */

    function revisarRacha() {
        const h = hoy();
        if (datos.racha.ultima === h) return;
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        const textoAyer = ayer.getFullYear() + '-' + ('0' + (ayer.getMonth() + 1)).slice(-2) + '-' + ('0' + ayer.getDate()).slice(-2);
        datos.racha.dias = (datos.racha.ultima === textoAyer) ? datos.racha.dias + 1 : 1;
        datos.racha.ultima = h;
        guardarDatos();
    }


    /* =========================================================
       4. NAVEGACIÓN ENTRE VISTAS
       ========================================================= */

    const VISTAS = ['inicio', 'temas', 'simuladores', 'puntos', 'logros', 'perfil', 'ajustes', 'lectura', 'simulador'];

    function abrirVista(nombre) {

        if (nombre === 'acerca') { if (window.abrirAcerca) window.abrirAcerca(); return; }
        if (VISTAS.indexOf(nombre) === -1) nombre = 'inicio';

        VISTAS.forEach(function (v) {
            const el = document.getElementById('vista' + v.charAt(0).toUpperCase() + v.slice(1));
            if (el) el.classList.toggle('vista-activa', v === nombre);
        });

        /* El menú marca la sección, salvo cuando se está leyendo un tema */
        const marcar = (nombre === 'lectura') ? 'temas' : nombre;
        $$('.side-item').forEach(function (i) {
            i.classList.toggle('active', i.dataset.section === marcar);
        });

        /* El perfil vive en el botón de la barra superior */
        const botonPerfil = document.getElementById('btnPerfil');
        if (botonPerfil) botonPerfil.classList.toggle('perfil-abierto', nombre === 'perfil');

        if (nombre === 'temas') pintarTemas();
        if (nombre === 'simuladores') pintarSimuladores();
        if (nombre === 'puntos') pintarPuntos();
        if (nombre === 'logros') pintarLogros();
        if (nombre === 'perfil') pintarPerfil();
        if (nombre === 'ajustes') pintarAjustes();
        if (nombre === 'inicio') pintarInicio();

        window.scrollTo({ top: 0, behavior: 'instant' });
    }


    /* =========================================================
       5. VISTA: INICIO
       ========================================================= */

    function pintarInicio() {

        /* Tarjetas de temas */
        const grid = document.getElementById('gridTemasInicio');
        if (grid) {
            grid.innerHTML = TEMAS.map(function (t) {
                const av = avanceTema(t.id);
                return '' +
                    '<article class="topic-card" data-tema="' + t.id + '" role="button" tabindex="0">' +
                    '  <div class="topic-image ' + t.dibujo + '"></div>' +
                    '  <div class="topic-info">' +
                    '    <h3>' + esc(t.titulo) + '</h3>' +
                    '    <p>' + esc(t.resumen) + '</p>' +
                    '    <div class="progress-label"><span>' + av + '% completado</span></div>' +
                    '    <div class="progress"><span style="width:' + av + '%"></span></div>' +
                    '  </div>' +
                    '</article>';
            }).join('');
        }

        /* Tarjetas de simuladores */
        const sims = document.getElementById('gridSimsInicio');
        if (sims) {
            sims.innerHTML = SIMULADORES.slice(0, 4).map(function (s) {
                return '' +
                    '<article class="sim-card">' +
                    '  <div class="sim-image ' + s.dibujo + '"></div>' +
                    '  <div class="sim-title">' + esc(s.titulo) + '</div>' +
                    '  <p class="sim-description">' + esc(s.resumen) + '</p>' +
                    '  <button class="sim-button' + (s.archivo ? ' sim-button-listo' : '') + '" ' +
                    (s.archivo ? 'data-abrir-sim="' + s.id + '"' : 'data-sim="' + s.id + '"') + '>' +
                    (s.archivo ? '▶ &nbsp; Abrir simulador' : '▶ &nbsp; Ver simulador') + '</button>' +
                    '</article>';
            }).join('');
        }

        /* Tarjeta de progreso */
        const av = avanceGeneral();
        const anillo = document.getElementById('anilloProgreso');
        if (anillo) {
            anillo.style.background = 'conic-gradient(var(--ring-fill) 0deg ' + (av * 3.6) + 'deg, var(--ring-track) ' + (av * 3.6) + 'deg 360deg)';
            document.getElementById('anilloTexto').textContent = av + '%';
            document.getElementById('progresoInfo').textContent =
                'Has completado ' + temasCompletos() + ' de ' + TEMAS.length + ' temas';
            document.getElementById('progresoBarra').style.width = av + '%';
        }

        pintarRetoDelDia();
        pintarLogrosInicio();
        animarPuntos();
    }


    /* --- Tarjeta lateral: logros --- */

    function pintarLogrosInicio() {
        const caja = document.getElementById('logrosInicio');
        if (!caja) return;

        /* Se muestran los tres más cercanos: primero los ganados sin ver, luego los que faltan */
        const ordenados = LOGROS.slice().sort(function (a, b) {
            const ga = datos.logros.indexOf(a.id) !== -1 ? 0 : 1;
            const gb = datos.logros.indexOf(b.id) !== -1 ? 0 : 1;
            if (ga !== gb) return ga - gb;
            return (progresoLogro(b.id) / b.meta) - (progresoLogro(a.id) / a.meta);
        }).slice(0, 3);

        caja.innerHTML = ordenados.map(function (l) {
            const ganado = datos.logros.indexOf(l.id) !== -1;
            return '' +
                '<div class="achievement' + (ganado ? '' : ' bloqueado') + '">' +
                '  <div class="achievement-icon">' + l.icono + '</div>' +
                '  <strong>' + esc(l.titulo) + '</strong>' +
                '  <p>' + esc(ganado ? '¡Conseguido!' : l.pista) + '</p>' +
                '</div>';
        }).join('');
    }


    /* --- Tarjeta lateral: reto del día --- */

    /* Cada día se sortea un reto distinto. Dentro del mismo día siempre
       es el mismo, para que nadie recargue la página hasta que le salga
       uno fácil; y no se repite ninguno de los últimos ocho. */

    function retoDeHoy() {

        const r = datos.retos;

        if (r.dia !== hoy() || r.idx === null || !RETOS[r.idx]) {

            let posibles = [];
            for (let i = 0; i < RETOS.length; i++) {
                if (r.vistos.indexOf(i) === -1) posibles.push(i);
            }
            if (!posibles.length) {
                r.vistos = [];
                for (let i = 0; i < RETOS.length; i++) posibles.push(i);
            }

            r.idx = posibles[Math.floor(Math.random() * posibles.length)];
            r.dia = hoy();
            r.respondido = false;
            r.elegida = null;
            r.vistos.push(r.idx);
            r.vistos = r.vistos.slice(-8);
            guardarDatos();
        }

        return RETOS[r.idx];
    }


    /* Cuánto falta para el reto de mañana */

    function faltaParaMañana() {
        const ahora = new Date();
        const manana = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1);
        const min = Math.max(0, Math.round((manana - ahora) / 60000));
        const h = Math.floor(min / 60);
        return h > 0 ? h + ' h ' + (min % 60) + ' min' : min + ' min';
    }


    function pintarRetoDelDia() {

        const caja = document.getElementById('retoCuerpo');
        if (!caja) return;

        const reto = retoDeHoy();
        const r = datos.retos;
        const hecho = r.respondido && r.dia === hoy();
        const bien = r.ultimoOk;

        const opciones = reto.op.map(function (o, i) {
            let clase = 'reto-op';
            if (hecho && i === reto.ok) clase += ' reto-op-ok';
            if (hecho && !bien && i === r.elegida) clase += ' reto-op-mal';
            return '' +
                '<button class="' + clase + '" data-op="' + i + '"' + (hecho ? ' disabled' : '') + '>' +
                '<span class="reto-letra">' + 'ABC'.charAt(i) + '</span>' +
                '<span class="reto-op-txt">' + esc(o) + '</span>' +
                '</button>';
        }).join('');

        caja.innerHTML = '' +

            '<div class="reto-escena' + (hecho ? (bien ? ' escena-ok' : ' escena-mal') : '') + '">' +
            (ESCENAS[reto.esc] || '') +
            '</div>' +

            '<div class="reto-chips">' +
            '  <span class="reto-chip">' + esc(reto.tema) + '</span>' +
            '  <span class="reto-chip dif-' + reto.dif.toLowerCase().replace('á', 'a').replace('í', 'i') + '">' + esc(reto.dif) + '</span>' +
            '</div>' +

            '<p class="reto-pregunta">' + esc(reto.p) + '</p>' +

            '<div class="reto-opciones">' + opciones + '</div>' +

            (hecho
                ? '<div class="reto-resultado ' + (bien ? 'res-ok' : 'res-mal') + '">' +
                '<span class="reto-marca">' + (bien ? '✓' : '✕') + '</span>' +
                '<span>' + (bien ? '¡Correcto! +' + PUNTOS.retoBien + ' puntos' : 'Casi. Mira la explicación') + '</span>' +
                '</div>' +
                '<p class="reto-explica">' + esc(reto.exp) + '</p>'
                : '') +

            '<div class="reto-pie">' +
            '  <span title="Días seguidos respondiendo el reto">🔥 ' + r.racha + '</span>' +
            '  <span title="Retos acertados en total">🎯 ' + r.aciertos + '</span>' +
            (hecho ? '<span class="reto-cuenta" id="retoCuenta">Nuevo reto en ' + faltaParaMañana() + '</span>' : '') +
            '</div>';
    }


    function responderReto(indice) {

        const reto = retoDeHoy();
        const r = datos.retos;
        if (r.respondido && r.dia === hoy()) return;

        const bien = indice === reto.ok;
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        const textoAyer = ayer.getFullYear() + '-' + ('0' + (ayer.getMonth() + 1)).slice(-2) + '-' + ('0' + ayer.getDate()).slice(-2);

        r.respondido = true;
        r.elegida = indice;
        r.ultimoOk = bien;
        r.hechos += 1;
        if (bien) r.aciertos += 1;
        r.racha = (r.ultimaRespuesta === textoAyer) ? r.racha + 1 : 1;
        r.ultimaRespuesta = hoy();

        sumarPuntos(bien ? PUNTOS.retoBien : PUNTOS.retoIntento,
            bien ? 'Reto del día acertado' : 'Reto del día respondido');
        revisarLogros();
        pintarRetoDelDia();
        pintarLogrosInicio();

        /* Destello de la tarjeta al responder */
        const tarjeta = document.getElementById('retoCuerpo');
        if (tarjeta) {
            const marca = bien ? 'reto-flash-ok' : 'reto-flash-mal';
            tarjeta.classList.add(marca);
            setTimeout(function () { tarjeta.classList.remove(marca); }, 700);
        }

        aviso(bien ? '¡Correcto! +' + PUNTOS.retoBien + ' puntos' : 'Respuesta incorrecta');
    }


    /* La cuenta regresiva se refresca sola cada minuto */

    setInterval(function () {
        const c = document.getElementById('retoCuenta');
        if (c) c.textContent = 'Nuevo reto en ' + faltaParaMañana();
    }, 60000);


    /* =========================================================
       6. VISTA: TEMAS
       ========================================================= */

    function pintarTemas() {
        const v = document.getElementById('vistaTemas');
        if (!v) return;

        const preguntasTotales = TEMAS.reduce(function (n, t) { return n + t.preguntas.length; }, 0);

        /* El siguiente tema recomendado: el primero sin terminar */
        let sugerido = null;
        for (let i = 0; i < TEMAS.length; i++) {
            if (avanceTema(TEMAS[i].id) < 100) { sugerido = TEMAS[i].id; break; }
        }

        v.innerHTML = '' +
            cabecera('Temas del área', 'Cuatro unidades con teoría, fórmulas, un experimento para jugar y preguntas. Cada tema completo suma ' +
                (PUNTOS.lectura + PUNTOS.pregunta * 3 + PUNTOS.temaCompleto) + ' puntos.') +

            '<div class="temas-resumen">' +
            miniDato(temasCompletos() + '/' + TEMAS.length, 'Temas terminados') +
            miniDato(datos.aciertos + '/' + preguntasTotales, 'Preguntas acertadas') +
            miniDato(avanceGeneral() + '%', 'Avance del área') +
            miniDato(TEMAS.length, 'Experimentos') +
            '</div>' +

            '<div class="lista-temas">' +
            TEMAS.map(function (t) {
                const av = avanceTema(t.id);
                const d = temaDe(t.id);
                const estado = av >= 100 ? 'Completado' : (d.leido ? 'En curso' : 'Sin empezar');
                const buenas = d.aciertos.filter(Boolean).length;
                return '' +
                    '<article class="tema-fila' + (t.id === sugerido ? ' tema-sugerido' : '') + '" data-tema="' + t.id + '" role="button" tabindex="0">' +
                    '  <div class="tema-dibujo ' + t.dibujo + '">' + (ILUSTRACIONES[t.id] || '') + '</div>' +
                    '  <div class="tema-cuerpo">' +
                    '    <div class="tema-encabezado">' +
                    '      <h3>' + esc(t.titulo) + '</h3>' +
                    '      <span class="tema-estado' + (av >= 100 ? ' tema-listo' : '') + '">' + estado + '</span>' +
                    '    </div>' +
                    '    <p>' + esc(t.resumen) + '</p>' +
                    '    <div class="tema-meta">' +
                    '      <span>' + t.teoria.length + ' lecturas</span>' +
                    '      <span>' + t.formulas.length + ' fórmulas</span>' +
                    '      <span>' + LABS[t.id].titulo + '</span>' +
                    '      <span>' + buenas + ' de ' + t.preguntas.length + ' preguntas</span>' +
                    '    </div>' +
                    '    <div class="tema-pie">' +
                    '      <div class="tema-anillo" style="--pct:' + (av * 3.6) + 'deg"><span>' + av + '%</span></div>' +
                    '      <span class="tema-abrir">' + (av >= 100 ? 'Repasar el tema' : (d.leido ? 'Continuar' : 'Abrir tema')) + ' →</span>' +
                    (t.id === sugerido ? '<span class="tema-marca">Sigue por aquí</span>' : '') +
                    '    </div>' +
                    '  </div>' +
                    '</article>';
            }).join('') +
            '</div>';
    }


    function miniDato(valor, texto) {
        return '<div class="mini-dato"><strong>' + valor + '</strong><span>' + texto + '</span></div>';
    }


    /* =========================================================
       7. VISTA: LECTURA DE UN TEMA
       ========================================================= */

    let temaAbierto = null;

    function abrirTema(id) {
        const tema = TEMAS.filter(function (t) { return t.id === id; })[0];
        if (!tema) return;
        temaAbierto = tema;

        const d = temaDe(id);
        const primeraVez = !d.leido;
        if (primeraVez) {
            d.leido = true;
            sumarPuntos(PUNTOS.lectura, 'Leíste ' + tema.titulo);
            anotar('Abriste el tema ' + tema.titulo);
        }
        guardarDatos();

        const lab = LABS[id];

        const v = document.getElementById('vistaLectura');
        v.innerHTML = '' +
            '<button class="volver-btn" data-ir="temas">← Volver a los temas</button>' +
            '<article class="lectura">' +
            '  <div class="lectura-portada ' + tema.dibujo + '">' + (ILUSTRACIONES[id] || '') + '</div>' +
            '  <h2 class="lectura-titulo">' + esc(tema.titulo) + '</h2>' +
            '  <p class="lectura-resumen">' + esc(tema.resumen) + '</p>' +

            tema.teoria.map(function (b) {
                return '<section class="lectura-bloque"><h3>' + esc(b.t) + '</h3><p>' + esc(b.p) + '</p></section>';
            }).join('') +

            '  <h3 class="lectura-sub">Fórmulas del tema</h3>' +
            '  <div class="formulas">' +
            tema.formulas.map(function (f) {
                return '<div class="formula-item"><span class="formula-txt">' + esc(f.f) + '</span><span class="formula-des">' + esc(f.d) + '</span></div>';
            }).join('') +
            '  </div>' +

            '  <h3 class="lectura-sub">Laboratorio rápido · ' + lab.titulo + '</h3>' +
            '  <div class="lab">' +
            '    <div class="lab-escena" id="labEscena"></div>' +
            '    <div class="lab-panel">' +
            '      <p class="lab-nota">' + lab.nota + '</p>' +
            lab.controles.map(function (c) {
                return '' +
                    '<label class="lab-control">' +
                    '  <span class="lab-et">' + c.et + '<b id="lab-val-' + c.id + '">' + c.val + c.uni + '</b></span>' +
                    '  <input class="lab-slider" type="range" data-lab="' + c.id + '"' +
                    ' min="' + c.min + '" max="' + c.max + '" step="' + c.paso + '" value="' + c.val + '">' +
                    '</label>';
            }).join('') +
            '      <div class="lab-resultado">' +
            '        <span class="lab-formula">' + lab.formula + '</span>' +
            '        <strong id="labValor">—</strong>' +
            '        <span class="lab-pie" id="labPie"></span>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +

            '  <h3 class="lectura-sub">Comprueba lo que entendiste</h3>' +
            '  <div class="preguntas" id="preguntasTema"></div>' +

            '  <div class="lectura-pie" id="lecturaPie"></div>' +
            '</article>';

        pintarLab();
        pintarPreguntas();
        abrirVista('lectura');
    }


    /* Valores actuales de los controles del laboratorio */

    function valoresLab() {
        const v = {};
        $$('#vistaLectura .lab-slider').forEach(function (s) {
            v[s.dataset.lab] = parseFloat(s.value);
        });
        return v;
    }


    function pintarLab() {

        if (!temaAbierto) return;
        const lab = LABS[temaAbierto.id];
        const escena = document.getElementById('labEscena');
        if (!lab || !escena) return;

        const v = valoresLab();
        const r = lab.calcular(v);

        escena.innerHTML = lab.dibujo(v);
        document.getElementById('labValor').textContent = r.valor;
        document.getElementById('labPie').textContent = r.pie;

        lab.controles.forEach(function (c) {
            const et = document.getElementById('lab-val-' + c.id);
            if (et) et.textContent = v[c.id] + c.uni;
        });
    }


    /* Mover un control vuelve a dibujar el experimento */

    document.addEventListener('input', function (e) {
        if (e.target.classList && e.target.classList.contains('lab-slider')) pintarLab();
    });


    function pintarPreguntas() {
        const tema = temaAbierto;
        const d = temaDe(tema.id);
        const caja = document.getElementById('preguntasTema');

        caja.innerHTML = tema.preguntas.map(function (q, i) {
            const resuelta = d.aciertos[i] !== undefined;
            const acerto = d.aciertos[i] === true;
            return '' +
                '<div class="pregunta' + (resuelta ? (acerto ? ' preg-ok' : ' preg-mal') : '') + '" data-preg="' + i + '">' +
                '  <p class="pregunta-txt"><span class="pregunta-num">' + (i + 1) + '</span>' + esc(q.p) + '</p>' +
                '  <div class="opciones">' +
                q.op.map(function (o, j) {
                    let clase = 'opcion';
                    if (resuelta && j === q.ok) clase += ' opcion-ok';
                    if (resuelta && !acerto && d.marcada && d.marcada[i] === j) clase += ' opcion-mal';
                    return '<button class="' + clase + '" data-op="' + j + '"' + (resuelta ? ' disabled' : '') + '>' + esc(o) + '</button>';
                }).join('') +
                '  </div>' +
                (resuelta ? '<p class="explicacion">' + (acerto ? '✓ ' : '✕ ') + esc(q.exp) + '</p>' : '') +
                '</div>';
        }).join('');

        pintarPieLectura();
    }


    function pintarPieLectura() {
        const tema = temaAbierto;
        const d = temaDe(tema.id);
        const resueltas = tema.preguntas.filter(function (q, i) { return d.aciertos[i] !== undefined; }).length;
        const buenas = d.aciertos.filter(Boolean).length;
        const pie = document.getElementById('lecturaPie');
        if (!pie) return;

        if (resueltas < tema.preguntas.length) {
            pie.innerHTML = '<p class="pie-nota">Llevas ' + resueltas + ' de ' + tema.preguntas.length + ' preguntas respondidas.</p>';
            return;
        }

        pie.innerHTML = '' +
            '<div class="pie-final">' +
            '  <strong>Tema terminado</strong>' +
            '  <p>Acertaste ' + buenas + ' de ' + tema.preguntas.length + ' preguntas. Avance del tema: ' + avanceTema(tema.id) + '%.</p>' +
            '  <button class="volver-btn" data-ir="temas">Ver los demás temas</button>' +
            '</div>';
    }


    function responderPregunta(indice, opcion) {
        const tema = temaAbierto;
        const d = temaDe(tema.id);
        if (d.aciertos[indice] !== undefined) return;

        const bien = opcion === tema.preguntas[indice].ok;
        d.aciertos[indice] = bien;
        if (!d.marcada) d.marcada = {};
        d.marcada[indice] = opcion;

        if (bien) {
            datos.aciertos += 1;
            sumarPuntos(PUNTOS.pregunta, 'Pregunta acertada en ' + tema.titulo);
        } else {
            guardarDatos();
        }

        /* Bonificación al dejar el tema al 100 % */
        const completo = tema.preguntas.every(function (q, i) { return d.aciertos[i] === true; });
        if (completo && !d.premiado) {
            d.premiado = true;
            sumarPuntos(PUNTOS.temaCompleto, 'Completaste ' + tema.titulo);
            if (temasCompletos() === TEMAS.length && !datos.premioFinal) {
                datos.premioFinal = true;
                sumarPuntos(PUNTOS.todosLosTemas, 'Terminaste los cuatro temas');
            }
        }

        guardarDatos();
        revisarLogros();
        pintarPreguntas();
        aviso(bien ? '¡Correcto! +' + PUNTOS.pregunta + ' puntos' : 'Revisa la explicación');
    }


    /* =========================================================
       8. VISTA: SIMULADORES
       ========================================================= */

    function pintarSimuladores() {
        const v = document.getElementById('vistaSimuladores');
        if (!v) return;

        v.innerHTML = '' +
            cabecera('Simuladores', 'Cada simulador deja cambiar los valores y ver qué ocurre al instante. Los seis se abren dentro de la plataforma, sin salir a internet.') +
            '<div class="lista-sims">' +
            SIMULADORES.map(function (s) {
                const visto = datos.fichas.indexOf(s.id) !== -1;
                const listo = !!s.archivo;
                const estado = listo ? 'Disponible' : (visto ? 'Ficha leída' : 'Próximamente');
                return '' +
                    '<article class="sim-ficha"' +
                    (listo ? '' : ' data-sim="' + s.id + '" role="button" tabindex="0"') + '>' +
                    '  <div class="sim-image ' + s.dibujo + '"></div>' +
                    '  <div class="sim-ficha-cuerpo">' +
                    '    <div class="tema-encabezado">' +
                    '      <h3>' + esc(s.titulo) + '</h3>' +
                    '      <span class="tema-estado' + (listo ? ' tema-listo' : '') + '">' + estado + '</span>' +
                    '    </div>' +
                    '    <p>' + esc(s.resumen) + '</p>' +
                    '    <dl class="sim-datos">' +
                    '      <dt>Controles</dt><dd>' + esc(s.controles) + '</dd>' +
                    '      <dt>Fórmula</dt><dd class="sim-formula">' + esc(s.formula) + '</dd>' +
                    '      <dt>Qué aprendes</dt><dd>' + esc(s.aprendes) + '</dd>' +
                    '    </dl>' +
                    (listo
                        ? '    <button class="sim-abrir" data-abrir-sim="' + s.id + '">▶ &nbsp; Abrir simulador</button>'
                        : '') +
                    '  </div>' +
                    '</article>';
            }).join('') +
            '</div>';
    }


    function verFicha(id) {
        const sim = SIMULADORES.filter(function (s) { return s.id === id; })[0];
        if (!sim) return;
        abrirVista('simuladores');
        if (datos.fichas.indexOf(id) === -1) {
            datos.fichas.push(id);
            sumarPuntos(PUNTOS.ficha, 'Revisaste la ficha de ' + sim.titulo);
            revisarLogros();
            pintarSimuladores();
        }
        const el = document.querySelector('.sim-ficha[data-sim="' + id + '"]');
        if (el) {
            el.classList.add('resaltada');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(function () { el.classList.remove('resaltada'); }, 1400);
        }
    }


    /* =========================================================
       8b. VISTA: SIMULADOR EMBEBIDO
       La simulación se abre dentro de la app, con el marco, la guía
       de uso y los colores de la plataforma.
       ========================================================= */

    function abrirSimulador(id) {

        const sim = SIMULADORES.filter(function (s) { return s.id === id; })[0];
        if (!sim) return;
        if (!sim.archivo) { verFicha(id); return; }

        /* Puntos la primera vez que se usa cada simulador */
        if (datos.simulados.indexOf(id) === -1) {
            datos.simulados.push(id);
            if (datos.fichas.indexOf(id) === -1) datos.fichas.push(id);
            sumarPuntos(PUNTOS.simulador, 'Usaste el simulador de ' + sim.titulo);
            anotar('Abriste el simulador de ' + sim.titulo);
            revisarLogros();
            guardarDatos();
        }

        const v = document.getElementById('vistaSimulador');
        v.innerHTML = '' +
            '<button class="volver-btn" data-ir="simuladores">← Volver a los simuladores</button>' +
            '<article class="sim-vista">' +

            '  <header class="sim-vista-cab">' +
            '    <div class="sim-vista-id">' +
            '      <span class="sim-vista-eti">Simulador interactivo</span>' +
            '      <h2 class="sim-vista-titulo">' + esc(sim.titulo) + '</h2>' +
            '      <p class="sim-vista-resumen">' + esc(sim.resumen) + '</p>' +
            '    </div>' +
            '    <div class="sim-vista-acciones">' +
            '      <span class="sim-vista-formula">' + esc(sim.formula) + '</span>' +
            '      <button class="sim-accion" data-sim-accion="reiniciar">⟲ Reiniciar</button>' +
            '      <button class="sim-accion sim-accion-p" data-sim-accion="pantalla">⛶ Pantalla completa</button>' +
            '    </div>' +
            '  </header>' +

            '  <div class="sim-marco" id="simMarco">' +
            '    <div class="sim-cargando" id="simCargando">Cargando el simulador…</div>' +
            '    <iframe class="sim-frame" id="simFrame" title="' + esc(sim.titulo) + '" ' +
            '      src="' + sim.archivo + '" allowfullscreen></iframe>' +
            '  </div>' +

            '  <div class="sim-guias">' +
            '    <section class="sim-guia">' +
            '      <h3 class="sim-guia-t">Paso a paso</h3>' +
            '      <ol class="sim-pasos">' +
            (sim.pasos || []).map(function (t) { return '<li>' + t + '</li>'; }).join('') +
            '      </ol>' +
            '    </section>' +
            '    <section class="sim-guia">' +
            '      <h3 class="sim-guia-t">Qué debes observar</h3>' +
            '      <ul class="sim-observa">' +
            (sim.observa || []).map(function (t) { return '<li>' + t + '</li>'; }).join('') +
            '      </ul>' +
            '      <p class="sim-aprendes"><b>Qué aprendes.</b> ' + esc(sim.aprendes) + '</p>' +
            '    </section>' +
            '  </div>' +

            '  <p class="sim-credito">' + esc(sim.credito || '') + '</p>' +
            '</article>';

        const frame = document.getElementById('simFrame');
        if (frame) {
            frame.addEventListener('load', function () {
                const c = document.getElementById('simCargando');
                if (c) c.remove();
            });
        }

        abrirVista('simulador');
    }


    /* Botones propios de la vista del simulador */

    document.addEventListener('click', function (e) {

        const acc = e.target.closest('[data-sim-accion]');
        if (!acc) return;

        const marco = document.getElementById('simMarco');
        const frame = document.getElementById('simFrame');
        if (!marco || !frame) return;

        if (acc.dataset.simAccion === 'reiniciar') {
            frame.src = frame.getAttribute('src');   /* vuelve a cargar la simulación */
            aviso('Simulador reiniciado');
        }

        if (acc.dataset.simAccion === 'pantalla') {
            if (document.fullscreenElement) document.exitFullscreen();
            else if (marco.requestFullscreen) marco.requestFullscreen();
        }
    });


    /* =========================================================
       9. VISTA: MIS PUNTOS
       ========================================================= */

    function pintarPuntos() {
        const v = document.getElementById('vistaPuntos');
        if (!v) return;

        const nivel = nivelDe(datos.puntos);
        const falta = nivel.siguiente ? nivel.siguiente.min - datos.puntos : 0;
        const desde = nivel.actual.min;
        const hasta = nivel.siguiente ? nivel.siguiente.min : nivel.actual.min + 1;
        const barra = nivel.siguiente
            ? Math.round(((datos.puntos - desde) / (hasta - desde)) * 100)
            : 100;

        v.innerHTML = '' +
            cabecera('Mis puntos', 'Los puntos se ganan estudiando: no hay atajos.') +

            '<div class="puntos-cabecera">' +
            '  <div class="puntos-grande">' +
            '    <span class="puntos-cifra">' + datos.puntos.toLocaleString('es-CO') + '</span>' +
            '    <span class="puntos-lbl">puntos acumulados</span>' +
            '  </div>' +
            '  <div class="puntos-nivel">' +
            '    <span class="nivel-nombre">' + nivel.actual.nombre + '</span>' +
            '    <div class="progress"><span style="width:' + barra + '%"></span></div>' +
            '    <span class="nivel-falta">' +
            (nivel.siguiente ? 'Te faltan ' + falta + ' puntos para ' + nivel.siguiente.nombre : 'Nivel máximo alcanzado') +
            '    </span>' +
            '  </div>' +
            '</div>' +

            '<div class="dos-columnas">' +

            '  <div class="bloque">' +
            '    <h3 class="bloque-titulo">Cómo ganar puntos</h3>' +
            '    <ul class="tabla-puntos">' +
            '      <li><span>Leer un tema</span><b>+' + PUNTOS.lectura + '</b></li>' +
            '      <li><span>Acertar una pregunta</span><b>+' + PUNTOS.pregunta + '</b></li>' +
            '      <li><span>Completar un tema</span><b>+' + PUNTOS.temaCompleto + '</b></li>' +
            '      <li><span>Terminar los cuatro temas</span><b>+' + PUNTOS.todosLosTemas + '</b></li>' +
            '      <li><span>Acertar el reto del día</span><b>+' + PUNTOS.retoBien + '</b></li>' +
            '      <li><span>Revisar la ficha de un simulador</span><b>+' + PUNTOS.ficha + '</b></li>' +
            '    </ul>' +
            '  </div>' +

            '  <div class="bloque">' +
            '    <h3 class="bloque-titulo">Actividad reciente</h3>' +
            (datos.actividad.length
                ? '<ul class="actividad">' + datos.actividad.map(function (a) {
                    return '<li><span>' + esc(a.texto) + '</span><time>' + haceCuanto(a.ts) + '</time></li>';
                }).join('') + '</ul>'
                : '<p class="vacio">Todavía no hay actividad. Abre un tema o responde el reto del día.</p>') +
            '  </div>' +

            '</div>';
    }


    /* =========================================================
       10. VISTA: LOGROS
       ========================================================= */

    function pintarLogros() {
        const v = document.getElementById('vistaLogros');
        if (!v) return;

        const ganados = datos.logros.length;

        v.innerHTML = '' +
            cabecera('Logros', 'Has desbloqueado ' + ganados + ' de ' + LOGROS.length + ' logros.') +
            '<div class="grid-logros">' +
            LOGROS.map(function (l) {
                const ganado = datos.logros.indexOf(l.id) !== -1;
                const hecho = Math.min(l.meta, progresoLogro(l.id));
                const pct = Math.round((hecho / l.meta) * 100);
                return '' +
                    '<article class="logro' + (ganado ? ' logro-ganado' : '') + '">' +
                    '  <div class="logro-icono">' + l.icono + '</div>' +
                    '  <h3>' + esc(l.titulo) + '</h3>' +
                    '  <p>' + esc(l.pista) + '</p>' +
                    '  <div class="progress"><span style="width:' + pct + '%"></span></div>' +
                    '  <span class="logro-cuenta">' + (ganado ? 'Conseguido' : hecho + ' / ' + l.meta) + '</span>' +
                    '</article>';
            }).join('') +
            '</div>';
    }


    /* =========================================================
       11. VISTA: PERFIL
       ========================================================= */

    function pintarPerfil() {
        const v = document.getElementById('vistaPerfil');
        if (!v) return;

        const inicial = (datos.nombre || '?').trim().charAt(0).toUpperCase();
        const nivel = nivelDe(datos.puntos).actual.nombre;
        const preguntasTotales = TEMAS.reduce(function (n, t) { return n + t.preguntas.length; }, 0);

        v.innerHTML = '' +
            cabecera('Mi perfil', 'Tus datos y tu recorrido en la plataforma.') +

            '<div class="perfil-tarjeta">' +
            '  <div class="perfil-avatar">' + esc(inicial) + '</div>' +
            '  <div class="perfil-datos">' +
            '    <h3>' + esc(datos.nombre || 'Estudiante') + '</h3>' +
            '    <p class="perfil-grado">Estudiante de ' + esc(datos.grado || '—') + '° grado</p>' +
            '    <div class="perfil-chips">' +
            '      <span class="chip-perfil">' + nivel + '</span>' +
            '      <span class="chip-perfil">' + datos.puntos.toLocaleString('es-CO') + ' puntos</span>' +
            '      <span class="chip-perfil">🔥 ' + datos.racha.dias + (datos.racha.dias === 1 ? ' día' : ' días') + ' seguidos</span>' +
            '    </div>' +
            '  </div>' +
            '</div>' +

            '<div class="grid-resumen">' +
            resumen('Temas completados', temasCompletos() + ' / ' + TEMAS.length) +
            resumen('Preguntas acertadas', datos.aciertos + ' / ' + preguntasTotales) +
            resumen('Retos del día', datos.retos.aciertos + ' acertados') +
            resumen('Logros', datos.logros.length + ' / ' + LOGROS.length) +
            resumen('Avance general', avanceGeneral() + '%') +
            resumen('En la plataforma desde', esc(datos.desde || hoy())) +
            '</div>' +

            '<div class="bloque perfil-avance">' +
            '  <h3 class="bloque-titulo">Tu avance por tema</h3>' +
            TEMAS.map(function (t) {
                const av = avanceTema(t.id);
                return '' +
                    '<div class="avance-fila" data-tema="' + t.id + '" role="button" tabindex="0">' +
                    '  <span class="avance-nombre">' + esc(t.titulo) + '</span>' +
                    '  <div class="progress"><span style="width:' + av + '%"></span></div>' +
                    '  <span class="avance-pct">' + av + '%</span>' +
                    '</div>';
            }).join('') +
            '</div>' +

            '<div class="perfil-acciones">' +
            '  <button class="accion-btn" id="btnEditarPerfil">Cambiar nombre o grado</button>' +
            '  <button class="accion-btn accion-suave" id="btnOtroEstudiante">Es otro estudiante</button>' +
            '</div>';

        document.getElementById('btnEditarPerfil').addEventListener('click', editarPerfil);
        document.getElementById('btnOtroEstudiante').addEventListener('click', otroEstudiante);
    }


    function resumen(titulo, valor) {
        return '<div class="resumen-item"><span class="resumen-lbl">' + titulo + '</span><strong>' + valor + '</strong></div>';
    }


    function editarPerfil() {
        const nombre = prompt('Nombre completo del estudiante:', datos.nombre);
        if (nombre === null) return;
        if (!nombre.trim()) { aviso('El nombre no puede quedar vacío'); return; }

        let grado = prompt('Grado (10 u 11):', datos.grado);
        if (grado === null) return;
        grado = grado.trim().replace(/[^0-9]/g, '');
        if (grado !== '10' && grado !== '11') { aviso('El grado debe ser 10 u 11'); return; }

        datos.nombre = nombre.trim().toUpperCase();
        datos.grado = grado;
        guardarDatos();
        pintarEncabezado();
        pintarPerfil();
        aviso('Datos actualizados');
    }


    function otroEstudiante() {
        if (!confirm('Se cerrará esta sesión y el progreso de ' + (datos.nombre || 'este estudiante') +
            ' quedará guardado en este computador. ¿Continuar?')) return;
        cerrarSesion();
        document.getElementById('dashboardPage').style.display = 'none';
        const acerca = document.getElementById('acercaPage');
        if (acerca) acerca.style.display = 'none';
        document.getElementById('registroPage').style.display = '';
        document.getElementById('nombre').value = '';
        $$('.grado-btn').forEach(function (b) { b.classList.remove('selected'); });
        window.scrollTo({ top: 0, behavior: 'instant' });
    }


    /* =========================================================
       12. VISTA: AJUSTES
       ========================================================= */

    function pintarAjustes() {
        const v = document.getElementById('vistaAjustes');
        if (!v) return;

        const claro = document.documentElement.getAttribute('data-tema') === 'claro';
        const quietas = document.body.classList.contains('sin-animacion');

        v.innerHTML = '' +
            cabecera('Ajustes', 'Todo se guarda en este computador; no se envía a ningún servidor.') +

            '<div class="ajustes">' +

            ajuste('tema', 'Apariencia', 'Modo claro para salones con mucha luz; modo oscuro para proyectar.',
                claro ? 'Modo claro' : 'Modo oscuro') +

            ajuste('animacion', 'Animaciones', 'Apágalas si el computador va lento o si el movimiento te incomoda.',
                quietas ? 'Desactivadas' : 'Activadas') +

            ajuste('acerca', 'Acerca de la aplicación', 'Información del proyecto y opciones para compartirla.', 'Abrir') +

            ajuste('borrar', 'Borrar mi progreso', 'Elimina puntos, avance y logros de este computador. No se puede deshacer.', 'Borrar') +

            '</div>';

        v.querySelectorAll('.ajuste-btn').forEach(function (b) {
            b.addEventListener('click', function () { accionAjuste(b.dataset.ajuste); });
        });
    }


    function ajuste(id, titulo, texto, boton) {
        return '' +
            '<div class="ajuste' + (id === 'borrar' ? ' ajuste-riesgo' : '') + '">' +
            '  <div class="ajuste-txt"><h3>' + titulo + '</h3><p>' + texto + '</p></div>' +
            '  <button class="ajuste-btn" data-ajuste="' + id + '">' + boton + '</button>' +
            '</div>';
    }


    function accionAjuste(id) {

        if (id === 'tema') {
            const btn = document.querySelector('.tema-btn');
            if (btn) btn.click();
            pintarAjustes();
            return;
        }

        if (id === 'animacion') {
            const quietas = document.body.classList.toggle('sin-animacion');
            try { localStorage.setItem('fisica-animacion', quietas ? 'off' : 'on'); } catch (e) { }
            pintarAjustes();
            aviso(quietas ? 'Animaciones desactivadas' : 'Animaciones activadas');
            return;
        }

        if (id === 'acerca') {
            if (window.abrirAcerca) window.abrirAcerca();
            return;
        }

        if (id === 'borrar') {
            if (!confirm('Se borrarán los puntos, el avance y los logros de este computador. ¿Seguro?')) return;
            const nombre = datos.nombre, grado = datos.grado;
            datos = JSON.parse(JSON.stringify(estadoBase));
            datos.nombre = nombre;
            datos.grado = grado;
            datos.desde = hoy();
            guardarDatos();
            puntosPintados = 0;
            revisarRacha();
            pintarEncabezado();
            pintarInicio();
            pintarAjustes();
            aviso('Progreso borrado');
        }
    }


    /* =========================================================
       13. PIEZAS COMUNES
       ========================================================= */

    function cabecera(titulo, texto) {
        return '' +
            '<header class="vista-cabecera">' +
            '  <h2>' + titulo + '</h2>' +
            '  <p>' + texto + '</p>' +
            '</header>';
    }


    function pintarEncabezado() {
        const n = document.getElementById('studentName');
        const g = document.getElementById('studentGrade');
        if (n) n.textContent = datos.nombre || 'Estudiante';
        if (g) g.textContent = 'Estudiante de ' + (datos.grado || '10') + '° grado';
        animarPuntos();
    }


    /* =========================================================
       14. REGISTRO DEL ESTUDIANTE
       Lo llama feria-script.js cuando alguien pulsa Continuar.
       ========================================================= */

    function registrarEstudiante(nombre, grado) {

        const mismo = datos.nombre &&
            datos.nombre.trim().toLowerCase() === String(nombre).trim().toLowerCase();

        if (!mismo) {
            /* Estudiante distinto: empieza de cero, pero conserva su nombre */
            datos = JSON.parse(JSON.stringify(estadoBase));
            datos.desde = hoy();
            puntosPintados = 0;
        }

        datos.nombre = String(nombre).trim().toUpperCase();
        datos.grado = String(grado);
        if (!datos.desde) datos.desde = hoy();

        revisarRacha();
        revisarLogros();
        guardarDatos();
        abrirSesion();

        pintarEncabezado();
        abrirVista('inicio');

        if (mismo && datos.puntos > 0) {
            aviso('¡Hola de nuevo! Sigues con ' + datos.puntos + ' puntos');
        }
    }


    /* =========================================================
       15. CLICS
       ========================================================= */

    document.addEventListener('click', function (e) {

        /* Botones que llevan a una vista: data-ir="temas" */
        const ir = e.target.closest('[data-ir]');
        if (ir) { abrirVista(ir.dataset.ir); return; }

        /* Tarjeta o fila de un tema.
           Se excluye <html>, que lleva data-tema="claro" para el modo claro:
           sin ese :not(html) cualquier clic entraba por aqui y se perdia. */
        const tema = e.target.closest('[data-tema]:not(html)');
        if (tema) { abrirTema(tema.dataset.tema); return; }

        /* Simuladores */
        const abrir = e.target.closest('[data-abrir-sim]');
        if (abrir) { abrirSimulador(abrir.dataset.abrirSim); return; }

        const sim = e.target.closest('[data-sim]');
        if (sim) { verFicha(sim.dataset.sim); return; }

        /* Opciones de una pregunta */
        const op = e.target.closest('.opcion');
        if (op && !op.disabled) {
            const preg = op.closest('[data-preg]');
            responderPregunta(parseInt(preg.dataset.preg, 10), parseInt(op.dataset.op, 10));
            return;
        }

        /* Reto del día */
        const reto = e.target.closest('.reto-op');
        if (reto) { responderReto(parseInt(reto.dataset.op, 10)); return; }

    });


    const botonPerfil = document.getElementById('btnPerfil');
    if (botonPerfil) {
        botonPerfil.addEventListener('click', function () { abrirVista('perfil'); });
    }


    /* Enter y barra espaciadora sobre las tarjetas */
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const foco = document.activeElement;
        if (!foco || !foco.matches('[data-tema]:not(html), [data-sim], [data-abrir-sim]')) return;
        e.preventDefault();
        foco.click();
    });


    /* =========================================================
       16. ARRANQUE
       ========================================================= */

    /* Preferencia de animaciones */
    try {
        if (localStorage.getItem('fisica-animacion') === 'off') {
            document.body.classList.add('sin-animacion');
        }
    } catch (e) { }

    revisarRacha();
    pintarInicio();

    /* Sesión ya abierta: al recargar se entra directo al tablero.
       Sin esto la app volvía siempre a la pantalla de registro. */
    reanudarSesion();

    function reanudarSesion() {
        if (!haySesion() || !datos.nombre || !datos.grado) return;

        const registro = document.getElementById('registroPage');
        const tablero = document.getElementById('dashboardPage');
        if (!registro || !tablero) return;

        registro.style.display = 'none';
        tablero.style.display = 'block';

        pintarEncabezado();
        abrirVista('inicio');
    }

    /* Funciones que usan el HTML y feria-script.js */
    window.abrirVista = abrirVista;
    window.abrirTema = abrirTema;
    window.registrarEstudiante = registrarEstudiante;
    window.abrirSimulador = verFicha;

})();
