export const schema = `#graphql
  type Query {
    pokemon(id: Int, name: String): Pokemon
  }

  type Pokemon {
    id: Int
    name: String
    abilities: [Ability]
    moves: [Move]
  }

  type Ability {
    name: String
    effect: String
  }

  type Move {
    name: String
    power: Int
  }
`;