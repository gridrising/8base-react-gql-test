import { useState } from 'react';

import { CircularProgress } from '@material-ui/core';

import { APP_BOTTOM_NAVIGATION, LOAD_LIST_ITEMS } from '_constants';
import { postsSelector } from '_layers/dataSelectors';
import { usePostsList } from '_layers/gql/hooks';
import { BottomNavigation, FilterDialog } from '_layers/ui/components';
import { CenterLayout, PageLayout } from '_layers/ui/layouts';

import { PostsPageContent } from './PostsPage.Content';

export const PostsPage = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const { data, loading, fetchMore } = usePostsList({
    variables: {
      first: LOAD_LIST_ITEMS,
      filter: {
        tags: { some: { OR: [...activeFilters.map(filter => ({ name: { contains: filter } }))] } },
      },
    },
  });

  const postsList = postsSelector.getList(data);
  const totalCount = postsSelector.getTotalCount(data);

  const onEndReached = () => {
    fetchMore({
      variables: {
        skip: postsList.length,
      },
    });
  };

  const getFilters = filters => {
    setActiveFilters(filters);
  };

  return (
    <PageLayout
      header={
        <CenterLayout>
          <FilterDialog
            open={openFilterModal}
            setOpen={setOpenFilterModal}
            getFilters={getFilters}
            currentFilters={activeFilters}
            disabled={loading}
          />
        </CenterLayout>
      }
      content={
        <>
          {loading ? (
            <CenterLayout>
              <CircularProgress />
            </CenterLayout>
          ) : (
            <PostsPageContent
              postsList={postsList}
              totalCount={totalCount}
              onEndReached={onEndReached}
            />
          )}
        </>
      }
      footer={<BottomNavigation navList={APP_BOTTOM_NAVIGATION} />}
    />
  );
};
