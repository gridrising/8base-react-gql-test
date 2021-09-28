import { useQuery } from '@apollo/client';

import { POSTS_LIST_QUERY } from '../query';

export const usePostsList = options => {
  return useQuery(POSTS_LIST_QUERY, options);
};
