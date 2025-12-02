import { useState, useEffect } from "react";

function PokemonFinder({ search }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showShiny, setShowShiny] = useState(false);

  useEffect(() => {
    if (!search) {
      setPokemonData(null);
      return;
    }
    const searchDelay = setTimeout(() => {
      const fetchPokemon = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
          );

          if (!response.ok) {
            throw new Error("Pokémon not found");
          }

          const data = await response.json();
          setPokemonData(data);
        } catch (err) {
          setError(err.message);
          setPokemonData(null);
        } finally {
          setLoading(false);
        }
      };

      fetchPokemon();
    }, 500);

    return () => clearTimeout(searchDelay);
  }, [search]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!pokemonData) return null;

  return (
    <div className="card bg-secondary text-light p-3 shadow mx-auto w-100">
      <h2 className="text-center text-capitalize mb-3">{pokemonData.name}</h2>

      <div className="text-center">
        <img
          src={
            showShiny
              ? pokemonData.sprites.front_shiny
              : pokemonData.sprites.front_default
          }
          alt={pokemonData.name}
          style={{ width: "150px" }}
        />
      </div>

      <div className="d-flex justify-content-center my-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="shinyToggle"
            checked={showShiny}
            onChange={() => setShowShiny(!showShiny)}
          />
          <label className="form-check-label" htmlFor="shinyToggle">
            {showShiny ? "Shiny" : "Normal"}
          </label>
        </div>
      </div>

      <p>
        <strong>Pokedex ID:</strong> {pokemonData.id}
      </p>
      <p>
        <strong>Types:</strong>{" "}
        {pokemonData.types
          .map(
            (t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
          )
          .join(", ")}
      </p>

      <h4 className="mt-3">Stats</h4>

      {pokemonData.stats.map((stat) => {
        const statPercent = (stat.base_stat / 255) * 100;

        return (
          <div key={stat.stat.name} className="mb-2">
            <strong className="text-capitalize">
              {stat.stat.name}: {stat.base_stat}
            </strong>

            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: `${statPercent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonFinder;
