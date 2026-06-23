# language: es
Característica: Perder la partida

  Escenario: El jugador falla 6 veces y pierde
    Dado una partida con la palabra "OSO"
    Cuando el jugador adivina la letra "A"
    Y el jugador adivina la letra "B"
    Y el jugador adivina la letra "C"
    Y el jugador adivina la letra "D"
    Y el jugador adivina la letra "E"
    Y el jugador adivina la letra "F"
    Entonces se ve el mensaje "PERDISTE"
    Y se ve la palabra "OSO"
