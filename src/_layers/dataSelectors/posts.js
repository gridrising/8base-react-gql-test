const getList = data => {
  return data?.postsList?.items || [];
};

const getTotalCount = data => {
  return data?.postsList?.count || 0;
};

export const postsSelector = {
  getList,
  getTotalCount,
};
