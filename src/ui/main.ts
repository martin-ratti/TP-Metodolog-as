import { Ahorcado } from "../domain/Ahorcado";
import { vidasSegunDificultad } from "../domain/dificultad";
import { PalabraConPista } from "../domain/palabras";

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
  const cuerpo = SVG_PARTES.slice(0, partes).map((part, index) => {
    if (index === partes - 1 && !isLost) {
      return part.replace('/>', ' style="animation: draw 0.4s ease-out forwards;" />');
    }
    return part;
  }).join("\n");
  const extraClass = isLost ? "shake-red" : "";
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
  return Array.from({ length: 6 }, (_, i) => 
    `<span class="heart ${i < vidas ? "" : "lost"}">❤️</span>`
  ).join("");
}

function tecladoHTML(game: Ahorcado): string {
  if (game.terminado()) return "";
  
  const layout = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L","Ñ"],
    ["Z","X","C","V","B","N","M"]
  ];

  const filas = layout.map(fila => {
    const botones = fila.map(letra => {
      const estado = game.estadoLetra(letra);
      const disabled = estado !== "disponible" ? "disabled" : "";
      return `<button class="key ${estado}" ${disabled}>${letra}</button>`;
    }).join("");
    return `<div class="keyboard-row">${botones}</div>`;
  }).join("");

  return `<div class="keyboard">${filas}</div>`;
}

export function mountApp(root: HTMLElement, getWordData: () => PalabraConPista): void {
  let currentDificultad = "normal";
  const setDificultad = (nivel: string) => { currentDificultad = nivel; };
  const getDificultad = () => currentDificultad;
  mostrarPantallaInicio(root, getWordData, setDificultad, getDificultad);
}

function mostrarPantallaInicio(
  root: HTMLElement,
  getWordData: () => PalabraConPista,
  setDificultad: (nivel: string) => void,
  getDificultad: () => string,
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

      <fieldset class="dificultad" data-testid="dificultad">
        <legend>Dificultad</legend>
        <label>
          <input type="radio" name="dificultad" value="facil" ${getDificultad() === "facil" ? "checked" : ""}>
          Fácil
        </label>
        <label>
          <input type="radio" name="dificultad" value="normal" ${getDificultad() === "normal" ? "checked" : ""}>
          Normal
        </label>
        <label>
          <input type="radio" name="dificultad" value="dificil" ${getDificultad() === "dificil" ? "checked" : ""}>
          Difícil
        </label>
      </fieldset>
      
      <button class="play-btn">Jugar</button>
    </section>
  `;

  const fieldset = root.querySelector("fieldset")!;
  fieldset.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "dificultad") {
      setDificultad(target.value);
      mostrarPantallaInicio(root, getWordData, setDificultad, getDificultad);
    }
  });

  const radios = root.querySelectorAll("input[type='radio']");
  radios.forEach((radio) => {
    radio.addEventListener("click", () => {
      if ((radio as HTMLInputElement).value === getDificultad()) {
        setDificultad((radio as HTMLInputElement).value);
      }
    });
  });

  const btnJugar = root.querySelector("button")!;
  btnJugar.addEventListener("click", () =>
    iniciarPartida(root, getWordData, getDificultad(), setDificultad, getDificultad)
  );
}

function iniciarPartida(
  root: HTMLElement,
  getWordData: () => PalabraConPista,
  dificultad: string,
  setDificultad: (nivel: string) => void,
  getDificultad: () => string,
): void {
  const data = getWordData();
  const game = new Ahorcado(data.palabra, vidasSegunDificultad(dificultad), data.pista);
  render(root, game, getWordData, dificultad, setDificultad, getDificultad);
}

function render(
  root: HTMLElement,
  game: Ahorcado,
  getWordData: () => PalabraConPista,
  dificultad: string,
  setDificultad: (nivel: string) => void,
  getDificultad: () => string,
  mensaje = "",
  pistaMostrada = false
): void {
  const mensajeFin = game.ganado() ? "GANASTE" : game.perdido() ? "PERDISTE" : "";
  const vidas = game.vidas();
  const pista = game.pista();

  const modalHTML = game.terminado() ? `
    <div class="modal-overlay">
      <div class="modal-content ${game.ganado() ? 'neon-green' : 'neon-red'}">
        <h2 data-testid="message">${mensajeFin}</h2>
        <button class="secondary btn-modal restart-btn">Jugar de nuevo</button>
        <button class="back-to-menu btn-modal">Volver al menú</button>
      </div>
    </div>
  ` : "";

  const normalMessageHTML = !game.terminado() ? `<p data-testid="message">${mensaje}</p>` : "";
  
  const pistaHTML = pista
    ? pistaMostrada
      ? `<p data-testid="hint" style="color: #ffd700; font-weight: bold; margin-top: 10px;">Pista: ${pista}</p>`
      : `<button class="hint-btn" title="Ver pista">🪄 Pista</button>`
    : "";

  root.innerHTML = `
    <section class="game-screen">
      <h1>Ahorcado</h1>
      ${dibujoAhorcado(partesAMostrar(game.partesDelMuñeco(), vidasSegunDificultad(dificultad)), game.perdido())}
      <p data-testid="word">${game.palabraEnmascarada()}</p>
      <div class="lives-row">
        <div class="hearts">${corazones(vidas)}</div>
      </div>
      <span data-testid="lives" style="display:none">${vidas}</span>
      ${pistaHTML}
      ${normalMessageHTML}
      ${tecladoHTML(game)}
      ${!game.terminado() ? '<button class="back-to-menu" style="margin-top: 15px">Volver al menú</button>' : ""}
    </section>
    ${modalHTML}
  `;

  if (pista && !pistaMostrada) {
    const hintBtn = root.querySelector(".hint-btn");
    hintBtn?.addEventListener("click", () => {
      render(root, game, getWordData, dificultad, setDificultad, getDificultad, mensaje, true);
    });
  }

  const keys = root.querySelectorAll<HTMLButtonElement>(".key:not([disabled])");
  keys.forEach(keyBtn => {
    keyBtn.addEventListener("click", () => {
      const letra = keyBtn.textContent;
      if (!letra) return;
      game.adivinar(letra);
      render(root, game, getWordData, dificultad, setDificultad, getDificultad, "", pistaMostrada);
    });
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (game.terminado()) return;
    const letra = e.key.toUpperCase();
    if (/^[A-ZÑ]$/.test(letra)) {
      game.adivinar(letra);
      render(root, game, getWordData, dificultad, setDificultad, getDificultad, "", pistaMostrada);
    }
  };

  window.onkeydown = handleKeydown;

  const btnReiniciar = root.querySelector("button.secondary");
  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", () =>
      iniciarPartida(root, getWordData, dificultad, setDificultad, getDificultad)
    );
  }

  const btnVolver = root.querySelector("button.back-to-menu")!;
  btnVolver.addEventListener("click", () =>
    mostrarPantallaInicio(root, getWordData, setDificultad, getDificultad)
  );
}
