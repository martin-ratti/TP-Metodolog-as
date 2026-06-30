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
Este repositorio contiene el código fuente del tradicional **Juego del Ahorcado**, desarrollado como trabajo práctico para la cátedra de Metodologías de Desarrollo de Software. El objetivo principal es aplicar buenas prácticas de ingeniería de software, tipado estricto, desarrollo guiado por pruebas (TDD y ATDD) y separación de responsabilidades.

---

## 🛠️ Tecnologías y Herramientas
* 🔵 **TypeScript:** Lenguaje principal para garantizar un tipado estricto, robustez y legibilidad.
* ⚡ **Vite:** Entorno de desarrollo rápido y servidor local.
* 🧪 **Vitest:** Framework de testing unitario para la lógica del dominio (loop interno).
* 🥒 **Playwright & playwright-bdd:** Herramientas para la automatización de Acceptance Tests en Gherkin/Cucumber sobre un navegador web real (loop externo).
* ⚙️ **GitHub Actions:** Pipeline de Integración Continua (CI) que automatiza validaciones en cada cambio (tests, linting y build).

---

## 📐 Arquitectura y Diseño (Separación de Capas)
Siguiendo las pautas de diseño limpio del proyecto, la aplicación se divide estrictamente en dos responsabilidades:
1. **Dominio (`src/domain/`)**: El objeto `Ahorcado` encapsula toda la lógica y las reglas del juego. No interactúa con el DOM, la interfaz gráfica ni funciones de I/O. Es 100% testeable en memoria de forma aislada.
2. **UI (`src/ui/`)**: `main.ts` y `index.ts` actúan como capa de presentación. Escuchan los eventos del usuario, invocan los métodos del dominio y actualizan el DOM en base al estado del juego. No contienen lógica interna de juego.

```
Navegador ─▶ index.html ─▶ arranque (index.ts) ─▶ UI (main.ts) ─▶ Ahorcado (Dominio)
                           lee ?word=             sin lógica      lógica pura, en memoria
```

---

## 🔄 Metodología: El Doble Loop (Double Loop TDD)
El desarrollo se rigió bajo un enfoque estricto de doble ciclo de feedback:
* **Loop Externo (ATDD - Cucumber/Gherkin):**
  1. Se describe el comportamiento del usuario en lenguaje de negocio mediante escenarios `.feature`.
  2. Se ejecuta la prueba automatizada contra el navegador real y se observa fallar (**ROJO honesto**).
  3. Tras codificar la lógica y cablear la interfaz, se verifica el paso a **VERDE**.
* **Loop Interno (TDD - Vitest):**
  1. Antes de codificar para pasar el AT, se definen los Unit Tests sobre la lógica del dominio en `Ahorcado.ts`.
  2. Cada test unitario pasa por el ciclo de **ROJO** ➔ **VERDE** ➔ **REFACTOR**.
  3. Se registran los commits de manera ordenada para reflejar este proceso en el historial (`RED:` y `GREEN:`).

---

## 🚀 Características y Escenarios de Aceptación (ATs)
La aplicación cuenta con todos los escenarios base y 4 características avanzadas implementadas para el **Desafío de Aprobación Directa**:

### Escenarios Base (AT1 - AT7)
* **AT1 — Iniciar partida:** El juego comienza enmascarando la palabra con guiones bajos separados por espacios (ej: `GATO` ➔ `_ _ _ _`) y con 6 vidas disponibles.
* **AT2 — Acertar letra:** Adivinar una letra correcta revela todas sus posiciones (ej: `ALA` + `A` ➔ `A _ A`) sin penalizar vidas.
* **AT3 — Fallar letra:** Adivinar una letra incorrecta descuenta exactamente una vida y mantiene oculta la palabra.
* **AT4 — Ganar:** Descubrir la palabra completa muestra un mensaje de victoria ("GANASTE").
* **AT5 — Perder:** Agotar las 6 vidas muestra el mensaje de derrota ("PERDISTE") y revela la palabra oculta completa.
* **AT6 — Letra repetida:** Ingresar una letra que ya fue intentada (sea acierto o fallo) muestra un mensaje de advertencia y no penaliza vidas.
* **AT7 — Entrada inválida:** Tipear números, símbolos o intentar jugar con la partida ya finalizada devuelve un estado controlado y no descuenta vidas.

