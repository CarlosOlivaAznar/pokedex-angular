import { Injectable } from '@angular/core';
import { Pokemon, PokemonDetails, PokemonsResponse } from './pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  url = "https://pokeapi.co/api/v2/pokemon?limit=12&offset="
  urlDetails = "https://pokeapi.co/api/v2/pokemon/";

  constructor() { }

  async getPokemons(offset: Number): Promise<PokemonsResponse>
  {
    const data = await fetch(this.url + offset);
    return await data.json() ?? [];
  }

  async getImage(urlPokemon: string): Promise<string>
  {
    const data = await fetch(urlPokemon);
    const pokemonData = await data.json() ?? [];

    return pokemonData.sprites.other['official-artwork'].front_default;
  }

  async getDetails(pokemonName: string): Promise<PokemonDetails>
  {
    const data = await fetch(this.urlDetails + pokemonName);
    return await data.json() ?? [];
  }

  async getMovesDetails(urlMove: string): Promise<any>
  {
    const data = await fetch(urlMove);
    return await data.json() ?? [];
  }
}
