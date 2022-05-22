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
  DESTROY_PROJECT_SUCCESS,
  DESTROY_PROJECT_FAILURE,
  DESTROY_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
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

const projectDestroyAPI = (id) => axios.delete(`/project?id=${id}`, { headers: authHeader() });

function* projectDestroy(action) {
  try {
    const result = yield call(projectDestroyAPI, action.id);
    yield put({
      type: DESTROY_PROJECT_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DESTROY_PROJECT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchProjectDestroy() {
  yield takeLatest(DESTROY_PROJECT_REQUEST, projectDestroy);
}

const projectUpdateAPI = (data) => axios.patch('/project', data, { headers: authHeader() });

function* projectUpdate(action) {
  try {
    const result = yield call(projectUpdateAPI, action.data);
    yield put({
      type: UPDATE_PROJECT_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_PROJECT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchProjectUpdate() {
  yield takeLatest(UPDATE_PROJECT_REQUEST, projectUpdate);
}

export default function* project() {
  yield all([
    fork(watchProjectAdd),
    fork(watchProjectLoad),
    fork(watchProjectDestroy),
    fork(watchProjectUpdate),
  ]);
}
