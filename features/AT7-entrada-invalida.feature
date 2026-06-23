# language: es
Característica: Entrada inválida

  Escenario: Tipear un número no es una jugada válida
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "3"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas
    Y se ve el mensaje "Entrada inválida"

  Escenario: Tipear un símbolo no es una jugada válida
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "!"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas
    Y se ve el mensaje "Entrada inválida"

  Escenario: No se puede jugar con la partida terminada
    Dado una partida con la palabra "OSO"
    Cuando el jugador adivina la letra "O"
    Y el jugador adivina la letra "S"
    Y el jugador adivina la letra "Z"
    Entonces se ve el mensaje "GANASTE"
    Y se ven 6 vidas
