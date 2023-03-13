import React from "react";
import { pokemonData } from "./data/pokemon";
import { FilteredPokemonList } from "./FilteredPokemonList";
import "./styles/pokelist.css";

type Props = {};
type State = {
  value: string;
  filteredList: Pokemon[];
  caught: number;
  type1: string;
  type2: string;
};
interface Pokemon {
  name: string;
  dex_number: number;
  type_1: string;
  type_2: string | null;
  image_url: string;
  caught:boolean|null;
}

const poketypes = [
  "bug",
  "electric",
  "fire",
  "grass",
  "normal",
  "rock",
  "dark",
  "fairy",
  "flying",
  "ground",
  "poison",
  "steel",
  "dragon",
  "fighting",
  "ghost",
  "ice",
  "psychic",
  "water",
];

interface PokeProps {
  filteredList: Pokemon[];
  caughtClick:()=>void;
}

export default class PokemonListContainer extends React.Component<
  Props,
  State
> {
  state = { value: "",  filteredList: [], type1: "", type2: "", caught: 0 };

  showFilteredList() {

    let pokemonListString = localStorage.getItem('pokemon_list')
    let pokemonList:Pokemon[] = []
    let caught= 0
    if (pokemonListString){
      pokemonList = JSON.parse(pokemonListString)
    }else{
      pokemonList = pokemonData
    }
    
    const filtered = pokemonList.filter((entry) => {
      var filter = true
      if (Number.isInteger(parseInt(this.state.value))){
        filter = filter &&(entry.dex_number ==parseInt(this.state.value))
      }else{
      if(this.state.value!=""){
        filter = entry.name.startsWith(this.state.value)
      }
    }
      if(this.state.type1!=""){
        filter = filter && (entry.type_1 == this.state.type1)
      }
      if (this.state.type2!=""){
        filter = filter && (entry.type_2 == this.state.type2)
      }
      if (filter && entry.caught){
        caught+=1

      }

      return filter
    });

    this.setState({ filteredList: filtered , caught: caught});
  }


  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ value: e.currentTarget.value }, () => {
      this.showFilteredList();
    });
    // this.setState({ calculatedcount : calculator });
  };

  handleTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ): void => {
    if (type == "type1") {
      this.setState({ type1: e.currentTarget.value }, () => {
        this.showFilteredList();
      });
    } else {
      if (type == "type2") {
        this.setState({ type2: e.currentTarget.value }, () => {
          this.showFilteredList();
        });
      }
    }
  };
  

  handleCaught=(e:React.ChangeEvent<HTMLButtonElement>,id:number):void=>{
    
    let pokemonListString = localStorage.getItem('pokemon_list')
    let pokemonList:Pokemon[] = []
    let caught= 0
    if (pokemonListString){
      pokemonList = JSON.parse(pokemonListString)
    }else{
      pokemonList = pokemonData
    }
    let pokeIndex = pokemonList.findIndex((obj=>obj.dex_number==id))
    pokemonList[pokeIndex]["caught"] = !(pokemonList[pokeIndex]["caught"])

    localStorage.setItem('pokemon_list', JSON.stringify(pokemonList));
    this.showFilteredList()
  }

  render() {
    return (
      <div>
        <div className="container-parent">
          <div className="filter-search">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pokemon-list-filter"
            >
              Filter By Name or PokeDex Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pokemon-list-filter"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Enter name or PokeDex Number..."
            />
          </div>
          <div className="search-type1">
            <select
              onChange={(e) => this.handleTypeChange(e, "type1")}
              className="type-select w-full text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            >
              <option value="" selected>
                Any
              </option>
              {poketypes.map((poketype) => {
                return <option className="type-option">{poketype}</option>;
              })}
            </select>
          </div>

          <div className="search-type2">
            <select onChange={(e) => this.handleTypeChange(e, "type2")} className="type-select w-full text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
              <option value="" selected>
                Any
              </option>
              {poketypes.map((poketype) => {
                return <option className="type-option">{poketype}</option>;
              })}
            </select>
          </div>
        </div>

        {this.state.caught!= 0 && (
          <p>
            You have caught <strong>{this.state.caught}</strong> out of{" "}
            <strong>{this.state.filteredList.length}</strong>, or{" "}
            <strong>~{(this.state.caught* 100) / this.state.filteredList.length}%</strong>
          </p>
        )}
        <FilteredPokemonList filteredList={this.state.filteredList} caughtClick = {this.handleCaught}/>
      </div>
    );
  }
}
