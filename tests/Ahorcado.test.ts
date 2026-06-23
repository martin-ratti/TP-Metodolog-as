import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado - iniciar partida", () => {
  it("muestra guiones para todas las letras al iniciar", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("empieza con 6 vidas", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.vidas()).toBe(6);
  });
});
