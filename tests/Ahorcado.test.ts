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

describe("Ahorcado - acertar letra", () => {
  it("revela todas las ocurrencias de la letra acertada", () => {
    const juego = new Ahorcado("ALA");
    juego.adivinar("A");
    expect(juego.palabraEnmascarada()).toBe("A _ A");
  });

  it("es case-insensitive: adivinar en minuscula equivale a mayuscula", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("a");
    expect(juego.palabraEnmascarada()).toBe("_ A _ _");
  });

  it("acertar una letra no descuenta vidas", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    expect(juego.vidas()).toBe(6);
  });
});

describe("Ahorcado - fallar letra", () => {
  it("fallar una letra descuenta una vida", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    expect(juego.vidas()).toBe(5);
  });
});
