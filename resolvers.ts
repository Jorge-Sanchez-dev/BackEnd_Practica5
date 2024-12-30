type AbilityResponse = {
  name: string;
  effect_entries: {
    language: { name: string };
    short_effect: string;
  }[];
};

type Ability = {
  name: string;
  effect: string;
};

type MoveResponse = {
  name: string;
  power: number | null;
};

type Move = {
  name: string;
  power: number | null;
};

type PokemonResponse = {
  id: number;
  name: string;
  abilities: {
    ability: { name: string; url: string };
  }[];
  moves: {
    move: { name: string; url: string };
  }[];
};

export const resolvers = {
  Query: {
    async pokemon(
      _: unknown,
      { id, name }: { id?: number; name?: string },
    ): Promise<PokemonResponse | null> {
      const url = id
        ? `https://pokeapi.co/api/v2/pokemon/${id}`
        : `https://pokeapi.co/api/v2/pokemon/${name}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch Pokemon with id/name: ${id || name}`);
        return null;
      }
      return response.json();
    },
  },
  Pokemon: {
    abilities: async (parent: PokemonResponse): Promise<Ability[]> => {
      const abilities = parent.abilities || [];
      return Promise.all(
        abilities.map(async ({ ability }) => {
          const response = await fetch(ability.url);
          if (!response.ok) {
            console.error(`Failed to fetch ability: ${ability.name}`);
            return { name: ability.name, effect: "No effect found" };
          }
          const data: AbilityResponse = await response.json();
          return {
            name: data.name,
            effect:
              data.effect_entries.find(
                (entry) => entry.language.name === "en",
              )?.short_effect || "No effect found",
          };
        }),
      );
    },
    moves: async (parent: PokemonResponse): Promise<Move[]> => {
      const moves = parent.moves || [];
      return Promise.all(
        moves.map(async ({ move }) => {
          try {
            const response = await fetch(move.url);
            if (!response.ok) {
              console.error(`Failed to fetch move: ${move.name}`);
              return { name: move.name, power: null };
            }
            const data: MoveResponse = await response.json();
            return {
              name: data.name,
              power: data.power || null,
            };
          } catch (error) {
            console.error(`Error fetching move: ${move.name}, error`);
            return { name: move.name, power: null };
          }
        }),
      );
    },
  },
};