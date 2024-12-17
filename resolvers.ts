export const resolvers = {
    Query: {
      async pokemon(_: any, { id, name }: { id?: number; name?: string }) {
        const url = id
          ? `https://pokeapi.co/api/v2/pokemon/${id}`
          : `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = await fetch(url);
        return response.json();
      },
    },
    Pokemon: {
      abilities: async (parent: any) => {
        const abilities = parent.abilities || [];
        return Promise.all(
          abilities.map(async (ability: any) => {
            const response = await fetch(ability.ability.url);
            const data = await response.json();
            return {
              name: data.name,
              effect: data.effect_entries.find(
                (entry: any) => entry.language.name === "en",
              )?.short_effect || "No effect found",
            };
          }),
        );
      },
      moves: async (parent: any) => {
        const moves = parent.moves || [];
        return moves.map((move: any) => ({
          name: move.move.name,
          power: move.version_group_details[0]?.power || null,
        }));
      },
    },
  };