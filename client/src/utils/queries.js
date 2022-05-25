import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($name: String) {
    user {
      _id
      name
      email
      outings {
        _id
        date_time
        outing_name
        restaurant_name
        restaurant_URL
        restaurant_time
        restaurant_location
      }
    }
  }
`;

export const QUERY_OUTINGS = gql`
  query getOutings {
    outings {
      _id
      date_time
      outing_name
      restaurant_name
      restaurant_URL
      restaurant_time
      restaurant_location
    }
  }  
`;

export const QUERY_OUTING = gql`
  query getSingleOuting($outingId: ID!) {
    outing(outingId: $outingId) {
      _id
      date_time
      outing_name
      restaurant_name
      restaurant_URL
      restaurant_time
      restaurant_location
    }
  }
`;
