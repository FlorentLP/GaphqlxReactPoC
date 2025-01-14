import { Suspense, useState } from "react";
import { gql } from "./__generated__";
import { useSuspenseQuery } from "@apollo/client";
import PokemonCard from "./PokemonCard.tsx";

// language=GraphQL
const GET_POKEMON_NAMES = gql(`
    query Pokemon_Names_Query{
        pokemons{
            results {
                id
                name
            }
        }
    }`);

const App = () => {
  const { data } = useSuspenseQuery(GET_POKEMON_NAMES);
  const pokemons = data?.pokemons?.results || [];
  const [selectedPokemon, setSelectedPokemon] = useState(pokemons[0]?.name);

  return (
    <>
      {pokemons.length === 0 ? (
        <label>No Pokemons</label>
      ) : (
        <label>
          Pick a Pokemon:
          <select
            name="Pokemon"
            value={selectedPokemon ?? undefined}
            onChange={(e) => setSelectedPokemon(e.target.value)}
          >
            {pokemons.map(
              (pokemon) =>
                pokemon &&
                pokemon.id && (
                  <option key={pokemon.id} value={pokemon.name ?? undefined}>
                    {pokemon.name ?? undefined}
                  </option>
                ),
            )}
          </select>
          <Suspense fallback={<div>Loading Pokemon...</div>}>
            <br />
            <PokemonCard
              pokemonSelectedName={selectedPokemon || ""}
            ></PokemonCard>
          </Suspense>
        </label>
      )}
    </>
  );
};

export default App;
