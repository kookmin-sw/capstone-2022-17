import produce from 'utils/produce.util';

export const initialState = {
  techstacks: null,
  loadTechstacksLoading: false,
  loadTechstacksDone: false,
  loadTechstacksError: null,
};

export const LOAD_TECHSTACK_REQUEST = 'LOAD_TECHSTACK_REQUEST';
export const LOAD_TECHSTACK_SUCCESS = 'LOAD_TECHSTACK_SUCCESS';
export const LOAD_TECHSTACK_FAILURE = 'LOAD_TECHSTACK_FAILURE';

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_TECHSTACK_REQUEST:
        draft.loadTechstacksLoading = true;
        draft.loadTechstacksDone = false;
        draft.loadTechstacksError = null;
        break;
      case LOAD_TECHSTACK_SUCCESS:
        draft.techstacks = action.data.data;
        draft.loadTechstacksLoading = false;
        draft.loadTechstacksDone = true;
        break;
      case LOAD_TECHSTACK_FAILURE:
        draft.loadTechstacksLoading = false;
        draft.loadTechstacksError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
