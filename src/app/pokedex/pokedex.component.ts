import { Component, inject } from '@angular/core';
import { Pokemon } from '../pokemons';
import { PokemonsService } from '../pokemons.service';
import { PokemonComponent } from '../pokemon/pokemon.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [PokemonComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  pokemonsList: Pokemon[] = [];
  pokemonsService: PokemonsService = inject(PokemonsService);
  page = 0;

  constructor() 
  {
    this.getPokemons()
  }

  // Obtenemos los pokemons con la interfaz
  async getPokemons()
  {
    this.pokemonsList = (await this.pokemonsService.getPokemons(this.page * 12)).results;
    
    this.pokemonsList.forEach(async pokemon => {
      const image = await this.pokemonsService.getImage(String(pokemon.url));
      pokemon.image = image
    });
  }

  pageFw()
  {
    this.page++;
    this.getPokemons();
  }

  pageBck()
  {
    this.page--;
    this.getPokemons();
  }
}
