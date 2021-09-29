import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { APP_URL } from '_constants';
import { FilterContextProvider } from '_layers/contexts/FilterContextProvider';

import { CommentsPage } from './comments';
import { PostsPage } from './posts';

export const Pages = () => {
  return (
    <BrowserRouter>
      <Switch>
        <FilterContextProvider>
          <Route path={APP_URL.posts} component={PostsPage} />
          <Route path={APP_URL.comments} component={CommentsPage} />
          <Redirect to={APP_URL.posts} />
        </FilterContextProvider>
      </Switch>
    </BrowserRouter>
  );
};
