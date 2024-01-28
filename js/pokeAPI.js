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
        console.log(pokemonData);
}
