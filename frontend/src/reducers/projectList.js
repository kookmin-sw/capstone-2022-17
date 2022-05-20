import produce from 'utils/produce.util';

export const initialState = {
  mainProjectList: null,
  loadMainProjectListLoading: false,
  loadMainProjectListDone: false,
  loadMainProjectListError: false,
};

export const LOAD_MAINPROJECTLIST_REQUEST = 'LOAD_MAINPROJECTLIST_REQUEST';
export const LOAD_MAINPROJECTLIST_SUCCESS = 'LOAD_MAINPROJECTLIST_SUCCESS';
export const LOAD_MAINPROJECTLIST_FAILURE = 'LOAD_MAINPROJECTLIST_FAILURE';

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MAINPROJECTLIST_REQUEST:
        draft.loadMainProjectListLoading = true;
        draft.loadMainProjectListDone = false;
        draft.loadMainProjectListError = null;
        break;
      case LOAD_MAINPROJECTLIST_SUCCESS:
        draft.loadMainProjectListLoading = false;
        draft.loadMainProjectListDone = true;
        draft.mainProjectList = action.data;
        break;
      case LOAD_MAINPROJECTLIST_FAILURE:
        draft.loadMainProjectListLoading = false;
        draft.loadMainProjectListError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;