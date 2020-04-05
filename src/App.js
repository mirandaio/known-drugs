import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import client from './client';

function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline/>
    </ApolloProvider>
  );
}

export default App;
