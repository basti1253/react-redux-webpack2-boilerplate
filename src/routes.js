import React from 'react';
import { Redirect, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Dashboard from './containers/dashboard';
import About from './components/about';
import NotFound from './components/not-found';

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
