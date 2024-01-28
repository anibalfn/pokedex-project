const pAPI = {}
// Essa const vai servir para armazenar os dados advindos das outras funções

pAPI.getPokemons = (offset = 0, limit = 10) => {
    const apiURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(apiURL)
        .then((response) => response.json())
        .then((pokeJson) => pokeJson.results)
        .then((multiplePokemon) => multiplePokemon.map(pAPI))
        .then((details) => Promise.all(details))
        .then((pokemonData => pokemonData))

}

// A função getPokemons é uma propriedade da pAPI, sendo que os parâmetros determinam a quantidade de pokémons na página
// O return faz um fetch na URL e recebe uma resposta
//Essa resposta vem em formato json e é solicitado os results
// O map percorre o resultado e cria uma nova array
// os details vem como promessa (assíncrono) e os dados são armazenados em pokemonsData

