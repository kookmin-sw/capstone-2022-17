import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  DESTROY_USER_REQUEST,
  DESTROY_USER_SUCCESS,
  DESTROY_USER_FAILURE,
} from 'reducers/authentication';
import authHeader from './auth-header';

const signinAPI = (data) => axios.post('/auth/login', data);
const signupAPI = (data) => axios.post('/auth/join', data);
const destroyUserAPI = () => axios.delete('/user', { headers: authHeader });

function* signin(action) {
  try {
    const result = yield call(signinAPI, action.data);
    yield put({
      type: SIGN_IN_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_IN_FAILURE,
      error: camelize(err.response.data),
    });
  }
}

function* watchSignin() {
  yield takeLatest(SIGN_IN_REQUEST, signin);
}

function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: camelize(err.response.data),
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* destroyUser() {
  try {
    const result = yield call(destroyUserAPI);
    yield put({
      type: DESTROY_USER_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    yield put({
      type: DESTROY_USER_FAILURE,
      error: camelize(err.response.data),
    });
  }
}

function* watchDestroyUser() {
  yield takeLatest(DESTROY_USER_REQUEST, destroyUser);
}

export default function* authenticationSaga() {
  yield all([fork(watchSignin), fork(watchSignup), fork(watchDestroyUser)]);
}
