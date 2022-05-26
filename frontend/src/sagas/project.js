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
  LIKE_PROJECT_SUCCESS,
  LIKE_PROJECT_FAILURE,
  LIKE_PROJECT_REQUEST,
  DESTROY_LIKE_PROJECT_SUCCESS,
  DESTROY_LIKE_PROJECT_FAILURE,
  DESTROY_LIKE_PROJECT_REQUEST,
} from 'reducers/project';
import authHeader from './auth-header';

// 프로젝트 등록
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

// 프로젝트 단건 조회
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

// 프로젝트 삭제
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

// 프로젝트 수정
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

// 프로젝트 좋아요
const projectLikeAPI = (data) => axios.post(`/project/like`, data, { headers: authHeader() });

function* projectLike(action) {
  try {
    const result = yield call(projectLikeAPI, action.datak);
    yield put({
      type: LIKE_PROJECT_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_PROJECT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchProjectLike() {
  yield takeLatest(LIKE_PROJECT_REQUEST, projectLike);
}

// 프로젝트 좋아요 취소
const projectLikeDestroyAPI = (id) =>
  axios.delete(`/project/like?id=${id}`, { headers: authHeader() });

function* projectLikeDestroy(action) {
  try {
    const result = yield call(projectLikeDestroyAPI, action.id);
    yield put({
      type: DESTROY_LIKE_PROJECT_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DESTROY_LIKE_PROJECT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchProjectLikeDestroy() {
  yield takeLatest(DESTROY_LIKE_PROJECT_REQUEST, projectLikeDestroy);
}

export default function* project() {
  yield all([
    fork(watchProjectAdd),
    fork(watchProjectLoad),
    fork(watchProjectDestroy),
    fork(watchProjectUpdate),
    fork(watchProjectLike),
    fork(watchProjectLikeDestroy),
  ]);
}
