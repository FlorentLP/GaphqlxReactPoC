import { gql } from "./__generated__";
import { useSuspenseQuery } from "@apollo/client";

// language=GraphQL
const GET_POKEMON_LIST = gql(`
    query Pokemon_Query{
        pokemons(limit: 10) {
            results {
                id
                name
                image
            }
        }
    }`);

const PokemonList = () => {
  const { data } = useSuspenseQuery(GET_POKEMON_LIST);

  const pokemonList = data?.pokemons?.results || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Liste des Pokémons
      </h1>
      {pokemonList.length === 0 ? (
        <p className="text-center text-gray-500">No Pokémon available.</p>
      ) : (
        <ul className="space-y-4 max-w-4xl mx-auto">
          {pokemonList.map(
            (pokemon) =>
              pokemon &&
              pokemon.id && (
                <li
                  key={pokemon.id}
                  className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow"
                >
                  <img
                    src={pokemon.image ?? undefined}
                    alt={pokemon.name ?? undefined}
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700">
                      {pokemon.name}
                    </h2>
                    <p className="text-gray-500">#ID: {pokemon.id}</p>
                  </div>
                </li>
              ),
          )}
        </ul>
      )}
    </div>
  );
};

export default PokemonList;
