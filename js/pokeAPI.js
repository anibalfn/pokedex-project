const pAPI = {}
// Essa const vai servir para armazenar os dados advindos das outras funções

function convertAPIdetails(details) {
    const pokemon = new Pokemon()
    pokemon.number = details.id
    pokemon.name = details.name
    pokemon.weight = details.weight
    pokemon.height = details.height

    // transforma os valores default nos meus personalizados

    const pokeTypes = details.types.map((pokeTypeSlot) => pokeTypeSlot.type.name)
    const [type] = pokeTypes

    pokemon.pokeTypes = types;
    pokemon.type = type;

    // Se os pokémons possuem mais de um tipo, são guardados num array

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    // Consome a img do pokémon da API

    return pokemon;
}

pAPI.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertAPIdetails)
}

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

