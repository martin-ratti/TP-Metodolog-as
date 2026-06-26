export interface PalabraConPista {
  palabra: string;
  pista: string;
}

export const PALABRAS: PalabraConPista[] = [
  { palabra: "GATO", pista: "Felino doméstico" },
  { palabra: "PERRO", pista: "El mejor amigo del hombre" },
  { palabra: "CABALLO", pista: "Animal de montura" },
  { palabra: "ELEFANTE", pista: "Mamífero con trompa" },
  { palabra: "JIRAFA", pista: "Animal de cuello muy largo" },
  { palabra: "COCODRILO", pista: "Reptil acuático grande" },
  { palabra: "MARIPOSA", pista: "Insecto con alas coloridas" },
  { palabra: "TORTUGA", pista: "Reptil con caparazón" },
  { palabra: "MURCIELAGO", pista: "Mamífero volador" },
  { palabra: "DELFIN", pista: "Mamífero acuático inteligente" },
  { palabra: "AGUILA", pista: "Ave rapaz" },
  { palabra: "PINGÜINO", pista: "Ave que no vuela y vive en el hielo" },
  { palabra: "CAMELLO", pista: "Animal del desierto con jorobas" },
  { palabra: "CANGURO", pista: "Marsupial saltarín" },
  { palabra: "LEON", pista: "El rey de la selva" },
  { palabra: "TIGRE", pista: "Felino rayado" },
  { palabra: "OSO", pista: "Mamífero grande y peludo" },
  { palabra: "LOBO", pista: "Cánido salvaje que aúlla" },
  { palabra: "ZORRO", pista: "Cánido astuto" },
  { palabra: "MONO", pista: "Primate ágil" },
];

export function elegirPalabra(lista: PalabraConPista[], indice: number): PalabraConPista {
  return lista[indice];
}
