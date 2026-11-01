function detener () {
    mover(0, 0, 0, 0)
}
function reversa () {
    mover(0, 1, 0, 1)
}
// solo gira el motor 1
function derecha () {
    mover(1, 0, 0, 0)
}
function aplicar (orden: string) {
    if (orden == ordenActual) {
        return
    }
    ordenActual = orden
    if (orden == "avanzar") {
        avanzar()
        basic.showArrow(ArrowNames.North)
    } else if (orden == "reversa") {
        reversa()
        basic.showArrow(ArrowNames.South)
    } else if (orden == "izquierda") {
        izquierda()
        basic.showArrow(ArrowNames.West)
    } else if (orden == "derecha") {
        derecha()
        basic.showArrow(ArrowNames.East)
    } else {
        detener()
        basic.showIcon(IconNames.SmallHeart)
    }
}
radio.onReceivedString(function (recibido) {
    ultimaRecepcion = input.runningTime()
    // También entiende las letras del control de joystick original (A,B,C,D,0,I)
    if (recibido == "avanzar" || recibido == "A") {
        aplicar("avanzar")
    } else if (recibido == "reversa" || recibido == "B") {
        aplicar("reversa")
    } else if (recibido == "izquierda" || recibido == "C") {
        aplicar("izquierda")
    } else if (recibido == "derecha" || recibido == "D") {
        aplicar("derecha")
    } else {
        // "alto", "0", "I" o cualquier otra cosa
        aplicar("alto")
    }
})
function avanzar () {
    mover(1, 0, 1, 0)
}
// Pone cada pin del puente H. Primero apaga y luego enciende,
// para que nunca queden las dos entradas de un motor en 1 a la vez al invertir.
function mover (m1a: number, m1b: number, m2a: number, m2b: number) {
    if (m1a == 0) {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
    if (m1b == 0) {
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
    if (m2a == 0) {
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
    if (m2b == 0) {
        pins.digitalWritePin(DigitalPin.P8, 0)
    }
    if (m1a == 1) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
    if (m1b == 1) {
        pins.digitalWritePin(DigitalPin.P1, 1)
    }
    if (m2a == 1) {
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
    if (m2b == 1) {
        pins.digitalWritePin(DigitalPin.P8, 1)
    }
}
// solo gira el motor 2
function izquierda () {
    mover(0, 0, 1, 0)
}
let ultimaRecepcion = 0
let ordenActual = ""
// ============================================================
// CARRO  -  micro:bit pegada al carro (recibe órdenes por radio)
// Motores: motor 1 = P0/P1, motor 2 = P2/P8 (igual que tu programa)
// ============================================================
// debe ser el mismo número en el control
let GRUPO = 60
// ms sin recibir nada -> el carro se detiene
let TIEMPO_SIN_SENAL = 400
ordenActual = "alto"
radio.setGroup(GRUPO)
detener()
basic.showIcon(IconNames.SmallHeart)
// Seguridad: si se pierde la señal del control, el carro se detiene solo.
basic.forever(function () {
    if (input.runningTime() - ultimaRecepcion > TIEMPO_SIN_SENAL) {
        aplicar("alto")
    }
    basic.pause(50)
})