### Desafío Aprobación Directa (AT8 - AT16)
* **AT8 — Jugar de nuevo:** Permite al usuario reiniciar la partida en caliente sin necesidad de recargar la página completa en el navegador.
* **AT9 — Soporte de acentos y Ñ:**
  * Normaliza diacríticos para que letras con tilde (ej: `á`, `é`) actúen de forma equivalente a sus vocales normales, mejorando la usabilidad.
  * Preserva y valida la `Ñ` como una letra independiente del español.
* **AT10 — Palabra al azar:** Si no se provee una palabra en la URL (`?word=`), el juego elige una aleatoriamente de una lista interna de palabras. Se diseñó un *seam* para pasar el índice en los tests de manera determinista, aislando el azar del dominio.
* **AT11 — Dibujo progresivo del ahorcado:** Renderizado dinámico de un SVG interactivo en la pantalla que dibuja parte a parte el muñeco (cabeza, torso, extremidades) con cada fallo.
* **AT12 — Pantalla de inicio:** Incorpora un menú inicial que da la bienvenida al usuario y permite arrancar el juego bajo demanda.
* **AT13 — Dificultad de partida:** Permite seleccionar entre distintos niveles de dificultad (Fácil, Normal, Difícil), que ajustan dinámicamente la cantidad de vidas iniciales (6, 4, 2 respectivamente).
* **AT14 — Volver al menú:** Implementa la opción de abandonar o terminar una partida y regresar a la pantalla de inicio sin perder el contexto de la aplicación.
* **AT15 — Teclado en pantalla:** Interfaz de teclado virtual interactivo que permite ingresar letras con clics o touch, reflejando visualmente el estado de cada letra (disponible, acertada o fallada).
* **AT16 — Pistas y categorías:** El juego permite asociar una pista a la palabra oculta. El jugador puede revelarla voluntariamente tocando un botón mágico durante la partida, acompañada de animaciones y feedback visual premium.

---

## 💾 Gestión de Memoria y Almacenamiento
Para el manejo del estado de las partidas y el progreso del juego, el sistema ha sido diseñado para operar exclusivamente con **memoria caché** (almacenamiento en memoria volátil), prescindiendo de una capa de persistencia de datos real (como bases de datos relacionales o NoSQL).

Esta decisión arquitectónica prioriza la extrema velocidad de acceso y la simplicidad del entorno de ejecución académico, enfocándose en el diseño orientado a objetos y la cobertura de pruebas.

---

## 💻 Instrucciones de Instalación y Ejecución

### 1. Instalar dependencias
Asegúrate de clonar el repositorio e instalar las dependencias necesarias:
```bash
git clone https://github.com/martin-ratti/TP-Ahorcado
cd ahorcado
npm install
```

### 2. Ejecutar entorno de desarrollo (Local)
Para levantar el servidor de Vite y jugar:
```bash
npm run dev
```
Accede a `http://localhost:5173` en el navegador. Para iniciar el juego con una palabra específica: `http://localhost:5173/?word=GATO`.

### 3. Ejecutar Pruebas Unitarias (TDD)
Para correr la suite de Vitest de la lógica de dominio:
```bash
npm run test
```

### 4. Ejecutar Pruebas de Aceptación (ATDD)
Para correr los tests en Gherkin/Cucumber sobre un navegador headless con Playwright:
```bash
npm run at
```

---

## 🤝 El Equipo Detrás del Código
*Este proyecto cobra vida gracias al esfuerzo conjunto y colaborativo de:*

* 💻 **Agustín Santinelli**
* ✨ **Irina Repupilli**
* 🚀 **Francisco Lovatti**
* 🛠️ **Martin Ratti**

<hr>

<div align="center">
  <p><i>Desarrollado con 🧉 y metodologías ágiles por el equipo de alumnos.</i></p>
</div>
