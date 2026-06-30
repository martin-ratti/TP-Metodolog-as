<div align="center">
  <h1>🎮 Ahorcado</h1>
  <h3>📚 Metodologías de Desarrollo de Software</h3>
  <p>
    <b>Trabajo Práctico Universitario Grupal</b>
  </p>

  <a href="https://martin-ratti.github.io/TP-Ahorcado" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=react&logoColor=white" />
  </a>
</div>

<hr>

## 🎯 Propósito del Proyecto
Este repositorio contiene el código fuente de una versión moderna e interactiva del tradicional juego del **Ahorcado**. Desarrollado como trabajo práctico integrador para la cátedra de **Metodologías de Desarrollo de Software**, el principal objetivo es demostrar la aplicación rigurosa de prácticas modernas de ingeniería y desarrollo de software:

*   **Tipado Estricto:** Implementado integralmente en TypeScript.
*   **Separación de Responsabilidades:** Aislamiento total de las reglas de negocio respecto de la interfaz gráfica y los eventos de E/S.
*   **Desarrollo Guiado por Pruebas de Doble Bucle:** Adopción del flujo **Double Loop TDD (ATDD + TDD)**.
*   **Integración y Entrega Continua (CI/CD):** Automatización de calidad y despliegue a través de GitHub Actions y GitHub Pages.

---

## 📐 Arquitectura y Diseño (Separación de Capas)

