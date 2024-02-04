const pokemonListElement = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMore");
const limit = 10;
let offset = 0;
const maxRecords = 151;

function convertPokemonToLi(pokemon) {
  return `
        <li  class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <span class="weight" class="dark-mode">${
              pokemon.weight / 10
            } kg</span>
            <span class="height" class="dark-mode">${
              pokemon.height / 10
            } m</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join(" ")}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
        </li>`;
}

function appendPokemonListToDOM(pokemons) {
  const newHTML = pokemons.map(convertPokemonToLi).join("");
  pokemonListElement.innerHTML += newHTML;
}

// adiciona a lista de pokemons ao DOM 'pokemonListElement'
// convertPokemontoLi converte os pokemons para HTML

function handleRequestCompletion() {
  console.log("Requisição concluída");
}

function loadPokemonsAndUpdateDOM(offset, limit) {
  pokeAPI
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      appendPokemonListToDOM(pokemons);
    })
    .finally(handleRequestCompletion);
}

function loadInitialPokemonItems() {
  loadPokemonsAndUpdateDOM(offset, limit);
}

function handleLoadMoreButtonClick() {
  offset += limit;
  const remainingRecords = maxRecords - offset;
  const newLimit = remainingRecords < limit ? remainingRecords : limit;

  if (remainingRecords <= 0) {
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }

  loadPokemonsAndUpdateDOM(offset, newLimit);
}

// Inicializar a lista de Pokémon
loadInitialPokemonItems();

// Adicionar evento de clique para o botão "Load More"
loadMoreButton.addEventListener("click", handleLoadMoreButtonClick);
