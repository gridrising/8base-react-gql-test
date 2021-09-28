import { gql } from '@apollo/client';

export const TAGS_LIST_QUERY = gql`
  query TagsList {
    tagsList {
      count
      items {
        id
        name
      }
    }
  }
`;
