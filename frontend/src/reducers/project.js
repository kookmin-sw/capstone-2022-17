import produce from 'utils/produce.util';

export const initialState = {
  project: null,
  addProjectLoading: false,
  addProjectDone: false,
  addProjectError: null,
  loadProjectLoading: false,
  loadProjectDone: false,
  loadProjectError: null,
};

export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE';

export const LOAD_PROJECT_REQUEST = 'LOAD_PROJECT_REQUEST';
export const LOAD_PROJECT_SUCCESS = 'LOAD_PROJECT_SUCCESS';
export const LOAD_PROJECT_FAILURE = 'LOAD_PROJECT_FAILURE';

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
      default:
        break;
    }
  });

export default reducer;
