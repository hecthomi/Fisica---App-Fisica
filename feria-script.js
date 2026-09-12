

        /* =========================================================
           MOVIMIENTO DE LOS ELEMENTOS DE LA PRIMERA PANTALLA
           ========================================================= */

        const decorItems =
            document.querySelectorAll(
                '#registroPage .decor[data-depth]'
            );

        window.addEventListener('mousemove', (e) => {

            const registro =
                document.getElementById('registroPage');

            if (registro.style.display === 'none') {
                return;
            }

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            const dx =
                (e.clientX - cx) / cx;

            const dy =
                (e.clientY - cy) / cy;

            decorItems.forEach(el => {

                const depth =
                    parseFloat(el.dataset.depth) || 0;

                el.style.transform =
                    `translate(${dx * depth}px, ${dy * depth}px)`;

            });

        });


        /* =========================================================
           REGISTRO
           ========================================================= */

        let gradoSeleccionado = null;

        const botones =
            document.querySelectorAll('.grado-btn');

        const btnContinuar =
            document.getElementById('btn-continuar');

        const inputNombre =
            document.getElementById('nombre');

        const errorNombre =
            document.getElementById('error-nombre');

        const errorGrado =
            document.getElementById('error-grado');


        /* SELECCIONAR GRADO */

        botones.forEach(btn => {

            btn.addEventListener('click', () => {

                botones.forEach(b =>
                    b.classList.remove('selected')
                );

                btn.classList.add('selected');

                gradoSeleccionado =
                    btn.dataset.grado;

                errorGrado.classList.remove('mostrar');

            });

        });


        /* SOLO MAYÚSCULAS + QUITAR EL ERROR DEL NOMBRE */

        inputNombre.addEventListener('input', () => {

            const mayusculas =
                inputNombre.value.toUpperCase();

            if (inputNombre.value !== mayusculas) {

                /* Se guarda dónde está el cursor: al reescribir el
                   valor, el navegador lo mandaría al final. */

                const desde = inputNombre.selectionStart;
                const hasta = inputNombre.selectionEnd;

                inputNombre.value = mayusculas;

                inputNombre.setSelectionRange(desde, hasta);

            }

            if (inputNombre.value.trim().length > 0) {

                errorNombre.classList.remove('mostrar');

            }

        });


        /* =========================================================
           PASAR AL DASHBOARD
           ========================================================= */

        btnContinuar.addEventListener('click', () => {

            const nombre =
                inputNombre.value.trim().toUpperCase();

            let ok = true;


            if (nombre.length === 0) {

                errorNombre.classList.add('mostrar');

                ok = false;

            }


            if (!gradoSeleccionado) {

                errorGrado.classList.add('mostrar');

                ok = false;

            }


            if (!ok) {
                return;
            }


            /* Guardamos los datos */

            document.getElementById('studentName').textContent =
                nombre;

            document.getElementById('studentGrade').textContent =
                'Estudiante de ' +
                gradoSeleccionado +
                '° grado';

            /* La aplicación carga el progreso de este estudiante */

            if (typeof registrarEstudiante === 'function') {

                registrarEstudiante(nombre, gradoSeleccionado);

            }


            /* Ocultamos registro */

            document.getElementById('registroPage').style.display =
                'none';


            /* Mostramos dashboard */

            const dashboard =
                document.getElementById('dashboardPage');

            dashboard.style.display =
                'block';

            dashboard.classList.add('visible');


            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });

        });


        /* =========================================================
           BOTONES DEL MENÚ
           ========================================================= */

        const sideItems =
            document.querySelectorAll('.side-item');

        sideItems.forEach(item => {

            item.addEventListener('click', () => {

                sideItems.forEach(i =>
                    i.classList.remove('active')
                );

                item.classList.add('active');

                const section =
                    item.dataset.section;

                if (section === 'acerca') {

                    abrirAcerca();

                } else if (typeof abrirVista === 'function') {

                    abrirVista(section);

                } else {

                    mostrarMensaje(
                        'Has seleccionado: ' +
                        item.textContent.trim()
                    );

                }

            });

        });


        /* =========================================================
           MENSAJES TEMPORALES
           ========================================================= */

        function mostrarMensaje(texto) {

            const mensaje =
                document.createElement('div');

            mensaje.textContent =
                texto;

            mensaje.style.position =
                'fixed';

            mensaje.style.bottom =
                '25px';

            mensaje.style.left =
                '50%';

            mensaje.style.transform =
                'translateX(-50%)';

            mensaje.style.padding =
                '12px 20px';

            mensaje.style.borderRadius =
                '8px';

            mensaje.style.background =
                'linear-gradient(90deg,#096de0,#153fa4)';

            mensaje.style.color =
                '#fff';

            mensaje.style.fontSize =
                '12px';

            mensaje.style.zIndex =
                '9999';

            mensaje.style.boxShadow =
                '0 8px 30px rgba(0,0,0,.4)';

            document.body.appendChild(mensaje);


            setTimeout(() => {

                mensaje.style.opacity =
                    '0';

                mensaje.style.transition =
                    '.3s';

                setTimeout(() =>
                    mensaje.remove(), 300);

            }, 1800);

        }


        /* =========================================================
           SIMULADORES
           ========================================================= */

        function abrirSimulador(nombre) {

            mostrarMensaje(
                'Abriendo simulador: ' + nombre
            );

        }


        /* El botón Explorar temas ahora lleva a la vista de Temas
           (lo hace el atributo data-ir del propio botón). */

        /* =========================================================
           MODO CLARO / OSCURO
           ========================================================= */

        const CLAVE_TEMA = 'fisica-tema';

        const botonesTema =
            document.querySelectorAll('.tema-btn');


        function leerTema() {

            try {
                return localStorage.getItem(CLAVE_TEMA);
            } catch (e) {
                return null;
            }

        }


        function guardarTema(tema) {

            try {
                localStorage.setItem(CLAVE_TEMA, tema);
            } catch (e) { }

        }


        function aplicarTema(tema) {

            if (tema === 'claro') {

                document.documentElement.setAttribute('data-tema', 'claro');

            } else {

                document.documentElement.removeAttribute('data-tema');

            }

            const texto =
                tema === 'claro'
                    ? 'Cambiar a modo oscuro'
                    : 'Cambiar a modo claro';

            botonesTema.forEach(boton => {
                boton.setAttribute('aria-label', texto);
                boton.title = texto;
            });

        }


        function temaActual() {

            return document.documentElement.getAttribute('data-tema') === 'claro'
                ? 'claro'
                : 'oscuro';

        }


        /* Tema guardado (el <head> ya lo aplico; aqui se ajustan los botones) */

        aplicarTema(leerTema() === 'claro' ? 'claro' : 'oscuro');


        botonesTema.forEach(boton => {

            boton.addEventListener('click', () => {

                const nuevo =
                    temaActual() === 'claro' ? 'oscuro' : 'claro';

                aplicarTema(nuevo);

                guardarTema(nuevo);

                mostrarMensaje(
                    nuevo === 'claro'
                        ? 'Modo claro activado'
                        : 'Modo oscuro activado'
                );

            });

        });

        /* =========================================================
           ACERCA DE
           ========================================================= */

        const acercaPage =
            document.getElementById('acercaPage');

        const campoUrl =
            document.getElementById('acercaUrl');

        const notaUrl =
            document.getElementById('acercaNota');

        const TEXTO_COMPARTIR =
            'Física · Plataforma educativa, el proyecto de la Feria de Ciencia y Tecnología:';


        /* Enlace de la app y aviso segun desde donde se abrio */

        function enlaceApp() {

            return window.location.href.split('#')[0];

        }


        function revisarEnlace() {

            const host = window.location.hostname;

            if (window.location.protocol === 'file:') {

                notaUrl.textContent =
                    'Estás viendo la aplicación desde un archivo del computador. ' +
                    'Para compartirla, ábrela desde la intranet del colegio.';

                return;

            }

            if (host === 'localhost' || host === '127.0.0.1') {

                notaUrl.textContent =
                    'Este enlace solo funciona en este computador. Para compartirla en la red ' +
                    'del colegio, cambia «' + host + '» por la dirección IP del servidor.';

                return;

            }

            notaUrl.textContent =
                'Cualquier equipo conectado a la red del colegio puede abrir este enlace.';

        }


        function abrirAcerca() {

            document.getElementById('registroPage').style.display = 'none';

            document.getElementById('dashboardPage').style.display = 'none';

            acercaPage.style.display = 'block';

            campoUrl.value = enlaceApp();

            revisarEnlace();

            window.scrollTo({ top: 0, behavior: 'instant' });

        }


        function cerrarAcerca() {

            acercaPage.style.display = 'none';

            const dashboard =
                document.getElementById('dashboardPage');

            dashboard.style.display = 'block';

            /* El menu vuelve a marcar Inicio */

            sideItems.forEach(i =>
                i.classList.toggle('active', i.dataset.section === 'inicio')
            );

            window.scrollTo({ top: 0, behavior: 'instant' });

        }


        document
            .getElementById('acercaVolver')
            .addEventListener('click', cerrarAcerca);


        /* --- Copiar el enlace --- */

        document
            .getElementById('btnCopiar')
            .addEventListener('click', () => {

                const enlace = enlaceApp();

                if (navigator.clipboard && window.isSecureContext) {

                    navigator.clipboard.writeText(enlace)
                        .then(() => mostrarMensaje('Enlace copiado'))
                        .catch(() => copiarASalvo());

                } else {

                    copiarASalvo();

                }

            });


        function copiarASalvo() {

            campoUrl.select();

            campoUrl.setSelectionRange(0, 99999);

            try {

                document.execCommand('copy');

                mostrarMensaje('Enlace copiado');

            } catch (e) {

                mostrarMensaje('Copia el enlace con Ctrl + C');

            }

        }


        /* --- WhatsApp --- */

        document
            .getElementById('btnWhatsapp')
            .addEventListener('click', () => {

                const texto =
                    encodeURIComponent(TEXTO_COMPARTIR + ' ' + enlaceApp());

                window.open(
                    'https://wa.me/?text=' + texto,
                    '_blank',
                    'noopener'
                );

            });


        /* --- Correo --- */

        document
            .getElementById('btnCorreo')
            .addEventListener('click', () => {

                const asunto =
                    encodeURIComponent('Física · Plataforma educativa');

                const cuerpo =
                    encodeURIComponent(TEXTO_COMPARTIR + '\n\n' + enlaceApp());

                window.location.href =
                    'mailto:?subject=' + asunto + '&body=' + cuerpo;

            });


        /* --- Compartir del sistema (celulares y tablets) --- */

        const btnSistema =
            document.getElementById('btnSistema');

        if (navigator.share) {

            btnSistema.hidden = false;

            btnSistema.addEventListener('click', () => {

                navigator.share({
                    title: 'Física · Plataforma educativa',
                    text: TEXTO_COMPARTIR,
                    url: enlaceApp()
                }).catch(() => { });

            });

        }
