import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import logger from '../dev/logger';

import rootReducer from '../reducers';

const isProduction = process.env.NODE_ENV === 'production';

export default function configureStore() {
  const middleWares = [
    thunk,
    promiseMiddleware,
    immutableStateInvariant()
  ];
  if (isProduction) {
    const middleware = applyMiddleware(middleWares);

    return createStore(
      rootReducer,
      middleware
    );
  }

  const middleware = applyMiddleware(...middleWares, logger);
  const enhancer = compose(
    middleware,
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    /* eslint-enable */
  );

  return createStore(
    rootReducer,
    enhancer
  );
}

