const recintos = [
    {
        numero: 1,
        bioma: ["savana"],
        tamanhoTotal: 10,
        animaisExistentes: 3,
        animal: "MACACO",
    },
    {
        numero: 2,
        bioma: ["floresta"],
        tamanhoTotal: 5,
        animaisExistentes: 0,
        animal: null,
    },
    {
        numero: 3,
        bioma: ["savana", "rio"],
        tamanhoTotal: 7,
        animaisExistentes: 1,
        animal: "GAZELA",
    },
    {
        numero: 4,
        bioma: ["rio"],
        tamanhoTotal: 8,
        animaisExistentes: 0,
        animal: null,
    },
    {
        numero: 5,
        bioma: ["savana"],
        tamanhoTotal: 9,
        animaisExistentes: 1,
        animal: "LEAO",
    },
];

const animais = [
    { especie: "LEAO", espaco: 3, bioma: ["savana"], carnivoro: true },
    { especie: "LEOPARDO", espaco: 2, bioma: ["savana"], carnivoro: true },
    { especie: "CROCODILO", espaco: 3, bioma: ["rio"], carnivoro: true },
    { especie: "MACACO", espaco: 1, bioma: ["savana", "floresta"], carnivoro: false },
    { especie: "GAZELA", espaco: 2, bioma: ["savana"], carnivoro: false },
    { especie: "HIPOPOTAMO", espaco: 4, bioma: ["savana", "rio"], carnivoro: false },
];

function getAnimal(especie) {
    return animais.find((animal) => animal.especie === especie);
}

function calculaEspacoLivre(recinto) {
    const animalExistente = getAnimal(recinto.animal);

    const espacoOcupado = animalExistente ? animalExistente.espaco * recinto.animaisExistentes : 0;
    return recinto.tamanhoTotal - espacoOcupado;
}

function calculaEspacoNecessario(novoAnimal, quantidade, recinto) {
    const animalExistente = getAnimal(recinto.animal);

    let tamanhoNovoAnimal = quantidade * novoAnimal.espaco;

    // Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
    if (animalExistente && animalExistente.especie != novoAnimal.especie) {
        tamanhoNovoAnimal += 1
    }
    return tamanhoNovoAnimal;
}


class RecintosZoo {
    analisaRecintos(nomeAnimal, quantidade) {

        if (quantidade === 0)
            return { erro: 'Quantidade inválida' };

        const novoAnimal = getAnimal(nomeAnimal);

        if (!novoAnimal) {
            return { erro: 'Animal inválido' };
        }

        const recintosViaveis = recintos.filter((recinto) => {
            // Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
            let biomaCompativel = false;
            novoAnimal.bioma.forEach((biomaAnimal) => {
                if (recinto.bioma.includes(biomaAnimal)) {
                    biomaCompativel = true;
                }
            })

            if (!biomaCompativel) {
                return false;
            }

            // Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
            const animalExistente = getAnimal(recinto.animal);
            const espacoLivre = calculaEspacoLivre(recinto);

            const espacoNecessario = calculaEspacoNecessario(novoAnimal, quantidade, recinto);

            if (espacoNecessario > espacoLivre) {
                return false;
            }

            // Animais carnívoros devem habitar somente com a própria espécie
            if (animalExistente && novoAnimal.carnivoro != animalExistente.carnivoro) {
                return false;
            }

            // Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
            if (novoAnimal.especie === 'HIPOPOTAMO' && animalExistente?.especie !== 'HIPOPOTAMO') {
                if (!recinto.bioma.includes('savana') && !recinto.bioma.includes('rio')) {
                    return false;
                }
            }

            // Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
            if (novoAnimal.especie === 'MACACO') {
                if (quantidade === 1 && !animalExistente) {
                    return false;
                }
            }
            return true;

        })
        if (!recintosViaveis.length) {
            return { erro: 'Não há recinto viável' };
        }

        const listaDeRecintos = recintosViaveis.map((recinto) => {
            const espacoLivre = calculaEspacoLivre(recinto) - calculaEspacoNecessario(novoAnimal, quantidade, recinto);
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        })

        return { recintosViaveis: listaDeRecintos };

    }
}

export { RecintosZoo as RecintosZoo };
