const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    outings: [Outing]!
  }

  type Outing {
    _id: ID!
    dateTime: String
    outingName: String!
    outingCreator: String!
    createdAt: String
    restaurants: [Restaurant]!
  }

  type Restaurant {
    _id: ID!
    restaurantName: String!
    restaurantURL: String
    restaurantLocation: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(name: String ): User
    outings(name: String): [Outing]
    outing(outingName: String!): Outing
  }

  type Mutation {
    addUser (name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOuting(dateTime: String!, outingName: String!, outingCreator: String!): Outing

    addRestaurant(
      outingID: ID!
      restaurantName: String!
      restaurantURL: String
      restaurantLocation: String
    ): Outing
   
    removeOuting(outingId: ID!): Outing

    removeRestaurant(
      outingID: ID!
      restaurantID: ID!
    ): Outing
   
  }

`;

module.exports = typeDefs;

