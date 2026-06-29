import { Ahorcado } from '../domain/Ahorcado';
import { vidasSegunDificultad } from '../domain/dificultad';
import { PalabraConPista } from '../domain/palabras';

const SVG_PARTES = [
  `<circle data-testid="hangman-part" cx="100" cy="40" r="15" stroke="#e94560" stroke-width="3" fill="none"/>`,
  `<line data-testid="hangman-part" x1="100" y1="55" x2="100" y2="110" stroke="#e94560" stroke-width="3"/>`,
  `<line data-testid="hangman-part" x1="100" y1="70" x2="70" y2="95" stroke="#e94560" stroke-width="3"/>`,
  `<line data-testid="hangman-part" x1="100" y1="70" x2="130" y2="95" stroke="#e94560" stroke-width="3"/>`,
  `<line data-testid="hangman-part" x1="100" y1="110" x2="75" y2="140" stroke="#e94560" stroke-width="3"/>`,
  `<line data-testid="hangman-part" x1="100" y1="110" x2="125" y2="140" stroke="#e94560" stroke-width="3"/>`,
];

function partesAMostrar(errores: number, vidasTotales: number): number {
  if (vidasTotales >= 6) return errores;
  const proporcion = 6 / vidasTotales;
  return Math.floor(errores * proporcion);
}

function dibujoAhorcado(partes: number, isLost: boolean = false): string {
  const cuerpo = SVG_PARTES.slice(0, partes)
    .map((part, index) => {
      if (index === partes - 1 && !isLost) {
        return part.replace(
          '/>',
          ' style="animation: draw 0.4s ease-out forwards;" />',
        );
      }
      return part;
    })
    .join('\n');
  const extraClass = isLost ? 'shake-red' : '';
  return `
    <div class="gallows ${extraClass}">
      <svg width="160" height="200">
        <line x1="20" y1="190" x2="140" y2="190" stroke="#4a4a7a" stroke-width="3"/>
        <line x1="60" y1="190" x2="60" y2="10"  stroke="#4a4a7a" stroke-width="3"/>
        <line x1="60" y1="10"  x2="100" y2="10"  stroke="#4a4a7a" stroke-width="3"/>
        <line x1="100" y1="10" x2="100" y2="25"  stroke="#4a4a7a" stroke-width="3"/>
        ${cuerpo}
      </svg>
    </div>
  `;
}

function corazones(vidas: number): string {
  return Array.from(
    { length: 6 },
    (_, i) => `<span class="heart ${i < vidas ? '' : 'lost'}">❤️</span>`,
  ).join('');
}

function tecladoHTML(game: Ahorcado): string {
  if (game.terminado()) return '';

  const layout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const filas = layout
    .map((fila) => {
      const botones = fila
        .map((letra) => {
          const estado = game.estadoLetra(letra);
          const disabled = estado !== 'disponible' ? 'disabled' : '';
          return `<button class="key ${estado}" ${disabled}>${letra}</button>`;
        })
        .join('');
      return `<div class="keyboard-row">${botones}</div>`;
    })
    .join('');

  return `<div class="keyboard">${filas}</div>`;
}

export function mensajeSegunResultado(resultado: string): string {
  if (resultado === 'repetida') return 'Letra ya ingresada';
  if (resultado === 'invalida') return 'Entrada inválida';
  return '';
}

export function mountApp(
  root: HTMLElement,
  getWordData: () => PalabraConPista,
): void {
  let currentDificultad = 'facil';
  const sessionStats = { victorias: 0, derrotas: 0 };
  const setDificultad = (nivel: string) => {
    currentDificultad = nivel;
  };
  const getDificultad = () => currentDificultad;
  mostrarPantallaInicio(
    root,
    getWordData,
    setDificultad,
    getDificultad,
    sessionStats,
  );
}

