// src/domain/dificultad.ts

export type Dificultad = "facil" | "normal" | "dificil";

const VIDAS_POR_DIFICULTAD: Record<Dificultad, number> = {
  facil: 6,
  normal: 4,
  dificil: 2,
};

const DIFICULTAD_POR_DEFECTO: Dificultad = "normal";

export function vidasSegunDificultad(nivel: string): number {
  if (nivel in VIDAS_POR_DIFICULTAD) {
    return VIDAS_POR_DIFICULTAD[nivel as Dificultad];
  }
  return VIDAS_POR_DIFICULTAD[DIFICULTAD_POR_DEFECTO];
}