import { Ahorcado } from "../domain/Ahorcado";

const NOMBRES_PARTES = ["cabeza", "cuerpo", "brazo izq", "brazo der", "pierna izq", "pierna der"];

export function mountApp(root: HTMLElement, word: string): void {
  const game = new Ahorcado(word);
  render(root, game, "");
}

function render(root: HTMLElement, game: Ahorcado, mensaje: string): void {
  const mensajeFin = game.ganado() ? "GANASTE" : game.perdido() ? "PERDISTE" : "";
  const partes = Array.from({ length: game.partesDelMuñeco() },
    (_, i) => `<span data-testid="hangman-part">${NOMBRES_PARTES[i]}</span>`
  ).join(" ");

  root.innerHTML = `
    <h1>Ahorcado</h1>
    <div>${partes}</div>
    <p data-testid="word">${game.palabraEnmascarada()}</p>
    <p data-testid="lives">${game.vidas()}</p>
    <p data-testid="message">${mensajeFin || mensaje}</p>
    <input type="text" maxlength="1" placeholder="Letra" />
    <button>Adivinar</button>
    ${game.terminado() ? '<button>Jugar de nuevo</button>' : ""}
  `;

  const input = root.querySelector("input")!;
  const btnAdivinar = root.querySelector("button")!;

  const handleGuess = () => {
    const letra = input.value.trim();
    if (!letra) return;
    const resultado = game.adivinar(letra);
    input.value = "";
    const aviso =
      resultado === "repetida" ? "Letra ya ingresada" :
      resultado === "invalida" ? "Entrada inválida" : "";
    render(root, game, aviso);
  };

  btnAdivinar.addEventListener("click", handleGuess);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleGuess();
  });

  const btnReiniciar = root.querySelector("button:last-of-type");
  if (btnReiniciar && btnReiniciar !== btnAdivinar) {
    btnReiniciar.addEventListener("click", () => {
      game.reiniciar();
      render(root, game, "");
    });
  }
}
