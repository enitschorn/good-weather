import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
