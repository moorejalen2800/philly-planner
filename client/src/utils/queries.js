import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($name: String) {
    user(name: $name) {
      _id
      name
      email
      outings {
        _id
        dateTime
        outingName
      }
    }
  }
`;

export const QUERY_OUTINGS = gql`
  query getOutings {
    outings {
      _id
      dateTime
      outingName
      outingCreator
      createdAt
    }
  }  
`;

export const QUERY_OUTING = gql`
  query getSingleOuting($outingId: String!) {
    outing(outingId: $outingId) {
      _id
      dateTime
      outingName
      outingCreator
      restaurants {
        _id
        restaurantName
        restaurantURL
        restaurantLocation
      }
    }
  }
`;
