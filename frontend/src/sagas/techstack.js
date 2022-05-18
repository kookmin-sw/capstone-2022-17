import { all, fork, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import {
  LOAD_TECHSTACK_REQUEST,
  LOAD_TECHSTACK_SUCCESS,
  LOAD_TECHSTACK_FAILURE,
} from 'reducers/techstack';

import authHeader from './auth-header';

const techstacksLoadAPI = (name) =>
  axios.get(`/techStack/list?name=${name}`, { headers: authHeader() });

function* teckstacksLoad(action) {
  try {
    const result = yield call(techstacksLoadAPI, action.name);
    yield put({
      type: LOAD_TECHSTACK_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TECHSTACK_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchTechstacksLoad() {
  yield throttle(500, LOAD_TECHSTACK_REQUEST, teckstacksLoad);
}

export default function* techstack() {
  yield all([fork(watchTechstacksLoad)]);
}
