const recintos = [
  {
    numero: 1,
    bioma: ["savana"],
    tamanhoTotal: 10,
    animaisExistentes: 3,
    especie: "macaco",
  },
  {
    numero: 2,
    bioma: ["floresta"],
    tamanhoTotal: 5,
    animaisExistentes: 0,
    especie: null,
  },
  {
    numero: 3,
    bioma: ["savana", "rio"],
    tamanhoTotal: 7,
    animaisExistentes: 1,
    especie: "gazela",
  },
  {
    numero: 4,
    bioma: ["rio"],
    tamanhoTotal: 8,
    animaisExistentes: 0,
    especie: null,
  },
  {
    numero: 5,
    bioma: ["savana"],
    tamanhoTotal: 9,
    animaisExistentes: 1,
    especie: "leao",
  },
];

const animais = [
  { especie: "leao", espaco: 3, bioma: ["savana"] },
  { especie: "leopardo", espaco: 2, bioma: ["savana"] },
  { especie: "crocodilo", espaco: 3, bioma: ["rio"] },
  { especie: "macaco", espaco: 1, bioma: ["savana", "floresta"] },
  { especie: "gazela", espaco: 2, bioma: ["savana"] },
  { especie: "hipopotamo", espaco: 4, bioma: ["savana", "rio"] },
];

function getAnimal(animal) {
  return animais.find((animal) => animal.especie === animal);
}

class RecintosZoo {
  analisaRecintos(animal, quantidade) {}
}

export { RecintosZoo as RecintosZoo };
