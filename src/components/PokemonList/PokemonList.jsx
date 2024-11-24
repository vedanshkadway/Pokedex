import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, SetIsloading] = useState(true);
  const [pokedexURL,setPokedexURL] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextURL ,setNextURL] = useState('');
  const [prevURL,setPrevURL] = useState('');

  async function downloadPokemon() {
    const response = await axios.get(pokedexURL); //this downloads list of 20 pokemon
    SetIsloading(true);
    console.log(response);
    setPrevURL(response.data.previous);
    setNextURL(response.data.next);
    const pokemonResult = response.data.results; // we get the array of pokemon from resul
    
    const pokemonResultPromise = pokemonResult.map((pokemon) => //array of promises store hoga pokemonResultPromise me
      axios.get(pokemon.url)
    );
    console.log(pokemonResultPromise);
    //Axios.all --> jb saara data download ho jayega tb ye vo array la ke de dega!
    const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon detailed data 
    console.log(pokemonData);

// now iterate on the data of each pokemon and extract id ,name ,image,types.
    const pokelistResults = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id : pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(pokelistResults);
    setPokemonList(pokelistResults);
    SetIsloading(false);
  }

  //synchronouus function hi call back me expect krta h
  //but async bnana h to alag se function bna ke isme call krdo.
  useEffect(() => {
    downloadPokemon();
  }, [pokedexURL]);

  return (
    <div className="pokemon-list-wrapper">
      
      <div className="pokemon-wrapper">

      {(isLoading) ? "Loading..." : 
      pokemonList.map((p)=><Pokemon name = {p.name} image = {p.image} key = {p.id} />)
    }
        </div>
        <div className="controls">
            <button disabled ={prevURL==null} onClick={()=> setPokedexURL(prevURL)}>Prev</button>
            <button disabled ={nextURL==null} onClick={()=> setPokedexURL(nextURL)}>Next</button>
        </div>
    </div>
  );
}
export default PokemonList;
