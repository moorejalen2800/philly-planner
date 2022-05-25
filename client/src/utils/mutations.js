import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_OUTING = gql`
  mutation addOuting($outing_name: String!, $date_time: String!) {
    addOuting(outing_name: $outing_name, date_time: $date_time) {
      _id
      date_time
      outing_name
      created_at
      restaurant_name
      restaurant_URL
      restaurant_time
      restaurant_location
    }
  }
`;

export const ADD_RESTAURANT = gql`
  mutation addRestaurant(
    $outingID: ID!
    $restaurant_name: String!
    $restaurant_URL: String
    $restaurant_time: String
  ) {
    addRestaurant(
      outingID: $outingId
      restaurant_name: $restaurant_name
      restaurant_URL: $restaurant_URL
      restaurant_time: $restaurant_time
    ) {
      _id
      date_time
      outing_name
      created_at
      restaurant_name
      restaurant_URL
      restaurant_time
      restaurant_location
    }
  }
`;