function mostrarPantallaInicio(
  root: HTMLElement,
  getWordData: () => PalabraConPista,
  setDificultad: (nivel: string) => void,
  getDificultad: () => string,
  sessionStats: { victorias: number; derrotas: number },
): void {
  root.innerHTML = `
    <section data-testid="start-screen">
      <h1>Ahorcado</h1>
      
      <div class="start-hero" style="margin: 20px 0;">
        <svg width="160" height="200" style="filter: drop-shadow(0 0 10px rgba(255, 182, 185, 0.3));">
          <line x1="20" y1="190" x2="140" y2="190" stroke="#b0b5c9" stroke-width="4" stroke-linecap="round"/>
          <line x1="60" y1="190" x2="60" y2="10"  stroke="#b0b5c9" stroke-width="4" stroke-linecap="round"/>
          <line x1="60" y1="10"  x2="100" y2="10"  stroke="#b0b5c9" stroke-width="4" stroke-linecap="round"/>
          <line x1="100" y1="10" x2="100" y2="25"  stroke="#b0b5c9" stroke-width="4" stroke-linecap="round"/>
          
          <circle cx="100" cy="40" r="15" stroke="#ffb6b9" stroke-width="4" fill="none"/>
          <line x1="100" y1="55" x2="100" y2="110" stroke="#ffb6b9" stroke-width="4" stroke-linecap="round"/>
          <line x1="100" y1="70" x2="70" y2="95" stroke="#ffb6b9" stroke-width="4" stroke-linecap="round"/>
          <line x1="100" y1="70" x2="130" y2="95" stroke="#ffb6b9" stroke-width="4" stroke-linecap="round"/>
          <line x1="100" y1="110" x2="75" y2="140" stroke="#ffb6b9" stroke-width="4" stroke-linecap="round"/>
          <line x1="100" y1="110" x2="125" y2="140" stroke="#ffb6b9" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="dificultad" data-testid="dificultad">
        <span class="dificultad-label">Dificultad</span>
        <button class="dificultad-btn ${getDificultad() === 'facil' ? 'selected' : ''}" data-nivel="facil">Fácil</button>
        <button class="dificultad-btn ${getDificultad() === 'normal' ? 'selected' : ''}" data-nivel="normal">Normal</button>
        <button class="dificultad-btn ${getDificultad() === 'dificil' ? 'selected' : ''}" data-nivel="dificil">Difícil</button>
      </div>
      
      <button class="play-btn">Jugar</button>
      <button class="secondary two-players-btn">Dos Jugadores</button>
    </section>
  `;

  const dificultadBtns = root.querySelectorAll<HTMLButtonElement>('.dificultad-btn');
  dificultadBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setDificultad(btn.dataset.nivel!);
      mostrarPantallaInicio(
        root,
        getWordData,
        setDificultad,
        getDificultad,
        sessionStats,
      );
    });
  });

  const btnJugar = root.querySelector('.play-btn') as HTMLButtonElement | null;
  btnJugar?.addEventListener('click', () =>
    iniciarPartida(
      root,
      getWordData,
      getDificultad(),
      setDificultad,
      getDificultad,
      sessionStats,
    ),
  );

  const btnDosJugadores = root.querySelector(
    '.two-players-btn',
  ) as HTMLButtonElement | null;
  btnDosJugadores?.addEventListener('click', () =>
    mostrarPantallaDosJugadores(
      root,
      getWordData,
      setDificultad,
      getDificultad,
      sessionStats,
    ),
  );
}

function mostrarPantallaDosJugadores(
  root: HTMLElement,
  getWordData: () => PalabraConPista,
  setDificultad: (nivel: string) => void,
  getDificultad: () => string,
  sessionStats: { victorias: number; derrotas: number },
): void {
  root.innerHTML = `
    <section data-testid="two-players-screen">
      <h1>Modo Dos Jugadores</h1>
      <label for="secret-word">Palabra secreta</label>
      <input id="secret-word" type="password" />
      <label for="hint-input">Pista</label>
      <input id="hint-input" type="text" />
      <button class="start-two-players-btn">Iniciar</button>
      <button class="back-to-menu" style="margin-top: 15px">Volver al menú</button>
    </section>
  `;

  const btnIniciar = root.querySelector(
    '.start-two-players-btn',
  ) as HTMLButtonElement | null;
  btnIniciar?.addEventListener('click', () => {
    const inputPalabra = root.querySelector(
      '#secret-word',
    ) as HTMLInputElement | null;
    const inputPista = root.querySelector(
      '#hint-input',
    ) as HTMLInputElement | null;
    const palabra = inputPalabra?.value.trim() ?? '';
    const pista = inputPista?.value.trim() ?? '';
    const game = new Ahorcado(
      palabra,
      vidasSegunDificultad(getDificultad()),
      pista,
      sessionStats,
    );
    render(
      root,
      game,
      getWordData,
      getDificultad(),
      setDificultad,
      getDificultad,
      sessionStats,
    );
  });

  const btnVolver = root.querySelector(
    'button.back-to-menu',
  ) as HTMLButtonElement | null;
  btnVolver?.addEventListener('click', () =>
    mostrarPantallaInicio(
      root,
      getWordData,
      setDificultad,
      getDificultad,
      sessionStats,
    ),
  );
}

function iniciarPartida(
  root: HTMLElement,
  getWordData: () => PalabraConPista,
  dificultad: string,
  setDificultad: (nivel: string) => void,
  getDificultad: () => string,
  sessionStats: { victorias: number; derrotas: number },
): void {
  const data = getWordData();
  const game = new Ahorcado(
    data.palabra,
    vidasSegunDificultad(dificultad),
    data.pista,
    sessionStats,
  );
  render(
    root,
    game,
    getWordData,
    dificultad,
    setDificultad,
    getDificultad,
    sessionStats,
  );
}

