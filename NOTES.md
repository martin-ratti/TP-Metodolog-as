# NOTES — Ahorcado ATDD

Este archivo es el entregable de proceso pedido en §7 de la guía:
la lista de UTs por cada AT, pensada **antes de codear**, con la justificación
de refactor (o por qué no hizo falta).

---

## AT1 — Iniciar partida

> El usuario entra a `/?word=GATO` y ve `_ _ _ _` y 6 vidas.

### UTs del objeto `Ahorcado`

| #   | Descripción                                                                   | Por qué existe                                                              |
| --- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | `palabraEnmascarada()` devuelve guiones separados por espacio para cada letra | La UI muestra este valor directamente; tiene que tener el formato correcto  |
| 2   | `vidas()` devuelve 6 al inicio                                                | El jugador empieza con 6 intentos; si devolviera otro número el AT fallaría |

### Refactor

No hizo falta. La implementación inicial era mínima y clara: un `Set` para
letras adivinadas, otro para erradas, `vidasIniciales = 6`. Sin duplicación.

---

## AT2 — Acertar letra

> El usuario tipea `A` en "GATO" y ve `_ A _ _`, vidas siguen en 6.

### UTs del objeto `Ahorcado`

| #   | Descripción                                                      | Por qué existe                                                                   |
| --- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1   | Acertar revela **todas** las ocurrencias (`ALA` + `A` → `A _ A`) | Si solo revelara la primera, el AT de "ALA" fallaría y el juego sería incorrecto |
| 2   | Es case-insensitive: `a` == `A`                                  | El usuario puede tipear en minúscula; el dominio no debería distinguirlo         |
| 3   | Acertar **no** descuenta vidas                                   | Invariante básica: solo los fallos cuestan vida                                  |

### Refactor

No hizo falta. `split("").map(...).join(" ")` es idiomático y directo.

---

## AT3 — Fallar letra

> El usuario tipea `E` en "GATO" y ve `_ _ _ _`, vidas = 5.

### UTs del objeto `Ahorcado`

| #   | Descripción                                       | Por qué existe                                                          |
| --- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| 1   | Fallar descuenta exactamente una vida             | La cuenta tiene que ser exacta; `vidas = vidasIniciales - erradas.size` |
| 2   | Fallar **no** revela ninguna posición             | La palabra enmascarada no debe cambiar ante un fallo                    |
| 3   | Varios fallos distintos se acumulan correctamente | Cubre que el `Set` no satura ni cuenta doble                            |

### Refactor

No hizo falta. El `Set` de letras erradas hace la acumulación naturalmente.

---

## AT4 — Ganar

> El usuario completa todas las letras y ve "GANASTE".

### UTs del objeto `Ahorcado`

| #   | Descripción                                                                  | Por qué existe                                                 |
| --- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1   | `ganado()` es `true` cuando todas las letras de la palabra fueron adivinadas | La UI solo puede mostrar "GANASTE" si el dominio sabe que ganó |
| 2   | `ganado()` es `false` si falta al menos una letra                            | Evita falsos positivos: no se puede ganar a medias             |

### Refactor

No hizo falta. `every(c => letrasAdivinadas.has(c))` es legible y sin
duplicación con el resto del código.

---

## AT5 — Perder

> El usuario falla 6 veces y ve "PERDISTE" y la palabra revelada.

### UTs del objeto `Ahorcado`

| #   | Descripción                                                                 | Por qué existe                                                                  |
| --- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1   | `perdido()` es `true` después de 6 fallos                                   | Condición de fin de juego; `vidas() === 0`                                      |
| 2   | `perdido()` es `false` con menos de 6 fallos                                | Evita terminar el juego antes de tiempo                                         |
| 3   | `palabraEnmascarada()` devuelve la palabra completa (sin guiones) al perder | La guía dice "la palabra revelada" — el dominio decide cuándo revelar, no la UI |

### Refactor

El UT 3 forzó agregar `if (this.perdido()) return this.palabra` al inicio de
`palabraEnmascarada()`. Es el mínimo código y queda legible. Sin refactor extra.

---

## AT6 — Letra repetida

> El usuario re-tipea una letra ya intentada → no penaliza y ve "Letra ya ingresada".

### UTs del objeto `Ahorcado`

