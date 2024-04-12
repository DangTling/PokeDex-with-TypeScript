import React, { useEffect, useState } from "react";
import { Detail } from "../interface";

interface Props {
  id: number;
  name: string;
  image: string;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  height: number | undefined;
  weight: number | undefined;
  types:
    | {
        type: string;
      }[]
    | undefined;
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCard: React.FC<Props> = (props) => {
  const {
    name,
    id,
    image,
    abilities,
    height,
    weight,
    types,
    viewDetail,
    setViewDetail,
  } = props;
  const [IsSelected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(id === viewDetail.id);
  }, [viewDetail]);
  const handleClose = () => {
    setViewDetail({
      id: 0,
      isOpened: false,
    });
  };
  return (
    <div>
      {IsSelected ? (
        <div className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={handleClose}>
              X
            </p>
            <div className="detail-info">
              <img
                src={image}
                className="pokemon-img"
                alt={`image of ${name}`}
              />
              <p className="pokemon-name-detail">{name}</p>
            </div>
            <div className="detail-types">
              {types?.map((type: any) => {
                return (
                  <p className={`label label-${type.type.name}`}>
                    {type.type.name}
                  </p>
                );
              })}
            </div>
            <div className="detail-size">
              <p className="pokemon-height">
                Height: {height ? height / 10 : undefined}m
              </p>
              <p className="pokemon-weight">
                Weight: {weight ? weight / 10 : undefined}kg
              </p>
            </div>
            <div className="detail-skill">
              <div className="detail-ability">Abilities:</div>

              {abilities?.map((ab: any) => {
                return <p> {ab.ability.name},</p>;
              })}
            </div>
          </div>
        </div>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt={`image of ${name}`} />
        </section>
      )}
    </div>
  );
};

export default PokemonCard;
