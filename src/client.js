import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_API_URL || 'http://localhost:4000'
  }),
  cache: new InMemoryCache()
});

export default client;