| #   | Descripción                                                            | Por qué existe                                                                 |
| --- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | Repetir letra acertada no descuenta vidas                              | El juego no debe penalizar al jugador por repetir                              |
| 2   | Repetir letra fallada no descuenta vidas adicionales                   | Ídem para letras falladas                                                      |
| 3   | `adivinar()` devuelve `'repetida'` al repetir una letra                | La UI necesita saber **por qué** no cambió nada para mostrar el aviso correcto |
| 4   | `adivinar()` devuelve `'acertada'` para letra nueva en la palabra      | Contrato completo del valor de retorno                                         |
| 5   | `adivinar()` devuelve `'fallada'` para letra nueva fuera de la palabra | Ídem                                                                           |

### Refactor

Este AT cambió la firma de `adivinar()` de `void` a un tipo unión
`"acertada" | "fallada" | "repetida" | "terminado"`. El cambio fue necesario
para que la UI pueda distinguir los casos sin tener lógica de juego propia.
Eso es exactamente la separación que pide la guía: la UI pregunta, el dominio
responde.

---

## AT7 — Entrada inválida

> El usuario tipea un número o símbolo → no penaliza y ve "Entrada inválida".
> El usuario juega con la partida terminada → el estado no cambia.

### UTs del objeto `Ahorcado`

| #   | Descripción                                                                     | Por qué existe                                               |
| --- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | `adivinar("3")` devuelve `'invalida'` y no descuenta vidas                      | Un número no es una letra; no debe contar como fallo         |
| 2   | `adivinar("!")` devuelve `'invalida'` y no descuenta vidas                      | Ídem para símbolos                                           |
| 3   | `adivinar()` con partida terminada devuelve `'terminado'` y no cambia el estado | El juego terminado es inmutable: ni aciertos ni fallos valen |

### Refactor

Se extendió el tipo de retorno de `adivinar()` con `| "invalida"`.
La validación `/^[A-Z]$/.test(l)` corre antes de cualquier otra comprobación,
lo que mantiene el flujo limpio: primero se descarta lo inválido, luego lo
terminado, luego lo repetido, y finalmente se procesa la letra.

---

## Separación lógica / UI — resumen

Toda la lógica de juego vive en `src/domain/Ahorcado.ts`:

- qué letras están adivinadas y cuáles falladas
- cuántas vidas quedan
- si ganó, perdió o la partida sigue
- qué mostrar en la palabra (guiones vs letras vs revelada al perder)
- si una entrada es válida, repetida o nueva

`src/ui/main.ts` **no toma ninguna decisión de juego**: recibe el resultado de
`adivinar()` y lo mapea a texto para mostrar. Si se quisiera cambiar la UI
(por ejemplo, pasar a React o a una app de terminal), `Ahorcado.ts` no
cambiaría una sola línea.

---

## AT8 — Jugar de nuevo

> El usuario gana/pierde y presiona "Jugar de nuevo" → nueva partida con palabra al azar, sin recargar la página.

### UTs del objeto `Ahorcado`

| #   | Descripción                                                                       | Por qué existe                                                       |
| --- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1   | `reiniciar()` resetea las vidas a 6                                               | La nueva partida tiene que empezar con todas las vidas               |
| 2   | `reiniciar()` resetea la palabra enmascarada a guiones                            | El tablero tiene que volver a estar oculto                           |
| 3   | `reiniciar()` permite volver a jugar (`ganado()` y `terminado()` vuelven a false) | Sin esto el dominio bloquearía los nuevos intentos con `"terminado"` |

Los UTs de dominio de `elegirPalabra` (AT10) ya cubren la selección determinista de la nueva palabra; no se duplican aquí.

### Refactor

Se refactorizó la firma de `mountApp` de `(root, word: string)` a `(root, getWord: () => string)`.
El handler de "Jugar de nuevo" ya no llama `game.reiniciar()` sino que crea un nuevo `Ahorcado(getWord())`.
Esto desacopla la UI de la identidad de la instancia: "reiniciar" significa montar un juego nuevo, no mutar el existente.
En `index.ts`, `getWord` es `() => wordParam` si hay `?word=` (determinista para los AT), o
`() => elegirPalabra(PALABRAS, Math.random())` si no (aleatorio en producción).
El seam del azar sigue siendo `elegirPalabra` — la misma solución del AT10, reutilizada.

