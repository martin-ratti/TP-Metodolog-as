# language: es
Característica: Dificultad

  Escenario: El jugador elige dificultad fácil
    Dado que el jugador entra a la app con la palabra "GATO"
    Cuando el jugador elige la dificultad "Fácil"
    Y el jugador inicia la partida
    Entonces se ven 6 vidas

  Escenario: El jugador elige dificultad normal
    Dado que el jugador entra a la app con la palabra "GATO"
    Cuando el jugador elige la dificultad "Normal"
    Y el jugador inicia la partida
    Entonces se ven 4 vidas

  Escenario: El jugador elige dificultad difícil
    Dado que el jugador entra a la app con la palabra "GATO"
    Cuando el jugador elige la dificultad "Difícil"
    Y el jugador inicia la partida
    Entonces se ven 2 vidas

  Escenario: Jugar de nuevo conserva la dificultad elegida
    Dado que el jugador entra a la app con la palabra "OSO"
    Cuando el jugador elige la dificultad "Difícil"
    Y el jugador inicia la partida
    Y el jugador adivina la letra "A"
    Y el jugador adivina la letra "B"
    Entonces se ve el mensaje "PERDISTE"
    Cuando el jugador presiona "Jugar de nuevo"
    Entonces se ven 2 vidas