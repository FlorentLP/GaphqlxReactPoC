import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const pokemonClient = new ApolloClient({
    link: new HttpLink({
        uri: 'https://graphql-pokeapi.graphcdn.app/',
    }),
    cache: new InMemoryCache(),
});

export default pokemonClient;
