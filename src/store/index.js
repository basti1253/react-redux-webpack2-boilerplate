import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import logger from '../dev/logger';

import reducer from '../reducers';

const isProduction = process.env.NODE_ENV === 'production';

export default function configureStore() {
  let middleWares = [
    thunk,
    promiseMiddleware,
    immutableStateInvariant()
  ];
  if (isProduction) {
    return createStore(reducer, compose(applyMiddleware(...middleWares)));
  }

  middleWares = [...middleWares, logger];

  /* eslint-disable no-underscore-dangle */
  if (!window.__REDUX_DEVTOOLS_EXTENSION__) {
    return createStore(reducer, compose(applyMiddleware(...middleWares)));
  }
  return createStore(
    reducer,
    compose(applyMiddleware(...middleWares), window.__REDUX_DEVTOOLS_EXTENSION__())
  );
  /* eslint-enable */
}

