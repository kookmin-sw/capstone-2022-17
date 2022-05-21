import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { apiUrl } from 'config/api.config';
import authenticationSaga from './authentication';
import techstacksSaga from './techstack';
import imageSaga from './image';
import projectSaga from './project';
import userSaga from './user';
import memberSaga from './member';

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(authenticationSaga),
    fork(techstacksSaga),
    fork(imageSaga),
    fork(projectSaga),
    fork(userSaga),
    fork(memberSaga),
  ]);
}
