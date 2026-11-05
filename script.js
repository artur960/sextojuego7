// ======================================
// ECO RUSH
// ======================================


// ELEMENTOS DEL JUEGO

const inicio =
    document.getElementById("inicio");

const juego =
    document.getElementById("juego");

const final =
    document.getElementById("final");

const zonaJuego =
    document.getElementById("zonaJuego");

const jugador =
    document.getElementById("jugador");

const puntosTexto =
    document.getElementById("puntos");

const vidasTexto =
    document.getElementById("vidas");

const tiempoTexto =
    document.getElementById("tiempo");

const mensaje =
    document.getElementById("mensaje");

const resultado =
    document.getElementById("resultado");

const mensajeFinal =
    document.getElementById("mensajeFinal");

const btnInicio =
    document.getElementById("btnInicio");

const btnReintentar =
    document.getElementById("btnReintentar");

const izquierda =
    document.getElementById("izquierda");

const derecha =
    document.getElementById("derecha");


// ======================================
// VARIABLES
// ======================================

let puntos = 0;

let vidas = 3;

let tiempo = 45;

let posicionJugador = 50;

let jugando = false;

let temporizador;

let generadorObjetos;


// ======================================
// OBJETOS
// ======================================

const objetos = [

    {
        emoji: "📱",
        puntos: 10,
        peligroso: false
    },

    {
        emoji: "💻",
        puntos: 15,
        peligroso: false
    },

    {
        emoji: "🖥️",
        puntos: 15,
        peligroso: false
    },

    {
        emoji: "🔋",
        puntos: 20,
        peligroso: false
    },

    {
        emoji: "🎧",
        puntos: 10,
        peligroso: false
    },

    {
        emoji: "🔌",
        puntos: 10,
        peligroso: false
    },

    {
        emoji: "☢️",
        puntos: 0,
        peligroso: true
    },

    {
        emoji: "💣",
        puntos: 0,
        peligroso: true
    }

];


// ======================================
// INICIAR
// ======================================

btnInicio.addEventListener(
    "click",
    iniciarJuego
);


btnReintentar.addEventListener(
    "click",
    iniciarJuego
);


function iniciarJuego() {

    puntos = 0;

    vidas = 3;

    tiempo = 45;

    posicionJugador = 50;

    jugando = true;


    inicio.classList.add(
        "oculto"
    );

    final.classList.add(
        "oculto"
    );

    juego.classList.remove(
        "oculto"
    );


    puntosTexto.textContent =
        puntos;

    vidasTexto.textContent =
        vidas;

    tiempoTexto.textContent =
        tiempo;


    jugador.style.left =
        posicionJugador + "%";


    mensaje.textContent =
        "🚀 ¡Comienza la misión!";


    clearInterval(
        temporizador
    );

    clearInterval(
        generadorObjetos
    );


    iniciarTemporizador();


    generadorObjetos =
        setInterval(
            crearObjeto,
            700
        );

}


// ======================================
// TEMPORIZADOR
// ======================================

function iniciarTemporizador() {

    temporizador =
        setInterval(
            function() {

                tiempo--;

                tiempoTexto.textContent =
                    tiempo;


                if (tiempo <= 0) {

                    terminarJuego();

                }

            },
            1000
        );

}


// ======================================
// MOVER JUGADOR
// ======================================

function moverIzquierda() {

    if (!jugando) {

        return;

    }


    posicionJugador -= 8;


    if (posicionJugador < 8) {

        posicionJugador = 8;

    }


    jugador.style.left =
        posicionJugador + "%";

}


function moverDerecha() {

    if (!jugando) {

        return;

    }


    posicionJugador += 8;


    if (posicionJugador > 92) {

        posicionJugador = 92;

    }


    jugador.style.left =
        posicionJugador + "%";

}


izquierda.addEventListener(
    "click",
    moverIzquierda
);


derecha.addEventListener(
    "click",
    moverDerecha
);


