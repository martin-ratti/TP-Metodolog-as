# language: es
Característica: Soporte de acentos y ñ

  Escenario: Adivinar con acento equivale a la letra sin acento
    Dado una partida con la palabra "MURCIELAGO"
    Cuando el jugador adivina la letra "é"
    Entonces se ve la palabra "_ _ _ _ _ _ _ A _ _"
    Y se ven 6 vidas

  Escenario: La palabra con acento se normaliza al iniciar
    Dado una partida con la palabra "ÁRBOL"
    Entonces se ve la palabra "_ _ _ _ _"
    Y se ven 6 vidas

  Escenario: Adivinar la ñ funciona correctamente
    Dado una partida con la palabra "MAÑANA"
    Cuando el jugador adivina la letra "ñ"
    Entonces se ve la palabra "_ A Ñ A _ A"
    Y se ven 6 vidas
