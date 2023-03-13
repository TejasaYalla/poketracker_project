import React from "react";
import { pokemonData } from "./data/pokemon";
import { FilteredPokemonList } from "./FilteredPokemonList";
import "./styles/pokelist.css";
import { useState, useEffect } from "react";

type resultProps = any;

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
  caught: boolean | null;
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
  caughtClick: () => void;
}

export default class PokemonListContainer extends React.Component<
  Props,
  State
> {
  state = { value: "", filteredList: [], type1: "", type2: "", caught: 0 };

  showFilteredList() {
    let pokemonListString = localStorage.getItem("pokemon_list");
    let pokemonList: Pokemon[] = [];
    let caught = 0;
    if (pokemonListString) {
      pokemonList = JSON.parse(pokemonListString);
    } else {
      pokemonList = pokemonData;
    }

    const filtered = pokemonList.filter((entry) => {
      var filter = true;
      if (this.state.value != "") {
        filter = entry.name.startsWith(this.state.value);
      }
      if (this.state.type1 != "") {
        filter = filter && entry.type_1 == this.state.type1;
      }
      if (this.state.type2 != "") {
        filter = filter && entry.type_2 == this.state.type2;
      }
      if (filter && entry.caught) {
        caught += 1;
      }

      return filter;
    });

    this.setState({ filteredList: filtered, caught: caught });
  }

  fetchPokemonData() {
    let params: any = {
      type1: this.state.type1,
      type2: this.state.type2,
      filter_name: "",
      dex_number: "",
    };
    if (Number.isInteger(parseInt(this.state.value))) {
      params["dex_number"] = this.state.value;
    } else {
      params["filter_name"] = this.state.value;
    }

    const options = {
      method: "POST",
      body: JSON.stringify(params),
    };
    const api = async () => {
      const data = await fetch(
        "http://localhost:3001/pokelist/?filter_name=" +
          params.filter_name +
          "&dex_number=" +
          params.dex_number +
          "&type_1=" +
          params.type1 +
          "&type_2=" +
          params.type2 +
          "&user_id=1",
        options
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.setState({ filteredList: result },()=>{
            this.calculateCaught()
          });
          
        });
    };
    api();
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ value: e.currentTarget.value }, () => {
      this.fetchPokemonData();
    });
    // this.setState({ calculatedcount : calculator });
  };

  handleTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ): void => {
    if (type == "type1") {
      this.setState({ type1: e.currentTarget.value }, () => {
        this.fetchPokemonData();
      });
    } else {
      if (type == "type2") {
        this.setState({ type2: e.currentTarget.value }, () => {
          this.fetchPokemonData();
        });
      }
    }
  };

  handleCaught = (
    e: React.ChangeEvent<HTMLButtonElement>,
    id: number
  ): void => {
    let pokemonListString = localStorage.getItem("pokemon_list");
    let pokemonList: Pokemon[] = [];
    let caught = 0;
    if (pokemonListString) {
      pokemonList = JSON.parse(pokemonListString);
    } else {
      pokemonList = pokemonData;
    }
    let pokeIndex = pokemonList.findIndex((obj) => obj.dex_number == id);
    pokemonList[pokeIndex]["caught"] = !pokemonList[pokeIndex]["caught"];

    localStorage.setItem("pokemon_list", JSON.stringify(pokemonList));
    this.showFilteredList();
  };

  handleCaughtAPI = (
    e: React.ChangeEvent<HTMLButtonElement>,
    id: number
  ): void => {



    const options = {
      method: "PUT",
      body: JSON.stringify({}),
    };
    let pokeIndex = this.state.filteredList.findIndex((obj:any) => obj.dex_number == id);
    let pokeList:Pokemon[] = this.state.filteredList
    pokeList[pokeIndex]["caught"] = !pokeList[pokeIndex]["caught"]
    
    const api = async () => {
      const data = await fetch(
        "http://localhost:3001/catch/?&dex_number="+id+"&caught="+pokeList[pokeIndex]["caught"],
        options
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.setState({filteredList:pokeList},()=>{
            this.calculateCaught()
          })
        });
    };
    api();
  };

  calculateCaught=():void=>{
    let caught = 0
    this.state.filteredList.map((entry:any)=>{
      if(entry.caught){
        caught+=1
      }
    })
    this.setState({caught:caught})
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
            <select
              onChange={(e) => this.handleTypeChange(e, "type2")}
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
        </div>

        {this.state.caught != 0 && (
          <p>
            You have caught <strong>{this.state.caught}</strong> out of{" "}
            <strong>{this.state.filteredList.length}</strong>, or{" "}
            <strong>
              ~{(this.state.caught * 100) / this.state.filteredList.length}%
            </strong>
          </p>
        )}
        <FilteredPokemonList
          filteredList={this.state.filteredList}
          caughtClick={this.handleCaughtAPI}
        />
      </div>
    );
  }
}
