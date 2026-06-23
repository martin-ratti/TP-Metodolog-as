<div align="center">
  <h1>🎮 Ahorcado</h1>
  <h3>📚 Metodologías de Desarrollo de Software</h3>
  <p>
    <b>Trabajo Práctico Universitario Grupal</b>
  </p>
</div>

<hr>

<h2 align="left">🎯 Propósito del Proyecto</h2>
<p>
  Este repositorio contiene el código fuente del tradicional <b>Juego del Ahorcado</b>, desarrollado como trabajo práctico para la cátedra de Metodologías de Desarrollo de Software. El objetivo principal es aplicar buenas prácticas de ingeniería de software, tipado estricto, testing e integración continua.
</p>

<hr>

<h2 align="left">🛠️ Tecnologías y Herramientas</h2>
<ul>
  <li>🔵 <b>TypeScript:</b> Lenguaje principal del proyecto, asegurando un código robusto, escalable y libre de errores de tipado.</li>
  <li>⚙️ <b>GitHub Actions:</b> Motor de Integración Continua (CI) para automatizar validaciones en cada cambio.</li>
  <li>📦 <b>Node.js & pnpm:</b> Entorno de ejecución y gestor de paquetes.</li>
</ul>

<hr>

<h2 align="left">🚀 Características Principales</h2>
<ul>
  <li>🕹️ <b>Mecánica Clásica Integral:</b> Motor completo del tradicional juego del ahorcado, gestionando dinámicamente la selección de palabras, el flujo de vidas y las condiciones de resolución de la partida.</li>
  <li>🧠 <b>Arquitectura Orientada a Pruebas:</b> Desarrollo fundamentado estrictamente en metodologías ágiles (<b>TDD</b> y <b>ATDD</b>), garantizando que la lógica interna esté validada desde su concepción y alineada con los criterios de aceptación del usuario.</li>
  <li>⚡ <b>Gestión de Estado Ultra-Rápida:</b> Manejo de las sesiones de juego utilizando exclusivamente <b>memoria caché</b>. Esta decisión prescinde de bases de datos persistentes para priorizar la velocidad de ejecución y mantener la simplicidad del entorno académico.</li>
  <li>🤖 <b>Integración Continua (CI) Robusta:</b> Pipelines automatizados configurados en GitHub Actions que actúan como guardianes del código, verificando el testing, el formateo y la compilación en cada cambio introducido.</li>
</ul>

<hr>

<h2 align="left">🧪 Metodologías de Desarrollo (TDD & ATDD)</h2>
<p>
  Para garantizar la máxima calidad y fiabilidad del software, la construcción de este proyecto se rige bajo un enfoque centrado en el comportamiento y las pruebas, utilizando dos prácticas fundamentales de la agilidad:
</p>
<ul>
  <li>🔴🟢🔵 <b>TDD (Test-Driven Development):</b> La arquitectura y la lógica interna del juego se desarrollaron escribiendo primero las pruebas unitarias y luego el código de producción necesario para superarlas. Esto nos permitió diseñar componentes altamente desacoplados, asegurar una cobertura de código robusta y validar de forma aislada los motores del juego (descuento de vidas, acierto de letras, condiciones de victoria).</li>
  <li>🤝✅ <b>ATDD (Acceptance Test-Driven Development):</b> Más allá de las pruebas técnicas, trabajamos definiendo previamente los criterios de aceptación desde la perspectiva del usuario. Antes de implementar cada funcionalidad, establecimos qué comportamiento se esperaba exactamente al interactuar con el juego, asegurando que el desarrollo siempre estuviera alineado con los requisitos del negocio y la experiencia del jugador.</li>
</ul>

<hr>

<h2 align="left">💾 Gestión de Memoria y Almacenamiento</h2>
<p>
  Para el manejo del estado de las partidas y el progreso del juego, el sistema ha sido diseñado para operar exclusivamente con <b>memoria caché</b> (almacenamiento en memoria volátil), prescindiendo de una capa de persistencia de datos real (como bases de datos relacionales o NoSQL).
</p>
<p>
  Esta decisión arquitectónica prioriza la extrema velocidad de acceso y la simplicidad del entorno de ejecución. Al enmarcarse en un entorno académico, nuestro enfoque principal es la correcta aplicación de metodologías de desarrollo, el diseño orientado a objetos y el testing exhaustivo, evitando la sobrecarga y complejidad que implica levantar, mantener y configurar infraestructura de bases de datos.
</p>

<hr>

<h2 align="left">🔄 Integración Continua (CI)</h2>
<p>
  Gracias a <b>GitHub Actions</b>, hemos establecido flujos de trabajo que se disparan en cada <i>Push</i> o <i>Pull Request</i> a las ramas principales:
</p>
<ul>
  <li>🧪 <b>Testing Automatizado:</b> Ejecución de pruebas unitarias para validar la lógica del juego.</li>
  <li>🧹 <b>Linter y Formateo:</b> Revisión estática del código TypeScript para mantener un estilo unificado en el equipo.</li>
  <li>🏗️ <b>Build Check:</b> Verificación de que el proyecto compile correctamente sin errores.</li>
</ul>

<hr>

<h2 align="left">💻 Instrucciones de Instalación</h2>
<ol>
  <li>Clonar el repositorio en tu máquina local:<br>
    <code>git clone https://github.com/martin-ratti/TP-Ahorcado</code>
  </li>
  <li>Navegar al directorio del proyecto:<br>
    <code>cd ahorcado</code>
  </li>
  <li>Instalar las dependencias necesarias:<br>
    <code>pnpm install</code>
  </li>
  <li>Compilar y ejecutar el juego:<br>
    <code>pnpm start</code> <i>(o el script definido por el equipo)</i>
  </li>
</ol>

<hr>

<h2>🤝 El Equipo Detrás del Código</h2>
<p>
  <i>Este proyecto cobra vida gracias al esfuerzo conjunto, la pasión por el desarrollo y el trabajo colaborativo de:</i>
</p>

<ul>
  <li>💻 <b>Agustín Santinelli</b></li>
  <li>✨ <b>Irina Repupilli</b></li>
  <li>🚀 <b>Francisco Lovatti</b></li>
  <li>🛠️ <b>Martin Ratti</b></li>
</ul>

<hr>

<div align="center">
  <p><i>Desarrollado con 🧉 y código estructurado por el equipo de alumnos.</i></p>
</div>
