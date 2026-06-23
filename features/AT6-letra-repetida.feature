# language: es
Característica: Letra repetida

  Escenario: Repetir una letra acertada no penaliza ni cambia el estado
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "A"
    Y el jugador adivina la letra "A"
    Entonces se ve la palabra "_ A _ _"
    Y se ven 6 vidas
    Y se ve el mensaje "Letra ya ingresada"

  Escenario: Repetir una letra fallada no penaliza ni cambia el estado
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Y el jugador adivina la letra "E"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 5 vidas
    Y se ve el mensaje "Letra ya ingresada"
