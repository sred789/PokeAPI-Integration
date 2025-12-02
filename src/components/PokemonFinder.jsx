import { useState, useEffect } from "react";

function PokemonFinder({ search }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) {
      setPokemonData(null);
      return;
    }

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
  }, [search]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!pokemonData) return null;

  return (
    <div className="card bg-secondary text-light p-3 shadow mx-auto w-100">
      <h2 className="text-center text-capitalize mb-3">{pokemonData.name}</h2>

      <div className="text-center">
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
          className="mb-3"
        />
      </div>

      <p>
        <strong>Height:</strong> {pokemonData.height}
      </p>
      <p>
        <strong>Weight:</strong> {pokemonData.weight}
      </p>

      <h4 className="mt-3">Stats</h4>

      {pokemonData.stats.map((stat) => (
        <div key={stat.stat.name} className="mb-2">
          <strong className="text-capitalize">
            {stat.stat.name}: {stat.base_stat}
          </strong>

          <div className="progress" style={{ height: "10px" }}>
            <div
              className="
                progress-bar
                bg-info
              "
              role="progressbar"
              style={{ width: `${stat.base_stat}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonFinder;
