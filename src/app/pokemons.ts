export interface Pokemon {
    name: String,
    url: String
    image?: string
}

export interface PokemonsResponse {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}

export interface PokemonDetails {
    
}
