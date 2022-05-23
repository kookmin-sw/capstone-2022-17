import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USERPOSITION_REQUEST,
  UPDATE_USERPOSITION_SUCCESS,
  UPDATE_USERPOSITION_FAILURE,
  UPDATE_USERTECH_REQUEST,
  UPDATE_USERTECH_SUCCESS,
  UPDATE_USERTECH_FAILURE,
  RECOMMEND_USER_REQUEST,
  RECOMMEND_USER_SUCCESS,
  RECOMMEND_USER_FAILURE,
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

const UpdateUserAPI = (data) => axios.patch('/user', data, { headers: authHeader() });

function* UpdateUser(action) {
  try {
    const result = yield call(UpdateUserAPI, action.data);
    yield put({
      type: UPDATE_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUserUpdate() {
  yield takeLatest(UPDATE_USER_REQUEST, UpdateUser);
}

const recommendUserAPI = (id) =>
  axios.get(`/user/recommend?projectId=${id}`, { headers: authHeader() });

function* recommendUser(action) {
  try {
    const result = yield call(recommendUserAPI, action.id);
    yield put({
      type: RECOMMEND_USER_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RECOMMEND_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchRecommendUser() {
  yield takeLatest(RECOMMEND_USER_REQUEST, recommendUser);
}

export default function* user() {
  yield all([
    fork(watchUserPositionUpdate),
    fork(watchUserTechUpdate),
    fork(watchUserLoad),
    fork(watchUserUpdate),
    fork(watchRecommendUser),
  ]);
}
