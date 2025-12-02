import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PokemonFinder from "./components/PokemonFinder";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h1 className="text-center mb-4">Pokémon Finder</h1>

            <input
              type="text"
              placeholder="Enter Pokémon name or ID"
              className="form-control mb-4 text-center"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <PokemonFinder search={search} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
