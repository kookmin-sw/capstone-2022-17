import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import { ADD_MEMBER_REQUEST, ADD_MEMBER_SUCCESS, ADD_MEMBER_FAILURE } from 'reducers/member';
import authHeader from './auth-header';

const memberAddAPI = (data) => axios.post('/member', data, { headers: authHeader() });

function* memberAdd(action) {
  try {
    const result = yield call(memberAddAPI, action.data);
    yield put({
      type: ADD_MEMBER_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_MEMBER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchMemberAdd() {
  yield takeLatest(ADD_MEMBER_REQUEST, memberAdd);
}

export default function* member() {
  yield all([fork(watchMemberAdd)]);
}
