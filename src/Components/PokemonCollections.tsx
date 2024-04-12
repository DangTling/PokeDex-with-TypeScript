import React from "react";
import { Detail, PokemonDetail } from "../interface";
import PokemonCard from "./PokemonCard";
import "./Pokemon.css";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollections: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;
  const handleSelect = (id: number) => {
    if (!viewDetail.isOpened) {
      setViewDetail({
        id: id,
        isOpened: true,
      });
    }
  };
  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? <div className="overlay"></div> : <></>}
        {pokemons.map((pokemon, idx) => {
          return (
            <div onClick={() => handleSelect(pokemon.id)}>
              <PokemonCard
                key={idx}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                abilities={pokemon.abilities}
                height={pokemon.height}
                weight={pokemon.weight}
                types={pokemon.types}
                viewDetail={viewDetail}
                setViewDetail={setViewDetail}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PokemonCollections;
