import { Map } from 'immutable';

import {
  TEST_ACTION,
  TEST_IS_LOADING,
  TEST_ASYNC_ACTION,
} from '../actions/app';

const initialState = Map({
  counter: 0,
  asyncLoading: false,
  asyncData: null,
});

const actionsMap = {
  [TEST_ACTION]: (state) => {
    const counter = state.get('counter') + 1;

    return state.merge({
      counter,
    });
  },

  [TEST_IS_LOADING]: (state) => {
    return state.merge({
      asyncLoading: true,
      asyncError: null,
    });
  },
  [TEST_ASYNC_ACTION]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncData: action.payload,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
