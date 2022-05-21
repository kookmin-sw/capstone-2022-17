import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  UPDATE_USERPOSITION_REQUEST,
  UPDATE_USERPOSITION_SUCCESS,
  UPDATE_USERPOSITION_FAILURE,
  UPDATE_USERTECH_REQUEST,
  UPDATE_USERTECH_SUCCESS,
  UPDATE_USERTECH_FAILURE,
} from 'reducers/user';
import authHeader from './auth-header';

const userPositionUpdateAPI = (data) =>
  axios.patch('/user/position', data, { headers: authHeader() });

function* userPositionUpdate(action) {
  try {
    const result = yield call(userPositionUpdateAPI, action.data);
    yield put({
      type: UPDATE_USERPOSITION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_USERPOSITION_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUserPositionUpdate() {
  yield takeLatest(UPDATE_USERPOSITION_REQUEST, userPositionUpdate);
}

const userTechUpdateAPI = (data) => axios.patch('/user/tech', data, { headers: authHeader() });

function* userTechUpdate(action) {
  try {
    const result = yield call(userTechUpdateAPI, action.data);
    yield put({
      type: UPDATE_USERTECH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_USERTECH_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUserTechUpdate() {
  yield takeLatest(UPDATE_USERTECH_REQUEST, userTechUpdate);
}

const loadUserAPI = (id) => axios.get(`/user?userId=${id}`, { headers: authHeader() });

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.id);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUserLoad() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* user() {
  yield all([fork(watchUserPositionUpdate), fork(watchUserTechUpdate), fork(watchUserLoad)]);
}
