import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";
import { elegirPalabra, PALABRAS } from "../src/domain/palabras";
import { vidasSegunDificultad } from "../src/domain/dificultad";

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

describe("Ahorcado - letra repetida", () => {
  it("repetir letra acertada no descuenta vidas", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    juego.adivinar("A");
    expect(juego.vidas()).toBe(6);
  });

  it("repetir letra fallada no descuenta vidas adicionales", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    juego.adivinar("E");
    expect(juego.vidas()).toBe(5);
  });

  it("adivinar letra repetida devuelve 'repetida'", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    expect(juego.adivinar("A")).toBe("repetida");
  });

  it("adivinar letra nueva acertada devuelve 'acertada'", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.adivinar("A")).toBe("acertada");
  });

  it("adivinar letra nueva fallada devuelve 'fallada'", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.adivinar("E")).toBe("fallada");
  });
});

describe("Ahorcado - entrada invalida", () => {
  it("adivinar un numero devuelve 'invalida' y no descuenta vidas", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.adivinar("3")).toBe("invalida");
    expect(juego.vidas()).toBe(6);
  });

  it("adivinar un simbolo devuelve 'invalida' y no descuenta vidas", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.adivinar("!")).toBe("invalida");
    expect(juego.vidas()).toBe(6);
  });

  it("adivinar con partida terminada devuelve 'terminado' y no cambia el estado", () => {
    const juego = new Ahorcado("OSO");
    juego.adivinar("O");
    juego.adivinar("S");
    expect(juego.adivinar("Z")).toBe("terminado");
    expect(juego.vidas()).toBe(6);
  });
});

describe("Ahorcado - jugar de nuevo", () => {
  it("reiniciar resetea las vidas a 6", () => {
    const juego = new Ahorcado("OSO");
    juego.adivinar("O");
    juego.adivinar("S");
    juego.reiniciar();
    expect(juego.vidas()).toBe(6);
  });

  it("reiniciar resetea la palabra enmascarada", () => {
    const juego = new Ahorcado("OSO");
    juego.adivinar("O");
    juego.adivinar("S");
    juego.reiniciar();
    expect(juego.palabraEnmascarada()).toBe("_ _ _");
  });

  it("reiniciar permite volver a jugar", () => {
    const juego = new Ahorcado("OSO");
    juego.adivinar("O");
    juego.adivinar("S");
    juego.reiniciar();
    expect(juego.ganado()).toBe(false);
    expect(juego.terminado()).toBe(false);
  });
});

describe("Ahorcado - acentos y ñ", () => {
  it("adivinar con acento equivale a la letra sin acento", () => {
    const juego = new Ahorcado("MURCIELAGO");
    juego.adivinar("é");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _ _ E _ _ _ _");
  });

  it("la palabra con acento se normaliza al construir", () => {
    const juego = new Ahorcado("ÁRBOL");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _ _");
    juego.adivinar("A");
    expect(juego.palabraEnmascarada()).toBe("A _ _ _ _");
  });

  it("la ñ se trata como letra independiente", () => {
    const juego = new Ahorcado("MAÑANA");
    juego.adivinar("ñ");
    expect(juego.palabraEnmascarada()).toBe("_ _ Ñ _ _ _");
  });

  it("adivinar con acento no descuenta vidas", () => {
    const juego = new Ahorcado("MURCIELAGO");
    juego.adivinar("é");
    expect(juego.vidas()).toBe(6);
  });
});

describe("palabra al azar - seam elegirPalabra", () => {
  it("elegirPalabra devuelve la palabra en el indice dado", () => {
    const lista = ["GATO", "PERRO", "OSO"];
    expect(elegirPalabra(lista, 0)).toBe("GATO");
    expect(elegirPalabra(lista, 2)).toBe("OSO");
  });

  it("PALABRAS tiene al menos una palabra", () => {
    expect(PALABRAS.length).toBeGreaterThan(0);
  });

  it("todas las palabras de PALABRAS son strings no vacios", () => {
    expect(PALABRAS.every((p) => typeof p === "string" && p.length > 0)).toBe(true);
  });
});

describe("Ahorcado - dibujo progresivo", () => {
  it("con 0 errores hay 0 partes del muñeco", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.partesDelMuñeco()).toBe(0);
  });

  it("con 1 error hay 1 parte del muñeco", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    expect(juego.partesDelMuñeco()).toBe(1);
  });

  it("con 3 errores hay 3 partes del muñeco", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    juego.adivinar("I");
    juego.adivinar("U");
    expect(juego.partesDelMuñeco()).toBe(3);
  });

  it("con 6 errores hay 6 partes del muñeco", () => {
    const juego = new Ahorcado("OSO");
    ["A", "B", "C", "D", "E", "F"].forEach((l) => juego.adivinar(l));
    expect(juego.partesDelMuñeco()).toBe(6);
  });
});

describe("Ahorcado - dificultad", () => {
  it("por defecto empieza con 6 vidas si no se especifica", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.vidas()).toBe(6);
  });

  it("permite configurar la cantidad de vidas iniciales", () => {
    const juego = new Ahorcado("GATO", 4);
    expect(juego.vidas()).toBe(4);
  });

  it("reiniciar respeta la cantidad de vidas configurada, no siempre 6", () => {
    const juego = new Ahorcado("GATO", 2);
    juego.adivinar("E");
    juego.reiniciar();
    expect(juego.vidas()).toBe(2);
  });

  it("Fácil otorga 6 vidas", () => {
    expect(vidasSegunDificultad("facil")).toBe(6);
  });

  it("Normal otorga 4 vidas", () => {
    expect(vidasSegunDificultad("normal")).toBe(4);
  });

  it("Difícil otorga 2 vidas", () => {
    expect(vidasSegunDificultad("dificil")).toBe(2);
  });
});
