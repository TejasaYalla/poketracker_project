import React from "react";
import "./styles/pokelist.css";
import types from "./styles/pokemon-types.module.css";
import PokeBallIcon from "./PokeBallIcon";
import PokeBallColor from "./PokeBallColor";


interface Pokemon {
    name: string;
    dex_number: number;
    type_1: string;
    type_2: string | null;
    image_url: string;
    caught:boolean|null
  }

  interface PokeProps {
    filteredList: Pokemon[];
    caughtClick:any;
  }

  const Pokecard: React.FC<{ poke: Pokemon, caughtClick:any}> = ({ poke,caughtClick }) => {
    return (
      <div className={(poke.caught?"pokecard caught":"pokecard")}>
        <div className ="pokeball" onClick={(e)=>caughtClick(e, poke.dex_number)}>{poke.caught?<PokeBallColor/>:<PokeBallIcon/>}</div>
        <div className="poke-details">
        <div className="poke-name">{poke.name}</div>
        <div className="poke-num">#{poke.dex_number}</div>
        <div className="poke-image" >
          <img src={poke.image_url} />
        </div>
        <div className="poke-type">
          <div className={types["type-icon"] + " " + types[poke.type_1]}></div>
          {poke.type_2 && (
            <div className={types["type-icon"] + " " + types[poke.type_2]}></div>
          )}
        </div>
      </div>
      <div>
        <div>
        
        </div>


      </div>
      </div>
    );
  };



  export const FilteredPokemonList :React.FC<PokeProps>=(props)=>{
    return (<div className="pokelist">
    {props.filteredList.length != 0 &&
      props.filteredList.map((poke) => {
        return <Pokecard key={poke.dex_number} poke={poke} caughtClick = {props.caughtClick}/>;
      })}
  </div>)
  }