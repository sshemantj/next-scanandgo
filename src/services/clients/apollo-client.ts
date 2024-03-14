// apollo-client.js
import { GRAPH_BASE_URL } from "@/constants/allEnv";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apollo_Client = new ApolloClient({
  uri: GRAPH_BASE_URL,
  cache: new InMemoryCache(),
});

export default apollo_Client;
