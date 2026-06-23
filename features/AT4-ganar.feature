# language: es
Característica: Ganar la partida

  Escenario: El jugador completa todas las letras y gana
    Dado una partida con la palabra "OSO"
    Cuando el jugador adivina la letra "O"
    Y el jugador adivina la letra "S"
    Entonces se ve el mensaje "GANASTE"
