import React from 'react';
import { Redirect, Route, IndexRoute } from 'react-router';

import App from './views/app';
import Dashboard from './views/dashboard';
import About from './views/about';
import NotFound from './views/not-found';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  ABOUT: `${ publicPath }about`,
};

export default (
  <Route path={ publicPath } component={ App }>
    <IndexRoute component={ Dashboard } />
    <Route path={ routeCodes.ABOUT } component={ About } />
    <Route path='404' component={ NotFound } />
    <Redirect from='*' to='404' />
  </Route>
);
