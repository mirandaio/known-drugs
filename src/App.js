import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import KnownDrugs from './KnownDrugs';



function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline/>
      <KnownDrugs/>
    </ApolloProvider>
  );
}

export default App;
