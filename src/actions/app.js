import { createAction } from 'redux-actions';

import api from '../api';

export const TEST_ACTION = 'TEST_ACTION';
export const TEST_IS_LOADING = 'TEST_IS_LOADING';
export const TEST_ASYNC_ACTION = 'TEST_ASYNC_ACTION';

export const testAction = createAction(TEST_ACTION);
export const testisLoading = createAction(TEST_IS_LOADING);

const testAsyncAction = createAction(TEST_ASYNC_ACTION, () => api.testAsync());

export function testAsync(dispatcher) {
  return (dispatch) => {
    dispatch(testisLoading());
    dispatch(testAsyncAction());
  }
}
