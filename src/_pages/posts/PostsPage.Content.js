import React from 'react';

import { CircularProgress, Container, Box } from '@material-ui/core';
import { Virtuoso } from 'react-virtuoso';

import { MediaCard } from '_layers/ui/components';
import { CenterLayout } from '_layers/ui/layouts/CenterLayout';

export const PostsPageContent = ({ postsList = [], totalCount = 0, onEndReached }) => {
  const hasMore = postsList.length < totalCount;
  return totalCount ? (
    <Virtuoso
      style={{ height: '100%', flexGrow: 1 }}
      data={postsList}
      totalCount={totalCount}
      endReached={onEndReached}
      components={{
        Footer: () => {
          return hasMore ? (
            <Box
              component="li"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
              <CircularProgress />
            </Box>
          ) : null;
        },
      }}
      itemContent={(_, post) => (
        <Container maxWidth="xs" style={{ padding: '10px 5px' }}>
          <MediaCard
            title={post.title}
            imageUrl={post?.thumbnail?.downloadUrl}
            createdAt={new Date(post.createdAt).toLocaleString()}
          />
        </Container>
      )}
    />
  ) : (
    <CenterLayout>No Content</CenterLayout>
  );
};
