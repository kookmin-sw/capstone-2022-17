import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import {
  LOAD_MAINPROJECTLIST_REQUEST,
  LOAD_MAINPROJECTLIST_SUCCESS,
  LOAD_MAINPROJECTLIST_FAILURE,
  LOAD_PROJECTLIST_REQUEST,
  LOAD_PROJECTLIST_SUCCESS,
  LOAD_PROJECTLIST_FAILURE,
  LOAD_MYPROJECTLIST_REQUEST,
  LOAD_MYPROJECTLIST_SUCCESS,
  LOAD_MYPROJECTLIST_FAILURE,
} from 'reducers/projectList';

import authHeader from './auth-header';

// 메인페이지 - 프로젝트 불러오기
const mainProjectListLoadAPI = () => axios.get(`/project/main`, { headers: authHeader() });

function* mainProjectListLoad() {
  try {
    const result = yield call(mainProjectListLoadAPI);
    yield put({
      type: LOAD_MAINPROJECTLIST_SUCCESS,
      data: camelize(result.data.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MAINPROJECTLIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchMainProjectListLoad() {
  yield takeLatest(LOAD_MAINPROJECTLIST_REQUEST, mainProjectListLoad);
}

// 프로젝트 둘러보기 페이지 - 프로젝트 불러오기
const projectListLoadAPI = (page, size, data) =>
  axios.post(`/project/list?page=${page}&size=${size}`, data, { headers: authHeader() });

function* projectListLoad(action) {
  try {
    const result = yield call(projectListLoadAPI, action.page, action.size, action.data);
    yield put({
      type: LOAD_PROJECTLIST_SUCCESS,
      data: camelize(result.data.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PROJECTLIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchProjectListLoad() {
  yield takeLatest(LOAD_PROJECTLIST_REQUEST, projectListLoad);
}

// 내 프로젝트 페이지 - 프로젝트 불러오기
const myProjectListLoadAPI = (page, size, status) =>
  axios.get(`/myproject/?page=${page}&size=${size}&type=${status}`, {
    headers: authHeader(),
  });

function* myProjectListLoad(action) {
  try {
    const result = yield call(
      myProjectListLoadAPI,
      action.page,
      action.size,
      action.status,
      action.data,
    );
    yield put({
      type: LOAD_MYPROJECTLIST_SUCCESS,
      data: camelize(result.data.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MYPROJECTLIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchMyProjectListLoad() {
  yield takeLatest(LOAD_MYPROJECTLIST_REQUEST, myProjectListLoad);
}

export default function* projectList() {
  yield all([
    fork(watchMainProjectListLoad),
    fork(watchProjectListLoad),
    fork(watchMyProjectListLoad),
  ]);
}