// ======================================
// CREAR OBJETOS
// ======================================

function crearObjeto() {

    if (!jugando) {

        return;

    }


    const objeto =
        document.createElement(
            "div"
        );


    const indice =
        Math.floor(
            Math.random() *
            objetos.length
        );


    const datos =
        objetos[indice];


    objeto.classList.add(
        "objeto"
    );


    objeto.textContent =
        datos.emoji;


    objeto.dataset.puntos =
        datos.puntos;


    objeto.dataset.peligroso =
        datos.peligroso;


    const posicionX =
        Math.random() * 90 + 5;


    objeto.style.left =
        posicionX + "%";


    objeto.style.top =
        "-60px";


    zonaJuego.appendChild(
        objeto
    );


    moverObjeto(
        objeto
    );

}


// ======================================
// HACER CAER OBJETO
// ======================================

function moverObjeto(objeto) {

    let posicionY = -60;


    const velocidad =
        3 + Math.random() * 3;


    const movimiento =
        setInterval(
            function() {

                if (!jugando) {

                    clearInterval(
                        movimiento
                    );

                    objeto.remove();

                    return;

                }


                posicionY +=
                    velocidad;


                objeto.style.top =
                    posicionY + "px";


                comprobarColision(
                    objeto,
                    movimiento
                );


                if (
                    posicionY >
                    zonaJuego.clientHeight
                ) {

                    clearInterval(
                        movimiento
                    );

                    objeto.remove();

                }

            },
            20
        );

}


// ======================================
// COLISIONES
// ======================================

function comprobarColision(
    objeto,
    movimiento
) {

    const rectJugador =
        jugador.getBoundingClientRect();


    const rectObjeto =
        objeto.getBoundingClientRect();


    const colision =

        rectJugador.left <
        rectObjeto.right &&

        rectJugador.right >
        rectObjeto.left &&

        rectJugador.top <
        rectObjeto.bottom &&

        rectJugador.bottom >
        rectObjeto.top;


    if (colision) {

        clearInterval(
            movimiento
        );


        if (
            objeto.dataset.peligroso ===
            "true"
        ) {

            perderVida();

        }

        else {

            ganarPuntos(
                Number(
                    objeto.dataset.puntos
                )
            );

        }


        objeto.remove();

    }

}


// ======================================
// GANAR PUNTOS
// ======================================

function ganarPuntos(
    cantidad
) {

    puntos += cantidad;

    puntosTexto.textContent =
        puntos;


    mensaje.textContent =
        "⚡ +" +
        cantidad +
        " puntos";


}


// ======================================
// PERDER VIDA
// ======================================

function perderVida() {

    vidas--;

    vidasTexto.textContent =
        vidas;


    mensaje.textContent =
        "💥 ¡Objeto peligroso!";


    if (vidas <= 0) {

        terminarJuego();

    }

}


// ======================================
// TERMINAR
// ======================================

function terminarJuego() {

    jugando = false;


    clearInterval(
        temporizador
    );

    clearInterval(
        generadorObjetos
    );


    const objetosPantalla =
        document.querySelectorAll(
            ".objeto"
        );


    objetosPantalla.forEach(
        function(objeto) {

            objeto.remove();

        }
    );


    juego.classList.add(
        "oculto"
    );


    final.classList.remove(
        "oculto"
    );


    resultado.textContent =
        puntos;


    if (puntos >= 250) {

        mensajeFinal.textContent =
            "🏆 ¡LEYENDA ECO! ¡Salvaste al planeta!";

    }

    else if (puntos >= 150) {

        mensajeFinal.textContent =
            "🔥 ¡Excelente! ¡Tienes reflejos de campeón!";

    }

    else if (puntos >= 80) {

        mensajeFinal.textContent =
            "🌱 ¡Muy bien! ¡Sigue mejorando!";

    }

    else {

        mensajeFinal.textContent =
            "💪 ¡Buen intento! ¡Juega otra vez y supera tu récord!";

    }

}