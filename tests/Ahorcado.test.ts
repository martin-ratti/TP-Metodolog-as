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

  it("fallar una letra no revela ninguna posicion", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("varios fallos acumulan errores correctamente", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    juego.adivinar("I");
    juego.adivinar("U");
    expect(juego.vidas()).toBe(3);
  });
});

describe("Ahorcado - ganar", () => {
  it("ganado() es true cuando se adivinaron todas las letras", () => {
    const juego = new Ahorcado("OSO");
    juego.adivinar("O");
    juego.adivinar("S");
    expect(juego.ganado()).toBe(true);
  });

  it("ganado() es false si falta al menos una letra", () => {
    const juego = new Ahorcado("OSO");
    juego.adivinar("O");
    expect(juego.ganado()).toBe(false);
  });
});

describe("Ahorcado - perder", () => {
  it("perdido() es true despues de 6 fallos", () => {
    const juego = new Ahorcado("OSO");
    ["A", "B", "C", "D", "E", "F"].forEach((l) => juego.adivinar(l));
    expect(juego.perdido()).toBe(true);
  });

  it("perdido() es false con menos de 6 fallos", () => {
    const juego = new Ahorcado("OSO");
    ["A", "B", "C"].forEach((l) => juego.adivinar(l));
    expect(juego.perdido()).toBe(false);
  });

  it("palabraEnmascarada revela la palabra completa al perder", () => {
    const juego = new Ahorcado("OSO");
    ["A", "B", "C", "D", "E", "F"].forEach((l) => juego.adivinar(l));
    expect(juego.palabraEnmascarada()).toBe("OSO");
  });
});
