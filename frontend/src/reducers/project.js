import produce from 'utils/produce.util';

export const initialState = {
  project: null,
  addProjectLoading: false,
  addProjectDone: false,
  addProjectError: false,
};

export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE';

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
        draft.project = action.data;
        break;
      case ADD_PROJECT_FAILURE:
        draft.addProjectLoading = false;
        draft.addProjectError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
