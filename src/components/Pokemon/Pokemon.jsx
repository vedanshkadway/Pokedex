import "./Pokemon.css";
function Pokemon({ name, image }) {
  return (
    <div className="pokemonClass">
      <div><h2>{name}</h2></div>
      <div>
        <img className = 'pokemon-image' src={image} alt="pokemon_image" />
      </div>
    </div>
  );
}

export default Pokemon;
