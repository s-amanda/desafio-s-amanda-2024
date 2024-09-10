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
    { especie: "leao", espaco: 3, bioma: ["savana"], carnivoro: true },
    { especie: "leopardo", espaco: 2, bioma: ["savana"], carnivoro: true },
    { especie: "crocodilo", espaco: 3, bioma: ["rio"], carnivoro: true },
    { especie: "macaco", espaco: 1, bioma: ["savana", "floresta"], carnivoro: false },
    { especie: "gazela", espaco: 2, bioma: ["savana"], carnivoro: false },
    { especie: "hipopotamo", espaco: 4, bioma: ["savana", "rio"], carnivoro: false },
];

function getAnimal(especie) {
    return animais.find((animal) => animal.especie === especie);
}

class RecintosZoo {
    analisaRecintos(nomeAnimal, quantidade) {
        if (quantidade === 0)
            return { erro: 'Quantidade inválida' }

        const novoAnimal = getAnimal(nomeAnimal);

        const listaRecintos = recintos.filter((recinto) => {
            //animal.bioma.some((bioma) => recinto.bioma.includes(bioma))
            let biomaCompativel = false;
            novoAnimal.bioma.forEach((biomaAnimal) => {
                if (recinto.bioma.includes(biomaAnimal)) {
                    biomaCompativel = true
                }
            })
        })
        if (!biomaCompativel) {
            return false
        }

        const animalExistente = getAnimal(recinto.especie);

        const espacoOcupado = animalExistente.espaco * recinto.animaisExistentes;
        const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

        const tamanho = quantidade * novoAnimal.espaco;

        if (tamanho > espacoLivre) {
            return false;
        }

        if (novoAnimal.carnivoro && !animalExistente.carnivoro) {
            return false
        }




    }
}

export { RecintosZoo as RecintosZoo };
