const getList = data => {
  return data?.tagsList?.items || [];
};

const getListWithoutId = data => {
  return data?.tagsList.items.map(tag => tag.name) || [];
};

const getTotalCount = data => {
  return data?.tagsList?.count || 0;
};

export const tagsSelector = {
  getList,
  getListWithoutId,
  getTotalCount,
};
