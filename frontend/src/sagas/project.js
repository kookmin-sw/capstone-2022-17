import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import { ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE } from 'reducers/project';
import authHeader from './auth-header';

const projectAddAPI = (data) => axios.post('/project', data, { headers: authHeader() });

function* projectAdd(action) {
  try {
    const result = yield call(projectAddAPI, action.data);
    yield put({
      type: ADD_PROJECT_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_PROJECT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchProjectAdd() {
  yield takeLatest(ADD_PROJECT_REQUEST, projectAdd);
}

export default function* project() {
  yield all([fork(watchProjectAdd)]);
}
