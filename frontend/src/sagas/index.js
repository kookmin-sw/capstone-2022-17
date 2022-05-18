import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { apiUrl } from 'config/api.config';
import authenticationSaga from './authentication';
import techstacksSaga from './techstack';
import imageSaga from './image';
import projectSaga from './project';

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(authenticationSaga), fork(techstacksSaga), fork(imageSaga), fork(projectSaga)]);
}
