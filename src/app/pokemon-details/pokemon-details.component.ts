import { Component, inject, OnInit } from '@angular/core';
import { PokemonsService } from '../pokemons.service';
import { PokemonDetails } from '../pokemons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  pokemonsService: PokemonsService = inject(PokemonsService);
  pokemonDetails: any;
  pokemonName: string = "";
  moves: { [key: number]: string[] } = {};
  showMoves: any[] = [];
  showGeneration: number = 0;
  moveDetails: { [key: string]: any } = {};

  color: { [key: string]: { background: string, text: string } } = {
    normal: { background: '#A8A77A', text: '#000000' },
    fire: { background: '#EE8130', text: '#000000' },
    water: { background: '#6390F0', text: '#FFFFFF' },
    electric: { background: '#F7D02C', text: '#000000' },
    grass: { background: '#7AC74C', text: '#000000' },
    ice: { background: '#96D9D6', text: '#000000' },
    fighting: { background: '#C22E28', text: '#FFFFFF' },
    poison: { background: '#A33EA1', text: '#FFFFFF' },
    ground: { background: '#E2BF65', text: '#000000' },
    flying: { background: '#A98FF3', text: '#000000' },
    psychic: { background: '#F95587', text: '#FFFFFF' },
    bug: { background: '#A6B91A', text: '#000000' },
    rock: { background: '#B6A136', text: '#000000' },
    ghost: { background: '#735797', text: '#FFFFFF' },
    dragon: { background: '#6F35FC', text: '#FFFFFF' },
    dark: { background: '#705746', text: '#FFFFFF' },
    steel: { background: '#B7B7CE', text: '#000000' },
    fairy: { background: '#D685AD', text: '#000000' },
};

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.pokemonName = String(this.route.snapshot.params['id']);
    
    try {
      this.pokemonDetails = await this.pokemonsService.getDetails(this.pokemonName);
      console.log(this.pokemonDetails);

      for (let i = 0; i < this.pokemonDetails.moves.length; i++) {
        this.moveDetails[this.pokemonDetails.moves[i].move.name] = 
            await this.pokemonsService.getMovesDetails(this.pokemonDetails.moves[i].move.url);
      }
      
    } catch (error) {
      console.error(error);
    }

    console.log(this.moveDetails);
    
    

    // Cargamos los movimientos del pokemon
    this.movimientos();
  }

  capitalizeFirstLetter(string: string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  movimientos()
  {
    for (let i = 0; i < this.pokemonDetails.moves.length; i++) {
      for (let j = 0; j < this.pokemonDetails.moves[i].version_group_details.length; j++) {
        let generation = this.generacion(this.pokemonDetails.moves[i].version_group_details[j].version_group.name);
        
        // Ahora añadimos la clave que sera el numero de la version, si no existe lo añadimos
        if(!this.moves[generation]){
          this.moves[generation] = [];
        }
        
        const moveName = this.pokemonDetails.moves[i].move;
        if (!this.moves[generation].includes(moveName)) {
          this.moves[generation].push(moveName);
        }  
      }
    }

    console.log(this.moves);

    this.mostrarGeneracion(this.getPrimeraGeneracion());
  }
  
  getGeneraciones(): string[]
  {
    return Object.keys(this.moves);
  }

  getPrimeraGeneracion()
  { 
    return Number(this.getGeneraciones()[0]);
  }

  mostrarGeneracion(generacion: number)
  {
    this.showMoves = this.moves[generacion];
    this.showGeneration = generacion;
  }

  setGeneration(generation: number)
  {
    this.mostrarGeneracion(generation);
  }

  generacion(version: string): number
  {
    switch (version) {
      case "red-blue": case "yellow": case "scarlet-violet":
        return 1;
        break;
      case "gold-silver": case  "crystal":
        return 2;
        break;
      case "ruby-sapphire": case "emerald": case "firered-leafgreen": case "colosseum": case "xd":
        return 3;
        break;
      case "diamond-pearl": case "platinum": case "heartgold-soulsilver": case "battle-revolution":
        return 4;
        break;
      case "black-white": case "black-2-white-2":
        return 5;
        break;
      case "x-y": case "omega-ruby-alpha-sapphire":
        return 6;
        break;
      case "sun-moon": case "ultra-sun-ultra-moon": case "lets-go-pikachu-lets-go-eevee":
        return 7;
        break;
      case "sword-shield": case "brilliant-diamond-shining-pearl": case "legends-arceus": case "the-isle-of-armor": case "the-crown-tundra": case "brilliant-diamond-and-shining-pearl":
        return 8;
        break;
      default:
        return 0;
        break;
    }
  }
}
