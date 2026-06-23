# language: es
Característica: Jugar de nuevo

  Escenario: El jugador reinicia la partida sin recargar la página
    Dado una partida con la palabra "OSO"
    Cuando el jugador adivina la letra "O"
    Y el jugador adivina la letra "S"
    Entonces se ve el mensaje "GANASTE"
    Cuando el jugador presiona "Jugar de nuevo"
    Entonces se ve la palabra "_ _ _"
    Y se ven 6 vidas
    Y se ve el mensaje ""
