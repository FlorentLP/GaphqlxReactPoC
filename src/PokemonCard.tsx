import { useSuspenseQuery } from "@apollo/client";
import { gql } from "./__generated__";

interface PokemonSelectedNameProps {
  pokemonSelectedName: string;
}

// language=GraphQL
const GET_NAME_POKEMON = gql(`
    query Pokemon_Name_Query($name: String!){
        pokemon(name: $name) {
            id
            name
            types{
                type{
                    name
                }
            }
            sprites{
                front_default
            }
        }
    }`);

const PokemonCard = ({ pokemonSelectedName }: PokemonSelectedNameProps) => {
  const { data } = useSuspenseQuery(GET_NAME_POKEMON, {
    variables: { name: pokemonSelectedName },
  });

  const pokemon = data?.pokemon;

  return (
    <>
      {!pokemon ? (
        <h2>Failed to fetch {pokemonSelectedName} data</h2>
      ) : (
        <>
          <img
            src={pokemon?.sprites?.front_default ?? undefined}
            alt={pokemon?.name ?? undefined}
            className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              {pokemonSelectedName}
            </h2>
            <p className="text-gray-500">#ID: {pokemon?.id}</p>
            <p className="text-gray-500">
              #Types:{" "}
              {pokemon?.types?.map((typeObj) => typeObj?.type?.name + " ")}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default PokemonCard;
