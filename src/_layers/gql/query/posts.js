import { gql } from '@apollo/client';

export const POSTS_LIST_QUERY = gql`
  query PostsList($filter: PostFilter, $first: Int, $skip: Int) {
    postsList(filter: $filter, first: $first, skip: $skip) {
      count
      items {
        id
        createdAt
        title
        thumbnail {
          id
          downloadUrl
        }
      }
    }
  }
`;
