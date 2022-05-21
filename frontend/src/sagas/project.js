import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import {
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  LOAD_PROJECT_SUCCESS,
  LOAD_PROJECT_FAILURE,
  LOAD_PROJECT_REQUEST,
} from 'reducers/project';
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

const projectLoadAPI = (id) => axios.get(`/project?id=${id}`, { headers: authHeader() });

function* projectLoad(action) {
  try {
    const result = yield call(projectLoadAPI, action.id);
    yield put({
      type: LOAD_PROJECT_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PROJECT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchProjectLoad() {
  yield takeLatest(LOAD_PROJECT_REQUEST, projectLoad);
}

export default function* project() {
  yield all([fork(watchProjectAdd), fork(watchProjectLoad)]);
}
