const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    password: String!
    outings: [Outing]!
  }

  type Outing {
    _id: ID!
    date_time: String
    outing_name: String!
    restaurant_name: String
    restaurant_URL: String
    restaurant_time: String
    event_name: String
    event_URL: String
    event_time: String
    event_location: String
  }

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
