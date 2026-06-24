import { Ahorcado } from "../domain/Ahorcado";
import { vidasSegunDificultad } from "../domain/dificultad";

const SVG_PARTES = [
  `<circle data-testid="hangman-part" cx="100" cy="40" r="15" stroke="#e94560" stroke-width="3" fill="none"/>`,
  `<line data-testid="hangman-part" x1="100" y1="55" x2="100" y2="110" stroke="#e94560" stroke-width="3"/>`,
  `<line data-testid="hangman-part" x1="100" y1="70" x2="70" y2="95" stroke="#e94560" stroke-width="3"/>`,
  `<line data-testid="hangman-part" x1="100" y1="70" x2="130" y2="95" stroke="#e94560" stroke-width="3"/>`,
  `<line data-testid="hangman-part" x1="100" y1="110" x2="75" y2="140" stroke="#e94560" stroke-width="3"/>`,
  `<line data-testid="hangman-part" x1="100" y1="110" x2="125" y2="140" stroke="#e94560" stroke-width="3"/>`,
];

function dibujoAhorcado(partes: number): string {
  const cuerpo = SVG_PARTES.slice(0, partes).join("\n");
  return `
    <div class="gallows">
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
    `<span class="heart${i >= vidas ? " lost" : ""}">♥</span>`
  ).join("");
}

function letrasUsadas(game: Ahorcado): string {
  const hits  = (game as any).letrasAdivinadas as Set<string>;
  const miss  = (game as any).letrasErradas   as Set<string>;
  const chips = [
    ...[...hits].map(l => `<span class="used-letter hit">${l}</span>`),
    ...[...miss].map(l => `<span class="used-letter miss">${l}</span>`),
  ];
  return chips.length
    ? `<div class="used-letters">${chips.join("")}</div>`
    : `<div class="used-letters"></div>`;
}

export function mountApp(root: HTMLElement, getWord: () => string): void {
  mostrarPantallaInicio(root, getWord);
}

function mostrarPantallaInicio(root: HTMLElement, getWord: () => string): void {
  root.innerHTML = `
    <section data-testid="start-screen">
      <h1>Ahorcado</h1>
      <fieldset class="dificultad" data-testid="dificultad">
        <legend>Dificultad</legend>
        <label>
          <input type="radio" name="dificultad" value="facil" />
          Fácil
        </label>
        <label>
          <input type="radio" name="dificultad" value="normal" checked />
          Normal
        </label>
        <label>
          <input type="radio" name="dificultad" value="dificil" />
          Difícil
        </label>
      </fieldset>
      <button data-testid="start-game-btn">Jugar</button>
    </section>
  `;

  const btnJugar = root.querySelector("button")!;
  btnJugar.addEventListener("click", () => iniciarPartida(root, getWord));
}

function iniciarPartida(root: HTMLElement, getWord: () => string): void {
  const game = new Ahorcado(getWord(), vidasSegunDificultad((document.querySelector<HTMLInputElement>('input[name="dificultad"]:checked')?.value) || "normal"));
  render(root, game, getWord);
}

function render(root: HTMLElement, game: Ahorcado, getWord: () => string, mensaje = ""): void {
  const mensajeFin = game.ganado() ? "GANASTE" : game.perdido() ? "PERDISTE" : "";
  const vidas = game.vidas();

  root.innerHTML = `
    <section class="game-screen">
      <h1>Ahorcado</h1>
      ${dibujoAhorcado(game.partesDelMuñeco())}
      <p data-testid="word">${game.palabraEnmascarada()}</p>
      <div class="lives-row">
        <div class="hearts">${corazones(vidas)}</div>
      </div>
      <span data-testid="lives" style="display:none">${vidas}</span>
      <p data-testid="message">${mensajeFin || mensaje}</p>
      ${letrasUsadas(game)}
      <div class="input-row">
        <input type="text" maxlength="1" placeholder="A" autocomplete="off" />
        <button>Adivinar</button>
      </div>
      ${game.terminado() ? '<button class="secondary">Jugar de nuevo</button>' : ""}
    </section>
  `;

  const input       = root.querySelector("input")!;
  const btnAdivinar = root.querySelector("button:not(.secondary)")!;
  if (!game.terminado()) input.focus();

  const handleGuess = () => {
    const letra = input.value.trim();
    if (!letra) return;
    const resultado = game.adivinar(letra);
    input.value = "";
    const aviso =
      resultado === "repetida" ? "Letra ya ingresada" :
      resultado === "invalida" ? "Entrada inválida"   : "";
    render(root, game, getWord, aviso);
  };

  btnAdivinar.addEventListener("click", handleGuess);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") handleGuess(); });

  const btnReiniciar = root.querySelector("button.secondary");
  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", () => iniciarPartida(root, getWord));
  }
}
