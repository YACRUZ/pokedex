//Se definen las constantes 
const pokemonCard = document.querySelector("#pokemon-card");
const pokemonCardSolo = document.querySelector("#pokemon-card-solo");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

//Bucle de todos los pokemon 
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => pokemonList(data))
}

//Funcion de busqueda de informacion de todos los pokemon
function pokemonList(pokedex) {

    let habilidades = pokedex.abilities.map((abilities) => `<p class="hability">${abilities.ability.name}</p>`);
    habilidades = habilidades.join('');

    let pokedexId = pokedex.id.toString();
    if (pokedexId.length === 1) {
        pokedexId = "00" + pokedexId;
    } else if (pokedexId.length === 2) {
        pokedexId = "0" + pokedexId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
                <div class="pokemon-image">
                    <img src="${pokedex.sprites.other["official-artwork"].front_default}" alt="${pokedex.name}"
                        alt="${pokedex.name}">
                </div>
                <div class="pokemon-info">
                    <div class="pokemon-header">
                        <p class="pokemon-id">#${pokedexId}</p>
                        <h2 class="pokemon-name">${pokedex.name}</h2>
                    </div>
                    <div class="title-card">Habilidades</div>
                    <div class="pokemon-habilities">
                        ${habilidades}
                    </div>
                </div>
    `;
    pokemonCard.append(div);
}

//Busqueda por nombre o id de pokemon
document.addEventListener("keyup", e => {
    e.target.matches("#pokemon-search")
    pokemonName=e.target.value

    pokemonCard.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if(pokemonName == data.name){
                    pokemonCardSolo.innerHTML = "";
                    pokemonSolo(data);
                }else if(parseInt(pokemonName) == data.id){
                    pokemonCardSolo.innerHTML = "";
                    pokemonSolo(data);
                }
            })
    }
})

//Funcion de busqueda de informacion del pokemon encontrado
function pokemonSolo(pokedex) {

    let tipos = pokedex.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokedexId = pokedex.id.toString();
    if (pokedexId.length === 1) {
        pokedexId = "00" + pokedexId;
    } else if (pokedexId.length === 2) {
        pokedexId = "0" + pokedexId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon-solo");
    div.innerHTML = `
                <div class="pokemon-image-solo">
                    <img src="${pokedex.sprites.other.home.front_default}" alt="${pokedex.name}"
                        alt="${pokedex.name}">
                </div>
                <div class="pokemon-info">
                    <div class="pokemon-header-solo">
                        <p class="pokemon-id">#${pokedexId}</p>
                        <h2 class="pokemon-name">${pokedex.name}</h2>
                    </div>
                </div>
                <div class="pokemon-info-solo-1">
                    <div class="title-card half-card-solo"> Tipo
                    ${tipos}
                    </div>
                </div>
                <div class="pokemon-info-solo-2">
                    <div class="pokemon-stats">
                        <div class="title-card">Altura</div>
                        <p class="stat"> ${pokedex.height}m</p>
                        <div class="title-card">Peso</div>
                        <p class="stat">${pokedex.weight}kg</p>
                    </div>
                </div>
                <br><br><br><br><br>
                <div class="pokemon-info-solo-3">
                <div class="title-card">Voz</div>
                <button class="pokemon-voice" id="${pokedex.name}-voice">🔊 Play</button>
                </div>  
    `;
    pokemonCardSolo.append(div);

    const soundButton = div.querySelector(`#${pokedex.name}-voice`);
    soundButton.addEventListener("click", () => {
        const audio = new Audio(pokedex.cries.latest);
        audio.play();
    });
}

//Busqueda de pokemon por tipo
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    
    pokemonCard.innerHTML = "";
    pokemonCardSolo.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    pokemonList(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        pokemonList(data);
                    }
                }

            })
    }
}))