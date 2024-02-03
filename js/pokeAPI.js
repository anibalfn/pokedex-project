class PokeAPI {
    async convertAPIdetailToPokemon(pokeDetail) {
      const pokemon = new Pokemon();
      pokemon.name = pokeDetail.name;
      pokemon.number = pokeDetail.id;
      pokemon.image = pokeDetail.sprites.other.dream_world.front_default;
      pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
      pokemon.type = pokemon.types[0];
      return pokemon;
    }
  
    // método async que recebe um objeto chamado pokeDetail, os detalhes da pokeAPI
    // Uma nova classe Pokémon é instanciada e as props são preenchidas conforme o recebido em pokeDetail
    // retorna o objeto restante
  
    async getPokemonDetail(pokemon) {
      const response = await fetch(pokemon.url);
      const pokeDetail = await response.json();
      return this.convertAPIdetailToPokemon(pokeDetail);
    }
  
    // asyc getPokemonDetail recebe o obj pokemon, faz requisição async via fetch da url fornecida em pokemon
    // transforma a resposta em json e chama método convertAPI... para modificar os detalhes de acordo com o obj Pokemon
  
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
  
  // offset = deslocamento; limit = limite da recuperação
  // requisição async usando fetch e convertendo a resposta em json, extrai os resultados
  // Promise.all aguarda a resolução de todas as promises, retornando a lista de detalhes
  
  const pokeAPI = new PokeAPI();
  
  // abstração para interagir de forma async e modular
  