import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  @Input() pokemon!:Pokemon;
}
