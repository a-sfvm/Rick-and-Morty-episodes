import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Search from "./components/Search";

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <h1>Rick & Morty Episodes</h1>
    <Search />
  </ApolloProvider>
);

export default App;