---

## AT9 — Acentos y ñ

> `á`==`A`, `é`==`E`, etc. La `Ñ` funciona como letra independiente.

### UTs del objeto `Ahorcado`

| #   | Descripción                                                           | Por qué existe                                                                      |
| --- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | `adivinar("é")` revela las `E` de la palabra                          | El input del usuario puede tener acento; el dominio lo normaliza                    |
| 2   | Palabra con acento en el constructor se normaliza (`ÁRBOL` → `ARBOL`) | La palabra almacenada siempre está sin acentos para que las comparaciones funcionen |
| 3   | `adivinar("ñ")` revela las `Ñ` de la palabra                          | La `Ñ` es letra propia del español y no debe eliminarse en la normalización         |
| 4   | `adivinar("é")` no descuenta vidas                                    | El acento normalizado acierta la letra; no es un fallo                              |

### Refactor

La función `normalizar()` reemplaza explícitamente cada vocal acentuada
(`Á→A`, `É→E`, etc.) en lugar de usar `NFD` + regex, porque `NFD`
descomponía la `Ñ` en `N` + combinador y rompía el caso 3. El reemplazo
explícito es más legible y correcto para el español.

---

## AT10 — Palabra al azar

> Sin `?word=` en la URL, la app elige una palabra de una lista; con `?word=` usa esa.

### UTs del objeto dominio (`elegirPalabra` + `PALABRAS`)

| #   | Descripción                                                      | Por qué existe                                                                                                                                              |
| --- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `elegirPalabra(lista, indice)` devuelve la palabra en ese índice | Este es el **seam del azar**: en tests se pasa un índice fijo; en producción se pasa `Math.random()`. Sin este seam no se puede testear determinísticamente |
| 2   | `PALABRAS` tiene al menos una palabra                            | La lista no puede estar vacía o el arranque crashearía                                                                                                      |
| 3   | Todas las palabras de `PALABRAS` son strings no vacíos           | Invariante de calidad de los datos                                                                                                                          |

### Refactor

No hizo falta. La función `elegirPalabra` es un one-liner intencional — su
valor no es la complejidad sino el **diseño**: separar "elegir" (dominio,
testeable) de "generar el número al azar" (efecto, en el arranque). Esa
separación es la lección de testabilidad que señala la guía.

---

## AT11 — Dibujo progresivo del ahorcado

> Cada fallo agrega una parte del muñeco; 6 fallos = muñeco completo.

### UTs del objeto `Ahorcado`

| #   | Descripción                                  | Por qué existe                          |
| --- | -------------------------------------------- | --------------------------------------- |
| 1   | Con 0 errores `partesDelMuñeco()` devuelve 0 | El muñeco empieza vacío                 |
| 2   | Con 1 error devuelve 1                       | Cada fallo suma exactamente una parte   |
| 3   | Con 3 errores devuelve 3                     | Cubre acumulación intermedia            |
| 4   | Con 6 errores devuelve 6                     | Muñeco completo coincide con la derrota |

### Refactor

`partesDelMuñeco()` es `letrasErradas.size` — no duplica lógica porque
`vidas()` ya usa el mismo valor. Son dos vistas distintas del mismo dato:
una dice cuántas vidas quedan, la otra cuántas partes se dibujan.

---

## AT12 — Pantalla de inicio

> El usuario entra a la app y ve un menú inicial para arrancar a jugar.

### UTs del objeto `Ahorcado`

Este AT concierne principalmente a la UI y el estado general de la app (menú vs juego). No requirió tests adicionales sobre la lógica de `Ahorcado`, ya que el objeto en sí solo representa una partida en curso.

### Refactor

Se refactorizó el estado en la interfaz para poder alternar entre una vista de menú y una de juego, sin alterar el dominio.

---

## AT13 — Dificultad de partida

> El usuario elige la dificultad (Fácil, Normal, Difícil) lo que determina las vidas (6, 4, 2).

### UTs del objeto dominio (`dificultad.ts` y `Ahorcado`)

| #   | Descripción                                                          | Por qué existe                                                              |
| --- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | `Ahorcado` acepta vidas iniciales configurables en su constructor    | La dificultad elegida debe afectar el juego inyectándole un límite de vidas |
| 2   | `vidasSegunDificultad` mapea las opciones a 6, 4 y 2 respectivamente | Permite aislar la configuración de balance del juego fuera de la interfaz   |