function render(
  root: HTMLElement,
  game: Ahorcado,
  getWordData: () => PalabraConPista,
  dificultad: string,
  setDificultad: (nivel: string) => void,
  getDificultad: () => string,
  sessionStats: { victorias: number; derrotas: number },
  mensaje = '',
  pistaMostrada = false,
): void {
  const mensajeFin = game.ganado()
    ? 'GANASTE'
    : game.perdido()
      ? 'PERDISTE'
      : '';
  const vidas = game.vidas();
  const pista = game.pista();
  const marcador = game.resultadoSesion();

  const modalHTML = game.terminado()
    ? `
    <div class="modal-overlay">
      <div class="modal-content ${game.ganado() ? 'neon-green' : 'neon-red'}">
        <h2 data-testid="message">${mensajeFin}</h2>
        <button class="secondary btn-modal restart-btn">Jugar de nuevo</button>
        <button class="back-to-menu btn-modal">Volver al menú</button>
      </div>
    </div>
  `
    : '';

  const normalMessageHTML = !game.terminado()
    ? `<p data-testid="message">${mensaje}</p>`
    : '';

  const pistaHTML = pista
    ? pistaMostrada
      ? `<p data-testid="hint" style="color: #ffd700; font-weight: bold; margin-top: 10px;">Pista: ${pista}</p>`
      : `<button class="hint-btn" title="Ver pista">🪄 Pista</button>`
    : '';

  root.innerHTML = `
    <section class="game-screen">
      <h1>Ahorcado</h1>
      ${dibujoAhorcado(partesAMostrar(game.partesDelMuñeco(), vidasSegunDificultad(dificultad)), game.perdido())}
      <p data-testid="word">${game.palabraEnmascarada()}</p>
      <div class="lives-row">
        <div class="hearts">${corazones(vidas)}</div>
      </div>
      <span data-testid="lives" style="display:none">${vidas}</span>
      <p data-testid="session-score">Victorias: ${marcador.victorias} Derrotas: ${marcador.derrotas}</p>
      ${pistaHTML}
      ${normalMessageHTML}
      ${tecladoHTML(game)}
      ${!game.terminado() ? '<button class="back-to-menu" style="margin-top: 15px">Volver al menú</button>' : ''}
    </section>
    ${modalHTML}
  `;

  const inputOculto = document.createElement('input');
  inputOculto.type = 'text';
  inputOculto.style.opacity = '0';
  inputOculto.style.position = 'absolute';
  inputOculto.style.zIndex = '-1';
  inputOculto.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    const letra = inputOculto.value.trim().toUpperCase();
    if (!letra) return;

    const resultado = game.adivinar(letra);
    inputOculto.value = '';
    render(
      root,
      game,
      getWordData,
      dificultad,
      setDificultad,
      getDificultad,
      sessionStats,
      mensajeSegunResultado(resultado),
      pistaMostrada,
    );
  });
  root.appendChild(inputOculto);

  if (pista && !pistaMostrada) {
    const hintBtn = root.querySelector('.hint-btn');
    hintBtn?.addEventListener('click', () => {
      render(
        root,
        game,
        getWordData,
        dificultad,
        setDificultad,
        getDificultad,
        sessionStats,
        `Pista: ${pista}`,
        true,
      );
    });
  }

  const keys = root.querySelectorAll<HTMLButtonElement>('.key:not([disabled])');
  keys.forEach((keyBtn) => {
    keyBtn.addEventListener('click', () => {
      const letra = keyBtn.textContent;
      if (!letra) return;
      const resultado = game.adivinar(letra);
      const siguienteMensaje = mensajeSegunResultado(resultado);
      render(
        root,
        game,
        getWordData,
        dificultad,
        setDificultad,
        getDificultad,
        sessionStats,
        siguienteMensaje,
        pistaMostrada,
      );
    });
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (game.terminado()) return;
    const letra = e.key.toUpperCase();
    if (/^[A-ZÑ]$/.test(letra)) {
      const resultado = game.adivinar(letra);
      render(
        root,
        game,
        getWordData,
        dificultad,
        setDificultad,
        getDificultad,
        sessionStats,
        mensajeSegunResultado(resultado),
        pistaMostrada,
      );
    }
  };

  window.onkeydown = handleKeydown;

  const btnReiniciar = root.querySelector('.restart-btn');
  if (btnReiniciar) {
    btnReiniciar.addEventListener('click', () =>
      iniciarPartida(
        root,
        getWordData,
        dificultad,
        setDificultad,
        getDificultad,
        sessionStats,
      ),
    );
  }

  const btnVolver = root.querySelector('button.back-to-menu')!;
  btnVolver.addEventListener('click', () =>
    mostrarPantallaInicio(
      root,
      getWordData,
      setDificultad,
      getDificultad,
      sessionStats,
    ),
  );
}
