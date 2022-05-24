import produce from 'utils/produce.util';

export const initialState = {
  userData: null,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  updateUserLoading: false,
  updateUserDone: false,
  updateUserError: null,
  updateUserPositionLoading: false,
  updateUserPositionDone: false,
  updateUserPositionError: null,
  updateUserTechLoading: false,
  updateUserTechDone: false,
  updateUserTechError: false,
  recommend: [],
  recommendUserLoading: false,
  recommendUserDone: false,
  recommendUserError: null,
};

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const UPDATE_USERPOSITION_REQUEST = 'UPDATE_USERPOSITION_REQUEST';
export const UPDATE_USERPOSITION_SUCCESS = 'UPDATE_USERPOSITION_SUCCESS';
export const UPDATE_USERPOSITION_FAILURE = 'UPDATE_USERPOSITION_FAILURE';

export const UPDATE_USERTECH_REQUEST = 'UPDATE_USERTECH_REQUEST';
export const UPDATE_USERTECH_SUCCESS = 'UPDATE_USERTECH_SUCCESS';
export const UPDATE_USERTECH_FAILURE = 'UPDATE_USERTECH_FAILURE';

export const RECOMMEND_USER_REQUEST = 'RECOMMEND_USER_REQUEST';
export const RECOMMEND_USER_SUCCESS = 'RECOMMEND_USER_SUCCESS';
export const RECOMMEND_USER_FAILURE = 'RECOMMEND_USER_FAILURE';

let tempuser = {};

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.userData = action.data.data;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      case UPDATE_USER_REQUEST:
        draft.updateUserLoading = true;
        draft.updateUserDone = false;
        draft.updateUserError = null;
        break;
      case UPDATE_USER_SUCCESS:
        draft.updateUserLoading = false;
        draft.updateUserDone = true;
        draft.userData = action.data.data;
        tempuser = JSON.parse(localStorage.getItem('user'));
        tempuser.user = action.data.data;
        localStorage.setItem('user', JSON.stringify(tempuser));
        draft.user = tempuser;
        break;
      case UPDATE_USER_FAILURE:
        draft.updateUserLoading = false;
        draft.updateUserError = action.error;
        break;
      case UPDATE_USERPOSITION_REQUEST:
        draft.updateUserPositionLoading = true;
        draft.updateUserPositionDone = false;
        draft.updateUserPositionError = null;
        break;
      case UPDATE_USERPOSITION_SUCCESS:
        draft.updateUserPositionLoading = false;
        draft.updateUserPositionDone = true;
        break;
      case UPDATE_USERPOSITION_FAILURE:
        draft.updateUserPositionLoading = false;
        draft.updateUserPositionError = action.error;
        break;
      case UPDATE_USERTECH_REQUEST:
        draft.updateUserTechLoading = true;
        draft.updateUserTechDone = false;
        draft.updateUserTechError = null;
        break;
      case UPDATE_USERTECH_SUCCESS:
        draft.updateUserTechLoading = false;
        draft.updateUserTechDone = true;
        break;
      case UPDATE_USERTECH_FAILURE:
        draft.updateUserTechLoading = false;
        draft.updateUserTechError = action.error;
        break;
      case RECOMMEND_USER_REQUEST:
        draft.recommendUserLoading = true;
        draft.recommendUserDone = false;
        draft.recommendUserError = null;
        break;
      case RECOMMEND_USER_SUCCESS:
        draft.recommend = action.data;
        draft.recommendUserLoading = false;
        draft.recommendUserDone = true;
        break;
      case RECOMMEND_USER_FAILURE:
        draft.recommendUserLoading = false;
        draft.recommendUserError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
