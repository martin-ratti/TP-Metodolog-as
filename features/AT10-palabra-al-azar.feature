# language: es
Característica: Palabra al azar de una lista

  Escenario: Sin word= en la URL se inicia con una palabra de la lista
    Dado que el jugador entra sin especificar palabra
    Entonces se ven 6 vidas
    Y la palabra tiene al menos una letra

  Escenario: Con word= en la URL se usa esa palabra
    Dado una partida con la palabra "GATO"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas
