import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_IMAGE_REQUEST, ADD_IMAGE_SUCCESS, ADD_IMAGE_FAILURE } from 'reducers/image';
import authHeader from './auth-header';

const imageAddAPI = (data) => axios.post('/upload', data, { headers: authHeader() });

function* imageAdd(action) {
  try {
    const result = yield call(imageAddAPI, action.data);
    yield put({
      type: ADD_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchImageAdd() {
  yield takeLatest(ADD_IMAGE_REQUEST, imageAdd);
}

export default function* image() {
  yield all([fork(watchImageAdd)]);
}
