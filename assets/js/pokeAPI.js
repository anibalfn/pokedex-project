class PokeAPI {
  async convertAPIdetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;
    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    return pokemon;
  }

  async getPokemonDetail(pokemon) {
    const response = await fetch(pokemon.url);
    const pokeDetail = await response.json();
    return this.convertAPIdetailToPokemon(pokeDetail);
  }

  async getPokemons(offset = 0, limit = 5) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    const response = await fetch(url);
    const jsonBody = await response.json();
    const pokemons = jsonBody.results;

    const detailRequests = pokemons.map(
      async (pokemon) => await this.getPokemonDetail(pokemon)
    );
    const pokemonsDetails = await Promise.all(detailRequests);

    return pokemonsDetails;
  }
}

const pokeAPI = new PokeAPI();
