import { all, fork, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import {
  LOAD_PROJECTLIST_REQUEST,
  LOAD_PROJECTLIST_SUCCESS,
  LOAD_PROJECTLIST_FAILURE,
} from 'reducers/projectList';

import authHeader from './auth-header';

const projectListLoadAPI = (name) =>
  axios.get(`/project/list?name=${name}`, { headers: authHeader() });

function* projectListLoad(action) {
  try {
    const result = yield call(projectListLoadAPI, action.name);
    yield put({
      type: LOAD_PROJECTLIST_SUCCESS,
      data: camelize(result.data),
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
  yield throttle(500, LOAD_PROJECTLIST_REQUEST, projectListLoad);
}

export default function* projectList() {
  yield all([fork(watchProjectListLoad)]);
}