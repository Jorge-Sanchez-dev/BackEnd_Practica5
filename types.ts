export type AbilityResponse = {
    name: string;
    effect_entries: {
      language: { name: string };
      short_effect: string;
    }[];
  };
  
  export  type Ability = {
    name: string;
    effect: string;
  };
  
  export type MoveResponse = {
    name: string;
    power: number | null;
  };
  
  export type Move = {
    name: string;
    power: number | null;
  };
  
  export type PokemonResponse = {
    id: number;
    name: string;
    abilities: {
      ability: { name: string; url: string };
    }[];
    moves: {
      move: { name: string; url: string };
    }[];
  };