La aplicación implementa una arquitectura desacoplada y limpia, dividida estrictamente en dos capas principales:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN (UI)                       │
│                                                                        │
│   Navegador ──▶ [index.html] ──▶ [index.ts] ──▶ [main.ts]              │
│                                  (Composition   (Control de Vistas,    │
│                                   Root)          Animaciones, SVG)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    │ consume (Inyección de Dependencias)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          CAPA DE DOMINIO (LOGIC)                       │
│                                                                        │
│   [Ahorcado.ts]  ◀──────────────  [dificultad.ts]  ◀─── [palabras.ts]  │
│   (Reglas Puras,                  (Mapeo Vidas)         (Seam de Azar) │
│    Cálculo en Memoria)                                                 │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Capa de Dominio (`src/domain/`)
Contiene las reglas de negocio y las invariantes del juego. Está escrita en TypeScript puro, no interactúa con el DOM, no maneja elementos HTML, eventos del navegador ni funciones de entrada/salida. Es 100% testeable en memoria.
*   **[Ahorcado.ts](file:///c:/Users/Agus/Documents/TP-Ahorcado/src/domain/Ahorcado.ts):** Clase principal que encapsula el estado del juego (vidas iniciales y restantes, letras adivinadas, letras erradas, palabra normalizada, puntuación de la sesión actual y pistas).
*   **[dificultad.ts](file:///c:/Users/Agus/Documents/TP-Ahorcado/src/domain/dificultad.ts):** Mapea los niveles de dificultad (`facil`, `normal`, `dificil`) con sus vidas correspondientes (6, 4, 2 respectivamente).
*   **[palabras.ts](file:///c:/Users/Agus/Documents/TP-Ahorcado/src/domain/palabras.ts):** Catálogo de palabras precargadas con sus pistas y la función `elegirPalabra()`, la cual actúa como un *seam* (costura) de testabilidad para desacoplar el azar de los unit tests.

### 2. Capa de Presentación / UI (`src/ui/`)
Interpreta las interacciones del usuario y renderiza de manera reactiva el DOM a partir del estado de la instancia del juego.
*   **[index.ts](file:///c:/Users/Agus/Documents/TP-Ahorcado/src/ui/index.ts):** Punto de entrada de la aplicación (*Composition Root*). Lee los parámetros de la URL (`?word=` y `&hint=`), genera el fondo dinámico de estrellas interactivas y monta el componente principal de la aplicación.
*   **[main.ts](file:///c:/Users/Agus/Documents/TP-Ahorcado/src/ui/main.ts):** Controlador de la interfaz gráfica de usuario. Renderiza el menú inicial, la pantalla de dos jugadores, la pantalla de juego con el dibujo progresivo del muñeco mediante SVGs interactivos, el teclado virtual y gestiona las transiciones y los modales de victoria o derrota.
*   **[index.html](file:///c:/Users/Agus/Documents/TP-Ahorcado/index.html):** Contenedor estructural de la aplicación que incluye todo el sistema de estilos en Vanilla CSS, con animaciones fluidas (twinkle de estrellas, vibración de error `shake-red`, trazado SVG dinámico `draw`) y estilos interactivos neón.

---

## 🔄 Metodología: El Doble Loop (Double Loop TDD)

El desarrollo del proyecto siguió rigurosamente un enfoque de **Double Loop TDD** para asegurar que cada funcionalidad responda a una necesidad real del negocio y posea una implementación limpia y testeada.

```
┌────────────────────────────────────────────────────────┐
│             LOOP EXTERNO: Aceptación (ATDD)            │
│                                                        │
│  1. Escribir Escenario Gherkin (.feature)             │
│  2. Ejecutar prueba con Playwright ──▶ ROJO (Honesto)  │
│                                                        │
│     ┌────────────────────────────────────────────┐     │
│     │        LOOP INTERNO: Unitario (TDD)        │     │
│     │                                            │     │
│     │  a. Escribir Unit Test en Vitest           │     │
│     │  b. Ejecutar ──▶ ROJO                      │     │
│     │  c. Codificar mínimo código ──▶ VERDE      │     │
│     │  d. Refactorizar código local              │     │
│     │  e. ¿Falta más lógica? Recomenzar ciclo    │     │
│     └──────────────────────┬─────────────────────┘     │
│                            │                           │
│  3. Integrar/Cablear la UI al Dominio                  │
│  4. Ejecutar Aceptación ──▶ VERDE                      │
└────────────────────────────────────────────────────────┘
```

### Disciplina de Trabajo y Flujo de Commits
Se aplicaron de manera estricta las siguientes reglas no negociables de calidad de proceso:
1.  **No test, no code:** No se escribe código de producción sin un test previo en rojo que lo exija.
2.  **Rojo y Verde en Commits Separados:** Cada adición o cambio se documenta en el historial de Git con dos commits ordenados:
    *   `RED: <descripción del comportamiento esperado>` (con el test fallando).
    *   `GREEN: <descripción de la solución>` (con el código mínimo que hace pasar el test).
    *   `REFACTOR: <descripción del refactor>` (de forma opcional, si se mejora la estructura sin alterar funcionalidad).
3.  **Rotación de Roles:** En cada iteración del doble bucle, los desarrolladores rotan en el rol de piloto al teclado para garantizar autoría y entendimiento colectivo de todo el codebase.

---

## 🚀 Escenarios de Aceptación (ATs) y Cobertura de Pruebas

A continuación se detallan los 18 escenarios de aceptación implementados, incluyendo su correlación directa con las pruebas unitarias y su lógica de diseño:

### 📦 Escenarios Base (AT1 - AT7)

#### **AT1 — Iniciar partida**
*   **Comportamiento:** Al entrar a la app con la palabra `GATO`, se renderizan 4 guiones enmascarados y se inicia con 6 vidas.
*   **Escenario Gherkin:** [AT1-iniciar-partida.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT1-iniciar-partida.feature)
*   **Unit Tests asociados:**
    *   `muestra guiones para todas las letras al iniciar`
    *   `empieza con 6 vidas`

#### **AT2 — Acertar letra**
*   **Comportamiento:** Adivinar una letra correcta revela todas las posiciones correspondientes de forma case-insensitive sin descontar vidas (ej: `ALA` + `A` ➔ `A _ A`).
*   **Escenario Gherkin:** [AT2-acertar-letra.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT2-acertar-letra.feature)
*   **Unit Tests asociados:**
    *   `revela todas las ocurrencias de la letra acertada`
    *   `es case-insensitive: adivinar en minuscula equivale a mayuscula`
    *   `acertar una letra no descuenta vidas`

#### **AT3 — Fallar letra**
*   **Comportamiento:** Adivinar una letra incorrecta mantiene la palabra enmascarada oculta y descuenta exactamente una vida.
*   **Escenario Gherkin:** [AT3-fallar-letra.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT3-fallar-letra.feature)
*   **Unit Tests asociados:**
    *   `fallar una letra descuenta una vida`
    *   `fallar una letra no revela ninguna posicion`
    *   `varios fallos acumulan errores correctamente`

#### **AT4 — Ganar**
*   **Comportamiento:** Adivinar la última letra faltante finaliza el juego y muestra en pantalla el texto "GANASTE".
*   **Escenario Gherkin:** [AT4-ganar.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT4-ganar.feature)
*   **Unit Tests asociados:**
    *   `ganado() es true cuando se adivinaron todas las letras`
    *   `ganado() es false si falta al menos una letra`

#### **AT5 — Perder**
*   **Comportamiento:** Agotar todas las vidas disponibles muestra el mensaje de derrota "PERDISTE" y revela automáticamente la palabra oculta completa.
*   **Escenario Gherkin:** [AT5-perder.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT5-perder.feature)
*   **Unit Tests asociados:**
    *   `perdido() es true despues de 6 fallos`
    *   `perdido() es false con menos de 6 fallos`
    *   `palabraEnmascarada revela la palabra completa al perder`

#### **AT6 — Letra repetida**
*   **Comportamiento:** Intentar ingresar una letra ya utilizada (correcta o incorrecta) no penaliza vidas e informa "Letra ya ingresada".
*   **Escenario Gherkin:** [AT6-letra-repetida.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT6-letra-repetida.feature)
*   **Unit Tests asociados:**
    *   `repetir letra acertada no descuenta vidas`
    *   `repetir letra fallada no descuenta vidas adicionales`
    *   `adivinar letra repetida devuelve 'repetida'`

#### **AT7 — Entrada inválida**
*   **Comportamiento:** Intentar ingresar símbolos, números o caracteres no válidos no afecta el estado ni descuenta vidas y muestra "Entrada inválida". Igualmente, interactuar tras finalizar la partida devuelve el estado `terminado`.
*   **Escenario Gherkin:** [AT7-entrada-invalida.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT7-entrada-invalida.feature)
*   **Unit Tests asociados:**
    *   `adivinar un numero devuelve 'invalida' y no descuenta vidas`
    *   `adivinar un simbolo devuelve 'invalida' y no descuenta vidas`
    *   `adivinar con partida terminada devuelve 'terminado' y no cambia el estado`

---

### 🌟 Desafío de Aprobación Directa y Extensiones (AT8 - AT18)

#### **AT8 — Jugar de nuevo**
*   **Comportamiento:** Permite reiniciar la partida en caliente sin recargar la página del navegador, reseteando tableros y vidas pero conservando el contexto de la sesión.
*   **Escenario Gherkin:** [AT8-jugar-de-nuevo.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT8-jugar-de-nuevo.feature)
*   **Unit Tests asociados:**
    *   `reiniciar resetea las vidas a 6`
    *   `reiniciar resetea la palabra enmascarada`
    *   `reiniciar permite volver a jugar`

#### **AT9 — Soporte de acentos y Ñ**
*   **Comportamiento:** Admite letras con acento normalizándolas transparentemente (ej: `á` ➔ `A`), mientras que procesa la letra `Ñ` como una consonante única e independiente del idioma español.
*   **Escenario Gherkin:** [AT9-acentos.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT9-acentos.feature)
*   **Unit Tests asociados:**
    *   `adivinar con acento equivale a la letra sin acento`
    *   `la palabra con acento se normaliza al construir`
    *   `la ñ se trata como letra independiente`
    *   `adivinar con acento no descuenta vidas`

#### **AT10 — Palabra al azar**
*   **Comportamiento:** En ausencia del parámetro `?word=`, el sistema selecciona aleatoriamente una palabra de una lista predefinida utilizando la inyección controlada del índice para los tests.
*   **Escenario Gherkin:** [AT10-palabra-al-azar.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT10-palabra-al-azar.feature)
*   **Unit Tests asociados:**
    *   `elegirPalabra devuelve la palabra en el indice dado`
    *   `PALABRAS tiene al menos una palabra`
    *   `todas las palabras de PALABRAS son strings no vacios`

#### **AT11 — Dibujo progresivo del ahorcado**
*   **Comportamiento:** Renderizado dinámico y progresivo de un ahorcado SVG de 6 partes en base a la cantidad de errores cometidos por el jugador.
*   **Escenario Gherkin:** [AT11-dibujo-ahorcado.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT11-dibujo-ahorcado.feature)
*   **Unit Tests asociados:**
    *   `con 0 errores hay 0 partes del muñeco`
    *   `con 1 error hay 1 parte del muñeco`
    *   `con 3 errores hay 3 partes del muñeco`
    *   `con 6 errores hay 6 partes del muñeco`

#### **AT12 — Pantalla de inicio**
*   **Comportamiento:** Presentación de un menú de bienvenida con animaciones, selección de dificultad e inicio del juego bajo demanda.
*   **Escenario Gherkin:** [AT12-pantalla-inicio.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT12-pantalla-inicio.feature)

#### **AT13 — Dificultad de partida**
*   **Comportamiento:** Permite configurar tres niveles de dificultad que determinan el número inicial de vidas: Fácil (6 vidas), Normal (4 vidas) y Difícil (2 vidas).
*   **Escenario Gherkin:** [AT13-dificultad-partida.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT13-dificultad-partida.feature)
*   **Unit Tests asociados:**
    *   `por defecto empieza con 6 vidas si no se especifica`
    *   `permite configurar la cantidad de vidas iniciales`
    *   `reiniciar respeta la cantidad de vidas configurada, no siempre 6`
    *   `Fácil otorga 6 vidas`, `Normal otorga 4 vidas`, `Difícil otorga 2 vidas`

#### **AT14 — Volver al menú**
*   **Comportamiento:** Permite al jugador salir de la partida en curso o de la pantalla de fin de juego y regresar al menú principal de forma limpia.
*   **Escenario Gherkin:** [AT14-volver-al-menu.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT14-volver-al-menu.feature)

#### **AT15 — Teclado en pantalla**
*   **Comportamiento:** Muestra un teclado virtual en pantalla con las teclas clasificadas dinámicamente según su uso (disponible, acertada o fallada).
*   **Escenario Gherkin:** [AT15-teclado-en-pantalla.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT15-teclado-en-pantalla.feature)
*   **Unit Tests asociados:**
    *   `estadoLetra devuelve 'disponible' si la letra no fue jugada`
    *   `estadoLetra devuelve 'acertada' si la letra es un acierto`
    *   `estadoLetra devuelve 'fallada' si la letra es un fallo`

#### **AT16 — Pistas y categorías**
*   **Comportamiento:** Permite incluir una pista opcional asociada a la palabra secreta que el jugador puede visualizar haciendo clic en el botón "🪄 Pista".
*   **Escenario Gherkin:** [AT16-pista.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT16-pista.feature)
*   **Unit Tests asociados:**
    *   `El juego expone la pista asociada a la palabra`
    *   `Si no se provee pista, devuelve string vacío`

#### **AT17 — Marcador de la sesión**
*   **Comportamiento:** Mantiene y visualiza un marcador acumulado de victorias y derrotas consecutivas a lo largo de las distintas partidas jugadas en la sesión.
*   **Escenario Gherkin:** [AT17-marcador-sesion.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT17-marcador-sesion.feature)
*   **Unit Tests asociados:**
    *   `acumula victorias y derrotas entre partidas consecutivas`

#### **AT18 — Modo Dos Jugadores**
*   **Comportamiento:** Un primer jugador ingresa manualmente una palabra secreta y una pista opcional de forma oculta en la UI, tras lo cual se monta la pantalla de juego para que el segundo jugador intente resolverla.
*   **Escenario Gherkin:** [AT18-modo-dos-jugadores.feature](file:///c:/Users/Agus/Documents/TP-Ahorcado/features/AT18-modo-dos-jugadores.feature)
*   **Unit Tests asociados (en [Ahorcado.dos-jugadores.test.ts](file:///c:/Users/Agus/Documents/TP-Ahorcado/tests/Ahorcado.dos-jugadores.test.ts)):**
    *   `inicia con la palabra ingresada manualmente y la pista opcional`

---

## 💾 Gestión del Estado y Memoria
El juego opera en su totalidad mediante almacenamiento en **memoria volátil (caché)**. La instancia del objeto `Ahorcado` retiene los estados internos de las letras jugadas y el marcador acumulativo. Al no emplear dependencias de bases de datos o servicios externos, el juego garantiza una carga instantánea y una ejecución robusta tanto localmente como en entornos de CI/CD.

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
Tener instalado Node.js (versión 18 o superior).

### 1. Clonar el Repositorio e Instalar Dependencias
```bash
git clone https://github.com/martin-ratti/TP-Ahorcado.git
cd TP-Ahorcado
npm install
```

### 2. Ejecutar en Entorno de Desarrollo (Local)
Para iniciar el servidor de desarrollo local de Vite:
```bash
npm run dev
```
Abre en tu navegador la dirección `http://localhost:5173`.
*   Para iniciar el juego con una palabra y pista predeterminadas para pruebas manuales: `http://localhost:5173/?word=Dinosaurio&hint=Gran+reptil+extinto`.

### 3. Ejecutar Pruebas Unitarias (TDD con Vitest)
Para ejecutar la suite de pruebas unitarias aisladas de la lógica de dominio:
```bash
npm run test
```

### 4. Ejecutar Pruebas de Aceptación (ATDD con Playwright)
Para generar los bindings automáticos de Cucumber y ejecutar los tests de integración de extremo a extremo (E2E) en un navegador controlado de fondo:
```bash
npm run at
```

### 5. Compilar para Producción
Para verificar el empaquetado del bundle estático y compilar el proyecto:
```bash
npm run build
```

---

## ⚙️ Integración Continua (CI) y Despliegue Continuo (CD)

El proyecto cuenta con un flujo de trabajo automatizado configurado a través de **GitHub Actions** (`.github/workflows/`):

1.  **Paso de Integración (CI):** Cada vez que se realiza un push o un pull request a la rama principal, el pipeline realiza los siguientes pasos en un entorno limpio:
    *   Instala las dependencias del proyecto.
    *   Valida la compilación del código TypeScript (`npm run build`).
    *   Ejecuta todas las pruebas unitarias con Vitest (`npm run test`).
    *   Instala las dependencias del navegador de Playwright y corre la suite de pruebas de aceptación (`npm run at`).
2.  **Paso de Despliegue (CD):** Si las pruebas de CI pasan con éxito en la rama principal, un script de GitHub Actions compila la versión estática de producción y despliega la aplicación de forma automática a **GitHub Pages** haciendo que la última versión esté disponible públicamente para todos los usuarios.

---

## 🤝 El Equipo de Desarrollo
*Este TP fue diseñado, testeado y desarrollado con pasión por:*

*   💻 **Agustín Santinelli**
*   ✨ **Irina Repupilli**
*   🚀 **Francisco Lovatti**
*   🛠️ **Martin Ratti**

<hr>

<div align="center">
  <p><i>Desarrollado con 🧉 y metodologías ágiles por el equipo de alumnos.</i></p>
</div>
