
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    // event listner that ennacts showDetails function
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    })


  }
 
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

   // logs the name of the pokemon of the button that is clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };

})();

// document.write("Pokédex ");

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});