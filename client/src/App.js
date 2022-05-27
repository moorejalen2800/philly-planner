import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  createHttpLink,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import Dinner from "./pages/Components/dinner";
import { setContext } from "@apollo/client/link/context";
// import NavBar from "./pages/Components/navbar";
import Display from "./pages/Components/display";
import Cal from "./pages/Components/calendar";
import Home from "./pages/Components/homepage";
import Create from "./pages/Components/create";
import Login from "./pages/Components/Login";
import Signup from "./pages/Components/Signup";
import Outing from "./pages/Components/outing";

const httpLink = createHttpLink({
  uri: `/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <NavBar /> */}
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/calendar" element={<Cal />} />
            <Route path="/dinner" element={<Dinner />} />
            <Route path="/display" element={<Display />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/outing" element={<Outing />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
