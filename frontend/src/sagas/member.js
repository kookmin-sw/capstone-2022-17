import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import {
  LOAD_CANDIDATE_REQUEST,
  LOAD_CANDIDATE_SUCCESS,
  LOAD_CANDIDATE_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
  DESTROY_MEMBER_REQUEST,
  DESTROY_MEMBER_SUCCESS,
  DESTROY_MEMBER_FAILURE,
  APPROVE_MEMBER_REQUEST,
  APPROVE_MEMBER_SUCCESS,
  APPROVE_MEMBER_FAILURE,
  REJECT_MEMBER_REQUEST,
  REJECT_MEMBER_SUCCESS,
  REJECT_MEMBER_FAILURE,
} from 'reducers/member';
import authHeader from './auth-header';

const candidateLoadAPI = (id) =>
  axios.get(`/project/join?projectId=${id}`, { headers: authHeader() });

function* candidateLoad(action) {
  try {
    const result = yield call(candidateLoadAPI, action.id);
    yield put({
      type: LOAD_CANDIDATE_SUCCESS,
      data: camelize(result.data.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CANDIDATE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchcandidateLoad() {
  yield takeLatest(LOAD_CANDIDATE_REQUEST, candidateLoad);
}

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

const memberDestroyAPI = (id) => axios.delete(`/member?projectId=${id}`, { headers: authHeader() });

function* memberDestroy(action) {
  try {
    const result = yield call(memberDestroyAPI, action.id);
    yield put({
      type: DESTROY_MEMBER_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DESTROY_MEMBER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchMemberDestroy() {
  yield takeLatest(DESTROY_MEMBER_REQUEST, memberDestroy);
}

const memberApproveAPI = (data) => axios.patch('/member/join', data, { headers: authHeader() });

function* memberApprove(action) {
  try {
    const result = yield call(memberApproveAPI, action.data);
    yield put({
      type: APPROVE_MEMBER_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: APPROVE_MEMBER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchMemberApprove() {
  yield takeLatest(APPROVE_MEMBER_REQUEST, memberApprove);
}

const memberRejectAPI = (data) => axios.patch('/member/reject', data, { headers: authHeader() });

function* memberReject(action) {
  try {
    const result = yield call(memberRejectAPI, action.data);
    yield put({
      type: REJECT_MEMBER_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REJECT_MEMBER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchMemberReject() {
  yield takeLatest(REJECT_MEMBER_REQUEST, memberReject);
}

export default function* member() {
  yield all([
    fork(watchMemberAdd),
    fork(watchMemberDestroy),
    fork(watchMemberApprove),
    fork(watchMemberReject),
    fork(watchcandidateLoad),
  ]);
}
