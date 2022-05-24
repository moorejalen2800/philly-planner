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
    date_time: String
    outing_name: String!
    created_at: String
    restaurant_name: String
    restaurant_URL: String
    restaurant_time: String
    event_name: String
    event_URL: String
    event_time: String
    event_location: String
  }

  type Query {
    user(name: String ): User
    outings(name: String): [Outing]
    outing(outingId: ID!): Outing
  }

  type Mutation {
    addUser (name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOuting(outing_name: String!, date_time: String!): Outing
    addRestaurantName(
      outingID: ID!
      restaurant_name: String!
      restaurant_URL: String
      restaurant_time: String
    ): Outing
   
    addEventName(
      outingID: ID!
      event_name: String!
      event_URL: String
      event_time: String
      event_location: String
    ): Outing
    
    removeRestaurant(
      outingID: ID!
      restaurant_name: String!
      restaurant_URL: String
      restaurant_time: String
    ): Outing
    removeEvent(
      outingID: ID!
      event_name: String!
      event_URL: String
      event_time: String
      event_location: String
    )
  }

`;

module.exports = typeDefs;

//  addRestaurantURL(
//      outingID: ID!
//      restaurant_URL: String!
//    ): Outing
//    addRestaurantTime(
//      outingID: ID!
//      restaurant_time: String!
//    ): Outing

// addEventURL(
//   outingID: ID!
//   event_URL: String!
// ): Outing
// addEventTime(
//   outingID: ID!
//   event_time: String!
// ): Outing
// addEventLocation(
//   outingID: ID!
//   event_location: String!
// ): Outing