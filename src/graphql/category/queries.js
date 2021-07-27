import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    categories {
      id
      name
      registered_date
    }
  }
`;