### Refactor

Se extrajo el parámetro `vidasIniciales` al constructor de `Ahorcado`, que antes era fijo en 6. Se agregó `dificultad.ts` para agrupar los mapeos sin cargar la UI de lógica de juego. La inyección de dependencia permite testear más fácil.

---

## AT14 — Volver al menú

> El usuario vuelve a la pantalla inicial en medio del juego o al terminar.

### UTs del objeto `Ahorcado`

Este AT no suma lógica nueva al objeto `Ahorcado`. Es una transición en el router/UI que descarta el objeto actual y vuelve a montar el menú.

### Refactor

Se manejó desde `main.ts` limpiando la pantalla y cambiando el estado de la vista.

---

## Por qué el AT corre contra la app real

Un test de componente en jsdom puede dar verde aunque la app real no arranque:
nunca prueba el `index.html`, el módulo de arranque ni la integración completa.
El AT con Playwright abre un navegador real contra `http://localhost:5173`,
así que su verde significa que el juego **funciona de verdad**, no solo que el
componente renderiza.

---

## AT15 — Teclado en pantalla

> El usuario ve un teclado virtual y puede clickear letras; las letras muestran si fueron acertadas o falladas.

### UTs del objeto `Ahorcado`

| #   | Descripción                                                        | Por qué existe                                |
| --- | ------------------------------------------------------------------ | --------------------------------------------- |
| 1   | `estadoLetra()` devuelve 'acertada' si la letra está en adivinadas | La UI necesita saber pintar la tecla de verde |
| 2   | `estadoLetra()` devuelve 'fallada' si la letra está en erradas     | La UI necesita saber pintar la tecla de rojo  |
| 3   | `estadoLetra()` devuelve 'disponible' si no se usó                 | Estado por defecto de la tecla                |

### Refactor

Se agregó el método `estadoLetra(letra)` al dominio para no exponer directamente los Sets internos (`letrasAdivinadas`, `letrasErradas`) a la UI. Esto mantiene el encapsulamiento puro. Todo el layout del teclado y manejo de eventos se resolvió en `main.ts`.

---

## AT16 — Pistas y categorías

> El juego permite configurar una pista asociada a la palabra, que el jugador puede revelar con un botón.

### UTs del objeto `Ahorcado`

| #   | Descripción                                                                      | Por qué existe                                          |
| --- | -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | `Ahorcado` acepta una pista opcional en su constructor y la expone con `pista()` | El dominio debe alojar el contexto de la palabra actual |

### Refactor

Se modificó el catálogo de palabras en `palabras.ts` pasando de ser un arreglo de strings a un arreglo de objetos `{ palabra, pista }`. La UI inyecta la pista desde la URL o el catálogo directamente al constructor del juego. Se implementó el renderizado del botón mágico dorado y animaciones de Game Over (temblor rojo neón) en la UI, sin ensuciar la lógica del dominio, mejorando significativamente la experiencia de usuario (Aesthetics & Feel).

---

## Ajustes de UI incorporados tras los ATs

> Estos cambios no agregan nuevas reglas de negocio, pero sí mejoran la integración entre la app real y los tests de aceptación.

### Cambios registrados

- Se agregó un input oculto en la UI para que Playwright pueda simular la escritura de letras y presionar Enter sin afectar la experiencia visual del usuario.
- El input se conecta al flujo de juego mediante el evento `keydown`, delegando la entrada al método `adivinar()` de `Ahorcado` y re-renderizando la pantalla.
- Se incorporó feedback textual mínimo para casos de negocio visibles en los ATs: mensajes de "Letra ya ingresada" y "Entrada inválida".
- Se ajustó la selección de dificultad para que los radios sigan siendo accesibles para los tests aunque no se vean como controles tradicionales en la interfaz.

### Refactor

La lógica de negocio sigue residiendo en `src/domain/Ahorcado.ts`; la UI solo traduce los resultados del dominio en mensajes y re-renderiza el estado. Esta separación permitió que los tests de aceptación corrieran contra la app real sin romper el diseño ni introducir lógica de juego en la capa visual.
