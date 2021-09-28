import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { APP_URL } from '_constants';

import { CommentsPage } from './comments';
import { PostsPage } from './posts';

export const Pages = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={APP_URL.posts} component={PostsPage} />
        <Route path={APP_URL.comments} component={CommentsPage} />
        <Redirect to={APP_URL.posts} />
        {/* <Redirect to={APP_URL.comments} /> */}
      </Switch>
    </BrowserRouter>
  );
};
