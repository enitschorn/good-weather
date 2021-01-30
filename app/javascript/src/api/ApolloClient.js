import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const xCsrfToken = () => {
  const match = /<meta name="csrf-token" content="(.*)">/.exec(
    document.head.innerHTML,
  );
  return match && match[1];
};

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    'X-CSRF-Token': xCsrfToken(),
    // AUTHORIZATION: `Token ${process.env.GRAPHQL_API_KEY}`,
    ...headers,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
