import { useState, useContext } from 'react';

import { CircularProgress } from '@material-ui/core';

import { APP_BOTTOM_NAVIGATION, LOAD_LIST_ITEMS } from '_constants';
import { FilterContext } from '_layers/contexts/FilterProvider';
import { postsSelector, tagsSelector } from '_layers/dataSelectors';
import { usePostsList, useTagsList } from '_layers/gql/hooks';
import { BottomNavigation, FilterDialog } from '_layers/ui/components';
import { CenterLayout, PageLayout } from '_layers/ui/layouts';

import { PostsPageContent } from './PostsPage.Content';

export const PostsPage = () => {
  const [state] = useContext(FilterContext);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const { data: postsData, loading: postsLoading, fetchMore: fetchMorePosts } = usePostsList({
    variables: {
      first: LOAD_LIST_ITEMS,
      filter: {
        tags: {
          some: { OR: [...state.currentFilters.map(filter => ({ name: { contains: filter } }))] },
        },
      },
    },
  });
  const { data: tagsData, loading: tagsLoading } = useTagsList();
  const postsList = postsSelector.getList(postsData);
  const totalPostsCount = postsSelector.getTotalCount(postsData);
  const tagsList = tagsSelector.getListWithoutId(tagsData);

  const onEndReached = () => {
    fetchMorePosts({
      variables: {
        skip: postsList.length,
      },
    });
  };

  return (
    <PageLayout
      header={
        <CenterLayout>
          <FilterDialog
            open={openFilterModal}
            setOpen={setOpenFilterModal}
            tagsList={tagsList}
            disabled={tagsLoading}
          />
        </CenterLayout>
      }
      content={
        <>
          {postsLoading ? (
            <CenterLayout>
              <CircularProgress />
            </CenterLayout>
          ) : (
            <PostsPageContent
              postsList={postsList}
              totalCount={totalPostsCount}
              onEndReached={onEndReached}
            />
          )}
        </>
      }
      footer={<BottomNavigation navList={APP_BOTTOM_NAVIGATION} />}
    />
  );
};
