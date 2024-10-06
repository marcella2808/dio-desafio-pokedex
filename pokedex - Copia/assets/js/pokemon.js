const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

if (pokemonId) {
    pokeApi.getPokemonById(pokemonId)
        .then((pokemon) => {
            document.body.classList.add(pokemon.type);

            document.getElementById('pokemonName').textContent = pokemon.name;
            document.getElementById('pokemonNumber').textContent = `#${pokemon.number}`;
            
            const typesHtml = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
            document.getElementById('pokemonTypes').innerHTML = typesHtml;

            document.getElementById('pokemonImage').src = pokemon.photo;
            document.getElementById('pokemonImage').alt = pokemon.name;

            document.getElementById('pokemonHeight').textContent = `${pokemon.height} cm`;
            document.getElementById('pokemonWeight').textContent = `${pokemon.weight} kg`;
            document.getElementById('pokemonAbilities').textContent = pokemon.abilities.join(', ');
        })
        .catch((error) => {
            console.error("Error fetching Pokémon details:", error);
        });
}
