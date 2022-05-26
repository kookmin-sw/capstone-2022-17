import produce from 'utils/produce.util';

export const initialState = {
  project: null,
  addProjectLoading: false,
  addProjectDone: false,
  addProjectError: null,
  loadProjectLoading: false,
  loadProjectDone: false,
  loadProjectError: null,
  destroyProjectLoading: false,
  destroyProjectDone: false,
  destroyProjectError: null,
  updateProjectLoading: false,
  updateProjectDone: false,
  updateProjectError: null,
  likeResult: null,
  likeProjectLoading: false,
  likeProjectDone: false,
  likeProjectError: null,
  destroyLikeProjectLoading: false,
  destroyLikeProjectDone: false,
  destroyLikeProjectError: null,
};

export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE';

export const LOAD_PROJECT_REQUEST = 'LOAD_PROJECT_REQUEST';
export const LOAD_PROJECT_SUCCESS = 'LOAD_PROJECT_SUCCESS';
export const LOAD_PROJECT_FAILURE = 'LOAD_PROJECT_FAILURE';

export const DESTROY_PROJECT_REQUEST = 'DESTROY_PROJECT_REQUEST';
export const DESTROY_PROJECT_SUCCESS = 'DESTROY_PROJECT_SUCCESS';
export const DESTROY_PROJECT_FAILURE = 'DESTROY_PROJECT_FAILURE';

export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_FAILURE = 'UPDATE_PROJECT_FAILURE';

export const LIKE_PROJECT_REQUEST = 'LIKE_PROJECT_REQUEST';
export const LIKE_PROJECT_SUCCESS = 'LIKE_PROJECT_SUCCESS';
export const LIKE_PROJECT_FAILURE = 'LIKE_PROJECT_FAILURE';

export const DESTROY_LIKE_PROJECT_REQUEST = 'DESTROY_LIKE_PROJECT_REQUEST';
export const DESTROY_LIKE_PROJECT_SUCCESS = 'DESTROY_LIKE_PROJECT_SUCCESS';
export const DESTROY_LIKE_PROJECT_FAILURE = 'DESTROY_LIKE_PROJECT_FAILURE';

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_PROJECT_REQUEST:
        draft.addProjectLoading = true;
        draft.addProjectDone = false;
        draft.addProjectError = null;
        break;
      case ADD_PROJECT_SUCCESS:
        draft.addProjectLoading = false;
        draft.addProjectDone = true;
        draft.project = action.data.data;
        break;
      case ADD_PROJECT_FAILURE:
        draft.addProjectLoading = false;
        draft.addProjectError = action.error;
        break;
      case LOAD_PROJECT_REQUEST:
        draft.loadProjectLoading = true;
        draft.loadProjectDone = false;
        draft.loadProjectError = null;
        break;
      case LOAD_PROJECT_SUCCESS:
        draft.loadProjectLoading = false;
        draft.loadProjectDone = true;
        draft.project = action.data.data;
        break;
      case LOAD_PROJECT_FAILURE:
        draft.loadProjectLoading = false;
        draft.loadProjectError = action.error;
        break;
      case DESTROY_PROJECT_REQUEST:
        draft.destroyProjectLoading = true;
        draft.destroyProjectDone = false;
        draft.destroyProjectError = null;
        break;
      case DESTROY_PROJECT_SUCCESS:
        draft.destroyProjectLoading = false;
        draft.destroyProjectDone = true;
        break;
      case DESTROY_PROJECT_FAILURE:
        draft.destroyProjectLoading = false;
        draft.destroyProjectError = action.error;
        break;
      case UPDATE_PROJECT_REQUEST:
        draft.updateProjectLoading = true;
        draft.updateProjectDone = false;
        draft.updateProjectError = null;
        break;
      case UPDATE_PROJECT_SUCCESS:
        draft.updateProjectLoading = false;
        draft.updateProjectDone = true;
        break;
      case UPDATE_PROJECT_FAILURE:
        draft.updateProjectLoading = false;
        draft.updateProjectError = action.error;
        break;
      case LIKE_PROJECT_REQUEST:
        draft.likeProjectLoading = true;
        draft.likeProjectDone = false;
        draft.likeProjectError = null;
        break;
      case LIKE_PROJECT_SUCCESS:
        draft.likeResult = action.data.data;
        draft.likeProjectLoading = false;
        draft.likeProjectDone = true;
        break;
      case LIKE_PROJECT_FAILURE:
        draft.likeProjectLoading = false;
        draft.likeProjectError = action.error;
        break;
      case DESTROY_LIKE_PROJECT_REQUEST:
        draft.destroyLikeProjectLoading = true;
        draft.destroyLikeProjectDone = false;
        draft.destroyLikeProjectError = null;
        break;
      case DESTROY_LIKE_PROJECT_SUCCESS:
        draft.likeResult = action.data.data;
        draft.destroyLikeProjectLoading = false;
        draft.destroyLikeProjectDone = true;
        break;
      case DESTROY_LIKE_PROJECT_FAILURE:
        draft.destroyLikeProjectLoading = false;
        draft.destroyLikeProjectError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
