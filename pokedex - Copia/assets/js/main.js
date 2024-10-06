const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 12
let offset = 0

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <div class="img-container">
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                    </div>
                </li>
            `).join('');
            pokemonList.innerHTML += newHtml;
        });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdeRecordsNextPage = offset + limit;

    if (qtdeRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});

pokemonList.addEventListener('click', function (event) {
    const pokemonItem = event.target.closest('.pokemon');

    if (pokemonItem) {
        const pokemonId = pokemonItem.querySelector('.number').textContent.slice(1);
        window.location.href = `./pokemon.html?id=${pokemonId}`;
    }
});
