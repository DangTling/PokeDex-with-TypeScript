import React, { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import PokemonCollections from "./Components/PokemonCollections";
import { Detail, Pokemon } from "./interface";

interface PokeData {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: PokeData) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: PokeData) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
    setTimeout(() => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollections
          pokemons={pokemons}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        {!viewDetail.isOpened && (
          <div className={`btn ${loading ? "btn-none" : ""}`}>
            <button onClick={handleLoadMore}>
              {loading ? "Loading ... " : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
